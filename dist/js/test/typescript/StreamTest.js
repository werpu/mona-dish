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
var mocha_1 = require("mocha");
var Stream_1 = require("../../main/typescript/Stream");
var chai_1 = require("chai");
var typescript_1 = require("../../main/typescript");
var rxjs_1 = require("rxjs");
(0, mocha_1.describe)('early stream tests', function () {
    beforeEach(function () {
        this.probe = [1, 2, 3, 4, 5];
    });
    it("must iterate normal", function () {
        var stream = Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(this.probe), false));
        var sum = 0;
        stream.each(function (data) {
            sum = sum + data;
        });
        (0, chai_1.expect)(sum).to.eq(15);
        var stream2 = Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(this.probe), false));
        sum = 0;
        stream2.each(function (data) {
            sum = sum + data;
        });
        (0, chai_1.expect)(sum).to.eq(15);
    });
    it("must iterate filtered", function () {
        var stream = Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(this.probe), false));
        var sum = 0;
        stream.filter(function (data) { return data != 5; }).each(function (data) {
            sum = sum + data;
        });
        (0, chai_1.expect)(sum).to.eq(10);
        var stream2 = Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(this.probe), false));
        sum = 0;
        stream2.filter(function (data) { return data != 5; }).each(function (data) {
            sum = sum + data;
        });
        (0, chai_1.expect)(sum).to.eq(10);
    });
    it("must onElem", function () {
        var stream = Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(this.probe), false));
        var sum = 0;
        var sum2 = stream.filter(function (data) { return data != 5; }).onElem(function (data) {
            sum = sum + data;
        }).reduce(function (el1, el2) { return el1 + el2; }).value;
        (0, chai_1.expect)(sum).to.eq(10);
        (0, chai_1.expect)(sum2).to.eq(10);
        var stream2 = Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(this.probe), false));
        sum = 0;
        sum2 = stream2.filter(function (data) { return data != 5; }).onElem(function (data) {
            sum = sum + data;
        }).reduce(function (el1, el2) { return el1 + el2; }).value;
        (0, chai_1.expect)(sum).to.eq(10);
        (0, chai_1.expect)(sum2).to.eq(10);
    });
    it("must have a correct first last", function () {
        var stream = Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(this.probe), false));
        var first = Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(this.probe), false)).filter(function (data) { return data != 5; }).onElem(function (data) {
        }).first().value;
        var last = Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(this.probe), false)).filter(function (data) { return data != 5; }).onElem(function (data) {
        }).last().value;
        (0, chai_1.expect)(first).to.eq(1);
        (0, chai_1.expect)(last).to.eq(4);
    });
    it("must have a correct first last lazy", function () {
        var stream = Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(this.probe), false));
        var first = Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(this.probe), false)).filter(function (data) { return data != 5; }).onElem(function (data) {
            data;
        }).first().value;
        var last = Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(this.probe), false)).filter(function (data) { return data != 5; }).onElem(function (data) {
            data;
        }).last().value;
        (0, chai_1.expect)(first).to.eq(1);
        (0, chai_1.expect)(last).to.eq(4);
    });
    it("must have a correct limits", function () {
        var cnt = 0;
        var last = Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(this.probe), false)).filter(function (data) { return data != 5; }).limits(2).onElem(function (data) {
            cnt++;
        }).last().value;
        (0, chai_1.expect)(last).to.eq(2);
        (0, chai_1.expect)(cnt).to.eq(2);
    });
    it("must initialize correctly from assoc array", function () {
        var probe = {
            key1: "val1",
            key2: 2,
            key3: "val3"
        };
        var arr1 = [];
        var arr2 = [];
        Stream_1.Stream.ofAssoc(probe).each(function (item) {
            (0, chai_1.expect)(item.length).to.eq(2);
            arr1.push(item[0]);
            arr2.push(item[1]);
        });
        (0, chai_1.expect)(arr1.join(",")).to.eq("key1,key2,key3");
        (0, chai_1.expect)(arr2.join(",")).to.eq("val1,2,val3");
    });
    it("must have a correct lazy limits", function () {
        var last = Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(this.probe), false)).filter(function (data) { return data != 5; }).limits(2).onElem(function (data) {
            data;
        }).last().value;
        (0, chai_1.expect)(last).to.eq(2);
    });
    it("must correctly lazily flatmap", function () {
        var resultingArr = Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(this.probe), false)).flatMap(function (data) { return Stream_1.LazyStream.of.apply(Stream_1.LazyStream, [data, 2]); }).value;
        (0, chai_1.expect)(resultingArr.length == 10).to.be.true;
        (0, chai_1.expect)(resultingArr.join(",")).to.eq("1,2,2,2,3,2,4,2,5,2");
    });
    it("must correctly lazily flatmap with arrays", function () {
        var resultingArr = Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(this.probe), false)).flatMap(function (data) { return [data, 2]; }).value;
        (0, chai_1.expect)(resultingArr.length == 10).to.be.true;
        (0, chai_1.expect)(resultingArr.join(",")).to.eq("1,2,2,2,3,2,4,2,5,2");
    });
    it("must correctly early flatmap", function () {
        var resultingArr = Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(this.probe), false)).flatMap(function (data) { return Stream_1.Stream.of.apply(Stream_1.Stream, [data, 2]); }).value;
        (0, chai_1.expect)(resultingArr.length == 10).to.be.true;
        (0, chai_1.expect)(resultingArr.join(",")).to.eq("1,2,2,2,3,2,4,2,5,2");
    });
    it("must correctly early flatmap with arrays", function () {
        var resultingArr = Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(this.probe), false)).flatMap(function (data) { return [data, 2]; }).value;
        (0, chai_1.expect)(resultingArr.length == 10).to.be.true;
        (0, chai_1.expect)(resultingArr.join(",")).to.eq("1,2,2,2,3,2,4,2,5,2");
    });
    it("must correctly flatmap intermixed", function () {
        var resultingArr = Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(this.probe), false)).flatMap(function (data) { return Stream_1.Stream.of.apply(Stream_1.Stream, [data, 2]); }).value;
        (0, chai_1.expect)(resultingArr.length == 10).to.be.true;
        (0, chai_1.expect)(resultingArr.join(",")).to.eq("1,2,2,2,3,2,4,2,5,2");
    });
    it("must correctly flatmap intermixed2", function () {
        var resultingArr = Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(this.probe), false)).flatMap(function (data) { return Stream_1.LazyStream.of.apply(Stream_1.LazyStream, [data, 2]); }).value;
        (0, chai_1.expect)(resultingArr.length == 10).to.be.true;
        (0, chai_1.expect)(resultingArr.join(",")).to.eq("1,2,2,2,3,2,4,2,5,2");
    });
    it("must correctly pass anyMatch allMatch noneMatch", function () {
        var anyMatch = Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(this.probe), false)).anyMatch(function (item) { return item == 3; });
        var allMatch = Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(this.probe), false)).allMatch(function (item) { return item < 6; });
        var noneMatch = Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(this.probe), false)).noneMatch(function (item) { return item > 5; });
        (0, chai_1.expect)(anyMatch).to.be.true;
        (0, chai_1.expect)(allMatch).to.be.true;
        (0, chai_1.expect)(noneMatch).to.be.true;
    });
    it("must correctly pass anyMatch allMatch noneMatch early", function () {
        var anyMatch = Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(this.probe), false)).anyMatch(function (item) { return item == 3; });
        var allMatch = Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(this.probe), false)).allMatch(function (item) { return item < 6; });
        var noneMatch = Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(this.probe), false)).noneMatch(function (item) { return item > 5; });
        (0, chai_1.expect)(anyMatch).to.be.true;
        (0, chai_1.expect)(allMatch).to.be.true;
        (0, chai_1.expect)(noneMatch).to.be.true;
    });
    it("must sort correctly", function () {
        var probe = [1, 5, 3, 2, 4];
        var res = Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(probe), false)).sort(function (el1, el2) { return el1 - el2; })
            .collect(new typescript_1.ArrayCollector());
        (0, chai_1.expect)(res.join(",")).to.eq("1,2,3,4,5");
    });
    it("must sort correctly lazy", function () {
        var probe = [1, 5, 3, 2, 4];
        var res = Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(probe), false)).sort(function (el1, el2) { return el1 - el2; })
            .collect(new typescript_1.ArrayCollector());
        (0, chai_1.expect)(res.join(",")).to.eq("1,2,3,4,5");
    });
    it("must handle a sequence of numbers correctly", function () {
        var datasource = new typescript_1.SequenceDataSource(0, 10);
        var res = Stream_1.LazyStream.ofStreamDataSource(datasource)
            .collect(new typescript_1.ArrayCollector());
        (0, chai_1.expect)(res.length == 10).to.be.true;
        (0, chai_1.expect)(res[0] == 0).to.be.true;
        (0, chai_1.expect)(res[9] == 9).to.be.true;
        (0, chai_1.expect)(res[4] == 4).to.be.true;
    });
    it("must handle a reduced sequence of numbers correctly", function () {
        var datasource = new typescript_1.SequenceDataSource(1, 10);
        var res = Stream_1.LazyStream.ofStreamDataSource(datasource)
            .collect(new typescript_1.ArrayCollector());
        (0, chai_1.expect)(res.length == 9).to.be.true;
        (0, chai_1.expect)(res[0] == 1).to.be.true;
        (0, chai_1.expect)(res[8] == 9).to.be.true;
        (0, chai_1.expect)(res[4] == 5).to.be.true;
    });
    it("must concat correctly", function () {
        var probe = [1, 2, 3, 4, 5];
        var probe2 = [6, 7, 8, 9, 10];
        var probe3 = [11, 12, 13, 14, 15];
        var stream1 = Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(probe), false));
        var stream2 = Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(probe2), false));
        var stream3 = Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(probe3), false));
        var finalStream = stream1.concat(stream2, stream3);
        (0, chai_1.expect)(finalStream.collect(new typescript_1.ArrayCollector()).length).to.eq(15);
        (0, chai_1.expect)(finalStream.collect(new typescript_1.ArrayCollector())[0]).to.eq(1);
        (0, chai_1.expect)(finalStream.collect(new typescript_1.ArrayCollector())[14]).to.eq(15);
        (0, chai_1.expect)(finalStream.collect(new typescript_1.ArrayCollector())[7]).to.eq(8);
    });
    it("must concat correctly lazily", function () {
        var probe = [1, 2, 3, 4, 5];
        var probe2 = [6, 7, 8, 9, 10];
        var probe3 = [11, 12, 13, 14, 15];
        var stream1 = Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(probe), false));
        var stream2 = Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(probe2), false));
        var stream3 = Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(probe3), false));
        var finalStream = stream1.concat(stream2, stream3);
        var retArr = finalStream.collect(new typescript_1.ArrayCollector());
        (0, chai_1.expect)(retArr.length).to.eq(15);
        (0, chai_1.expect)(retArr[0]).to.eq(1);
        (0, chai_1.expect)(retArr[14]).to.eq(15);
        (0, chai_1.expect)(retArr[7]).to.eq(8);
    });
    it("must work with rxjs and early streams", function () {
        var probe = [1, 2, 3, 4, 5];
        var probe2 = [6, 7, 8, 9, 10];
        var stream1 = Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(probe), false)).filter(function (item) {
            return item != 2;
        });
        var stream2 = Stream_1.Stream.of.apply(Stream_1.Stream, __spreadArray([], __read(probe2), false));
        var o1 = (0, rxjs_1.from)(stream1);
        var o2 = (0, rxjs_1.from)(stream2);
        var cnt1 = 0;
        var val1 = 0;
        o1.subscribe(function (value) {
            cnt1++;
            val1 = value;
        });
        //one item filtered
        (0, chai_1.expect)(cnt1 == probe.length - 1).to.be.true;
        (0, chai_1.expect)(val1).to.eq(5);
        var cnt2 = 0;
        var val2 = 0;
        o2.subscribe(function (value) {
            cnt2++;
            val2 = value;
        });
        (0, chai_1.expect)(cnt2 == probe2.length).to.be.true;
        (0, chai_1.expect)(val2).to.eq(10);
    });
    it("must work with rxjs and Lazy Streams", function () {
        var probe = [1, 2, 3, 4, 5];
        var probe2 = [6, 7, 8, 9, 10];
        var stream1 = Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(probe), false)).filter(function (item) {
            return item != 2;
        });
        ;
        var stream2 = Stream_1.LazyStream.of.apply(Stream_1.LazyStream, __spreadArray([], __read(probe2), false));
        var o1 = (0, rxjs_1.from)(stream1);
        var o2 = (0, rxjs_1.from)(stream2);
        var cnt1 = 0;
        var val1 = 0;
        o1.subscribe(function (value) {
            cnt1++;
            val1 = value;
        });
        (0, chai_1.expect)(cnt1 == probe.length - 1).to.be.true;
        (0, chai_1.expect)(val1).to.eq(5);
        var cnt2 = 0;
        var val2 = 0;
        o2.subscribe(function (value) {
            cnt2++;
            val2 = value;
        });
        (0, chai_1.expect)(cnt2 == probe.length).to.be.true;
        (0, chai_1.expect)(val2).to.eq(10);
    });
});
//# sourceMappingURL=StreamTest.js.map