"use strict";
/*!
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http:// www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DQ$ = exports.DQ = exports.DomQueryCollector = exports.DomQuery = exports.Style = exports.ElementAttribute = void 0;
var Monad_1 = require("./Monad");
var Stream_1 = require("./Stream");
var SourcesCollectors_1 = require("./SourcesCollectors");
var Lang_1 = require("./Lang");
var trim = Lang_1.Lang.trim;
var isString = Lang_1.Lang.isString;
var eqi = Lang_1.Lang.equalsIgnoreCase;
var Global_1 = require("./Global");
var objToArray = Lang_1.Lang.objToArray;
/**
 *
 *        // - submit checkboxes and radio inputs only if checked
 if ((tagName != "select" && elemType != "button"
 && elemType != "reset" && elemType != "submit" && elemType != "image")
 && ((elemType != "checkbox" && elemType != "radio"
 */
var ALLOWED_SUBMITTABLE_ELEMENTS;
(function (ALLOWED_SUBMITTABLE_ELEMENTS) {
    ALLOWED_SUBMITTABLE_ELEMENTS["SELECT"] = "select";
    ALLOWED_SUBMITTABLE_ELEMENTS["BUTTON"] = "button";
    ALLOWED_SUBMITTABLE_ELEMENTS["SUBMIT"] = "submit";
    ALLOWED_SUBMITTABLE_ELEMENTS["RESET"] = "reset";
    ALLOWED_SUBMITTABLE_ELEMENTS["IMAGE"] = "image";
    ALLOWED_SUBMITTABLE_ELEMENTS["RADIO"] = "radio";
    ALLOWED_SUBMITTABLE_ELEMENTS["CHECKBOX"] = "checkbox";
})(ALLOWED_SUBMITTABLE_ELEMENTS || (ALLOWED_SUBMITTABLE_ELEMENTS = {}));
/**
 * helper to fix a common problem that a system has to wait, until a certain condition is reached.
 * Depending on the browser this uses either the Mutation Observer or a semi compatible interval as fallback.
 * @param root the root DomQuery element to start from
 * @param condition the condition lambda to be fulfilled
 * @param options options for the search
 */
function waitUntilDom(root, condition, options) {
    if (options === void 0) { options = {
        attributes: true,
        childList: true,
        subtree: true,
        timeout: 500,
        interval: 100
    }; }
    return new Promise(function (success, error) {
        var observer = null;
        var MUT_ERROR = new Error("Mutation observer timeout");
        // we do the same but for now ignore the options on the dom query
        // we cannot use absent here, because the condition might search for an absent element
        function findElement(root, condition) {
            var found = null;
            if (!!condition(root)) {
                return root;
            }
            if (options.childList) {
                found = (condition(root)) ? root : root.childNodes.filter(function (item) { return condition(item); }).first().value.value;
            }
            else if (options.subtree) {
                found = (condition(root)) ? root : root.querySelectorAll(" * ").filter(function (item) { return condition(item); }).first().value.value;
            }
            else {
                found = (condition(root)) ? root : null;
            }
            return found;
        }
        var foundElement = root;
        if (!!(foundElement = findElement(foundElement, condition))) {
            success(new DomQuery(foundElement));
            return;
        }
        if ('undefined' != typeof MutationObserver) {
            var mutTimeout_1 = setTimeout(function () {
                observer.disconnect();
                return error(MUT_ERROR);
            }, options.timeout);
            var callback = function (mutationList) {
                var found = new DomQuery(mutationList.map(function (mut) { return mut.target; })).filter(function (item) { return condition(item); }).first();
                if (found.isPresent()) {
                    clearTimeout(mutTimeout_1);
                    observer.disconnect();
                    success(new DomQuery(found || root));
                }
            };
            observer = new MutationObserver(callback);
            // browsers might ignore it, but we cannot break the api in the case
            // hence no timeout is passed
            var observableOpts_1 = __assign({}, options);
            delete observableOpts_1.timeout;
            root.eachElem(function (item) {
                observer.observe(item, observableOpts_1);
            });
        }
        else { // fallback for legacy browsers without mutation observer
            var interval_1 = setInterval(function () {
                var found = findElement(root, condition);
                if (!!found) {
                    if (timeout_1) {
                        clearTimeout(timeout_1);
                        clearInterval(interval_1);
                        interval_1 = null;
                    }
                    success(new DomQuery(found || root));
                }
            }, options.interval);
            var timeout_1 = setTimeout(function () {
                if (interval_1) {
                    clearInterval(interval_1);
                    error(MUT_ERROR);
                }
            }, options.timeout);
        }
    });
}
var ElementAttribute = /** @class */ (function (_super) {
    __extends(ElementAttribute, _super);
    function ElementAttribute(element, name, defaultVal) {
        if (defaultVal === void 0) { defaultVal = null; }
        var _this = _super.call(this, element, name) || this;
        _this.element = element;
        _this.name = name;
        _this.defaultVal = defaultVal;
        return _this;
    }
    Object.defineProperty(ElementAttribute.prototype, "value", {
        get: function () {
            var _a;
            var val = (_a = this.element.get(0)).orElse.apply(_a, []).values;
            if (!val.length) {
                return this.defaultVal;
            }
            return val[0].getAttribute(this.name);
        },
        set: function (value) {
            var _a;
            var val = (_a = this.element.get(0)).orElse.apply(_a, []).values;
            for (var cnt = 0; cnt < val.length; cnt++) {
                val[cnt].setAttribute(this.name, value);
            }
            val[0].setAttribute(this.name, value);
        },
        enumerable: false,
        configurable: true
    });
    ElementAttribute.prototype.getClass = function () {
        return ElementAttribute;
    };
    ElementAttribute.fromNullable = function (value, valueKey) {
        if (valueKey === void 0) { valueKey = "value"; }
        return new ElementAttribute(value, valueKey);
    };
    return ElementAttribute;
}(Monad_1.ValueEmbedder));
exports.ElementAttribute = ElementAttribute;
var Style = /** @class */ (function (_super) {
    __extends(Style, _super);
    function Style(element, name, defaultVal) {
        if (defaultVal === void 0) { defaultVal = null; }
        var _this = _super.call(this, element, name) || this;
        _this.element = element;
        _this.name = name;
        _this.defaultVal = defaultVal;
        return _this;
    }
    Object.defineProperty(Style.prototype, "value", {
        get: function () {
            var val = this.element.values;
            if (!val.length) {
                return this.defaultVal;
            }
            return val[0].style[this.name];
        },
        set: function (value) {
            var val = this.element.values;
            for (var cnt = 0; cnt < val.length; cnt++) {
                val[cnt].style[this.name] = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Style.prototype.getClass = function () {
        return ElementAttribute;
    };
    Style.fromNullable = function (value, valueKey) {
        if (valueKey === void 0) { valueKey = "value"; }
        return new ElementAttribute(value, valueKey);
    };
    return Style;
}(Monad_1.ValueEmbedder));
exports.Style = Style;
/**
 * small helper for the specialized jsf case
 * @constructor
 */
var DEFAULT_WHITELIST = function () {
    return true;
};
/**
 * Monadic DomNode representation, ala jquery
 * This is a thin wrapper over querySelectorAll
 * to get slim monadic support
 * to reduce implementation code on the users side.
 * This is vital for frameworks which want to rely on
 * plain dom but still do not want to lose
 * the reduced code footprint of querying dom trees and traversing
 * by using functional patterns.
 *
 * Also, a few convenience methods are added to reduce
 * the code footprint of standard dom processing
 * operations like eval
 *
 * in most older systems
 * Note parts of this code still stem from the Dom.js I have written 10 years
 * ago, those parts look a bit ancient and will be replaced over time.
 *
 */
var DomQuery = /** @class */ (function () {
    function DomQuery() {
        var _a;
        var rootNode = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rootNode[_i] = arguments[_i];
        }
        this.rootNode = [];
        this.pos = -1;
        // because we can stream from an array stream directly into the dom query
        this._limits = -1;
        if (Monad_1.Optional.fromNullable(rootNode).isAbsent() || !rootNode.length) {
            return;
        }
        else {
            // we need to flatten out the arrays
            for (var cnt = 0; cnt < rootNode.length; cnt++) {
                if (!rootNode[cnt]) {
                    // we skip possible null entries which can happen in
                    // certain corner conditions due to the constructor re-wrapping single elements into arrays.
                }
                else if (isString(rootNode[cnt])) {
                    var foundElement = DomQuery.querySelectorAll(rootNode[cnt]);
                    if (!foundElement.isAbsent()) {
                        rootNode.push.apply(rootNode, __spreadArray([], __read(foundElement.values), false));
                    }
                }
                else if (rootNode[cnt] instanceof DomQuery) {
                    (_a = this.rootNode).push.apply(_a, __spreadArray([], __read(rootNode[cnt].values), false));
                }
                else {
                    this.rootNode.push(rootNode[cnt]);
                }
            }
        }
    }
    Object.defineProperty(DomQuery.prototype, "value", {
        /**
         * returns the first element
         */
        get: function () {
            return this.getAsElem(0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "values", {
        get: function () {
            return this.allElems();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "global", {
        get: function () {
            return Global_1._global$;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "id", {
        /**
         * returns the id of the first element
         */
        get: function () {
            return new ElementAttribute(this.get(0), "id");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "length", {
        /**
         * length of the entire query set
         */
        get: function () {
            return this.rootNode.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "tagName", {
        /**
         * convenience method for tagName
         */
        get: function () {
            return this.getAsElem(0).getIf("tagName");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "nodeName", {
        /**
         * convenience method for nodeName
         */
        get: function () {
            return this.getAsElem(0).getIf("nodeName");
        },
        enumerable: false,
        configurable: true
    });
    DomQuery.prototype.isTag = function (tagName) {
        return !this.isAbsent()
            && (this.nodeName.orElse("__none___")
                .value.toLowerCase() == tagName.toLowerCase()
                || this.tagName.orElse("__none___")
                    .value.toLowerCase() == tagName.toLowerCase());
    };
    Object.defineProperty(DomQuery.prototype, "type", {
        /**
         * convenience property for type
         *
         * returns null in case of no type existing otherwise
         * the type of the first element
         */
        get: function () {
            return this.getAsElem(0).getIf("type");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "name", {
        /**
         * convenience property for name
         *
         * returns null in case of no type existing otherwise
         * the name of the first element
         */
        get: function () {
            return new Monad_1.ValueEmbedder(this.getAsElem(0).value, "name");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "inputValue", {
        /**
         * convenience property for value
         *
         * returns null in case of no type existing otherwise
         * the value of the first element
         */
        get: function () {
            if (this.getAsElem(0).getIf("value").isPresent()) {
                return new Monad_1.ValueEmbedder(this.getAsElem(0).value);
            }
            else {
                return Monad_1.ValueEmbedder.absent;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "val", {
        get: function () {
            return this.inputValue.value;
        },
        set: function (value) {
            this.inputValue.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "nodeId", {
        get: function () {
            return this.id.value;
        },
        set: function (value) {
            this.id.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "checked", {
        get: function () {
            return Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(this.values), false)).allMatch(function (el) { return !!el.checked; });
        },
        set: function (newChecked) {
            this.eachElem(function (el) { return el.checked = newChecked; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "elements", {
        get: function () {
            // a simple querySelectorAll should suffice
            return this.querySelectorAll("input, checkbox, select, textarea, fieldset");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "deepElements", {
        get: function () {
            var elemStr = "input, select, textarea, checkbox, fieldset";
            return this.querySelectorAllDeep(elemStr);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * a deep search which treats the single isolated shadow dom areas
     * separately and runs the query on each shadow dom
     * @param queryStr
     */
    DomQuery.prototype.querySelectorAllDeep = function (queryStr) {
        var found = [];
        var queryRes = this.querySelectorAll(queryStr);
        if (queryRes.length) {
            found.push(queryRes);
        }
        var shadowRoots = this.querySelectorAll("*").shadowRoot;
        if (shadowRoots.length) {
            var shadowRes = shadowRoots.querySelectorAllDeep(queryStr);
            if (shadowRes.length) {
                found.push(shadowRes);
            }
        }
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(found), false)))();
    };
    Object.defineProperty(DomQuery.prototype, "disabled", {
        /**
         * disabled flag
         */
        get: function () {
            return this.attr("disabled").isPresent();
        },
        set: function (disabled) {
            // this.attr("disabled").value = disabled + "";
            if (!disabled) {
                this.removeAttribute("disabled");
            }
            else {
                this.attr("disabled").value = "disabled";
            }
        },
        enumerable: false,
        configurable: true
    });
    DomQuery.prototype.removeAttribute = function (name) {
        this.eachElem(function (item) { return item.removeAttribute(name); });
    };
    Object.defineProperty(DomQuery.prototype, "childNodes", {
        get: function () {
            var childNodeArr = [];
            this.eachElem(function (item) {
                childNodeArr = childNodeArr.concat(objToArray(item.childNodes));
            });
            return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(childNodeArr), false)))();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "stream", {
        /**
         * binding into stream
         */
        get: function () {
            return new (Stream_1.Stream.bind.apply(Stream_1.Stream, __spreadArray([void 0], __read(this.asArray), false)))();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "lazyStream", {
        /**
         * fetches a lazy stream representation
         * lazy should be applied if you have some filters etc.
         * in between, this can reduce the number of post filter operations
         * and ram usage
         * significantly because the operations are done lazily and stop
         * once they hit a dead end.
         */
        get: function () {
            return Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(this.asArray), false));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "asArray", {
        get: function () {
            // filter not supported by IE11
            return [].concat(Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(this.rootNode), false)).filter(function (item) {
                return item != null;
            })
                .map(function (item) {
                return DomQuery.byId(item);
            }).collect(new SourcesCollectors_1.ArrayCollector()));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "offsetWidth", {
        get: function () {
            return Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(this.rootNode), false)).filter(function (item) { return item != null; })
                .map(function (elem) { return elem.offsetWidth; })
                .reduce(function (accumulate, incoming) { return accumulate + incoming; }, 0).value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "offsetHeight", {
        get: function () {
            return Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(this.rootNode), false)).filter(function (item) { return item != null; })
                .map(function (elem) { return elem.offsetHeight; })
                .reduce(function (accumulate, incoming) { return accumulate + incoming; }, 0).value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "offsetLeft", {
        get: function () {
            return Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(this.rootNode), false)).filter(function (item) { return item != null; })
                .map(function (elem) { return elem.offsetLeft; })
                .reduce(function (accumulate, incoming) { return accumulate + incoming; }, 0).value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "offsetTop", {
        get: function () {
            return Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(this.rootNode), false)).filter(function (item) { return item != null; })
                .map(function (elem) { return elem.offsetTop; })
                .reduce(function (accumulate, incoming) { return accumulate + incoming; }, 0).value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "asNodeArray", {
        get: function () {
            return [].concat(Stream_1.Stream.of(this.rootNode).filter(function (item) { return item != null; }).collect(new SourcesCollectors_1.ArrayCollector()));
        },
        enumerable: false,
        configurable: true
    });
    DomQuery.querySelectorAllDeep = function (selector) {
        return new DomQuery(document).querySelectorAllDeep(selector);
    };
    /**
     * easy query selector all producer
     *
     * @param selector the selector
     * @returns a results dom query object
     */
    DomQuery.querySelectorAll = function (selector) {
        if (selector.indexOf("/shadow/") != -1) {
            return new DomQuery(document)._querySelectorAllDeep(selector);
        }
        else {
            return new DomQuery(document)._querySelectorAll(selector);
        }
    };
    /**
     * byId producer
     *
     * @param selector id
     * @param deep true if you want to go into shadow areas
     * @return a DomQuery containing the found elements
     */
    DomQuery.byId = function (selector, deep) {
        if (deep === void 0) { deep = false; }
        if (isString(selector)) {
            return (!deep) ? new DomQuery(document).byId(selector) : new DomQuery(document).byIdDeep(selector);
        }
        else {
            return new DomQuery(selector);
        }
    };
    /**
     * byTagName producer
     *
     * @param selector name
     * @return a DomQuery containing the found elements
     */
    DomQuery.byTagName = function (selector) {
        if (isString(selector)) {
            return new DomQuery(document).byTagName(selector);
        }
        else {
            return new DomQuery(selector);
        }
    };
    DomQuery.globalEval = function (code, nonce) {
        return new DomQuery(document).globalEval(code, nonce);
    };
    DomQuery.globalEvalSticky = function (code, nonce) {
        return new DomQuery(document).globalEvalSticky(code, nonce);
    };
    /**
     * builds the ie nodes properly in a placeholder
     * and bypasses a non script insert bug that way
     * @param markup the markup code to be executed from
     */
    DomQuery.fromMarkup = function (markup) {
        // https:// developer.mozilla.org/de/docs/Web/API/DOMParser license creative commons
        var doc = document.implementation.createHTMLDocument("");
        markup = trim(markup);
        var lowerMarkup = markup.toLowerCase();
        if (lowerMarkup.search(/\<\!doctype[^\w\-]+/gi) != -1 ||
            lowerMarkup.search(/\<html[^\w\-]+/gi) != -1 ||
            lowerMarkup.search(/\<head[^\w\-]+/gi) != -1 ||
            lowerMarkup.search(/\<body[^\w\-]+/gi) != -1) {
            doc.documentElement.innerHTML = markup;
            return new DomQuery(doc.documentElement);
        }
        else {
            var startsWithTag = function (str, tagName) {
                var tag1 = ["<", tagName, ">"].join("");
                var tag2 = ["<", tagName, " "].join("");
                return (str.indexOf(tag1) == 0) || (str.indexOf(tag2) == 0);
            };
            var dummyPlaceHolder = new DomQuery(document.createElement("div"));
            // table needs special treatment due to the browsers auto creation
            if (startsWithTag(lowerMarkup, "thead") || startsWithTag(lowerMarkup, "tbody")) {
                dummyPlaceHolder.html("<table>".concat(markup, "</table>"));
                return dummyPlaceHolder.querySelectorAll("table").get(0).childNodes.detach();
            }
            else if (startsWithTag(lowerMarkup, "tfoot")) {
                dummyPlaceHolder.html("<table><thead></thead><tbody><tbody".concat(markup, "</table>"));
                return dummyPlaceHolder.querySelectorAll("table").get(2).childNodes.detach();
            }
            else if (startsWithTag(lowerMarkup, "tr")) {
                dummyPlaceHolder.html("<table><tbody>".concat(markup, "</tbody></table>"));
                return dummyPlaceHolder.querySelectorAll("tbody").get(0).childNodes.detach();
            }
            else if (startsWithTag(lowerMarkup, "td")) {
                dummyPlaceHolder.html("<table><tbody><tr>".concat(markup, "</tr></tbody></table>"));
                return dummyPlaceHolder.querySelectorAll("tr").get(0).childNodes.detach();
            }
            dummyPlaceHolder.html(markup);
            return dummyPlaceHolder.childNodes.detach();
        }
    };
    /**
     * returns the nth element as DomQuery
     * from the internal elements
     * note if you try to reach a non-existing element position
     * you will get back an absent entry
     *
     * @param index the nth index
     */
    DomQuery.prototype.get = function (index) {
        return (index < this.rootNode.length) ? new DomQuery(this.rootNode[index]) : DomQuery.absent;
    };
    /**
     * returns the nth element as optional of an Element object
     * @param index the number from the index
     * @param defaults the default value if the index is overrun default Optional\.absent
     */
    DomQuery.prototype.getAsElem = function (index, defaults) {
        if (defaults === void 0) { defaults = Monad_1.Optional.absent; }
        return (index < this.rootNode.length) ? Monad_1.Optional.fromNullable(this.rootNode[index]) : defaults;
    };
    /**
     * returns the files from a given element
     * @param index
     */
    DomQuery.prototype.filesFromElem = function (index) {
        var _a;
        return (index < this.rootNode.length) ? ((_a = this.rootNode[index]) === null || _a === void 0 ? void 0 : _a.files) ? this.rootNode[index].files : [] : [];
    };
    /**
     * returns the value array< of all elements
     */
    DomQuery.prototype.allElems = function () {
        return this.rootNode;
    };
    /**
     * absent no values reached?
     */
    DomQuery.prototype.isAbsent = function () {
        return this.length == 0;
    };
    /**
     * should make the code clearer
     * note if you pass a function
     * this refers to the active DomQuery object
     */
    DomQuery.prototype.isPresent = function (presentRunnable) {
        var absent = this.isAbsent();
        if (!absent && presentRunnable) {
            presentRunnable.call(this, this);
        }
        return !absent;
    };
    /**
     * should make the code clearer
     * note if you pass a function
     * this refers to the active DomQuery object
     *
     *
     * @param presentRunnable
     */
    DomQuery.prototype.ifPresentLazy = function (presentRunnable) {
        if (presentRunnable === void 0) { presentRunnable = function () {
        }; }
        this.isPresent.call(this, presentRunnable);
        return this;
    };
    /**
     * remove all affected nodes from this query object from the dom tree
     */
    DomQuery.prototype.delete = function () {
        this.eachElem(function (node) {
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        });
    };
    DomQuery.prototype.querySelectorAll = function (selector) {
        // We could merge both methods, but for now this is more readable
        if (selector.indexOf("/shadow/") != -1) {
            return this._querySelectorAllDeep(selector);
        }
        else {
            return this._querySelectorAll(selector);
        }
    };
    DomQuery.prototype.closest = function (selector) {
        // We could merge both methods, but for now this is more readable
        if (selector.indexOf("/shadow/") != -1) {
            return this._closestDeep(selector);
        }
        else {
            return this._closest(selector);
        }
    };
    /**
     * core byId method
     * @param id the id to search for
     * @param includeRoot also match the root element?
     */
    DomQuery.prototype.byId = function (id, includeRoot) {
        var res = [];
        if (includeRoot) {
            res = res.concat(Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(((this === null || this === void 0 ? void 0 : this.rootNode) || [])), false)).filter(function (item) { return id == item.id; })
                .map(function (item) { return new DomQuery(item); })
                .collect(new SourcesCollectors_1.ArrayCollector()));
        }
        // for some strange kind of reason the # selector fails
        // on hidden elements we use the attributes match selector
        // that works
        res = res.concat(this.querySelectorAll("[id=\"".concat(id, "\"]")));
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(res), false)))();
    };
    DomQuery.prototype.byIdDeep = function (id, includeRoot) {
        var res = [];
        if (includeRoot) {
            res = res.concat(Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(((this === null || this === void 0 ? void 0 : this.rootNode) || [])), false)).filter(function (item) { return id == item.id; })
                .map(function (item) { return new DomQuery(item); })
                .collect(new SourcesCollectors_1.ArrayCollector()));
        }
        var subItems = this.querySelectorAllDeep("[id=\"".concat(id, "\"]"));
        if (subItems.length) {
            res.push(subItems);
        }
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(res), false)))();
    };
    /**
     * same as byId just for the tag name
     * @param tagName the tag-name to search for
     * @param includeRoot shall the root element be part of this search
     * @param deep do we also want to go into shadow dom areas
     */
    DomQuery.prototype.byTagName = function (tagName, includeRoot, deep) {
        var _a;
        var res = [];
        if (includeRoot) {
            res = Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(((_a = this === null || this === void 0 ? void 0 : this.rootNode) !== null && _a !== void 0 ? _a : [])), false)).filter(function (element) { return (element === null || element === void 0 ? void 0 : element.tagName) == tagName; })
                .reduce(function (reduction, item) { return reduction.concat([item]); }, res)
                .orElse(res).value;
        }
        (deep) ? res.push(this.querySelectorAllDeep(tagName)) : res.push(this.querySelectorAll(tagName));
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(res), false)))();
    };
    /**
     * attr accessor, usage myQuery.attr("class").value = "bla"
     * or let value myQuery.attr("class").value
     * @param attr the attribute to set
     * @param defaultValue the default value in case nothing is presented (defaults to null)
     */
    DomQuery.prototype.attr = function (attr, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        return new ElementAttribute(this, attr, defaultValue);
    };
    DomQuery.prototype.style = function (cssProperty, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        return new Style(this, cssProperty, defaultValue);
    };
    /**
     * Checks for an existing class in the class attributes
     *
     * @param clazz the class to search for
     */
    DomQuery.prototype.hasClass = function (clazz) {
        var hasIt = false;
        this.eachElem(function (node) {
            hasIt = node.classList.contains(clazz);
            if (hasIt) {
                return false;
            }
        });
        return hasIt;
    };
    /**
     * appends a class string if not already in the element(s)
     *
     * @param clazz the style class to append
     */
    DomQuery.prototype.addClass = function (clazz) {
        this.eachElem(function (item) { return item.classList.add(clazz); });
        return this;
    };
    /**
     * remove the style class if in the class definitions
     *
     * @param clazz
     */
    DomQuery.prototype.removeClass = function (clazz) {
        this.eachElem(function (item) { return item.classList.remove(clazz); });
        return this;
    };
    /**
     * checks whether we have a multipart element in our children
     * or are one
     */
    DomQuery.prototype.isMultipartCandidate = function (deep) {
        if (deep === void 0) { deep = false; }
        var FILE_INPUT = "input[type='file']";
        return this.matchesSelector(FILE_INPUT) ||
            ((!deep) ? this.querySelectorAll(FILE_INPUT) :
                this.querySelectorAllDeep(FILE_INPUT)).first().isPresent();
    };
    /**
     * innerHtml
     * equivalent to jQueries html
     * as setter the html is set and the
     * DomQuery is given back
     * as getter the html string is returned
     *
     * @param newInnerHTML the inner html to be inserted
     */
    DomQuery.prototype.html = function (newInnerHTML) {
        if (Monad_1.Optional.fromNullable(newInnerHTML).isAbsent()) {
            return this.isPresent() ? Monad_1.Optional.fromNullable(this.innerHTML) : Monad_1.Optional.absent;
        }
        this.innerHTML = newInnerHTML;
        return this;
    };
    /**
     * Standard dispatch event method, delegated from node
     */
    DomQuery.prototype.dispatchEvent = function (evt) {
        this.eachElem(function (elem) { return elem.dispatchEvent(evt); });
        return this;
    };
    Object.defineProperty(DomQuery.prototype, "innerHTML", {
        /**
         * getter abbreviation to use innerHTML directly
         */
        get: function () {
            var retArr = [];
            this.eachElem(function (elem) { return retArr.push(elem.innerHTML); });
            return retArr.join("");
        },
        /**
         * abbreviation property to use innerHTML directly like on the dom tree
         * @param newInnerHTML  the new inner html which should be attached to "this" domQuery
         */
        set: function (newInnerHTML) {
            this.eachElem(function (elem) { return elem.innerHTML = newInnerHTML; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "innerHtml", {
        /**
         * same here, getter for allowing innerHtml directly
         */
        get: function () {
            return this.innerHTML;
        },
        /**
         * since the dom allows both innerHTML and innerHtml we also have to implement both
         * @param newInnerHtml see above
         */
        set: function (newInnerHtml) {
            this.innerHTML = newInnerHtml;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * filters the current dom query elements
     * upon a given selector
     *
     * @param selector
     */
    DomQuery.prototype.filterSelector = function (selector) {
        var _this = this;
        var matched = [];
        this.eachElem(function (item) {
            if (_this._mozMatchesSelector(item, selector)) {
                matched.push(item);
            }
        });
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(matched), false)))();
    };
    /**
     * checks whether any item in this domQuery level matches the selector
     * if there is one element only attached, as root the match is only
     * performed on this element.
     * @param selector
     */
    DomQuery.prototype.matchesSelector = function (selector) {
        var _this = this;
        var ret = this.lazyStream
            .map(function (item) { return _this._mozMatchesSelector(item.getAsElem(0).value, selector); })
            .filter(function (match) { return match; })
            .first();
        return ret.isPresent();
    };
    /**
     * easy node traversal, you can pass
     * a set of node selectors which are joined as direct children
     *
     * Note!!! The root nodes are not in the getIf, those are always the child nodes
     *
     * @param nodeSelector
     */
    DomQuery.prototype.getIf = function () {
        var nodeSelector = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nodeSelector[_i] = arguments[_i];
        }
        var selectorStage = this.childNodes;
        for (var cnt = 0; cnt < nodeSelector.length; cnt++) {
            selectorStage = selectorStage.filterSelector(nodeSelector[cnt]);
            if (selectorStage.isAbsent()) {
                return selectorStage;
            }
        }
        return selectorStage;
    };
    DomQuery.prototype.eachElem = function (func) {
        for (var cnt = 0, len = this.rootNode.length; cnt < len; cnt++) {
            if (func(this.rootNode[cnt], cnt) === false) {
                break;
            }
        }
        return this;
    };
    DomQuery.prototype.firstElem = function (func) {
        if (func === void 0) { func = function (item) { return item; }; }
        if (this.rootNode.length > 1) {
            func(this.rootNode[0], 0);
        }
        return this;
    };
    DomQuery.prototype.lastElem = function (func) {
        if (func === void 0) { func = function (item) { return item; }; }
        if (this.rootNode.length > 1) {
            func(this.rootNode[this.rootNode.length - 1], 0);
        }
        return this;
    };
    DomQuery.prototype.each = function (func) {
        Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(this.rootNode), false)).each(function (item, cnt) {
            // we could use a filter, but for the best performance we don´t
            if (item == null) {
                return;
            }
            return func(DomQuery.byId(item), cnt);
        });
        return this;
    };
    /**
     * replace convenience function, replaces one or more elements with
     * a set of elements passed as DomQuery
     * @param toReplace the replaced nodes as reference (original node has been replaced)
     */
    DomQuery.prototype.replace = function (toReplace) {
        this.each(function (item) {
            var asElem = item.getAsElem(0).value;
            var parent = asElem.parentElement;
            var nextElement = asElem.nextElementSibling;
            var previousElement = asElem.previousElementSibling;
            if (nextElement != null) {
                new DomQuery(nextElement).insertBefore(toReplace);
            }
            else if (previousElement) {
                new DomQuery(previousElement).insertAfter(toReplace);
            }
            else {
                new DomQuery(parent).append(toReplace);
            }
            item.delete();
        });
        return toReplace;
    };
    /**
     * returns a new dom query containing only the first element max
     *
     * @param func a an optional callback function to perform an operation on the first element
     */
    DomQuery.prototype.first = function (func) {
        if (func === void 0) { func = function (item) { return item; }; }
        if (this.rootNode.length >= 1) {
            func(this.get(0), 0);
            return this.get(0);
        }
        return this;
    };
    /**
     * returns a new dom query containing only the first element max
     *
     * @param func a an optional callback function to perform an operation on the first element
     */
    DomQuery.prototype.last = function (func) {
        if (func === void 0) { func = function (item) { return item; }; }
        if (this.rootNode.length >= 1) {
            var lastNode = this.get(this.rootNode.length - 1);
            func(lastNode, 0);
            return lastNode;
        }
        return this;
    };
    /**
     * filter function which filters a subset
     *
     * @param func
     */
    DomQuery.prototype.filter = function (func) {
        var reArr = [];
        this.each(function (item) {
            func(item) ? reArr.push(item) : null;
        });
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(reArr), false)))();
    };
    /**
     * global eval head appendix method
     * no other methods are supported anymore
     * @param code the code to be evaluated
     * @param  nonce optional  nonce key for higher security
     */
    DomQuery.prototype.globalEval = function (code, nonce) {
        var _a, _b, _c;
        var head = (_b = (_a = document.getElementsByTagName("head")) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : (_c = document.documentElement.getElementsByTagName("head")) === null || _c === void 0 ? void 0 : _c[0];
        var script = document.createElement("script");
        if (nonce) {
            if ('undefined' != typeof (script === null || script === void 0 ? void 0 : script.nonce)) {
                script.nonce = nonce;
            }
            else {
                script.setAttribute("nonce", nonce);
            }
        }
        script.type = "text/javascript";
        script.innerHTML = code;
        var newScriptElement = head.appendChild(script);
        head.removeChild(newScriptElement);
        return this;
    };
    /**
     * global eval head appendix method
     * no other methods are supported anymore
     * @param code the code to be evaluated
     * @param  nonce optional  nonce key for higher security
     */
    DomQuery.prototype.globalEvalSticky = function (code, nonce) {
        var head = document.getElementsByTagName("head")[0] || document.documentElement;
        var script = document.createElement("script");
        this.applyNonce(nonce, script);
        script.type = "text/javascript";
        script.innerHTML = code;
        head.appendChild(script);
        return this;
    };
    /**
     * detaches a set of nodes from their parent elements
     * in a browser independent manner
     * @return {Array} an array of nodes with the detached dom nodes
     */
    DomQuery.prototype.detach = function () {
        this.eachElem(function (item) {
            item.parentNode.removeChild(item);
        });
        return this;
    };
    /**
     * appends the current set of elements
     * to the element or first element passed via elem
     * @param elem
     */
    DomQuery.prototype.appendTo = function (elem) {
        if (Lang_1.Lang.isString(elem)) {
            this.appendTo(DomQuery.querySelectorAll(elem));
            return this;
        }
        this.eachElem(function (item) {
            var value1 = elem.getAsElem(0).orElseLazy(function () {
                return {
                    appendChild: function () {
                    }
                };
            }).value;
            value1.appendChild(item);
        });
        return this;
    };
    /**
     * loads and evaluates a script from a source uri
     *
     * @param src the source to be loaded and evaluated
     * @param delay in milliseconds execution default (0 == no delay)
     * @param nonce optional nonce value to allow increased security via nonce crypto token
     */
    DomQuery.prototype.loadScriptEval = function (src, delay, nonce) {
        if (delay === void 0) { delay = 0; }
        this._loadScriptEval(false, src, delay, nonce);
        return this;
    };
    /**
     * loads and evaluates a script from a source uri
     *
     * @param src the source to be loaded and evaluated
     * @param delay in milliseconds execution default (0 == no delay)
     * @param nonce optional nonce parameter for increased security via nonce crypto token
     */
    DomQuery.prototype.loadScriptEvalSticky = function (src, delay, nonce) {
        if (delay === void 0) { delay = 0; }
        this._loadScriptEval(true, src, delay, nonce);
        return this;
    };
    DomQuery.prototype.insertAfter = function () {
        var toInsertParams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            toInsertParams[_i] = arguments[_i];
        }
        this.each(function (existingItem) {
            var existingElement = existingItem.getAsElem(0).value;
            var rootNode = existingElement.parentNode;
            var _loop_1 = function (cnt) {
                var nextSibling = existingElement.nextSibling;
                toInsertParams[cnt].eachElem(function (insertElem) {
                    if (nextSibling) {
                        rootNode.insertBefore(insertElem, nextSibling);
                        existingElement = nextSibling;
                    }
                    else {
                        rootNode.appendChild(insertElem);
                    }
                });
            };
            for (var cnt = 0; cnt < toInsertParams.length; cnt++) {
                _loop_1(cnt);
            }
        });
        var res = [];
        res.push(this);
        res = res.concat(toInsertParams);
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(res), false)))();
    };
    DomQuery.prototype.insertBefore = function () {
        var toInsertParams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            toInsertParams[_i] = arguments[_i];
        }
        this.each(function (existingItem) {
            var existingElement = existingItem.getAsElem(0).value;
            var rootNode = existingElement.parentNode;
            for (var cnt = 0; cnt < toInsertParams.length; cnt++) {
                toInsertParams[cnt].eachElem(function (insertElem) {
                    rootNode.insertBefore(insertElem, existingElement);
                });
            }
        });
        var res = [];
        res.push(this);
        res = res.concat(toInsertParams);
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(res), false)))();
    };
    DomQuery.prototype.orElse = function () {
        var elseValue = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elseValue[_i] = arguments[_i];
        }
        if (this.isPresent()) {
            return this;
        }
        else {
            return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(elseValue), false)))();
        }
    };
    DomQuery.prototype.orElseLazy = function (func) {
        if (this.isPresent()) {
            return this;
        }
        else {
            return new DomQuery(func());
        }
    };
    /**
     * find all parents in the hierarchy for which the selector matches
     * @param selector
     */
    DomQuery.prototype.allParents = function (selector) {
        var parent = this.parent();
        var ret = [];
        while (parent.isPresent()) {
            if (parent.matchesSelector(selector)) {
                ret.push(parent);
            }
            parent = parent.parent();
        }
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(ret), false)))();
    };
    /**
     * finds the first parent in the hierarchy for which the selector matches
     * @param selector
     */
    DomQuery.prototype.firstParent = function (selector) {
        var parent = this.parent();
        while (parent.isPresent()) {
            if (parent.matchesSelector(selector)) {
                return parent;
            }
            parent = parent.parent();
        }
        return DomQuery.absent;
    };
    /**
     * fetches all parents as long as the filter criterium matches
     * @param selector
     */
    DomQuery.prototype.parentsWhileMatch = function (selector) {
        var retArr = [];
        var parent = this.parent().filter(function (item) { return item.matchesSelector(selector); });
        while (parent.isPresent()) {
            retArr.push(parent);
            parent = parent.parent().filter(function (item) { return item.matchesSelector(selector); });
        }
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(retArr), false)))();
    };
    DomQuery.prototype.parent = function () {
        var ret = [];
        this.eachElem(function (item) {
            var parent = item.parentNode || item.host || item.shadowRoot;
            if (parent && ret.indexOf(parent) == -1) {
                ret.push(parent);
            }
        });
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(ret), false)))();
    };
    DomQuery.prototype.copyAttrs = function (sourceItem) {
        var _this = this;
        sourceItem.eachElem(function (sourceNode) {
            var e_1, _a;
            var attrs = objToArray(sourceNode.attributes);
            try {
                for (var attrs_1 = __values(attrs), attrs_1_1 = attrs_1.next(); !attrs_1_1.done; attrs_1_1 = attrs_1.next()) {
                    var item = attrs_1_1.value;
                    var value = item.value;
                    var name_1 = item.name;
                    switch (name_1) {
                        case "id":
                            _this.id.value = value;
                            break;
                        case "disabled":
                            _this.resolveAttributeHolder("disabled").disabled = value;
                            break;
                        case "checked":
                            _this.resolveAttributeHolder("checked").checked = value;
                            break;
                        default:
                            _this.attr(name_1).value = value;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (attrs_1_1 && !attrs_1_1.done && (_a = attrs_1.return)) _a.call(attrs_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
        return this;
    };
    /**
     * outerHTML convenience method
     * browsers only support innerHTML but
     * for instance for your jsf.js we have a full
     * replace pattern which needs outerHTML processing
     *
     * @param markup the markup which should replace the root element
     * @param runEmbeddedScripts if true the embedded scripts are executed
     * @param runEmbeddedCss if true the embedded css are executed
     * @param deep should this also work for shadow dom (run scripts etc...)
     */
    DomQuery.prototype.outerHTML = function (markup, runEmbeddedScripts, runEmbeddedCss, deep) {
        var _a;
        if (deep === void 0) { deep = false; }
        if (this.isAbsent()) {
            return;
        }
        var focusElementId = (_a = document === null || document === void 0 ? void 0 : document.activeElement) === null || _a === void 0 ? void 0 : _a.id;
        var caretPosition = (focusElementId) ? DomQuery.getCaretPosition(document.activeElement) : null;
        var nodes = DomQuery.fromMarkup(markup);
        var res = [];
        var toReplace = this.getAsElem(0).value;
        var firstInsert = nodes.get(0);
        var parentNode = toReplace.parentNode;
        var replaced = firstInsert.getAsElem(0).value;
        parentNode.replaceChild(replaced, toReplace);
        res.push(new DomQuery(replaced));
        // no replacement possible
        if (this.isAbsent()) {
            return this;
        }
        var insertAdditionalItems = [];
        if (nodes.length > 1) {
            insertAdditionalItems = insertAdditionalItems.concat.apply(insertAdditionalItems, __spreadArray([], __read(nodes.values.slice(1)), false));
            res.push(DomQuery.byId(replaced).insertAfter(new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(insertAdditionalItems), false)))()));
        }
        if (runEmbeddedScripts) {
            this.runScripts();
        }
        if (runEmbeddedCss) {
            this.runCss();
        }
        var focusElement = DomQuery.byId(focusElementId);
        if (focusElementId && focusElement.isPresent() &&
            caretPosition != null && "undefined" != typeof caretPosition) {
            focusElement.eachElem(function (item) { return DomQuery.setCaretPosition(item, caretPosition); });
        }
        return nodes;
    };
    /**
     * Run through the given nodes in the DomQuery execute the inline scripts
     * @param sticky if set to true the evaluated elements will stick to the head, default false
     * @param whitelisted: optional whitelist function which can filter out script tags which are not processed
     * defaults to the standard jsf.js exclusion (we use this code for myfaces)
     */
    DomQuery.prototype.runScripts = function (sticky, whitelisted) {
        var _this = this;
        if (sticky === void 0) { sticky = false; }
        if (whitelisted === void 0) { whitelisted = DEFAULT_WHITELIST; }
        var evalCollectedScripts = function (scriptsToProcess) {
            if (scriptsToProcess.length) {
                // script source means we have to eval the existing
                // scripts before we run the 'include' command
                // this.globalEval(finalScripts.join("\n"));
                var joinedScripts_1 = [];
                Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(scriptsToProcess), false)).each(function (item) {
                    if (!item.nonce) {
                        joinedScripts_1.push(item.evalText);
                    }
                    else {
                        if (joinedScripts_1.length) {
                            _this.globalEval(joinedScripts_1.join("\n"));
                            joinedScripts_1.length = 0;
                        }
                        (!sticky) ?
                            _this.globalEval(item.evalText, item.nonce) :
                            _this.globalEvalSticky(item.evalText, item.nonce);
                    }
                });
                if (joinedScripts_1.length) {
                    (!sticky) ? _this.globalEval(joinedScripts_1.join("\n")) :
                        _this.globalEvalSticky(joinedScripts_1.join("\n"));
                    joinedScripts_1.length = 0;
                }
                scriptsToProcess = [];
            }
            return scriptsToProcess;
        };
        var finalScripts = [], allowedItemTypes = ["", "script", "text/javascript", "text/ecmascript", "ecmascript"], execScript = function (item) {
            var _a, _b, _c, _d;
            var tagName = item.tagName;
            var itemType = ((_a = item === null || item === void 0 ? void 0 : item.type) !== null && _a !== void 0 ? _a : '').toLowerCase();
            if (tagName &&
                eqi(tagName, "script") &&
                allowedItemTypes.indexOf(itemType) != -1) {
                var src = item.getAttribute('src');
                if ('undefined' != typeof src
                    && null != src
                    && src.length > 0) {
                    var nonce = (_b = item === null || item === void 0 ? void 0 : item.nonce) !== null && _b !== void 0 ? _b : item.getAttribute('nonce').value;
                    // we have to move this into an inner if because chrome otherwise chokes
                    // due to changing the and order instead of relying on left to right
                    // if jsf.js is already registered we do not replace it anymore
                    if (whitelisted(src)) {
                        // we run the collected scripts, before we run the 'include' command
                        finalScripts = evalCollectedScripts(finalScripts);
                        if (!sticky) {
                            (!!nonce) ? _this.loadScriptEval(src, 0, nonce) :
                                // if no nonce is set we do not pass any once
                                _this.loadScriptEval(src, 0);
                        }
                        else {
                            (!!nonce) ? _this.loadScriptEvalSticky(src, 0, nonce) :
                                // if no nonce is set we do not pass any once
                                _this.loadScriptEvalSticky(src, 0);
                        }
                    }
                }
                else {
                    // embedded script auto eval
                    // probably not needed anymore
                    var evalText = trim(item.text || item.innerText || item.innerHTML);
                    var go = true;
                    while (go) {
                        go = false;
                        if (evalText.substring(0, 4) == "<!--") {
                            evalText = evalText.substring(4);
                            go = true;
                        }
                        if (evalText.substring(0, 4) == "//<!--") {
                            evalText = evalText.substring(6);
                            go = true;
                        }
                        if (evalText.substring(0, 11) == "//<![CDATA[") {
                            evalText = evalText.substring(11);
                            go = true;
                        }
                    }
                    var nonce = (_d = (_c = item === null || item === void 0 ? void 0 : item.nonce) !== null && _c !== void 0 ? _c : item.getAttribute('nonce').value) !== null && _d !== void 0 ? _d : '';
                    // we have to run the script under a global context
                    // we store the script for fewer calls to eval
                    finalScripts.push({
                        nonce: nonce,
                        evalText: evalText
                    });
                }
            }
        };
        try {
            var scriptElements = new DomQuery(this.filterSelector("script"), this.querySelectorAll("script"));
            // script execution order by relative pos in their dom tree
            scriptElements.stream
                .flatMap(function (item) { return Stream_1.Stream.of(item.values); })
                .sort(function (node1, node2) { return node1.compareDocumentPosition(node2) - 3; }) // preceding 2, following == 4)
                .each(function (item) { return execScript(item); });
            evalCollectedScripts(finalScripts);
        }
        catch (e) {
            if (console && console.error) {
                // not sure if we
                // should use our standard
                // error mechanisms here
                // because in the head appendix
                // method only a console
                // error would be raised as well
                console.error(e.message || e.description);
            }
        }
        finally {
            // the usual ie6 fix code
            // the IE6 garbage collector is broken
            // nulling closures helps somewhat to reduce
            // mem leaks, which are impossible to avoid
            // at this browser
            execScript = null;
        }
        return this;
    };
    DomQuery.prototype.runCss = function () {
        var execCss = function (toReplace) {
            var _toReplace = DomQuery.byId(toReplace);
            var tagName = _toReplace.tagName.orElse("").value;
            var head = DomQuery.byTagName("head");
            if (tagName && eqi(tagName, "link") && eqi(toReplace.getAttribute("rel"), "stylesheet")) {
                var rel = toReplace.getAttribute("rel");
                //if possible we are now replacing the existing elements where we reference this stylesheet
                var matches = head.querySelectorAll("link[rel='stylesheet'][href='".concat(rel, "']"));
                if (matches.length) {
                    matches.replace(_toReplace);
                }
                else {
                    head.append(_toReplace);
                }
            }
            else if (tagName && eqi(tagName, "style")) {
                var innerText_1 = _toReplace.innerHTML.replace(/\s+/gi, "");
                var styles = head.querySelectorAll("style");
                styles = styles.stream.filter(function (style) {
                    return style.innerHTML.replace(/\s+/gi, "") == innerText_1;
                }).collect(new DomQueryCollector());
                if (!styles.length) { //already present
                    head.append(_toReplace);
                }
            }
        };
        var scriptElements = new DomQuery(this.filterSelector("link, style"), this.querySelectorAll("link, style"));
        scriptElements.stream
            .flatMap(function (item) { return Stream_1.Stream.of(item.values); })
            .sort(function (node1, node2) { return node1.compareDocumentPosition(node2) - 3; })
            .each(function (item) { return execCss(item); });
        return this;
    };
    /**
     * fires a click event on the underlying dom elements
     */
    DomQuery.prototype.click = function () {
        this.fireEvent("click");
        return this;
    };
    DomQuery.prototype.addEventListener = function (type, listener, options) {
        this.eachElem(function (node) { return node.addEventListener(type, listener, options); });
        return this;
    };
    DomQuery.prototype.removeEventListener = function (type, listener, options) {
        this.eachElem(function (node) { return node.removeEventListener(type, listener, options); });
        return this;
    };
    /**
     * fires an event
     */
    DomQuery.prototype.fireEvent = function (eventName, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        // merge with last one having the highest priority
        var finalOptions = Stream_1.Stream.ofAssoc({
            bubbles: true, cancelable: true
        }).concat(Stream_1.Stream.ofAssoc(options)).collect(new SourcesCollectors_1.AssocArrayCollector());
        this.eachElem(function (node) {
            var doc;
            if (node.ownerDocument) {
                doc = node.ownerDocument;
            }
            else if (node.nodeType == 9) {
                // the node may be the document itself, nodeType 9 = DOCUMENT_NODE
                doc = node;
            }
            else {
                throw new Error("Invalid node passed to fireEvent: " + node.id);
            }
            if (node.dispatchEvent) {
                // Gecko-style approach (now the standard) takes more work
                var EventClass = Event;
                // Different events have different event classes.
                // If this switch statement can't map an eventName to an EventClass,
                // the event firing is going to fail.
                // extend this list on demand
                switch (eventName) {
                    case "click": // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
                    case "mousedown":
                    case "mouseup":
                    case "mousemove":
                        EventClass = _this.global().MouseEvent;
                        break;
                    case "keyup":
                    case "keydown":
                    case "keypress":
                        EventClass = _this.global().KeyboardEvent;
                        break;
                    case "focus":
                    case "change":
                    case "blur":
                    case "select":
                        break;
                    default:
                        throw "fireEvent: Couldn't find an event class for event '" + eventName + "'.";
                }
                var event_1 = new EventClass(eventName, finalOptions);
                // this is added as an extra to allow internally the detection of synthetic events
                // not used atm, but it does not hurt to have the extra info
                event_1.synthetic = true; // allow detection of synthetic events
                // The second parameter says go ahead with the default action
                node.dispatchEvent(event_1);
            }
            else if (node.fireEvent) {
                // IE-old school style, you can drop this if you don't need to support IE8 and lower
                var event_2 = doc.createEventObject();
                event_2.synthetic = true; // allow detection of synthetic events
                Stream_1.Stream.ofAssoc(finalOptions).each(function (_a) {
                    var _b = __read(_a, 2), key = _b[0], value = _b[1];
                    event_2[key] = value;
                });
                node.fireEvent("on" + eventName, event_2);
            }
        });
    };
    DomQuery.prototype.textContent = function (joinString) {
        if (joinString === void 0) { joinString = ""; }
        return this.stream
            .map(function (value) {
            var item = value.getAsElem(0).orElseLazy(function () {
                return {
                    textContent: ""
                };
            }).value;
            return item.textContent || "";
        })
            .reduce(function (text1, text2) { return [text1, joinString, text2].join(""); }, "").value;
    };
    DomQuery.prototype.innerText = function (joinString) {
        if (joinString === void 0) { joinString = ""; }
        return this.stream
            .map(function (value) {
            var item = value.getAsElem(0).orElseLazy(function () {
                return {
                    innerText: ""
                };
            }).value;
            return item.innerText || "";
        })
            .reduce(function (text1, text2) { return [text1, text2].join(joinString); }, "").value;
    };
    /**
     * encodes all input elements properly into respective
     * config entries, this can be used
     * for legacy systems, for newer use-cases, use the
     * HTML5 Form class which all newer browsers provide
     *
     * @param toMerge optional config which can be merged in
     * @return a copy pf
     */
    DomQuery.prototype.encodeFormElement = function (toMerge) {
        if (toMerge === void 0) { toMerge = new Monad_1.Config({}); }
        // browser behavior no element name no encoding (normal submit fails in that case)
        // https:// issues.apache.org/jira/browse/MYFACES-2847
        if (this.name.isAbsent()) {
            return;
        }
        // let´s keep it side-effects free
        var target = toMerge.shallowCopy;
        this.each(function (element) {
            var _a, _b;
            if (element.name.isAbsent()) { // no name, no encoding
                return;
            }
            var name = element.name.value;
            var tagName = element.tagName.orElse("__none__").value.toLowerCase();
            var elemType = element.type.orElse("__none__").value.toLowerCase();
            elemType = elemType.toLowerCase();
            // routine for all elements
            // rules:
            // - process only input, textarea and select elements
            // - elements must have attribute "name"
            // - elements must not be disabled
            if (((tagName == "input" || tagName == "textarea" || tagName == "select") &&
                (name != null && name != "")) && !element.disabled) {
                // routine for select elements
                // rules:
                // - if select-one and value-Attribute exist => "name=value"
                // (also if value empty => "name=")
                // - if select-one and value-Attribute don't exist =>
                // "name=DisplayValue"
                // - if select multi and multiple selected => "name=value1&name=value2"
                // - if select and selectedIndex=-1 don't submit
                if (tagName == "select") {
                    // selectedIndex must be >= 0 to be submitted
                    var selectElem = element.getAsElem(0).value;
                    if (selectElem.selectedIndex >= 0) {
                        var uLen = selectElem.options.length;
                        for (var u = 0; u < uLen; u++) {
                            // find all selected options
                            // let subBuf = [];
                            if (selectElem.options[u].selected) {
                                var elementOption = selectElem.options[u];
                                target.append(name).value = (elementOption.getAttribute("value") != null) ?
                                    elementOption.value : elementOption.text;
                            }
                        }
                    }
                }
                // routine for remaining elements
                // rules:
                // - don't submit no selects (processed above), buttons, reset buttons, submit buttons,
                // - submit checkboxes and radio inputs only if checked
                if ((tagName != ALLOWED_SUBMITTABLE_ELEMENTS.SELECT &&
                    elemType != ALLOWED_SUBMITTABLE_ELEMENTS.BUTTON &&
                    elemType != ALLOWED_SUBMITTABLE_ELEMENTS.RESET &&
                    elemType != ALLOWED_SUBMITTABLE_ELEMENTS.SUBMIT &&
                    elemType != ALLOWED_SUBMITTABLE_ELEMENTS.IMAGE) && ((elemType != ALLOWED_SUBMITTABLE_ELEMENTS.CHECKBOX && elemType != ALLOWED_SUBMITTABLE_ELEMENTS.RADIO) ||
                    element.checked)) {
                    var uploadedFiles = (_b = (_a = element.value) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.files;
                    var filesArr = uploadedFiles !== null && uploadedFiles !== void 0 ? uploadedFiles : [];
                    if (filesArr === null || filesArr === void 0 ? void 0 : filesArr.length) { //files can be empty but set
                        // xhr level2, single multiple must be passes as they are
                        target.assign(name).value = Array.from(filesArr);
                    }
                    else {
                        if (!!uploadedFiles) { //we skip empty file elements i
                            return;
                        }
                        //checkboxes etc.. need to be appended
                        target.append(name).value = element.inputValue.value;
                    }
                }
            }
        });
        return target;
    };
    Object.defineProperty(DomQuery.prototype, "cDATAAsString", {
        get: function () {
            var TYPE_CDATA_BLOCK = 4;
            var res = this.lazyStream.flatMap(function (item) {
                return item.childNodes.stream;
            }).filter(function (item) {
                var _a, _b;
                return ((_b = (_a = item === null || item === void 0 ? void 0 : item.value) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.nodeType) == TYPE_CDATA_BLOCK;
            }).reduce(function (reduced, item) {
                var _a, _b, _c;
                reduced.push((_c = (_b = (_a = item === null || item === void 0 ? void 0 : item.value) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.data) !== null && _c !== void 0 ? _c : "");
                return reduced;
            }, []).value;
            // response may contain several blocks
            return res.join("");
        },
        enumerable: false,
        configurable: true
    });
    DomQuery.prototype.subNodes = function (from, to) {
        if (Monad_1.Optional.fromNullable(to).isAbsent()) {
            to = this.length;
        }
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(this.rootNode.slice(from, Math.min(to, this.length))), false)))();
    };
    DomQuery.prototype.limits = function (end) {
        this._limits = end;
        return this;
    };
    //-- internally exposed methods needed for the interconnectivity
    DomQuery.prototype.hasNext = function () {
        var isLimitsReached = this._limits != -1 && this.pos >= this._limits - 1;
        var isEndOfArray = this.pos >= this.values.length - 1;
        return !(isLimitsReached ||
            isEndOfArray);
    };
    DomQuery.prototype.next = function () {
        if (!this.hasNext()) {
            return null;
        }
        this.pos++;
        return new DomQuery(this.values[this.pos]);
    };
    DomQuery.prototype.lookAhead = function (cnt) {
        if (cnt === void 0) { cnt = 1; }
        if ((this.values.length - 1) < (this.pos + cnt)) {
            return SourcesCollectors_1.ITERATION_STATUS.EO_STRM;
        }
        return new DomQuery(this.values[this.pos + cnt]);
    };
    DomQuery.prototype.current = function () {
        if (this.pos == -1) {
            return SourcesCollectors_1.ITERATION_STATUS.BEF_STRM;
        }
        return new DomQuery(this.values[this.pos]);
    };
    DomQuery.prototype.reset = function () {
        this.pos = -1;
    };
    DomQuery.prototype.attachShadow = function (params) {
        if (params === void 0) { params = { mode: "open" }; }
        var shadowRoots = [];
        this.eachElem(function (item) {
            var shadowElement;
            if (item === null || item === void 0 ? void 0 : item.attachShadow) {
                shadowElement = DomQuery.byId(item.attachShadow(params));
                shadowRoots.push(shadowElement);
            }
            else {
                throw new Error("Shadow dom creation not supported by the browser, please use a shim, to gain this functionality");
            }
        });
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(shadowRoots), false)))();
    };
    /**
     * helper to fix a common dom problem
     * we have to wait until a certain condition is met, in most of the cases we just want to know whether an element is present in the sub dom-tree before being able to proceed
     * @param condition
     * @param options
     */
    DomQuery.prototype.waitUntilDom = function (condition, options) {
        if (options === void 0) { options = {
            attributes: true,
            childList: true,
            subtree: true,
            timeout: 500,
            interval: 100
        }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, waitUntilDom(this, condition, options)];
            });
        });
    };
    Object.defineProperty(DomQuery.prototype, "shadowElements", {
        /**
         * returns the embedded shadow elements
         */
        get: function () {
            var shadowElements = this.querySelectorAll("*")
                .filter(function (item) { return item.hasShadow; });
            var mapped = (shadowElements.allElems() || []).map(function (element) { return element.shadowRoot; });
            return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(mapped), false)))();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "shadowRoot", {
        get: function () {
            var shadowRoots = [];
            for (var cnt = 0; cnt < this.rootNode.length; cnt++) {
                if (this.rootNode[cnt].shadowRoot) {
                    shadowRoots.push(this.rootNode[cnt].shadowRoot);
                }
            }
            return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(shadowRoots), false)))();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomQuery.prototype, "hasShadow", {
        get: function () {
            for (var cnt = 0; cnt < this.rootNode.length; cnt++) {
                if (this.rootNode[cnt].shadowRoot) {
                    return true;
                }
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    // from
    // http:// blog.vishalon.net/index.php/javascript-getting-and-setting-caret-position-in-textarea/
    DomQuery.getCaretPosition = function (ctrl) {
        var caretPos = 0;
        try {
            if (document === null || document === void 0 ? void 0 : document.selection) {
                ctrl.focus();
                var selection = document.selection.createRange();
                // the selection now is start zero
                selection.moveStart('character', -ctrl.value.length);
                // the caret-position is the selection start
                caretPos = selection.text.length;
            }
        }
        catch (e) {
            // now this is ugly, but not supported input types throw errors for selectionStart
            // just in case someone dumps this code onto unsupported browsers
        }
        return caretPos;
    };
    /**
     * sets the caret position
     *
     * @param ctrl the control to set the caret position to
     * @param pos the position to set
     *
     * note if the control does not have any selectable and focusable behavior
     * calling this method does nothing (silent fail)
     *
     */
    DomQuery.setCaretPosition = function (ctrl, pos) {
        (ctrl === null || ctrl === void 0 ? void 0 : ctrl.focus) ? ctrl === null || ctrl === void 0 ? void 0 : ctrl.focus() : null;
        // the selection range is our caret position
        (ctrl === null || ctrl === void 0 ? void 0 : ctrl.setSelectiongRange) ? ctrl === null || ctrl === void 0 ? void 0 : ctrl.setSelectiongRange(pos, pos) : null;
    };
    /**
     * Implementation of an iterator
     * to allow loops over dom query collections
     */
    DomQuery.prototype[Symbol.iterator] = function () {
        var _this = this;
        return {
            next: function () {
                var done = !_this.hasNext();
                var val = _this.next();
                return {
                    done: done,
                    value: val
                };
            }
        };
    };
    /**
     * Concatenates the elements of two Dom Queries into a single one
     * @param toAttach the elements to attach
     * @param filterDoubles filter out possible double elements (aka same markup)
     */
    DomQuery.prototype.concat = function (toAttach, filterDoubles) {
        if (filterDoubles === void 0) { filterDoubles = true; }
        var ret = this.lazyStream.concat(toAttach.lazyStream).collect(new DomQueryCollector());
        // we now filter the doubles out
        if (!filterDoubles) {
            return ret;
        }
        var idx = {}; // ie11 does not support sets, we have to fake it
        return ret.lazyStream.filter(function (node) {
            var notFound = !(idx === null || idx === void 0 ? void 0 : idx[node.value.value.outerHTML]);
            idx[node.value.value.outerHTML] = true;
            return notFound;
        }).collect(new DomQueryCollector());
    };
    DomQuery.prototype.append = function (elem) {
        this.each(function (item) { return elem.appendTo(item); });
        return this;
    };
    DomQuery.prototype.prependTo = function (elem) {
        var _this = this;
        elem.eachElem(function (item) {
            item.prepend.apply(item, __spreadArray([], __read(_this.allElems()), false));
        });
        return this;
    };
    DomQuery.prototype.prepend = function (elem) {
        this.eachElem(function (item) {
            item.prepend.apply(item, __spreadArray([], __read(elem.allElems()), false));
        });
        return this;
    };
    /**
     * query selector all on the existing dom queryX object
     *
     * @param selector the standard selector
     * @return a DomQuery with the results
     */
    DomQuery.prototype._querySelectorAll = function (selector) {
        var _a, _b;
        if (!((_a = this === null || this === void 0 ? void 0 : this.rootNode) === null || _a === void 0 ? void 0 : _a.length)) {
            return this;
        }
        var nodes = [];
        for (var cnt = 0; cnt < this.rootNode.length; cnt++) {
            if (!((_b = this.rootNode[cnt]) === null || _b === void 0 ? void 0 : _b.querySelectorAll)) {
                continue;
            }
            var res = this.rootNode[cnt].querySelectorAll(selector);
            nodes = nodes.concat(objToArray(res));
        }
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(nodes), false)))();
    };
    /*deep with a selector and a pseudo /shadow/ marker to break into the next level*/
    DomQuery.prototype._querySelectorAllDeep = function (selector) {
        var _a;
        if (!((_a = this === null || this === void 0 ? void 0 : this.rootNode) === null || _a === void 0 ? void 0 : _a.length)) {
            return this;
        }
        var foundNodes = new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(this.rootNode), false)))();
        var selectors = selector.split(/\/shadow\//);
        for (var cnt2 = 0; cnt2 < selectors.length; cnt2++) {
            if (selectors[cnt2] == "") {
                continue;
            }
            var levelSelector = selectors[cnt2];
            foundNodes = foundNodes.querySelectorAll(levelSelector);
            if (cnt2 < selectors.length - 1) {
                foundNodes = foundNodes.shadowRoot;
            }
        }
        return foundNodes;
    };
    /**
     * query selector all on the existing dom queryX object
     *
     * @param selector the standard selector
     * @return a DomQuery with the results
     */
    DomQuery.prototype._closest = function (selector) {
        var _a, _b;
        if (!((_a = this === null || this === void 0 ? void 0 : this.rootNode) === null || _a === void 0 ? void 0 : _a.length)) {
            return this;
        }
        var nodes = [];
        for (var cnt = 0; cnt < this.rootNode.length; cnt++) {
            if (!((_b = this.rootNode[cnt]) === null || _b === void 0 ? void 0 : _b.closest)) {
                continue;
            }
            var res = [this.rootNode[cnt].closest(selector)];
            nodes = nodes.concat.apply(nodes, __spreadArray([], __read(res), false));
        }
        return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(nodes), false)))();
    };
    /*deep with a selector and a pseudo /shadow/ marker to break into the next level*/
    DomQuery.prototype._closestDeep = function (selector) {
        var _a;
        if (!((_a = this === null || this === void 0 ? void 0 : this.rootNode) === null || _a === void 0 ? void 0 : _a.length)) {
            return this;
        }
        var foundNodes = new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(this.rootNode), false)))();
        var selectors = selector.split(/\/shadow\//);
        for (var cnt2 = 0; cnt2 < selectors.length; cnt2++) {
            if (selectors[cnt2] == "") {
                continue;
            }
            var levelSelector = selectors[cnt2];
            foundNodes = foundNodes.closest(levelSelector);
            if (cnt2 < selectors.length - 1) {
                foundNodes = foundNodes.shadowRoot;
            }
        }
        return foundNodes;
    };
    // source: https:// developer.mozilla.org/en-US/docs/Web/API/Element/matches
    // code snippet license: https:// creativecommons.org/licenses/by-sa/2.5/
    /**
     * matches selector call in a browser independent manner
     *
     * @param toMatch
     * @param selector
     * @private
     */
    DomQuery.prototype._mozMatchesSelector = function (toMatch, selector) {
        var prototypeOwner = toMatch;
        var matchesSelector = prototypeOwner.matches ||
            prototypeOwner.matchesSelector ||
            prototypeOwner.mozMatchesSelector ||
            prototypeOwner.msMatchesSelector ||
            prototypeOwner.oMatchesSelector ||
            prototypeOwner.webkitMatchesSelector ||
            function (s) {
                var matches = (document || ownerDocument).querySelectorAll(s), i = matches.length;
                while (--i >= 0 && matches.item(i) !== toMatch) {
                }
                return i > -1;
            };
        return matchesSelector.call(toMatch, selector);
    };
    /**
     * sticky non-sticky unified code of the load script eval
     * implementation if programmatic &gt;script src="... loading
     *
     * @param sticky if set to true a head element is left in the dom tree after the script has loaded
     *
     * @param src the sec to load
     * @param delay delay the script loading x ms (default immediately === 0)
     * @param nonce optional nonce token to be passed into the script tag
     * @private
     */
    DomQuery.prototype._loadScriptEval = function (sticky, src, delay, nonce) {
        if (delay === void 0) { delay = 0; }
        var srcNode = this.createSourceNode(src, nonce);
        var nonceCheck = this.createSourceNode(null, nonce);
        var marker = "nonce_".concat(Date.now(), "_").concat(Math.random());
        nonceCheck.innerHTML = "document.head[\"".concat(marker, "\"] = true"); // noop
        var head = document.head;
        //  upfront nonce check, needed mostly for testing
        //  but cannot hurt to block src calls which have invalid nonce on localhost
        // the reason for doing this up until now we have a similar construct automatically
        // by loading the scripts via xhr and then embedding them.
        // this is not needed anymore but the nonce is more relaxed with script src
        // we now enforce it the old way
        head.appendChild(nonceCheck);
        head.removeChild(nonceCheck);
        if (!head[marker]) {
            return;
        }
        try {
            if (!delay) {
                head.appendChild(srcNode);
                if (!sticky) {
                    head.removeChild(srcNode);
                }
            }
            else {
                setTimeout(function () {
                    head.appendChild(srcNode);
                    if (!sticky) {
                        head.removeChild(srcNode);
                    }
                }, delay);
            }
        }
        finally {
            delete head[marker];
        }
        return this;
    };
    /**
     * resolves an attribute holder compared
     * @param attrName the attribute name
     */
    DomQuery.prototype.resolveAttributeHolder = function (attrName) {
        if (attrName === void 0) { attrName = "value"; }
        var ret = [];
        ret[attrName] = null;
        return (attrName in this.getAsElem(0).value) ?
            this.getAsElem(0).value :
            ret;
    };
    DomQuery.prototype.createSourceNode = function (src, nonce) {
        var srcNode = document.createElement("script");
        srcNode.type = "text/javascript";
        if (!!nonce) {
            if ('undefined' != typeof (srcNode === null || srcNode === void 0 ? void 0 : srcNode.nonce)) {
                srcNode.nonce = nonce;
            }
            else {
                srcNode.setAttribute("nonce", nonce);
            }
        }
        if (!!src) {
            srcNode.src = src;
        }
        return srcNode;
    };
    DomQuery.prototype.applyNonce = function (nonce, script) {
        if (nonce) {
            if ('undefined' != typeof (script === null || script === void 0 ? void 0 : script.nonce)) {
                script.nonce = nonce;
            }
            else {
                script.setAttribute("nonce", nonce);
            }
        }
    };
    DomQuery.absent = new DomQuery();
    /**
     * reference to the environmental global object
     */
    DomQuery.global = Global_1._global$;
    return DomQuery;
}());
exports.DomQuery = DomQuery;
/**
 * Various collectors
 * which can be used in conjunction with Streams
 */
/**
 * A collector which bundles a full dom query stream into a single dom query element
 *
 * This connects basically our stream back into DomQuery
 */
var DomQueryCollector = /** @class */ (function () {
    function DomQueryCollector() {
        this.data = [];
    }
    DomQueryCollector.prototype.collect = function (element) {
        this.data.push(element);
    };
    Object.defineProperty(DomQueryCollector.prototype, "finalValue", {
        get: function () {
            return new (DomQuery.bind.apply(DomQuery, __spreadArray([void 0], __read(this.data), false)))();
        },
        enumerable: false,
        configurable: true
    });
    return DomQueryCollector;
}());
exports.DomQueryCollector = DomQueryCollector;
/**
 * abbreviation for DomQuery
 */
exports.DQ = DomQuery;
// noinspection JSUnusedGlobalSymbols
/**
 * replacement for the jquery $
 */
exports.DQ$ = DomQuery.querySelectorAll;
//# sourceMappingURL=DomQuery.js.map