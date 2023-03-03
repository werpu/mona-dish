/**
 * Extended array
 */
/**
 * Extended array which adds various es 2019 shim functions to the normal array
 * We must remap all array producing functions in order to keep
 * the delegation active, once we are in!
 */
export class Es2019Array extends Array {
    constructor(...another) {
        super(...another);
        //for testing it definitely runs into this branch because we are on es5 level
        if (!Array.prototype.flatMap) {
            this.flatMap = (flatMapFun) => this._flatMap(flatMapFun);
        }
        if (!Array.prototype.flat) {
            this.flat = (flatLevel = 1) => this._flat(flatLevel);
        }
    }
    map(callbackfn, thisArg) {
        return new Es2019Array(...super.map(callbackfn));
    }
    concat(...items) {
        return new Es2019Array(...super.concat(...items));
    }
    reverse() {
        return new Es2019Array(...super.reverse());
    }
    slice(start, end) {
        return new Es2019Array(...super.slice(start, end));
    }
    splice(start, deleteCount) {
        return new Es2019Array(...super.splice(start, deleteCount));
    }
    filter(predicate, thisArg) {
        return new Es2019Array(...super.filter(predicate, thisArg));
    }
    _flat(flatDepth = 1) {
        return this._flatResolve(this, flatDepth);
    }
    _flatResolve(arr, flatDepth = 1) {
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
        arr.forEach(reFlat);
        return new Es2019Array(...res);
    }
    _flatMap(mapperFunction, noFallback = false) {
        let res = this.map(item => mapperFunction(item));
        return this._flatResolve(res);
    }
}
//# sourceMappingURL=Es2019Array.js.map