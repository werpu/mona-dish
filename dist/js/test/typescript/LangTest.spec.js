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
exports.window = void 0;
var chai_1 = require("chai");
var mocha_1 = require("mocha");
var Lang_1 = require("../../main/typescript/Lang");
var equalsIgnoreCase = Lang_1.Lang.equalsIgnoreCase;
var assertType = Lang_1.Lang.assertType;
var isFunc = Lang_1.Lang.isFunc;
var isString = Lang_1.Lang.isString;
var trim = Lang_1.Lang.trim;
var strToArray = Lang_1.Lang.strToArray;
var objToArray = Lang_1.Lang.objToArray;
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
var dom = new JSDOM("\n    <!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Title</title>\n    </head>\n    <body>\n        <div />\n        <div />\n        <div />\n        <div />\n    </body>\n    </html>\n    \n    ");
exports.window = dom.window;
var Probe = /** @class */ (function () {
    function Probe() {
        this.val1 = 1;
        this.val2 = 2;
        this.val3 = 3;
    }
    return Probe;
}());
(0, mocha_1.describe)('Lang tests', function () {
    (0, mocha_1.it)('initializable', function () {
        var lang = Lang_1.Lang;
        (0, chai_1.expect)(lang).to.exist;
    });
    (0, mocha_1.it)('strToArray working', function () {
        var lang = Lang_1.Lang;
        var arr = strToArray("hello.world.from.me", /\./gi);
        (0, chai_1.expect)(arr).to.exist;
        (0, chai_1.expect)(arr.length).to.eq(4);
        (0, chai_1.expect)(arr[3]).to.eq("me");
    });
    (0, mocha_1.it)('trim working', function () {
        var lang = Lang_1.Lang;
        var origStr = " hello world from me    ";
        var trimmed = trim(origStr);
        (0, chai_1.expect)(trimmed).to.exist;
        (0, chai_1.expect)(trimmed).to.eq("hello world from me");
    });
    (0, mocha_1.it)('isString working', function () {
        var lang = Lang_1.Lang;
        (0, chai_1.expect)(isString(" ")).to.be.true;
        (0, chai_1.expect)(isString('')).to.be.true;
        (0, chai_1.expect)(isString(null)).to.be.false;
        (0, chai_1.expect)(isString(undefined)).to.be.false;
        (0, chai_1.expect)(isString(function () { return true; })).to.be.false;
        (0, chai_1.expect)(isString(new Probe())).to.be.false;
    });
    (0, mocha_1.it)('isFunc working', function () {
        var lang = Lang_1.Lang;
        (0, chai_1.expect)(isFunc(function () { })).to.be.true;
        (0, chai_1.expect)(isFunc(function () { return true; })).to.be.true;
        (0, chai_1.expect)(isFunc("blarg")).to.be.false;
        (0, chai_1.expect)(isFunc(new Probe())).to.be.false;
    });
    (0, mocha_1.it)('objToArray working', function () {
        var lang = Lang_1.Lang;
        var obj_probe = new Probe();
        var resultArr = objToArray(obj_probe);
        (0, chai_1.expect)(assertType(resultArr, Array)).to.be.true;
        (0, chai_1.expect)(resultArr.length).to.eq(0);
        obj_probe = exports.window.document.body.querySelectorAll("div");
        resultArr = objToArray(obj_probe);
        (0, chai_1.expect)(resultArr.length).to.eq(4);
        (0, chai_1.expect)(assertType(resultArr, Array)).to.be.true;
    });
    (0, mocha_1.it)('equals ignore case test', function () {
        var lang = Lang_1.Lang;
        (0, chai_1.expect)(equalsIgnoreCase(null, null)).to.be.true;
        (0, chai_1.expect)(equalsIgnoreCase("", "")).to.be.true;
        (0, chai_1.expect)(equalsIgnoreCase("null", "NuLL")).to.be.true;
        (0, chai_1.expect)(equalsIgnoreCase("null ", "NuLL")).to.be.false;
        (0, chai_1.expect)(equalsIgnoreCase("null", "NuLL2")).to.be.false;
    });
});
//# sourceMappingURL=LangTest.spec.js.map