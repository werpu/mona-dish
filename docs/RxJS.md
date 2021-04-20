# RxJS Connectivity
In recent years, rxjs has become a very popular
way of adressing data transformations and event handling
in a reactive way.
It uses the observer pattern.

Theoretically the overlap between rxjs and mona-dish is high
but both have different strenghts in other subparts.
Where they overlap is mostly in iteration filtering etc...

While RxJS is a reactive api, awaiting a fixed 
processing event handler at the end, mona-dish streams
is a stream api, providing different collectors
and collecting the data in a side effect free way.

At the moment the rxjs bridge is in the works and for the
time being provides only a way from Streams into rxjs.

The other way the data needs to be collected and mapped into
a stream (I will have a look for a better way in the future)


Example of forwarding data from Stream/Lazystream into RxJS
````typescript
    let probe: Array<number> = [1, 2, 3, 4, 5];
    let probe2: Array<number> = [6, 7, 8, 9, 10];
    
    let stream1 = LazyStream.of<number>(...probe).filter(item => {
        return item != 2;
    });;
    let stream2 = LazyStream.of<number>(...probe2);
    
    let o1 = from(stream1);
    let o2 = from(stream2);
    
    
    let cnt1 = 0;
    let val1  = 0;
    o1.subscribe(value => {
        cnt1++;
        val1 = value;
    })
    
    expect(cnt1 == probe.length - 1).to.be.true;
    expect(val1).to.eq(5);
    
    let cnt2 = 0;
    let val2  = 0;
    o2.subscribe(value => {
        cnt2++;
        val2 = value;
    })
    
    expect(cnt2 == probe.length).to.be.true;
    expect(val2).to.eq(10);
 ````
In this example 2 lazy streams are provided
and then mapped via thge from operator straight into rxjs


### DomQuery and XML Query

For the time being due to technical limitations only streams
can be mapped, so you can use the stream property to map 
a DomQuery and XMLQuery object or a Configuration straight
into an RxJS Observer:

```typescript
    let probe1 = new DomQuery(window.document.body);
    let probe2 = DomQuery.querySelectorAll("div");
    
    //now we connect our dom query object
    //with rjxs via the from function
    let rx1 = from(probe1.stream);
    let rx2 = from(probe2.stream);
    
    let cnt1 = 0;
    let isDQuery = false;
    let cnt2 = 0;

    rx1.subscribe((item: any) => {
        cnt1++;
    });
    
    rx2.subscribe((item: any) => {
        cnt2++;
        isDQuery = (item.length == 1) && (item instanceof DomQuery)
    })
    
    expect(probe1.length).to.be.eq(1);
    expect(probe2.length == 4).to.be.true;
    expect(isDQuery).to.be.true;
```