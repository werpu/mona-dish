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
* gulp (npm install gulp-cli -g)

once this is done you can build it by calling ./init.sh one time to install all the needed build dependencies,
after that calling /build.sh rebuilds the entire project.

You also can run karma based unit tests on the project by calling ./test.sh

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

TODO will be added soon

### Monad

TODO add description and examples here


                   
                   