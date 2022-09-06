"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.StoreRegistry = void 0;
/**
 * store registry to collect the annotation data
 */
var store_1 = require("@ngrx/store");
var StoreRegistry = /** @class */ (function () {
    function StoreRegistry() {
        this.data = {};
    }
    return StoreRegistry;
}());
exports.StoreRegistry = StoreRegistry;
var storeRegistry = new StoreRegistry();
/**
 * store marker optional name
 * @param name
 * @constructor
 */
function Store(name) {
    return function (constructor) {
        var finalName = name !== null && name !== void 0 ? name : constructor.name;
        //we reserve the name
        constructor.__actions = [];
        constructor.__finalName = finalName;
        constructor.__actionDefinitions.forEach(function (actionDefinition) {
            constructor.__actions.push(actionDefinition.actionFactory(finalName));
        });
        var reducers = constructor.__actionDefinitions.map(function (actionDefinition) { return actionDefinition.reducer; });
        constructor.__reducer = store_1.createReducer.apply(void 0, __spreadArray([constructor.__initialState], __read(reducers), false));
    };
}
function Action(name) {
    return function (target, propertyKey, descriptor) {
        var finalName = name !== null && name !== void 0 ? name : propertyKey;
        target.__actionDefinitions = target.__actionDefinitions || [];
        var actionDefinition = {
            actionFactory: function (storeName) { return (0, store_1.createAction)("[".concat(storeName, "] ").concat(finalName)); },
            reducer: function (state) { return target[propertyKey](state); }
        };
        target.__actionDefinitions.push(actionDefinition);
        var oldFunc = target[propertyKey];
        //TODO add triggers for the function here
        target[propertyKey + "_trigger"] = function (payload) {
            target.__store.dispatch();
        };
    };
}
function InitialState(target, propertyKey, descriptor) {
    //target.prototype.__initialState =
    target.__initialState = target[propertyKey]();
}
var TestClass = /** @class */ (function () {
    function TestClass() {
    }
    TestClass.initialState = function () { return 1; };
    ;
    TestClass.action1 = function (state, payload) {
        return state + 1;
    };
    // @Selector
    TestClass.value = function (state, props) {
        return state;
    };
    __decorate([
        InitialState
    ], TestClass, "initialState", null);
    __decorate([
        Action("increment")
    ], TestClass, "action1", null);
    TestClass = __decorate([
        Store("foobaz")
    ], TestClass);
    return TestClass;
}());
//# sourceMappingURL=StoreRegistry.js.map