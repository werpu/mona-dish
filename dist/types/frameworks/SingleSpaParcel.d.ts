/**
 * single spa parcel
 */
import { DomQuery } from "../DomQuery";
import { XMLQuery } from "../XmlQuery";
import { Broker } from "../Messaging";
import { IStream } from "../Stream";
import { TagBuilder } from "../TagBuilder";
/**
 * hook point with central registration
 * as single-spa Parcel
 *
 * register the class as parcel, the instance then
 * is in the props.instance registered
 * which then can be used for other things
 * (most useful for handling brokers
 * the rest is just syntactic sugar)
 */
export declare class MonaDishParcel {
    DQ: typeof DomQuery;
    XQ: typeof XMLQuery;
    private brokers;
    /**
     * single spa parcel bootstrapping
     * @param props
     */
    static bootstrap(props: any): Promise<void>;
    static mount(props: any): void;
    static unmount(props: any): Promise<void>;
    /**
     * creates and registers a new brokler element on this parcel
     * note, once the parcel is deregistered
     * @param scopeElement
     * @param name
     */
    newBroker(scopeElement?: HTMLElement | Window | ShadowRoot, name?: string): Broker;
    /**
     * creates a new Stream element
     * @param data
     */
    newStream<T>(...data: Array<T>): IStream<T>;
    /**
     * creates a new tag builder to create custom tags
     * @param tagName
     */
    newTag(tagName: string): TagBuilder;
    private deregister;
}
