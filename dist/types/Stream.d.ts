import { IMonad, IValueHolder, Optional } from "./Monad";
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
 * Generic interface defining a stream
 */
export interface IStream<T> {
    onElem(fn: (data: T, pos?: number) => void | boolean): IStream<T>;
    each(fn: (data: T, pos?: number) => void | boolean): void;
    map<R>(fn?: (data: T) => R): IStream<R>;
    flatMap<R>(fn?: (data: T) => R): IStream<any>;
    filter(fn?: (data: T) => boolean): IStream<T>;
    reduce(fn: (val1: T, val2: T) => T, startVal: T): Optional<T>;
    first(): Optional<T>;
    last(): Optional<T>;
    anyMatch(fn: (data: T) => boolean): boolean;
    allMatch(fn: (data: T) => boolean): boolean;
    noneMatch(fn: (data: T) => boolean): boolean;
    collect(collector: ICollector<T, any>): any;
}
/**
 * A simple typescript based reimplementation of streams
 *
 * For the time being streams are early evaluated
 * will be removed to lazy streams soon as I have time to work on them
 */
export declare class Stream<T> implements IMonad<T, Stream<any>>, IValueHolder<Array<T>>, IStream<T> {
    value: Array<T>;
    constructor(...value: T[]);
    static of<T>(...data: Array<T>): Stream<T>;
    onElem(fn: (data: T, pos?: number) => void | boolean): Stream<T>;
    each(fn: (data: T, pos?: number) => void | boolean): void;
    map<R>(fn?: (data: T) => R): Stream<R>;
    flatMap<R>(fn?: (data: T) => R): Stream<any>;
    filter(fn?: (data: T) => boolean): Stream<T>;
    reduce(fn: (val1: T, val2: T) => T, startVal?: T): Optional<T>;
    first(): Optional<T>;
    last(): Optional<T>;
    anyMatch(fn: (data: T) => boolean): boolean;
    allMatch(fn: (data: T) => boolean): boolean;
    noneMatch(fn: (data: T) => boolean): boolean;
    collect(collector: ICollector<T, any>): any;
    private mapStreams;
}
/**
 * For the time being we only need one collector
 * a collector which collects a stream back into arrays
 */
export declare class ArrayCollector<S> implements ICollector<S, Array<S>> {
    private data;
    collect(element: S): void;
    readonly finalValue: Array<S>;
}
