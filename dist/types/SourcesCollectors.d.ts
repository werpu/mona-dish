import { StreamMapper } from "./Stream";
import { DomQuery } from "./DomQuery";
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
    collect(element: T): any;
    /**
     * the final result after all the collecting is done
     */
    finalValue: S;
}
/**
 * defines a sequence of numbers for our stream input
 */
export declare class SequenceDataSource implements IStreamDataSource<number> {
    start: number;
    total: number;
    value: number;
    constructor(start: number, total: number);
    hasNext(): boolean;
    next(): number;
    back(cnt?: number): number;
    reset(): void;
    current(): number;
}
/**
 * implementation of iteratable on top of array
 */
export declare class ArrayStreamDataSource<T> implements IStreamDataSource<T> {
    value: Array<T>;
    dataPos: number;
    constructor(...value: Array<T>);
    hasNext(): boolean;
    next(): T;
    reset(): void;
    back(cnt?: number): T;
    current(): T;
}
/**
 * an intermediate data source which prefilters
 * incoming stream data
 * and lets only the data out which
 * passes the filter function check
 */
export declare class FilteredStreamDatasource<T> implements IStreamDataSource<T> {
    filterFunc: (T: any) => boolean;
    inputDataSource: IStreamDataSource<T>;
    _current: T;
    _filterIdx: {};
    _unfilteredPos: number;
    _nextStack: any[];
    constructor(filterFunc: (T: any) => boolean, parent: IStreamDataSource<T>);
    /**
     * in order to filter we have to make a look ahead until the
     * first next allowed element
     * hence we prefetch the element and then
     * serve it via next
     */
    hasNext(): boolean;
    /**
     * serve the next element
     */
    next(): T;
    current(): T;
    back(cnt?: number): T;
    reset(): void;
}
/**
 * an intermediate datasource which maps the items from
 * one into another
 */
export declare class MappedStreamDataSource<T, S> implements IStreamDataSource<S> {
    mapFunc: (T: any) => S;
    inputDataSource: IStreamDataSource<T>;
    constructor(mapFunc: (T: any) => S, parent: IStreamDataSource<T>);
    hasNext(): boolean;
    next(): S;
    reset(): void;
    back(cnt?: number): S;
    current(): S;
}
/**
 * Same for flatmap to deal with element -> stream mappings
 */
export declare class FlatMapStreamDataSource<T, S> implements IStreamDataSource<S> {
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
    walkedDataSources: any[];
    _currPos: number;
    constructor(func: StreamMapper<T>, parent: IStreamDataSource<T>);
    hasNext(): boolean;
    private resolveActiveHasNext;
    private resolveNextHasNext;
    next(): S;
    reset(): void;
    back(cnt?: number): S;
    current(): S;
}
/**
 * For the time being we only need one collector
 * a collector which collects a stream back into arrays
 */
export declare class ArrayCollector<S> implements ICollector<S, Array<S>> {
    private data;
    collect(element: S): void;
    get finalValue(): Array<S>;
}
/**
 * collects an tuple array stream into an assoc array with elements being collected into arrays
 *
 */
export declare class ArrayAssocArrayCollector<S> implements ICollector<[string, S] | string, {
    [key: string]: S;
}> {
    finalValue: {
        [key: string]: any;
    };
    collect(element: [string, S] | string): void;
}
/**
 * dummy collector which just triggers a run
 * on lazy streams without collecting anything
 */
export declare class Run<S> implements ICollector<S, any> {
    collect(element: S): void;
    get finalValue(): any;
}
/**
 * collects an assoc stream back to an assoc array
 */
export declare class AssocArrayCollector<S> implements ICollector<[string, S] | string, {
    [key: string]: S;
}> {
    finalValue: {
        [key: string]: any;
    };
    collect(element: [string, S] | string): void;
}
/**
 * Form data collector for key value pair streams
 */
export declare class FormDataCollector implements ICollector<{
    key: string;
    value: any;
}, FormData> {
    finalValue: FormData;
    collect(element: {
        key: string;
        value: any;
    }): void;
}
/**
 * Form data collector for DomQuery streams
 */
export declare class QueryFormDataCollector implements ICollector<DomQuery, FormData> {
    finalValue: FormData;
    collect(element: DomQuery): void;
}
/**
 * Encoded String collector from dom query streams
 */
export declare class QueryFormStringCollector implements ICollector<DomQuery, string> {
    formData: [[string, string]];
    collect(element: DomQuery): void;
    get finalValue(): string;
}
