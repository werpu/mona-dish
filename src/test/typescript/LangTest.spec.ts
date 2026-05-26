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

import { expect } from 'chai';
import { describe, it } from 'mocha';
import {Lang} from '../../main/typescript';

import jsdom from "jsdom";
const { JSDOM } = jsdom;

const dom = new JSDOM(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    </head>
    <body>
        <div />
        <div />
        <div />
        <div />
    </body>
    </html>
    
    `)




export const window = dom.window;

class Probe {

    constructor() {
    }

    val1 = 1;
    val2 = 2;
    val3 = 3;
}

describe('Lang tests', () => {


    it('initializable', () => {
        const lang = Lang;
        expect(lang).to.exist;
    });

    it('strToArray working', () => {
        const lang = Lang;

        let arr = lang.strToArray("hello.world.from.me", /\./gi);

        expect(arr).to.exist;
        expect(arr.length).to.eq(4);
        expect(arr[3]).to.eq("me");

    });



    it('trim working', () => {
        const lang = Lang;
        let origStr = " hello world from me    ";
        let trimmed = lang.trim(origStr);
        expect(trimmed).to.exist;
        expect(trimmed).to.eq("hello world from me");

    });

    it('isString working', () => {
        const lang = Lang;
        expect(lang.isString(" ")).to.be.true;
        expect(lang.isString('')).to.be.true;
        expect(lang.isString(null)).to.be.false;
        expect(lang.isString(undefined)).to.be.false;
        expect(lang.isString(function() {return true;})).to.be.false;
        expect(lang.isString(new Probe())).to.be.false;
    });

    it('isFunc working', () => {
        const lang = Lang;
        expect(lang.isFunc(() => {})).to.be.true;
        expect(lang.isFunc(function() {return true;})).to.be.true;
        expect(lang.isFunc("blarg")).to.be.false;
        expect(lang.isFunc(new Probe())).to.be.false;
    });

    it('objToArray working', () => {
        const lang = Lang;
        let obj_probe = new Probe();
        let resultArr = lang.objToArray(obj_probe);
        expect(lang.assertType(resultArr, Array)).to.be.true;
        expect(resultArr.length).to.eq(0);
        obj_probe = window.document.body.querySelectorAll("div");
        resultArr = lang.objToArray(obj_probe);
        expect(resultArr.length).to.eq(4);
        expect(lang.assertType(resultArr, Array)).to.be.true;
    });



    it('equals ignore case test', () => {
        const lang = Lang;
        expect(lang.equalsIgnoreCase(null, null as any)).to.be.true;
        expect(lang.equalsIgnoreCase("", "")).to.be.true;
        expect(lang.equalsIgnoreCase("null", "NuLL")).to.be.true;
        expect(lang.equalsIgnoreCase("null ", "NuLL")).to.be.false;
        expect(lang.equalsIgnoreCase("null", "NuLL2")).to.be.false;

    });

});

describe('objAssign tests', () => {

    it('must copy string-keyed own enumerable properties', () => {
        const result = Lang.objAssign({}, { a: 1, b: 2 });
        expect(result.a).to.eq(1);
        expect(result.b).to.eq(2);
    });

    it('must throw TypeError for null target', () => {
        expect(() => Lang.objAssign(null)).to.throw(TypeError);
    });

    it('must throw TypeError for undefined target', () => {
        expect(() => Lang.objAssign(undefined)).to.throw(TypeError);
    });

    it('must skip null sources without throwing', () => {
        const result = Lang.objAssign({ a: 1 }, null, { b: 2 });
        expect(result.a).to.eq(1);
        expect(result.b).to.eq(2);
    });

    it('must skip undefined sources without throwing', () => {
        const result = Lang.objAssign({ a: 1 }, undefined, { b: 2 });
        expect(result.a).to.eq(1);
        expect(result.b).to.eq(2);
    });

    it('must merge multiple sources with later values overwriting earlier', () => {
        const result = Lang.objAssign({}, { a: 1, b: 1 }, { b: 2, c: 3 });
        expect(result.a).to.eq(1);
        expect(result.b).to.eq(2);
        expect(result.c).to.eq(3);
    });

    it('must return target unchanged when no sources provided', () => {
        const target = { a: 1 };
        const result = Lang.objAssign(target);
        expect(result).to.deep.eq({ a: 1 });
    });

    it('must return the same target object reference', () => {
        const target = {};
        const result = Lang.objAssign(target, { a: 1 });
        expect(result).to.equal(target);
    });

    it('must copy enumerable symbol-keyed properties (fallback path)', () => {
        const nativeAssign = (Object as any).assign;
        try {
            (Object as any).assign = undefined;
            const sym = Symbol('test');
            const source = { a: 1, [sym]: 2 };
            const result = Lang.objAssign({}, source);
            expect(result.a).to.eq(1);
            expect((result as any)[sym]).to.eq(2);
        } finally {
            (Object as any).assign = nativeAssign;
        }
    });

    it('must not copy non-enumerable symbol-keyed properties (fallback path)', () => {
        const nativeAssign = (Object as any).assign;
        try {
            (Object as any).assign = undefined;
            const sym = Symbol('hidden');
            const source = {};
            Object.defineProperty(source, sym, { value: 42, enumerable: false });
            const result = Lang.objAssign({}, source);
            expect((result as any)[sym]).to.be.undefined;
        } finally {
            (Object as any).assign = nativeAssign;
        }
    });

    it('must skip null/undefined sources in fallback path', () => {
        const nativeAssign = (Object as any).assign;
        try {
            (Object as any).assign = undefined;
            const result = Lang.objAssign({ a: 1 }, null, undefined, { b: 2 });
            expect(result.a).to.eq(1);
            expect(result.b).to.eq(2);
        } finally {
            (Object as any).assign = nativeAssign;
        }
    });

    it('must merge multiple sources correctly in fallback path', () => {
        const nativeAssign = (Object as any).assign;
        try {
            (Object as any).assign = undefined;
            const result = Lang.objAssign({}, { a: 1, b: 1 }, { b: 2, c: 3 });
            expect(result.a).to.eq(1);
            expect(result.b).to.eq(2);
            expect(result.c).to.eq(3);
        } finally {
            (Object as any).assign = nativeAssign;
        }
    });

});
