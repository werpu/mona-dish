"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var mocha_1 = require("mocha");
var chai_1 = require("chai");
var ExtendedArray_1 = require("../../main/typescript/ExtendedArray");
(0, mocha_1.describe)('Extended tests', function () {
    var arr;
    beforeEach(function () {
    });
    it("must handle flatmap correctly", function () {
        arr = new ExtendedArray_1.ExtendedArray("10", "20", "30", ["40", "50"], "60");
        var retArr = arr.flatMap((function (item) { return item; }), true);
        (0, chai_1.expect)(retArr.length).to.eq(6);
    });
    it("must handle deeply nested items correctly", function () {
        arr = new ExtendedArray_1.ExtendedArray("10", "20", "30", ["40", "50", ["55", "56"]], "60");
        var retArr = arr.flatMap((function (item) { return item; }), true).flatMap(function (item) { return item; });
        //second nesting level cannot be flatmapped, flatmap only works on one level usually
        //TODO this needs further investigation
        (0, chai_1.expect)(retArr.length).to.eq(8);
    });
    it("must keep the order", function () {
        arr = new ExtendedArray_1.ExtendedArray("10", "20", "30", ["40", "50", ["55", "56"]], "60");
        var retArr = arr.flatMap((function (item) { return item; }), true).flatMap((function (item) { return item; }), true);
        (0, chai_1.expect)(retArr.length).to.eq(8);
        var result = new ExtendedArray_1.ExtendedArray("10", "20", "30", "40", "50", ["55", "56"], "60").flatMap(function (item) { return item; });
        retArr.forEach(function (item, pos) {
            (0, chai_1.expect)(item).to.eq(result[pos]);
        });
    });
});
//# sourceMappingURL=ExtendedArrayTest.spec.js.map