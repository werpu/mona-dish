export declare enum Direction {
    UP = 0,
    DOWN = 1,
    ALL = 2
}
/**
 * a standardized message to be sent over the message bus
 */
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
    protected processedMessages: any;
    protected cleanupCnt: number;
    protected rootElem: any;
    protected msgHandler: any;
    protected readonly TIMEOUT_IN_MS = 1000;
    protected readonly MSG_EVENT = "message";
    abstract register(scopeElement?: any): any;
    abstract unregister(): any;
    abstract broadcast(channel: string, message: Message): any;
    /**
     * registers a listener on a channel
     * @param channel the channel to register the listeners for
     * @param listener the listener to register
     */
    registerListener(channel: string, listener: (msg: Message) => void): void;
    /**
     * reserves the listener namespace and wildcard namespace for the given identifier
     * @param identifier
     * @private
     */
    private reserveListenerNS;
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
     * @param direction the call direction
     * @param callBrokerListeners same level?
     */
    answer(channel: string, request: Message, answer: Message): void;
    /**
     * idea... a bidirectional broadcast
     * sends a message and waits for the first answer coming in from one of the recivers
     * sending the message back with a messageIdentifier_broadCastId answer
     *
     * @param channel
     * @param message
     * @param direction
     * @param callBrokerListeners
     */
    request(channel: string, message: Message): Promise<Message>;
}
/**
 * a broker which hooks into the Broadcast Channel broker
 * either via shim or substitute lib
 */
export declare class BroadcastChannelBroker extends BaseBroker {
    private brokerFactory;
    private channelGroup;
    private openChannels;
    private msgListener;
    /**
     * @param channelGroup unique group identifier shared by all channels
     */
    constructor(brokerFactory?: Function, channelGroup?: string);
    broadcast(channel: string, message: Message, includeOrigin?: boolean): void;
    private connectToChannel;
    registerListener(channel: string, listener: (msg: Message) => void): void;
    register(): void;
    private getInternalChannelName;
    unregister(): void;
}
/**
 * implementation of a messaging based transport
 */
/**
 * central message broker which uses various dom constructs
 * to broadcast messages into subelements
 *
 * we use the dom event system as transport and encapsule iframe and shadow dom mechanisms in a transparent way to
 * pull this off
 *
 * usage
 *
 * broker = new Broker(optional rootElement)
 *
 * defines a message broker within a scope of rootElment (without it is window aka the current isolation level)
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
 * downards, the messages are propagaed downwards only
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
     * scopnpe
     */
    unregister(): void;
    /**
     * broadcast a message
     * the message contains the channel and the data and some internal bookeeping data
     *
     * @param channel the channel to broadcast to
     * @param message the message dot send
     * @param direction the direction (up, down, both)
     * @param callSameLevel if set to true.. the brokers on the same level are also notified
     * (for instance 2 iframes within the same parent broker)
     *
     */
    broadcast(channel: string, message: Message): void;
    /**
     * garbage collects the processed messages queue
     * usually after one second
     */
    private gcProcessedMessages;
    private dispatchUp;
    private dispatchSameLevel;
    private dispatchDown;
    private msgCallListeners;
    private transformToEvent;
    private createCustomEvent;
    private messageStillActive;
}
export {};
