import { IMonad, Optional } from "./Monad";
import { ICollector, IStream } from "./Stream";
/**
 * Iterateable for stream
 */
interface IStreamDataSource<T> {
    /**
     * @returns true if additional data is present
     */
    hasNext(): boolean;
    /**
     * false if not
     */
    next(): T;
    /**
     * resets the position to the beginning
     */
    reset(): void;
}
/**
 * Lazy implementation of a Stream
 * The idea is to connect the intermediate
 * streams as datasources like a linked list
 * with reverse referencing
 * and for special operations like filtering
 * flatmapping have intermediate datasources in the list
 * with specialized functions.
 *
 * That way we can have a lazy evaluating stream
 *
 * So on the endpoints side, every call to get an element
 * triggers a chain of operations to the parents with then
 * perform a set of monadic operations until the data hits
 * the endpoint
 */
export declare class LazyStream<T> implements IStreamDataSource<T>, IStream<T>, IMonad<T, LazyStream<any>> {
    protected parent: IStreamDataSource<T>;
    pos: number;
    _limits: number;
    static of<T>(...values: Array<T>): LazyStream<T>;
    constructor(parent: any);
    hasNext(): boolean;
    next(): T;
    reset(): void;
    nextFilter(fn: (T: any) => boolean): T;
    limits(max: number): LazyStream<T>;
    collect(collector: ICollector<T, any>): any;
    onElem(fn: (data: T, pos?: number) => boolean | void): LazyStream<T>;
    filter(fn: (data: T) => boolean): LazyStream<T>;
    map<R>(fn: (data: T) => any): LazyStream<any>;
    flatMap<R>(fn: (data: T) => R): LazyStream<any>;
    each(fn: (T: any) => void | boolean): void;
    reduce(fn: (val1: T, val2: T) => T, startVal?: T): Optional<T>;
    last(): Optional<T>;
    first(): Optional<T>;
    anyMatch(fn: (data: T) => boolean): boolean;
    allMatch(fn: (data: T) => boolean): boolean;
    noneMatch(fn: (data: T) => boolean): boolean;
    readonly value: Array<T>;
    private stop;
}
export {};
