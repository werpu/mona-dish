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
 * A module which keeps  basic monad like definitions in place
 * Useful if you need the functions in another library to keep its dependencies down
 */
/*IMonad definitions*/
import { Lang } from "./Lang";
import { Es2019Array } from "./Es2019Array";
var objAssign = Lang.objAssign;
/**
 * Implementation of a monad
 * (Side - effect free), no write allowed directly on the monads
 * value state
 */
export class Monad {
    constructor(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
    map(fn) {
        if (!fn) {
            fn = (inVal) => inVal;
        }
        let result = fn(this.value);
        return new Monad(result);
    }
    flatMap(fn) {
        let mapped = this.map(fn);
        while ((mapped === null || mapped === void 0 ? void 0 : mapped.value) instanceof Monad) {
            mapped = mapped.value;
        }
        return mapped;
    }
}
/**
 * optional implementation, an optional is basically an implementation of a Monad with additional syntactic
 * sugar on top
 * (Side - effect free, since value assignment is not allowed)
 * */
export class Optional extends Monad {
    constructor(value) {
        super(value);
    }
    get value() {
        if (this._value instanceof Monad) {
            return this._value.flatMap().value;
        }
        return this._value;
    }
    static fromNullable(value) {
        return new Optional(value);
    }
    /*syntactic sugar for absent and present checks*/
    isAbsent() {
        return "undefined" == typeof this.value || null == this.value;
    }
    /**
     * any value present
     */
    isPresent(presentRunnable) {
        let absent = this.isAbsent();
        if (!absent && presentRunnable) {
            presentRunnable.call(this, this);
        }
        return !absent;
    }
    ifPresentLazy(presentRunnable = () => {
    }) {
        this.isPresent.call(this, presentRunnable);
        return this;
    }
    orElse(elseValue) {
        if (this.isPresent()) {
            return this;
        }
        else {
            //shortcut
            if (elseValue == null) {
                return Optional.absent;
            }
            return this.flatMap(() => elseValue);
        }
    }
    /**
     * lazy, passes a function which then is lazily evaluated
     * instead of a direct value
     * @param func
     */
    orElseLazy(func) {
        if (this.isPresent()) {
            return this;
        }
        else {
            return this.flatMap(func);
        }
    }
    /*
     * we need to implement it to fulfill the contract, although it is used only internally
     * all values are flattened when accessed anyway, so there is no need to call this method
     */
    flatMap(fn) {
        let val = super.flatMap(fn);
        if (!(val instanceof Optional)) {
            return Optional.fromNullable(val.value);
        }
        return val.flatMap();
    }
    /*
     * elvis operation, take care, if you use this you lose typesafety and refactoring
     * capabilities, unfortunately typescript does not allow to have its own elvis operator
     * this is some syntactic sugar however which is quite useful*/
    getIf(...key) {
        key = this.preprocessKeys(...key);
        let currentPos = this;
        for (let cnt = 0; cnt < key.length; cnt++) {
            let currKey = this.keyVal(key[cnt]);
            let arrPos = this.arrayIndex(key[cnt]);
            if (currKey === "" && arrPos >= 0) {
                currentPos = this.getClass().fromNullable(!(currentPos.value instanceof Array) ? null : (currentPos.value.length < arrPos ? null : currentPos.value[arrPos]));
                if (currentPos.isAbsent()) {
                    return currentPos;
                }
                continue;
            }
            else if (currKey && arrPos >= 0) {
                if (currentPos.getIfPresent(currKey).isAbsent()) {
                    return currentPos;
                }
                currentPos = (currentPos.getIfPresent(currKey).value instanceof Array) ? this.getClass().fromNullable(currentPos.getIfPresent(currKey).value[arrPos]) : this.getClass().absent;
                if (currentPos.isAbsent()) {
                    return currentPos;
                }
                continue;
            }
            else {
                currentPos = currentPos.getIfPresent(currKey);
            }
            if (currentPos.isAbsent()) {
                return currentPos;
            }
            else if (arrPos > -1) {
                currentPos = this.getClass().fromNullable(currentPos.value[arrPos]);
            }
        }
        return currentPos;
    }
    /**
     * simple match, if the first order function call returns
     * true then there is a match, if the value is not present
     * it never matches
     *
     * @param fn the first order function performing the match
     */
    match(fn) {
        if (this.isAbsent()) {
            return false;
        }
        return fn(this.value);
    }
    /**
     * convenience function to flatmap the internal value
     * and replace it with a default in case of being absent
     *
     * @param defaultVal
     * @returns {Optional<any>}
     */
    get(defaultVal = Optional.absent) {
        if (this.isAbsent()) {
            return this.getClass().fromNullable(defaultVal).flatMap();
        }
        return this.getClass().fromNullable(this.value).flatMap();
    }
    toJson() {
        return JSON.stringify(this.value);
    }
    /**
     * helper to override several implementations in a more fluent way
     * by having a getClass operation we can avoid direct calls into the constructor or
     * static methods and do not have to implement several methods which rely on the type
     * of "this"
     * @returns the type of Optional
     */
    getClass() {
        return Optional;
    }
    /*helper method for getIf with array access aka <name>[<indexPos>]*/
    arrayIndex(key) {
        let start = key.indexOf("[");
        let end = key.indexOf("]");
        if (start >= 0 && end > 0 && start < end) {
            return parseInt(key.substring(start + 1, end));
        }
        else {
            return -1;
        }
    }
    /*helper method for getIf with array access aka <name>[<indexPos>]*/
    keyVal(key) {
        let start = key.indexOf("[");
        if (start >= 0) {
            return key.substring(0, start);
        }
        else {
            return key;
        }
    }
    /**
     * additional syntactic sugar which is not part of the usual optional implementation
     * but makes life easier, if you want to sacrifice typesafety and refactoring
     * capabilities in typescript
     */
    getIfPresent(key) {
        if (this.isAbsent()) {
            return this.getClass().absent;
        }
        return this.getClass().fromNullable(this.value[key]).flatMap();
    }
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
    resolve(resolver) {
        if (this.isAbsent()) {
            return Optional.absent;
        }
        try {
            return Optional.fromNullable(resolver(this.value));
        }
        catch (e) {
            return Optional.absent;
        }
    }
    preprocessKeys(...keys) {
        return new Es2019Array(...keys)
            .flatMap(item => {
            return new Es2019Array(...item.split(/]\s*\[/gi))
                .map(item => {
                item = item.replace(/^\s+|\s+$/g, "");
                if (item.indexOf("[") == -1 && item.indexOf("]") != -1) {
                    item = "[" + item;
                }
                if (item.indexOf("]") == -1 && item.indexOf("[") != -1) {
                    item = item + "]";
                }
                return item;
            });
        });
    }
}
/*default value for absent*/
Optional.absent = Optional.fromNullable(null);
// --------------------- From here onwards we break out the side effect free limits ------------
/**
 * ValueEmbedder is the writeable version
 * of optional, it basically is a wrapper
 * around a construct which has a state
 * and can be written to.
 *
 * For the readonly version see Optional
 */
export class ValueEmbedder extends Optional {
    constructor(rootElem, valueKey = "value") {
        super(rootElem);
        this.key = valueKey;
    }
    get value() {
        return this._value ? this._value[this.key] : null;
    }
    set value(newVal) {
        if (!this._value) {
            return;
        }
        this._value[this.key] = newVal;
    }
    orElse(elseValue) {
        let alternative = {};
        alternative[this.key] = elseValue;
        return this.isPresent() ? this : new ValueEmbedder(alternative, this.key);
    }
    orElseLazy(func) {
        if (this.isPresent()) {
            return this;
        }
        else {
            let alternative = {};
            alternative[this.key] = func();
            return new ValueEmbedder(alternative, this.key);
        }
    }
    /**
     * helper to override several implementations in a more fluent way
     * by having a getClass operation we can avoid direct calls into the constructor or
     * static methods and do not have to implement several methods which rely on the type
     * of "this"
     * @returns ValueEmbedder
     */
    getClass() {
        return ValueEmbedder;
    }
    static fromNullable(value, valueKey = "value") {
        return new ValueEmbedder(value, valueKey);
    }
}
/*default value for absent*/
ValueEmbedder.absent = ValueEmbedder.fromNullable(null);
/**
 * specialized value embedder
 * for our Configuration
 */
class ConfigEntry extends ValueEmbedder {
    constructor(rootElem, key, arrPos) {
        super(rootElem, key);
        this.arrPos = arrPos !== null && arrPos !== void 0 ? arrPos : -1;
    }
    get value() {
        if (this.key == "" && this.arrPos >= 0) {
            return this._value[this.arrPos];
        }
        else if (this.key && this.arrPos >= 0) {
            return this._value[this.key][this.arrPos];
        }
        return this._value[this.key];
    }
    set value(val) {
        if (this.key == "" && this.arrPos >= 0) {
            this._value[this.arrPos] = val;
            return;
        }
        else if (this.key && this.arrPos >= 0) {
            this._value[this.key][this.arrPos] = val;
            return;
        }
        this._value[this.key] = val;
    }
}
/*default value for absent*/
ConfigEntry.absent = ConfigEntry.fromNullable(null);
export const CONFIG_VALUE = "__END_POINT__";
export const CONFIG_ANY = "__ANY_POINT__";
/**
 * Config, basically an optional wrapper for a json structure
 * (not Side - effect free, since we can alter the internal config state
 * without generating a new config), not sure if we should make it side - effect free
 * since this would swallow a lot of performance and ram
 */
export class Config extends Optional {
    constructor(root, configDef) {
        super(root);
        this.configDef = configDef;
    }
    /**
     * shallow copy getter, copies only the first level, references the deeper nodes
     * in a shared manner
     */
    get shallowCopy() {
        return this.shallowCopy$();
    }
    shallowCopy$() {
        let ret = new Config({});
        ret.shallowMerge(this.value);
        return ret;
    }
    /**
     * deep copy, copies all config nodes
     */
    get deepCopy() {
        return this.deepCopy$();
    }
    deepCopy$() {
        return new Config(objAssign({}, this.value));
    }
    /**
     * creates a config from an initial value or null
     * @param value
     */
    static fromNullable(value) {
        return new Config(value);
    }
    /**
     * simple merge for the root configs
     */
    shallowMerge(other, overwrite = true, withAppend = false) {
        for (let key in other.value) {
            if ('undefined' == typeof key || null == key) {
                continue;
            }
            if (overwrite || !(key in this.value)) {
                if (!withAppend) {
                    this.assign(key).value = other.getIf(key).value;
                }
                else {
                    if (Array.isArray(other.getIf(key).value)) {
                        new Es2019Array(...other.getIf(key).value).forEach(item => this.append(key).value = item);
                    }
                    else {
                        this.append(key).value = other.getIf(key).value;
                    }
                }
            }
        }
    }
    /**
     * assigns a single value as array, or appends it
     * to an existing value mapping a single value to array
     *
     *
     * usage myConfig.append("foobaz").value = "newValue"
     *       myConfig.append("foobaz").value = "newValue2"
     *
     * resulting in myConfig.foobaz == ["newValue, newValue2"]
     *
     * @param {string[]} accessPath
     */
    append(...accessPath) {
        let noKeys = accessPath.length < 1;
        if (noKeys) {
            return;
        }
        this.assertAccessPath(...accessPath);
        let lastKey = accessPath[accessPath.length - 1];
        let pathExists = this.getIf(...accessPath).isPresent();
        this.buildPath(...accessPath);
        let finalKeyArrPos = this.arrayIndex(lastKey);
        if (finalKeyArrPos > -1) {
            throw Error("Append only possible on non array properties, use assign on indexed data");
        }
        let value = this.getIf(...accessPath).value;
        if (!Array.isArray(value)) {
            value = this.assign(...accessPath).value = [value];
        }
        if (pathExists) {
            value.push({});
        }
        finalKeyArrPos = value.length - 1;
        return new ConfigEntry(accessPath.length == 1 ? this.value : this.getIf.apply(this, accessPath.slice(0, accessPath.length - 1)).value, lastKey, finalKeyArrPos);
    }
    /**
     * appends to an existing entry (or extends into an array and appends)
     * if the condition is met
     * @param {boolean} condition
     * @param {string[]} accessPath
     */
    appendIf(condition, ...accessPath) {
        if (!condition) {
            return { value: null };
        }
        return this.append(...accessPath);
    }
    /**
     * assigns a new value on the given access path
     * @param accessPath
     */
    assign(...accessPath) {
        if (accessPath.length < 1) {
            return;
        }
        this.assertAccessPath(...accessPath);
        this.buildPath(...accessPath);
        let currKey = this.keyVal(accessPath[accessPath.length - 1]);
        let arrPos = this.arrayIndex(accessPath[accessPath.length - 1]);
        return new ConfigEntry(accessPath.length == 1 ? this.value : this.getIf.apply(this, accessPath.slice(0, accessPath.length - 1)).value, currKey, arrPos);
    }
    /**
     * assign a value if the condition is set to true, otherwise skip it
     *
     * @param condition the condition, the access accessPath into the config
     * @param accessPath
     */
    assignIf(condition, ...accessPath) {
        return condition ? this.assign(...accessPath) : { value: null };
    }
    /**
     * get if the access path is present (get is reserved as getter with a default, on the current path)
     * TODO will be renamed to something more meaningful and deprecated, the name is ambiguous
     * @param accessPath the access path
     */
    getIf(...accessPath) {
        this.assertAccessPath(...accessPath);
        return this.getClass().fromNullable(super.getIf.apply(this, accessPath).value);
    }
    /**
     * gets the current node and if none is present returns a config with a default value
     * @param defaultVal
     */
    get(defaultVal) {
        return this.getClass().fromNullable(super.get(defaultVal).value);
    }
    //empties the current config entry
    delete(key) {
        if (key in this.value) {
            delete this.value[key];
        }
        return this;
    }
    /**
     * converts the entire config into a json object
     */
    toJson() {
        return JSON.stringify(this.value);
    }
    getClass() {
        return Config;
    }
    setVal(val) {
        this._value = val;
    }
    /**
     * asserts the access path for a semi typed access
      * @param accessPath
     * @private
     */
    assertAccessPath(...accessPath) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        accessPath = this.preprocessKeys(...accessPath);
        if (!this.configDef) {
            //untyped
            return;
        }
        const ERR_ACCESS_PATH = "Access Path to config invalid";
        let currAccessPos = Optional.fromNullable(Object.keys(this.configDef).map(key => {
            let ret = {};
            ret[key] = this.configDef[key];
            return ret;
        }));
        for (let cnt = 0; cnt < accessPath.length; cnt++) {
            let currKey = this.keyVal(accessPath[cnt]);
            let arrPos = this.arrayIndex(accessPath[cnt]);
            //key index
            if (this.isArray(arrPos)) {
                if (currKey != "") {
                    currAccessPos = Array.isArray(currAccessPos.value) ?
                        Optional.fromNullable((_b = (_a = new Es2019Array(...currAccessPos.value)
                            .find(item => {
                            var _a;
                            return !!((_a = item === null || item === void 0 ? void 0 : item[currKey]) !== null && _a !== void 0 ? _a : false);
                        })) === null || _a === void 0 ? void 0 : _a[currKey]) === null || _b === void 0 ? void 0 : _b[arrPos]) :
                        Optional.fromNullable((_e = (_d = (_c = currAccessPos.value) === null || _c === void 0 ? void 0 : _c[currKey]) === null || _d === void 0 ? void 0 : _d[arrPos]) !== null && _e !== void 0 ? _e : null);
                }
                else {
                    currAccessPos = (Array.isArray(currAccessPos.value)) ?
                        Optional.fromNullable((_f = currAccessPos.value) === null || _f === void 0 ? void 0 : _f[arrPos]) : Optional.absent;
                }
                //we noe store either the current array or the filtered look ahead to go further
            }
            else {
                //we now have an array and go further with a singular key
                currAccessPos = (Array.isArray(currAccessPos.value)) ? Optional.fromNullable((_g = new Es2019Array(...currAccessPos.value)
                    .find(item => {
                    var _a;
                    return !!((_a = item === null || item === void 0 ? void 0 : item[currKey]) !== null && _a !== void 0 ? _a : false);
                })) === null || _g === void 0 ? void 0 : _g[currKey]) :
                    Optional.fromNullable((_j = (_h = currAccessPos.value) === null || _h === void 0 ? void 0 : _h[currKey]) !== null && _j !== void 0 ? _j : null);
            }
            if (!currAccessPos.isPresent()) {
                throw Error(ERR_ACCESS_PATH);
            }
            if (currAccessPos.value == CONFIG_ANY) {
                return;
            }
        }
    }
    /**
     * builds the config path
     *
     * @param accessPath a sequential array of accessPath containing either a key name or an array reference name[<index>]
     */
    buildPath(...accessPath) {
        accessPath = this.preprocessKeys(...accessPath);
        let val = this;
        let parentVal = this.getClass().fromNullable(null);
        let parentPos = -1;
        let alloc = function (arr, length) {
            let toAdd = [];
            toAdd.length = length;
            toAdd[length - 1] = {};
            arr.push(...toAdd);
        };
        for (let cnt = 0; cnt < accessPath.length; cnt++) {
            let currKey = this.keyVal(accessPath[cnt]);
            let arrPos = this.arrayIndex(accessPath[cnt]);
            if (this.isArrayPos(currKey, arrPos)) {
                val.setVal((val.value instanceof Array) ? val.value : []);
                alloc(val.value, arrPos + 1);
                if (parentPos >= 0) {
                    parentVal.value[parentPos] = val.value;
                }
                parentVal = val;
                parentPos = arrPos;
                val = this.getClass().fromNullable(val.value[arrPos]);
                continue;
            }
            let tempVal = val.getIf(currKey);
            if (this.isNoArray(arrPos)) {
                if (tempVal.isAbsent()) {
                    tempVal = this.getClass().fromNullable(val.value[currKey] = {});
                }
                else {
                    val = tempVal;
                }
            }
            else {
                let arr = (tempVal.value instanceof Array) ? tempVal.value : [];
                alloc(arr, arrPos + 1);
                val.value[currKey] = arr;
                tempVal = this.getClass().fromNullable(arr[arrPos]);
            }
            parentVal = val;
            parentPos = arrPos;
            val = tempVal;
        }
        return this;
    }
    isNoArray(arrPos) {
        return arrPos == -1;
    }
    isArray(arrPos) {
        return !this.isNoArray(arrPos);
    }
    isArrayPos(currKey, arrPos) {
        return currKey === "" && arrPos >= 0;
    }
}
//# sourceMappingURL=Monad.js.map