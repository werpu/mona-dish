/**
 * Extended array
 */
/**
 * Max number of elements passed per function call.
 * Spreading or applying a large array into a single call
 * ("fn(...data)") overflows the argument stack on most browsers
 * (Chrome throws "RangeError: Maximum call stack size exceeded"
 * at roughly 65k arguments), so bulk operations must be chunked.
 */
export declare const MAX_ARG_LENGTH = 30000;
/**
 * Appends the contents of source to target in argument-stack-safe chunks,
 * the chunk-safe replacement for target.push(...source)
 *
 * @param target the array to append to
 * @param source the elements to append
 * @returns target for chaining
 */
export declare function pushChunked<T>(target: T[], source: ArrayLike<T>): T[];
/**
 * Extended array which adds various es 2019 shim functions to the normal array
 * We must remap all array producing functions in order to keep
 * the delegation active, once we are in!
 */
declare class Es2019Array_<T> extends Array<T> {
    _another: T[];
    constructor(another?: T[]);
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
    concat(...items: any[]): T[];
    reverse(): T[];
    slice(start?: number, end?: number): T[];
    splice(start: number, deleteCount?: number): T[];
    filter<S extends T>(predicate: (value: T, index: number, array: T[]) => any, thisArg?: any): S[];
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
    private _flat;
    private _flatResolve;
    private _flatMap;
}
export declare function _Es2019Array<T>(...data: T[]): Es2019Array_<T>;
/**
 * chunk-safe variant of _Es2019Array which takes the backing array
 * directly instead of spreading it into the call
 */
export declare function _Es2019ArrayFromArr<T>(data: T[]): Es2019Array_<T>;
/**
 * this is the switch between normal array and our shim
 * the shim is only provided in case the native browser
 * does not yet have flatMap support on arrays
 */
interface Es2019ArrayConstructor {
    new <T = any>(...data: any[]): T[];
    <T = any>(...data: any[]): T[];
}
export declare var Es2019Array: Es2019ArrayConstructor;
/**
 * chunk-safe variant of new Es2019Array(...source) -
 * spreading a large array into the constructor call overflows the
 * argument stack ("Maximum call stack size exceeded"), this builder
 * copies the data over in safe chunks instead
 *
 * @param source an array or array-like holding the initial data
 */
export declare function Es2019ArrayFrom<T>(source: ArrayLike<T>): T[];
export {};
