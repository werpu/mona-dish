

export interface Probe1 {
    val1: string;
    val2: Date;
    val3: any;
    val4: Probe2[];
    val5: Probe2;
    val6: any;
}

export interface Probe2 {
    val1: string;
}

class ArrType {


    constructor(public clazz: any) {

    }
}


class DtoUils {

    static mapIt(target: any, src: any, mappings: any): any {
        for (let key in src) {
            if (!src.hasOwnProperty(key)) {
                continue;
            }

            let newVal = src[key];
            if (mappings[key]  &&
                mappings[key] instanceof ArrType) {
                //do the array here
                (<any>target)[key] = {};

                for (let key2 in newVal) {
                    let subTarget = new mappings[key].clazz(newVal[key2]);
                    //   subTarget = this.mapIt(subTarget, <any> newVal[key2]);
                    (<any>target)[key][key2] = subTarget;
                }
            } else if (mappings && mappings[key]) {
                let subTarget = new mappings[key](newVal);

                (<any>target)[key] = subTarget;
            } else {
                (<any>target)[key] = newVal
            }

        }

        return target;
    }

}

class BaseDto<T> {

    TYPES = "___mappable_types___";

    constructor(data?: T, dtoTypes: any = {}) {

        this[this.TYPES] = dtoTypes;

        if (data) {
            this.mapIt(this, data);
        }
    }


    mapIt(target: any, src: any): any {
        for (let key in src) {
            if (!src.hasOwnProperty(key)) {
                continue;
            }

            let newVal = src[key];
            if (target[this.TYPES] &&
                target[this.TYPES][key]  &&
                target[this.TYPES][key] instanceof ArrType) {
                //do the array here
                (<any>target)[key] = {};

                for (let key2 in newVal) {
                    let subTarget = new target[this.TYPES][key].clazz(newVal[key2]);
                 //   subTarget = this.mapIt(subTarget, <any> newVal[key2]);
                    (<any>target)[key][key2] = subTarget;
                }
            } else if (target[this.TYPES] && target[this.TYPES][key]) {
                let subTarget = new target[this.TYPES][key](newVal);

                (<any>target)[key] = subTarget;
            } else {
                (<any>target)[key] = newVal
            }

        }

        return target;
    }

}

export class Probe2Impl implements Probe2 {

    val1: string;

    constructor(data: Probe2) {
        this.val1 = data.val1;
    }
}

function mixMaps(target: any, src: any): any {
    for(var key in src) {
        target[key] = src[key];
    }
    return target;
}

export class Probe1Impl  implements Probe1 {

    val1: string;
    val2: Date;
    val3: any;
    val4: Probe2[];
    val5: Probe2;
    val6: any;

    constructor(data: Probe1, mixin: any = {} /*put your own arguments in here*/) {
        DtoUils.mapIt(this, data, mixMaps({
            val3: new ArrType(Probe2Impl),
            val4: new ArrType(Probe2Impl),
            val5: Probe2Impl
        }, mixin))
    }

}