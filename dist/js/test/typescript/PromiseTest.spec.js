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
var chai_1 = require("chai");
var mocha_1 = require("mocha");
var Promise_1 = require("../../main/typescript/Promise");
(0, mocha_1.describe)('promise tests', function () {
    (0, mocha_1.it)('simple promise', function (done) {
        var applyPromise = new Promise_1.Promise(function (apply, reject) {
            setTimeout(function () {
                apply(1);
            }, 1);
        });
        var finallyCalled = false;
        var thenCalled = false;
        applyPromise.then(function (data) {
            thenCalled = true;
            (0, chai_1.expect)(data).to.be.eq(1);
        }).finally(function () {
            finallyCalled = true;
            (0, chai_1.expect)(thenCalled).to.be.true;
            (0, chai_1.expect)(finallyCalled).to.be.true;
            done();
        });
    });
    (0, mocha_1.it)('simple promise failure', function (done) {
        var applyPromise = new Promise_1.Promise(function (apply, reject) {
            setTimeout(function () {
                reject(1);
            }, 1);
        });
        var finallyCalled = false;
        var thenCalled = false;
        applyPromise.catch(function (data) {
            thenCalled = true;
            (0, chai_1.expect)(data).to.be.eq(1);
        }).finally(function () {
            finallyCalled = true;
            (0, chai_1.expect)(thenCalled).to.be.true;
            (0, chai_1.expect)(finallyCalled).to.be.true;
            done();
        });
    });
    (0, mocha_1.it)('chained promise', function (done) {
        var applyPromise = new Promise_1.Promise(function (apply, reject) {
            setTimeout(function () {
                apply(1);
            }, 1);
        });
        var finallyCalled = false;
        var thenCalled = false;
        var then2Called = false;
        applyPromise.then(function (data) {
            thenCalled = true;
            (0, chai_1.expect)(data).to.be.eq(1);
            return 2;
        }).then(function (data) {
            then2Called = true;
            (0, chai_1.expect)(data).to.be.eq(2);
        }).finally(function () {
            finallyCalled = true;
            (0, chai_1.expect)(thenCalled).to.be.true;
            (0, chai_1.expect)(then2Called).to.be.true;
            (0, chai_1.expect)(finallyCalled).to.be.true;
            done();
        });
    });
    (0, mocha_1.it)("Promise all test", function (done) {
        var applyPromise = new Promise_1.Promise(function (apply, reject) {
            setTimeout(function () {
                apply(1);
            }, 1);
        });
        var applyPromise2 = new Promise_1.Promise(function (apply, reject) {
            setTimeout(function () {
                apply(2);
            }, 1);
        });
        var applyPromise3 = Promise_1.Promise.all(applyPromise, applyPromise2);
        var finallyCalled = false;
        var thenCalled = false;
        var then2Called = false;
        applyPromise.then(function (data) {
            thenCalled = true;
            (0, chai_1.expect)(data).to.be.eq(1);
            return 2;
        });
        applyPromise2.then(function (data) {
            then2Called = true;
            (0, chai_1.expect)(data).to.be.eq(2);
            return 2;
        });
        applyPromise3.finally(function () {
            finallyCalled = true;
            (0, chai_1.expect)(thenCalled).to.be.true;
            (0, chai_1.expect)(then2Called).to.be.true;
            (0, chai_1.expect)(finallyCalled).to.be.true;
            done();
        });
    });
    (0, mocha_1.it)("Promise race test", function (done) {
        var applyPromise = new Promise_1.Promise(function (apply, reject) {
            setTimeout(function () {
                apply(1);
            }, 1);
        });
        var applyPromise2 = new Promise_1.Promise(function (apply, reject) {
            setTimeout(function () {
                apply(2);
            }, 6);
        });
        var applyPromise3 = Promise_1.Promise.race(applyPromise, applyPromise2);
        var finallyCalled = false;
        var thenCalled = false;
        var then2Called = false;
        applyPromise.then(function (data) {
            thenCalled = true;
            (0, chai_1.expect)(data).to.be.eq(1);
            return 2;
        });
        applyPromise2.then(function (data) {
            then2Called = true;
            (0, chai_1.expect)(data).to.be.eq(2);
            return 2;
        });
        applyPromise3.then(function (val) {
            finallyCalled = true;
        });
        Promise_1.Promise.all(applyPromise3).finally(function () {
            (0, chai_1.expect)(thenCalled || then2Called).to.be.true;
            (0, chai_1.expect)(then2Called).to.be.eq(false);
            (0, chai_1.expect)(finallyCalled).to.be.true;
            done();
        });
    });
    (0, mocha_1.it)("Promise chain test", function (done) {
        var chainExecuted = false;
        var applyPromise = new Promise_1.Promise(function (apply, reject) {
            setTimeout(function () {
                apply(1);
            }, 1);
        });
        applyPromise.then(function () {
            return new Promise_1.Promise(function (apply, reject) {
                setTimeout(function () {
                    apply(2);
                }, 6);
            });
        }).then(function () {
            chainExecuted = true;
            done();
        });
    });
    (0, mocha_1.it)("Promise chain2 test", function (done) {
        var chainExecuted = false;
        var applyPromise = new Promise_1.Promise(function (apply, reject) {
            setTimeout(function () {
                reject(1);
            }, 1);
        });
        applyPromise.catch(function () {
            return new Promise_1.Promise(function (apply, reject) {
                setTimeout(function () {
                    apply(2);
                }, 6);
            });
        }).then(function () {
            chainExecuted = true;
            done();
        });
    });
    (0, mocha_1.it)("Promise chain3 test", function (done) {
        var chainExecuted = false;
        var promise2Called = false;
        var promise3Called = false;
        var promise4Called = false;
        var applyPromise = new Promise_1.Promise(function (apply, reject) {
            setTimeout(function () {
                reject(1);
            }, 1);
        }).catch(function () {
            return new Promise_1.Promise(function (apply, reject) {
                setTimeout(function () {
                    apply(2);
                }, 6);
            });
        }).then(function () {
            chainExecuted = true;
            return Promise_1.Promise.reject(true);
        }).catch(function (val) {
            promise4Called = val;
        });
        var applyPromise2 = new Promise_1.Promise(function (apply, reject) {
            setTimeout(function () {
                reject(1);
            }, 1);
        }).then(function () {
            promise2Called = true;
        });
        var applyPromise3 = Promise_1.Promise.all(applyPromise, applyPromise2).then(function () {
            promise3Called = true;
        });
        Promise_1.Promise.all(applyPromise, applyPromise2, applyPromise3).finally(function () {
            (0, chai_1.expect)(chainExecuted).to.be.true;
            (0, chai_1.expect)(promise3Called).to.be.true;
            (0, chai_1.expect)(promise4Called).to.be.true;
            done();
        });
    });
    (0, mocha_1.it)("Promise resolve test", function (done) {
        var promisCalled = false;
        var original = Promise_1.Promise.resolve(true);
        var cast = Promise_1.Promise.resolve(original);
        cast.then(function (v) {
            promisCalled = true;
            (0, chai_1.expect)(v).to.be.true;
            done();
        });
    });
    (0, mocha_1.it)("Promise reject test", function (done) {
        var promisCalled = false;
        var original = Promise_1.Promise.resolve(true);
        var original2 = Promise_1.Promise.resolve(original);
        var cast = Promise_1.Promise.reject(original2);
        cast.catch(function (v) {
            promisCalled = true;
            (0, chai_1.expect)(v).to.be.true;
            done();
        });
    });
});
//# sourceMappingURL=PromiseTest.spec.js.map