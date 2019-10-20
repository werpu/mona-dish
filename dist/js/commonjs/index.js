!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(s,n,function(t){return e[t]}.bind(null,n));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=7)}([function(e,t,r){"use strict";r.r(t),r.d(t,"Monad",(function(){return n})),r.d(t,"Optional",(function(){return l})),r.d(t,"ValueEmbedder",(function(){return i})),r.d(t,"Config",(function(){return u}));var s=r(1);class n{constructor(e){this._value=e}get value(){return this._value}map(e){e||(e=e=>e);let t=e(this.value);return new n(t)}flatMap(e){let t=this.map(e);for(;void 0!==t&&null!=t&&t.value instanceof n;)t=t.value;return t}}class l extends n{constructor(e){super(e)}get value(){return this._value instanceof n?this._value.flatMap().value:this._value}static fromNullable(e){return new l(e)}isAbsent(){return void 0===this.value||null==this.value}isPresent(e){let t=this.isAbsent();return!t&&e&&e.call(this,this),!t}ifPresentLazy(e=(()=>{})){return this.isPresent.call(this,e),this}orElse(e){return this.isPresent()?this:null==e?l.absent:this.flatMap(()=>e)}orElseLazy(e){return this.isPresent()?this:this.flatMap(e)}flatMap(e){let t=super.flatMap(e);return t instanceof l?t.flatMap():l.fromNullable(t.value)}getIf(...e){let t=this;for(let r=0;r<e.length;r++){let s=this.keyVal(e[r]),n=this.arrayIndex(e[r]);if(""===s&&n>=0){if((t=this.getClass().fromNullable(t.value instanceof Array?t.value.length<n?null:t.value[n]:null)).isAbsent())return t}else if(s&&n>=0){if(t.getIfPresent(s).isAbsent())return t;if((t=t.getIfPresent(s).value instanceof Array?this.getClass().fromNullable(t.getIfPresent(s).value[n]):this.getClass().absent).isAbsent())return t}else{if((t=t.getIfPresent(s)).isAbsent())return t;n>-1&&(t=this.getClass().fromNullable(t.value[n]))}}return t}match(e){return!this.isAbsent()&&e(this.value)}get(e=l.absent){return this.isAbsent()?this.getClass().fromNullable(e).flatMap():this.getClass().fromNullable(this.value).flatMap()}toJson(){return JSON.stringify(this.value)}getClass(){return l}arrayIndex(e){let t=e.indexOf("["),r=e.indexOf("]");return t>=0&&r>0&&t<r?parseInt(e.substring(t+1,r)):-1}keyVal(e){let t=e.indexOf("[");return t>=0?e.substring(0,t):e}getIfPresent(e){return this.isAbsent()?this.getClass().absent:this.getClass().fromNullable(this.value[e]).flatMap()}resolve(e){if(this.isAbsent())return l.absent;try{return l.fromNullable(e(this.value))}catch(e){return l.absent}}}l.absent=l.fromNullable(null);class i extends l{constructor(e,t="value"){super(e),this.key=t}get value(){return this._value?this._value[this.key]:null}set value(e){this._value&&(this._value[this.key]=e)}orElse(e){let t={};return t[this.key]=e,this.isPresent()?this:new i(t,this.key)}orElseLazy(e){if(this.isPresent())return this;{let t={};return t[this.key]=e(),new i(t,this.key)}}getClass(){return i}static fromNullable(e,t="value"){return new i(e,t)}}i.absent=i.fromNullable(null);class a extends i{constructor(e,t,r){super(e,t),this.arrPos=void 0!==r?r:-1}get value(){return""==this.key&&this.arrPos>=0?this._value[this.arrPos]:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]:this._value[this.key]}set value(e){""==this.key&&this.arrPos>=0?this._value[this.arrPos]=e:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]=e:this._value[this.key]=e}}a.absent=a.fromNullable(null);class u extends l{constructor(e){super(e)}get shallowCopy(){return new u(s.Lang.instance.mergeMaps([{},this.value||{}]))}static fromNullable(e){return new u(e)}shallowMerge(e,t=!0){for(let r in e.value)t&&r in this.value?this.apply(r).value=e.getIf(r).value:r in this.value||(this.apply(r).value=e.getIf(r).value)}apply(...e){if(e.length<1)return;this.buildPath(e);let t=this.keyVal(e[e.length-1]),r=this.arrayIndex(e[e.length-1]);return new a(1==e.length?this.value:this.getIf.apply(this,e.slice(0,e.length-1)).value,t,r)}applyIf(e,...t){return e?this.apply(...t):{value:null}}getIf(...e){return this.getClass().fromNullable(super.getIf.apply(this,e).value)}get(e){return this.getClass().fromNullable(super.get(e).value)}delete(e){return e in this.value&&delete this.value[e],this}toJson(){return JSON.stringify(this.value)}getClass(){return u}setVal(e){this._value=e}buildPath(e){let t=this,r=this.getClass().fromNullable(null),s=-1,n=function(e,t){if(e.length<t)for(let r=e.length;r<t;r++)e.push({})};for(let l=0;l<e.length;l++){let i=this.keyVal(e[l]),a=this.arrayIndex(e[l]);if(""===i&&a>=0){t.setVal(t.value instanceof Array?t.value:[]),n(t.value,a+1),s>=0&&(r.value[s]=t.value),r=t,s=a,t=this.getClass().fromNullable(t.value[a]);continue}let u=t.getIf(i);if(-1==a)u.isAbsent()?u=this.getClass().fromNullable(t.value[i]={}):t=u;else{let e=u.value instanceof Array?u.value:[];n(e,a+1),t.value[i]=e,u=this.getClass().fromNullable(e[a])}r=t,s=a,t=u}return this}}},function(e,t,r){"use strict";r.r(t),r.d(t,"Lang",(function(){return l}));var s=r(3),n=r(0);class l{static get instance(){return l._instance||(l._instance=new l),l._instance}static saveResolve(e,t=null){try{let r=e();return void 0===r||null==r?n.Optional.fromNullable(t):n.Optional.fromNullable(r)}catch(e){return n.Optional.absent}}static saveResolveLazy(e,t=null){try{let r=e();return void 0===r||null==r?n.Optional.fromNullable(t()):n.Optional.fromNullable(r)}catch(e){return n.Optional.absent}}strToArray(e,t=/\./gi){let r=e.split(t);for(let e=0;e<r.length;e++)r[e]=this.trim(r[e]);return r}arrToMap(e,t=0){var r=new Array(e.length),s=e.length;t=t||0;for(var n=0;n<s;n++)r[e[n]]=n+t;return r}trim(e){let t=/\s/,r=(e=e.replace(/^\s\s*/,"")).length;for(;t.test(e.charAt(--r)););return e.slice(0,r+1)}isString(e){return!!arguments.length&&null!=e&&("string"==typeof e||e instanceof String)}isFunc(e){return e instanceof Function||"function"==typeof e}hitch(e,t){return e?function(){return t.apply(e,arguments||[])}:t}mergeMaps(e,t=!0,r=(e=>!1),s=(e=>!0)){let n={};return this.arrForEach(e,e=>{this.mixMaps(n,e,t,r,s)}),n}mixMaps(e,t,r,s,n){for(let l in t)t.hasOwnProperty(l)&&(s&&s(l)||n&&!n(l)||(e[l]=r?void 0!==t[l]?t[l]:e[l]:void 0!==e[l]?e[l]:t[l]));return e}objToArray(e,t,r){if(!e)return r||null;if(e instanceof Array&&!t&&!r)return e;let s=void 0!==t||null!=t?t:0,n=r||[];try{return n.concat(Array.prototype.slice.call(e,s))}catch(t){for(let t=s;t<e.length;t++)n.push(e[t]);return n}}arrForEach(e,t,r,s){if(!e||!e.length)return;let n=r||0,l=s,i=this.objToArray(e);r?i.slice(n).forEach(t,l):i.forEach(t,l)}contains(e,t){if(!e||!t)throw Error("null value on arr or str not allowed");return-1!=this.arrIndexOf(e,t)}arrIndexOf(e,t,r){if(!e||!e.length)return-1;let s=r||0;return(e=this.objToArray(e)).indexOf(t,s)}arrFilter(e,t,r,s){if(!e||!e.length)return[];let n=this.objToArray(e);return r?n.slice(r).filter(t,s):n.filter(t,s)}applyArgs(e,t,r){let s="undefined";if(r)for(let n=0;n<t.length;n++)s!=typeof e["_"+r[n]]&&(e["_"+r[n]]=t[n]),s!=typeof e[r[n]]&&(e[r[n]]=t[n]);else for(let r in t)t.hasOwnProperty(r)&&(s!=typeof e["_"+r]&&(e["_"+r]=t[r]),s!=typeof e[r]&&(e[r]=t[r]));return e}equalsIgnoreCase(e,t){return!e&&!t||!(!e||!t)&&e.toLowerCase()===t.toLowerCase()}timeout(e){let t=null;return new s.CancellablePromise((r,s)=>{t=setTimeout(()=>{r()},e)},()=>{t&&(clearTimeout(t),t=null)})}interval(e){let t=null;return new s.CancellablePromise((r,s)=>{t=setInterval(()=>{r()},e)},()=>{t&&(clearInterval(t),t=null)})}assertType(e,t){return this.isString(t)?typeof e==t:e instanceof t}}},function(e,t,r){"use strict";r.d(t,"b",(function(){return n})),r.d(t,"c",(function(){return l})),r.d(t,"f",(function(){return i})),r.d(t,"d",(function(){return a})),r.d(t,"a",(function(){return u})),r.d(t,"e",(function(){return o})),r.d(t,"g",(function(){return h})),r.d(t,"h",(function(){return c}));var s=r(4);class n{constructor(...e){this.dataPos=-1,this.value=e}hasNext(){return this.value.length-1>this.dataPos}next(){return this.dataPos++,this.value[this.dataPos]}reset(){this.dataPos=-1}}class l{constructor(e,t){this.filteredNext=null,this.filterFunc=e,this.inputDataSource=t}hasNext(){for(;null==this.filteredNext&&this.inputDataSource.hasNext();){let e=this.inputDataSource.next();if(this.filterFunc(e))return this.filteredNext=e,!0;this.filteredNext=null}return null!=this.filteredNext}next(){let e=this.filteredNext;return this.filteredNext=null,this.hasNext(),e}reset(){this.filteredNext=null,this.inputDataSource.reset()}}class i{constructor(e,t){this.mapFunc=e,this.inputDataSource=t}hasNext(){return this.inputDataSource.hasNext()}next(){return this.mapFunc(this.inputDataSource.next())}reset(){this.inputDataSource.reset()}}class a{constructor(e,t){this.mapFunc=e,this.inputDataSource=t}hasNext(){return this.resolveCurrentNext()||this.resolveNextNext()}resolveCurrentNext(){let e=!1;return this.activeDataSource&&(e=this.activeDataSource.hasNext()),e}resolveNextNext(){let e=!1;for(;!e&&this.inputDataSource.hasNext();)this.activeDataSource=this.mapFunc(this.inputDataSource.next()),e=this.activeDataSource.hasNext();return e}next(){return this.activeDataSource.next()}reset(){this.inputDataSource.reset()}}class u{constructor(){this.data=[]}collect(e){this.data.push(e)}get finalValue(){return this.data}}class o{constructor(){this.finalValue=new FormData}collect(e){this.finalValue.append(e.key,e.value)}}class h{constructor(){this.finalValue=new FormData}collect(e){let t=e.encodeFormElement();t.isPresent()&&this.finalValue.append(e.name.value,t.get(e.name).value)}}class c{constructor(){this.formData=[]}collect(e){let t=e.encodeFormElement();t.isPresent()&&this.formData.push([e.name.value,t.get(e.name).value])}get finalValue(){return s.Stream.of(...this.formData).map(e=>e.join("=")).reduce((e,t)=>[e,t].join("&")).orElse("").value}}},function(e,t,r){"use strict";r.r(t),r.d(t,"PromiseStatus",(function(){return s})),r.d(t,"Promise",(function(){return l})),r.d(t,"CancellablePromise",(function(){return i}));var s,n=r(0);!function(e){e[e.PENDING=0]="PENDING",e[e.FULLFILLED=1]="FULLFILLED",e[e.REJECTED=2]="REJECTED"}(s||(s={}));class l{constructor(e){this.status=s.PENDING,this.allFuncs=[],this.value=e,this.value(e=>this.resolve(e),e=>this.reject(e))}static all(...e){let t,r=0,s=new l((e,r)=>{t=e}),n=()=>{r++,e.length==r&&t()};n.__last__=!0;for(let t=0;t<e.length;t++)e[t].finally(n);return s}static race(...e){let t,r,s=new l((e,s)=>{t=e,r=s}),n=()=>(t&&t(),t=null,r=null,null);n.__last__=!0;let i=()=>(r&&r(),r=null,t=null,null);i.__last__=!0;for(let t=0;t<e.length;t++)e[t].then(n),e[t].catch(i);return s}static reject(e){return new l((t,r)=>{e instanceof l?e.then(e=>{r(e)}):setTimeout(()=>{r(e)},1)})}static resolve(e){return new l((t,r)=>{e instanceof l?e.then(e=>t(e)):setTimeout(()=>{t(e)},1)})}then(e,t){return this.allFuncs.push({then:e}),t&&this.allFuncs.push({catch:t}),this.spliceLastFuncs(),this}catch(e){return this.allFuncs.push({catch:e}),this.spliceLastFuncs(),this}finally(e){if(!this.__reason__)return this.allFuncs.push({finally:e}),this.spliceLastFuncs(),this;this.__reason__.finally(e)}resolve(e){for(;this.allFuncs.length&&this.allFuncs[0].then;){let t=this.allFuncs.shift(),r=n.Optional.fromNullable(t.then(e));if(!r.isPresent())break;if((e=(r=r.flatMap()).value)instanceof l)return void this.transferIntoNewPromise(e)}this.appyFinally(),this.status=s.FULLFILLED}reject(e){for(;this.allFuncs.length&&!this.allFuncs[0].finally;){var t=this.allFuncs.shift();if(t.catch){var r=n.Optional.fromNullable(t.catch(e));if(r.isPresent()){if((e=(r=r.flatMap()).value)instanceof l)return void this.transferIntoNewPromise(e);this.status=s.REJECTED;break}break}}this.status=s.REJECTED,this.appyFinally()}appyFinally(){for(;this.allFuncs.length;){var e=this.allFuncs.shift();e.finally&&e.finally()}}spliceLastFuncs(){let e=[],t=[];for(let r=0;r<this.allFuncs.length;r++)for(let s in this.allFuncs[r])this.allFuncs[r][s].__last__?e.push(this.allFuncs[r]):t.push(this.allFuncs[r]);this.allFuncs=t.concat(e)}transferIntoNewPromise(e){for(var t=0;t<this.allFuncs.length;t++)for(let r in this.allFuncs[t])e[r](this.allFuncs[t][r])}}class i extends l{constructor(e,t){super(e),this.cancellator=()=>{},this.cancellator=t}cancel(){this.status=s.REJECTED,this.appyFinally(),this.allFuncs=[]}then(e,t){return super.then(e,t)}catch(e){return super.catch(e)}finally(e){return super.finally(e)}}},function(e,t,r){"use strict";r.r(t),r.d(t,"Stream",(function(){return l})),r.d(t,"LazyStream",(function(){return i}));var s=r(0),n=r(2);class l{constructor(...e){this._limits=-1,this.pos=-1,this.value=e}static of(...e){return new l(...e)}static ofDataSource(e){let t=[];for(;e.hasNext();)t.push(e.next());return new l(...t)}limits(e){return this._limits=e,this}onElem(e){for(let t=0;t<this.value.length&&(-1==this._limits||t<this._limits)&&!1!==e(this.value[t],t);t++);return this}each(e){this.onElem(e)}map(e){e||(e=e=>e);let t=[];return this.each((r,s)=>{t.push(e(r))}),new l(...t)}flatMap(e){let t=[];return this.each(r=>{let s=e(r);t=t.concat(...s.value)}),l.of(...t)}filter(e){let t=[];return this.each(r=>{e(r)&&t.push(r)}),new l(...t)}reduce(e,t=null){let r=null!=t?0:1,n=null!=t?t:this.value.length?this.value[0]:null;for(let t=r;t<this.value.length&&(-1==this._limits||t<this._limits);t++)n=e(n,this.value[t]);return s.Optional.fromNullable(n)}first(){return this.value&&this.value.length?s.Optional.fromNullable(this.value[0]):s.Optional.absent}last(){let e=this._limits>0?Math.min(this._limits,this.value.length):this.value.length;return s.Optional.fromNullable(e?this.value[e-1]:null)}anyMatch(e){for(let t=0;t<this.value.length&&(-1==this._limits||t<this._limits);t++)if(e(this.value[t]))return!0;return!1}allMatch(e){if(!this.value.length)return!1;let t=0;for(let r=0;r<this.value.length;r++)e(this.value[r])&&t++;return t==this.value.length}noneMatch(e){let t=0;for(let r=0;r<this.value.length;r++)e(this.value[r])||t++;return t==this.value.length}collect(e){return this.each(t=>e.collect(t)),e.finalValue}hasNext(){let e=-1!=this._limits&&this.pos>=this._limits-1,t=this.pos>=this.value.length-1;return!(e||t)}next(){return this.hasNext()?(this.pos++,this.value[this.pos]):null}reset(){this.pos=-1}}class i{constructor(e){this._limits=-1,this.pos=-1,this.dataSource=e}static of(...e){return new i(new n.b(...e))}static ofStreamDataSource(e){return new i(e)}hasNext(){return!this.isOverLimits()&&this.dataSource.hasNext()}next(){let e=this.dataSource.next();return this.pos++,e}reset(){this.dataSource.reset(),this.pos=0,this._limits=-1}nextFilter(e){if(this.hasNext()){let t=this.next();return e(t)?t:this.nextFilter(e)}return null}limits(e){return this._limits=e,this}collect(e){for(;this.hasNext();){let t=this.next();e.collect(t)}return e.finalValue}onElem(e){return new i(new n.f(t=>(!1===e(t,this.pos)&&this.stop(),t),this))}filter(e){return new i(new n.c(e,this))}map(e){return new i(new n.f(e,this))}flatMap(e){return new i(new n.d(e,this))}each(e){for(;this.hasNext();)!1===e(this.next())&&this.stop()}reduce(e,t=null){if(!this.hasNext())return s.Optional.absent;let r=null,n=null;if(null!=t)r=t,n=this.next();else{if(r=this.next(),!this.hasNext())return s.Optional.fromNullable(r);n=this.next()}for(r=e(r,n);this.hasNext();)r=e(r,n=this.next());return s.Optional.fromNullable(r)}last(){return this.hasNext()?this.reduce((e,t)=>t):s.Optional.absent}first(){return this.reset(),this.hasNext()?s.Optional.fromNullable(this.next()):s.Optional.absent}anyMatch(e){for(;this.hasNext();)if(e(this.next()))return!0;return!1}allMatch(e){for(;this.hasNext();)if(!e(this.next()))return!1;return!0}noneMatch(e){for(;this.hasNext();)if(e(this.next()))return!1;return!0}get value(){return this.collect(new n.a)}stop(){this.pos=this._limits+1e9}isOverLimits(){return-1!=this._limits&&this.pos>=this._limits-1}}},function(e,t,r){"use strict";r.r(t),r.d(t,"ElementAttribute",(function(){return i})),r.d(t,"DomQuery",(function(){return u})),r.d(t,"DomQueryCollector",(function(){return o})),r.d(t,"DQ",(function(){return h}));var s=r(1),n=r(0),l=r(4);class i extends n.ValueEmbedder{constructor(e,t,r=null){super(e,t),this.element=e,this.name=t,this.defaultVal=r}get value(){let e=this.element.get(0).orElse().values;return e.length?e[0].getAttribute(this.name):this.defaultVal}set value(e){let t=this.element.get(0).orElse().values;for(let r=0;r<t.length;r++)t[r].setAttribute(this.name,e);t[0].setAttribute(this.name,e)}getClass(){return i}static fromNullable(e,t="value"){return new i(e,t)}}const a=e=>-1==e.indexOf("ln=scripts")&&-1==e.indexOf("ln=javax.faces")||-1==e.indexOf("/jsf.js")&&-1==e.indexOf("/jsf-uncompressed.js");class u{constructor(...e){if(this.rootNode=[],this.pos=-1,this._limits=-1,!n.Optional.fromNullable(e).isAbsent()&&e.length)for(let t=0;t<e.length;t++)if(s.Lang.instance.isString(e[t])){let r=u.querySelectorAll(e[t]);r.isAbsent()||e.push(...r.values)}else if(e[t]instanceof u)this.rootNode.push(...e[t].values);else if(s.Lang.instance.isString(e[t])){let r=u.querySelectorAll(e[t]);this.rootNode.push(...r.values)}else this.rootNode.push(e[t])}get value(){return this.getAsElem(0)}get values(){return this.allElems()}get id(){return new n.ValueEmbedder(this.getAsElem(0).value,"id")}get length(){return this.rootNode.length}get tagName(){return this.getAsElem(0).getIf("tagName")}get nodeName(){return this.getAsElem(0).getIf("nodeName")}isTag(e){return!this.isAbsent()&&(this.nodeName.orElse("__none___").value.toLowerCase()==e.toLowerCase()||this.tagName.orElse("__none___").value.toLowerCase()==e.toLowerCase())}get type(){return this.getAsElem(0).getIf("type")}get name(){return new n.ValueEmbedder(this.getAsElem(0).value,"name")}get inputValue(){return this.getAsElem(0).getIf("value").isPresent()?new n.ValueEmbedder(this.getAsElem(0).value):n.ValueEmbedder.absent}get elements(){let e=this.each(e=>{let t=e.value.value;return t.elements?t.elements:null}).stream.filter(e=>!!e).value;return new u(...e).orElseLazy(()=>this.querySelectorAll("form").elements).orElseLazy(()=>this.querySelectorAll("input, select, textarea"))}get disabled(){return!!this.attr("disabled").value}set disabled(e){this.attr("disabled").value=e+""}get childNodes(){let e=[];return this.eachElem(t=>{e=e.concat(s.Lang.instance.objToArray(t.childNodes))}),new u(...e)}get stream(){return new l.Stream(...this.asArray)}get lazyStream(){return l.LazyStream.of(...this.asArray)}get asArray(){let e=[];return this.each(t=>{e.push(t)}),e}static querySelectorAll(e){return new u(document).querySelectorAll(e)}static byId(e){return s.Lang.instance.isString(e)?new u(document).byId(e):new u(e)}static byTagName(e){return s.Lang.instance.isString(e)?new u(document).byTagName(e):new u(e)}static globalEval(e){return new u(document).globalEval(e)}static fromMarkup(e){let t=s.Lang.saveResolve(()=>new DOMParser).value;if(t){let r=t.parseFromString(e,"text/html");return new u(r)}{const t=document.implementation.createHTMLDocument("");let r=(e=s.Lang.instance.trim(e)).toLowerCase();return r.includes("<!doctype")||r.includes("<html")||r.includes("<head")||r.includes("<body")?(t.documentElement.innerHTML=e,new u(t.documentElement)):(t.body.innerHTML=e,new u(...s.Lang.instance.objToArray(t.body.childNodes)))}}get(e){return e<this.rootNode.length?new u(this.rootNode[e]):u.absent}getAsElem(e,t=n.Optional.absent){return e<this.rootNode.length?n.Optional.fromNullable(this.rootNode[e]):t}allElems(){return this.rootNode}isAbsent(){return 0==this.length}isPresent(e){let t=this.isAbsent();return!t&&e&&e.call(this,this),!t}ifPresentLazy(e=function(){}){return this.isPresent.call(this,e),this}delete(){this.eachElem(e=>{e.parentNode&&e.parentNode.removeChild(e)})}querySelectorAll(e){if(0==this.rootNode.length)return this;let t=[];for(let r=0;r<this.rootNode.length;r++){if(!this.rootNode[r].querySelectorAll)continue;let n=this.rootNode[r].querySelectorAll(e);t=t.concat(s.Lang.instance.objToArray(n))}return new u(...t)}byId(e,t){let r=[];for(let s=0;t&&s<this.rootNode.length;s++)this.rootNode[s].id==e&&r.push(new u(this.rootNode[s]));return r=r.concat(this.querySelectorAll(`[id="${e}"]`)),new u(...r)}byTagName(e,t){let r=[];for(let s=0;t&&s<this.rootNode.length;s++)this.rootNode[s].tagName==e&&r.push(new u(this.rootNode[s]));return r=r.concat(this.querySelectorAll(e)),new u(...r)}attr(e,t=null){return new i(this,e,t)}hasClass(e){let t=!1;return this.each(r=>{let s=r.attr("class").value||"";if(-1!=s.toLowerCase().indexOf(e.toLowerCase())){let r=s.split(/\s+/gi),n=!1;for(let t=0;t<r.length&&!n;t++)n=r[t].toLowerCase()==e.toLowerCase();if(t=t||n)return!1}}),t}addClass(e){return this.each(t=>{let r=t.attr("class").value||"";this.hasClass(e)||(t.attr("class").value=s.Lang.instance.trim(r+" "+e))}),this}removeClass(e){return this.each(t=>{if(this.hasClass(e)){let r=[],s=(t.attr("class").value||"").split(/\s+/gi);for(let t=0;t<s.length;t++)s[t].toLowerCase()!=e.toLowerCase()&&r.push(s[t]);t.attr("class").value=r.join(" ")}}),this}isMultipartCandidate(){return this.querySelectorAll("input[type='file']").firstElem().isPresent()}html(e){return n.Optional.fromNullable(e).isAbsent()?this.getAsElem(0).isPresent()?n.Optional.fromNullable(this.getAsElem(0).value.innerHTML):n.Optional.absent:(this.getAsElem(0).isPresent()&&(this.getAsElem(0).value.innerHTML=e),this)}_mozMatchesSelector(e,t){let r=e;return(r.matchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector||r.webkitMatchesSelector||function(t){let r=(document||window.ownerDocument).querySelectorAll(t),s=r.length;for(;--s>=0&&r.item(s)!==e;);return s>-1}).call(e,t)}filterSelector(e){let t=[];return this.eachElem(r=>{this._mozMatchesSelector(r,e)&&t.push(r)}),new u(...t)}matchesSelector(e){return this.eachElem(t=>{if(!this._mozMatchesSelector(t,e))return!1}),!0}getIf(...e){let t=this.childNodes;for(let r=0;r<e.length;r++)if((t=t.filterSelector(e[r])).isAbsent())return t;return t}eachElem(e){for(let t=0,r=this.rootNode.length;t<r&&!1!==e(this.rootNode[t],t);t++);return this}firstElem(e=(e=>e)){return this.rootNode.length>1&&e(this.rootNode[0],0),this}each(e){for(let t=0,r=this.rootNode.length;t<r&&!1!==e(this.get(t),t);t++);return this}first(e=(e=>e)){return this.rootNode.length>=1?(e(this.get(0),0),this.get(0)):this}filter(e){let t=[];return this.each(r=>{e(r)&&t.push(r)}),new u(...t)}globalEval(e,t){let r=document.getElementsByTagName("head")[0]||document.documentElement,s=document.createElement("script");t&&s.setAttribute("nonce",t),s.type="text/javascript",s.innerHTML=e;let n=r.appendChild(s);return r.removeChild(n),this}detach(){return this.eachElem(e=>{e.parentNode.removeChild(e)}),this}appendTo(e){this.eachElem(t=>{e.getAsElem(0).orElseLazy(()=>({appendChild:e=>{}})).value.appendChild(t)})}loadScriptEval(e,t=0,r){let s=new XMLHttpRequest;if(s.open("GET",e,!1),r&&s.setRequestHeader("Content-Type","application/x-javascript; charset:"+r),s.send(null),4!=s.readyState)throw Error("Loading of script "+e+" failed ");if(200!=s.status)throw Error(s.responseText);return(t?setTimeout((function(){this.globalEval(s.responseText+"\r\n//@ sourceURL="+e)}),t):this.globalEval(s.responseText.replace("\n","\r\n")+"\r\n//@ sourceURL="+e),this)}insertAfter(...e){this.each(t=>{let r=t.getAsElem(0).value,s=r.parentNode;for(let t=0;t<e.length;t++){let n=r.nextSibling;e[t].eachElem(e=>{n?(s.insertBefore(e,n),r=n):s.appendChild(e)})}});let t=[];return t.push(this),t.concat(e),new u(...t)}insertBefore(...e){this.each(t=>{let r=t.getAsElem(0).value,s=r.parentNode;for(let t=0;t<e.length;t++)e[t].eachElem(e=>{s.insertBefore(e,r)})});let t=[];return t.push(this),t.concat(e),new u(...t)}orElse(...e){return this.isPresent()?this:new u(...e)}orElseLazy(e){return this.isPresent()?this:new u(e())}parents(e){let t=[];const r=e.toLowerCase();let s=e=>{(e.tagName||"").toLowerCase()==r&&t.push(e)};return this.eachElem(r=>{for(;r.parentNode;)if(r=r.parentNode,s(r),"form"==e&&t.length)return!1}),new u(...t)}copyAttrs(e){return e.eachElem(e=>{let t=s.Lang.instance.objToArray(e.attributes);for(let e of t){let t=e.value,r=e.name;switch(r){case"id":this.id.value=t;break;case"disabled":this.resolveAttributeHolder("disabled").disabled=t;break;case"checked":this.resolveAttributeHolder("checked").checked=t;break;default:this.attr(r).value=t}}}),this}resolveAttributeHolder(e="value"){let t=[];return t[e]=null,e in this.getAsElem(0).value?this.getAsElem(0).value:t}outerHTML(e,t,r){let s=u.fromMarkup(e),n=[],l=this.getAsElem(0).value,i=s.get(0),a=l.parentNode,o=i.getAsElem(0).value;a.replaceChild(o,l),n.push(new u(o));let h=[];for(let e=1;e<s.length;e++)h.push(s.get(e)),this.rootNode.push(s.get(e).getAsElem(0).value);return n.push(u.byId(o).insertAfter(...h)),t&&this.runScripts(),r&&this.runCss(),new u(...n)}runScripts(e=a){let t=s.Lang.instance,r=[],n=s=>{let n=s.tagName,l=s.type||"";if(n&&t.equalsIgnoreCase(n,"script")&&(""===l||t.equalsIgnoreCase(l,"text/javascript")||t.equalsIgnoreCase(l,"javascript")||t.equalsIgnoreCase(l,"text/ecmascript")||t.equalsIgnoreCase(l,"ecmascript"))){let t=s.getAttribute("src");if(void 0!==t&&null!=t&&t.length>0)e(t)&&(r.length&&(this.globalEval(r.join("\n")),r=[]),this.loadScriptEval(t,0,"UTF-8"));else{let e=s.text||s.innerText||s.innerHTML,t=!0;for(;t;)t=!1," "==e.substring(0,1)&&(e=e.substring(1),t=!0),"\x3c!--"==e.substring(0,4)&&(e=e.substring(4),t=!0),"//<![CDATA["==e.substring(0,11)&&(e=e.substring(11),t=!0);r.push(e)}}};try{let e=this.querySelectorAll("script");if(null==e)return;for(let t=0;t<e.length;t++)n(e.getAsElem(t).value);r.length&&this.globalEval(r.join("\n"))}catch(e){window.console&&window.console.error&&console.error(e.message||e.description)}finally{n=null}}runCss(){const e=s.Lang.instance,t=(e,t)=>{let r=document.createElement("style");document.getElementsByTagName("head")[0].appendChild(r);let s=r.sheet?r.sheet:r.styleSheet;r.setAttribute("rel",e.getAttribute("rel")||"stylesheet"),r.setAttribute("type",e.getAttribute("type")||"text/css"),void 0!==s.cssText?s.cssText=t:r.appendChild(document.createTextNode(t))},r=r=>{const s=e.equalsIgnoreCase,n=r.tagName;if(n&&s(n,"link")&&s(r.getAttribute("type"),"text/css"))t(r,"@import url('"+r.getAttribute("href")+"');");else if(n&&s(n,"style")&&s(r.getAttribute("type"),"text/css")){let e=[],s=r.childNodes;if(s){const t=s.length;for(let r=0;r<t;r++)e.push(s[r].innerHTML||s[r].data)}else r.innerHTML&&e.push(r.innerHTML);t(r,e.join(""))}},n=this.querySelectorAll("link, style");if(null!=n){for(let e=0;e<n.length;e++){r(n.getAsElem(e).value)}return this}}get cDATAAsString(){let e=[];return this.each(t=>{t.childNodes.eachElem(t=>{e.push(t.data)})}),e.join("")}click(){return this.fireEvent("click"),this}addEventListener(e,t,r){return this.eachElem(s=>{s.addEventListener(e,t,r)}),this}removeEventListener(e,t,r){return this.eachElem(s=>{s.removeEventListener(e,t,r)}),this}fireEvent(e){this.eachElem(t=>{var r;if(t.ownerDocument)r=t.ownerDocument;else{if(9!=t.nodeType)throw new Error("Invalid node passed to fireEvent: "+t.id);r=t}if(t.dispatchEvent){var s="";switch(e){case"click":case"mousedown":case"mouseup":s="MouseEvents";break;case"focus":case"change":case"blur":case"select":s="HTMLEvents";break;default:throw"fireEvent: Couldn't find an event class for event '"+e+"'."}let n=r.createEvent(s);n.initEvent(e,!0,!0),n.synthetic=!0,t.dispatchEvent(n)}else if(t.fireEvent){var n=r.createEventObject();n.synthetic=!0,t.fireEvent("on"+e,n)}})}textContent(e=""){return this.stream.map(e=>{return e.getAsElem(0).orElseLazy(()=>({textContent:""})).value.textContent||""}).reduce((t,r)=>t+e+r,"").value}innerText(e=""){return this.stream.map(e=>{return e.getAsElem(0).orElseLazy(()=>({innerText:""})).value.innerText||""}).reduce((t,r)=>t+e+r,"").value}encodeFormElement(e=new n.Config({})){if(this.name.isAbsent())return;let t=e.shallowCopy;return this.eachElem(e=>{if(!e.name)return;let r=e.name,s=e.tagName.toLowerCase(),n=e.type.orElse("__none__").value.toLowerCase();if(n=n.toLowerCase(),("input"==s||"textarea"==s||"select"==s)&&null!=r&&""!=r&&!e.disabled){if("select"==s){let s=e.getAsElem(0).value;if(s.selectedIndex>=0){let e=s.options.length;for(let n=0;n<e;n++)if(s.options[n].selected){let e=s.options[n];t.apply(r).value=null!=e.getAttribute("value")?e.value:e.text}}}if("select"!=s&&"button"!=n&&"reset"!=n&&"submit"!=n&&"image"!=n&&("checkbox"!=n&&"radio"!=n||e.checked)){let s=e.value.files;s&&s.length?t.apply(r).value=s[0]:t.apply(r).value=e.inputValue.value}}}),t}subNodes(e,t){return n.Optional.fromNullable(t).isAbsent()&&(t=this.length),new u(...this.rootNode.slice(e,Math.min(t,this.length)))}limits(e){return this._limits=e,this}hasNext(){let e=-1!=this._limits&&this.pos>=this._limits-1,t=this.pos>=this.values.length-1;return!(e||t)}next(){return this.hasNext()?(this.pos++,new u(this.values[this.pos])):null}reset(){this.pos=-1}}u.absent=new u;class o{constructor(){this.data=[]}collect(e){this.data.push(e)}get finalValue(){return new u(...this.data)}}const h=u},function(e,t,r){"use strict";r.r(t),r.d(t,"XMLQuery",(function(){return l})),r.d(t,"XQ",(function(){return i}));var s=r(1),n=r(5);class l extends n.DomQuery{constructor(e,t="text/xml"){let r=e=>{if(null==e)return null;return s.Lang.saveResolveLazy(()=>new window.DOMParser,()=>(()=>{let e=new ActiveXObject("Microsoft.XMLDOM");return e.async=!1,{parseFromString:(t,r)=>e.loadXML(t)}})()).value.parseFromString(e,t)};s.Lang.instance.isString(e)?super(r(e)):super(e)}isXMLParserError(){return this.querySelectorAll("parsererror").isPresent()}toString(){let e=[];return this.eachElem(t=>{void 0!==window.XMLSerializer?e.push((new window.XMLSerializer).serializeToString(t)):void 0!==t.xml&&e.push(t.xml)}),e.join("")}parserErrorText(e){return this.querySelectorAll("parsererror").textContent(e)}static parseXML(e){return new l(e)}static parseHTML(e){return new l(e,"text/html")}static fromString(e,t="text/xml"){return new l(e,t)}}const i=l},function(e,t,r){"use strict";r.r(t);var s=r(5);r.d(t,"DomQuery",(function(){return s.DomQuery})),r.d(t,"ElementAttribute",(function(){return s.ElementAttribute})),r.d(t,"DomQueryCollector",(function(){return s.DomQueryCollector})),r.d(t,"DQ",(function(){return s.DQ}));var n=r(1);r.d(t,"Lang",(function(){return n.Lang}));var l=r(0);r.d(t,"Config",(function(){return l.Config})),r.d(t,"Monad",(function(){return l.Monad})),r.d(t,"Optional",(function(){return l.Optional})),r.d(t,"ValueEmbedder",(function(){return l.ValueEmbedder}));var i=r(3);r.d(t,"CancellablePromise",(function(){return i.CancellablePromise})),r.d(t,"Promise",(function(){return i.Promise})),r.d(t,"PromiseStatus",(function(){return i.PromiseStatus}));var a=r(6);r.d(t,"XMLQuery",(function(){return a.XMLQuery})),r.d(t,"XQ",(function(){return a.XQ}));var u=r(4);r.d(t,"Stream",(function(){return u.Stream})),r.d(t,"LazyStream",(function(){return u.LazyStream}));var o=r(2);r.d(t,"ArrayStreamDataSource",(function(){return o.b})),r.d(t,"MappedStreamDataSource",(function(){return o.f})),r.d(t,"FilteredStreamDatasource",(function(){return o.c})),r.d(t,"FlatMapStreamDataSource",(function(){return o.d})),r.d(t,"QueryFormStringCollector",(function(){return o.h})),r.d(t,"ArrayCollector",(function(){return o.a})),r.d(t,"FormDataCollector",(function(){return o.e})),r.d(t,"QueryFormDataCollector",(function(){return o.g}))}]));
//# sourceMappingURL=index.js.map