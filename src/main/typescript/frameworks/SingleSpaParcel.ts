/**
 * single spa parcel
 */
import {DomQuery} from "../DomQuery";
import {XMLQuery} from "../XmlQuery";
import {Broker} from "../Messaging";
import {IStream, Stream} from "../Stream";
import {TagBuilder} from "../TagBuilder";

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
export class MonaDishParcel {
    //dom query class reference which can be used as hook point
    DQ = DomQuery;
    //xml query class reference which can be used as hook point
    XQ = XMLQuery;
    //internal broker bookkeeping
    private brokers: Array<Broker> = [];

    /**
     * single spa parcel bootstrapping
     * @param props
     */
    static bootstrap(props: any) {
        return Promise
            .resolve()
            .then(() => {
                props.instance = new MonaDishParcel();
            });
    }

    static mount(props: any) {
    }

    /*
     * deregistration of existing brokers used by this parcel
     */
    static unmount(props: any) {
        return Promise
            .resolve()
            .then(() => {
                props?.instance?.deregister();
            });

    }

    /**
     * creates and registers a new brokler element on this parcel
     * note, once the parcel is deregistered
     * @param scopeElement
     * @param name
     */
    newBroker(scopeElement: HTMLElement | Window | ShadowRoot = window, name = "brokr") {
        let broker = new Broker(scopeElement, name);
        this.brokers.push(broker);
        return broker;
    }

    /**
     * creates a new Stream element
     * @param data
     */
    newStream<T>(...data: Array<T>): IStream<T> {
        return Stream.of<T>(...data);
    }

    /**
     * creates a new tag builder to create custom tags
     * @param tagName
     */
    newTag(tagName: string): TagBuilder {
        return TagBuilder.withTagName(tagName);
    }

    private deregister() {
        Stream.of<Broker>(...this.brokers).each(item => item.unregister());
    }

}

