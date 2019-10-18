import {describe} from "mocha";
import {Stream} from "../../main/typescript/Stream";
import { expect } from "chai";
import {LazyStream} from "../../main/typescript/LazyStream";

describe('early stream tests', () => {

    beforeEach(function () {
        this.probe = [1,2,3,4,5];
    });

    it("must iterate normal", function () {
        let stream = Stream.of<number>(...this.probe);
        let sum = 0;
        stream.each((data) => {
            sum = sum+data;
        });
        expect(sum).to.eq(15);

        let stream2 = LazyStream.of<number>(...this.probe);
        sum = 0;
        stream2.each((data) => {
            sum = sum+data;
        });
        expect(sum).to.eq(15);
    })

    it("must iterate filtered", function () {
        let stream = Stream.of<number>(...this.probe);
        let sum = 0;
        stream.filter((data) => data != 5).each((data) => {
            sum = sum+data;
        });
        expect(sum).to.eq(10);

        let stream2 = LazyStream.of<number>(...this.probe);
        sum = 0;
        stream2.filter((data) => data != 5).each((data) => {
            sum = sum+data;
        });
        expect(sum).to.eq(10);
    })

    it("must onElem", function () {
        let stream = Stream.of<number>(...this.probe);
        let sum = 0;
        let sum2 = stream.filter((data) => data != 5).onElem((data) => {
            sum = sum+data;
        }).reduce((el1, el2) => el1+el2);
        expect(sum).to.eq(10);
        expect(sum2).to.eq(10);

        let stream2 = LazyStream.of<number>(...this.probe);
        sum = 0;
        sum2 = stream2.filter((data) => data != 5).onElem((data) => {
            sum = sum+data;
        }).reduce((el1, el2) => el1+el2);
        expect(sum).to.eq(10);
        expect(sum2).to.eq(10);
    })


});