/**
 * A module which keeps  basic monadish like definitions in place without any sidedependencies to other modules.
 * Useful if you need the functions in another library to keep its dependencies down
 */
import { IMonad, IOptional, IValueEmbedder, IValueHolder } from "./Types";
export declare class Monad<T> implements IMonad<T, Monad<any>>, IValueHolder<T> {
    constructor(value: T);
    protected _value: T;
    get value(): T;
    map<R>(fn?: (data: T) => R): Monad<R>;
    flatMap<R>(fn?: (data: T) => R): Monad<any>;
}
/**
 * optional implementation, an optional is basically an implementation of a Monad with additional syntactic
 * sugar on top
 * (Sideeffect free, since value assignment is not allowed)
 * */
export declare class Optional<T> extends Monad<T> implements IOptional<T> {
    static absent: IOptional<any>;
    constructor(value: T);
    get value(): T;
    static fromNullable<T>(value?: T): IOptional<T>;
    isAbsent(): boolean;
    /**
     * any value present
     */
    isPresent(presentRunnable?: (val?: IMonad<T, any>) => void): boolean;
    ifPresentLazy(presentRunnable?: (val?: Monad<T>) => void): IMonad<T, any>;
    orElse(elseValue: any): IOptional<any>;
    /**
     * lazy, passes a function which then is lazily evaluated
     * instead of a direct value
     * @param func
     */
    orElseLazy(func: () => any): IOptional<any>;
    flatMap<R>(fn?: (data: T) => R): Optional<any>;
    getIf<R>(...key: string[]): IOptional<R>;
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
    toJson(): string;
    /**
     * helper to override several implementations in a more fluent way
     * by having a getClass operation we can avoid direct calls into the constructor or
     * static methods and do not have to implement several methods which rely on the type
     * of "this"
     * @returns {Monadish.Optional}
     */
    getClass(): any;
    arrayIndex(key: string): number;
    keyVal(key: string): string;
    /**
     * additional syntactic sugar which is not part of the usual optional implementation
     * but makes life easier, if you want to sacrifice typesafety and refactoring
     * capabilities in typescript
     */
    getIfPresent<R>(key: string): Optional<R>;
    /**
     * elvis like typesafe functional save resolver
     * a typesafe option for getIfPresent
     *
     * usage myOptional.resolve(value => value.subAttr.subAttr2).orElseLazy(....)
     * if this is resolvable without any errors an Optional with the value is returned
     * if not, then an Optional absent is returned, also if you return Optional absent
     * it is flatmapped into absent
     *
     * @param resolver the resolver function, can throw any arbitrary errors, int  the error case
     * the resolution goes towards absent
     */
    resolve<V>(resolver: (item: T) => V): IOptional<V>;
}
/**
 * ValueEmbedder is the writeable version
 * of optional, it basically is a wrappber
 * around a construct which has a state
 * and can be written to.
 *
 * For the readonly version see Optional
 */
export declare class ValueEmbedder<T> extends Optional<T> implements IValueEmbedder<T> {
    static absent: ValueEmbedder<unknown>;
    protected key: string;
    constructor(rootElem: any, valueKey?: string);
    get value(): T;
    set value(newVal: T);
    orElse(elseValue: any): Optional<any>;
    orElseLazy(func: () => any): Optional<any>;
    /**
     * helper to override several implementations in a more fluent way
     * by having a getClass operation we can avoid direct calls into the constructor or
     * static methods and do not have to implement several methods which rely on the type
     * of "this"
     * @returns {Monadish.Optional}
     */
    getClass(): any;
    static fromNullable<T>(value?: any, valueKey?: string): ValueEmbedder<T>;
}
