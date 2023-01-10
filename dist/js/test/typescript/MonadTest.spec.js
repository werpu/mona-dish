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
var index_1 = require("../../main/typescript/index");
var Monad_1 = require("../../main/typescript/Monad");
//TODO saveResolveTest
(0, mocha_1.describe)('optional tests', function () {
    (0, mocha_1.it)('fromnullable null', function () {
        (0, chai_1.expect)(index_1.Optional.fromNullable(null).isPresent()).to.be.false;
        (0, chai_1.expect)(index_1.Optional.fromNullable(null).isAbsent()).to.be.true;
    });
    (0, mocha_1.it)('fromnullable absent', function () {
        (0, chai_1.expect)(index_1.Optional.fromNullable(index_1.Optional.absent).isPresent()).to.be.false;
    });
    (0, mocha_1.it)('fromnullable value', function () {
        (0, chai_1.expect)(index_1.Optional.fromNullable(1).isPresent()).to.be.true;
        (0, chai_1.expect)(index_1.Optional.fromNullable(1).isAbsent()).to.be.false;
    });
    (0, mocha_1.it)('flatmap/map test', function () {
        (0, chai_1.expect)(index_1.Optional.fromNullable(index_1.Optional.fromNullable(1)).value).to.be.eq(1);
        (0, chai_1.expect)(index_1.Optional.fromNullable(index_1.Optional.fromNullable(1)).value).to.be.eq(1);
    });
    (0, mocha_1.it)('flatmap2/map test', function () {
        (0, chai_1.expect)(index_1.Optional.fromNullable(index_1.Optional.fromNullable(null)).isAbsent()).to.be.true;
        (0, chai_1.expect)(index_1.Optional.fromNullable(index_1.Optional.fromNullable()).isAbsent()).to.be.true;
    });
    (0, mocha_1.it)('elvis test', function () {
        var myStruct = {
            data: {
                value: 1,
                value2: index_1.Optional.absent,
                value4: index_1.Optional.fromNullable(1)
            },
            data2: [
                { booga: "hello" },
                "hello2"
            ]
        };
        (0, chai_1.expect)(index_1.Optional.fromNullable(myStruct).getIf("data", "value").value).to.be.eq(1);
        (0, chai_1.expect)(index_1.Optional.fromNullable(index_1.Optional.fromNullable(myStruct)).getIf("data", "value2").isAbsent()).to.be.true;
        (0, chai_1.expect)(index_1.Optional.fromNullable(myStruct).getIf("data", "value3").isAbsent()).to.be.true;
        (0, chai_1.expect)(index_1.Optional.fromNullable(myStruct).getIf("data", "value4").value).to.be.eq(1);
        (0, chai_1.expect)(index_1.Optional.fromNullable(index_1.Optional.fromNullable(myStruct)).getIf("data2[0]", "booga").isPresent()).to.be.true;
        (0, chai_1.expect)(index_1.Optional.fromNullable(index_1.Optional.fromNullable(myStruct)).getIf("data2[1]").isPresent()).to.be.true;
        (0, chai_1.expect)(index_1.Optional.fromNullable(index_1.Optional.fromNullable(myStruct)).getIf("data2").isPresent()).to.be.true;
        (0, chai_1.expect)(index_1.Optional.fromNullable(index_1.Optional.fromNullable(myStruct)).getIf("data2", "hello2").isPresent()).false;
        (0, chai_1.expect)(index_1.Optional.fromNullable(index_1.Optional.fromNullable(index_1.Optional.fromNullable(myStruct))).getIf("data2[0]", "booga").value).to.be.eq("hello");
    });
});
(0, mocha_1.describe)('Config tests', function () {
    var setup = function () {
        return new index_1.Config({
            data: {
                value: 1,
                value2: index_1.Optional.absent,
                value3: null
            },
            data2: [
                { booga: "hello" },
                "hello2"
            ]
        });
    };
    function structure(myStruct) {
        (0, chai_1.expect)(index_1.Optional.fromNullable(myStruct).getIf("data", "value").value).to.be.eq(1);
        (0, chai_1.expect)(index_1.Optional.fromNullable(index_1.Optional.fromNullable(myStruct)).getIf("data", "value2").isAbsent()).to.be.true;
        (0, chai_1.expect)(index_1.Optional.fromNullable(myStruct).getIf("data", "value3").isAbsent()).to.be.true;
        (0, chai_1.expect)(index_1.Optional.fromNullable(myStruct).getIf("data", "value4").isAbsent()).to.be.true;
        (0, chai_1.expect)(index_1.Optional.fromNullable(index_1.Optional.fromNullable(myStruct)).getIf("data2[0]", "booga").isPresent()).to.be.true;
        (0, chai_1.expect)(index_1.Optional.fromNullable(index_1.Optional.fromNullable(myStruct)).getIf("data2[1]").isPresent()).to.be.true;
        (0, chai_1.expect)(index_1.Optional.fromNullable(index_1.Optional.fromNullable(myStruct)).getIf("data2").isPresent()).to.be.true;
        (0, chai_1.expect)(index_1.Optional.fromNullable(index_1.Optional.fromNullable(myStruct)).getIf("data2", "hello2").isPresent()).false;
        (0, chai_1.expect)(index_1.Optional.fromNullable(index_1.Optional.fromNullable(myStruct)).getIf("data2[0]", "booga").value).to.be.eq("hello");
    }
    function structureBroken(myStruct) {
        var valx = index_1.Optional.fromNullable(myStruct).getIf("data", "value").value;
        (0, chai_1.expect)(!!index_1.Optional.fromNullable(myStruct).getIf("data", "value").value).to.be.false;
    }
    (0, mocha_1.it)('simple config', function () {
        var config = setup();
        config.assign("hello", "world", "from").value = "me";
        (0, chai_1.expect)(index_1.Config.fromNullable(config.getIf("hello", "world", "from")).value).to.be.eq("me");
        (0, chai_1.expect)(config.getIf("hello", "booga", "from").isAbsent()).to.be.eq(true);
        structure(config.value);
    });
    (0, mocha_1.it)('simple config2', function () {
        var config = setup();
        config.assign("hello", "world", "from").value = "me";
        (0, chai_1.expect)(config.value.hello.world.from).to.be.eq("me");
        structure(config.value);
    });
    (0, mocha_1.it)('array config', function () {
        var config = setup();
        config.assign("hello[5]", "world[3]", "from[5]").value = "me";
        console.debug(JSON.stringify(config.toJson()));
        (0, chai_1.expect)(config.getIf("hello[5]", "world[3]", "from[5]").value).to.be.eq("me");
        (0, chai_1.expect)(config.value.hello[5].world[3].from[5]).to.be.eq("me");
        structure(config.value);
    });
    (0, mocha_1.it)('array config2', function () {
        var config = setup();
        config.assign("[5]", "world[3]", "from").value = "me";
        (0, chai_1.expect)(config.getIf("[5]", "world[3]", "from").value).to.be.eq("me");
        console.debug(JSON.stringify(config.toJson()));
        (0, chai_1.expect)(config.value[5].world[3].from).to.be.eq("me");
        structureBroken(config.value);
    });
    (0, mocha_1.it)('array config3', function () {
        var config = setup();
        config.assign("[5]", "[3]", "from").value = "me";
        (0, chai_1.expect)(config.getIf("[5]", "[3]", "from").value).to.be.eq("me");
        console.debug(JSON.stringify(config.toJson()));
        (0, chai_1.expect)(config.value[5][3].from).to.be.eq("me");
        structureBroken(config.value);
    });
    (0, mocha_1.it)('array config4', function () {
        var config = setup();
        config.assign("[5]", "[3]", "[2]").value = "me";
        (0, chai_1.expect)(config.getIf("[5]", "[3]", "[2]").value).to.be.eq("me");
        console.debug(JSON.stringify(config.toJson()));
        (0, chai_1.expect)(config.value[5][3][2]).to.be.eq("me");
        structureBroken(config.value);
    });
    (0, mocha_1.it)('array config5', function () {
        var config = setup();
        config.assign("[5]", "world[3]", "from[2]").value = "me";
        (0, chai_1.expect)(config.getIf("[5]", "world[3]", "from[2]").value).to.be.eq("me");
        console.debug(JSON.stringify(config.toJson()));
        (0, chai_1.expect)(config.value[5].world[3].from[2]).to.be.eq("me");
        structureBroken(config.value);
    });
    (0, mocha_1.it)('resolve test', function () {
        var probe = new index_1.Config({});
        probe.assign("test1", "test2", "test3").value = "hello";
        (0, chai_1.expect)(probe.resolve(function (root) { return root.test1.test2.test3; }).value).to.eq("hello");
        (0, chai_1.expect)(probe.resolve(function (root) { return root.test1.test2.testborked; }).isAbsent()).to.be.true;
        (0, chai_1.expect)(probe.resolve(function (root) { return root.test1.testborked.test3; }).isAbsent()).to.be.true;
    });
    (0, mocha_1.it)('Config append must work from single/zero element to multiple elements', function () {
        var probe = new index_1.Config({});
        probe.append("test1", "test2", "test3").value = "hello";
        (0, chai_1.expect)(probe.getIf("test1", "test2", "test3").value.length).to.eq(1);
        (0, chai_1.expect)(probe.getIf("test1", "test2", "test3").value[0]).to.eq("hello");
        probe.append("test1", "test2", "test3").value = "hello2";
        (0, chai_1.expect)(probe.getIf("test1", "test2", "test3").value.length).to.eq(2);
        (0, chai_1.expect)(probe.getIf("test1", "test2", "test3").value[0]).to.eq("hello");
        (0, chai_1.expect)(probe.getIf("test1", "test2", "test3").value[1]).to.eq("hello2");
        probe.assign("test1", "test2", "test3[0]").value = "altered";
        //altered assignment
        (0, chai_1.expect)(probe.getIf("test1", "test2", "test3").value[0]).to.eq("altered");
        (0, chai_1.expect)(probe.getIf("test1", "test2", "test3").value[1]).to.eq("hello2");
        try {
            probe.append("test1", "test2", "test3[0]").value = "hello2";
            (0, chai_1.expect)(true).to.be.false;
        }
        catch (ex) {
        }
    });
});
(0, mocha_1.describe)('Typed Config tests', function () {
    var _a, _b, _c, _d, _e;
    /**
     * a really complicated config def, which we never will have
     */
    var configDef = (_a = /** @class */ (function () {
            function class_1() {
            }
            return class_1;
        }()),
        _a.data = (_b = /** @class */ (function () {
                function class_2() {
                }
                return class_2;
            }()),
            _b.value = Monad_1.CONFIG_VALUE,
            _b.value2 = Monad_1.CONFIG_VALUE,
            _b.value3 = Monad_1.CONFIG_VALUE,
            _b),
        _a.data2 = [(_c = /** @class */ (function () {
                    function class_3() {
                    }
                    return class_3;
                }()),
                _c.booga = Monad_1.CONFIG_VALUE,
                _c.data3 = [
                    (_d = /** @class */ (function () {
                            function class_4() {
                            }
                            return class_4;
                        }()),
                        _d.booga2 = Monad_1.CONFIG_VALUE,
                        _d),
                    Monad_1.CONFIG_VALUE
                ],
                _c), [{ data4: Monad_1.CONFIG_VALUE }], Monad_1.CONFIG_VALUE],
        _a.data3 = [(_e = /** @class */ (function () {
                    function class_5() {
                    }
                    return class_5;
                }()),
                _e.data4 = Monad_1.CONFIG_ANY //whatever comes below does not have a clear structure anymore
            ,
                _e)],
        _a);
    var config = new index_1.Config({
        data: {
            value: 1,
            value2: index_1.Optional.absent,
            value3: null
        },
        data2: [
            {
                booga: "hello",
                data3: [{ booga2: "hellobooga2" }]
            },
            "hello2",
            [{
                    data4: "hello4"
                }, "hello4_1"]
        ],
        data3: [
            {
                data4: {
                    data5: "hello"
                }
            }
        ]
    }, configDef);
    var setup = function () {
        return { config: config, configDef: configDef };
    };
    (0, mocha_1.it)("must resolve base static data", function () {
        global["__Debug__"] = true;
        var _a = setup(), config = _a.config, configDef = _a.configDef;
        var val1 = config.getIf("data", "value").value;
        (0, chai_1.expect)(val1).eq(1);
        var val2 = config.getIf("data2[0]", "booga").value;
        (0, chai_1.expect)(val2).eq("hello");
        var val3 = config.getIf("data2[1]").value;
        (0, chai_1.expect)(val3).eq("hello2");
        val3 = config.getIf("data2[1]").value;
        (0, chai_1.expect)(val3).eq("hello2");
        val3 = config.getIf("data2[0]", "data3[0]", "booga2").value;
        (0, chai_1.expect)(val3).eq("hellobooga2");
        global["debug"] = true;
        val3 = config.getIf("data2[2]", "[0]", "data4").value;
        (0, chai_1.expect)(val3).eq("hello4");
        val3 = config.getIf("data2[2][0].data4").value;
        (0, chai_1.expect)(val3).eq("hello4");
        val3 = config.getIf("data2[2]", "[1]").value;
        (0, chai_1.expect)(val3).eq("hello4_1");
        val3 = config.getIf("data2[2][1]").value;
        (0, chai_1.expect)(val3).eq("hello4_1");
        val3 = config.getIf("data3[0].data4.data5").value;
        (0, chai_1.expect)(val3).eq("hello");
        try {
            config.getIf("data2[2][1].orga").value;
            (0, chai_1.expect)(true).to.be.false;
        }
        catch (err) {
            (0, chai_1.expect)(true).to.be.true;
        }
        (0, chai_1.expect)(config.getIf("data3[1].data4.data5").isAbsent()).eq(true);
        try {
            config.getIf("data2[2][0]", "data5").value;
            (0, chai_1.expect)(true).to.be.false;
        }
        catch (err) {
            (0, chai_1.expect)(true).to.be.true;
        }
        try {
            config.getIf("data2[2][0].data5").value;
            (0, chai_1.expect)(true).to.be.false;
        }
        catch (err) {
            (0, chai_1.expect)(true).to.be.true;
        }
    });
});
//# sourceMappingURL=MonadTest.spec.js.map