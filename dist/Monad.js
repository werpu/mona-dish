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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * A module which keeps  basic monadish like definitions in place without any sidedependencies to other modules.
     * Useful if you need the functions in another library to keep its dependencies down
     */
    var Monadish;
    (function (Monadish) {
        /*IMonad definitions*/
        /**
         * Implementation of a monad
         * (Sideffect free), no write allowed directly on the monads
         * value state
         */
        var Monad = (function () {
            function Monad(value) {
                this._value = value;
            }
            Monad.prototype.map = function (fn) {
                if (!fn) {
                    fn = function (inval) { return inval; };
                }
                var result = fn(this.value);
                return new Monad(result);
            };
            Monad.prototype.flatMap = function (fn) {
                var mapped = this.map(fn);
                while ("undefined" != typeof mapped && mapped != null && mapped.value instanceof Monad) {
                    mapped = mapped.value;
                }
                return mapped;
            };
            Object.defineProperty(Monad.prototype, "value", {
                get: function () {
                    return this._value;
                },
                enumerable: true,
                configurable: true
            });
            return Monad;
        }());
        Monadish.Monad = Monad;
        /**
         * optional implementation, an optional is basically an implementation of a Monad with additional syntactic
         * sugar on top
         * (Sideeffect free, since value assignment is not allowed)
         * */
        var Optional = (function (_super) {
            __extends(Optional, _super);
            function Optional(value) {
                return _super.call(this, value) || this;
            }
            Optional.fromNullable = function (value) {
                return new Optional(value);
            };
            /*syntactic sugar for absent and present checks*/
            Optional.prototype.isAbsent = function () {
                return "undefined" == typeof this.value || null == this.value;
            };
            Optional.prototype.isPresent = function () {
                return !this.isAbsent();
            };
            Optional.prototype.presentOrElse = function (elseValue) {
                if (this.isPresent()) {
                    return this;
                }
                else {
                    return this.flatMap(this.getClass().fromNullable(elseValue));
                }
            };
            /*
             * we need to implement it to fullfill the contract, although it is used only internally
             * all values are flattened when accessed anyway, so there is no need to call this methiod
             */
            Optional.prototype.flatMap = function (fn) {
                var val = _super.prototype.flatMap.call(this, fn);
                if (!(val instanceof Optional)) {
                    return Optional.fromNullable(val.value);
                }
                return val.flatMap();
            };
            /**
             * additional syntactic sugar which is not part of the usual optional implementation
             * but makes life easier, if you want to sacrifice typesafety and refactoring
             * capabilities in typescript
             */
            Optional.prototype.getIfPresent = function (key) {
                if (this.isAbsent()) {
                    return this.getClass().absent;
                }
                return this.getClass().fromNullable(this.value[key]).flatMap();
            };
            /*
             * elvis operation, take care, if you use this you lose typesafety and refactoring
             * capabilites, unfortunately typesceript does not allow to have its own elvis operator
             * this is some syntactic sugar however which is quite useful*/
            Optional.prototype.getIf = function () {
                var key = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    key[_i] = arguments[_i];
                }
                var currentPos = this;
                for (var cnt = 0; cnt < key.length; cnt++) {
                    var currKey = this.keyVal(key[cnt]);
                    var arrPos = this.arrayIndex(key[cnt]);
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
                var retVal = currentPos;
                return retVal;
            };
            Object.defineProperty(Optional.prototype, "value", {
                get: function () {
                    if (this._value instanceof Monad) {
                        return this._value.flatMap().value;
                    }
                    return this._value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * convenience function to flatmap the internal value
             * and replace it with a default in case of being absent
             *
             * @param defaultVal
             * @returns {Optional<any>}
             */
            Optional.prototype.get = function (defaultVal) {
                if (this.isAbsent()) {
                    return this.getClass().fromNullable(defaultVal).flatMap();
                }
                return this.getClass().fromNullable(this.value).flatMap();
            };
            /**
             * helper to override several implementations in a more fluent way
             * by having a getClass operation we can avoid direct calls into the constructor or
             * static methods and do not have to implement several methods which rely on the type
             * of "this"
             * @returns {Monadish.Optional}
             */
            Optional.prototype.getClass = function () {
                return Optional;
            };
            Optional.prototype.toJson = function () {
                return JSON.stringify(this.value);
            };
            /*helper method for getIf with array access aka <name>[<indexPos>]*/
            Optional.prototype.arrayIndex = function (key) {
                var start = key.indexOf("[");
                var end = key.indexOf("]");
                if (start >= 0 && end > 0 && start < end) {
                    return parseInt(key.substring(start + 1, end));
                }
                else {
                    return -1;
                }
            };
            /*helper method for getIf with array access aka <name>[<indexPos>]*/
            Optional.prototype.keyVal = function (key) {
                var start = key.indexOf("[");
                if (start >= 0) {
                    return key.substring(0, start);
                }
                else {
                    return key;
                }
            };
            return Optional;
        }(Monad));
        /*default value for absent*/
        Optional.absent = Optional.fromNullable(null);
        Monadish.Optional = Optional;
        /**
         * helper class to allow write access to the config
         * in certain situations (after an apply call)
         */
        var ConfigEntry = (function () {
            function ConfigEntry(rootElem, key, arrPos) {
                this.rootElem = rootElem;
                this.key = key;
                this.arrPos = ("undefined" != typeof arrPos) ? arrPos : -1;
            }
            Object.defineProperty(ConfigEntry.prototype, "value", {
                get: function () {
                    if (this.key == "" && this.arrPos >= 0) {
                        return this.rootElem[this.arrPos];
                    }
                    else if (this.key && this.arrPos >= 0) {
                        return this.rootElem[this.key][this.arrPos];
                    }
                    return this.rootElem[this.key];
                },
                set: function (val) {
                    if (this.key == "" && this.arrPos >= 0) {
                        this.rootElem[this.arrPos] = val;
                        return;
                    }
                    else if (this.key && this.arrPos >= 0) {
                        this.rootElem[this.key][this.arrPos] = val;
                        return;
                    }
                    this.rootElem[this.key] = val;
                },
                enumerable: true,
                configurable: true
            });
            return ConfigEntry;
        }());
        /**
         * Config, basically an optional wrapper for a json structure
         * (not sideeffect free, since we can alter the internal config state
         * without generating a new config), not sure if we should make it sideffect free
         * since this would swallow a lot of performane and ram
         */
        var Config = (function (_super) {
            __extends(Config, _super);
            function Config(root) {
                return _super.call(this, root) || this;
            }
            Config.fromNullable = function (value) {
                return new Config(value);
            };
            Config.prototype.apply = function () {
                var keys = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    keys[_i] = arguments[_i];
                }
                if (keys.length < 1) {
                    return;
                }
                this.buildPath(keys);
                var currKey = this.keyVal(keys[keys.length - 1]);
                var arrPos = this.arrayIndex(keys[keys.length - 1]);
                var retVal = new ConfigEntry(keys.length == 1 ? this.value : this.getIf.apply(this, keys.slice(0, keys.length - 1)).value, currKey, arrPos);
                return retVal;
            };
            Config.prototype.getIf = function () {
                var keys = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    keys[_i] = arguments[_i];
                }
                return this.getClass().fromNullable(_super.prototype.getIf.apply(this, keys).value);
            };
            Config.prototype.get = function (defaultVal) {
                return this.getClass().fromNullable(_super.prototype.get.call(this, defaultVal).value);
            };
            Config.prototype.toJson = function () {
                return JSON.stringify(this.value);
            };
            Config.prototype.getClass = function () {
                return Config;
            };
            Config.prototype.setVal = function (val) {
                this._value = val;
            };
            Config.prototype.buildPath = function (keys) {
                var val = this;
                var parentVal = this.getClass().fromNullable(null);
                var parentPos = -1;
                var alloc = function (arr, length) {
                    if (arr.length < length) {
                        for (var cnt = arr.length; cnt < length; cnt++) {
                            arr.push({});
                        }
                    }
                };
                for (var cnt = 0; cnt < keys.length; cnt++) {
                    var currKey = this.keyVal(keys[cnt]);
                    var arrPos = this.arrayIndex(keys[cnt]);
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
                    var tempVal = val.getIf(currKey);
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
            };
            return Config;
        }(Optional));
        Monadish.Config = Config;
        var PromiseStatus;
        (function (PromiseStatus) {
            PromiseStatus[PromiseStatus["PENDING"] = 0] = "PENDING";
            PromiseStatus[PromiseStatus["FULLFILLED"] = 1] = "FULLFILLED";
            PromiseStatus[PromiseStatus["REJECTED"] = 2] = "REJECTED";
        })(PromiseStatus || (PromiseStatus = {}));
        /**
         * a small (probably not 100% correct, although I tried to be correct as possible) Promise implementation
         * for systems which do not have a promise implemented
         * Note, although an internal state is kept, this is sideffect free since
         * is value is a function to operate on, hence no real state is kept internally, except for the then
         * and catch calling order
         */
        var Promise = (function () {
            function Promise(executor) {
                var _this = this;
                this.status = PromiseStatus.PENDING;
                this.allFuncs = [];
                //super(executor);
                this.value = executor;
                this.value(function (data) { return _this.resolve(data); }, function (data) { return _this.reject(data); });
            }
            Promise.all = function () {
                var promises = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    promises[_i] = arguments[_i];
                }
                var promiseCnt = 0;
                var myapply;
                var myPromise = new Promise(function (apply, reject) {
                    myapply = apply;
                });
                var executor = function () {
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
            };
            Promise.race = function () {
                var promises = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    promises[_i] = arguments[_i];
                }
                var promiseCnt = 0;
                var myapply;
                var myreject;
                var myPromise = new Promise(function (apply, reject) {
                    myapply = apply;
                    myreject = reject;
                });
                var thenexecutor = function () {
                    if (!!myapply) {
                        myapply();
                    }
                    myapply = null;
                    myreject = null;
                    return null;
                };
                thenexecutor.__last__ = true;
                var catchexeutor = function () {
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
            };
            Promise.reject = function (reason) {
                var retVal = new Promise(function (resolve, reject) {
                    //not really doable without a hack
                    if (reason instanceof Promise) {
                        reason.then(function (val) {
                            reject(val);
                        });
                    }
                    else {
                        setTimeout(function () {
                            reject(reason);
                        }, 1);
                    }
                });
                return retVal;
            };
            Promise.resolve = function (reason) {
                var retVal = new Promise(function (resolve, reject) {
                    //not really doable without a hack
                    if (reason instanceof Promise) {
                        reason.then(function (val) { return resolve(val); });
                    }
                    else {
                        setTimeout(function () {
                            resolve(reason);
                        }, 1);
                    }
                });
                return retVal;
            };
            Promise.prototype.then = function (executorFunc, catchfunc) {
                this.allFuncs.push({ "then": executorFunc });
                if (catchfunc) {
                    this.allFuncs.push({ "catch": catchfunc });
                }
                this.spliceLastFuncs();
                return this;
            };
            Promise.prototype.catch = function (executorFunc) {
                this.allFuncs.push({ "catch": executorFunc });
                this.spliceLastFuncs();
                return this;
            };
            Promise.prototype.finally = function (executorFunc) {
                if (this.__reason__) {
                    this.__reason__.finally(executorFunc);
                    return;
                }
                this.allFuncs.push({ "finally": executorFunc });
                this.spliceLastFuncs();
                return this;
            };
            Promise.prototype.spliceLastFuncs = function () {
                var lastFuncs = [];
                var rest = [];
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
            };
            Promise.prototype.resolve = function (val) {
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
            };
            Promise.prototype.reject = function (val) {
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
            };
            Promise.prototype.transferIntoNewPromise = function (val) {
                for (var cnt = 0; cnt < this.allFuncs.length; cnt++) {
                    for (var key in this.allFuncs[cnt]) {
                        val[key](this.allFuncs[cnt][key]);
                    }
                }
            };
            Promise.prototype.appyFinally = function () {
                while (this.allFuncs.length) {
                    var fn = this.allFuncs.shift();
                    if (fn.finally) {
                        fn.finally();
                    }
                }
            };
            return Promise;
        }());
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
        var CancellablePromise = (function (_super) {
            __extends(CancellablePromise, _super);
            /**
             * @param executor asynchronous callback operation which triggers the callback
             * @param cancellator cancel operation, separate from the trigger operation
             */
            function CancellablePromise(executor, cancellator) {
                var _this = _super.call(this, executor) || this;
                _this.cancellator = function () { };
                _this.cancellator = cancellator;
                return _this;
            }
            CancellablePromise.prototype.cancel = function () {
                this.status = PromiseStatus.REJECTED;
                this.appyFinally();
                //lets terminate it once and for all, the finally has been applied
                this.allFuncs = [];
            };
            CancellablePromise.prototype.then = function (executorFunc, catchfunc) {
                return _super.prototype.then.call(this, executorFunc, catchfunc);
            };
            CancellablePromise.prototype.catch = function (executorFunc) {
                return _super.prototype.catch.call(this, executorFunc);
            };
            CancellablePromise.prototype.finally = function (executorFunc) {
                return _super.prototype.finally.call(this, executorFunc);
            };
            return CancellablePromise;
        }(Promise));
        Monadish.CancellablePromise = CancellablePromise;
        /*we do not implenent array, maps etc.. monads there are libraries like lodash which have been doing that for ages*/
    })(Monadish = exports.Monadish || (exports.Monadish = {}));
    //we also add a global handler for systems without module loader
    window.Monadish = Monadish;
});
//# sourceMappingURL=Monad.js.map