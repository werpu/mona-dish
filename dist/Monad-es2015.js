/* Licensed to the Apache Software Foundation (ASF) under one or more
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
 * A module which keeps  basic monadish like definitions in place without any sidedependencies to other modules.
 * Useful if you need the functions in another library to keep its dependencies down
 */
/* Licensed to the Apache Software Foundation (ASF) under one or more
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
 */ export var Monadish;
(function (Monadish) {
    /*IMonad definitions*/
    /**
     * Implementation of a monad
     * (Sideffect free), no write allowed directly on the monads
     * value state
     */
    class Monad {
        constructor(value) {
            this._value = value;
        }
        map(fn) {
            if (!fn) {
                fn = (inval) => inval;
            }
            let result = fn(this.value);
            return new Monad(result);
        }
        flatMap(fn) {
            let mapped = this.map(fn);
            while ("undefined" != typeof mapped && mapped != null && mapped.value instanceof Monad) {
                mapped = mapped.value;
            }
            return mapped;
        }
        get value() {
            return this._value;
        }
    }
    Monadish.Monad = Monad;
    /**
     * optional implementation, an optional is basically an implementation of a Monad with additional syntactic
     * sugar on top
     * (Sideeffect free, since value assignment is not allowed)
     * */
    class Optional extends Monad {
        constructor(value) {
            super(value);
        }
        static fromNullable(value) {
            return new Optional(value);
        }
        /*syntactic sugar for absent and present checks*/
        isAbsent() {
            return "undefined" == typeof this.value || null == this.value;
        }
        isPresent() {
            return !this.isAbsent();
        }
        presentOrElse(elseValue) {
            if (this.isPresent()) {
                return this;
            }
            else {
                return this.flatMap(this.getClass().fromNullable(elseValue));
            }
        }
        /*
         * we need to implement it to fullfill the contract, although it is used only internally
         * all values are flattened when accessed anyway, so there is no need to call this methiod
         */
        flatMap(fn) {
            var val = super.flatMap(fn);
            if (!(val instanceof Optional)) {
                return Optional.fromNullable(val.value);
            }
            return val.flatMap();
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
        /*
         * elvis operation, take care, if you use this you lose typesafety and refactoring
         * capabilites, unfortunately typesceript does not allow to have its own elvis operator
         * this is some syntactic sugar however which is quite useful*/
        getIf(...key) {
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
            let retVal = currentPos;
            return retVal;
        }
        get value() {
            if (this._value instanceof Monad) {
                return this._value.flatMap().value;
            }
            return this._value;
        }
        /**
         * convenience function to flatmap the internal value
         * and replace it with a default in case of being absent
         *
         * @param defaultVal
         * @returns {Optional<any>}
         */
        get(defaultVal) {
            if (this.isAbsent()) {
                return this.getClass().fromNullable(defaultVal).flatMap();
            }
            return this.getClass().fromNullable(this.value).flatMap();
        }
        /**
         * helper to override several implementations in a more fluent way
         * by having a getClass operation we can avoid direct calls into the constructor or
         * static methods and do not have to implement several methods which rely on the type
         * of "this"
         * @returns {Monadish.Optional}
         */
        getClass() {
            return Optional;
        }
        toJson() {
            return JSON.stringify(this.value);
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
    }
    /*default value for absent*/
    Optional.absent = Optional.fromNullable(null);
    Monadish.Optional = Optional;
    /**
     * helper class to allow write access to the config
     * in certain situations (after an apply call)
     */
    class ConfigEntry {
        constructor(rootElem, key, arrPos) {
            this.rootElem = rootElem;
            this.key = key;
            this.arrPos = ("undefined" != typeof arrPos) ? arrPos : -1;
        }
        get value() {
            if (this.key == "" && this.arrPos >= 0) {
                return this.rootElem[this.arrPos];
            }
            else if (this.key && this.arrPos >= 0) {
                return this.rootElem[this.key][this.arrPos];
            }
            return this.rootElem[this.key];
        }
        set value(val) {
            if (this.key == "" && this.arrPos >= 0) {
                this.rootElem[this.arrPos] = val;
                return;
            }
            else if (this.key && this.arrPos >= 0) {
                this.rootElem[this.key][this.arrPos] = val;
                return;
            }
            this.rootElem[this.key] = val;
        }
    }
    /**
     * Config, basically an optional wrapper for a json structure
     * (not sideeffect free, since we can alter the internal config state
     * without generating a new config), not sure if we should make it sideffect free
     * since this would swallow a lot of performane and ram
     */
    class Config extends Optional {
        constructor(root) {
            super(root);
        }
        static fromNullable(value) {
            return new Config(value);
        }
        apply(...keys) {
            if (keys.length < 1) {
                return;
            }
            this.buildPath(keys);
            let currKey = this.keyVal(keys[keys.length - 1]);
            let arrPos = this.arrayIndex(keys[keys.length - 1]);
            var retVal = new ConfigEntry(keys.length == 1 ? this.value : this.getIf.apply(this, keys.slice(0, keys.length - 1)).value, currKey, arrPos);
            return retVal;
        }
        getIf(...keys) {
            return this.getClass().fromNullable(super.getIf.apply(this, keys).value);
        }
        get(defaultVal) {
            return this.getClass().fromNullable(super.get(defaultVal).value);
        }
        toJson() {
            return JSON.stringify(this.value);
        }
        getClass() {
            return Config;
        }
        setVal(val) {
            this._value = val;
        }
        buildPath(keys) {
            let val = this;
            let parentVal = this.getClass().fromNullable(null);
            let parentPos = -1;
            let alloc = function (arr, length) {
                if (arr.length < length) {
                    for (var cnt = arr.length; cnt < length; cnt++) {
                        arr.push({});
                    }
                }
            };
            for (var cnt = 0; cnt < keys.length; cnt++) {
                let currKey = this.keyVal(keys[cnt]);
                let arrPos = this.arrayIndex(keys[cnt]);
                if (currKey === "" && arrPos >= 0) {
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
                if (arrPos == -1) {
                    if (tempVal.isAbsent()) {
                        tempVal = this.getClass().fromNullable(val.value[currKey] = {});
                    }
                    else {
                        val = tempVal;
                    }
                }
                else {
                    var arr = (tempVal.value instanceof Array) ? tempVal.value : [];
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
    }
    Monadish.Config = Config;
    var PromiseStatus;
    (function (PromiseStatus) {
        PromiseStatus[PromiseStatus["PENDING"] = 0] = "PENDING";
        PromiseStatus[PromiseStatus["FULLFILLED"] = 1] = "FULLFILLED";
        PromiseStatus[PromiseStatus["REJECTED"] = 2] = "REJECTED";
    })(PromiseStatus = Monadish.PromiseStatus || (Monadish.PromiseStatus = {}));
    /**
     * a small (probably not 100% correct, although I tried to be correct as possible) Promise implementation
     * for systems which do not have a promise implemented
     * Note, although an internal state is kept, this is sideffect free since
     * is value is a function to operate on, hence no real state is kept internally, except for the then
     * and catch calling order
     */
    class Promise {
        constructor(executor) {
            this.status = PromiseStatus.PENDING;
            this.allFuncs = [];
            //super(executor);
            this.value = executor;
            this.value((data) => this.resolve(data), (data) => this.reject(data));
        }
        static all(...promises) {
            var promiseCnt = 0;
            var myapply;
            var myPromise = new Promise((apply, reject) => {
                myapply = apply;
            });
            var executor = () => {
                promiseCnt++;
                if (promises.length == promiseCnt) {
                    myapply();
                }
            };
            executor.__last__ = true;
            for (var cnt = 0; cnt < promises.length; cnt++) {
                promises[cnt].finally(executor);
            }
            return myPromise;
        }
        static race(...promises) {
            var promiseCnt = 0;
            var myapply;
            var myreject;
            var myPromise = new Promise((apply, reject) => {
                myapply = apply;
                myreject = reject;
            });
            var thenexecutor = () => {
                if (!!myapply) {
                    myapply();
                }
                myapply = null;
                myreject = null;
                return null;
            };
            thenexecutor.__last__ = true;
            var catchexeutor = () => {
                if (!!myreject) {
                    myreject();
                }
                myreject = null;
                myapply = null;
                return null;
            };
            catchexeutor.__last__ = true;
            for (var cnt = 0; cnt < promises.length; cnt++) {
                promises[cnt].then(thenexecutor);
                promises[cnt].catch(catchexeutor);
            }
            return myPromise;
        }
        static reject(reason) {
            var retVal = new Promise((resolve, reject) => {
                //not really doable without a hack
                if (reason instanceof Promise) {
                    reason.then((val) => {
                        reject(val);
                    });
                }
                else {
                    setTimeout(() => {
                        reject(reason);
                    }, 1);
                }
            });
            return retVal;
        }
        static resolve(reason) {
            var retVal = new Promise((resolve, reject) => {
                //not really doable without a hack
                if (reason instanceof Promise) {
                    reason.then((val) => resolve(val));
                }
                else {
                    setTimeout(() => {
                        resolve(reason);
                    }, 1);
                }
            });
            return retVal;
        }
        then(executorFunc, catchfunc) {
            this.allFuncs.push({ "then": executorFunc });
            if (catchfunc) {
                this.allFuncs.push({ "catch": catchfunc });
            }
            this.spliceLastFuncs();
            return this;
        }
        catch(executorFunc) {
            this.allFuncs.push({ "catch": executorFunc });
            this.spliceLastFuncs();
            return this;
        }
        finally(executorFunc) {
            if (this.__reason__) {
                this.__reason__.finally(executorFunc);
                return;
            }
            this.allFuncs.push({ "finally": executorFunc });
            this.spliceLastFuncs();
            return this;
        }
        spliceLastFuncs() {
            let lastFuncs = [];
            let rest = [];
            for (var cnt = 0; cnt < this.allFuncs.length; cnt++) {
                for (var key in this.allFuncs[cnt]) {
                    if (this.allFuncs[cnt][key].__last__) {
                        lastFuncs.push(this.allFuncs[cnt]);
                    }
                    else {
                        rest.push(this.allFuncs[cnt]);
                    }
                }
            }
            this.allFuncs = rest.concat(lastFuncs);
        }
        resolve(val) {
            while (this.allFuncs.length) {
                if (!this.allFuncs[0].then) {
                    break;
                }
                var fn = this.allFuncs.shift();
                var funcResult = Optional.fromNullable(fn.then(val));
                if (funcResult.isPresent()) {
                    funcResult = funcResult.flatMap();
                    val = funcResult.value;
                    if (val instanceof Promise) {
                        //var func = (newVal: any) => {this.resolve(newVal)};
                        //func.__last__  = true;
                        //val.then(func);
                        this.transferIntoNewPromise(val);
                        return;
                    }
                }
                else {
                    break;
                }
            }
            this.appyFinally();
            this.status = PromiseStatus.FULLFILLED;
        }
        reject(val) {
            while (this.allFuncs.length) {
                if (this.allFuncs[0].finally) {
                    break;
                }
                var fn = this.allFuncs.shift();
                if (fn.catch) {
                    var funcResult = Optional.fromNullable(fn.catch(val));
                    if (funcResult.isPresent()) {
                        funcResult = funcResult.flatMap();
                        val = funcResult.value;
                        if (val instanceof Promise) {
                            //val.then((newVal: any) => {this.resolve(newVal)});
                            this.transferIntoNewPromise(val);
                            return;
                        }
                        this.status = PromiseStatus.REJECTED;
                        break;
                    }
                    else {
                        break;
                    }
                }
            }
            this.status = PromiseStatus.REJECTED;
            this.appyFinally();
        }
        transferIntoNewPromise(val) {
            for (var cnt = 0; cnt < this.allFuncs.length; cnt++) {
                for (let key in this.allFuncs[cnt]) {
                    val[key](this.allFuncs[cnt][key]);
                }
            }
        }
        appyFinally() {
            while (this.allFuncs.length) {
                var fn = this.allFuncs.shift();
                if (fn.finally) {
                    fn.finally();
                }
            }
        }
    }
    Monadish.Promise = Promise;
    /**
     * a cancellable promise
     * a Promise with a cancel function, which can be cancellend any time
     * this is useful for promises which use cancellable asynchronous operations
     * note, even in a cancel state, the finally of the promise is executed, however
     * subsequent thens are not anymore.
     * The current then however is fished or a catch is called depending on how the outer
     * operation reacts to a cancel order.
     */
    class CancellablePromise extends Promise {
        /**
         * @param executor asynchronous callback operation which triggers the callback
         * @param cancellator cancel operation, separate from the trigger operation
         */
        constructor(executor, cancellator) {
            super(executor);
            this.cancellator = () => { };
            this.cancellator = cancellator;
        }
        cancel() {
            this.status = PromiseStatus.REJECTED;
            this.appyFinally();
            //lets terminate it once and for all, the finally has been applied
            this.allFuncs = [];
        }
        then(executorFunc, catchfunc) {
            return super.then(executorFunc, catchfunc);
        }
        catch(executorFunc) {
            return super.catch(executorFunc);
        }
        finally(executorFunc) {
            return super.finally(executorFunc);
        }
    }
    Monadish.CancellablePromise = CancellablePromise;
    /*we do not implenent array, maps etc.. monads there are libraries like lodash which have been doing that for ages*/
})(Monadish || (Monadish = {}));
//we also add a global handler for systems without module loader
window.Monadish = Monadish;

//# sourceMappingURL=Monad-es2015.js.map
