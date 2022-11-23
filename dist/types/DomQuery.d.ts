/*!
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http:// www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Config, Optional, ValueEmbedder } from "./Monad";
import { XMLQuery } from "./XmlQuery";
import { IStream, LazyStream, Stream } from "./Stream";
import { ICollector, IStreamDataSource, ITERATION_STATUS } from "./SourcesCollectors";
import { _global$ } from "./Global";
/**
 * in order to poss custom parameters we need to extend the mutation observer init
 */
export interface WAIT_OPTS extends MutationObserverInit {
    timeout?: number;
    /**
     * interval on non legacy browsers
     */
    interval?: number;
}
export declare class ElementAttribute extends ValueEmbedder<string> {
    private element;
    private name;
    private defaultVal;
    constructor(element: DomQuery, name: string, defaultVal?: string);
    get value(): string;
    set value(value: string);
    protected getClass(): any;
    static fromNullable<ElementAttribute, T>(value?: any, valueKey?: string): ElementAttribute;
}
export declare class Style extends ValueEmbedder<string> {
    private element;
    private name;
    private defaultVal;
    constructor(element: DomQuery, name: string, defaultVal?: string);
    get value(): string;
    set value(value: string);
    protected getClass(): any;
    static fromNullable<ElementAttribute, T>(value?: any, valueKey?: string): ElementAttribute;
}
interface IDomQuery {
    /**
     * reference to the systems global object
     * (globalThis, window, global, depending on the environment)
     */
    readonly global: any;
    /**
     * reads the first element if it exists and returns an optional
     */
    readonly value: Optional<Element>;
    /**
     * All elements as array
     */
    readonly values: Element[];
    /**
     * returns the id as settable value (See also ValueEmbedder)
     */
    readonly id: ValueEmbedder<string>;
    /**
     * returns the length of embedded nodes (top level)
     */
    readonly length: number;
    /**
     * the tag name of the first element
     */
    readonly tagName: Optional<string>;
    /**
     * the node name of the first element
     */
    readonly nodeName: Optional<string>;
    /**
     * the type of the first element
     */
    readonly type: Optional<string>;
    /**
     * The name as changeable value
     */
    readonly name: ValueEmbedder<string>;
    /**
     * The value in case of inputs as changeable value
     */
    readonly inputValue: ValueEmbedder<string | boolean>;
    /**
     * accumulated top element offsetWidth
     */
    readonly offsetWidth: number;
    /**
     * accumulated top element offsetHeight
     */
    readonly offsetHeight: number;
    /**
     * accumulated top element offsetLeft
     */
    readonly offsetLeft: number;
    /**
     * accumulated top element offsetTop
     */
    readonly offsetTop: number;
    /**
     * abbreviation for inputValue\.value to make
     * the code terser
     */
    val: string | boolean;
    /**
     * the underlying form elements as DomQuery object
     */
    readonly elements: DomQuery;
    /**
     * settable flag for disabled
     */
    disabled: boolean;
    /**
     * The child nodes of this node collection as readonly attribute
     */
    readonly childNodes: DomQuery;
    /**
     * an early stream representation for this DomQuery
     */
    readonly stream: Stream<DomQuery>;
    /**
     * lazy stream representation for this DomQuery
     */
    readonly lazyStream: LazyStream<DomQuery>;
    /**
     * transform this node collection to an array
     */
    readonly asArray: Array<DomQuery>;
    /**
     * inner html property
     * setter and getter which works directly on strings
     */
    innerHTML: string;
    /**
     * same as innerHTML
     * will be removed once
     * my code is transitioned
     * @deprecated do not use anymore, user innerHTML instead
     */
    innerHtml: string;
    /**
     * returns true if the elements have the tag *tagName* as tag embedded ( highest level )
     * @param tagName
     */
    isTag(tagName: string): boolean;
    /**
     * returns the nth element as DomQuery
     * from the internal elements
     * note if you try to reach a non-existing element position
     * you will get back an absent entry
     *
     * @param index the nth index
     */
    get(index: number): DomQuery;
    /**
     * returns the nth element as optional of an Element object
     * @param index the number from the index
     * @param defaults the default value if the index is overrun default Optional\.absent
     */
    getAsElem(index: number, defaults: Optional<any>): Optional<Element>;
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
     * this refers to the active DomQuery object
     */
    isPresent(presentRunnable?: (elem?: DomQuery) => void): boolean;
    /**
     * should make the code clearer
     * note if you pass a function
     * this refers to the active DomQuery object
     *
     *
     * @param presentRunnable
     */
    ifPresentLazy(presentRunnable: (elem?: DomQuery) => void): DomQuery;
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
    attr(attr: string, defaultValue: string): ElementAttribute;
    /**
     * style accessor
     * @param defaultValue the default value in case nothing is presented (defaults to null)
     * @param cssProperty
     */
    style(cssProperty: string, defaultValue: string): Style;
    /**
     * Checks for an existing class in the class attributes
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
     * innerHtml
     * equivalent to jQueries html
     * as setter the html is set and the
     * DomQuery is given back
     * as getter the html string is returned
     *
     * @param newInnerHTML
     */
    html(newInnerHTML?: string): DomQuery | Optional<string>;
    /**
     * dispatch event on all children
     * just a delegated dispatchEvent from the standard
     * dom working on all queried elements in the monad level
     *
     * @param evt the event to be dispatched
     */
    dispatchEvent(evt: Event): DomQuery;
    /**
     * easy node traversal, you can pass
     * a set of node selectors which are joined as direct children
     *
     * Note! The root nodes are not in the getIf, those are always the child nodes
     *
     * @param nodeSelector
     */
    getIf(...nodeSelector: Array<string>): DomQuery;
    /**
     * iterate over each element and perform something on the element
     * (Dom element is passed instead of DomQuery)
     * @param func
     */
    eachElem(func: (item: Element, cnt?: number) => any): DomQuery;
    /**
     * perform an operation on the first element
     * returns a DomQuery on the first element only
     * @param func
     */
    firstElem(func: (item: Element, cnt?: number) => any): DomQuery;
    /**
     * perform an operation on the first element
     * returns a DomQuery on the first element only
     * @param func
     */
    lastElem(func: (item: Element, cnt?: number) => any): DomQuery;
    /**
     * same as eachElem, but a DomQuery object is passed down
     *
     * @param func
     */
    each(func: (item: DomQuery, cnt?: number) => any): DomQuery;
    /**
     * returns a new dom query containing only the first element max
     *
     * @param func a an optional callback function to perform an operation on the first element
     */
    first(func: (item: DomQuery, cnt?: number) => any): DomQuery;
    /**
     * returns a new dom query containing only the first element max
     *
     * @param func a an optional callback function to perform an operation on the first element
     */
    last(func: (item: DomQuery, cnt?: number) => any): DomQuery;
    /**
     * filter function which filters a subset
     *
     * @param func
     */
    filter(func: (item: DomQuery) => boolean): DomQuery;
    /**
     * global eval head appendix method
     * no other methods are supported anymore
     * @param code the code to be evaluated
     * @param  nonce optional  nonce key for higher security
     */
    globalEval(code: string, nonce?: string): DomQuery;
    /**
     * Runs an eval and keeps the evaluated code in the head
     * This is a corner condition, where we want to update the head with custom
     * code and leave the code in (instead of deleting ig)
     *
     * @param code the code to be evaluated
     * @param  nonce optional  nonce key for higher security
     */
    globalEvalSticky(code: string, nonce?: string): DomQuery;
    /**
     * detaches a set of nodes from their parent elements
     * in a browser independent manner
     * @return {DomQuery} DomQuery of nodes with the detached dom nodes
     */
    detach(): DomQuery;
    /**
     * appends the current set of elements
     * to the element or first element passed via elem
     * @param elem
     */
    appendTo(elem: DomQuery | string): DomQuery;
    /**
     * appends the passed elements to our existing queries
     * note, double appends can happen if you are not careful
     *
     * @param elem to append
     */
    append(elem: DomQuery): DomQuery;
    /**
     * replace convenience function replaces the domquery elements with the
     * elements passed as parameter
     * @param toReplace the replacement elements
     * @return a reference on the replacement elements
     */
    replace(toReplace: DomQuery): DomQuery;
    /**
     * appends the passed elements to our existing queries
     * note, double appends can happen if you are not careful
     *
     * @param elem to append
     */
    prepend(elem: DomQuery): DomQuery;
    /**
     * prepend equivalent to appendTo
     *
     * @param elem the element to prepend to
     */
    prependTo(elem: DomQuery): DomQuery;
    /**
     * loads and evaluates a script from a source uri
     *
     * @param src the source to be loaded and evaluated
     * @param delay in milliseconds execution default (0 == no delay)
     * @param charSet
     */
    loadScriptEval(src: string, delay: number, charSet: string): void;
    /**
     * insert toInsert after the current element
     *
     * @param toInsert an array of DomQuery objects
     */
    insertAfter(...toInsert: Array<DomQuery>): DomQuery;
    /**
     * inserts the elements before the current element
     *
     * @param toInsert
     */
    insertBefore(...toInsert: Array<DomQuery>): DomQuery;
    /**
     * in case the DomQuery is pointing to nothing the else value is taken into consideration
     * als alternative
     *
     * @param elseValue the else value
     */
    orElse(...elseValue: any): DomQuery;
    /**
     * the same with lazy evaluation for cases where getting the else value
     * is a heavy operation
     *
     * @param func the else provider function
     */
    orElseLazy(func: () => any): DomQuery;
    /**
     * all parents with TagName
     * @param tagName
     */
    parents(tagName: string): DomQuery;
    /**
     * copy all attributes of sourceItem to this DomQuery items
     *
     * @param sourceItem the source item to copy over (can be another DomQuery or a parsed XML Query item)
     */
    copyAttrs(sourceItem: DomQuery | XMLQuery): DomQuery;
    /**
     * outerHTML convenience method
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
     * @param sticky if set to true the element must be left in the head after eval default === false
     * @param whiteListed: optional whitelist function which can filter out script tags which are not processed
     * defaults to the standard jsf.js exclusion (we use this code for myfaces)
     */
    runScripts(sticky?: boolean, whiteListed?: (val: string) => boolean): DomQuery;
    /**
     * runs the embedded css
     */
    runCss(): DomQuery;
    /**
     * fires a click event on the underlying dom elements
     */
    click(): DomQuery;
    /**
     * adds an event listener
     *
     * @param type
     * @param listener
     * @param options
     */
    addEventListener(type: string, listener: (evt: Event) => void, options?: boolean | EventListenerOptions): DomQuery;
    /**
     * removes an event listener
     *
     * @param type
     * @param listener
     * @param options
     */
    removeEventListener(type: string, listener: (evt: Event) => void, options?: boolean | EventListenerOptions): DomQuery;
    /**
     * fires an event
     */
    fireEvent(eventName: string): void;
    textContent(joinString?: string): string;
    innerText(joinString?: string): string;
    /**
     * encodes all input elements properly into respective
     * config entries, this can be used
     * for legacy systems, for newer use-cases, use the
     * HTML5 Form class which all newer browsers provide
     *
     * @param toMerge optional config which can be merged in
     * @return a copy pf
     */
    encodeFormElement(toMerge: any): Config;
    /**
     * fetches the sub-nodes from ... to..
     * @param from
     * @param to
     */
    subNodes(from: number, to?: number): DomQuery;
    /**
     * attach shadow elements
     * 1:1 mapping from attach shadow
     *
     * @param modeParams
     */
    attachShadow(modeParams: {
        [key: string]: string;
    }): DomQuery;
    /**
     * wait until a condition on the dom is reached
     *
     * @return a promise on the affected elements where the condition
     * @throws an error in case of a timeout
     */
    waitUntilDom(condition: (element: DomQuery) => boolean, options: WAIT_OPTS): Promise<DomQuery>;
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
 * Also, a few convenience methods are added to reduce
 * the code footprint of standard dom processing
 * operations like eval
 *
 * in most older systems
 * Note parts of this code still stem from the Dom.js I have written 10 years
 * ago, those parts look a bit ancient and will be replaced over time.
 *
 */
export declare class DomQuery implements IDomQuery, IStreamDataSource<DomQuery>, Iterable<DomQuery> {
    static absent: DomQuery;
    /**
     * reference to the environmental global object
     */
    static global: typeof _global$;
    private rootNode;
    pos: number;
    constructor(...rootNode: Array<Element | ShadowRoot | DomQuery | Document | Array<any> | string>);
    /**
     * returns the first element
     */
    get value(): Optional<Element>;
    get values(): Element[];
    get global(): any;
    /**
     * returns the id of the first element
     */
    get id(): ValueEmbedder<string>;
    /**
     * length of the entire query set
     */
    get length(): number;
    /**
     * convenience method for tagName
     */
    get tagName(): Optional<string>;
    /**
     * convenience method for nodeName
     */
    get nodeName(): Optional<string>;
    isTag(tagName: string): boolean;
    /**
     * convenience property for type
     *
     * returns null in case of no type existing otherwise
     * the type of the first element
     */
    get type(): Optional<string>;
    /**
     * convenience property for name
     *
     * returns null in case of no type existing otherwise
     * the name of the first element
     */
    get name(): ValueEmbedder<string>;
    /**
     * convenience property for value
     *
     * returns null in case of no type existing otherwise
     * the value of the first element
     */
    get inputValue(): ValueEmbedder<string | boolean>;
    get val(): string | boolean;
    set val(value: string | boolean);
    get checked(): boolean;
    set checked(newChecked: boolean);
    get elements(): DomQuery;
    get deepElements(): DomQuery;
    /**
     * a deep search which treats the single isolated shadow dom areas
     * separately and runs the query on each shadow dom
     * @param queryStr
     */
    querySelectorAllDeep(queryStr: string): DomQuery;
    /**
     * disabled flag
     */
    get disabled(): boolean;
    set disabled(disabled: boolean);
    removeAttribute(name: string): void;
    get childNodes(): DomQuery;
    /**
     * binding into stream
     */
    get stream(): Stream<DomQuery>;
    /**
     * fetches a lazy stream representation
     * lazy should be applied if you have some filters etc.
     * in between, this can reduce the number of post filter operations
     * and ram usage
     * significantly because the operations are done lazily and stop
     * once they hit a dead end.
     */
    get lazyStream(): LazyStream<DomQuery>;
    get asArray(): Array<DomQuery>;
    get offsetWidth(): number;
    get offsetHeight(): number;
    get offsetLeft(): number;
    get offsetTop(): number;
    get asNodeArray(): Array<DomQuery>;
    static querySelectorAllDeep(selector: string): DomQuery;
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
     * @param deep true if you want to go into shadow areas
     * @return a DomQuery containing the found elements
     */
    static byId(selector: string | DomQuery | Element, deep?: boolean): DomQuery;
    /**
     * byTagName producer
     *
     * @param selector name
     * @return a DomQuery containing the found elements
     */
    static byTagName(selector: string | DomQuery | Element): DomQuery;
    static globalEval(code: string, nonce?: string): DomQuery;
    static globalEvalSticky(code: string, nonce?: string): DomQuery;
    /**
     * builds the ie nodes properly in a placeholder
     * and bypasses a non script insert bug that way
     * @param markup the markup code to be executed from
     */
    static fromMarkup(markup: string): DomQuery;
    /**
     * returns the nth element as DomQuery
     * from the internal elements
     * note if you try to reach a non-existing element position
     * you will get back an absent entry
     *
     * @param index the nth index
     */
    get(index: number): DomQuery;
    /**
     * returns the nth element as optional of an Element object
     * @param index the number from the index
     * @param defaults the default value if the index is overrun default Optional\.absent
     */
    getAsElem(index: number, defaults?: Optional<any>): Optional<Element>;
    /**
     * returns the files from a given element
     * @param index
     */
    filesFromElem(index: number): Array<any>;
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
     * this refers to the active DomQuery object
     */
    isPresent(presentRunnable?: (elem?: DomQuery) => void): boolean;
    /**
     * should make the code clearer
     * note if you pass a function
     * this refers to the active DomQuery object
     *
     *
     * @param presentRunnable
     */
    ifPresentLazy(presentRunnable?: (elem?: DomQuery) => void): DomQuery;
    /**
     * remove all affected nodes from this query object from the dom tree
     */
    delete(): void;
    querySelectorAll(selector: any): DomQuery;
    /**
     * core byId method
     * @param id the id to search for
     * @param includeRoot also match the root element?
     */
    byId(id: string, includeRoot?: boolean): DomQuery;
    byIdDeep(id: string, includeRoot?: boolean): DomQuery;
    /**
     * same as byId just for the tag name
     * @param tagName the tag-name to search for
     * @param includeRoot shall the root element be part of this search
     * @param deep do we also want to go into shadow dom areas
     */
    byTagName(tagName: string, includeRoot?: boolean, deep?: boolean): DomQuery;
    /**
     * attr accessor, usage myQuery.attr("class").value = "bla"
     * or let value myQuery.attr("class").value
     * @param attr the attribute to set
     * @param defaultValue the default value in case nothing is presented (defaults to null)
     */
    attr(attr: string, defaultValue?: string): ElementAttribute;
    style(cssProperty: string, defaultValue?: string): Style;
    /**
     * Checks for an existing class in the class attributes
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
     * or are one
     */
    isMultipartCandidate(deep?: boolean): boolean;
    /**
     * innerHtml
     * equivalent to jQueries html
     * as setter the html is set and the
     * DomQuery is given back
     * as getter the html string is returned
     *
     * @param newInnerHTML the inner html to be inserted
     */
    html(newInnerHTML?: string): DomQuery | Optional<string>;
    /**
     * Standard dispatch event method, delegated from node
     */
    dispatchEvent(evt: Event): DomQuery;
    /**
     * abbreviation property to use innerHTML directly like on the dom tree
     * @param newInnerHTML  the new inner html which should be attached to "this" domQuery
     */
    set innerHTML(newInnerHTML: string);
    /**
     * getter abbreviation to use innerHTML directly
     */
    get innerHTML(): string;
    /**
     * since the dom allows both innerHTML and innerHtml we also have to implement both
     * @param newInnerHtml see above
     */
    set innerHtml(newInnerHtml: string);
    /**
     * same here, getter for allowing innerHtml directly
     */
    get innerHtml(): string;
    /**
     * filters the current dom query elements
     * upon a given selector
     *
     * @param selector
     */
    filterSelector(selector: string): DomQuery;
    /**
     * checks whether any item in this domQuery level matches the selector
     * if there is one element only attached, as root the match is only
     * performed on this element.
     * @param selector
     */
    matchesSelector(selector: string): boolean;
    /**
     * easy node traversal, you can pass
     * a set of node selectors which are joined as direct children
     *
     * Note!!! The root nodes are not in the getIf, those are always the child nodes
     *
     * @param nodeSelector
     */
    getIf(...nodeSelector: Array<string>): DomQuery;
    eachElem(func: (item: Element, cnt?: number) => any): DomQuery;
    firstElem(func?: (item: Element, cnt?: number) => any): DomQuery;
    lastElem(func?: (item: Element, cnt?: number) => any): DomQuery;
    each(func: (item: DomQuery, cnt?: number) => any): DomQuery;
    /**
     * replace convenience function, replaces one or more elements with
     * a set of elements passed as DomQuery
     * @param toReplace the replaced nodes as reference (original node has been replaced)
     */
    replace(toReplace: DomQuery): DomQuery;
    /**
     * returns a new dom query containing only the first element max
     *
     * @param func a an optional callback function to perform an operation on the first element
     */
    first(func?: (item: DomQuery, cnt?: number) => any): DomQuery;
    /**
     * returns a new dom query containing only the first element max
     *
     * @param func a an optional callback function to perform an operation on the first element
     */
    last(func?: (item: DomQuery, cnt?: number) => any): DomQuery;
    /**
     * filter function which filters a subset
     *
     * @param func
     */
    filter(func: (item: DomQuery) => boolean): DomQuery;
    /**
     * global eval head appendix method
     * no other methods are supported anymore
     * @param code the code to be evaluated
     * @param  nonce optional  nonce key for higher security
     */
    globalEval(code: string, nonce?: string): DomQuery;
    /**
     * global eval head appendix method
     * no other methods are supported anymore
     * @param code the code to be evaluated
     * @param  nonce optional  nonce key for higher security
     */
    globalEvalSticky(code: string, nonce?: string): DomQuery;
    /**
     * detaches a set of nodes from their parent elements
     * in a browser independent manner
     * @return {Array} an array of nodes with the detached dom nodes
     */
    detach(): DomQuery;
    /**
     * appends the current set of elements
     * to the element or first element passed via elem
     * @param elem
     */
    appendTo(elem: DomQuery | string): DomQuery;
    /**
     * loads and evaluates a script from a source uri
     *
     * @param src the source to be loaded and evaluated
     * @param delay in milliseconds execution default (0 == no delay)
     * @param nonce optional nonce value to allow increased security via nonce crypto token
     */
    loadScriptEval(src: string, delay?: number, nonce?: string): this;
    /**
     * loads and evaluates a script from a source uri
     *
     * @param src the source to be loaded and evaluated
     * @param delay in milliseconds execution default (0 == no delay)
     * @param nonce optional nonce parameter for increased security via nonce crypto token
     */
    loadScriptEvalSticky(src: string, delay?: number, nonce?: string): this;
    insertAfter(...toInsertParams: Array<DomQuery>): DomQuery;
    insertBefore(...toInsertParams: Array<DomQuery>): DomQuery;
    orElse(...elseValue: any): DomQuery;
    orElseLazy(func: () => any): DomQuery;
    parents(tagName: string): DomQuery;
    copyAttrs(sourceItem: DomQuery | XMLQuery): DomQuery;
    /**
     * outerHTML convenience method
     * browsers only support innerHTML but
     * for instance for your jsf.js we have a full
     * replace pattern which needs outerHTML processing
     *
     * @param markup the markup which should replace the root element
     * @param runEmbeddedScripts if true the embedded scripts are executed
     * @param runEmbeddedCss if true the embedded css are executed
     * @param deep should this also work for shadow dom (run scripts etc...)
     */
    outerHTML(markup: string, runEmbeddedScripts?: boolean, runEmbeddedCss?: boolean, deep?: boolean): DomQuery;
    /**
     * Run through the given nodes in the DomQuery execute the inline scripts
     * @param sticky if set to true the evaluated elements will stick to the head, default false
     * @param whitelisted: optional whitelist function which can filter out script tags which are not processed
     * defaults to the standard jsf.js exclusion (we use this code for myfaces)
     */
    runScripts(sticky?: boolean, whitelisted?: (val: string) => boolean): DomQuery;
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
    fireEvent(eventName: string, options?: {
        [key: string]: any;
    }): void;
    textContent(joinString?: string): string;
    innerText(joinString?: string): string;
    /**
     * encodes all input elements properly into respective
     * config entries, this can be used
     * for legacy systems, for newer use-cases, use the
     * HTML5 Form class which all newer browsers provide
     *
     * @param toMerge optional config which can be merged in
     * @return a copy pf
     */
    encodeFormElement(toMerge?: Config): Config;
    get cDATAAsString(): string;
    subNodes(from: number, to?: number): DomQuery;
    _limits: number;
    limits(end: number): IStream<DomQuery>;
    hasNext(): boolean;
    next(): DomQuery;
    lookAhead(cnt?: number): ITERATION_STATUS | DomQuery;
    current(): DomQuery | ITERATION_STATUS;
    reset(): void;
    attachShadow(params?: {
        [key: string]: string;
    }): DomQuery;
    /**
     * helper to fix a common dom problem
     * we have to wait until a certain condition is met, in most of the cases we just want to know whether an element is present in the sub dom-tree before being able to proceed
     * @param condition
     * @param options
     */
    waitUntilDom(condition: (element: DomQuery) => boolean, options?: WAIT_OPTS): Promise<DomQuery>;
    /**
     * returns the embedded shadow elements
     */
    get shadowElements(): DomQuery;
    get shadowRoot(): DomQuery;
    get hasShadow(): boolean;
    static getCaretPosition(ctrl: any): number;
    /**
     * sets the caret position
     *
     * @param ctrl the control to set the caret position to
     * @param pos the position to set
     *
     * note if the control does not have any selectable and focusable behavior
     * calling this method does nothing (silent fail)
     *
     */
    static setCaretPosition(ctrl: any, pos: number): void;
    /**
     * Implementation of an iterator
     * to allow loops over dom query collections
     */
    [Symbol.iterator](): Iterator<DomQuery, any, undefined>;
    /**
     * Concatenates the elements of two Dom Queries into a single one
     * @param toAttach the elements to attach
     * @param filterDoubles filter out possible double elements (aka same markup)
     */
    concat(toAttach: DomQuery, filterDoubles?: boolean): any;
    append(elem: DomQuery): DomQuery;
    prependTo(elem: DomQuery): DomQuery;
    prepend(elem: DomQuery): DomQuery;
    /**
     * query selector all on the existing dom queryX object
     *
     * @param selector the standard selector
     * @return a DomQuery with the results
     */
    private _querySelectorAll;
    private _querySelectorAllDeep;
    /**
     * matches selector call in a browser independent manner
     *
     * @param toMatch
     * @param selector
     * @private
     */
    private _mozMatchesSelector;
    /**
     * sticky non-sticky unified code of the load script eval
     * implementation if programmatic &gt;script src="... loading
     *
     * @param sticky if set to true a head element is left in the dom tree after the script has loaded
     *
     * @param src the sec to load
     * @param delay delay the script loading x ms (default immediately === 0)
     * @param nonce optional nonce token to be passed into the script tag
     * @private
     */
    private _loadScriptEval;
    /**
     * resolves an attribute holder compared
     * @param attrName the attribute name
     */
    private resolveAttributeHolder;
    private createSourceNode;
    private applyNonce;
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
    get finalValue(): DomQuery;
}
/**
 * abbreviation for DomQuery
 */
export declare const DQ: typeof DomQuery;
export declare type DQ = DomQuery;
/**
 * replacement for the jquery $
 */
export declare const DQ$: typeof DomQuery.querySelectorAll;
export {};
