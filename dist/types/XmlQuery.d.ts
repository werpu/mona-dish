import { Optional } from "./Monad";
export declare class XMLQuery {
    private rootNode;
    constructor(...rootNode: Array<any>);
    static fromString(data: string): XMLQuery;
    static parseXML(txt: string): XMLQuery;
    private static _parseXML;
    isAbsent(): boolean;
    isPresent(): boolean;
    readonly length: number;
    private _getIf;
    getIf(...path: Array<string>): XMLQuery;
    get(pos: number): XMLQuery;
    readonly value: Array<Element>;
    readonly childNodes: XMLQuery;
    eachElem(func: (item: Node, cnt?: number) => any): XMLQuery;
    each(func: (item: XMLQuery, cnt?: number) => any): XMLQuery;
    private _byTagName;
    byTagName(tagName: string): XMLQuery;
    isXMLParserError(): boolean;
    textContent(joinstr: string): string;
    parserErrorText(joinstr: string): string;
    getAttribute(key: string): Optional<string>;
    toString(): string;
    readonly cDATAAsString: string;
    static absent: XMLQuery;
}
