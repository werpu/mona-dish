/**
 * Array with a set of shim functions for older browsers
 * we do not extend prototype (rule #1)
 */

export class ExtendedArray<T> extends Array<T> {

    constructor(...items: T[]) {
        super(...items);
        //es5 base class see //fix for es5 deficit from https://github.com/Microsoft/TypeScript/issues/13720

        //for testing it definitely runs into this branch because we are on es5 level
        if(!(<any>Array.prototype).flatMap) {
            let flatmapFun = (<any>ExtendedArray).prototype.flatMap;
            Object.setPrototypeOf(this, Array.prototype);
            this.flatMap = flatmapFun;
        }
    }

    flatMap(mapperFunction: Function, noFallback: boolean = false): Array<T> {

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

        return res;
    }

}