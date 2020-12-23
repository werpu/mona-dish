/**
 * Message direction
 */
export enum Direction {
    UP, DOWN, ALL
}

/**
 * a standardized message to be sent over the message bus
 */
export class Message {

    creationDate?:number;
    identifier?:string;
    targetOrigin?:string;

    constructor( public message: any = {}, targetOrigin="*") {
        this.targetOrigin = targetOrigin;
        this.creationDate = new Date().getMilliseconds();
        this.identifier = new Date().getMilliseconds()+"_"+ Math.random()+"_"+ Math.random();
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
export class Broker {

    static readonly EVENT_TYPE = "brokerEvent";
    /**
     * we can split the listeners with the system
     * namespace... and type (aka identifier criteria)
     */
    private messageListeners: any = {};
    private processedMessages: any = {};
    private cleanupCnt = 0;
    private rootElem;
    private msgHandler;

    private readonly TIMEOUT_IN_MS = 1000;
    private readonly MSG_EVENT = "message";

    /**
     * constructor has an optional root element
     * and an internal name
     *
     * @param scopeElement
     * @param name
     */
    constructor(scopeElement: HTMLElement | Window | ShadowRoot = window, public name = "brokr") {

        /**
         * message relay.. identifies message events and relays them to the listeners
         * @param event
         */
        let evtHandler = (event: MessageEvent | CustomEvent<Message>) => {
            let details = (<any>event)?.detail ?? (<MessageEvent>event)?.data?.detail;
            let channel =  ((<any>event)?.data?.channel) ?? ((<any>event)?.channel);

            //javascript loses the type info in certain module types
            if (details?.identifier && details?.message) {
                let msg: Message = details;
                if (msg.identifier in this.processedMessages) {
                    return;
                }
                //coming in from up... we need to send it down
                //a relayed message always has to trigger the listeners as well
                this.broadcast(channel, msg, Direction.DOWN, false);
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
            if(scopeElement?.["setAttribute"])
                (<any>scopeElement).setAttribute("data-broker", "1");
        }

        this.rootElem.addEventListener(Broker.EVENT_TYPE, this.msgHandler, {capture: true});
        /*dom message usable by iframes*/
        this.rootElem.addEventListener(this.MSG_EVENT, this.msgHandler, {capture: true});
    }

    /**
     * manual unregister function, to unregister as broker from the current
     * scoe
     */
    unregister() {
        this.rootElem.removeListener(Broker.EVENT_TYPE, this.msgHandler)
        this.rootElem.removeListener(this.MSG_EVENT, this.msgHandler)
    }

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
     * unregisters a listener from this channel
     *
     * @param channel the channel to unregister from
     * @param listener the listener to unregister the channel from
     */
    unregisterListener(channel: string, listener: (msg: Message) => void) {
        this.messageListeners[channel] = (this.messageListeners[channel] || []).filter((item: any) => item !== listener);
    }

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
    broadcast(channel: string, message: Message, direction: Direction = Direction.ALL, callSameLevel = true) {
        try {
            switch (direction) {
                case Direction.DOWN:
                    this.dispatchDown(channel, message, false, callSameLevel);
                    break;
                case Direction.UP:
                    this.dispatchUp(channel, message,false , callSameLevel)
                    break;
                case Direction.ALL:
                    this.dispatchBoth(channel, message);
                    break;
            }
        } finally {
            this.gcProcessedMessages();
        }
    }

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
    request(channel: string, message: Message, direction: Direction = Direction.ALL, callBrokerListeners = true): Promise<Message> {

        let messageId = message.identifier;
        let ret = new Promise<Message>((resolve, reject) => {
            let timeout = null;
            let listener = (message2: Message) => {
                if(message2.identifier == "_r_"+messageId) {
                    clearTimeout(timeout);
                    this.unregisterListener(channel, listener);
                    resolve(message2);
                }
            }
            timeout = setTimeout(() => {
                this.unregisterListener(channel, listener);
                reject("no return value")
            }, 3000);
            this.registerListener(channel, listener);

        });
        setTimeout(() => this.broadcast(channel, message, direction, callBrokerListeners), 0);
        return ret;
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
     * @param direction the call direction
     * @param callBrokerListeners same level?
     */
    answer(channel: string, request: Message, answer: Message, direction: Direction = Direction.ALL, callBrokerListeners = true) {
        if(request.identifier.indexOf("_r_") == 0) {
            return;
        }
        answer.identifier = "_r_"+request.identifier;
        this.broadcast(channel, answer, direction, callBrokerListeners);
    }


    /**
     * garbage collects the processed messages queue
     * usually after one second
     */
    private gcProcessedMessages() {
        if ((++this.cleanupCnt) % 10 != 0) {
            return;
        }
        let newProcessedMessages: any = {};
        for (let key in this.processedMessages) {
            if (this.messageStillActive(key)) continue;
            newProcessedMessages[key] = this.processedMessages[key];
        }
        this.processedMessages = newProcessedMessages;
    }


    private dispatchBoth(channel: string, message: Message) {

        this.dispatchUp(channel, message, false, true);
        //listeners already called
        this.dispatchDown(channel, message, true, false)
    }

    private dispatchUp(channel: string, message: Message, ignoreListeners = true, callBrokerListeners = true) {
        if (!ignoreListeners) {
            this.msgCallListeners(channel, message);
        }
        this.processedMessages[message.identifier] = message.creationDate;
        if (window.parent != null) {

            let messageWrapper = new MessageWrapper(channel, message);
            window.parent.postMessage(JSON.parse(JSON.stringify(messageWrapper)), message.targetOrigin);
        }
        if (callBrokerListeners) {
            this.dispatchSameLevel(channel, message);
        }
    }

    private dispatchSameLevel(channel: string, message: Message) {
        let event = this.transformToEvent(channel, message, true);
        //we also dispatch sideways
        window.dispatchEvent(event);
    }

    //a dispatch of our own should never trigger the listeners hence the default true
    private dispatchDown(channel: string, message: Message, ignoreListeners = true, callBrokerListeners = true) {
        if (!ignoreListeners) {
            this.msgCallListeners(channel, message);
        }
        this.processedMessages[message.identifier] = message.creationDate;
        let evt = this.transformToEvent(channel, message);

        /*we now notify all iframes lying underneath */
        document.querySelectorAll("iframe").forEach((element: HTMLIFrameElement) => {
            let messageWrapper = new MessageWrapper(channel, message);
            element.contentWindow.postMessage(JSON.parse(JSON.stringify(messageWrapper)), message.targetOrigin);
        });

        document.querySelectorAll("[data-broker='1']").forEach((element: HTMLElement) => element.dispatchEvent(evt))

        if (callBrokerListeners) {
            this.dispatchSameLevel(channel, message);
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

    private transformToEvent(channel: string, message: Message, bubbles = false): CustomEvent {
        let messageWrapper = new MessageWrapper(channel, message);
        messageWrapper.bubbles = bubbles;
        return this.createCustomEvent(Broker.EVENT_TYPE, messageWrapper);
    }

    private createCustomEvent(name: string, wrapper: MessageWrapper): any {
        if ('undefined' == typeof window.CustomEvent) {
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

    private messageStillActive(key: string): boolean {
        return this.processedMessages[key] > ((new Date()).getMilliseconds() - this.TIMEOUT_IN_MS);
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
}