
/*
 * A small stream implementation, at the moment still early evaluation but i will go for a lazy pattern in the long
 * run to allow infinite data sources
 */
import {IMonad, IValueHolder, Monad} from "./Monad";

class ArrayStreamDataSource<T> {
    value: Array<T>;
    dataPos: 0;

    constructor(...value: Array<T>) {
        this.value = value;
    }

    hasNext(): boolean {
        return this.value.length - 1 < this.dataPos;
    }

    next(): T {
        return this.value[++this.dataPos];
    }

    reset() {
        this.dataPos = 0;
    }
}


export class Stream<T> implements IMonad<T, Stream<any>>, IValueHolder<Array<T>> {

    dataSource: ArrayStreamDataSource<T>;

    /*constructor(...value: T[]) {
        this.value = value;
    }*/

    constructor(value: Array<T>, private predecessor?: Stream<T>, private parentCall?: Function) {
        this.dataSource = new ArrayStreamDataSource<T>(...value);

    }

    static of<T>(...data: Array<T>): Stream<T> {
        return new Stream<T>(data);
    }

    //not an endpoint or endpoint, for now endpoint
    each(fn: (data: T, pos ?: number) => void | boolean) {

        let ret = [];

        while(this._hasNext()) {
            let value = this.dataSource.next();
            if(Optional.fromNullable(value).isAbsent()) {
                break;
            }
            ret.push(value);
            if (fn(value, this.dataSource.dataPos) === false) {
                break;
            }
        }
        return new Stream(ret);
    }

    _hasNext(): boolean {
        if(this.dataSource != null) {
            return this.dataSource.hasNext();
        } else {
            return this.predecessor._hasNext();
        }
    }

    _next():T {
        if(this.dataSource != null) {
            return this.dataSource.next();
        } else {
            let retVal = this.predecessor._next();
            if(this.parentCall) {
                return this.parentCall(retVal);
            }
        }
    }

    /**
     * map the stream elements from one element to another
     *
     * @param fn mapping function
     *
     * lazy function
     */
    map<R>(fn?: (data: T) => R): Stream<R> {
        let thisCall = (data: T) => {
            if (!fn) {
                fn = (inval: any) => <R>inval;
            }
            return fn(data);
        };

        return new Stream<R>(null,<any> this, thisCall);
    }

    /*
     * flatmaps streamns...
     * this means if some of the data is a stream itself, it is mapped back
     * and the result is a single stream of data
     *
     * @param fn mapping function
     */
    flatMap<R>(fn?: (data: T) => R): Stream<any> {
        let mapped: Stream<R> = this.map(fn);
        let res = this.mapStreams(mapped);
        return new Stream(...res);
    }

    /**
     * Simple Filter ... filters the data according to a Function passed down...
     *
     * @param fn filter function returning true in case of a filter match (element should be kept)
     *
     * lazy function
     */
    filter(fn?: (data: T) => boolean): Stream<T> {
        let res: Array<T> = [];
        this.each((data) => {
            if (fn(data)) {
                res.push(data);
            }
        });
        return new Stream<T>(...res);
    }

    limit(noElems: number): Stream<T> {
        let newArr = this.value.slice(0, Math.min(noElems, this.value.length));
        return new Stream(...newArr);
    }

    /**
     * right reduce val3 = val1 + val2 -> val4 = val3 + val4
     *
     * @param fn the reduction function
     * @param startVal starting with this value the reduction should happen
     */
    reduce(fn: (val1: T, val2: T) => T, startVal: T = null): Optional<T> {
        let offset = startVal != null ? 0 : 1;
        let val1 = startVal != null ? startVal : this.value.length ? this.value[0] : null;

        for (let cnt = offset; cnt < this.value.length; cnt++) {
            val1 = fn(val1, this.value[cnt]);
        }
        return Optional.fromNullable(val1);
    }

    /**
     * first element
     */
    first(): Optional<T> {
        return this.value && this.value.length ? Optional.fromNullable(this.value[0]) : Optional.absent;
    }

    /**
     * last element
     */
    last(): Optional<T> {
        //could be done via reduce, but is faster this way
        return Optional.fromNullable(this.value.length ? this.value[this.value.length - 1] : null);
    }

    /**
     * something matches
     *
     * @param fn the match function
     */
    anyMatch(fn: (data: T) => boolean): boolean {
        for (let cnt = 0; cnt < this.value.length; cnt++) {
            if (fn(this.value[cnt])) {
                return true;
            }
        }
        return false;
    }

    /**
     * every single item matches
     *
     * @param fn match function
     */
    allMatch(fn: (data: T) => boolean): boolean {
        if (!this.value.length) {
            return false;
        }
        let matches = 0;
        for (let cnt = 0; cnt < this.value.length; cnt++) {
            if (fn(this.value[cnt])) {
                matches++;
            }
        }
        return matches == this.value.length;
    }

    /**
     * not a single element matches
     *
     * @param fn match function
     */
    noneMatch(fn: (data: T) => boolean): boolean {
        let matches = 0;
        for (let cnt = 0; cnt < this.value.length; cnt++) {
            if (fn(this.value[cnt])) {
                matches++;
            }
        }
        return matches == this.value.length;
    }

    private mapStreams<R>(mapped: Stream<R>): Array<R> {
        let res: Array<R> = [];
        mapped.each((data: any) => {
            if (data instanceof Stream) {
                res = res.concat(this.mapStreams(data));
            } else {
                res.push(data);
            }
        });
        return res;
    }
}

/**
 * optional implementation, an optional is basically an implementation of a Monad with additional syntactic
 * sugar on top
 * (Sideeffect free, since value assignment is not allowed)
 * */
export class Optional<T> extends Monad<T> {

    /*default value for absent*/
    static absent = Optional.fromNullable(null);

    constructor(value: T) {
        super(value);
    }

    get value(): T {
        if (this._value instanceof Monad) {
            return this._value.flatMap().value
        }
        return this._value;
    }

    static fromNullable<T>(value?: T): Optional<T> {
        return new Optional(value);
    }

    /*syntactic sugar for absent and present checks*/
    isAbsent(): boolean {
        return "undefined" == typeof this.value || null == this.value;
    }

    isPresent(): boolean {
        return !this.isAbsent();
    }

    orElse(elseValue: any): Optional<any> {
        if (this.isPresent()) {
            return this;
        } else {
            //shortcut
            if (elseValue == null) {
                return Optional.absent;
            }
            return this.flatMap(() => elseValue);
        }
    }

    /**
     * lazy, passes a function which then is lazily evaluated
     * instead of a direct value
     * @param func
     */
    orElseLazy(func: () => any): Optional<any> {
        if (this.isPresent()) {
            return this;
        } else {
            return this.flatMap(func);
        }
    }

    /*
     * we need to implement it to fullfill the contract, although it is used only internally
     * all values are flattened when accessed anyway, so there is no need to call this methiod
     */
    flatMap<R>(fn?: (data: T) => R): Optional<any> {
        let val = super.flatMap(fn);
        if (!(val instanceof Optional)) {
            return Optional.fromNullable(val.value);
        }

        return <Optional<any>>val.flatMap();
    }

    /*
     * elvis operation, take care, if you use this you lose typesafety and refactoring
     * capabilites, unfortunately typesceript does not allow to have its own elvis operator
     * this is some syntactic sugar however which is quite useful*/
    getIf<R>(...key: string[]): Optional<R> {

        let currentPos: Optional<any> = this;
        for (let cnt = 0; cnt < key.length; cnt++) {
            let currKey = this.keyVal(key[cnt]);
            let arrPos = this.arrayIndex(key[cnt]);

            if (currKey === "" && arrPos >= 0) {
                currentPos = this.getClass().fromNullable(!(currentPos.value instanceof Array) ? null : (currentPos.value.length < arrPos ? null : currentPos.value[arrPos]));
                if (currentPos.isAbsent()) {
                    return currentPos;
                }
                continue;
            } else if (currKey && arrPos >= 0) {
                if (currentPos.getIfPresent(currKey).isAbsent()) {
                    return currentPos;
                }
                currentPos = (currentPos.getIfPresent(currKey).value instanceof Array) ? this.getClass().fromNullable(currentPos.getIfPresent(currKey).value[arrPos]) : this.getClass().absent;
                if (currentPos.isAbsent()) {
                    return currentPos;
                }
                continue;

            } else {
                currentPos = currentPos.getIfPresent(currKey);
            }
            if (currentPos.isAbsent()) {
                return currentPos;
            } else if (arrPos > -1) {
                currentPos = this.getClass().fromNullable(currentPos.value[arrPos]);
            }
        }
        let retVal = currentPos;

        return retVal;
    }

    /**
     * simple match, if the first order function call returns
     * true then there is a match, if the value is not present
     * it never matches
     *
     * @param fn the first order function performing the match
     */
    match(fn: (item: T) => boolean): boolean {
        if (this.isAbsent()) {
            return false
        }
        return fn(this.value);
    }

    /**
     * convenience function to flatmap the internal value
     * and replace it with a default in case of being absent
     *
     * @param defaultVal
     * @returns {Optional<any>}
     */
    get<R>(defaultVal: any = Optional.absent): Optional<R> {
        if (this.isAbsent()) {
            return this.getClass().fromNullable(defaultVal).flatMap();
        }

        return this.getClass().fromNullable(this.value).flatMap();
    }

    toJson(): string {
        return JSON.stringify(this.value);
    }

    /**
     * helper to override several implementations in a more fluent way
     * by having a getClass operation we can avoid direct calls into the constructor or
     * static methods and do not have to implement several methods which rely on the type
     * of "this"
     * @returns {Monadish.Optional}
     */
    protected getClass(): any {
        return Optional;
    }

    /*helper method for getIf with array access aka <name>[<indexPos>]*/
    protected arrayIndex(key: string): number {
        let start = key.indexOf("[");
        let end = key.indexOf("]");
        if (start >= 0 && end > 0 && start < end) {
            return parseInt(key.substring(start + 1, end));
        } else {
            return -1;
        }
    }

    /*helper method for getIf with array access aka <name>[<indexPos>]*/
    protected keyVal(key: string): string {
        let start = key.indexOf("[");

        if (start >= 0) {
            return key.substring(0, start);
        } else {
            return key;
        }
    }

    /**
     * additional syntactic sugar which is not part of the usual optional implementation
     * but makes life easier, if you want to sacrifice typesafety and refactoring
     * capabilities in typescript
     */
    private getIfPresent<R>(key: string): Optional<R> {
        if (this.isAbsent()) {
            return this.getClass().absent;
        }
        return this.getClass().fromNullable(this.value[key]).flatMap();
    }

}