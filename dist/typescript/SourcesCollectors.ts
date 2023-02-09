/*!
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Stream, StreamMapper} from "./Stream";
import {DomQuery} from "./DomQuery";

import {Config} from "./Monad";

/**
 * special status of the datasource location pointer
 * if an access, outside of the possible data boundaries is happening
 * (example for instance current without a first next call, or next
 * which goes over the last possible dataset), an iteration status return
 * value is returned marking this boundary instead of a classical element
 *
 * Note this is only internally used but must be implemented to fullfill
 * internal contracts, the end user will never see those values if he uses
 * streams!
 */
export enum ITERATION_STATUS {
    EO_STRM = '__EO_STRM__',
    BEF_STRM = '___BEF_STRM__',
}

export declare type LOOKAHEAD_RESULT<T> = {iterations: number, value: T} | {iterations: number, value: ITERATION_STATUS};

/**
 * Every data source wich feeds data into the lazy stream
 * or stream generally must implement this interface
 *
 * It is basically an iteratable to the core
 */
export interface IStreamDataSource<T> {

    /**
     * @returns true if additional data is present false if not
     */
    hasNext(): boolean;

    /**
     * returns the next element in the stream
     */
    next(): T | ITERATION_STATUS;

    /**
     * returns the next element in the stream
     * difference to next is, that the internal data position
     * is not changed, so next still will deliver the next item from the current
     * data position. Look ahead is mostly needed internally
     * by possible endless data constructs which have no fixed data boundary, or index
     * positions. (aka infinite sets, or flatmapped constructs)
     *
     * @returns a tuple of iterations and the result, iterations is the number of steps for the result
     *
     */
    lookAhead(cnt ?: number): LOOKAHEAD_RESULT<T>;

    /**
     * returns the current element, returns the same element as the previous next call
     * if there is no next before current called then we will call next as initial element
     */
    current(): T | ITERATION_STATUS;

    /**
     * resets the position to the beginning
     */
    reset(): void;
}

/**
 * A collector, needs to be implemented
 */
export interface ICollector<T, S> {
    /**
     * this method basically takes a single stream element
     * and does something with it (collecting it one way or the other
     * in most cases)
     *
     * @param element
     */
    collect(element: T);

    /**
     * the final result after all the collecting is done
     */
    finalValue: S;
}

export class MultiStreamDatasource<T> implements IStreamDataSource<T> {

    private  activeStrm;
    private  selectedPos = 0;
    private  strms;

    constructor(private first, ...strms: Array<IStreamDataSource<T>>) {
        this.strms = [first].concat(...strms);
        this.activeStrm = this.strms[this.selectedPos];
    }

    current(): any {
        return this.activeStrm.current();
    }

    hasNext(): boolean {
        if(this.activeStrm.hasNext()) {
            return true;
        }
        if(this.selectedPos >= this.strms.length) {
            return false;
        }
        return this.findNextStrm() != -1;
    }

    private findNextStrm(): number {
        let hasNext = false;
        let cnt = this.selectedPos;
        while(!hasNext && cnt < this.strms.length) {
            hasNext = this.strms[cnt].hasNext();
            if(!hasNext) {
                cnt++;
            }
        }
        return hasNext ? cnt : -1;
    }

    lookAhead(cnt: number = 1): LOOKAHEAD_RESULT<T> {
        //lets clone
        const streamsToProcess = this.strms.slice(this.selectedPos);

        if(!streamsToProcess.length) {
            return {iterations: cnt, value: ITERATION_STATUS.EO_STRM};
        }

        const allStreams = [...streamsToProcess];
        let skippedCount = 0;
        while(allStreams.length) {
            let nextStream = allStreams.shift();
            let lookAheadResult = nextStream.lookAhead(cnt);

            if (lookAheadResult.value !== ITERATION_STATUS.EO_STRM) {
                return {iterations: skippedCount + lookAheadResult.iterations, value: lookAheadResult.value};
            }
            // -1 because the last return value is virtual and not present
            skippedCount = skippedCount + lookAheadResult.iterations - 1;
            cnt -= skippedCount;
        }
        return {iterations: skippedCount + 1, value: ITERATION_STATUS.EO_STRM};
    }


    next(): any {
        if(this.activeStrm.hasNext()) {
            return this.activeStrm.next();
        }
        this.selectedPos = this.findNextStrm();
        if(this.selectedPos == -1) {
            return ITERATION_STATUS.EO_STRM;
        }
        this.activeStrm = this.strms[this.selectedPos];
        return this.activeStrm.next();
    }

    reset(): void {
        this.activeStrm = this.strms[0];
        this.selectedPos = 0;
        for(let cnt = 0; cnt < this.strms.length; cnt++) {
            this.strms[cnt].reset();
        }
    }

}

/**
 * defines a sequence of numbers for our stream input
 */
export class SequenceDataSource implements IStreamDataSource<number> {

    start: number;
    total: number;
    value: number;

    constructor(start: number, total: number) {
        this.total = total;
        this.start = start;
        this.value = start - 1;
    }


    hasNext(): boolean {
        return this.value < (this.total - 1);
    }

    next(): number | ITERATION_STATUS {
        this.value++;
        return this.value <= (this.total - 1) ? this.value : ITERATION_STATUS.EO_STRM;
    }

    lookAhead(cnt = 1): LOOKAHEAD_RESULT<number> {
        if ((this.value + cnt) > this.total - 1) {
            return {iterations: this.total, value: ITERATION_STATUS.EO_STRM};
        } else {
            return {iterations: cnt, value: this.value + cnt};
        }
    }

    reset(): void {
        this.value = this.start - 1;
    }

    current(): number | ITERATION_STATUS {
        //first condition current without initial call for next
        return (this.start - 1) ? ITERATION_STATUS.BEF_STRM : this.value;
    }
}


/**
 * implementation of iteratable on top of array
 */
export class ArrayStreamDataSource<T> implements IStreamDataSource<T> {
    value: Array<T>;
    dataPos = -1;

    constructor(...value: Array<T>) {
        this.value = value;
    }

    lookAhead(cnt = 1): LOOKAHEAD_RESULT<T> {
        if ((this.dataPos + cnt) > this.value.length - 1) {
            return {iterations: this.value.length - this.dataPos, value: ITERATION_STATUS.EO_STRM};
        }
        return {iterations: cnt, value: this.value[this.dataPos + cnt]};
    }

    hasNext(): boolean {
        return this.value.length - 1 > this.dataPos;
    }

    next(): T | ITERATION_STATUS {
        this.dataPos++;
        return this?.value[this.dataPos] ?? ITERATION_STATUS.EO_STRM;
    }

    reset() {
        this.dataPos = -1;
    }

    current(): T {
        return this.value[Math.max(0, this.dataPos)];
    }
}

/**
 * an intermediate data source which prefilters
 * incoming stream data
 * and lets only the data out which
 * passes the filter function check
 */
export class FilteredStreamDatasource<T> implements IStreamDataSource<T> {

    filterFunc: (T) => boolean;
    inputDataSource: IStreamDataSource<T>;

    _current: T | ITERATION_STATUS = ITERATION_STATUS.BEF_STRM;
    // we have to add a filter idx because the external filter values might change over time, so
    // we cannot reset the state properly unless we do it from a snapshot
    _filterIdx = {};
    _unfilteredPos = 0;

    constructor(filterFunc: (T) => boolean, parent: IStreamDataSource<T>) {
        this.filterFunc = filterFunc;
        this.inputDataSource = parent;
    }

    /**
     * in order to filter we have to make a look ahead until the
     * first next allowed element
     * hence we prefetch the element and then
     * serve it via next
     */
    hasNext(): boolean {
        let steps = 1;
        let found = false;
        let next;

        while (!found && (next = this.inputDataSource.lookAhead(steps)).value != ITERATION_STATUS.EO_STRM) {
            if (this.filterFunc(next.value)) {
                this._filterIdx[this._unfilteredPos + steps] = true;
                found = true;
            } else {
                steps++;
            }
        }
        return found;
    }

    /**
     * serve the next element
     */
    next(): T | ITERATION_STATUS {
        let found: T | ITERATION_STATUS = ITERATION_STATUS.EO_STRM;
        while (this.inputDataSource.hasNext()) {
            this._unfilteredPos++;
            let next: T = <T>this.inputDataSource.next();
            //again here we cannot call the filter function twice,
            // because its state might change, so if indexed,
            // we have a decent snapshot, either has next or next can trigger
            //the snapshot
            if (next != ITERATION_STATUS.EO_STRM &&
                ((this._filterIdx?.[this._unfilteredPos] ?? false) || this.filterFunc(next))) {
                this._filterIdx[this._unfilteredPos] = true;
                found = next;
                break;
            }
        }
        this._current = found as T;
        return found;
    }

    /**
     * this lookahead is special
     * wo only count the unfiltered skipped items
     * as return item!
     * The logic of the stream flow, filtered items do not exist
     * and hence are not actively skipped!
     *
     * @param cnt the number of look aheads
     */
    lookAhead(cnt = 1): LOOKAHEAD_RESULT<T> {
        let lookupVal: LOOKAHEAD_RESULT<T>;
        let found = 0;
        for (let loop = 1; found >= cnt && (lookupVal = this.inputDataSource.lookAhead(loop)).value != ITERATION_STATUS.EO_STRM; loop++) {
            let inCache = this._filterIdx?.[this._unfilteredPos + loop];
            if (inCache || this.filterFunc(lookupVal.value)) {
              //  cnt--;
                found ++;
                //the filter idx is needed to prevent double calls into the filter
                //function within a filter loop
                this._filterIdx[this._unfilteredPos + loop] = true;
            }
        }
        if(lookupVal.value == ITERATION_STATUS.EO_STRM) {
            found++;
        }
        return {
            iterations: found,
            value: lookupVal.value
        } as LOOKAHEAD_RESULT<T>;
    }

    current(): T | ITERATION_STATUS {
        return this._current;
    }

    reset(): void {
        this._current = ITERATION_STATUS.BEF_STRM;
        this._filterIdx = {};
        this._unfilteredPos = 0;
        this.inputDataSource.reset();
    }
}

/**
 * an intermediate datasource which maps the items from
 * one into another
 */
export class MappedStreamDataSource<T, S> implements IStreamDataSource<S> {

    mapFunc: (T) => S;
    inputDataSource: IStreamDataSource<T>;

    constructor(mapFunc: (T) => S, parent: IStreamDataSource<T>) {
        this.mapFunc = mapFunc;
        this.inputDataSource = parent;
    }

    hasNext(): boolean {
        return this.inputDataSource.hasNext();
    }

    next(): S {
        return this.mapFunc(this.inputDataSource.next());
    }

    reset(): void {
        this.inputDataSource.reset();
    }

    current(): S {
        return this.mapFunc(this.inputDataSource.current());
    }

    lookAhead(cnt = 1): LOOKAHEAD_RESULT<S> {
        let lookAheadVal: LOOKAHEAD_RESULT<T> = this.inputDataSource.lookAhead(cnt);
        if(lookAheadVal.value == ITERATION_STATUS.EO_STRM) {
            return lookAheadVal as LOOKAHEAD_RESULT<S>;
        }
        //We have to remap, to fullfill the typing
        return {
            iterations: lookAheadVal.iterations,
            value: this.mapFunc(lookAheadVal.value) as S
        }
    }
}

/**
 * Same for flatmap to deal with element -> stream mappings
 */
export class FlatMapStreamDataSource<T, S> implements IStreamDataSource<S> {

    mapFunc: StreamMapper<T>;

    inputDataSource: IStreamDataSource<T>;

    /**
     * the currently active stream
     * coming from an incoming element
     * once the end of this one is reached
     * it is swapped out by another one
     * from the next element
     */
    activeDataSource: IStreamDataSource<S>;
    walkedDataSources = [];
    _currPos = 0;

    constructor(func: StreamMapper<T>, parent: IStreamDataSource<T>) {
        this.mapFunc = func;
        this.inputDataSource = parent;
    }

    hasNext(): boolean {
        return this.resolveActiveHasNext() || this.resolveNextHasNext();
    }

    private resolveActiveHasNext() {
        let next = false;
        if (this.activeDataSource) {
            next = this.activeDataSource.hasNext();
        }
        return next;
    }

    lookAhead(cnt = 1): LOOKAHEAD_RESULT<S> {

        let lookAhead = this?.activeDataSource?.lookAhead(cnt);
        if (this?.activeDataSource && lookAhead.value != ITERATION_STATUS.EO_STRM) {
            //this should cover 95% of all cases
            return lookAhead;
        }

        if (this.activeDataSource) {
            cnt -= (lookAhead.iterations - 1);
        }

        //the idea is basically to look into the streams sub-sequentially for a match
        //after each stream we have to take into consideration that the skipCnt is
        //reduced by the number of datasets we already have looked into in the previous stream/datasource
        //unfortunately for now we have to loop into them, so we introduce a small o2 here
        const orig_cnt = cnt;
        for (let dsLoop = 1; true; dsLoop++) {
            let datasourceData = this.inputDataSource.lookAhead(dsLoop);
            //we have looped out
            //no embedded data anymore? we are done, data
            //can either be a scalar an array or another datasource
            if (datasourceData.value === ITERATION_STATUS.EO_STRM) {
                return datasourceData as LOOKAHEAD_RESULT<ITERATION_STATUS>;
            }
            let mappedData = this.mapFunc(datasourceData.value as T);

            //it either comes in as datasource or as array
            //both cases must be unified into a datasource
            let currentDataSource = this.toDatasource(mappedData);
            //we now run again  a lookahead
            let ret = currentDataSource.lookAhead(cnt);
            //if the value is found then we are set
            if (ret.value != ITERATION_STATUS.EO_STRM) {
                return {
                    iterations: orig_cnt,
                    value: ret.value as S
                };
            }
            //reduce the next lookahead by the number of elements
            //we are now skipping in the current data source
            cnt -= (ret.iterations - 1);
        }
    }

    private toDatasource(mapped: Array<S> | IStreamDataSource<S>) {
        let ds = Array.isArray(mapped) ? new ArrayStreamDataSource(...mapped) : mapped;
        this.walkedDataSources.push(ds)
        return ds;
    }

    private resolveNextHasNext() {
        let next = false;
        while (!next && this.inputDataSource.hasNext()) {
            let mapped = this.mapFunc(this.inputDataSource.next() as T);
            this.activeDataSource = this.toDatasource(mapped);
            next = this.activeDataSource.hasNext();
        }
        return next;
    }

    next(): S | ITERATION_STATUS {
        if (this.hasNext()) {
            this._currPos++;
            return this.activeDataSource.next();
        }
    }

    reset(): void {
        this.inputDataSource.reset();
        this.walkedDataSources.forEach(ds => ds.reset());
        this.walkedDataSources = [];
        this._currPos = 0;
        this.activeDataSource = null;
    }

    current(): S | ITERATION_STATUS {
        if (!this.activeDataSource) {
            this.hasNext();
        }
        return this.activeDataSource.current();
    }
}

/**
 * For the time being we only need one collector
 * a collector which collects a stream back into arrays
 */
export class ArrayCollector<S> implements ICollector<S, Array<S>> {
    private data: Array<S> = [];

    collect(element: S) {
        this.data.push(element);
    }

    get finalValue(): Array<S> {
        return this.data;
    }
}

/**
 * collects the values as inverse array
 */
export class InverseArrayCollector<S> implements ICollector<S, Array<S>> {
    private data: Array<S> = [];

    collect(element: S) {
        this.data.unshift(element);
    }

    get finalValue(): Array<S> {
        return this.data;
    }
}


/**
 * collects an tuple array stream into an assoc array with elements being collected into arrays
 *
 */
export class ArrayAssocArrayCollector<S> implements ICollector<[string, S] | string, { [key: string]: S }> {
    finalValue: { [key: string]: any } = {};

    collect(element: [string, S] | string) {
        let key = element?.[0] ?? <string>element;
        this.finalValue[key] = this.finalValue?.[key] ?? [];
        this.finalValue[key].push(element?.[1] ?? true);
    }
}

/**
 * dummy collector which just triggers a run
 * on lazy streams without collecting anything
 */
export class Run<S> implements ICollector<S, any> {
    collect(element: S) {

    }

    get finalValue(): any {
        return null;
    }
}

/**
 * collects an assoc stream back to an assoc array
 */
export class AssocArrayCollector<S> implements ICollector<[string, S] | string, { [key: string]: S }> {

    finalValue: { [key: string]: any } = {};

    collect(element: [string, S] | string) {
        this.finalValue[element[0] ?? <string>element] = element[1] ?? true;
    }
}


/**
 * A Config collector similar to the FormDFata Collector
 */
export class ConfigCollector implements ICollector<{ key: string, value: any }, Config> {
    finalValue: Config = new Config({});

    collect(element: { key: string; value: any }) {
        this.finalValue.append(element.key).value = element.value;
    }
}


/**
 * Form data collector for key value pair streams
 */
export class FormDataCollector implements ICollector<{ key: string, value: any }, FormData> {
    finalValue: FormData = new FormData();

    collect(element: { key: string; value: any }) {
        this.finalValue.append(element.key, element.value);
    }
}

/**
 * Form data collector for DomQuery streams
 */
export class QueryFormDataCollector implements ICollector<DomQuery, FormData> {
    finalValue: FormData = new FormData();

    collect(element: DomQuery) {
        let toMerge = element.encodeFormElement();
        if (toMerge.isPresent()) {
            this.finalValue.append(element.name.value, toMerge.get(element.name).value);
        }
    }
}

/**
 * Encoded String collector from dom query streams
 */
export class QueryFormStringCollector implements ICollector<DomQuery, string> {

    formData: [[string, string]] = <any>[];

    collect(element: DomQuery) {
        let toMerge = element.encodeFormElement();
        if (toMerge.isPresent()) {
            this.formData.push([element.name.value, toMerge.get(element.name).value]);
        }
    }

    get finalValue(): string {
        return Stream.of(...this.formData)
            .map<string>(keyVal => keyVal.join("="))
            .reduce((item1, item2) => [item1, item2].join("&"))
            .orElse("").value;
    }
}