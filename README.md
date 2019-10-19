# Mona-dish

A set of monadish helpers

## What is it?

This project is a set of small helpers which utilize monad and monad like patterns 
to cut down on code for essential tasks.

For now it is only a small set of Helpers consisting of following items:

* Monad     ... an implementation of a Monad
* Optional  ... a class which is derived from Javas optional but also encapsulates elvis operator like accessors
                to cut down on code
* Promise   ... a promise implementation for older browsers (newer ones have Promised baked in)
* CancellablePromise ... a promise with cancel functionality
* Configuration ... an Optional utilizing wrapper over json configurations which allow both read and write access 
                   and elvis like access to the data stored in the config
                   

## Implementation languages
              
Everything is implemented in typescript and can be used straight from the source directories "src/main/typescript".

However also javascript transpilations for various packacking systems and ecmascript levels are in place as well hosted under "dist".

If you want a cleaner cut between your own typescript sources and the mona-dish sources there is a d.ts file also,
hosted under "dist".


## building

For building the project you need following
* npm
* webpack

once this is done you can build it by calling ./init.sh one time to install all the needed build dependencies,
after that calling /build.sh rebuilds the entire project.

You also can run mocha based unit tests on the project by calling ./test.sh

(note this is for unixoid systems, windows command files will be added soon, in the meanwhile simply check the command 
sequences in the sh files for building and testing)


## Usage

### Optional

The idea behind optional is to get rid of undefined and null, while providing a leaner way to access content.

instead of having following constructs constantly in your code

```
if("undefined" typeof myVar or null == myVar) {
    //do something
}
```

you can do it now like that

```
if(Optional.fromNullable(myVar).isAbsent()) {
    //do something
}
```

The same goes for exists checks:
```
val opt = Optional.fromNullable(myVar);
if(Optional.fromNullable(myVar).isPresent()) {
    //do something
    var theValue = opt.value; //lets fetch the value
}
```

Also as convenience you now have an easier way to check for existence in nested structures
```
 var myStruct = {
            data: {
                value: 1,
                value2: Optional.absent,
                value4: Optional.fromNullable(1)
            },
            data2: [
                {booga: "hello"},
                "hello2"
            ]
        };
        
        var opt = Optional.fromNullable(myStruct);
        opt.getIf("data", "value3").isAbsent(); // returns true
        opt.getIf("data", "value4").value; //returns 1
        opt.getIf("data2[0]", "booga").value; //returns "hello"
        opt.getIf("data2[1]").value; //returns "hello2"
                
```             
  
As you can see, it is very easy to fetch cascaded data. The result of getIf always is another optional.
To access the value of the optional, simply use the .value property.
  
Optional is readonly and sideffect free.
  
For a non sideffect free implementation, you can use:
  
### Configuration  

Configuration basically is a non sideffect free implementation of Optional. Aka, you can assign values
to certain points in your data representation.


Example:

```
var config = new Config({
                         data: {
                             value: 1,
                             value2: Optional.absent,
                             value3: null
                         },
                         data2: [
                             {booga: "hello"},
                             "hello2"
                         ]
                     });
                     
config.getIf("hello", "world", "from").isAbsent() //returns true                     
config.apply("hello", "world", "from").value = "me" //we now assign a new value under the config tree                    
config.getIf("hello", "world", "from").value // returns  "me"     
config.getIf("hello", "world", "from").isAbsent() //returns now false
              
/*
 the config data now looks like:
 {
  data: {
      value: 1,
      value2: Optional.absent,
      value3: null
  },
  data2: [
      {booga: "hello"},
      "hello2"
  ],
  hello: {
      world: {
          from: "me"
      }
  }
}             

*/              

```


Also the assignment of arrays is possible:

```
config.apply("hello[5]", "world[3]", "from[5]").value = "me"

/*
 the config data now looks like:
 {
  data: {
      value: 1,
      value2: Optional.absent,
      value3: null
  },
  data2: [
      {booga: "hello"},
      "hello2"
  ],
  hello:[
  null,
  null,
  null,
  null,
  null,
  world: [
        null,
        null,
        null,
        from: [
            null,
            null,
            null,
            null,
            null,
            "me"
        ]
    ]
  ]
  
}             

*/    

```
As you can see if values do not exist placeholders in array assignments are filled in (null values in our case)  
  
### Promise and CancellablePromise

Promise is just a lightweight shim of the Promise API including finally.
Cancellable promise adds on top of that by allowing to cancel 
(aka never hit the then/cancel phase)

### DomQuery

A small lightweight thin layer on top of the standardized dom apis which readds jquery like 
monadish patterns on top of the existing dom elements.
It omits a base parser, given that modern browsers have excellent qerying capabilits
just with the overhead of an iterative API.
DomQuery readds the slickness of functional patterns, which are perfect for the job of Tree Querying.

### Stream

work in progress.. the idea is to have streams like java does for arrays.
(forEach, filter etc...)

#### Details

The streams are heavily influenced by the java streams.
Currently two type of Streams are implemented
* Early Streams (Streams)

The default (working already)
a simple implementation of early evaluating streams 
 
* Lazy Streams (LazyStreams)
Laziily evaluating streams, aka elements are processed at the latest possible
stage, this is the default in Java. The advantage of those is
you basically can process endless data without any impact on ram.
Hence there is a set of Data Providers implemented and a general
DataProvider interface available.

Those are a work in progress, about 80% of this implementation is tested.

###### Methods


```Typescript
/**
 * Generic interface defining a stream
 */
export interface IStream<T> {
    /**
     * Perform the operation fn on a single element in the stream at a time
     * then pass the stream over for further processing
     * This is basically an intermediate point in the stream
     * with further processing happening later, do not use
     * this method to gather data or iterate over all date for processing
     * (for the second case each has to be used)
     *
     * @param fn the processing function, if it returns false, further processing is stopped
     */
    onElem(fn: (data: T, pos ?: number) => void | boolean): IStream<T>;

    /**
     * Iterate over all elements in the stream and do some processing via fn
     *
     * @param fn takes a single element and if it returns false
     * then further processing is stopped
     */
    each(fn: (data: T, pos ?: number) => void | boolean): void;

    /**
     * maps a single element into another via fn
     * @param fn function which takes one element in and returns another
     */
    map<R>(fn?: (data: T) => R): IStream<R>;

    /**
     * Takes an element in and returns a set of something
     * the set then is flatted into a single stream to be further processed
     *
     * @param fn
     */
    flatMap<R>(fn?: (data: T) => IStream<R>): IStream<any>;

    /**
     * filtering, takes an element in and is processed by fn.
     * If it returns false then further processing on this element is skipped
     * if it returns true it is passed down the chain.
     *
     * @param fn
     */
    filter(fn?: (data: T) => boolean): IStream<T>;

    /**
     * functional reduce... takes two elements in the stream and reduces to
     * one from left to right
     *
     * @param fn the reduction function for instance (val1,val2) => val1l+val2
     * @param startVal an optional starting value, if provided the the processing starts with this element
     * and further goes down into the stream, if not, then the first two elements are taken as reduction starting point
     */
    reduce(fn: (val1: T, val2: T) => T, startVal: T): Optional<T>;

    /**
     * returns the first element in the stream is given as Optional
     */
    first(): Optional<T>;

    /**
     * Returns the last stream element (note in endless streams without filtering and limiting you will never reach that
     * point hence producing an endless loop)
     */
    last(): Optional<T>;

    /**
     * returns true if there is at least one element where a call fn(element) produces true
     *
     * @param fn
     */
    anyMatch(fn: (data: T) => boolean): boolean;

    /**
     * returns true if all elmements produce true on a call to fn(element)
     *
     * @param fn
     */
    allMatch(fn: (data: T) => boolean): boolean;

    /**
     * returns true if no elmements produce true on a call to fn(element)
     *
     * @param fn
     */
    noneMatch(fn: (data: T) => boolean): boolean;

    /**
     * Collect the elements with a collector given
     * There are a number of collectors provided
     *
     * @param collector
     */
    collect(collector: ICollector<T, any>): any;

    /**
     * Limits the stream to a certain number of elements
     * 
     * @param end the limit of the stream
     */
    limits(end: number): IStream<T>;

    /**
     * returns the stream collected into an array (90% use-case abbreviation
     */
    value: Array<T>;
}

```

### XmlQuery

similar to DomQuery but atm without a full query engine behind it,
the reason for that is that the browsers do not have a universal query engine yet
and I tried to avoid third party dependencies.
But you get many other benefits similar to DomQuery by using XmlQuery


### Monad

TODO add description and examples here


                   
                   