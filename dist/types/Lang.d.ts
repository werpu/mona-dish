import { CancellablePromise } from "./Promise";
import { Optional } from "./Monad";
/**
 * Lang helpers crossported from the apache myfaces project
 */
export declare class Lang {
    private static _instance;
    static get instance(): Lang;
    /**
     * helper function to savely resolve anything
     * this is not an elvis operator, it resolves
     * a value without exception in a tree and if
     * it is not resolvable then an optional of
     * a default value is restored or Optional.empty
     * if none is given
     *
     * usage
     * <code>
     *     let var: Optiona<string> = saveResolve(() => a.b.c.d.e, "foobaz")
     * </code>
     *
     * @param resolverProducer a lambda which can produce the value
     * @param defaultValue an optional default value if the producer failes to produce anything
     * @returns an Optional of the produced value
     */
    static saveResolve<T>(resolverProducer: () => T, defaultValue?: T): Optional<T>;
    static saveResolveLazy<T>(resolverProducer: () => T, defaultValue?: () => T): Optional<T>;
    /**
     * String to array function performs a string to array transformation
     * @param {String} it the string which has to be changed into an array
     * @param {RegExp} splitter our splitter reglar expression
     * @return an array of the splitted string
     */
    strToArray(it: string, splitter?: string | RegExp): Array<string>;
    arrToMap(arr: any[], offset?: number): any[];
    /**
     * hyperfast trim
     * http://blog.stevenlevithan.com/archives/faster-trim-javascript
     * crossported from dojo
     */
    trim(str: string): string;
    /**
     * Backported from dojo
     * a failsafe string determination method
     * (since in javascript String != "" typeof alone fails!)
     * @param it {|Object|} the object to be checked for being a string
     * @return true in case of being a string false otherwise
     */
    isString(it?: any): boolean;
    isFunc(it: any): boolean;
    /**
     * hitch backported from dojo
     * hitch allows to assign a function to a dedicated scope
     * this is helpful in situations when function reassignments
     * can happen
     * (notably happens often in lazy xhr code)
     *
     * @param {Function} scope of the function to be executed in
     * @param {Function} method to be executed, the method must be of type function
     *
     * @return whatever the executed method returns
     *
     */
    hitch(scope: any, method: Function): Function;
    /**
     * simplified merge maps which basically produces
     * a final merged map from left to right
     * the function is sideffect free
     * @param maps
     */
    mergeMaps(maps: {
        [key: string]: any;
    }[], overwrite?: boolean, blockFilter?: Function, whitelistFilter?: Function): {
        [key: string]: any;
    };
    /**
     * Helper function to merge two maps
     * into one
     * @param {Object} dest the destination map
     * @param {Object} src the source map
     * @param {boolean} overwrite if set to true the destination is overwritten if the keys exist in both maps
     * @param blockFilter
     * @param whitelistFilter
     **/
    mixMaps<T>(dest: {
        [key: string]: T;
    }, src: {
        [key: string]: T;
    }, overwrite: boolean, blockFilter?: Function, whitelistFilter?: Function): {
        [key: string]: T;
    };
    /**
     * generic object arrays like dom definitions to array conversion method which
     * transforms any object to something array like
     * @param obj
     * @param offset
     * @param pack
     * @returns an array converted from the object
     */
    objToArray<T>(obj: any, offset?: number, pack?: Array<T>): Array<T>;
    /**
     * foreach implementation utilizing the
     * ECMAScript wherever possible
     * with added functionality
     *
     * @param arr the array to filter
     * @param callbackfn
     * @param startPos
     * @param scope the closure to apply the function to, with the syntax defined by the ecmascript functionality
     * function (element<,key, array>)
     * <p />
     * optional params
     * <p />
     * <ul>
     *      <li>param startPos (optional) the starting position </li>
     *      <li>param scope (optional) the scope to apply the closure to  </li>
     * </ul>
     */
    arrForEach<T>(arr: any, callbackfn: (value: T, index: number, array: T[]) => void, startPos?: number, scope?: Function): void;
    /**
     * checks if an array contains an element
     * @param {Array} arr   array
     * @param {String} str string to check for
     */
    contains<T>(arr: T[], str: string): boolean;
    /**
     * adds a EcmaScript optimized indexOf to our mix,
     * checks for the presence of an indexOf functionality
     * and applies it, otherwise uses a fallback to the hold
     * loop method to determine the index
     *
     * @param arr the array
     * @param element the index to search for
     * @param fromIndex
     */
    arrIndexOf<T>(arr: any, element: T, fromIndex?: number): number;
    /**
     * filter implementation utilizing the
     * ECMAScript wherever possible
     * with added functionality
     *
     * @param arr the array to filter
     * @param scope the closure to apply the function to, with the syntax defined by the ecmascript functionality
     * function (element<,key, array>)
     * <p />
     * additional params
     * <ul>
     *  <li> startPos (optional) the starting position</li>
     *  <li> scope (optional) the scope to apply the closure to</li>
     * </ul>
     */
    arrFilter<T>(arr: any, callbackfn: (value: T, index?: number, array?: T[]) => boolean, startPos?: number, scope?: Function): T[];
    /**
     * helper to automatically apply a delivered arguments map or array
     * to its destination which has a field "_"<key> and a full field
     *
     * @param dest the destination object
     * @param args the arguments array or map
     * @param argNames the argument names to be transferred
     */
    /**
     * helper to automatically apply a delivered arguments map or array
     * to its destination which has a field "_"<key> and a full field
     *
     * @param dest the destination object
     * @param args the arguments array or map
     * @param argNames the argument names to be transferred
     */
    applyArgs<T>(dest: any, args: {
        [key: string]: T;
    } | Array<T>, argNames?: Array<string>): any;
    /**
     * equalsIgnoreCase, case insensitive comparison of two strings
     *
     * @param source
     * @param destination
     */
    equalsIgnoreCase(source: string, destination: string): boolean;
    timeout(timeout: number): CancellablePromise;
    interval(timeout: number): CancellablePromise;
    /**
     * runtime type assertion
     *
     * @param probe the probe to be tested for a type
     * @param theType the type to be tested for
     */
    assertType(probe: any, theType: any): boolean;
}
