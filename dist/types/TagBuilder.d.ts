/**
 * beginning custom tag support
 *
 * This api is still experimental
 * and might be interwoven with DomQuery
 * so it is bound to change
 *
 * it follows a builder pattern to allow easier creations
 * with less code of custom tags
 */
export declare class TagBuilder {
    tagName: string;
    connectedCallback?: Function;
    clazz?: Function;
    extendsType: any;
    theOptions: ElementDefinitionOptions | null;
    markup: string;
    static withTagName(tagName: any): TagBuilder;
    constructor(tagName: string);
    withConnectedCallback(connectedCallback: Function): this;
    withExtendsType(extendsType: Function): this;
    withOptions(theOptions: any): this;
    withClass(clazz: any): this;
    withMarkup(markup: any): this;
    register(): void;
}
