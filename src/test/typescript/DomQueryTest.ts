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
        <div />
        <div />
        <div />
        <div />
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

        expect(probe1.value.length).to.be.eq(1);
        expect(probe2.value.length > 1).to.be.true;
    });


});
