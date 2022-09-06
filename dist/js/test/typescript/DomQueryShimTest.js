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
var mocha_1 = require("mocha");
var sinon = require("sinon");
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
mocha_1.describe('DOMQuery Shim tests', function () {
    beforeEach(function () {
        var _this = this;
        var dom = new JSDOM("\n            <!DOCTYPE html>\n        <html lang=\"en\">\n        <head>\n            <meta charset=\"UTF-8\">\n            <title>Title</title>\n            </head>\n            <body>\n                <div id=\"id_1\"></div>\n                <div id=\"id_2\"  booga=\"blarg\" class=\"blarg2\"></div>\n                <div id=\"id_3\" class=\"blarg1 blarg2\"></div>\n                <div id=\"id_4\"></div>\n            </body>\n            </html>\n    \n    ", {
            contentType: "text/html",
            runScripts: "dangerously"
        });
        var window = dom.window;
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
        window.MutationObserver = MutationObserver;
        global.MutationObserver = MutationObserver;
    });
});
//# sourceMappingURL=DomQueryShimTest.js.map