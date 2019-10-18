import { Config, Optional, ValueEmbedder } from "./Monad";
import { XMLQuery } from "./XmlQuery";
import { ICollector, Stream } from "./Stream";
import { LazyStream } from "./LazyStream";
export declare class ElementAttribute extends ValueEmbedder<string> {
    private element;
    private name;
    private defaultVal;
    constructor(element: DomQuery, name: string, defaultVal?: string);
    value: string;
    protected getClass(): any;
    static fromNullable(value?: any, valueKey?: string): ElementAttribute;
}
/**
 * Monadic DomNode representation, ala jquery
 * This is a thin wrapper over querySelectorAll
 * to get slim monadic support
 * to reduce implementation code on the users side.
 * This is vital for frameworks which want to rely on
 * plain dom but still do not want to lose
 * the reduced code footprint of querying dom trees and traversing
 * by using functional patterns.
 *
 * Also a few convenience methods are added to reduce
 * the code footprint of standard dom processing
 * operations like eval
 *
 * TODO add jquery fallback support, since it is supported
 * in most older systems
 * Note parts of this code still stem from the Dom.js I have written 10 years
 * ago, those parts look a little bit ancient and will be replaced over time.
 *
 */
export declare class DomQuery {
    static absent: DomQuery;
    private rootNode;
    constructor(...rootNode: Array<Element | DomQuery | Document | Array<any> | string>);
    /**
     * returns the elements of this dom tree, always as array (keep that in mind)
     */
    readonly value: Optional<Element>;
    readonly values: Element[];
    /**
     * returns the id of the first element
     */
    readonly id: ValueEmbedder<string>;
    /**
     * length of the entire query set
     */
    readonly length: number;
    /**
     * convenience method for tagName
     */
    readonly tagName: Optional<string>;
    /**
     * convenience method for nodeName
     */
    readonly nodeName: Optional<string>;
    isTag(tagName: string): boolean;
    /**
     * convenience property for type
     *
     * returns null in case of no type existing otherwise
     * the type of the first element
     */
    readonly type: Optional<string>;
    /**
     * convenience property for name
     *
     * returns null in case of no type existing otherwise
     * the name of the first element
     */
    readonly name: ValueEmbedder<string>;
    /**
     * convenience property for value
     *
     * returns null in case of no type existing otherwise
     * the value of the first element
     */
    readonly inputValue: ValueEmbedder<string>;
    readonly elements: DomQuery;
    /**
     * todo align this api with the rest of the apis
     */
    disabled: boolean;
    readonly childNodes: DomQuery;
    /**
     * binding into stream
     */
    readonly stream: Stream<DomQuery>;
    /**
     * fetches a lazy stream representation
     * lazy should be applied if you have some filters etc
     * in between, this can reduce the number of post filter operations
     * and ram usage
     * significantly because the operations are done lazily and stop
     * once they hit a dead end.
     */
    readonly lazyStream: LazyStream<DomQuery>;
    readonly asArray: Array<DomQuery>;
    /**
     * easy query selector all producer
     *
     * @param selector the selector
     * @returns a results dom query object
     */
    static querySelectorAll(selector: string): DomQuery;
    /**
     * byId producer
     *
     * @param selector id
     * @return a DomQuery containing the found elements
     */
    static byId(selector: string | DomQuery | Element): DomQuery;
    /**
     * byTagName producer
     *
     * @param selector name
     * @return a DomQuery containing the found elements
     */
    static byTagName(selector: string | DomQuery | Element): DomQuery;
    static globalEval(code: string): DomQuery;
    /**
     * builds the ie nodes properly in a placeholder
     * and bypasses a non script insert bug that way
     * @param markup the marku code
     */
    static fromMarkup(markup: string): DomQuery;
    /**
     * returns the nth element as domquery
     * from the internal elements
     * note if you try to reach a non existing element position
     * you will get back an absent entry
     *
     * @param index the nth index
     */
    get(index: number): DomQuery;
    /**
     * returns the nth element as optional of an Element object
     * @param index the number from the index
     * @param defaults the default value if the index is overrun default Optional.absent
     */
    getAsElem(index: number, defaults?: Optional<any>): Optional<Element>;
    /**
     * returns the value array< of all elements
     */
    allElems(): Array<Element>;
    /**
     * absent no values reached?
     */
    isAbsent(): boolean;
    /**
     * should make the code clearer
     * note if you pass a function
     * this refers to the active dopmquery object
     */
    isPresent(presentRunnable?: (elem?: DomQuery) => void): boolean;
    /**
     * should make the code clearer
     * note if you pass a function
     * this refers to the active dopmquery object
     *
     *
     * @param presentRunnable
     */
    ifPresentLazy(presentRunnable?: (elem?: DomQuery) => void): DomQuery;
    /**
     * remove all affected nodes from this query object from the dom tree
     */
    delete(): void;
    /**
     * query selector all on the existing dom query object
     *
     * @param selector the standard selector
     * @return a DomQuery with the results
     */
    querySelectorAll(selector: any): DomQuery;
    /**
     * core byId method
     * @param id the id to search for
     * @param includeRoot also match the root element?
     */
    byId(id: string, includeRoot?: boolean): DomQuery;
    /**
     * same as byId just for the tag name
     * @param tagName
     * @param includeRoot
     */
    byTagName(tagName: string, includeRoot?: boolean): DomQuery;
    /**
     * attr accessor, usage myQuery.attr("class").value = "bla"
     * or let value myQuery.attr("class").value
     * @param attr the attribute to set
     * @param defaultValue the default value in case nothing is presented (defaults to null)
     */
    attr(attr: string, defaultValue?: string): ElementAttribute;
    /**
     * hasclass, checks for an existing class in the class attributes
     *
     * @param clazz the class to search for
     */
    hasClass(clazz: string): boolean;
    /**
     * appends a class string if not already in the element(s)
     *
     * @param clazz the style class to append
     */
    addClass(clazz: string): DomQuery;
    /**
     * remove the style class if in the class definitions
     *
     * @param clazz
     */
    removeClass(clazz: string): DomQuery;
    /**
     * checks whether we have a multipart element in our children
     */
    isMultipartCandidate(): boolean;
    /**
     * innerHtml equivalkent
     * equivalent to jqueries html
     * as setter the html is set and the
     * DomQuery is given back
     * as getter the html string is returned
     *
     * @param inval
     */
    html(inval?: string): DomQuery | Optional<string>;
    private _mozMatchesSelector;
    /**
     * filters the current dom query elements
     * upon a given selector
     *
     * @param selector
     */
    filterSelector(selector: string): DomQuery;
    matchesSelector(selector: string): boolean;
    /**
     * easy node traversal, you can pass
     * a set of node selectors which are joined as direct childs
     *
     * not the rootnodes are not in the getIf, those are always the child nodes
     *
     * @param nodeSelector
     */
    getIf(...nodeSelector: Array<string>): DomQuery;
    eachElem(func: (item: Element, cnt?: number) => any): DomQuery;
    firstElem(func?: (item: Element, cnt?: number) => any): DomQuery;
    each(func: (item: DomQuery, cnt?: number) => any): DomQuery;
    /**
     * returns a new dom query containing only the first element max
     *
     * @param func a an optional callback function to perform an operation on the first element
     */
    first(func?: (item: DomQuery, cnt?: number) => any): DomQuery;
    /**
     * filter function which filters a subset
     *
     * @param func
     */
    filter(func: (item: DomQuery) => boolean): DomQuery;
    /**
     * global eval head appendix method
     * no other methods are supported anymore
     * @param code the code to be evaled
     * @param  nonce optional  nonce key for higher security
     */
    globalEval(code: string, nonce?: string): DomQuery;
    /**
     * detaches a set of nodes from their parent elements
     * in a browser independend manner
     * @param {Object} items the items which need to be detached
     * @return {Array} an array of nodes with the detached dom nodes
     */
    detach(): DomQuery;
    /**
     * appends the current set of elements
     * to the element or first element passed via elem
     * @param elem
     */
    appendTo(elem: DomQuery): void;
    /**
     * loads and evals a script from a source uri
     *
     * @param src the source to be loaded and evaled
     * @param defer in miliseconds execution default (0 == no defer)
     * @param charSet
     */
    loadScriptEval(src: string, defer: number, charSet: string): this;
    insertAfter(...toInsertParams: Array<DomQuery>): DomQuery;
    insertBefore(...toInsertParams: Array<DomQuery>): DomQuery;
    orElse(...elseValue: any): DomQuery;
    orElseLazy(func: () => any): DomQuery;
    parents(tagName: string): DomQuery;
    copyAttrs(sourceItem: DomQuery | XMLQuery): DomQuery;
    /**
     * resolves an attribute holder compared
     * @param attr
     */
    private resolveAttributeHolder;
    /**
     * outerhtml convenience method
     * browsers only support innerHTML but
     * for instance for your jsf.js we have a full
     * replace pattern which needs outerHTML processing
     *
     * @param markup
     * @param runEmbeddedScripts
     * @param runEmbeddedCss
     */
    outerHTML(markup: string, runEmbeddedScripts?: boolean, runEmbeddedCss?: boolean): DomQuery;
    /**
     * Run through the given nodes in the DomQuery execute the inline scripts
     * @param whilteListed: optional whitelist function which can filter out script tags which are not processed
     * defaults to the standard jsf.js exclusion (we use this code for myfaces)
     */
    runScripts(whilteListed?: (val: string) => boolean): DomQuery;
    runCss(): DomQuery;
    readonly cDATAAsString: string;
    /**
     * fires a click event on the underlying dom elements
     */
    click(): DomQuery;
    addEventListener(type: string, listener: (evt: Event) => void, options?: boolean | EventListenerOptions): DomQuery;
    removeEventListener(type: string, listener: (evt: Event) => void, options?: boolean | EventListenerOptions): DomQuery;
    /**
     * fires an event
     */
    fireEvent(eventName: string): void;
    textContent(joinstr?: string): string;
    innerText(joinstr?: string): string;
    /**
     * encodes all input elements properly into respective
     * config entries, this can be used
     * for legacy systems, for newer usecases, use the
     * HTML5 Form class which all newer browsers provide
     *
     * @param toMerge optional config which can be merged in
     * @return a copy pf
     */
    encodeFormElement(toMerge?: Config): Config;
    private subNodes;
}
/**
 * Various collectors
 * which can be used in conjunction with Streams
 */
/**
 * A collector which bundles a full dom query stream into a single dom query element
 *
 * This connects basically our stream back into DomQuery
 */
export declare class DomQueryCollector implements ICollector<DomQuery, DomQuery> {
    data: DomQuery[];
    collect(element: DomQuery): void;
    readonly finalValue: DomQuery;
}
/**
 * Helper form data collector
 */
export declare class FormDataCollector implements ICollector<{
    key: string;
    value: any;
}, FormData> {
    finalValue: FormData;
    collect(element: {
        key: string;
        value: any;
    }): void;
}
export declare class QueryFormDataCollector implements ICollector<DomQuery, FormData> {
    finalValue: FormData;
    collect(element: DomQuery): void;
}
export declare class QueryFormStringCollector implements ICollector<DomQuery, string> {
    formData: [[string, string]];
    collect(element: DomQuery): void;
    readonly finalValue: string;
}
/**
 * abbreviation for DomQuery
 */
export declare const DQ: typeof DomQuery;
export declare type DQ = DomQuery;
