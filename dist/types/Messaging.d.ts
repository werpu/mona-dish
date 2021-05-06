/**
 * a standardized message to be sent over the message bus
 */
import { Observable, Subject } from "rxjs";
export declare class Message {
    message: any;
    creationDate?: number;
    identifier?: string;
    targetOrigin?: string;
    constructor(message?: any, targetOrigin?: string);
}
declare abstract class BaseBroker {
    static readonly EVENT_TYPE = "brokerEvent";
    /**
     * we can split the listeners with the system
     * namespace... and type (aka identifier criteria)
     */
    protected messageListeners: any;
    protected subjects: any;
    protected processedMessages: any;
    protected cleanupCnt: number;
    protected rootElem: any;
    protected msgHandler: any;
    protected readonly TIMEOUT_IN_MS = 1000;
    protected readonly MSG_EVENT = "message";
    abstract register(scopeElement?: any): any;
    abstract unregister(): any;
    abstract broadcast(channel: string, message: Message | string): any;
    /**
     * registers a listener on a channel
     * @param channel the channel to register the listeners for
     * @param listener the listener to register
     */
    registerListener(channel: string, listener: (msg: Message) => void): void;
    /**
     * binding into rxjs
     * produces a subject which can be used via next calls to send messages
     * on the other hand we
     * @param channel
     */
    asSubject(channel: string): Subject<Message>;
    /**
     * returns an observable on the baseBroker
     * @param channel
     */
    asObservable(channel: string): Observable<Message>;
    /**
     * reserves the listener namespace and wildcard namespace for the given identifier
     * @param identifier
     * @private
     */
    private reserveListenerNS;
    private reserveSubjectNS;
    /**
     * unregisters a listener from this channel
     *
     * @param channel the channel to unregister from
     * @param listener the listener to unregister the channel from
     */
    unregisterListener(channel: string, listener: (msg: Message) => void): void;
    /**
     * answers a bidirectional message received
     * usage, the client can use this method, to answer an incoming message in a precise manner
     * so that the caller sending the bidirectional message knows how to deal with it
     * this mechanism can be used for global storages where we have one answering entity per channel delivering the
     * requested data, the request can be done asynchronously via promises waiting for answers
     *
     * @param channel the channel the originating message
     * @param request the requesting message
     * @param answer the answer to the request
     */
    answer(channel: string, request: Message | string, answer: Message): void;
    private static getAnswerId;
    private static isAnswer;
    /**
     * idea... a bidirectional broadcast
     * sends a message and waits for the first answer coming in from one of the receivers
     * sending the message back with a messageIdentifier_broadCastId answer
     *
     * @param channel
     * @param message
     */
    request(channel: string, message: Message | string): Promise<Message>;
    /**
     * garbage collects the processed messages queue
     * usually after one second
     */
    protected gcProcessedMessages(): void;
    private messageStillActive;
    protected markMessageAsProcessed(message: Message): void;
}
/**
 * a broker which hooks into the Broadcast Channel broker
 * either via shim or substitute lib
 */
export declare class BroadcastChannelBroker extends BaseBroker {
    private brokerFactory;
    private channelGroup;
    private openChannels;
    private readonly msgListener;
    /**
     * @param brokerFactory a factory generating a broker
     * @param channelGroup a group to combine a set of channels
     */
    constructor(brokerFactory?: Function, channelGroup?: string);
    broadcast(channel: string, message: Message | string, includeOrigin?: boolean): void;
    registerListener(channel: string, listener: (msg: Message) => void): void;
    register(): void;
    unregister(): void;
}
/**
 * implementation of a messaging based transport
 */
/**
 * central message broker which uses various dom constructs
 * to broadcast messages into subelements
 *
 * we use the dom event system as transport and iframe and shadow dom mechanisms in a transparent way to
 * pull this off
 *
 * usage
 *
 * broker = new Broker(optional rootElement)
 *
 * defines a message broker within a scope of rootElement (without it is window aka the current isolation level)
 *
 * broker.registerListener(channel, listener) registers a new listener to the current broker and channel
 * broker.unregisterListener(channel, listener) unregisters the given listener
 *
 * broker.broadcast(message, optional direction, optional callBrokerListeners)
 * sends a message (channel included in the message object) in a direction (up, down, both)
 * and also optionally calls the listeners on the same broker (default off)
 *
 * the flow is like
 * up messages are propagated upwards only until it reaches the outer top of the dom
 * downwards, the messages are propagated downwards only
 * both the message is propagated into both directions
 *
 * Usually messages sent from the same broker are not processed within... however by setting
 * callBrokerListeners to true the listeners on the same broker also are called
 * brokers on the same level will get the message and process it automatically no matter what.
 * That way you can exclude the source from message processing (and it is done that way automatically)
 *
 * Isolation levels. Usually every isolation level needs its own broker object registering
 * on the outer bounds
 *
 * aka documents will register on window
 * iframes on the iframe windowObject
 * isolated shadow doms... document
 *
 *
 *
 */
export declare class Broker extends BaseBroker {
    name: string;
    /**
     * constructor has an optional root element
     * and an internal name
     *
     * @param scopeElement
     * @param name
     */
    constructor(scopeElement?: HTMLElement | Window | ShadowRoot, name?: string);
    /**
     * register the current broker into a scope defined by wnd
     * @param scopeElement
     */
    register(scopeElement: HTMLElement | Window | ShadowRoot): void;
    /**
     * manual unregister function, to unregister as broker from the current
     * scope
     */
    unregister(): void;
    /**
     * broadcast a message
     * the message contains the channel and the data and some internal bookkeeping data
     *
     * @param channel the channel to broadcast to
     * @param message the message dot send
     * (for instance 2 iframes within the same parent broker)
     *
     */
    broadcast(channel: string, message: Message | string): void;
    private dispatchUp;
    private static dispatchSameLevel;
    private dispatchDown;
    private msgCallListeners;
    private static transformToEvent;
    private static createCustomEvent;
}
export {};
