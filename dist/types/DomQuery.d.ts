import { IValueHolder, Optional } from "./Monad";
import { XMLQuery } from "./XmlQuery";
export declare class ElementAttribute implements IValueHolder<string> {
    private element;
    private attributeName;
    private defaultVal;
    constructor(element: DomQuery, attributeName: string, defaultVal?: string);
    value: string;
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
    private rootNode;
    constructor(...rootNode: Array<Element | DomQuery | Document | Array<any> | string>);
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
     * @param index
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
     * any value present
     */
    isPresent(): boolean;
    /**
     * remove all affected nodes from this query object from the dom tree
     */
    delete(): void;
    /**
     * easy query selector all producer
     *
     * @param selector the selector
     * @returns a results dom query object
     */
    static querySelectorAll(selector: string): DomQuery;
    /**
     * query selector all on the existing dom query object
     *
     * @param selector the standard selector
     * @return a DomQuery with the results
     */
    querySelectorAll(selector: any): DomQuery;
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
     * @param attr
     */
    attr(attr: string, noneGetValue?: string): ElementAttribute;
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
    /**
     * easy node traversal, you can pass
     * a set of node selectors which are joined as direct childs
     * @param nodeSelector
     */
    getIf(...nodeSelector: Array<string>): DomQuery;
    /**
     * returns the elements of this dom tree, always as array (keep that in mind)
     */
    readonly value: Optional<Element>;
    readonly values: Element[];
    /**
     * returns the id of the first element
     */
    readonly id: Optional<string>;
    /**
     * length of the entire query set
     */
    readonly length: number;
    /**
     * convenience method for tagName
     */
    readonly tagName: Optional<string>;
    /**
     * convenience method for type
     */
    readonly type: Optional<string>;
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
     * globa eval head appendix method
     * no other methods are supported anymore
     * @param code
     */
    globalEval(code: string, nonce?: string): DomQuery;
    static globalEval(code: string): DomQuery;
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
    loadScriptEval(src: any, type: any, defer: any, charSet: any, async: any): this;
    insertAfter(...elem: Array<DomQuery>): this;
    insertBefore(...elem: Array<DomQuery>): this;
    orElse(...elseValue: any): DomQuery;
    orElseLazy(func: () => any): DomQuery;
    parents(tagName: string): DomQuery;
    readonly childNodes: DomQuery;
    copyAttrs(sourceItem: DomQuery | XMLQuery): DomQuery;
    private subNodes;
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
     * Run through the given Html item and execute the inline scripts
     * (IE doesn't do this by itself)
     * @param {Node} item
     * @param whilteListed: optional whitelist function which can filter out script tags which are not processed
     */
    runScripts(whilteListed?: (val: string) => boolean): DomQuery;
    runCss(): DomQuery;
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
    /**
     * builds the ie nodes properly in a placeholder
     * and bypasses a non script insert bug that way
     * @param markup the marku code
     */
    static fromMarkup(markup: string): DomQuery;
    private encodeElement;
    static absent: DomQuery;
}
