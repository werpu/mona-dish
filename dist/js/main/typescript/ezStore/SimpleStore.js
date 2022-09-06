/**
 * A simplified rjxs store handling which adds saner patterns to the store to make it more maintainable
 * this is not or will not be part of mona-dish but maybe will get its own project
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//Idea
var MyStore = /** @class */ (function () {
    function MyStore() {
    }
    MyStore.counterIncrement = function (state) {
        return state + 1;
    };
    MyStore.counterIncrement = function (state) {
        return state - 1;
    };
    MyStore.rest = function () {
        return 1;
    };
    MyStore.state = 0;
    __decorate([
        InitialState
    ], MyStore, "state", void 0);
    __decorate([
        Action("increment")
    ], MyStore, "counterIncrement", null);
    __decorate([
        Action("decrement")
    ], MyStore, "counterIncrement", null);
    __decorate([
        Action("reset")
    ], MyStore, "rest", null);
    MyStore = __decorate([
        Store("Component Counter")
    ], MyStore);
    return MyStore;
}());
//# sourceMappingURL=SimpleStore.js.map