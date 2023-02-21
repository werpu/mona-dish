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
import {describe} from "mocha";
import { expect } from "chai";
import {Es2019Array} from "../../main/typescript/Es2019Array";


describe('Extended tests', function () {

    let arr: Es2019Array<any>;

    let origFlatmap: any = null;
    let origFlat: any = null;
    beforeEach(function () {
        if(Array.prototype.flatMap) {
            origFlatmap = Array.prototype.flatMap;
            // we remove the flatmap from the array
            // so that our custom function can take over
            delete Array.prototype.flatMap;
            origFlat = Array.prototype.flat;
            // we remove the flatmap from the array
            // so that our custom function can take over
            delete Array.prototype.flatMap;
            delete Array.prototype.flat;
        }
    });

    after(function () {
        Array.prototype.flatMap = origFlatmap;
        Array.prototype.flat = origFlat;
    })

    it("must handle flatmap correctly", () => {
        arr = new Es2019Array<any>("10", "20", "30", ["40", "50"], "60")
        let retArr = arr.flatMap((item => item) , true);

        expect(retArr.length).to.eq(6);

    });

    it("must handle deeply nested items correctly", () => {
        arr = new Es2019Array<any>("10", "20", "30", ["40", "50", ["55", "56"]], "60")
        let retArr = arr.flatMap((item => item) , true).flatMap(item=>item);

        //second nesting level cannot be flatmapped, flatmap only works on one level usually
        //TODO this needs further investigation
        expect(retArr.length).to.eq(8);

    });

    it("must keep the order", () => {
        arr = new Es2019Array<any>("10", "20", "30", ["40", "50", ["55", "56"]], "60")
        let retArr = arr.flatMap((item => item) , true).flatMap((item => item) , true);

        expect(retArr.length).to.eq(8);
        let result = new Es2019Array<any>("10", "20", "30", "40", "50", ["55", "56"], "60").flatMap(item => item);

        retArr.forEach((item, pos) => {
            expect(item).to.eq(result[pos]);
        })

    });

    it("must flatten properly", () => {
        arr = new Es2019Array<any>(...[[[1, 2]], [[3, 4]], [[5, 6]]]);
        let flattened = arr.flat();
        expect(flattened[0][0]).to.eq(1);
        expect(flattened[2][1]).to.eq(6);

        flattened = arr.flat(3);
        expect(flattened[0]).to.eq(1);
        expect(flattened[5]).to.eq(6);
    })
});
