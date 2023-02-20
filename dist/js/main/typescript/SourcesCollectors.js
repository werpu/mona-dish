"use strict";
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
exports.ArrayCollector = exports.QueryFormStringCollector = exports.QueryFormDataCollector = exports.FormDataCollector = exports.ConfigCollector = exports.AssocArrayCollector = exports.Run = exports.ArrayAssocArrayCollector = exports.InverseArrayCollector = exports.ShimArrayCollector = exports.MappedStreamDataSource = exports.FilteredStreamDatasource = exports.ArrayStreamDataSource = exports.SequenceDataSource = exports.MultiStreamDatasource = exports.calculateSkips = exports.ITERATION_STATUS = void 0;
var Monad_1 = require("./Monad");
var Es2019Array_1 = require("./Es2019Array");
/**
 * special status of the datasource location pointer
 * if an access, outside - of the possible data boundaries is happening
 * (example for instance current without a first next call, or next
 * which goes over the last possible dataset), an iteration status return
 * value is returned marking this boundary instead of a classical element
 *
 * Note this is only internally used but must be implemented to fulfill
 * internal contracts, the end user will never see those values if he uses
 * streams!
 */
var ITERATION_STATUS;
(function (ITERATION_STATUS) {
    ITERATION_STATUS["EO_STRM"] = "__EO_STRM__";
    ITERATION_STATUS["BEF_STRM"] = "___BEF_STRM__";
})(ITERATION_STATUS = exports.ITERATION_STATUS || (exports.ITERATION_STATUS = {}));
function calculateSkips(next_strm) {
    var pos = 1;
    while (next_strm.lookAhead(pos) != ITERATION_STATUS.EO_STRM) {
        pos++;
    }
    return --pos;
}
exports.calculateSkips = calculateSkips;
/**
 * A data source which combines multiple streams sequentially into one
 * (this is used internally by  flatmap, but also can be used externally)
 */
var MultiStreamDatasource = /** @class */ (function () {
    function MultiStreamDatasource(first) {
        var _a;
        var strms = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            strms[_i - 1] = arguments[_i];
        }
        this.first = first;
        this.selectedPos = 0;
        this.strms = (_a = [first]).concat.apply(_a, __spreadArray([], __read(strms), false));
        this.activeStrm = this.strms[this.selectedPos];
    }
    MultiStreamDatasource.prototype.current = function () {
        return this.activeStrm.current();
    };
    MultiStreamDatasource.prototype.hasNext = function () {
        if (this.activeStrm.hasNext()) {
            return true;
        }
        if (this.selectedPos >= this.strms.length) {
            return false;
        }
        return this.findNextStrm() != -1;
    };
    MultiStreamDatasource.prototype.findNextStrm = function () {
        var hasNext = false;
        var cnt = this.selectedPos;
        while (!hasNext && cnt < this.strms.length) {
            hasNext = this.strms[cnt].hasNext();
            if (!hasNext) {
                cnt++;
            }
        }
        return hasNext ? cnt : -1;
    };
    MultiStreamDatasource.prototype.lookAhead = function (cnt) {
        if (cnt === void 0) { cnt = 1; }
        //lets clone
        var strms = this.strms.slice(this.selectedPos);
        if (!strms.length) {
            return ITERATION_STATUS.EO_STRM;
        }
        var all_strms = __spreadArray([], __read(strms), false);
        while (all_strms.length) {
            var next_strm = all_strms.shift();
            var lookAhead = next_strm.lookAhead(cnt);
            if (lookAhead != ITERATION_STATUS.EO_STRM) {
                return lookAhead;
            }
            cnt = cnt - calculateSkips(next_strm);
        }
        return ITERATION_STATUS.EO_STRM;
    };
    MultiStreamDatasource.prototype.next = function () {
        if (this.activeStrm.hasNext()) {
            return this.activeStrm.next();
        }
        this.selectedPos = this.findNextStrm();
        if (this.selectedPos == -1) {
            return ITERATION_STATUS.EO_STRM;
        }
        this.activeStrm = this.strms[this.selectedPos];
        return this.activeStrm.next();
    };
    MultiStreamDatasource.prototype.reset = function () {
        this.activeStrm = this.strms[0];
        this.selectedPos = 0;
        for (var cnt = 0; cnt < this.strms.length; cnt++) {
            this.strms[cnt].reset();
        }
    };
    return MultiStreamDatasource;
}());
exports.MultiStreamDatasource = MultiStreamDatasource;
/**
 * defines a sequence of numbers for our stream input
 */
var SequenceDataSource = /** @class */ (function () {
    function SequenceDataSource(start, total) {
        this.total = total;
        this.start = start;
        this.value = start - 1;
    }
    SequenceDataSource.prototype.hasNext = function () {
        return this.value < (this.total - 1);
    };
    SequenceDataSource.prototype.next = function () {
        this.value++;
        return this.value <= (this.total - 1) ? this.value : ITERATION_STATUS.EO_STRM;
    };
    SequenceDataSource.prototype.lookAhead = function (cnt) {
        if (cnt === void 0) { cnt = 1; }
        if ((this.value + cnt) > this.total - 1) {
            return ITERATION_STATUS.EO_STRM;
        }
        else {
            return this.value + cnt;
        }
    };
    SequenceDataSource.prototype.reset = function () {
        this.value = this.start - 1;
    };
    SequenceDataSource.prototype.current = function () {
        //first condition current without initial call for next
        return (this.start - 1) ? ITERATION_STATUS.BEF_STRM : this.value;
    };
    return SequenceDataSource;
}());
exports.SequenceDataSource = SequenceDataSource;
/**
 * implementation of a datasource on top of a standard array
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
    ArrayStreamDataSource.prototype.lookAhead = function (cnt) {
        if (cnt === void 0) { cnt = 1; }
        if ((this.dataPos + cnt) > this.value.length - 1) {
            return ITERATION_STATUS.EO_STRM;
        }
        return this.value[this.dataPos + cnt];
    };
    ArrayStreamDataSource.prototype.hasNext = function () {
        return this.value.length - 1 > this.dataPos;
    };
    ArrayStreamDataSource.prototype.next = function () {
        var _a;
        this.dataPos++;
        return (_a = this === null || this === void 0 ? void 0 : this.value[this.dataPos]) !== null && _a !== void 0 ? _a : ITERATION_STATUS.EO_STRM;
    };
    ArrayStreamDataSource.prototype.reset = function () {
        this.dataPos = -1;
    };
    ArrayStreamDataSource.prototype.current = function () {
        return this.value[Math.max(0, this.dataPos)];
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
        this._current = ITERATION_STATUS.BEF_STRM;
        // we have to add a filter idx because the external filter values might change over time, so
        // we cannot reset the state properly unless we do it from a snapshot
        this._filterIdx = {};
        this._unfilteredPos = 0;
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
        var steps = 1;
        var found = false;
        var next;
        while (!found && (next = this.inputDataSource.lookAhead(steps)) != ITERATION_STATUS.EO_STRM) {
            if (this.filterFunc(next)) {
                this._filterIdx[this._unfilteredPos + steps] = true;
                found = true;
            }
            else {
                steps++;
            }
        }
        return found;
    };
    /**
     * serve the next element
     */
    FilteredStreamDatasource.prototype.next = function () {
        var _a, _b;
        var found = ITERATION_STATUS.EO_STRM;
        while (this.inputDataSource.hasNext()) {
            this._unfilteredPos++;
            var next = this.inputDataSource.next();
            //again here we cannot call the filter function twice, because its state might change, so if indexed, we have a decent snapshot, either has next or next can trigger
            //the snapshot
            if (next != ITERATION_STATUS.EO_STRM &&
                (((_b = (_a = this._filterIdx) === null || _a === void 0 ? void 0 : _a[this._unfilteredPos]) !== null && _b !== void 0 ? _b : false) || this.filterFunc(next))) {
                this._filterIdx[this._unfilteredPos] = true;
                found = next;
                break;
            }
        }
        this._current = found;
        return found;
    };
    /**
     * looks ahead cnt without changing the internal data "pointers" of the data source
     * (this is mostly needed by LazyStreams, because they do not know by definition their
     * boundaries)
     *
     * @param cnt the elements to look ahead
     * @return either the element or ITERATION_STATUS.EO_STRM if we hit the end of the stream before
     * finding the "cnt" element
     */
    FilteredStreamDatasource.prototype.lookAhead = function (cnt) {
        var _a;
        if (cnt === void 0) { cnt = 1; }
        var lookupVal;
        for (var loop = 1; cnt > 0 && (lookupVal = this.inputDataSource.lookAhead(loop)) != ITERATION_STATUS.EO_STRM; loop++) {
            var inCache = (_a = this._filterIdx) === null || _a === void 0 ? void 0 : _a[this._unfilteredPos + loop];
            if (inCache || this.filterFunc(lookupVal)) {
                cnt--;
                this._filterIdx[this._unfilteredPos + loop] = true;
            }
        }
        return lookupVal;
    };
    FilteredStreamDatasource.prototype.current = function () {
        return this._current;
    };
    FilteredStreamDatasource.prototype.reset = function () {
        this._current = ITERATION_STATUS.BEF_STRM;
        this._filterIdx = {};
        this._unfilteredPos = 0;
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
    MappedStreamDataSource.prototype.current = function () {
        return this.mapFunc(this.inputDataSource.current());
    };
    MappedStreamDataSource.prototype.lookAhead = function (cnt) {
        if (cnt === void 0) { cnt = 1; }
        var lookAheadVal = this.inputDataSource.lookAhead(cnt);
        return (lookAheadVal == ITERATION_STATUS.EO_STRM) ? lookAheadVal : this.mapFunc(lookAheadVal);
    };
    return MappedStreamDataSource;
}());
exports.MappedStreamDataSource = MappedStreamDataSource;
/**
 * For the time being we only need one collector
 * a collector which collects a stream back into arrays
 */
var ShimArrayCollector = /** @class */ (function () {
    function ShimArrayCollector() {
        this.data = new (Es2019Array_1.Es2019Array.bind.apply(Es2019Array_1.Es2019Array, __spreadArray([void 0], [], false)))();
    }
    ShimArrayCollector.prototype.collect = function (element) {
        this.data.push(element);
    };
    Object.defineProperty(ShimArrayCollector.prototype, "finalValue", {
        get: function () {
            return this.data;
        },
        enumerable: false,
        configurable: true
    });
    return ShimArrayCollector;
}());
exports.ShimArrayCollector = ShimArrayCollector;
/**
 * collects the values as inverse array
 */
var InverseArrayCollector = /** @class */ (function () {
    function InverseArrayCollector() {
        this.data = [];
    }
    InverseArrayCollector.prototype.collect = function (element) {
        this.data.unshift(element);
    };
    Object.defineProperty(InverseArrayCollector.prototype, "finalValue", {
        get: function () {
            return this.data;
        },
        enumerable: false,
        configurable: true
    });
    return InverseArrayCollector;
}());
exports.InverseArrayCollector = InverseArrayCollector;
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
 * A Config collector similar to the FormDFata Collector
 */
var ConfigCollector = /** @class */ (function () {
    function ConfigCollector() {
        this.finalValue = new Monad_1.Config({});
    }
    ConfigCollector.prototype.collect = function (element) {
        this.finalValue.append(element.key).value = element.value;
    };
    return ConfigCollector;
}());
exports.ConfigCollector = ConfigCollector;
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
            return new (Es2019Array_1.Es2019Array.bind.apply(Es2019Array_1.Es2019Array, __spreadArray([void 0], __read(this.formData), false)))().map(function (keyVal) { return keyVal.join("="); })
                .reduce(function (item1, item2) { return [item1, item2].join("&"); });
        },
        enumerable: false,
        configurable: true
    });
    return QueryFormStringCollector;
}());
exports.QueryFormStringCollector = QueryFormStringCollector;
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
//# sourceMappingURL=SourcesCollectors.js.map