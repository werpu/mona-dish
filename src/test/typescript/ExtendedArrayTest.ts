import {describe} from "mocha";
import { expect } from "chai";
import {ExtendedArray} from "../../main/typescript/ExtendedArray";

describe('Extended tests', function () {

    let arr: ExtendedArray<any>;

    beforeEach(function () {

    });

    it("must handle flatmap correctly", () => {
        arr = new ExtendedArray<any>("10", "20", "30", ["40", "50"], "60")
        let retArr = arr.flatMap((item => item) , true);

        expect(retArr.length).to.eq(6);

    });

    it("must handle deeply nested items correctly", () => {
        arr = new ExtendedArray<any>("10", "20", "30", ["40", "50", ["55", "56"]], "60")
        let retArr = arr.flatMap((item => item) , true);

        //second nesting level cannot be flatmapped, flatmap only works on one level usually
        //TODO this needs further investigation
        expect(retArr.length).to.eq(7);

    });

  /*  it("must keep the order", () => {
        arr = new ExtendedArray<any>("10", "20", "30", ["40", "50", ["55", "56"]], "60")
        let retArr = arr.flatMap((item => item) , true);

        expect(retArr.length).to.eq(7);
        let result = new ExtendedArray<any>("10", "20", "30", "40", "50", ["55", "56"], "60");

        retArr.forEach((item, pos) => {
            expect(item).to.eq(result[pos]);
        })

    });*/
});
