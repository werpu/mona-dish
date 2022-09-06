"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryFormStringCollector = exports.QueryFormDataCollector = exports.FormDataCollector = exports.AssocArrayCollector = exports.Run = exports.ArrayAssocArrayCollector = exports.ArrayCollector = exports.FlatMapStreamDataSource = exports.MappedStreamDataSource = exports.FilteredStreamDatasource = exports.ArrayStreamDataSource = exports.SequenceDataSource = void 0;
var Stream_1 = require("./Stream");
/**
 * defines a sequence of numbers for our stream input
 */
var SequenceDataSource = /** @class */ (function () {
    function SequenceDataSource(start, total) {
        this.total = total;
        this.start = start;
        this.value = start;
    }
    SequenceDataSource.prototype.hasNext = function () {
        return this.value < this.total;
    };
    SequenceDataSource.prototype.next = function () {
        return Math.min(this.value++, this.total - 1);
    };
    SequenceDataSource.prototype.reset = function () {
        this.value = 0;
    };
    return SequenceDataSource;
}());
exports.SequenceDataSource = SequenceDataSource;
/**
 * implementation of iteratable on top of array
 */
var ArrayStreamDataSource = /** @class */ (function () {
    function ArrayStreamDataSource() {
        var value = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            value[_i] = arguments[_i];
        }
        this.dataPos = -1;
        this.value = value;
    }
    ArrayStreamDataSource.prototype.hasNext = function () {
        return this.value.length - 1 > this.dataPos;
    };
    ArrayStreamDataSource.prototype.next = function () {
        this.dataPos++;
        return this.value[this.dataPos];
    };
    ArrayStreamDataSource.prototype.reset = function () {
        this.dataPos = -1;
    };
    return ArrayStreamDataSource;
}());
exports.ArrayStreamDataSource = ArrayStreamDataSource;
/**
 * an intermediate data source which prefilters
 * incoming stream data
 * and lets only the data out which
 * passes the filter function check
 */
var FilteredStreamDatasource = /** @class */ (function () {
    function FilteredStreamDatasource(filterFunc, parent) {
        this.filteredNext = null;
        this.filterFunc = filterFunc;
        this.inputDataSource = parent;
    }
    /**
     * in order to filter we have to make a look ahead until the
     * first next allowed element
     * hence we prefetch the element and then
     * serve it via next
     */
    FilteredStreamDatasource.prototype.hasNext = function () {
        while (this.filteredNext == null && this.inputDataSource.hasNext()) {
            var next = this.inputDataSource.next();
            if (this.filterFunc(next)) {
                this.filteredNext = next;
                return true;
            }
            else {
                this.filteredNext = null;
            }
        }
        return this.filteredNext != null;
    };
    /**
     * serve the next element
     */
    FilteredStreamDatasource.prototype.next = function () {
        var ret = this.filteredNext;
        this.filteredNext = null;
        //We have to call hasNext, to roll another
        //prefetch in case someone runs next
        //sequentially without calling hasNext
        this.hasNext();
        return ret;
    };
    FilteredStreamDatasource.prototype.reset = function () {
        this.filteredNext = null;
        this.inputDataSource.reset();
    };
    return FilteredStreamDatasource;
}());
exports.FilteredStreamDatasource = FilteredStreamDatasource;
/**
 * an intermediate datasource which maps the items from
 * one into another
 */
var MappedStreamDataSource = /** @class */ (function () {
    function MappedStreamDataSource(mapFunc, parent) {
        this.mapFunc = mapFunc;
        this.inputDataSource = parent;
    }
    MappedStreamDataSource.prototype.hasNext = function () {
        return this.inputDataSource.hasNext();
    };
    MappedStreamDataSource.prototype.next = function () {
        return this.mapFunc(this.inputDataSource.next());
    };
    MappedStreamDataSource.prototype.reset = function () {
        this.inputDataSource.reset();
    };
    return MappedStreamDataSource;
}());
exports.MappedStreamDataSource = MappedStreamDataSource;
/**
 * Same for flatmap to deal with element -> stream mappings
 */
var FlatMapStreamDataSource = /** @class */ (function () {
    function FlatMapStreamDataSource(func, parent) {
        this.mapFunc = func;
        this.inputDataSource = parent;
    }
    FlatMapStreamDataSource.prototype.hasNext = function () {
        return this.resolveCurrentNext() || this.resolveNextNext();
    };
    FlatMapStreamDataSource.prototype.resolveCurrentNext = function () {
        var next = false;
        if (this.activeDataSource) {
            next = this.activeDataSource.hasNext();
        }
        return next;
    };
    FlatMapStreamDataSource.prototype.resolveNextNext = function () {
        var next = false;
        while (!next && this.inputDataSource.hasNext()) {
            var mapped = this.mapFunc(this.inputDataSource.next());
            if (Array.isArray(mapped)) {
                this.activeDataSource = new (ArrayStreamDataSource.bind.apply(ArrayStreamDataSource, __spreadArray([void 0], __read(mapped), false)))();
            }
            else {
                this.activeDataSource = mapped;
            }
            next = this.activeDataSource.hasNext();
        }
        return next;
    };
    FlatMapStreamDataSource.prototype.next = function () {
        return this.activeDataSource.next();
    };
    FlatMapStreamDataSource.prototype.reset = function () {
        this.inputDataSource.reset();
    };
    return FlatMapStreamDataSource;
}());
exports.FlatMapStreamDataSource = FlatMapStreamDataSource;
/**
 * For the time being we only need one collector
 * a collector which collects a stream back into arrays
 */
var ArrayCollector = /** @class */ (function () {
    function ArrayCollector() {
        this.data = [];
    }
    ArrayCollector.prototype.collect = function (element) {
        this.data.push(element);
    };
    Object.defineProperty(ArrayCollector.prototype, "finalValue", {
        get: function () {
            return this.data;
        },
        enumerable: false,
        configurable: true
    });
    return ArrayCollector;
}());
exports.ArrayCollector = ArrayCollector;
/**
 * collects an tuple array stream into an assoc array with elements being collected into arrays
 *
 */
var ArrayAssocArrayCollector = /** @class */ (function () {
    function ArrayAssocArrayCollector() {
        this.finalValue = {};
    }
    ArrayAssocArrayCollector.prototype.collect = function (element) {
        var _a, _b, _c, _d;
        var key = (_a = element === null || element === void 0 ? void 0 : element[0]) !== null && _a !== void 0 ? _a : element;
        this.finalValue[key] = (_c = (_b = this.finalValue) === null || _b === void 0 ? void 0 : _b[key]) !== null && _c !== void 0 ? _c : [];
        this.finalValue[key].push((_d = element === null || element === void 0 ? void 0 : element[1]) !== null && _d !== void 0 ? _d : true);
    };
    return ArrayAssocArrayCollector;
}());
exports.ArrayAssocArrayCollector = ArrayAssocArrayCollector;
/**
 * dummy collector which just triggers a run
 * on lazy streams without collecting anything
 */
var Run = /** @class */ (function () {
    function Run() {
    }
    Run.prototype.collect = function (element) {
    };
    Object.defineProperty(Run.prototype, "finalValue", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    return Run;
}());
exports.Run = Run;
/**
 * collects an assoc stream back to an assoc array
 */
var AssocArrayCollector = /** @class */ (function () {
    function AssocArrayCollector() {
        this.finalValue = {};
    }
    AssocArrayCollector.prototype.collect = function (element) {
        var _a, _b;
        this.finalValue[(_a = element[0]) !== null && _a !== void 0 ? _a : element] = (_b = element[1]) !== null && _b !== void 0 ? _b : true;
    };
    return AssocArrayCollector;
}());
exports.AssocArrayCollector = AssocArrayCollector;
/**
 * Form data collector for key value pair streams
 */
var FormDataCollector = /** @class */ (function () {
    function FormDataCollector() {
        this.finalValue = new FormData();
    }
    FormDataCollector.prototype.collect = function (element) {
        this.finalValue.append(element.key, element.value);
    };
    return FormDataCollector;
}());
exports.FormDataCollector = FormDataCollector;
/**
 * Form data collector for DomQuery streams
 */
var QueryFormDataCollector = /** @class */ (function () {
    function QueryFormDataCollector() {
        this.finalValue = new FormData();
    }
    QueryFormDataCollector.prototype.collect = function (element) {
        var toMerge = element.encodeFormElement();
        if (toMerge.isPresent()) {
            this.finalValue.append(element.name.value, toMerge.get(element.name).value);
        }
    };
    return QueryFormDataCollector;
}());
exports.QueryFormDataCollector = QueryFormDataCollector;
/**
 * Encoded String collector from dom query streams
 */
var QueryFormStringCollector = /** @class */ (function () {
    function QueryFormStringCollector() {
        this.formData = [];
    }
    QueryFormStringCollector.prototype.collect = function (element) {
        var toMerge = element.encodeFormElement();
        if (toMerge.isPresent()) {
            this.formData.push([element.name.value, toMerge.get(element.name).value]);
        }
    };
    Object.defineProperty(QueryFormStringCollector.prototype, "finalValue", {
        get: function () {
            return Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(this.formData), false)).map(function (keyVal) { return keyVal.join("="); })
                .reduce(function (item1, item2) { return [item1, item2].join("&"); })
                .orElse("").value;
        },
        enumerable: false,
        configurable: true
    });
    return QueryFormStringCollector;
}());
exports.QueryFormStringCollector = QueryFormStringCollector;
//# sourceMappingURL=SourcesCollectors.js.map