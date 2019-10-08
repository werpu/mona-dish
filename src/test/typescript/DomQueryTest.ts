import { expect } from 'chai';
import { describe, it } from 'mocha';
import {Lang} from "../../main/typescript/Lang";
import {DomQuery} from "../../main/typescript/DomQuery";


const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    </head>
    <body>
        <div id="id_1"/>
        <div id="id_2"/>
        <div id="id_3"/>
        <div id="id_4"/>
    </body>
    </html>
    
    `)

export const window = dom.window;

describe('DOMQuery tests', () => {

    before(() => {
        (<any>global).window = window;
        (<any>global).body = window.document.body;
        (<any>global).document = window.document;
        (<any>global).navigator = {
            language: "en-En"
        };
    });

    it('basic init', () => {
        let probe1 = new DomQuery(window.document.body);
        let probe2 = DomQuery.querySelectorAll("div");
        let probe3 = new DomQuery(probe1, probe2);
        let probe4 = new DomQuery(window.document.body, probe3);


        expect(probe1.value.length).to.be.eq(1);
        expect(probe2.value.length == 4).to.be.true;
        expect(probe3.value.length == 5).to.be.true;
        //still under discussion (we might index to avoid doubles)
        expect(probe4.value.length == 6).to.be.true;
    });

    it('domquery ops test filter', () => {
        let probe2 = DomQuery.querySelectorAll("div");
        probe2 = probe2.filterNode((item: DomQuery) => item.id.match((id) => id != "id_1"));
        expect(probe2.value.length == 3);
    });

    it('domquery ops test2 each', () => {
        let probe2 = DomQuery.querySelectorAll("div");
        let noIter = 0;
        probe2 = probe2.each((item, cnt) => {
            expect(noIter == cnt).to.be.true;
            noIter++;
        });
        expect(noIter == 4).to.be.true;
    });

    it('domquery ops test2 eachNode', () => {
        let probe2 = DomQuery.querySelectorAll("div");
        let noIter = 0;
        probe2 = probe2.eachNode((item, cnt) => {
            expect(item instanceof DomQuery).to.be.true;
            expect(noIter == cnt).to.be.true;
            noIter++;
        });
        expect(noIter == 4).to.be.true;
    });

    it('domquery ops test2 byId', () => {
        let probe2 = DomQuery.byId("id_1");
        expect(probe2.length == 1).to.be.true;
        probe2 = DomQuery.byTagName("div");
        expect(probe2.length == 4).to.be.true;
    });

});
