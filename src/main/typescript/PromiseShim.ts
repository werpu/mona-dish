/**
 * Promise shim which uses our Promise implementation in the window context
 */

import {Promise as _Promise} from "./Promise";

if(!Promise) {
    //we register promise in the global context
    (window as any)["Promise"] = _Promise;
}
