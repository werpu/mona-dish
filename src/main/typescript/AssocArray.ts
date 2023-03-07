/*!
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * various helpers to deal with associative
 * arrays. If someone feels uncomfortable using
 * The config system, this is similar!
 */
import {IValueHolder} from "./Monad";
import {Es2019Array} from "./Es2019Array";

/**
 * A nop as assign functionality (aka ignore assign)
 */
const IGNORE_ASSIGN: IValueHolder<any> = new (class {
    set value(value: any | Array<any>) {
    }
})();

/**
 * uses the known pattern from config
 * assign(target, key1, key2, key3).value = value;
 * @param target
 * @param keys
 */
export function assign<T>(target: {[key: string]: any}, ...accessPath: string[]): IValueHolder<T> {
    if (accessPath.length < 1) {
        return IGNORE_ASSIGN;
    }
    const lastPathItem = buildPath(target, ...accessPath);
    let assigner: IValueHolder<T> = new (class {
        set value(value: T | Array<T>) {
            lastPathItem.target[lastPathItem.key] = value;
        }
    })();
    return assigner;
}


export function append<T>(target: {[key: string]: any}, ...accessPath: string[]): IValueHolder<T> {
    if (accessPath.length < 1) {
        return IGNORE_ASSIGN;
    }
    const lastPathItem = buildPath(target, ...accessPath);
    let appender: IValueHolder<T> = new (class {
        set value(value: T | Array<T>) {
            if(!Array.isArray(value)) {
                value = [value];
            }
            if(!lastPathItem.target[lastPathItem.key]) {
                lastPathItem.target[lastPathItem.key] = value
            } else {
                if(!Array.isArray(lastPathItem.target[lastPathItem.key])) {
                    lastPathItem.target[lastPathItem.key] = [lastPathItem.target[lastPathItem.key]];
                }
                lastPathItem.target[lastPathItem.key].push(...value);
            }
        }y
    })();
    return appender;
}

/**
 * uses the known pattern from config
 * assign(target, key1, key2, key3).value = value;
 * @param target
 * @param keys
 */
export function assignIf<T>(condition: boolean, target: {[key: string]: any}, ...accessPath: string[]): IValueHolder<T> {
    if (accessPath.length < 1) {
        return IGNORE_ASSIGN;
    }
    return assign(target, ...accessPath);
}


function keyVal(key: string): string {
    let start = key.indexOf("[");

    if (start >= 0) {
        return key.substring(0, start);
    } else {
        return key;
    }
}

function arrayIndex(key: string): number {
    let start = key.indexOf("[");
    let end = key.indexOf("]");
    if (start >= 0 && end > 0 && start < end) {
        return parseInt(key.substring(start + 1, end));
    } else {
        return -1;
    }
}

function isArrayPos(currKey: string, arrPos: number): boolean {
    return currKey === "" && arrPos >= 0;
}

function isNoArray(arrPos: number): boolean {
    return arrPos == -1;
}

function alloc(arr: Array<any>, length: number) {
    let toAdd = [];
    toAdd.length = length;
    toAdd[length - 1] = {};
    arr.push(...toAdd);
}

function preprocessKeys(...keys): string[] {
    return new Es2019Array(...keys)
        .flatMap(item => {
            return new Es2019Array(...item.split(/]\s*\[/gi))
                .map(item => {
                    item = item.replace(/^\s+|\s+$/g, "");
                    if(item.indexOf("[") == -1 && item.indexOf("]") != -1) {
                        item = "[" + item;
                    }
                    if(item.indexOf("]") == -1 && item.indexOf("[") != -1) {
                        item = item + "]";
                    }
                    return item;
                })
        });
}

/**
 * builds up a path
 * @param target
 * @param accessPath
 * @returns the last assignable entry
 */
function buildPath(target, ...accessPath: string[]): { target, key } {
    let val = target;
    let parentVal = target;
    let targetVal = val;
    let parentPos = -1;
    let targetKey = null;
    accessPath = preprocessKeys(...accessPath);
    for (let cnt = 0; cnt < accessPath.length; cnt++) {
        let currKey = keyVal(accessPath[cnt]);
        let arrPos = arrayIndex(accessPath[cnt]);

        if (isArrayPos(currKey, arrPos)) {
            targetVal[targetKey] = [];
            alloc(targetVal[targetKey], arrPos + 1);
            parentVal = targetVal[targetKey];
            val = targetVal[targetKey][arrPos];
            targetKey = arrPos;
            parentPos = arrPos;
            continue;
        }

        let tempVal = val?.[currKey];
        if (isNoArray(arrPos)) {
            if ('undefined' == typeof tempVal) {
                tempVal = val[currKey] = {};
            } else {
                val = tempVal;
            }
        } else {
            let arr = (tempVal instanceof Array) ? tempVal : [];
            alloc(arr, arrPos + 1);
            val[currKey] = arr;
            tempVal = arr[arrPos];
        }
        parentVal = val;
        parentPos = arrPos;
        val = tempVal;
        targetKey = arrPos == -1 ? currKey : arrPos;
        targetVal = arrPos == -1 ? parentVal: parentVal[currKey];
    }
    // clear off the last value, it is not set yet
    targetVal[targetKey] = null;
    return {target: targetVal, key: targetKey};
}

export function deepCopy(fromAssoc: {[key: string]: any}): {[key: string]: any} {
    return JSON.parse(JSON.stringify(fromAssoc));
}

/**
 * simple left to right merge
 *
 * @param assocArrays
 */
export function simpleShallowMerge(...assocArrays) {
   return shallowMerge(true, false, ...assocArrays);
}

/**
 * Shallow merge as in config
 *
 * @param overwrite
 * @param withAppend
 * @param assocArrays
 */
export function shallowMerge(overwrite = true, withAppend = false, ...assocArrays) {
    let target: {[key: string]: any} = {};
    assocArrays.map(arr => {
        return {arr, keys: Object.keys(arr)};
    }).forEach(({arr, keys}) => {
        keys.forEach(key => {
            if(overwrite || !target?.[key]) {
                if(!withAppend) {
                    target[key] = arr[key];
                } else {
                    if (Array.isArray(arr[key])) {
                        if('undefined' == typeof target?.[key]) {
                            target[key] = new Es2019Array(...arr[key])
                        } else if(!Array.isArray(target[key])) {
                            let oldVal = target[key];
                            target[key] = new Es2019Array(...[]);
                            target[key].push(oldVal);
                            target[key].push(...arr[key]);
                        } else {
                            target[key].push(...arr[key]);
                        }
                        //new Es2019Array(...arr[key]).forEach(item => this.append(key).value = item);
                    } else {
                        if('undefined' == typeof target?.[key]) {
                            target[key] = arr[key];
                        } else if(!Array.isArray(target[key])) {
                            let oldVal = target[key];
                            target[key] = new Es2019Array(...[]);
                            target[key].push(oldVal);
                            target[key].push(arr[key]);
                        } else {
                            target[key].push(arr[key]);
                        }
                    }
                }
            }
        })
    });
    return target;
}

