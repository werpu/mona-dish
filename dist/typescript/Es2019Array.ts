/**
 * Extended array
 */

/**
 * Extended array which adds various es 2019 shim functions to the normal array
 * We must remap all array producing functions in order to keep
 * the delegation active, once we are in!
 */
export class Es2019Array<T> extends Array<T> {

    constructor(...another: T[]) {
        super(...another);
        //for testing it definitely runs into this branch because we are on es5 level
        if (!(<any>Array.prototype).flatMap) {
            this.flatMap = (flatMapFun) => this._flatMap(flatMapFun) as any;
        }
        if (!(<any>Array.prototype).flat) {
            this.flat = (flatLevel: number = 1) => this._flat(flatLevel);
        }
    }

    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] {
        return new Es2019Array<U>(...super.map(callbackfn));
    }

    concat(...items): T[] {
        return new Es2019Array(...super.concat(...items));
    }

    reverse(): T[] {
        return new Es2019Array(...super.reverse());
    }

    slice(start?: number, end?: number): T[] {
        return new Es2019Array(...super.slice(start, end));
    }

    splice(start: number, deleteCount?: number): T[] {
        return new Es2019Array(...super.splice(start, deleteCount));
    }

    filter<S extends T>(predicate: (value: T, index: number, array: T[]) => any, thisArg?: any): S[] {
        return new Es2019Array(...super.filter(predicate, thisArg) as any);
    }


    private _flat(flatDepth = 1) {
        return this._flatResolve(this, flatDepth);
    }

    private _flatResolve(arr, flatDepth = 1) {
        //recursion break
        if (flatDepth == 0) {
            return arr;
        }
        let res = [];

        let reFlat = item => {
            item = Array.isArray(item) ? item : [item];
            let mapped = this._flatResolve(item, flatDepth - 1);
            res = res.concat(mapped);
        };
        arr.forEach(reFlat)

        return new Es2019Array(...res);
    }

    private _flatMap(mapperFunction: Function, noFallback: boolean = false): Es2019Array<T> {
        let res = this.map(item => mapperFunction(item));
        return this._flatResolve(res);
    }
}