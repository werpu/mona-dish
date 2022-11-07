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
var chai_1 = require("chai");
var mocha_1 = require("mocha");
var CryptoJS = require("crypto-js");
var Messaging_1 = require("../../main/typescript/Messaging");
var broadcast_channel_1 = require("broadcast-channel");
var typescript_1 = require("../../main/typescript");
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
function delay(milliseconds) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(resolve, milliseconds);
                })];
        });
    });
}
var iframe = "\n            <div id=\"received\">false</div>\n        ";
var CHANNEL = "booga";
var applyMessageReceiver = function (contentWindow, msg, brokr) {
    if (brokr === void 0) { brokr = new Messaging_1.Broker(contentWindow); }
    contentWindow["passMessage"] = function (message) {
        msg = message;
        brokr.registerListener("channel", function (message) {
            contentWindow.document.getElementById("received").innerHTML = message.message;
            console.log("iframe message", message.message);
        });
    };
    return msg;
};
(0, mocha_1.describe)('Broker tests', function () {
    beforeEach(function () {
        // noinspection HtmlUnknownAttribute
        var dom = new JSDOM("<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Title</title>\n</head>\n<body>\n<div id=\"id_1\"></div>\n<div id=\"id_2\" booga=\"blarg\" class=\"blarg2\"></div>\n<div id=\"id_3\" class=\"blarg1 blarg2\"></div>\n<div id=\"id_4\"></div>\n<iframe id=\"iframe1\"></iframe>\n<div id=\"shadow1\"></div>\n</body>\n</html>\n    ", {
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
        window["BroadcastChannel"] = broadcast_channel_1.BroadcastChannel;
        /*this.xhr = sinon.useFakeXMLHttpRequest();
        this.requests = [];
        this.xhr.onCreate = (xhr) => {
            this.requests.push(xhr);
        };
        (<any>global).XMLHttpRequest = this.xhr;
        (<any>window).XMLHttpRequest = this.xhr;*/
        // enforce this config for all channels
        (0, broadcast_channel_1.enforceOptions)({
            type: 'simulate'
        });
    });
    /*relays a message from an iframe up into the global context*/
    (0, mocha_1.it)('from iframe to global', function () {
        var contentWindow = (global.document.getElementById('iframe1')).contentWindow;
        var iframeDoc = contentWindow.document;
        iframeDoc.write(iframe);
        (0, chai_1.expect)(iframeDoc.querySelectorAll("#received").length > 0).to.be.true;
        var msg = new Messaging_1.Message("booga");
        var iframeBroker = new Messaging_1.Broker(contentWindow);
        var origBroker = new Messaging_1.Broker();
        msg = applyMessageReceiver(contentWindow, msg, iframeBroker);
        //contentWindow.passMessage(msg);
        origBroker.broadcast("channel", msg);
        var messageReceived = false;
        origBroker.registerListener(CHANNEL, function (msg) {
            messageReceived = msg.message == "booga";
        });
        msg = new Messaging_1.Message("booga2");
        iframeBroker.broadcast("channel2", msg);
        function analyzeDelayed() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, delay(1000)];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(messageReceived).to.eq(true);
                            return [2 /*return*/];
                    }
                });
            });
        }
        analyzeDelayed();
    });
    /**
     * pass a global message into an attached brokered iframe
     */
    (0, mocha_1.it)('from global to iframe', function () {
        var contentWindow = (global.document.getElementById('iframe1')).contentWindow;
        var iframeDoc = contentWindow.document;
        iframeDoc.write(iframe);
        (0, chai_1.expect)(iframeDoc.querySelectorAll("#received").length > 0).to.be.true;
        var msg = applyMessageReceiver(contentWindow, new Messaging_1.Message("booga"));
        var broker = new Messaging_1.Broker();
        contentWindow.passMessage(msg);
        broker.broadcast("channel", msg);
        msg = new Messaging_1.Message("booga2");
        broker.broadcast("channel2", msg);
        function analyzeDelayed() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, delay(400)];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(iframeDoc.querySelectorAll("#received")[0].innerHTML).to.eq("booga");
                            return [2 /*return*/];
                    }
                });
            });
        }
        analyzeDelayed();
    });
    (0, mocha_1.it)('basic message', function () {
        var broker = new Messaging_1.Broker();
        var messageReceived = false;
        broker.registerListener("channel", function (message) {
            messageReceived = message.message === "booga";
        });
        broker.broadcast("channel", new Messaging_1.Message("booga"));
        (0, chai_1.expect)(messageReceived).to.be.true;
    });
    (0, mocha_1.it)('basic message different broker groups', function () {
        var broker = new Messaging_1.Broker(window, "aaa");
        var broker2 = new Messaging_1.Broker(window, "bbb");
        var messageReceived = false;
        var messageReceived2 = false;
        broker.registerListener("channel", function (message) {
            messageReceived = message.message === "booga";
        });
        broker2.registerListener("channel", function (message) {
            messageReceived2 = message.message === "booga";
        });
        broker.broadcast("channel", new Messaging_1.Message("booga"));
        (0, chai_1.expect)(messageReceived).to.be.true;
        (0, chai_1.expect)(messageReceived2).to.be.false;
    });
    (0, mocha_1.it)('bidirectional message', function () {
        // noinspection DuplicatedCode
        var broker = new Messaging_1.Broker();
        var answerReceived = false;
        broker.registerListener("channel", function (message) {
            setTimeout(function () { return broker.answer("channel", message, new Messaging_1.Message("answer of booga")); }, 0);
        });
        return broker.request("channel", new Messaging_1.Message("booga"))
            .then(function (message2) {
            answerReceived = message2.message === "answer of booga";
            (0, chai_1.expect)(answerReceived).to.be.true;
            return true;
        });
    });
    (0, mocha_1.it)('bidirectional message with two brokers', function () {
        var broker = new Messaging_1.Broker();
        // noinspection DuplicatedCode
        var broker2 = new Messaging_1.Broker();
        var answerReceived = false;
        broker2.registerListener("channel", function (message) {
            setTimeout(function () { return broker.answer("channel", message, new Messaging_1.Message("answer of booga")); }, 0);
        });
        return broker.request("channel", new Messaging_1.Message("booga"))
            .then(function (message2) {
            answerReceived = message2.message === "answer of booga";
            (0, chai_1.expect)(answerReceived).to.be.true;
            return true;
        });
    });
    (0, mocha_1.it)('basic init', function () {
        var _a;
        (0, chai_1.expect)((_a = window === null || window === void 0 ? void 0 : window.document) === null || _a === void 0 ? void 0 : _a.body).not.eq(null);
    });
    (0, mocha_1.it)('dual brokers in different systems', function () {
        var broker1 = new Messaging_1.Broker();
        var broker2 = new Messaging_1.Broker();
        var broker1CallCnt = 0;
        var broker2CallCnt = 0;
        broker1.registerListener(CHANNEL, function () {
            broker1CallCnt++;
        });
        broker2.registerListener(CHANNEL, function () {
            broker2CallCnt++;
        });
        broker1.broadcast(CHANNEL, new Messaging_1.Message("booga"));
        (0, chai_1.expect)(broker1CallCnt == 1).to.eq(true);
        (0, chai_1.expect)(broker2CallCnt == 1).to.eq(true);
        broker2.broadcast(CHANNEL, new Messaging_1.Message("booga"));
        (0, chai_1.expect)(broker1CallCnt == 2).to.eq(true);
        (0, chai_1.expect)(broker2CallCnt == 2).to.eq(true);
    });
    (0, mocha_1.it)('dual brokers in different systems sequence calls', function () {
        var _this = this;
        var chn1 = new broadcast_channel_1.BroadcastChannel("ddd");
        var chn2 = new broadcast_channel_1.BroadcastChannel("ddd");
        var chn1CallCnt = 0;
        var chn2CallCnt = 0;
        chn1.addEventListener("message", function () {
            chn1CallCnt++;
        });
        chn2.addEventListener("message", function () { return chn2CallCnt++; });
        var broker1 = new Messaging_1.BroadcastChannelBroker();
        var broker2 = new Messaging_1.BroadcastChannelBroker();
        console.log("channels created");
        var broker1CallCnt = 0;
        var broker2CallCnt = 0;
        broker1.registerListener(CHANNEL, function () {
            broker1CallCnt++;
        });
        broker2.registerListener(CHANNEL, function () {
            broker2CallCnt++;
        });
        return (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, broker1.broadcast(CHANNEL, new Messaging_1.Message("booga"))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, broker1.broadcast(CHANNEL, new Messaging_1.Message("booga"))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, broker1.broadcast(CHANNEL, new Messaging_1.Message("booga"))];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, chn1.postMessage({
                                foo: 'bar'
                            })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, chn1.postMessage({
                                foo: 'bar'
                            })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, delay(200)];
                    case 6:
                        _a.sent();
                        (0, chai_1.expect)(chn1CallCnt == 0).to.be.true;
                        (0, chai_1.expect)(chn2CallCnt == 2).to.be.true;
                        (0, chai_1.expect)(broker1CallCnt == 3).to.eq(true);
                        (0, chai_1.expect)(broker2CallCnt == 3).to.eq(true);
                        broker1.unregister();
                        broker2.unregister();
                        return [2 /*return*/];
                }
            });
        }); })();
    });
    (0, mocha_1.it)('shadow dom handling', function () {
        //closed not possible this seals the element off entirely, this is a no go
        //also a closed shadow root is not recommended, there are other ways of achieving partial
        //isolation
        var shadowRoot = document.getElementById('shadow1').attachShadow({ mode: 'closed' });
        (0, chai_1.expect)(shadowRoot != null).to.be.true;
        shadowRoot.innerHTML = "<div class='received'>false</div>";
        //we now attach the brokers
        var origBroker = new Messaging_1.Broker(window, "orig");
        var shadowBroker = new Messaging_1.Broker(shadowRoot, "orig");
        var shadowBrokerReceived = 0;
        shadowBroker.registerListener(CHANNEL, function () {
            shadowBrokerReceived++;
        });
        var brokerReceived = 0;
        origBroker.registerListener(CHANNEL, function () {
            brokerReceived++;
        });
        //from root broker into shadow dom
        origBroker.broadcast(CHANNEL, new Messaging_1.Message("booga"));
        (0, chai_1.expect)(shadowBrokerReceived).to.be.eq(1);
        (0, chai_1.expect)(brokerReceived).to.eq(1);
        //now from shadow dom into broker
        shadowBroker.broadcast(CHANNEL, new Messaging_1.Message("booga2"));
        (0, chai_1.expect)(brokerReceived).to.eq(2);
        //not closed shadow dom works in a way, that you basically bind the broker as external
        //to the external element and then use the message handler to pass the data back into
        //your shadow Root ... the shadow root is basically an internal isolation you can pass
        //That way, but you have to do it yourself by defining a broker in your component
    });
    (0, mocha_1.it)("must handle sub-elements correctly", function () {
        var broker1 = new Messaging_1.Broker();
        var broker2 = new Messaging_1.Broker(document.getElementById("id_1"));
        var brokerReceived = 0;
        broker2.registerListener(CHANNEL, function () {
            brokerReceived++;
        });
        broker1.broadcast(CHANNEL, new Messaging_1.Message("booga"));
        (0, chai_1.expect)(brokerReceived).to.eq(1);
    });
    (0, mocha_1.it)("must work with Broadcast channel", function (done) {
        var broker1 = new Messaging_1.BroadcastChannelBroker(function (group) { return new broadcast_channel_1.BroadcastChannel(group); });
        var broker2 = new Messaging_1.BroadcastChannelBroker(function (group) { return new broadcast_channel_1.BroadcastChannel(group); });
        var brokerReceived = 0;
        new Promise(function (apply) {
            broker2.registerListener(CHANNEL, function () {
                brokerReceived++;
                apply(brokerReceived);
            });
            broker1.broadcast(CHANNEL, new Messaging_1.Message("booga"));
        }).finally(function () {
            broker1.unregister();
            broker2.unregister();
            (0, chai_1.expect)(brokerReceived).to.eq(1);
            done();
        });
    });
    (0, mocha_1.it)('shadow dom handling with Broadcast channel', function () {
        return __awaiter(this, void 0, void 0, function () {
            var shadowRoot, origBroker, shadowBroker, shadowBrokerReceived, brokerReceived;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shadowRoot = document.getElementById('shadow1').attachShadow({ mode: 'closed' });
                        (0, chai_1.expect)(shadowRoot != null).to.be.true;
                        shadowRoot.innerHTML = "<div class='received'>false</div>";
                        origBroker = new Messaging_1.BroadcastChannelBroker();
                        shadowBroker = new Messaging_1.BroadcastChannelBroker();
                        shadowBrokerReceived = 0;
                        shadowBroker.registerListener(CHANNEL, function () {
                            shadowBrokerReceived++;
                        });
                        brokerReceived = 0;
                        origBroker.registerListener(CHANNEL, function () {
                            brokerReceived++;
                        });
                        //from root broker into shadow dom
                        origBroker.broadcast(CHANNEL, new Messaging_1.Message("booga"));
                        return [4 /*yield*/, delay(100)];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(shadowBrokerReceived).to.be.eq(1);
                        (0, chai_1.expect)(brokerReceived).to.eq(1);
                        //now from shadow dom into broker
                        shadowBroker.broadcast(CHANNEL, new Messaging_1.Message("booga2"));
                        return [4 /*yield*/, delay(100)];
                    case 2:
                        _a.sent();
                        (0, chai_1.expect)(brokerReceived).to.eq(2);
                        origBroker.unregister();
                        shadowBroker.unregister();
                        return [2 /*return*/];
                }
            });
        });
    });
    (0, mocha_1.it)('basic message with broadcast', function () {
        return __awaiter(this, void 0, void 0, function () {
            var broker, messageReceived;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        broker = new Messaging_1.BroadcastChannelBroker();
                        messageReceived = false;
                        broker.registerListener("channel", function (message) {
                            messageReceived = message.message === "booga";
                        });
                        broker.broadcast("channel", new Messaging_1.Message("booga"));
                        return [4 /*yield*/, delay(100)];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(messageReceived).to.be.true;
                        broker.unregister();
                        return [2 /*return*/];
                }
            });
        });
    });
    (0, mocha_1.it)('basic message with subjects and rxjs', function () {
        return __awaiter(this, void 0, void 0, function () {
            var broker, messageReceived, messageSubject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        broker = new Messaging_1.BroadcastChannelBroker();
                        messageReceived = false;
                        broker.registerListener("channel", function (message) {
                            messageReceived = message.message === "booga";
                        });
                        messageSubject = broker.asSubject("channel");
                        messageSubject.next(new Messaging_1.Message("booga"));
                        return [4 /*yield*/, delay(100)];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(messageReceived).to.be.true;
                        broker.unregister();
                        return [2 /*return*/];
                }
            });
        });
    });
    (0, mocha_1.it)('basic message with subjects and rxjs second test', function () {
        return __awaiter(this, void 0, void 0, function () {
            var broker, messageReceived, messageSubject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        broker = new Messaging_1.BroadcastChannelBroker();
                        messageReceived = false;
                        messageSubject = broker.asSubject("channel");
                        messageSubject.subscribe(function (message) {
                            messageReceived = message.message === "booga";
                        });
                        broker.broadcast("channel", new Messaging_1.Message("booga"));
                        return [4 /*yield*/, delay(100)];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(messageReceived).to.be.true;
                        broker.unregister();
                        return [2 /*return*/];
                }
            });
        });
    });
    (0, mocha_1.it)('basic message with subjects and rxjs third test', function () {
        return __awaiter(this, void 0, void 0, function () {
            var broker, messageReceived, messageSubject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        broker = new Messaging_1.BroadcastChannelBroker();
                        messageReceived = false;
                        messageSubject = broker.asSubject("channel");
                        messageSubject.subscribe(function (message) {
                            messageReceived = message.message === "booga";
                        });
                        messageSubject.next(new Messaging_1.Message("booga"));
                        return [4 /*yield*/, delay(100)];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(messageReceived).to.be.true;
                        broker.unregister();
                        return [2 /*return*/];
                }
            });
        });
    });
    (0, mocha_1.it)('basic message with broadcast ans string', function () {
        return __awaiter(this, void 0, void 0, function () {
            var broker, messageReceived;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        broker = new Messaging_1.BroadcastChannelBroker();
                        messageReceived = false;
                        broker.registerListener("channel", function (message) {
                            messageReceived = message.message === "booga";
                        });
                        broker.broadcast("channel", "booga");
                        return [4 /*yield*/, delay(100)];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(messageReceived).to.be.true;
                        broker.unregister();
                        return [2 /*return*/];
                }
            });
        });
    });
    (0, mocha_1.it)('bidirectional message with Broadcast Channel', function () {
        return __awaiter(this, void 0, void 0, function () {
            var broker, broker2, answerReceived;
            return __generator(this, function (_a) {
                broker = new Messaging_1.BroadcastChannelBroker();
                broker2 = new Messaging_1.BroadcastChannelBroker();
                answerReceived = false;
                broker2.registerListener("channel", function (message) {
                    setTimeout(function () { return broker2.answer("channel", message, new Messaging_1.Message("answer of booga")); }, 0);
                });
                return [2 /*return*/, broker.request("channel", new Messaging_1.Message("booga"))
                        .then(function (message2) {
                        answerReceived = message2.message === "answer of booga";
                        (0, chai_1.expect)(answerReceived).to.be.true;
                        return true;
                    }).finally(function () {
                        broker.unregister();
                        broker2.unregister();
                    })];
            });
        });
    });
    (0, mocha_1.it)('crypto test 1', function () {
        return __awaiter(this, void 0, void 0, function () {
            var crypto, broker, broker2, answerReceived;
            return __generator(this, function (_a) {
                crypto = new typescript_1.JSONCrypto();
                broker = new Messaging_1.BroadcastChannelBrokerBuilder().withCrypto(crypto).build();
                broker2 = new Messaging_1.BroadcastChannelBrokerBuilder().withCrypto(crypto).build();
                answerReceived = false;
                broker2.registerListener("channel", function (message) {
                    setTimeout(function () { return broker2.answer("channel", message, new Messaging_1.Message("answer of booga")); }, 0);
                });
                return [2 /*return*/, broker.request("channel", new Messaging_1.Message("booga"))
                        .then(function (message2) {
                        answerReceived = message2.message === "answer of booga";
                        (0, chai_1.expect)(answerReceived).to.be.true;
                        return true;
                    }).finally(function () {
                        broker.unregister();
                        broker2.unregister();
                    })];
            });
        });
    });
    (0, mocha_1.it)('Crypto Timer Extension test 1', function () {
        return __awaiter(this, void 0, void 0, function () {
            var encodeCalled, hashSum, expiringCrypto, toEncrypt, encrypted, decrypted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        encodeCalled = false;
                        hashSum = {
                            encode: function (encodedData) {
                                encodeCalled = true;
                                return CryptoJS.SHA256(encodedData);
                            }
                        };
                        expiringCrypto = new typescript_1.ExpiringCrypto(20 /*ms*/, new typescript_1.JSONCrypto(), hashSum);
                        toEncrypt = "hello world";
                        encrypted = expiringCrypto.encode(toEncrypt);
                        (0, chai_1.expect)(encrypted).not.to.eq(toEncrypt);
                        decrypted = expiringCrypto.decode(encrypted);
                        (0, chai_1.expect)(decrypted).to.eq(toEncrypt);
                        decrypted = expiringCrypto.decode(encrypted);
                        (0, chai_1.expect)(decrypted).to.eq(toEncrypt);
                        (0, chai_1.expect)(encodeCalled).to.be.true;
                        return [4 /*yield*/, delay(50)];
                    case 1:
                        _a.sent();
                        try {
                            expiringCrypto.decode(encrypted);
                        }
                        catch (e) {
                            //expected
                            return [2 /*return*/, true];
                        }
                        (0, chai_1.expect)(true).to.be.false;
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=MessagingTest.spec.js.map