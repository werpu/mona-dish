/**
 * IFunctor interface,
 * defines an interface which allows to map a functor
 * via a first order function to another functor
 */
export interface IFunctor<T> {
    map<R>(fn: (data: T) => R): IFunctor<R>;
}
/**
 * IMonad definition, basically a functor with a flaptmap implementation (flatmap reduces all nested monads after a
 * function call f into a monad with the nesting level of 1
 *
 * flatmap flats nested Monads into a IMonad of the deepest nested implementation
 */
export interface IMonad<T, M extends IMonad<any, any>> extends IFunctor<T> {
    flatMap<T, M>(f: (T: any) => M): IMonad<any, any>;
}
/**
 * a stateful functor which holds a value upn which a
 * function can be applied
 *
 * as value holder of type T
 */
export interface IIdentity<T> extends IFunctor<T> {
    readonly value: T;
}
/**
 *  custom value holder definition, since we are not pure functional
 *  but iterative we have structures which allow the assignment of a value
 *  also not all structures are sideffect free
 */
export interface IValueHolder<T> {
    value: T | Array<T>;
}
/**
 * Implementation of a monad
 * (Sideffect free), no write allowed directly on the monads
 * value state
 */
export declare class Monad<T> implements IMonad<T, Monad<any>>, IValueHolder<T> {
    protected _value: T;
    constructor(value: T);
    map<R>(fn?: (data: T) => R): Monad<R>;
    flatMap<R>(fn?: (data: T) => R): Monad<any>;
    readonly value: T;
}
export declare class Stream<T> implements IMonad<T, Stream<any>>, IValueHolder<Array<T>> {
    static of<T>(...data: Array<T>): Stream<T>;
    value: Array<T>;
    constructor(...value: T[]);
    each(fn: (data: T, pos?: number) => void | boolean): this;
    map<R>(fn?: (data: T) => R): Stream<R>;
    flatMap<R>(fn?: (data: T) => R): Stream<any>;
    filter(fn?: (data: T) => boolean): Stream<T>;
    reduce(fn: (val1: T, val2: T) => T, startVal?: T): Optional<T>;
    first(): Optional<T>;
    last(): Optional<T>;
    anyMatch(fn: (data: T) => boolean): boolean;
    allMatch(fn: (data: T) => boolean): boolean;
    noneMatch(fn: (data: T) => boolean): boolean;
    private mapStreams;
}
/**
 * optional implementation, an optional is basically an implementation of a Monad with additional syntactic
 * sugar on top
 * (Sideeffect free, since value assignment is not allowed)
 * */
export declare class Optional<T> extends Monad<T> {
    constructor(value: T);
    static fromNullable<T>(value?: T): Optional<T>;
    static absent: Optional<any>;
    isAbsent(): boolean;
    isPresent(): boolean;
    orElse(elseValue: any): Optional<any>;
    /**
     * lazy, passes a function which then is lazily evaluated
     * instead of a direct value
     * @param func
     */
    orElseLazy(func: () => any): Optional<any>;
    flatMap<R>(fn?: (data: T) => R): Optional<any>;
    /**
     * additional syntactic sugar which is not part of the usual optional implementation
     * but makes life easier, if you want to sacrifice typesafety and refactoring
     * capabilities in typescript
     */
    private getIfPresent;
    getIf<R>(...key: string[]): Optional<R>;
    readonly value: T;
    /**
     * simple match, if the first order function call returns
     * true then there is a match, if the value is not present
     * it never matches
     *
     * @param fn the first order function performing the match
     */
    match(fn: (item: T) => boolean): boolean;
    /**
     * convenience function to flatmap the internal value
     * and replace it with a default in case of being absent
     *
     * @param defaultVal
     * @returns {Optional<any>}
     */
    get<R>(defaultVal?: any): Optional<R>;
    /**
     * helper to override several implementations in a more fluent way
     * by having a getClass operation we can avoid direct calls into the constructor or
     * static methods and do not have to implement several methods which rely on the type
     * of "this"
     * @returns {Monadish.Optional}
     */
    protected getClass(): any;
    toJson(): string;
    protected arrayIndex(key: string): number;
    protected keyVal(key: string): string;
}
/**
 * Config, basically an optional wrapper for a json structure
 * (not sideeffect free, since we can alter the internal config state
 * without generating a new config), not sure if we should make it sideffect free
 * since this would swallow a lot of performane and ram
 */
export declare class Config extends Optional<any> {
    constructor(root: any);
    static fromNullable<T>(value?: any): Config;
    apply(...keys: Array<any>): IValueHolder<any>;
    applyIf(condition: boolean, ...keys: Array<any>): IValueHolder<any>;
    getIf(...keys: Array<string>): Config;
    get(defaultVal: any): Config;
    delete(key: string): Config;
    toJson(): any;
    readonly shallowCopy: Config;
    protected getClass(): any;
    private setVal;
    private buildPath;
}
export declare enum PromiseStatus {
    PENDING = 0,
    FULLFILLED = 1,
    REJECTED = 2
}
export interface IPromise {
    then(executorFunc: (val: any) => any): IPromise;
    catch(executorFunc: (val: any) => any): IPromise;
    finally(executorFunc: () => void): IPromise;
}
