# 🚀 messaging - A simple messaging bus

This project is a library which provides a jms like messaging
between different isolation layers in a web page...

The ideas is that méssages are sent via different channels
and then ever isolation layer can subscribe to those channels
and receive the messages. Or send messages back into the channel.

What can be bridged

* normal dom elements within a single document
* iframes 
* shadow html closed and open
* popups (very likely, they use the same mechanisms as iframe, not tested though)

What cannot be bridged. Everything which is not connected on the same document
one way or the other aka, either has no direct dom connection or the parent
has no window/shadowRoot/dom reference to the other isolated part!


## building the library

```
npm run build
```



to bundle the library application


## Usage

### Brokers

Brokers are the central hook point into the message bus
they are responsible for sending and receiving the messages
and for distributing them over the boundaries.

Every isolation layer needs one or more brokers (usually one)

### Messages

Messages: Message units containing data and the channel name they should be sent to

### Channels

channels: String identifiers for the bus... to where to distribute the messages to

### Listeners

Ever broker has one or more listeners listening to channels
a channel name of * means receive all messages
or send to

shadowBroker.broadcast(CHANNEL, new Message("booga2"), Direction.DOWN);

### usage


For receiving and sending data perform following operation
* define a new broker with a reference to your isolation root (no isolation root means window)
* register listeners via the registerListener method
* for sending use the broadcast method!


### Example:

```typescript
 let broker1 = new Broker();//define a broker with a window context
 let shadowBroker = new Broker(shadowRoot, "shadow");    //define a broker with a shadow root reference and a name

 /*
  * registers a listener on the channel
  */   
 shadowBroker.registerListener(CHANNEL, (msg: Message) => {
    shadowBrokerReceived++;
 });
 /*
  * send a message into the messag bus, direction up from the current position
  * possible directions UP, DOWN, ALL, default if no value is given
  * is all, which is the behavior expected from a one dimensional bus
  * UP and down introduces a two dimensional behavior allowing a direction within the 
  * dom hierarchy where the message has to be processed from the current position
  * (aka subbus behavior)
  *
  * Also not the issuing broker never receives the message it sends 
  * out... only the others do
  */ 
 shadowBroker.broadcast(CHANNEL, new Message("booga2"), Direction.UP);

 shadowBroker.unregister(); //unregisters the current broker from the existing dom isolation layer
 //in case of a destruction of the layer referenced the deregistration happens automatically
```

Request and answer:
On top of the usual channel/listener api a request
anser api has been provided

````typescript
        let broker = new BroadcastChannelBroker();
        let broker2 = new BroadcastChannelBroker();
        let answerReceived = false;
        broker2.registerListener("channel", (message: Message): void => {
            setTimeout(() => broker2.answer("channel", message, new Message("answer of booga")), 0);
        })

        return broker.request("channel", new Message("booga"))
            .then((message2: Message) => {
                answerReceived = message2.message === "answer of booga";
                expect(answerReceived).to.be.true;
                return true;
            }).finally(() => {
                broker.unregister();
                broker2.unregister();
            });
````

As we can see here, we have two brokers and a request is sent into the channel
and an answer is sent back. The requesting broker
then has a promise which waits until the first answer is received
and processes it.
Note this is happens on a first served base if multiple answers are sent.
If you need to collect answer data from more than one
answer sources, you have to use a standard channel listener mechanism.

The request answer mechanism is seen as a simple way to query global data


### API


```typescript
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
    channel: string;
    creationDate?: number;
    identifier?: string;
    targetOrigin?: string;
    constructor(channel: string, message?: any, targetOrigin?: string);
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
 * broker.broadcast(channel, message, optional direction, optional callBrokerListeners)
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
 */
export declare class Broker {
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
     * scoe
     */
    unregister(): void;
    /**
     * registers a listener on a channel
     * @param channel the channel to register the listeners for
     * @param listener the listener to register
     */
    registerListener(channel: string, listener: (msg: Message) => void): void;
    /**
     * unregisters a listener from this channel
     *
     * @param channel the channel to unregister from
     * @param listener the listener to unregister the channel from
     */
    unregisterListener(channel: string, listener: (msg: Message) => void): void;
    /**
     * broadcast a message
     * the message contains the channel and the data and some internal bookeeping data
     * @param channel the channel to broadcast to
     * @param message the message dot send
     * @param direction the direction (up, down, both)
     * @param callBrokerListeners if set to true.. the brokers on the same level are also notified
     * (for instance 2 iframes within the same parent broker)
     *
     */
    broadcast(channel: string, message: Message, direction?: Direction, callBrokerListeners?: boolean): void;

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
    answer(channel: string, request: Message, answer: Message);
    

```
Note, the standard broker works over dom mechanisms.
However a secondary broker has been provided which 
allows the same over export class BroadcastChannel api.
The BroadcastChannelBroker!

This broker allows to use Broadcast channels (shim 
or native, or even passed as argument)
and uses this transport mechanism, and addes the extended
message response on top.


