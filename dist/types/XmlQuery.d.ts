import { DomQuery } from "./DomQuery";
/**
 * xml query as specialized case for DomQuery
 */
export declare class XMLQuery extends DomQuery {
    constructor(rootNode: Document | string | DomQuery);
    isXMLParserError(): boolean;
    toString(): string;
    parserErrorText(joinstr: string): string;
    static parseXML(txt: string): XMLQuery;
    static fromString(txt: string): XMLQuery;
}
