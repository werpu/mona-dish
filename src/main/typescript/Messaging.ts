/**
 * a standardized message to be sent over the message bus
 */
export class Message {

    creationDate?: number;
    identifier?: string;
    targetOrigin?: string;

    constructor(public message: any = {}, targetOrigin = "*") {
        this.targetOrigin = targetOrigin;
        this.creationDate = new Date().getMilliseconds();
        this.identifier = new Date().getMilliseconds() + "_" + Math.random() + "_" + Math.random();
    }
}

/**
 * custom dom event wrapping our messages
 */
class MessageWrapper implements CustomEventInit<Message> {

    detail?: Message;
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    channel: string;


    constructor(channel: string, message: Message) {
        this.detail = message;
        this.bubbles = true;
        this.cancelable = true;
        this.composed = true;
        this.channel = channel;
    }
}


abstract class BaseBroker {

    static readonly EVENT_TYPE = "brokerEvent";
    /**
     * we can split the listeners with the system
     * namespace... and type (aka identifier criteria)
     */
    protected messageListeners: any = {};
    protected processedMessages: any = {};
    protected cleanupCnt = 0;
    protected rootElem;
    protected msgHandler;

    protected readonly TIMEOUT_IN_MS = 1000;
    protected readonly MSG_EVENT = "message";


    abstract register(scopeElement?: any);

    abstract unregister();

    abstract broadcast(channel: string, message: Message | string);


    /**
     * registers a listener on a channel
     * @param channel the channel to register the listeners for
     * @param listener the listener to register
     */
    registerListener(channel: string, listener: (msg: Message) => void) {
        this.reserveListenerNS(channel);

        //we skip the processed messages, because they originated here
        //and already are processed
        this.messageListeners[channel].push((msg: Message) => {
            if (msg.identifier in this.processedMessages) {
                return;
            }
            listener(msg);
        });
    }

    /**
     * reserves the listener namespace and wildcard namespace for the given identifier
     * @param identifier
     * @private
     */
    private reserveListenerNS(identifier: string) {
        if (!this.messageListeners[identifier]) {
            this.messageListeners[identifier] = [];
        }
        if (!this.messageListeners["*"]) {
            this.messageListeners["*"] = [];
        }
    }

    /**
     * unregisters a listener from this channel
     *
     * @param channel the channel to unregister from
     * @param listener the listener to unregister the channel from
     */
    unregisterListener(channel: string, listener: (msg: Message) => void) {
        this.messageListeners[channel] = (this.messageListeners[channel] || []).filter((item: any) => item !== listener);
    }

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
    answer(channel: string, request: Message |string, answer: Message) {
        if('string' == typeof request) {
            request = new Message(request);
        }

        if (BaseBroker.isAnswer(request)) {
            return;
        }
        answer.identifier = BaseBroker.getAnswerId(request);
        this.broadcast(channel, answer);
    }

    private static getAnswerId(request: Message) {
        return "_r_" + request.identifier;
    }

    private static isAnswer(request: Message) {
        return request.identifier.indexOf("_r_") == 0;
    }

    /**
     * idea... a bidirectional broadcast
     * sends a message and waits for the first answer coming in from one of the receivers
     * sending the message back with a messageIdentifier_broadCastId answer
     *
     * @param channel
     * @param message
     */
    request(channel: string, message: Message | string): Promise<Message> {
        if('string' == typeof message) {
            message = new Message(message);
        }
        let messageId = message.identifier;

        let ret = new Promise<Message>((resolve, reject) => {
            let timeout = null;
            let listener = (message2: Message) => {
                if (message2.identifier == messageId) {
                    //broadcast from same source, we do not want
                    //to deal with it now
                    return;
                }

                if (message2.identifier == "_r_" + messageId) {
                    clearTimeout(timeout);
                    this.unregisterListener(channel, listener);
                    resolve(message2);
                }
            }
            timeout = setTimeout(() => {
                this.unregisterListener(channel, listener);
                reject("request message performed, timeout, no return value");
            }, 3000);
            this.registerListener(channel, listener);

        });
        this.broadcast(channel, message);
        return ret;
    }


    /**
     * garbage collects the processed messages queue
     * usually after one second
     */
    protected gcProcessedMessages() {
        if ((++this.cleanupCnt) % 10 != 0) {
            return;
        }
        let newProcessedMessages: any = {};
        Object.keys(this.processedMessages).forEach(key => {
            if (this.messageStillActive(key)) return;
            newProcessedMessages[key] = this.processedMessages[key];
        });
        this.processedMessages = newProcessedMessages;
    }

    private messageStillActive(key: string): boolean {
        return this.processedMessages[key] > ((new Date()).getMilliseconds() - this.TIMEOUT_IN_MS);
    }

    protected markMessageAsProcessed(message: Message) {
        this.processedMessages[message.identifier] = message.creationDate;
    }
}

/**
 * a broker which hooks into the Broadcast Channel broker
 * either via shim or substitute lib
 */
export class BroadcastChannelBroker extends BaseBroker {
    private openChannels: [{ key: string }, BroadcastChannel] = <any>{};
    private msgListener: Function;

    /**
     * @param brokerFactory a factory generating a broker
     * @param channelGroup a group to combine a set of channels
     */
    constructor(private brokerFactory: Function = (name) => {
        if (window?.BroadcastChannel) {
            return new window.BroadcastChannel(name);
        }
        throw Error("No Broadcast channel in the system, use a shim or provide a factory function" +
            "in the constructor");
    }, private channelGroup = "brokr") {
        super();
        this.msgListener = (messageData: MessageWrapper) => {
            let coreMessage = messageData.detail;
            let channel: string = messageData.channel;

            if (this.messageListeners?.[channel]) {
                this.messageListeners?.[channel].forEach(listener => {
                    listener(coreMessage);
                })
            }
            this.markMessageAsProcessed(coreMessage);
            return true;
        }
        this.register();
    }

    broadcast(channel: string, message: Message | string, includeOrigin = true) {
        try {
            if('string' == typeof message) {
                message = new Message(message);
            }
            let messageWrapper = new MessageWrapper(channel, message);
            this.openChannels[this.channelGroup].postMessage(messageWrapper);
            if (includeOrigin) {
                this.msgListener(messageWrapper);
            }
        } finally {
            this.gcProcessedMessages();
        }
    }



    registerListener(channel: string, listener: (msg: Message) => void) {
        super.registerListener(channel, listener);
    }

    register() {
        if(!this.openChannels[this.channelGroup]) {
            this.openChannels[this.channelGroup] = this.brokerFactory(this.channelGroup);
        }
        this.openChannels[this.channelGroup].addEventListener("message", this.msgListener);
    }

    unregister() {
        this.openChannels[this.channelGroup].close();
    }
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
export class Broker extends BaseBroker {

    /**
     * constructor has an optional root element
     * and an internal name
     *
     * @param scopeElement
     * @param name
     */
    constructor(scopeElement: HTMLElement | Window | ShadowRoot = window, public name = "brokr") {

        super();

        /**
         * message relay.. identifies message events and relays them to the listeners
         * @param event
         */
        let evtHandler = (event: MessageEvent | CustomEvent<Message>) => {
            let details = (<any>event)?.detail ?? (<MessageEvent>event)?.data?.detail;
            let channel = ((<any>event)?.data?.channel) ?? ((<any>event)?.channel);

            //javascript loses the type info in certain module types
            if (details?.identifier && details?.message) {
                let msg: Message = details;
                if (msg.identifier in this.processedMessages) {
                    return;
                }
                //coming in from up... we need to send it down
                //a relayed message always has to trigger the listeners as well
                this.broadcast(channel, msg);
            }
        };
        this.msgHandler = (evt: MessageEvent) => evtHandler(evt);
        this.register(scopeElement);
    }

    /**
     * register the current broker into a scope defined by wnd
     * @param scopeElement
     */
    register(scopeElement: HTMLElement | Window | ShadowRoot) {
        this.rootElem = (<any>scopeElement).host ? (<any>scopeElement).host : scopeElement;
        if ((<any>scopeElement).host) {
            let host = (<ShadowRoot>scopeElement).host;
            host.setAttribute("data-broker", "1");
        } else {
            if (scopeElement?.["setAttribute"])
                (<any>scopeElement).setAttribute("data-broker", "1");
        }

        this.rootElem.addEventListener(Broker.EVENT_TYPE, this.msgHandler, {capture: true});
        /*dom message usable by iframes*/
        this.rootElem.addEventListener(this.MSG_EVENT, this.msgHandler, {capture: true});
    }

    /**
     * manual unregister function, to unregister as broker from the current
     * scope
     */
    unregister() {
        this.rootElem.removeEventListener(Broker.EVENT_TYPE, this.msgHandler)
        this.rootElem.removeEventListener(this.MSG_EVENT, this.msgHandler)
    }


    /**
     * broadcast a message
     * the message contains the channel and the data and some internal bookkeeping data
     *
     * @param channel the channel to broadcast to
     * @param message the message dot send
     * (for instance 2 iframes within the same parent broker)
     *
     */
    broadcast(channel: string, message: Message | string) {
        if('string' == typeof message) {
            message = new Message(message);
        }
        try {
            this.dispatchUp(channel, message, false, true);
            //listeners already called
            this.dispatchDown(channel, message, true, false)
        } finally {
            this.gcProcessedMessages();
        }
    }

    private dispatchUp(channel: string, message: Message, ignoreListeners = true, callBrokerListeners = true) {
        if (!ignoreListeners) {
            this.msgCallListeners(channel, message);
        }
        this.markMessageAsProcessed(message);
        if (window.parent != null) {

            let messageWrapper = new MessageWrapper(channel, message);
            window.parent.postMessage(JSON.parse(JSON.stringify(messageWrapper)), message.targetOrigin);
        }
        if (callBrokerListeners) {
            Broker.dispatchSameLevel(channel, message);
        }
    }

    private static dispatchSameLevel(channel: string, message: Message) {
        let event = Broker.transformToEvent(channel, message, true);
        //we also dispatch sideways
        window.dispatchEvent(event);
    }

    //a dispatch of our own should never trigger the listeners hence the default true
    private dispatchDown(channel: string, message: Message, ignoreListeners = true, callBrokerListeners = true) {
        if (!ignoreListeners) {
            this.msgCallListeners(channel, message);
        }
        this.processedMessages[message.identifier] = message.creationDate;
        let evt = Broker.transformToEvent(channel, message);

        /*we now notify all iframes lying underneath */
        Array.prototype.slice.call(document.querySelectorAll("iframe")).forEach((element: HTMLIFrameElement) => {
            let messageWrapper = new MessageWrapper(channel, message);
            element.contentWindow.postMessage(JSON.parse(JSON.stringify(messageWrapper)), message.targetOrigin);
        });

        Array.prototype.slice.call(document.querySelectorAll("[data-broker='1']")).forEach((element: HTMLElement) => element.dispatchEvent(evt))

        if (callBrokerListeners) {
            Broker.dispatchSameLevel(channel, message);
        }
    }


    private msgCallListeners(channel: string, message: Message) {
        let listeners = this.messageListeners[channel];
        if (listeners?.length) {
            let callElement = (element: (msg: Message) => void) => {
                element(message);
            }

            listeners.forEach(callElement);
        }
    }

    private static transformToEvent(channel: string, message: Message, bubbles = false): CustomEvent {
        let messageWrapper = new MessageWrapper(channel, message);
        messageWrapper.bubbles = bubbles;
        return Broker.createCustomEvent(Broker.EVENT_TYPE, messageWrapper);
    }

    private static createCustomEvent(name: string, wrapper: MessageWrapper): any {
        if ('function' != typeof window.CustomEvent) {
            let e: any = document.createEvent('HTMLEvents');
            e.detail = wrapper.detail;
            e.channel = wrapper.channel;
            e.initEvent(name, wrapper.bubbles, wrapper.cancelable);
            return e;

        } else {
            let customEvent = new window.CustomEvent(name, wrapper);
            (<any>customEvent).channel = wrapper.channel;
            return customEvent;
        }

    }
}