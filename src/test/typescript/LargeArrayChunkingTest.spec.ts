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

/*
 * AI-GENERATED FILE
 * This file was generated with the assistance of Claude Code (Anthropic).
 * Generated on: 2026-06-11
 * Reviewed by:  werpu
 *
 * The content has been reviewed and approved by a human developer.
 * All standard project quality and license requirements apply.
 */

import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Es2019ArrayFrom, pushChunked, _Es2019ArrayFromArr } from '../../main/typescript/Es2019Array';
import { Stream, LazyStream } from '../../main/typescript/Stream';
import { ArrayStreamDataSource } from '../../main/typescript/SourcesCollectors';
import { Lang } from '../../main/typescript/Lang';
import { append } from '../../main/typescript/AssocArray';
import { DomQuery } from '../../main/typescript/DomQuery';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

/*
 * regression tests for "RangeError: Maximum call stack size exceeded"
 * spreading arrays beyond ~65k elements into a function call
 * (fn(...data), new Cls(...data), push(...data)) overflows the
 * argument stack, all bulk operations therefore must pass arrays
 * directly and copy them over in chunks
 */
const LARGE_SIZE = 200000;

function largeNumberArray(): number[] {
    const data = new Array(LARGE_SIZE);
    for (let i = 0; i < data.length; i++) {
        data[i] = i;
    }
    return data;
}

/**
 * full sequence verification, every element must match its expected value,
 * which proves that the chunking kept the order intact and neither dropped,
 * duplicated nor replaced any element - returns the first mismatch as a
 * readable string, or null if everything is in order
 */
function firstMismatch<T>(actual: ArrayLike<T>, expectedAt: (pos: number) => T, expectedLength: number): string | null {
    if (actual.length !== expectedLength) {
        return `length ${actual.length} != expected ${expectedLength}`;
    }
    for (let i = 0; i < expectedLength; i++) {
        if (actual[i] !== expectedAt(i)) {
            return `index ${i}: ${actual[i]} != expected ${expectedAt(i)}`;
        }
    }
    return null;
}

describe('large array chunking tests', () => {

    it('pushChunked must append large arrays complete and in order', () => {
        const target: number[] = [-1];
        pushChunked(target, largeNumberArray());
        expect(firstMismatch(target, pos => pos - 1, LARGE_SIZE + 1)).to.eq(null);
    });

    it('Es2019ArrayFrom must build large arrays complete and in order', () => {
        const arr = Es2019ArrayFrom(largeNumberArray());
        expect(firstMismatch(arr, pos => pos, LARGE_SIZE)).to.eq(null);
        expect(arr.flatMap(item => [item])[LARGE_SIZE - 1]).to.eq(LARGE_SIZE - 1);
    });

    it('the Es2019Array shim must handle large arrays complete and in order', () => {
        const arr = _Es2019ArrayFromArr(largeNumberArray());
        expect(firstMismatch(arr, pos => pos, LARGE_SIZE)).to.eq(null);
        const mapped = arr.map(item => item + 1);
        expect(firstMismatch(mapped, pos => pos + 1, LARGE_SIZE)).to.eq(null);
        const filtered = arr.filter(item => item % 2 == 0);
        expect(firstMismatch(filtered, pos => pos * 2, LARGE_SIZE / 2)).to.eq(null);
    });

    it('Lang.objToArray must handle large array-likes complete and in order', () => {
        const arrayLike = { length: LARGE_SIZE } as any;
        for (let i = 0; i < LARGE_SIZE; i++) {
            arrayLike[i] = i;
        }
        const arr = Lang.objToArray<number>(arrayLike);
        expect(firstMismatch(arr, pos => pos, LARGE_SIZE)).to.eq(null);
    });

    it('Stream.ofArr must process large arrays complete and in order', () => {
        const collected = Stream.ofArr(largeNumberArray())
            .map(item => item + 1)
            .filter(item => item > 0)
            .value;
        expect(firstMismatch(collected, pos => pos + 1, LARGE_SIZE)).to.eq(null);
    });

    it('LazyStream.ofArr must process large arrays complete and in order', () => {
        const collected = LazyStream.ofArr(largeNumberArray())
            .map(item => item + 1)
            .value;
        expect(firstMismatch(collected, pos => pos + 1, LARGE_SIZE)).to.eq(null);
    });

    it('ArrayStreamDataSource.ofArray must stream large arrays complete and in order', () => {
        const ds = ArrayStreamDataSource.ofArray(largeNumberArray());
        let cnt = 0;
        while (ds.hasNext()) {
            expect(ds.next()).to.eq(cnt);
            cnt++;
        }
        expect(cnt).to.eq(LARGE_SIZE);
    });

    it('AssocArray append must append large value arrays complete and in order', () => {
        const target: { [key: string]: any } = { existing: [-1] };
        append(target, "existing").value = largeNumberArray();
        expect(firstMismatch(target.existing, pos => pos - 1, LARGE_SIZE + 1)).to.eq(null);
    });

    it('DomQuery must accept element arrays beyond the argument stack limit', function () {
        // headroom for slow ci machines only, a passing run takes well under a second
        this.timeout(10000);
        const ELEM_CNT = 70000;
        const dom = new JSDOM(`<!DOCTYPE html><html lang="en"><body></body></html>`);
        (global as any).window = dom.window;
        (global as any).document = dom.window.document;
        try {
            const elems: Element[] = new Array(ELEM_CNT);
            for (let i = 0; i < ELEM_CNT; i++) {
                elems[i] = dom.window.document.createElement("div");
            }
            const dq = new DomQuery(elems);
            // identity check, every single element must be taken over in order
            expect(firstMismatch(dq.values, pos => elems[pos], ELEM_CNT)).to.eq(null);

            // re-wrapping must run through the chunk-safe DomQuery branch as well
            const rewrapped = new DomQuery(dq);
            expect(firstMismatch(rewrapped.values, pos => elems[pos], ELEM_CNT)).to.eq(null);
        } finally {
            delete (global as any).document;
            (global as any).window = {};
        }
    });
});

/*
 * behavioral regression tests for the code paths which were rewritten
 * to be chunk-safe (no functional change intended, hence pinned here)
 */
describe('chunk-safe refactoring behavior tests', () => {

    it('the Es2019Array shim concat/reverse/slice/splice must keep their semantics', () => {
        expect([..._Es2019ArrayFromArr([1, 2, 3]).concat([4, 5], 6)]).to.deep.eq([1, 2, 3, 4, 5, 6]);
        expect([..._Es2019ArrayFromArr([1, 2, 3]).reverse()]).to.deep.eq([3, 2, 1]);
        expect([..._Es2019ArrayFromArr([1, 2, 3, 4]).slice(1, 3)]).to.deep.eq([2, 3]);

        const spliceArr = _Es2019ArrayFromArr([1, 2, 3, 4]);
        const removed = spliceArr.splice(1, 2);
        expect([...removed]).to.deep.eq([2, 3]);
        // note: the shim proxies index access to the mutated backing array,
        // but does not re-sync its own length on splice (pre-existing quirk),
        // so we assert via the index read path here
        expect(spliceArr[0]).to.eq(1);
        expect(spliceArr[1]).to.eq(4);
        expect([...spliceArr.slice(0)]).to.deep.eq([1, 4]);

        // the returned arrays must keep the shim delegation intact
        expect(_Es2019ArrayFromArr([1, 2]).concat([3]).flatMap(item => [item, item]).length).to.eq(6);
    });

    describe('DomQuery dom behavior', () => {
        let dom: any;

        beforeEach(function () {
            dom = new JSDOM(`<!DOCTYPE html><html lang="en"><body>
                <div id="target1"><span id="existing1"></span></div>
                <div id="target2"><span id="existing2"></span></div>
            </body></html>`);
            (global as any).window = dom.window;
            (global as any).document = dom.window.document;
        });

        afterEach(function () {
            delete (global as any).document;
            (global as any).window = {};
        });

        function newDivs(ids: string[]): DomQuery {
            return new DomQuery(ids.map(id => {
                const div = dom.window.document.createElement("div");
                div.id = id;
                return div;
            }));
        }

        it('prepend must insert the elements before the existing children in order', () => {
            const target = DomQuery.byId("target1");
            target.prepend(newDivs(["n1", "n2"]));
            const childIds = target.childNodes.asArray.map(item => item.nodeId);
            expect(childIds).to.deep.eq(["n1", "n2", "existing1"]);
        });

        it('prependTo must insert the elements before the existing children in order', () => {
            const target = DomQuery.byId("target2");
            newDivs(["n3", "n4"]).prependTo(target);
            const childIds = target.childNodes.asArray.map(item => item.nodeId);
            expect(childIds).to.deep.eq(["n3", "n4", "existing2"]);
        });

        it('prepend must keep the element order across chunk boundaries', function () {
            // headroom for slow ci machines only, a passing run takes well under a second
            this.timeout(10000);
            // more than one 30k chunk, so the reverse chunked prepend is exercised
            const ELEM_CNT = 35000;
            const target = DomQuery.byId("target1");
            const elems: Element[] = new Array(ELEM_CNT);
            for (let i = 0; i < ELEM_CNT; i++) {
                const div = dom.window.document.createElement("div");
                div.id = "n" + i;
                elems[i] = div;
            }
            target.prepend(new DomQuery(elems));

            // full order verification: every prepended element must be present
            // exactly once, in order and across the chunk boundaries, with the
            // pre-existing child untouched at the end
            // the ids are extracted via a single serialization pass - indexing
            // a live jsdom HTMLCollection is O(n) per access, a full indexed
            // walk over 35k children degenerates to O(n^2) and runs for minutes
            const html = (target.getAsElem(0).value as Element).innerHTML;
            const ids = (html.match(/id="[^"]+"/g) ?? []).map(match => match.slice(4, -1));
            const expectedId = (pos: number) => pos < ELEM_CNT ? "n" + pos : "existing1";
            expect(firstMismatch(ids, expectedId, ELEM_CNT + 1)).to.eq(null);
        });

        it('the offset getters must sum up to numbers (offsetTop NaN regression)', () => {
            // jsdom reports all offsets as 0, the point here is: a number, not NaN
            const probe = DomQuery.byId("target1").concat(DomQuery.byId("target2"));
            expect(probe.offsetTop).to.eq(0);
            expect(probe.offsetLeft).to.eq(0);
            expect(probe.offsetWidth).to.eq(0);
            expect(probe.offsetHeight).to.eq(0);
        });
    });
});
