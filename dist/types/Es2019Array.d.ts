/**
 * Extended array
 */
/**
 * Extended array which adds various es 2019 shim functions to the normal array
 * We must remap all array producing functions in order to keep
 * the delegation active, once we are in!
 */
export declare class Es2019Array<T> extends Array<T> {
    constructor(...another: T[]);
    concat(...items: any[]): T[];
    reverse(): T[];
    slice(start?: number, end?: number): T[];
    splice(start: number, deleteCount?: number): T[];
    filter<S extends T>(predicate: (value: T, index: number, array: T[]) => any, thisArg?: any): S[];
    private _flat;
    private _flatResolve;
    private _flatMap;
}
