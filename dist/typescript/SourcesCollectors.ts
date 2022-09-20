/* Licensed to the Apache Software Foundation (ASF) under one or more
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
    next(): T;

    /**
     * returns the current element, returns the same element as the previous next call
     * if there is no next before current called then we will call next as initial element
     */
    current(): T;

    /**
     * moves back cnt numbers in the datasource
     * (if no number is given we move back one step)
     * @param cnt
     */
    back(cnt?: number): T;

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

    next(): number {
        this.value++;
        return Math.min(this.value, this.total - 1);
    }

    back(cnt = 1): number {
        return this.value = Math.max(this.value - cnt, this.start);
    }

    reset(): void {
        this.value = this.start - 1;
    }

    current(): number {
        //first condition current without initial call for next
        return this.value == (this.start - 1) ? this.start : this.value;
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

    hasNext(): boolean {
        return this.value.length - 1 > this.dataPos;
    }

    next(): T {
        this.dataPos++;
        return this.value[this.dataPos];
    }

    reset() {
        this.dataPos = -1;
    }

    back(cnt: number = 1): T {
        this.dataPos = Math.max(this.dataPos  - cnt, -1);
        return this.value[Math.max(this.dataPos, 0)];
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


    _current: T;
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
        let steps = 0;
        let found = null;
        while (this.inputDataSource.hasNext()) {
            steps++;
            let next: T = <T>this.inputDataSource.next();
            if (this.filterFunc(next)) {
                this._filterIdx[this._unfilteredPos + 1] = true;
                found = next;
                break;
            }
        }
        this.inputDataSource.back(steps);
        return found != null;
    }

    /**
     * serve the next element
     */
    next(): T {
        let found = null;
        while (this.inputDataSource.hasNext()) {
            this._unfilteredPos ++;
            let next: T = <T>this.inputDataSource.next();

            //again here we cannot call the filter function twice, because its state might change, so if indexed, we have a decent snapshot, either has next or next can trigger
            //the snapshot
            if (this._filterIdx[this._unfilteredPos] || this.filterFunc(next)) {
                this._filterIdx[this._unfilteredPos] = true;
                found = next;
                break;
            }
        }
        this._current = found;
        return found;
    }

    current(): T {
        if(this._current == null) {
            return this.next();
        }
        return this._current;
    }

    back(cnt = 1): T {
        let data: T;
        while(cnt >= 0) {
            data = this.inputDataSource.back(1);
            //we cannot use the data as skip index
            let nonFilteredValue = !! this._filterIdx?.[this._unfilteredPos];
            cnt = (nonFilteredValue) ? cnt - 1: cnt;
            this._unfilteredPos--;
        }
        return data;
    }

    reset(): void {
        this._current = null;
        this._filterIdx = {};
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

    back(cnt = 1): S {
        return this.mapFunc(this.inputDataSource.back(cnt));
    }

    current(): S {
        return this.mapFunc(this.inputDataSource.current());
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
    walkedDataSources= [];
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

    private resolveNextHasNext() {
        let next = false;
        while (!next && this.inputDataSource.hasNext()) {
            let mapped = this.mapFunc(this.inputDataSource.next());
            if (Array.isArray(mapped)) {
                this.walkedDataSources.push({
                    pos: this._currPos,
                    datasource: this.activeDataSource
                })
                this.activeDataSource = new ArrayStreamDataSource(...mapped);
            } else {
                this.activeDataSource = mapped;
            }
            next = this.activeDataSource.hasNext();
        }
        return next;
    }

    next(): S {
        if(this.hasNext()) {
            this._currPos++;
            return this.activeDataSource.next();
        }
    }

    reset(): void {
        this.inputDataSource.reset();
        this.walkedDataSources = [];
        this._currPos = 0;
    }

    back(cnt = 1): S {
        // we have to revert the active datasources until we reach the first one lower than pos - cnt
        // then we have set this to the active datasource
        //and then we have to move up until we hit xxx


        let ret = null;
        if(!this.walkedDataSources.length) {
            return this.activeDataSource.back(cnt);
        }
        while(!ret && this.walkedDataSources.length) {
            let datasource = this.walkedDataSources.pop();
            let startingPos = this._currPos - cnt;
            if(startingPos <= datasource.pos) {
                //found
                this.activeDataSource = datasource.datasource;
                this.activeDataSource.reset();
                const stepsForward = (this._currPos - datasource.pos - cnt);
                this._currPos = datasource.pos + stepsForward;

                for(let cnt = 0; cnt < stepsForward; cnt++) {
                    ret = this.activeDataSource.next()
                }

            }
        }

        //we probably have to stack datasources to implement this, for now we leave it out
        return ret;
    }

    current(): S {
        if(!this.activeDataSource) {
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
 * collects an tuple array stream into an assoc array with elements being collected into arrays
 *
 */
export class ArrayAssocArrayCollector<S> implements ICollector<[string, S] | string, {[key: string]: S} > {
    finalValue: {[key:string]: any} = {};

    collect(element: [string, S] | string) {
        let key = element?.[0] ?? <string> element;
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