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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Probe1Impl = exports.Probe2Impl = void 0;
var ArrType = /** @class */ (function () {
    function ArrType(clazz) {
        this.clazz = clazz;
    }
    return ArrType;
}());
var DtoUils = /** @class */ (function () {
    function DtoUils() {
    }
    DtoUils.mapIt = function (target, src, mappings) {
        for (var key in src) {
            if (!src.hasOwnProperty(key)) {
                continue;
            }
            var newVal = src[key];
            if (mappings[key] &&
                mappings[key] instanceof ArrType) {
                //do the array here
                target[key] = {};
                for (var key2 in newVal) {
                    var subTarget = new mappings[key].clazz(newVal[key2]);
                    //   subTarget = this.mapIt(subTarget, <any> newVal[key2]);
                    target[key][key2] = subTarget;
                }
            }
            else if (mappings && mappings[key]) {
                var subTarget = new mappings[key](newVal);
                target[key] = subTarget;
            }
            else {
                target[key] = newVal;
            }
        }
        return target;
    };
    return DtoUils;
}());
var BaseDto = /** @class */ (function () {
    function BaseDto(data, dtoTypes) {
        if (dtoTypes === void 0) { dtoTypes = {}; }
        this.TYPES = "___mappable_types___";
        this[this.TYPES] = dtoTypes;
        if (data) {
            this.mapIt(this, data);
        }
    }
    BaseDto.prototype.mapIt = function (target, src) {
        for (var key in src) {
            if (!src.hasOwnProperty(key)) {
                continue;
            }
            var newVal = src[key];
            if (target[this.TYPES] &&
                target[this.TYPES][key] &&
                target[this.TYPES][key] instanceof ArrType) {
                //do the array here
                target[key] = {};
                for (var key2 in newVal) {
                    var subTarget = new target[this.TYPES][key].clazz(newVal[key2]);
                    //   subTarget = this.mapIt(subTarget, <any> newVal[key2]);
                    target[key][key2] = subTarget;
                }
            }
            else if (target[this.TYPES] && target[this.TYPES][key]) {
                var subTarget = new target[this.TYPES][key](newVal);
                target[key] = subTarget;
            }
            else {
                target[key] = newVal;
            }
        }
        return target;
    };
    return BaseDto;
}());
var Probe2Impl = /** @class */ (function () {
    function Probe2Impl(data) {
        this.val1 = data.val1;
    }
    return Probe2Impl;
}());
exports.Probe2Impl = Probe2Impl;
function mixMaps(target, src) {
    for (var key in src) {
        target[key] = src[key];
    }
    return target;
}
var Probe1Impl = /** @class */ (function () {
    function Probe1Impl(data, mixin /*put your own arguments in here*/) {
        if (mixin === void 0) { mixin = {}; }
        DtoUils.mapIt(this, data, mixMaps({
            val3: new ArrType(Probe2Impl),
            val4: new ArrType(Probe2Impl),
            val5: Probe2Impl
        }, mixin));
    }
    return Probe1Impl;
}());
exports.Probe1Impl = Probe1Impl;
//# sourceMappingURL=MappingProbes.js.map