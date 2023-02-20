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
        if(!(<any>Array.prototype).flatMap) {
            let flatmapFun = (<any>Es2019Array).prototype.flatMap_;
            //unfortunately in es5 the flatMap function is lost due to inheritance of a primitive
            //es  class, we have to remap it back in
            this.flatMap = flatmapFun;
        }
    }

    flatMap_(mapperFunction: Function, noFallback: boolean = false): Es2019Array<T> {

        let res = [];

        let remap = item => {
            let opRes = mapperFunction(item);
            if(Array.isArray(opRes)) {
                if(opRes.length == 1) {
                    res.push(opRes[1])
                    return;
                }
                if(opRes.length > 1) {
                    opRes.forEach(newItem => remap(newItem))
                }
            } else {
                res.push(item);
            }
        };
        this.forEach( item => remap(item) )

        return new Es2019Array(...res);
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
        return new Es2019Array(...super.filter(predicate, thisArg)  as any);
    }
}