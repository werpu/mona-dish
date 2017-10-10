"use strict";
///<reference path="../../../typings/index.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
var Monad_1 = require("../../main/typescript/Monad");
describe('promise tests', function () {
    /*it('simple promise no async', () => {
     let applyPromise = new Promise((apply: Function, reject: Function) => {
     apply(1);
     });

     applyPromise.then((data: any): Promise => {
     expect(data).toBe(1);
     return null;
     });
     });*/
    it('simple promise', function () {
        jasmine.clock().install();
        var applyPromise = new Monad_1.Promise(function (apply, reject) {
            setTimeout(function () {
                apply(1);
            }, 1);
        });
        var finallyCalled = false;
        var thenCalled = false;
        applyPromise.then(function (data) {
            thenCalled = true;
            expect(data).toBe(1);
        }).finally(function () {
            finallyCalled = true;
        });
        jasmine.clock().tick(2);
        expect(thenCalled).toBe(true);
        expect(finallyCalled).toBe(true);
    });
    it('simple promise failure', function () {
        var applyPromise = new Monad_1.Promise(function (apply, reject) {
            setTimeout(function () {
                reject(1);
            }, 1);
        });
        var finallyCalled = false;
        var thenCalled = false;
        applyPromise.catch(function (data) {
            thenCalled = true;
            expect(data).toBe(1);
        }).finally(function () {
            finallyCalled = true;
        });
        jasmine.clock().tick(2);
        expect(thenCalled).toBe(true);
        expect(finallyCalled).toBe(true);
    });
    it('chained promise', function () {
        var applyPromise = new Monad_1.Promise(function (apply, reject) {
            setTimeout(function () {
                apply(1);
            }, 1);
        });
        var finallyCalled = false;
        var thenCalled = false;
        var then2Called = false;
        applyPromise.then(function (data) {
            thenCalled = true;
            expect(data).toBe(1);
            return 2;
        }).then(function (data) {
            then2Called = true;
            expect(data).toBe(2);
        }).finally(function () {
            finallyCalled = true;
        });
        jasmine.clock().tick(2);
        expect(thenCalled).toBe(true);
        expect(then2Called).toBe(true);
        expect(finallyCalled).toBe(true);
    });
    it("Promise all test", function () {
        var applyPromise = new Monad_1.Promise(function (apply, reject) {
            setTimeout(function () {
                apply(1);
            }, 1);
        });
        var applyPromise2 = new Monad_1.Promise(function (apply, reject) {
            setTimeout(function () {
                apply(2);
            }, 1);
        });
        var applyPromise3 = Monad_1.Promise.all(applyPromise, applyPromise2);
        var finallyCalled = false;
        var thenCalled = false;
        var then2Called = false;
        applyPromise.then(function (data) {
            thenCalled = true;
            expect(data).toBe(1);
            return 2;
        });
        applyPromise2.then(function (data) {
            then2Called = true;
            expect(data).toBe(2);
            return 2;
        });
        applyPromise3.finally(function () {
            finallyCalled = true;
        });
        jasmine.clock().tick(4);
        expect(thenCalled).toBe(true);
        expect(then2Called).toBe(true);
        expect(finallyCalled).toBe(true);
    });
    it("Promise race test", function () {
        var applyPromise = new Monad_1.Promise(function (apply, reject) {
            setTimeout(function () {
                apply(1);
            }, 1);
        });
        var applyPromise2 = new Monad_1.Promise(function (apply, reject) {
            setTimeout(function () {
                apply(2);
            }, 6);
        });
        var applyPromise3 = Monad_1.Promise.race(applyPromise, applyPromise2);
        var finallyCalled = false;
        var thenCalled = false;
        var then2Called = false;
        applyPromise.then(function (data) {
            thenCalled = true;
            expect(data).toBe(1);
            return 2;
        });
        applyPromise2.then(function (data) {
            then2Called = true;
            expect(data).toBe(2);
            return 2;
        });
        applyPromise3.then(function (val) {
            finallyCalled = true;
        });
        jasmine.clock().tick(4);
        expect(thenCalled || then2Called).toBe(true);
        expect(then2Called).toBe(false);
        expect(finallyCalled).toBe(true);
    });
    it("Promise chain test", function () {
        var chainExecuted = false;
        var applyPromise = new Monad_1.Promise(function (apply, reject) {
            setTimeout(function () {
                apply(1);
            }, 1);
        });
        applyPromise.then(function () {
            return new Monad_1.Promise(function (apply, reject) {
                setTimeout(function () {
                    apply(2);
                }, 6);
            });
        }).then(function () {
            chainExecuted = true;
        });
        jasmine.clock().tick(8);
        expect(chainExecuted).toBe(true);
    });
    it("Promise chain2 test", function () {
        var chainExecuted = false;
        var applyPromise = new Monad_1.Promise(function (apply, reject) {
            setTimeout(function () {
                reject(1);
            }, 1);
        });
        applyPromise.catch(function () {
            return new Monad_1.Promise(function (apply, reject) {
                setTimeout(function () {
                    apply(2);
                }, 6);
            });
        }).then(function () {
            chainExecuted = true;
        });
        jasmine.clock().tick(8);
        expect(chainExecuted).toBe(true);
    });
    it("Promise chain3 test", function () {
        var chainExecuted = false;
        var promise2Called = false;
        var promise3Called = false;
        var promise4Called = false;
        var applyPromise = new Monad_1.Promise(function (apply, reject) {
            setTimeout(function () {
                reject(1);
            }, 1);
        }).catch(function () {
            return new Monad_1.Promise(function (apply, reject) {
                setTimeout(function () {
                    apply(2);
                }, 6);
            });
        }).then(function () {
            chainExecuted = true;
            return Monad_1.Promise.reject(true);
        }).catch(function (val) {
            promise4Called = val;
        });
        var applyPromise2 = new Monad_1.Promise(function (apply, reject) {
            setTimeout(function () {
                reject(1);
            }, 1);
        }).then(function () {
            promise2Called = true;
        });
        var applyPromise3 = Monad_1.Promise.all(applyPromise, applyPromise2).then(function () {
            promise3Called = true;
        });
        jasmine.clock().tick(8);
        expect(chainExecuted).toBe(true);
        expect(promise3Called).toBe(true);
        expect(promise4Called).toBe(true);
    });
    it("Promise resolve test", function () {
        var promisCalled = false;
        var original = Monad_1.Promise.resolve(true);
        var cast = Monad_1.Promise.resolve(original);
        cast.then(function (v) {
            promisCalled = true;
            expect(v).toBe(true);
        });
        jasmine.clock().tick(8);
        expect(promisCalled).toBe(true);
    });
    it("Promise reject test", function () {
        var promisCalled = false;
        var original = Monad_1.Promise.resolve(true);
        var original2 = Monad_1.Promise.resolve(original);
        var cast = Monad_1.Promise.reject(original2);
        cast.catch(function (v) {
            promisCalled = true;
            expect(v).toBe(true);
        });
        jasmine.clock().tick(8);
        expect(promisCalled).toBe(true);
    });
});
