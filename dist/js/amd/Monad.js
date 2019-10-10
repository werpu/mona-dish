define(function() { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/typescript/Monad.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main/typescript/Monad.ts":
/*!**************************************!*\
  !*** ./src/main/typescript/Monad.ts ***!
  \**************************************/
/*! exports provided: Monad, Stream, Optional, Config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Monad\", function() { return Monad; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Stream\", function() { return Stream; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Optional\", function() { return Optional; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Config\", function() { return Config; });\n/* Licensed to the Apache Software Foundation (ASF) under one or more\n * contributor license agreements.  See the NOTICE file distributed with\n * this work for additional information regarding copyright ownership.\n * The ASF licenses this file to you under the Apache License, Version 2.0\n * (the \"License\"); you may not use this file except in compliance with\n * the License.  You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Implementation of a monad\n * (Sideffect free), no write allowed directly on the monads\n * value state\n */\nclass Monad {\n    constructor(value) {\n        this._value = value;\n    }\n    map(fn) {\n        if (!fn) {\n            fn = (inval) => inval;\n        }\n        let result = fn(this.value);\n        return new Monad(result);\n    }\n    flatMap(fn) {\n        let mapped = this.map(fn);\n        while (\"undefined\" != typeof mapped && mapped != null && mapped.value instanceof Monad) {\n            mapped = mapped.value;\n        }\n        return mapped;\n    }\n    get value() {\n        return this._value;\n    }\n}\n/*\n * A small stream implementation\n */\nclass Stream {\n    constructor(...value) {\n        this.value = value;\n    }\n    static of(...data) {\n        return new Stream(...data);\n    }\n    each(fn) {\n        for (let cnt = 0; cnt < this.value.length; cnt++) {\n            if (fn(this.value[cnt], cnt) === false) {\n                break;\n            }\n        }\n        return this;\n    }\n    map(fn) {\n        if (!fn) {\n            fn = (inval) => inval;\n        }\n        let res = [];\n        this.each((item, cnt) => {\n            res.push(fn(item));\n        });\n        return new Stream(...res);\n    }\n    /*\n     * we need to implement it to fullfill the contract, although it is used only internally\n     * all values are flattened when accessed anyway, so there is no need to call this methiod\n     */\n    flatMap(fn) {\n        let mapped = this.map(fn);\n        let res = this.mapStreams(mapped);\n        return new Stream(...res);\n    }\n    filter(fn) {\n        let res = [];\n        this.each((data) => {\n            if (fn(data)) {\n                res.push(data);\n            }\n        });\n        return new Stream(...res);\n    }\n    reduce(fn, startVal = null) {\n        let offset = startVal != null ? 0 : 1;\n        let val1 = startVal != null ? startVal : this.value.length ? this.value[0] : null;\n        for (let cnt = offset; cnt < this.value.length; cnt++) {\n            val1 = fn(val1, this.value[cnt]);\n        }\n        return Optional.fromNullable(val1);\n    }\n    first() {\n        return this.value && this.value.length ? Optional.fromNullable(this.value[0]) : Optional.absent;\n    }\n    last() {\n        //could be done via reduce, but is faster this way\n        return Optional.fromNullable(this.value.length ? this.value[this.value.length - 1] : null);\n    }\n    anyMatch(fn) {\n        for (let cnt = 0; cnt < this.value.length; cnt++) {\n            if (fn(this.value[cnt])) {\n                return true;\n            }\n        }\n        return false;\n    }\n    allMatch(fn) {\n        if (!this.value.length) {\n            return false;\n        }\n        let matches = 0;\n        for (let cnt = 0; cnt < this.value.length; cnt++) {\n            if (fn(this.value[cnt])) {\n                matches++;\n            }\n        }\n        return matches == this.value.length;\n    }\n    noneMatch(fn) {\n        let matches = 0;\n        for (let cnt = 0; cnt < this.value.length; cnt++) {\n            if (fn(this.value[cnt])) {\n                matches++;\n            }\n        }\n        return matches == this.value.length;\n    }\n    mapStreams(mapped) {\n        let res = [];\n        mapped.each((data) => {\n            if (data instanceof Stream) {\n                res = res.concat(this.mapStreams(data));\n            }\n            else {\n                res.push(data);\n            }\n        });\n        return res;\n    }\n}\n/**\n * optional implementation, an optional is basically an implementation of a Monad with additional syntactic\n * sugar on top\n * (Sideeffect free, since value assignment is not allowed)\n * */\nclass Optional extends Monad {\n    constructor(value) {\n        super(value);\n    }\n    static fromNullable(value) {\n        return new Optional(value);\n    }\n    /*syntactic sugar for absent and present checks*/\n    isAbsent() {\n        return \"undefined\" == typeof this.value || null == this.value;\n    }\n    isPresent() {\n        return !this.isAbsent();\n    }\n    orElse(elseValue) {\n        if (this.isPresent()) {\n            return this;\n        }\n        else {\n            //shortcut\n            if (elseValue == null) {\n                return Optional.absent;\n            }\n            return this.flatMap(() => elseValue);\n        }\n    }\n    /**\n     * lazy, passes a function which then is lazily evaluated\n     * instead of a direct value\n     * @param func\n     */\n    orElseLazy(func) {\n        if (this.isPresent()) {\n            return this;\n        }\n        else {\n            return this.flatMap(func);\n        }\n    }\n    /*\n     * we need to implement it to fullfill the contract, although it is used only internally\n     * all values are flattened when accessed anyway, so there is no need to call this methiod\n     */\n    flatMap(fn) {\n        let val = super.flatMap(fn);\n        if (!(val instanceof Optional)) {\n            return Optional.fromNullable(val.value);\n        }\n        return val.flatMap();\n    }\n    /**\n     * additional syntactic sugar which is not part of the usual optional implementation\n     * but makes life easier, if you want to sacrifice typesafety and refactoring\n     * capabilities in typescript\n     */\n    getIfPresent(key) {\n        if (this.isAbsent()) {\n            return this.getClass().absent;\n        }\n        return this.getClass().fromNullable(this.value[key]).flatMap();\n    }\n    /*\n     * elvis operation, take care, if you use this you lose typesafety and refactoring\n     * capabilites, unfortunately typesceript does not allow to have its own elvis operator\n     * this is some syntactic sugar however which is quite useful*/\n    getIf(...key) {\n        let currentPos = this;\n        for (let cnt = 0; cnt < key.length; cnt++) {\n            let currKey = this.keyVal(key[cnt]);\n            let arrPos = this.arrayIndex(key[cnt]);\n            if (currKey === \"\" && arrPos >= 0) {\n                currentPos = this.getClass().fromNullable(!(currentPos.value instanceof Array) ? null : (currentPos.value.length < arrPos ? null : currentPos.value[arrPos]));\n                if (currentPos.isAbsent()) {\n                    return currentPos;\n                }\n                continue;\n            }\n            else if (currKey && arrPos >= 0) {\n                if (currentPos.getIfPresent(currKey).isAbsent()) {\n                    return currentPos;\n                }\n                currentPos = (currentPos.getIfPresent(currKey).value instanceof Array) ? this.getClass().fromNullable(currentPos.getIfPresent(currKey).value[arrPos]) : this.getClass().absent;\n                if (currentPos.isAbsent()) {\n                    return currentPos;\n                }\n                continue;\n            }\n            else {\n                currentPos = currentPos.getIfPresent(currKey);\n            }\n            if (currentPos.isAbsent()) {\n                return currentPos;\n            }\n            else if (arrPos > -1) {\n                currentPos = this.getClass().fromNullable(currentPos.value[arrPos]);\n            }\n        }\n        let retVal = currentPos;\n        return retVal;\n    }\n    get value() {\n        if (this._value instanceof Monad) {\n            return this._value.flatMap().value;\n        }\n        return this._value;\n    }\n    /**\n     * simple match, if the first order function call returns\n     * true then there is a match, if the value is not present\n     * it never matches\n     *\n     * @param fn the first order function performing the match\n     */\n    match(fn) {\n        if (this.isAbsent()) {\n            return false;\n        }\n        return fn(this.value);\n    }\n    /**\n     * convenience function to flatmap the internal value\n     * and replace it with a default in case of being absent\n     *\n     * @param defaultVal\n     * @returns {Optional<any>}\n     */\n    get(defaultVal = Optional.absent) {\n        if (this.isAbsent()) {\n            return this.getClass().fromNullable(defaultVal).flatMap();\n        }\n        return this.getClass().fromNullable(this.value).flatMap();\n    }\n    /**\n     * helper to override several implementations in a more fluent way\n     * by having a getClass operation we can avoid direct calls into the constructor or\n     * static methods and do not have to implement several methods which rely on the type\n     * of \"this\"\n     * @returns {Monadish.Optional}\n     */\n    getClass() {\n        return Optional;\n    }\n    toJson() {\n        return JSON.stringify(this.value);\n    }\n    /*helper method for getIf with array access aka <name>[<indexPos>]*/\n    arrayIndex(key) {\n        let start = key.indexOf(\"[\");\n        let end = key.indexOf(\"]\");\n        if (start >= 0 && end > 0 && start < end) {\n            return parseInt(key.substring(start + 1, end));\n        }\n        else {\n            return -1;\n        }\n    }\n    /*helper method for getIf with array access aka <name>[<indexPos>]*/\n    keyVal(key) {\n        let start = key.indexOf(\"[\");\n        if (start >= 0) {\n            return key.substring(0, start);\n        }\n        else {\n            return key;\n        }\n    }\n}\n/*default value for absent*/\nOptional.absent = Optional.fromNullable(null);\n/**\n * helper class to allow write access to the config\n * in certain situations (after an apply call)\n */\nclass ConfigEntry {\n    constructor(rootElem, key, arrPos) {\n        this.rootElem = rootElem;\n        this.key = key;\n        this.arrPos = (\"undefined\" != typeof arrPos) ? arrPos : -1;\n    }\n    get value() {\n        if (this.key == \"\" && this.arrPos >= 0) {\n            return this.rootElem[this.arrPos];\n        }\n        else if (this.key && this.arrPos >= 0) {\n            return this.rootElem[this.key][this.arrPos];\n        }\n        return this.rootElem[this.key];\n    }\n    set value(val) {\n        if (this.key == \"\" && this.arrPos >= 0) {\n            this.rootElem[this.arrPos] = val;\n            return;\n        }\n        else if (this.key && this.arrPos >= 0) {\n            this.rootElem[this.key][this.arrPos] = val;\n            return;\n        }\n        this.rootElem[this.key] = val;\n    }\n}\n/**\n * Config, basically an optional wrapper for a json structure\n * (not sideeffect free, since we can alter the internal config state\n * without generating a new config), not sure if we should make it sideffect free\n * since this would swallow a lot of performane and ram\n */\nclass Config extends Optional {\n    constructor(root) {\n        super(root);\n    }\n    static fromNullable(value) {\n        return new Config(value);\n    }\n    apply(...keys) {\n        if (keys.length < 1) {\n            return;\n        }\n        this.buildPath(keys);\n        let currKey = this.keyVal(keys[keys.length - 1]);\n        let arrPos = this.arrayIndex(keys[keys.length - 1]);\n        let retVal = new ConfigEntry(keys.length == 1 ? this.value : this.getIf.apply(this, keys.slice(0, keys.length - 1)).value, currKey, arrPos);\n        return retVal;\n    }\n    applyIf(condition, ...keys) {\n        return condition ? this.apply(keys) : { value: null };\n    }\n    getIf(...keys) {\n        return this.getClass().fromNullable(super.getIf.apply(this, keys).value);\n    }\n    get(defaultVal) {\n        return this.getClass().fromNullable(super.get(defaultVal).value);\n    }\n    //empties the current config entry\n    delete(key) {\n        if (key in this.value) {\n            delete this.value[key];\n        }\n        return this;\n    }\n    toJson() {\n        return JSON.stringify(this.value);\n    }\n    get shallowCopy() {\n        let mergeMaps = function (maps, overwrite = true) {\n            let retVal = {};\n            this.arrForEach(maps, (item) => {\n                this.mixMaps(retVal, item, overwrite);\n            });\n            return retVal;\n        };\n        return new Config(mergeMaps([{}, this.value || {}]));\n    }\n    getClass() {\n        return Config;\n    }\n    setVal(val) {\n        this._value = val;\n    }\n    buildPath(keys) {\n        let val = this;\n        let parentVal = this.getClass().fromNullable(null);\n        let parentPos = -1;\n        let alloc = function (arr, length) {\n            if (arr.length < length) {\n                for (let cnt = arr.length; cnt < length; cnt++) {\n                    arr.push({});\n                }\n            }\n        };\n        for (let cnt = 0; cnt < keys.length; cnt++) {\n            let currKey = this.keyVal(keys[cnt]);\n            let arrPos = this.arrayIndex(keys[cnt]);\n            if (currKey === \"\" && arrPos >= 0) {\n                val.setVal((val.value instanceof Array) ? val.value : []);\n                alloc(val.value, arrPos + 1);\n                if (parentPos >= 0) {\n                    parentVal.value[parentPos] = val.value;\n                }\n                parentVal = val;\n                parentPos = arrPos;\n                val = this.getClass().fromNullable(val.value[arrPos]);\n                continue;\n            }\n            let tempVal = val.getIf(currKey);\n            if (arrPos == -1) {\n                if (tempVal.isAbsent()) {\n                    tempVal = this.getClass().fromNullable(val.value[currKey] = {});\n                }\n                else {\n                    val = tempVal;\n                }\n            }\n            else {\n                let arr = (tempVal.value instanceof Array) ? tempVal.value : [];\n                alloc(arr, arrPos + 1);\n                val.value[currKey] = arr;\n                tempVal = this.getClass().fromNullable(arr[arrPos]);\n            }\n            parentVal = val;\n            parentPos = arrPos;\n            val = tempVal;\n        }\n        return this;\n    }\n}\n/*we do not implenent array, maps etc.. monads there are libraries like lodash which have been doing that for ages*/\n\n\n//# sourceURL=webpack:///./src/main/typescript/Monad.ts?");

/***/ })

/******/ })});;