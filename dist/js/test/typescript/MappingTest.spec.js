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
var MappingProbes_1 = require("./MappingProbes");
var chai_1 = require("chai");
var mocha_1 = require("mocha");
(0, mocha_1.describe)('mapping tests', function () {
    (0, mocha_1.it)('must map correctly', function () {
        var probe2 = { val1: "hello from probe2" };
        var probe1 = {
            val1: "hello from probe1",
            val2: new Date(),
            val3: { "hello": probe2 },
            val4: [probe2, probe2],
            val5: probe2,
            val6: "something",
        };
        var probe1Impl = new MappingProbes_1.Probe1Impl(probe1);
        (0, chai_1.expect)(probe1Impl.val1).to.be.eq(probe1.val1);
        (0, chai_1.expect)(probe1Impl.val4[1] instanceof MappingProbes_1.Probe2Impl).to.be.eq(true);
        (0, chai_1.expect)(probe1Impl.val5 instanceof MappingProbes_1.Probe2Impl).to.be.eq(true);
        (0, chai_1.expect)(probe1Impl.val3["hello"] instanceof MappingProbes_1.Probe2Impl).to.be.eq(true);
    });
});
//# sourceMappingURL=MappingTest.spec.js.map