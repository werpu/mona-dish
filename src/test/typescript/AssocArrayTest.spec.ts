/*! Licensed to the Apache Software Foundation (ASF) under one or more
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
import {expect} from 'chai';
import {describe, it} from 'mocha';
import {assign} from "../../main/typescript/AssocArray";

describe('Assoc Array Helpers test', () => {
    it('simple assoc array', () => {
        const target = {};
        assign(target, "hello", "world", "from").value = "me";
        expect(target?.["hello"]?.["world"]?.["from"]).to.be.eq("me");
        expect(!target?.["hello"]?.["booga"]?.["from"]).to.be.eq(true);
    });

    it('assoc array - array config', () => {
        let config: { [key: string]: any } = {};
        assign(config,"hello[5]", "world[3]", "from[5]").value = "me";
        console.debug(JSON.stringify(config));
        expect(config?.["hello"]?.[5]?.["world"]?.[3]["from"]?.[5]).to.be.eq("me");
        expect(config?.hello[5].world[3].from[5]).to.be.eq("me");
    });

    it('assoc array - array config double arr', () => {
        let config: { [key: string]: any } = {};
        assign(config,"hello[5][3]", "from[5]").value = "me";
        console.debug(JSON.stringify(config));
        expect(config?.["hello"]?.[5]?.[3]["from"]?.[5]).to.be.eq("me");
        expect(config?.hello[5][3].from[5]).to.be.eq("me");
    });

});
