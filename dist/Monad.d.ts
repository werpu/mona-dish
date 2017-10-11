/**
 * A module which keeps  basic monadish like definitions in place without any sidedependencies to other modules.
 * Useful if you need the functions in another library to keep its dependencies down
 */
declare module "Monadish" {


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
        value: T;
    }
    /**
     * Implementation of a monad
     * (Sideffect free), no write allowed directly on the monads
     * value state
     */
    export class Monad<T> implements IMonad<T, Monad<any>> {
        protected _value: T;
        constructor(value: T);
        map<R>(fn?: (data: T) => R): Monad<R>;
        flatMap<R>(fn?: (data: T) => R): Monad<any>;
        readonly value: T;
    }
    /**
     * optional implementation, an optional is basically an implementation of a Monad with additional syntactic
     * sugar on top
     * (Sideeffect free, since value assignment is not allowed)
     * */
    export class Optional<T> extends Monad<T> {
        constructor(value: T);
        static fromNullable<T>(value?: T): Optional<T>;
        static absent: Optional<any>;
        isAbsent(): boolean;
        isPresent(): boolean;
        presentOrElse(elseValue: any): Optional<any>;
        flatMap<R>(fn?: (data: T) => R): Optional<any>;
        /**
         * additional syntactic sugar which is not part of the usual optional implementation
         * but makes life easier, if you want to sacrifice typesafety and refactoring
         * capabilities in typescript
         */
        private getIfPresent<R>(key);
        getIf<R>(...key: string[]): Optional<R>;
        readonly value: T;
        /**
         * convenience function to flatmap the internal value
         * and replace it with a default in case of being absent
         *
         * @param defaultVal
         * @returns {Optional<any>}
         */
        get<R>(defaultVal: any): Optional<R>;
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
    export class Config extends Optional<any> {
        constructor(root: any);
        static fromNullable<T>(value?: any): Config;
        apply(...keys: Array<any>): IValueHolder<any>;
        getIf(...keys: Array<string>): Config;
        get(defaultVal: any): Config;
        toJson(): any;
        protected getClass(): any;
        private setVal(val);
        private buildPath(keys);
    }
    export enum PromiseStatus {
        PENDING = 0,
        FULLFILLED = 1,
        REJECTED = 2,
    }
    export interface IPromise {
        then(executorFunc: (val: any) => any): IPromise;
        catch(executorFunc: (val: any) => any): IPromise;
        finally(executorFunc: () => void): IPromise;
    }
    /**
     * a small (probably not 100% correct, although I tried to be correct as possible) Promise implementation
     * for systems which do not have a promise implemented
     * Note, although an internal state is kept, this is sideffect free since
     * is value is a function to operate on, hence no real state is kept internally, except for the then
     * and catch calling order
     */
    export class Promise implements IPromise {
        private value;
        status: PromiseStatus;
        protected allFuncs: Array<any>;
        constructor(executor: (resolve: (val?: any) => void, reject: (val?: any) => void) => void);
        static all(...promises: Array<IPromise>): IPromise;
        static race(...promises: Array<IPromise>): IPromise;
        static reject(reason: any): Promise;
        static resolve(reason: any): Promise;
        then(executorFunc: (val?: any) => any, catchfunc?: (val?: any) => any): Promise;
        catch(executorFunc: (val?: any) => void): Promise;
        finally(executorFunc: () => void): Promise;
        private spliceLastFuncs();
        protected resolve(val?: any): void;
        protected reject(val?: any): void;
        private transferIntoNewPromise(val);
        protected appyFinally(): void;
    }
    /**
     * a cancellable promise
     * a Promise with a cancel function, which can be cancellend any time
     * this is useful for promises which use cancellable asynchronous operations
     * note, even in a cancel state, the finally of the promise is executed, however
     * subsequent thens are not anymore.
     * The current then however is fished or a catch is called depending on how the outer
     * operation reacts to a cancel order.
     */
    export class CancellablePromise extends Promise {
        private cancellator;
        /**
         * @param executor asynchronous callback operation which triggers the callback
         * @param cancellator cancel operation, separate from the trigger operation
         */
        constructor(executor: (resolve: (val?: any) => void, reject: (val?: any) => void) => void, cancellator: () => void);
        cancel(): void;
        then(executorFunc: (val?: any) => any, catchfunc?: (val?: any) => any): CancellablePromise;
        catch(executorFunc: (val?: any) => void): CancellablePromise;
        finally(executorFunc: () => void): CancellablePromise;
    }


}
