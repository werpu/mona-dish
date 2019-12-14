# The mona-dish streaming api

* note this documentation is a work in progress, i will 
add additional information as my time allows. So stay tuned.

The mona-dish streaming api was heavily inspired by
the java streaming api, which allows to 
use finite and infinite collections and perform operations
on the data in a functional manner.
Same as in java the mona-disn api has lazy and early streams.

Both stream types have their upside and downsides.

## General introduction

What are streams.
The idea of streams is heavily influenced by the lisp way of handling collections
lazily. In Lisp you basically have collections which can be seen
as Stream of data on which operations can be performed. 
The advantage of this method is that practially you do not have to know
upfront how much data you process and the entire data
processing is performed in small chunks of monadish operations.

Other languages have adopted this idea of treating data in a functional
stream, Java for instance with Java 8.

Now why here in mona-dish? Simple, the pattern is exactly what mona-dish
tries to cover. Functional monadish patterns. And frankly spoken
I needed it for the apache myfaces javascript codebase.

So to stay save licenswise, I implemented streams within the context of this project.

## Early and Lazy streams

What is the difference. In lazy streams each operation is peformed at
the latest point possible in time (most of the time during collecting the data but not necessarily so)
in the order the operations were performed.

Early streams perform the operation at the point in time of the stream 
they are defined... 

Both methods have advantages and disadvantages

Early streams, are faster on small known numbers of datasets, however
for deep chains they might become slower again.

Lazy streams are slower for small number of datasets, but they start
to outperform the early streams beyound a certain number of datasets
and operations nesting threshold.

Also you dont have to know upfront how much data is served into the stream chain upfront,
and hence they use less ram because the chain is triggered
on a per item case instead of rolling over the entire collection at once.

### Usage

Each stream has three parts...
1. Datasource
2. Processing/Mapping
3. Reduction/Collection

So what does this mean?

#### Datasource 

Is the part which defines the data, usually it is an array or 
associative array, but generally anything producing data can be
a datasource, it only must implement the 

* *IStreamDataSource* interface with its methods 
 
#### Processing/Mapping

Is the processing part, basically a set of functions performed on a stream
which perform some kind of data transformation/filtering/processing

#### Reduction/Collection

On this stage the processed data is collected into the
expected type of representation


### Examples

So lets put all this theory into practice with a handful of examples


#### Simple Filter

```Typescript

let resultArr = LazyStream.of(...[1,2,3])
                          .filter(item => item != 2)
                          .collect(new ArrayCollector())  

```

would result in following result

```Typescript

resultArr == [1, 3]; //would result in true
```

So in our example we wilter a simple array and remove the number two
and collect the results of this operation in a new Array.

#### iteration over a collection


So following use-case. You need to perform an operation after a chain 
of other things, which do nothing to influence the stream items themselves.

So basically an endpoint which does not expect a result.

Lets take again our former example and alter it a little bit
```Typescript

LazyStream.of(...[1,2,3])
          .filter(item => item != 2)
          .each(item => console.log(item, " ")) 

```

this would result in a console output of

```Typescript
1 3
```

So nothing is returned... the items filter the number 2 upfront
and then print out the remaining items.

### Mapping and Flatmapping

So what is this... To sum it quickly up
mapping is the transformation of one element type into another
flatmapping is, that you sometimes return a collection and want
to streamlined it into your one dimensional stream.

Thats the theory behind it