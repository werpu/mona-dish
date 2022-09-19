import {describe} from "mocha";
import {XMLQuery} from "../../main/typescript";
import {expect} from "chai";
import {it} from "mocha";

let errorProbe = `<error>
                <error-name>Error</error-name>
                <error-message><![CDATA[Message]]></error-message>
          </error>`;
describe('xml query tests', () => {


    it('must handle the errorPrope correctly', () => {
        const xmlQuery = new XMLQuery(errorProbe);
        expect(xmlQuery.querySelectorAll("error-name").isPresent());
        expect(xmlQuery.querySelectorAll("error-name").textContent('')).eq('Error');
        expect(xmlQuery.querySelectorAll("error-message").isPresent());
        expect(xmlQuery.querySelectorAll("error-message").cDATAAsString).eq('Message');
    })
});

/*
          <error>
                <error-name>Error</error-name>
                <error-message><![CDATA[Message]]></error-message>
          </error>
 */