"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
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
var jasmineCo = require('jasmine-co');
var chai_1 = require("chai");
var mocha_1 = require("mocha");
var typescript_1 = require("../../main/typescript");
var typescript_2 = require("../../main/typescript");
var sinon = require("sinon");
var trim = typescript_2.Lang.trim;
var rxjs_1 = require("rxjs");
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
global.window = {};
(0, mocha_1.describe)('DOMQuery tests', function () {
    jasmineCo.install();
    beforeEach(function () {
        var _this = this;
        var dom = new JSDOM("\n            <!DOCTYPE html>\n        <html lang=\"en\">\n        <head>\n            <meta charset=\"UTF-8\">\n            <title>Title</title>\n            </head>\n            <body>\n                <div id=\"id_1\"></div>\n                <div id=\"id_2\"  booga=\"blarg\" class=\"blarg2\"></div>\n                <div id=\"id_3\" class=\"blarg1 blarg2\"></div>\n                <div id=\"id_4\"></div>\n            </body>\n            </html>\n    \n    ", {
            contentType: "text/html",
            runScripts: "dangerously"
        });
        var window = dom.window;
        global.dom = dom;
        global.window = window;
        global.body = window.document.body;
        global.document = window.document;
        global.navigator = {
            language: "en-En"
        };
        this.xhr = sinon.useFakeXMLHttpRequest();
        this.requests = [];
        this.xhr.onCreate = function (xhr) {
            _this.requests.push(xhr);
        };
        global.XMLHttpRequest = this.xhr;
        window.XMLHttpRequest = this.xhr;
    });
    this.afterEach(function () {
        global.XMLHttpRequest = window.XMLHttpRequest = this.xhr.restore();
    });
    (0, mocha_1.it)('basic init', function () {
        var probe1 = new typescript_1.DomQuery(window.document.body);
        var probe2 = typescript_1.DomQuery.querySelectorAll("div");
        var probe3 = new typescript_1.DomQuery(probe1, probe2);
        var probe4 = new typescript_1.DomQuery(window.document.body, probe3);
        (0, chai_1.expect)(probe1.length).to.be.eq(1);
        (0, chai_1.expect)(probe2.length == 4).to.be.true;
        (0, chai_1.expect)(probe3.length == 5).to.be.true;
        //still under discussion (we might index to avoid doubles)
        (0, chai_1.expect)(probe4.length == 6).to.be.true;
    });
    (0, mocha_1.it)('proper iterator api and rxjs mapping', function () {
        var probe1 = new typescript_1.DomQuery(window.document.body);
        var probe2 = typescript_1.DomQuery.querySelectorAll("div");
        var o1 = (0, rxjs_1.from)(probe1.stream);
        var o2 = (0, rxjs_1.from)(probe2.stream);
        var cnt1 = 0;
        var isDQuery = false;
        var cnt2 = 0;
        o1.subscribe(function (item) {
            cnt1++;
        });
        o2.subscribe(function (item) {
            cnt2++;
            isDQuery = (item.length == 1) && (item instanceof typescript_1.DomQuery);
        });
        (0, chai_1.expect)(probe1.length).to.be.eq(1);
        (0, chai_1.expect)(probe2.length == 4).to.be.true;
        (0, chai_1.expect)(isDQuery).to.be.true;
    });
    (0, mocha_1.it)('proper iterator api and rxjs mapping with observable', function () {
        var probe1 = new typescript_1.DomQuery(window.document.body);
        var probe2 = typescript_1.DomQuery.querySelectorAll("div");
        var o1 = (0, rxjs_1.from)(probe1.stream);
        var o2 = (0, rxjs_1.from)(probe2.stream);
        var cnt1 = 0;
        var isDQuery = false;
        var cnt2 = 0;
        o1.subscribe(function (item) {
            cnt1++;
        });
        o2.subscribe(function (item) {
            cnt2++;
            isDQuery = (item.length == 1) && (item instanceof typescript_1.DomQuery);
        });
        (0, chai_1.expect)(probe1.length).to.be.eq(1);
        (0, chai_1.expect)(probe2.length == 4).to.be.true;
        (0, chai_1.expect)(isDQuery).to.be.true;
    });
    (0, mocha_1.it)('domquery ops test filter', function () {
        var probe2 = typescript_1.DomQuery.querySelectorAll("div");
        probe2 = probe2.filter(function (item) { return item.id.match(function (id) { return id != "id_1"; }); });
        (0, chai_1.expect)(probe2.length == 3);
    });
    (0, mocha_1.it)('global eval test', function () {
        var probe2 = typescript_1.DomQuery.querySelectorAll("div");
        probe2 = probe2.filter(function (item) { return item.id.match(function (id) { return id != "id_1"; }); });
        (0, chai_1.expect)(probe2.length == 3);
    });
    (0, mocha_1.it)('must detach', function () {
        var probe2 = typescript_1.DomQuery.querySelectorAll("div#id_1");
        probe2.detach();
        (0, chai_1.expect)(typescript_1.DomQuery.querySelectorAll("div#id_1").isPresent()).to.be.false;
        probe2.appendTo(typescript_1.DomQuery.querySelectorAll("body"));
        (0, chai_1.expect)(typescript_1.DomQuery.querySelectorAll("div#id_1").isPresent()).to.be.true;
    });
    (0, mocha_1.it)('domquery ops test2 each', function () {
        var probe2 = typescript_1.DomQuery.querySelectorAll("div#id_1");
        typescript_1.DomQuery.globalEval("document.getElementById('id_1').innerHTML = 'hello'");
        (0, chai_1.expect)(probe2.html().value).to.eq("hello");
        typescript_1.DomQuery.globalEval("document.getElementById('id_1').innerHTML = 'hello2'", "nonci");
        (0, chai_1.expect)(probe2.html().value).to.eq("hello2");
    });
    (0, mocha_1.it)('domquery ops test2 eachNode', function () {
        var probe2 = typescript_1.DomQuery.querySelectorAll("div");
        var noIter = 0;
        probe2 = probe2.each(function (item, cnt) {
            (0, chai_1.expect)(item instanceof typescript_1.DomQuery).to.be.true;
            (0, chai_1.expect)(noIter == cnt).to.be.true;
            noIter++;
        });
        (0, chai_1.expect)(noIter == 4).to.be.true;
    });
    (0, mocha_1.it)('domquery ops test2 byId', function () {
        var probe2 = typescript_1.DomQuery.byId("id_1");
        (0, chai_1.expect)(probe2.length == 1).to.be.true;
        probe2 = typescript_1.DomQuery.byTagName("div");
        (0, chai_1.expect)(probe2.length == 4).to.be.true;
    });
    (0, mocha_1.it)('outerhtml and eval tests', function () {
        var probe1 = new typescript_1.DomQuery(window.document.body);
        probe1.querySelectorAll("#id_1").outerHTML("\n            <div id='barg'>\n            \n            </div>\n            <script type=\"text/javascript\">\n                document.getElementById('blarg').innerHTML = 'hello world';\n            </script>\n            ", true, true);
        (0, chai_1.expect)(window.document.body.innerHTML.indexOf("hello world") != -1).to.be.true;
        (0, chai_1.expect)(window.document.head.innerHTML.indexOf("hello world") == -1).to.be.true;
        (0, chai_1.expect)(window.document.body.innerHTML.indexOf("id_1") == -1).to.be.true;
        (0, chai_1.expect)(window.document.body.innerHTML.indexOf("blarg") != -1).to.be.true;
    });
    (0, mocha_1.it)('attrn test and eval tests', function () {
        var probe1 = new typescript_1.DomQuery(document);
        probe1.querySelectorAll("div#id_2").attr("style").value = "border=1;";
        var blarg = probe1.querySelectorAll("div#id_2").attr("booga").value;
        var style = probe1.querySelectorAll("div#id_2").attr("style").value;
        var nonexistent = probe1.querySelectorAll("div#id_2").attr("buhaha").value;
        (0, chai_1.expect)(blarg).to.be.eq("blarg");
        (0, chai_1.expect)(style).to.be.eq("border=1;");
        (0, chai_1.expect)(nonexistent).to.be.eq(null);
    });
    (0, mocha_1.it)('must perform addClass and hasClass correctly', function () {
        var probe1 = new typescript_1.DomQuery(document);
        var element = probe1.querySelectorAll("div#id_2");
        element.addClass("booga").addClass("Booga2");
        var classdef = element.attr("class").value;
        (0, chai_1.expect)(classdef).to.eq("blarg2 booga Booga2");
        element.removeClass("booga2");
        (0, chai_1.expect)(element.hasClass("booga2")).to.be.false;
        (0, chai_1.expect)(element.hasClass("booga")).to.be.true;
    });
    (0, mocha_1.it)('must perform addClass and hasClass correctly 2', function () {
        var probe1 = new typescript_1.DomQuery(document);
        var element = probe1.querySelectorAll(".blarg2");
        element.addClass("booga").addClass("Booga2");
        var classdef = element.attr("class").value;
        (0, chai_1.expect)(classdef).to.eq("blarg2 booga Booga2");
        element.removeClass("booga2");
        (0, chai_1.expect)(element.hasClass("booga2")).to.be.false;
        (0, chai_1.expect)(element.hasClass("booga")).to.be.true;
        (0, chai_1.expect)(element.hasClass("blarg2")).to.be.true;
    });
    (0, mocha_1.it)('must perform addClass and hasClass correctly 2', function () {
        var probe1 = new typescript_1.DomQuery(document);
        var element = probe1.querySelectorAll(".blarg2");
        element.addClass("booga").addClass("Booga2");
        (0, chai_1.expect)(probe1.querySelectorAll(".Booga2").length).eq(2);
    });
    (0, mocha_1.it)('must perform insert before and insert after correctly', function () {
        var probe1 = new typescript_1.DomQuery(document).querySelectorAll("#id_2");
        var insert = typescript_1.DomQuery.fromMarkup("<div id='insertedBefore'></div><div id='insertedBefore2'></div>");
        var insert2 = typescript_1.DomQuery.fromMarkup("<div id='insertedAfter'></div><div id='insertedAfter2'></div>");
        probe1.insertBefore(insert);
        probe1.insertAfter(insert2);
        (0, chai_1.expect)(typescript_1.DomQuery.querySelectorAll("#insertedBefore").isPresent()).to.be.true;
        (0, chai_1.expect)(typescript_1.DomQuery.querySelectorAll("#insertedBefore2").isPresent()).to.be.true;
        (0, chai_1.expect)(typescript_1.DomQuery.querySelectorAll("#id_2").isPresent()).to.be.true;
        (0, chai_1.expect)(typescript_1.DomQuery.querySelectorAll("#insertedAfter").isPresent()).to.be.true;
        (0, chai_1.expect)(typescript_1.DomQuery.querySelectorAll("#insertedAfter2").isPresent()).to.be.true;
    });
    (0, mocha_1.it)('it must stream', function () {
        var probe1 = new typescript_1.DomQuery(document).querySelectorAll("div");
        var coll = probe1.stream.collect(new typescript_2.ArrayCollector());
        (0, chai_1.expect)(coll.length == 4).to.be.true;
        coll = probe1.lazyStream.collect(new typescript_2.ArrayCollector());
        (0, chai_1.expect)(coll.length == 4).to.be.true;
    });
    (0, mocha_1.it)('it must stream to a domquery', function () {
        var probe1 = new typescript_1.DomQuery(document).querySelectorAll("div");
        var coll = probe1.stream.collect(new typescript_1.DomQueryCollector());
        (0, chai_1.expect)(coll.length == 4).to.be.true;
        coll = probe1.lazyStream.collect(new typescript_1.DomQueryCollector());
        (0, chai_1.expect)(coll.length == 4).to.be.true;
    });
    (0, mocha_1.it)('it must have parents', function () {
        var probe1 = new typescript_1.DomQuery(document).querySelectorAll("div");
        var coll = probe1.parents("body").stream.collect(new typescript_2.ArrayCollector());
        (0, chai_1.expect)(coll.length == 1).to.be.true;
    });
    (0, mocha_1.it)("must have a working insertBefore and insertAfter", function () {
        var probe1 = new typescript_1.DomQuery(document).byId("id_2");
        probe1.insertBefore(typescript_1.DomQuery.fromMarkup(" <div id=\"id_x_0\"></div><div id=\"id_x_1\"></div>"));
        probe1.insertAfter(typescript_1.DomQuery.fromMarkup(" <div id=\"id_x_0_1\"></div><div id=\"id_x_1_1\"></div>"));
        (0, chai_1.expect)(typescript_1.DomQuery.querySelectorAll("div").length).to.eq(8);
        typescript_1.DomQuery.querySelectorAll("body").innerHtml = trim(typescript_1.DomQuery.querySelectorAll("body").innerHtml.replace(/>\s*</gi, "><"));
        (0, chai_1.expect)(typescript_1.DomQuery.querySelectorAll("body").childNodes.length).to.eq(8);
        var innerHtml = typescript_1.DomQuery.querySelectorAll("body").innerHtml;
        (0, chai_1.expect)(innerHtml.indexOf("id_x_0") < innerHtml.indexOf("id_x_1")).to.be.true;
        (0, chai_1.expect)(innerHtml.indexOf("id_x_0") < innerHtml.indexOf("id_2")).to.be.true;
        (0, chai_1.expect)(innerHtml.indexOf("id_x_0") > 0).to.be.true;
        (0, chai_1.expect)(innerHtml.indexOf("id_x_0_1") > innerHtml.indexOf("id_2")).to.be.true;
        (0, chai_1.expect)(innerHtml.indexOf("id_x_1_1") > innerHtml.indexOf("id_x_0_1")).to.be.true;
    });
    (0, mocha_1.it)("must have a working input handling", function () {
        typescript_1.DomQuery.querySelectorAll("body").innerHtml = "<form id=\"blarg\">\n    <div id=\"embed1\">\n        <input type=\"text\" id=\"id_1\" name=\"id_1\" value=\"id_1_val\"></input>\n        <input type=\"text\" id=\"id_2\" name=\"id_2\" value=\"id_2_val\" disabled=\"disabled\"> </input>\n        <textarea type=\"text\" id=\"id_3\" name=\"id_3\">textareaVal</textarea>\n\n        <fieldset>\n            <input type=\"radio\" id=\"mc\" name=\"cc_1\" value=\"Mastercard\" checked=\"checked\"></input>\n            <label for=\"mc\"> Mastercard</label>\n            <input type=\"radio\" id=\"vi\" name=\"cc_1\" value=\"Visa\"></input>\n            <label for=\"vi\"> Visa</label>\n            <input type=\"radio\" id=\"ae\" name=\"cc_1\" value=\"AmericanExpress\"></input>\n            <label for=\"ae\"> American Express</label>\n        </fieldset>\n        <select id=\"val_5\" name=\"val_5\" name=\"top5\" size=\"5\">\n            <option>barg</option>\n            <option>jjj</option>\n            <option selected>akaka</option>\n            <option>blon</option>\n            <option>slashs</option>\n        </select>\n    </div>\n</form>\n       ";
        var length = typescript_1.DomQuery.querySelectorAll("form").elements.length;
        (0, chai_1.expect)(length == 8).to.be.true;
        var length1 = typescript_1.DomQuery.querySelectorAll("body").elements.length;
        (0, chai_1.expect)(length1 == 8).to.be.true;
        var length2 = typescript_1.DomQuery.byId("embed1").elements.length;
        (0, chai_1.expect)(length2 == 8).to.be.true;
        var count = typescript_1.DomQuery.byId("embed1").elements
            .stream.map(function (item) { return item.disabled ? 1 : 0; })
            .reduce(function (val1, val2) { return val1 + val2; }, 0);
        (0, chai_1.expect)(count.value).to.eq(1);
        typescript_1.DomQuery.byId("embed1").elements
            .stream.filter(function (item) { return item.disabled; })
            .each(function (item) { return item.disabled = false; });
        count = typescript_1.DomQuery.byId("embed1").elements
            .stream.map(function (item) { return item.disabled ? 1 : 0; })
            .reduce(function (val1, val2) { return val1 + val2; }, 0);
        (0, chai_1.expect)(count.value).to.eq(0);
        count = typescript_1.DomQuery.byId("embed1").elements
            .stream.map(function (item) { return item.attr("checked").isPresent() ? 1 : 0; })
            .reduce(function (val1, val2) { return val1 + val2; }, 0);
        (0, chai_1.expect)(count.value).to.eq(1);
        (0, chai_1.expect)(typescript_1.DomQuery.byId("id_1").inputValue.value == "id_1_val").to.be.true;
        typescript_1.DomQuery.byId("id_1").inputValue.value = "booga";
        (0, chai_1.expect)(typescript_1.DomQuery.byId("id_1").inputValue.value == "booga").to.be.true;
        (0, chai_1.expect)(typescript_1.DomQuery.byId("id_3").inputValue.value).to.eq("textareaVal");
        typescript_1.DomQuery.byId("id_3").inputValue.value = "hello world";
        (0, chai_1.expect)(typescript_1.DomQuery.byId("id_3").inputValue.value).to.eq("hello world");
        var cfg = typescript_1.DomQuery.querySelectorAll("form").elements.encodeFormElement();
        (0, chai_1.expect)(cfg.getIf("id_1").value[0]).to.eq("booga");
        (0, chai_1.expect)(cfg.getIf("id_2").value[0]).to.eq("id_2_val");
        (0, chai_1.expect)(cfg.getIf("id_3").value[0]).to.eq("hello world");
        (0, chai_1.expect)(cfg.getIf("cc_1").value[0]).to.eq("Mastercard");
        (0, chai_1.expect)(cfg.getIf("val_5").value[0]).to.eq("akaka");
    });
    (0, mocha_1.it)("must have a proper loadScriptEval execution", function (done) {
        typescript_1.DomQuery.byTagName("body").loadScriptEval("test.js");
        var xhr = this.requests[0];
        xhr.respond(200, {
            "content-type": "application/javascript",
        }, "\n            document.getElementById('id_1').innerHTML = \"hello world\";\n        ");
        setTimeout(function () {
            (0, chai_1.expect)(typescript_1.DomQuery.byId("id_1").innerHtml == "hello world").to.be.true;
            done();
        }, 100);
    });
    (0, mocha_1.it)("must have first etc working", function () {
        (0, chai_1.expect)(typescript_1.DomQuery.querySelectorAll("div").first().id.value).to.eq("id_1");
    });
    (0, mocha_1.it)("runscript runcss", function () {
        typescript_1.DomQuery.byTagName("body").innerHtml = "\n            <div id=\"first\"></div>\n            <div id=\"second\"></div>\n            <div id=\"third\"></div>\n            <div id=\"fourth\"></div>\n            \n            <script type=\"text/javascript\">\n                document.getElementById(\"first\").innerHTML = \"hello world\";\n            </script>\n            <script type=\"text/javascript\">\n            //<![CDATA[\n                document.getElementById(\"second\").innerHTML = \"hello world\";\n            //]]>    \n            </script>\n            <script type=\"text/javascript\">\n            <!--\n                document.getElementById(\"third\").innerHTML = \"hello world\";\n            //-->   \n            </script>\n              <script type=\"text/javascript\">\n            //<!--\n                document.getElementById(\"fourth\").innerHTML = \"hello world\";\n            //-->   \n            </script>\n        \n            <style type=\"text/css\">\n                #first {\n                    border: 1px solid black;\n                }\n            </style>\n        ";
        var content = typescript_1.DomQuery.byTagName("body").runScripts().runCss();
        (0, chai_1.expect)(content.byId("first").innerHtml).to.eq("hello world");
        (0, chai_1.expect)(content.byId("second").innerHtml).to.eq("hello world");
        (0, chai_1.expect)(content.byId("third").innerHtml).to.eq("hello world");
        (0, chai_1.expect)(content.byId("fourth").innerHtml).to.eq("hello world");
    });
    (0, mocha_1.it)("must have a proper loadScriptEval deferred", function (done) {
        typescript_1.DomQuery.byTagName("body").loadScriptEval("test.js", 700);
        var xhr = this.requests[0];
        xhr.respond(200, {
            "content-type": "application/javascript",
        }, "\n            document.getElementById('id_1').innerHTML = \"hello world\";\n        ");
        setTimeout(function () {
            (0, chai_1.expect)(typescript_1.DomQuery.byId("id_1").innerHtml == "hello world").to.be.false;
        }, 100);
        setTimeout(function () {
            (0, chai_1.expect)(typescript_1.DomQuery.byId("id_1").innerHtml == "hello world").to.be.true;
            done();
        }, 1000);
    });
    (0, mocha_1.it)("it must handle events properly", function () {
        var clicked = 0;
        var listener = function (evt) {
            clicked++;
        };
        var eventReceiver = typescript_1.DomQuery.byId("id_1");
        eventReceiver.addEventListener("click", listener);
        eventReceiver.click();
        (0, chai_1.expect)(clicked).to.eq(1);
        eventReceiver.removeEventListener("click", listener);
        eventReceiver.click();
        (0, chai_1.expect)(clicked).to.eq(1);
    });
    (0, mocha_1.it)("it must handle innerText properly", function () {
        //jsdom bug
        Object.defineProperty(Object.prototype, 'innerText', {
            get: function () {
                return this.textContent;
            },
        });
        var probe = typescript_1.DomQuery.byId("id_1");
        probe.innerHtml = "<div>hello</div><div>world</div>";
        (0, chai_1.expect)(probe.innerText()).to.eq("helloworld");
    });
    (0, mocha_1.it)("it must handle textContent properly", function () {
        var probe = typescript_1.DomQuery.byId("id_1");
        probe.innerHtml = "<div>hello</div><div>world</div>";
        (0, chai_1.expect)(probe.textContent()).to.eq("helloworld");
    });
    (0, mocha_1.it)("it must handle iterations properly", function () {
        var probe = typescript_1.DomQuery.byTagName("div");
        var resArr = probe.lazyStream.collect(new typescript_2.ArrayCollector());
        (0, chai_1.expect)(resArr.length).to.eq(4);
        probe.reset();
        while (probe.hasNext()) {
            var el = probe.next();
            (0, chai_1.expect)(el.tagName.value.toLowerCase()).to.eq("div");
        }
        (0, chai_1.expect)(probe.next()).to.eq(null);
        var probe2 = typescript_1.DomQuery.byTagName("div").limits(2);
        resArr = typescript_2.LazyStream.ofStreamDataSource(probe2).collect(new typescript_2.ArrayCollector());
        (0, chai_1.expect)(resArr.length).to.eq(2);
    });
    (0, mocha_1.it)("it must handle subnodes properly", function () {
        var probe = typescript_1.DomQuery.byTagName("div");
        (0, chai_1.expect)(probe.subNodes(1, 3).length).to.eq(2);
        probe = typescript_1.DomQuery.byTagName("body").childNodes.subNodes(0, 2);
        (0, chai_1.expect)(probe.length).to.eq(2);
        probe = typescript_1.DomQuery.byTagName("div").subNodes(2);
        (0, chai_1.expect)(probe.length).to.eq(2);
    });
    (0, mocha_1.it)("it must ensure shadow dom creation works properly", function () {
        var probe = typescript_1.DomQuery.byTagName("div");
        try {
            //probably not testable atm, mocha does not have shadow dom support
            //we might be able to shim it in one way or the other
            var element = probe.attachShadow();
            (0, chai_1.expect)(element.length > 0).to.eq(true);
        }
        catch (e) {
            //not supported we still need to get an error here
            (0, chai_1.expect)(e.message.indexOf("not supported") != -1).to.be.true;
        }
    });
    (0, mocha_1.it)('it must have a working wait for dom with mut observer', function () {
        return __awaiter(this, void 0, void 0, function () {
            var probe, ret, ret2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        probe = typescript_1.DomQuery.byId('id_1');
                        setTimeout(function () { return probe.innerHtml = 'true'; }, 300);
                        return [4 /*yield*/, probe.waitUntilDom(function (element) { return element.innerHtml.indexOf('true') != -1; })];
                    case 1:
                        ret = _a.sent();
                        delete window.MutationObserver;
                        delete global.MutationObserver;
                        probe.innerHtml = "";
                        setTimeout(function () { return probe.innerHtml = 'true'; }, 300);
                        return [4 /*yield*/, probe.waitUntilDom(function (element) { return element.innerHtml.indexOf('true') != -1; })];
                    case 2:
                        ret2 = _a.sent();
                        (0, chai_1.expect)(ret.isPresent() && ret2.isPresent());
                        return [2 /*return*/];
                }
            });
        });
    });
    (0, mocha_1.it)('it must have a timeout', function () {
        return __awaiter(this, void 0, void 0, function () {
            var probe, ex_1, ex2_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        probe = typescript_1.DomQuery.byId('booga');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        setTimeout(function () { return probe.innerHtml = 'true'; }, 300);
                        return [4 /*yield*/, probe.waitUntilDom(function (element) { return element.innerHtml.indexOf('true') != -1; })];
                    case 2:
                        _a.sent();
                        chai_1.expect.fail("must have a timeout");
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        (0, chai_1.expect)(!!ex_1);
                        return [3 /*break*/, 4];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        delete window.MutationObserver;
                        delete global.MutationObserver;
                        probe.innerHtml = "";
                        setTimeout(function () { return probe.innerHtml = 'true'; }, 300);
                        return [4 /*yield*/, probe.waitUntilDom(function (element) { return element.innerHtml.indexOf('true') != -1; })];
                    case 5:
                        _a.sent();
                        chai_1.expect.fail("must have a timeout");
                        return [3 /*break*/, 7];
                    case 6:
                        ex2_1 = _a.sent();
                        (0, chai_1.expect)(!!ex2_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=DomQueryTest.js.map