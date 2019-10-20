!function(e,t){for(var s in t)e[s]=t[s]}(exports,function(e){var t={};function s(r){if(t[r])return t[r].exports;var l=t[r]={i:r,l:!1,exports:{}};return e[r].call(l.exports,l,l.exports,s),l.l=!0,l.exports}return s.m=e,s.c=t,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)s.d(r,l,function(t){return e[t]}.bind(null,l));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=6)}([function(e,t,s){"use strict";s.r(t),s.d(t,"Monad",(function(){return l})),s.d(t,"Optional",(function(){return n})),s.d(t,"ValueEmbedder",(function(){return i})),s.d(t,"Config",(function(){return u}));var r=s(1);class l{constructor(e){this._value=e}get value(){return this._value}map(e){e||(e=e=>e);let t=e(this.value);return new l(t)}flatMap(e){let t=this.map(e);for(;void 0!==t&&null!=t&&t.value instanceof l;)t=t.value;return t}}class n extends l{constructor(e){super(e)}get value(){return this._value instanceof l?this._value.flatMap().value:this._value}static fromNullable(e){return new n(e)}isAbsent(){return void 0===this.value||null==this.value}isPresent(e){let t=this.isAbsent();return!t&&e&&e.call(this,this),!t}ifPresentLazy(e=(()=>{})){return this.isPresent.call(this,e),this}orElse(e){return this.isPresent()?this:null==e?n.absent:this.flatMap(()=>e)}orElseLazy(e){return this.isPresent()?this:this.flatMap(e)}flatMap(e){let t=super.flatMap(e);return t instanceof n?t.flatMap():n.fromNullable(t.value)}getIf(...e){let t=this;for(let s=0;s<e.length;s++){let r=this.keyVal(e[s]),l=this.arrayIndex(e[s]);if(""===r&&l>=0){if((t=this.getClass().fromNullable(t.value instanceof Array?t.value.length<l?null:t.value[l]:null)).isAbsent())return t}else if(r&&l>=0){if(t.getIfPresent(r).isAbsent())return t;if((t=t.getIfPresent(r).value instanceof Array?this.getClass().fromNullable(t.getIfPresent(r).value[l]):this.getClass().absent).isAbsent())return t}else{if((t=t.getIfPresent(r)).isAbsent())return t;l>-1&&(t=this.getClass().fromNullable(t.value[l]))}}return t}match(e){return!this.isAbsent()&&e(this.value)}get(e=n.absent){return this.isAbsent()?this.getClass().fromNullable(e).flatMap():this.getClass().fromNullable(this.value).flatMap()}toJson(){return JSON.stringify(this.value)}getClass(){return n}arrayIndex(e){let t=e.indexOf("["),s=e.indexOf("]");return t>=0&&s>0&&t<s?parseInt(e.substring(t+1,s)):-1}keyVal(e){let t=e.indexOf("[");return t>=0?e.substring(0,t):e}getIfPresent(e){return this.isAbsent()?this.getClass().absent:this.getClass().fromNullable(this.value[e]).flatMap()}resolve(e){if(this.isAbsent())return n.absent;try{return n.fromNullable(e(this.value))}catch(e){return n.absent}}}n.absent=n.fromNullable(null);class i extends n{constructor(e,t="value"){super(e),this.key=t}get value(){return this._value?this._value[this.key]:null}set value(e){this._value&&(this._value[this.key]=e)}orElse(e){let t={};return t[this.key]=e,this.isPresent()?this:new i(t,this.key)}orElseLazy(e){if(this.isPresent())return this;{let t={};return t[this.key]=e(),new i(t,this.key)}}getClass(){return i}static fromNullable(e,t="value"){return new i(e,t)}}i.absent=i.fromNullable(null);class a extends i{constructor(e,t,s){super(e,t),this.arrPos=void 0!==s?s:-1}get value(){return""==this.key&&this.arrPos>=0?this._value[this.arrPos]:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]:this._value[this.key]}set value(e){""==this.key&&this.arrPos>=0?this._value[this.arrPos]=e:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]=e:this._value[this.key]=e}}a.absent=a.fromNullable(null);class u extends n{constructor(e){super(e)}get shallowCopy(){return new u(r.Lang.instance.mergeMaps([{},this.value||{}]))}static fromNullable(e){return new u(e)}shallowMerge(e,t=!0){for(let s in e.value)t&&s in this.value?this.apply(s).value=e.getIf(s).value:s in this.value||(this.apply(s).value=e.getIf(s).value)}apply(...e){if(e.length<1)return;this.buildPath(e);let t=this.keyVal(e[e.length-1]),s=this.arrayIndex(e[e.length-1]);return new a(1==e.length?this.value:this.getIf.apply(this,e.slice(0,e.length-1)).value,t,s)}applyIf(e,...t){return e?this.apply(...t):{value:null}}getIf(...e){return this.getClass().fromNullable(super.getIf.apply(this,e).value)}get(e){return this.getClass().fromNullable(super.get(e).value)}delete(e){return e in this.value&&delete this.value[e],this}toJson(){return JSON.stringify(this.value)}getClass(){return u}setVal(e){this._value=e}buildPath(e){let t=this,s=this.getClass().fromNullable(null),r=-1,l=function(e,t){if(e.length<t)for(let s=e.length;s<t;s++)e.push({})};for(let n=0;n<e.length;n++){let i=this.keyVal(e[n]),a=this.arrayIndex(e[n]);if(""===i&&a>=0){t.setVal(t.value instanceof Array?t.value:[]),l(t.value,a+1),r>=0&&(s.value[r]=t.value),s=t,r=a,t=this.getClass().fromNullable(t.value[a]);continue}let u=t.getIf(i);if(-1==a)u.isAbsent()?u=this.getClass().fromNullable(t.value[i]={}):t=u;else{let e=u.value instanceof Array?u.value:[];l(e,a+1),t.value[i]=e,u=this.getClass().fromNullable(e[a])}s=t,r=a,t=u}return this}}},function(e,t,s){"use strict";s.r(t),s.d(t,"Lang",(function(){return n}));var r=s(3),l=s(0);class n{static get instance(){return n._instance||(n._instance=new n),n._instance}static saveResolve(e,t=null){try{let s=e();return void 0===s||null==s?l.Optional.fromNullable(t):l.Optional.fromNullable(s)}catch(e){return l.Optional.absent}}static saveResolveLazy(e,t=null){try{let s=e();return void 0===s||null==s?l.Optional.fromNullable(t()):l.Optional.fromNullable(s)}catch(e){return l.Optional.absent}}strToArray(e,t=/\./gi){let s=e.split(t);for(let e=0;e<s.length;e++)s[e]=this.trim(s[e]);return s}arrToMap(e,t=0){var s=new Array(e.length),r=e.length;t=t||0;for(var l=0;l<r;l++)s[e[l]]=l+t;return s}trim(e){let t=/\s/,s=(e=e.replace(/^\s\s*/,"")).length;for(;t.test(e.charAt(--s)););return e.slice(0,s+1)}isString(e){return!!arguments.length&&null!=e&&("string"==typeof e||e instanceof String)}isFunc(e){return e instanceof Function||"function"==typeof e}hitch(e,t){return e?function(){return t.apply(e,arguments||[])}:t}mergeMaps(e,t=!0,s=(e=>!1),r=(e=>!0)){let l={};return this.arrForEach(e,e=>{this.mixMaps(l,e,t,s,r)}),l}mixMaps(e,t,s,r,l){for(let n in t)t.hasOwnProperty(n)&&(r&&r(n)||l&&!l(n)||(e[n]=s?void 0!==t[n]?t[n]:e[n]:void 0!==e[n]?e[n]:t[n]));return e}objToArray(e,t,s){if(!e)return s||null;if(e instanceof Array&&!t&&!s)return e;let r=void 0!==t||null!=t?t:0,l=s||[];try{return l.concat(Array.prototype.slice.call(e,r))}catch(t){for(let t=r;t<e.length;t++)l.push(e[t]);return l}}arrForEach(e,t,s,r){if(!e||!e.length)return;let l=s||0,n=r,i=this.objToArray(e);s?i.slice(l).forEach(t,n):i.forEach(t,n)}contains(e,t){if(!e||!t)throw Error("null value on arr or str not allowed");return-1!=this.arrIndexOf(e,t)}arrIndexOf(e,t,s){if(!e||!e.length)return-1;let r=s||0;return(e=this.objToArray(e)).indexOf(t,r)}arrFilter(e,t,s,r){if(!e||!e.length)return[];let l=this.objToArray(e);return s?l.slice(s).filter(t,r):l.filter(t,r)}applyArgs(e,t,s){let r="undefined";if(s)for(let l=0;l<t.length;l++)r!=typeof e["_"+s[l]]&&(e["_"+s[l]]=t[l]),r!=typeof e[s[l]]&&(e[s[l]]=t[l]);else for(let s in t)t.hasOwnProperty(s)&&(r!=typeof e["_"+s]&&(e["_"+s]=t[s]),r!=typeof e[s]&&(e[s]=t[s]));return e}equalsIgnoreCase(e,t){return!e&&!t||!(!e||!t)&&e.toLowerCase()===t.toLowerCase()}timeout(e){let t=null;return new r.CancellablePromise((s,r)=>{t=setTimeout(()=>{s()},e)},()=>{t&&(clearTimeout(t),t=null)})}interval(e){let t=null;return new r.CancellablePromise((s,r)=>{t=setInterval(()=>{s()},e)},()=>{t&&(clearInterval(t),t=null)})}assertType(e,t){return this.isString(t)?typeof e==t:e instanceof t}}},function(e,t,s){"use strict";s.d(t,"b",(function(){return l})),s.d(t,"c",(function(){return n})),s.d(t,"f",(function(){return i})),s.d(t,"d",(function(){return a})),s.d(t,"a",(function(){return u})),s.d(t,"e",(function(){return o})),s.d(t,"g",(function(){return h})),s.d(t,"h",(function(){return c}));var r=s(4);class l{constructor(...e){this.dataPos=-1,this.value=e}hasNext(){return this.value.length-1>this.dataPos}next(){return this.dataPos++,this.value[this.dataPos]}reset(){this.dataPos=-1}}class n{constructor(e,t){this.filteredNext=null,this.filterFunc=e,this.inputDataSource=t}hasNext(){for(;null==this.filteredNext&&this.inputDataSource.hasNext();){let e=this.inputDataSource.next();if(this.filterFunc(e))return this.filteredNext=e,!0;this.filteredNext=null}return null!=this.filteredNext}next(){let e=this.filteredNext;return this.filteredNext=null,this.hasNext(),e}reset(){this.filteredNext=null,this.inputDataSource.reset()}}class i{constructor(e,t){this.mapFunc=e,this.inputDataSource=t}hasNext(){return this.inputDataSource.hasNext()}next(){return this.mapFunc(this.inputDataSource.next())}reset(){this.inputDataSource.reset()}}class a{constructor(e,t){this.mapFunc=e,this.inputDataSource=t}hasNext(){return this.resolveCurrentNext()||this.resolveNextNext()}resolveCurrentNext(){let e=!1;return this.activeDataSource&&(e=this.activeDataSource.hasNext()),e}resolveNextNext(){let e=!1;for(;!e&&this.inputDataSource.hasNext();)this.activeDataSource=this.mapFunc(this.inputDataSource.next()),e=this.activeDataSource.hasNext();return e}next(){return this.activeDataSource.next()}reset(){this.inputDataSource.reset()}}class u{constructor(){this.data=[]}collect(e){this.data.push(e)}get finalValue(){return this.data}}class o{constructor(){this.finalValue=new FormData}collect(e){this.finalValue.append(e.key,e.value)}}class h{constructor(){this.finalValue=new FormData}collect(e){let t=e.encodeFormElement();t.isPresent()&&this.finalValue.append(e.name.value,t.get(e.name).value)}}class c{constructor(){this.formData=[]}collect(e){let t=e.encodeFormElement();t.isPresent()&&this.formData.push([e.name.value,t.get(e.name).value])}get finalValue(){return r.Stream.of(...this.formData).map(e=>e.join("=")).reduce((e,t)=>[e,t].join("&")).orElse("").value}}},function(e,t,s){"use strict";s.r(t),s.d(t,"PromiseStatus",(function(){return r})),s.d(t,"Promise",(function(){return n})),s.d(t,"CancellablePromise",(function(){return i}));var r,l=s(0);!function(e){e[e.PENDING=0]="PENDING",e[e.FULLFILLED=1]="FULLFILLED",e[e.REJECTED=2]="REJECTED"}(r||(r={}));class n{constructor(e){this.status=r.PENDING,this.allFuncs=[],this.value=e,this.value(e=>this.resolve(e),e=>this.reject(e))}static all(...e){let t,s=0,r=new n((e,s)=>{t=e}),l=()=>{s++,e.length==s&&t()};l.__last__=!0;for(let t=0;t<e.length;t++)e[t].finally(l);return r}static race(...e){let t,s,r=new n((e,r)=>{t=e,s=r}),l=()=>(t&&t(),t=null,s=null,null);l.__last__=!0;let i=()=>(s&&s(),s=null,t=null,null);i.__last__=!0;for(let t=0;t<e.length;t++)e[t].then(l),e[t].catch(i);return r}static reject(e){return new n((t,s)=>{e instanceof n?e.then(e=>{s(e)}):setTimeout(()=>{s(e)},1)})}static resolve(e){return new n((t,s)=>{e instanceof n?e.then(e=>t(e)):setTimeout(()=>{t(e)},1)})}then(e,t){return this.allFuncs.push({then:e}),t&&this.allFuncs.push({catch:t}),this.spliceLastFuncs(),this}catch(e){return this.allFuncs.push({catch:e}),this.spliceLastFuncs(),this}finally(e){if(!this.__reason__)return this.allFuncs.push({finally:e}),this.spliceLastFuncs(),this;this.__reason__.finally(e)}resolve(e){for(;this.allFuncs.length&&this.allFuncs[0].then;){let t=this.allFuncs.shift(),s=l.Optional.fromNullable(t.then(e));if(!s.isPresent())break;if((e=(s=s.flatMap()).value)instanceof n)return void this.transferIntoNewPromise(e)}this.appyFinally(),this.status=r.FULLFILLED}reject(e){for(;this.allFuncs.length&&!this.allFuncs[0].finally;){var t=this.allFuncs.shift();if(t.catch){var s=l.Optional.fromNullable(t.catch(e));if(s.isPresent()){if((e=(s=s.flatMap()).value)instanceof n)return void this.transferIntoNewPromise(e);this.status=r.REJECTED;break}break}}this.status=r.REJECTED,this.appyFinally()}appyFinally(){for(;this.allFuncs.length;){var e=this.allFuncs.shift();e.finally&&e.finally()}}spliceLastFuncs(){let e=[],t=[];for(let s=0;s<this.allFuncs.length;s++)for(let r in this.allFuncs[s])this.allFuncs[s][r].__last__?e.push(this.allFuncs[s]):t.push(this.allFuncs[s]);this.allFuncs=t.concat(e)}transferIntoNewPromise(e){for(var t=0;t<this.allFuncs.length;t++)for(let s in this.allFuncs[t])e[s](this.allFuncs[t][s])}}class i extends n{constructor(e,t){super(e),this.cancellator=()=>{},this.cancellator=t}cancel(){this.status=r.REJECTED,this.appyFinally(),this.allFuncs=[]}then(e,t){return super.then(e,t)}catch(e){return super.catch(e)}finally(e){return super.finally(e)}}},function(e,t,s){"use strict";s.r(t),s.d(t,"Stream",(function(){return n})),s.d(t,"LazyStream",(function(){return i}));var r=s(0),l=s(2);class n{constructor(...e){this._limits=-1,this.pos=-1,this.value=e}static of(...e){return new n(...e)}static ofDataSource(e){let t=[];for(;e.hasNext();)t.push(e.next());return new n(...t)}limits(e){return this._limits=e,this}onElem(e){for(let t=0;t<this.value.length&&(-1==this._limits||t<this._limits)&&!1!==e(this.value[t],t);t++);return this}each(e){this.onElem(e)}map(e){e||(e=e=>e);let t=[];return this.each((s,r)=>{t.push(e(s))}),new n(...t)}flatMap(e){let t=[];return this.each(s=>{let r=e(s);t=t.concat(...r.value)}),n.of(...t)}filter(e){let t=[];return this.each(s=>{e(s)&&t.push(s)}),new n(...t)}reduce(e,t=null){let s=null!=t?0:1,l=null!=t?t:this.value.length?this.value[0]:null;for(let t=s;t<this.value.length&&(-1==this._limits||t<this._limits);t++)l=e(l,this.value[t]);return r.Optional.fromNullable(l)}first(){return this.value&&this.value.length?r.Optional.fromNullable(this.value[0]):r.Optional.absent}last(){let e=this._limits>0?Math.min(this._limits,this.value.length):this.value.length;return r.Optional.fromNullable(e?this.value[e-1]:null)}anyMatch(e){for(let t=0;t<this.value.length&&(-1==this._limits||t<this._limits);t++)if(e(this.value[t]))return!0;return!1}allMatch(e){if(!this.value.length)return!1;let t=0;for(let s=0;s<this.value.length;s++)e(this.value[s])&&t++;return t==this.value.length}noneMatch(e){let t=0;for(let s=0;s<this.value.length;s++)e(this.value[s])||t++;return t==this.value.length}collect(e){return this.each(t=>e.collect(t)),e.finalValue}hasNext(){let e=-1!=this._limits&&this.pos>=this._limits-1,t=this.pos>=this.value.length-1;return!(e||t)}next(){return this.hasNext()?(this.pos++,this.value[this.pos]):null}reset(){this.pos=-1}}class i{constructor(e){this._limits=-1,this.pos=-1,this.dataSource=e}static of(...e){return new i(new l.b(...e))}static ofStreamDataSource(e){return new i(e)}hasNext(){return!this.isOverLimits()&&this.dataSource.hasNext()}next(){let e=this.dataSource.next();return this.pos++,e}reset(){this.dataSource.reset(),this.pos=0,this._limits=-1}nextFilter(e){if(this.hasNext()){let t=this.next();return e(t)?t:this.nextFilter(e)}return null}limits(e){return this._limits=e,this}collect(e){for(;this.hasNext();){let t=this.next();e.collect(t)}return e.finalValue}onElem(e){return new i(new l.f(t=>(!1===e(t,this.pos)&&this.stop(),t),this))}filter(e){return new i(new l.c(e,this))}map(e){return new i(new l.f(e,this))}flatMap(e){return new i(new l.d(e,this))}each(e){for(;this.hasNext();)!1===e(this.next())&&this.stop()}reduce(e,t=null){if(!this.hasNext())return r.Optional.absent;let s=null,l=null;if(null!=t)s=t,l=this.next();else{if(s=this.next(),!this.hasNext())return r.Optional.fromNullable(s);l=this.next()}for(s=e(s,l);this.hasNext();)s=e(s,l=this.next());return r.Optional.fromNullable(s)}last(){return this.hasNext()?this.reduce((e,t)=>t):r.Optional.absent}first(){return this.reset(),this.hasNext()?r.Optional.fromNullable(this.next()):r.Optional.absent}anyMatch(e){for(;this.hasNext();)if(e(this.next()))return!0;return!1}allMatch(e){for(;this.hasNext();)if(!e(this.next()))return!1;return!0}noneMatch(e){for(;this.hasNext();)if(e(this.next()))return!1;return!0}get value(){return this.collect(new l.a)}stop(){this.pos=this._limits+1e9}isOverLimits(){return-1!=this._limits&&this.pos>=this._limits-1}}},function(e,t,s){"use strict";s.r(t),s.d(t,"ElementAttribute",(function(){return i})),s.d(t,"DomQuery",(function(){return u})),s.d(t,"DomQueryCollector",(function(){return o})),s.d(t,"DQ",(function(){return h}));var r=s(1),l=s(0),n=s(4);class i extends l.ValueEmbedder{constructor(e,t,s=null){super(e,t),this.element=e,this.name=t,this.defaultVal=s}get value(){let e=this.element.get(0).orElse().values;return e.length?e[0].getAttribute(this.name):this.defaultVal}set value(e){let t=this.element.get(0).orElse().values;for(let s=0;s<t.length;s++)t[s].setAttribute(this.name,e);t[0].setAttribute(this.name,e)}getClass(){return i}static fromNullable(e,t="value"){return new i(e,t)}}const a=e=>-1==e.indexOf("ln=scripts")&&-1==e.indexOf("ln=javax.faces")||-1==e.indexOf("/jsf.js")&&-1==e.indexOf("/jsf-uncompressed.js");class u{constructor(...e){if(this.rootNode=[],this.pos=-1,this._limits=-1,!l.Optional.fromNullable(e).isAbsent()&&e.length)for(let t=0;t<e.length;t++)if(r.Lang.instance.isString(e[t])){let s=u.querySelectorAll(e[t]);s.isAbsent()||e.push(...s.values)}else if(e[t]instanceof u)this.rootNode.push(...e[t].values);else if(r.Lang.instance.isString(e[t])){let s=u.querySelectorAll(e[t]);this.rootNode.push(...s.values)}else this.rootNode.push(e[t])}get value(){return this.getAsElem(0)}get values(){return this.allElems()}get id(){return new l.ValueEmbedder(this.getAsElem(0).value,"id")}get length(){return this.rootNode.length}get tagName(){return this.getAsElem(0).getIf("tagName")}get nodeName(){return this.getAsElem(0).getIf("nodeName")}isTag(e){return!this.isAbsent()&&(this.nodeName.orElse("__none___").value.toLowerCase()==e.toLowerCase()||this.tagName.orElse("__none___").value.toLowerCase()==e.toLowerCase())}get type(){return this.getAsElem(0).getIf("type")}get name(){return new l.ValueEmbedder(this.getAsElem(0).value,"name")}get inputValue(){return this.getAsElem(0).getIf("value").isPresent()?new l.ValueEmbedder(this.getAsElem(0).value):l.ValueEmbedder.absent}get elements(){let e=this.each(e=>{let t=e.value.value;return t.elements?t.elements:null}).stream.filter(e=>!!e).value;return new u(...e).orElseLazy(()=>this.querySelectorAll("form").elements).orElseLazy(()=>this.querySelectorAll("input, select, textarea"))}get disabled(){return!!this.attr("disabled").value}set disabled(e){this.attr("disabled").value=e+""}get childNodes(){let e=[];return this.eachElem(t=>{e=e.concat(r.Lang.instance.objToArray(t.childNodes))}),new u(...e)}get stream(){return new n.Stream(...this.asArray)}get lazyStream(){return n.LazyStream.of(...this.asArray)}get asArray(){let e=[];return this.each(t=>{e.push(t)}),e}static querySelectorAll(e){return new u(document).querySelectorAll(e)}static byId(e){return r.Lang.instance.isString(e)?new u(document).byId(e):new u(e)}static byTagName(e){return r.Lang.instance.isString(e)?new u(document).byTagName(e):new u(e)}static globalEval(e){return new u(document).globalEval(e)}static fromMarkup(e){let t=r.Lang.saveResolve(()=>new DOMParser).value;if(t){let s=t.parseFromString(e,"text/html");return new u(s)}{const t=document.implementation.createHTMLDocument("");let s=(e=r.Lang.instance.trim(e)).toLowerCase();return s.includes("<!doctype")||s.includes("<html")||s.includes("<head")||s.includes("<body")?(t.documentElement.innerHTML=e,new u(t.documentElement)):(t.body.innerHTML=e,new u(...r.Lang.instance.objToArray(t.body.childNodes)))}}get(e){return e<this.rootNode.length?new u(this.rootNode[e]):u.absent}getAsElem(e,t=l.Optional.absent){return e<this.rootNode.length?l.Optional.fromNullable(this.rootNode[e]):t}allElems(){return this.rootNode}isAbsent(){return 0==this.length}isPresent(e){let t=this.isAbsent();return!t&&e&&e.call(this,this),!t}ifPresentLazy(e=function(){}){return this.isPresent.call(this,e),this}delete(){this.eachElem(e=>{e.parentNode&&e.parentNode.removeChild(e)})}querySelectorAll(e){if(0==this.rootNode.length)return this;let t=[];for(let s=0;s<this.rootNode.length;s++){if(!this.rootNode[s].querySelectorAll)continue;let l=this.rootNode[s].querySelectorAll(e);t=t.concat(r.Lang.instance.objToArray(l))}return new u(...t)}byId(e,t){let s=[];for(let r=0;t&&r<this.rootNode.length;r++)this.rootNode[r].id==e&&s.push(new u(this.rootNode[r]));return s=s.concat(this.querySelectorAll(`[id="${e}"]`)),new u(...s)}byTagName(e,t){let s=[];for(let r=0;t&&r<this.rootNode.length;r++)this.rootNode[r].tagName==e&&s.push(new u(this.rootNode[r]));return s=s.concat(this.querySelectorAll(e)),new u(...s)}attr(e,t=null){return new i(this,e,t)}hasClass(e){let t=!1;return this.each(s=>{let r=s.attr("class").value||"";if(-1!=r.toLowerCase().indexOf(e.toLowerCase())){let s=r.split(/\s+/gi),l=!1;for(let t=0;t<s.length&&!l;t++)l=s[t].toLowerCase()==e.toLowerCase();if(t=t||l)return!1}}),t}addClass(e){return this.each(t=>{let s=t.attr("class").value||"";this.hasClass(e)||(t.attr("class").value=r.Lang.instance.trim(s+" "+e))}),this}removeClass(e){return this.each(t=>{if(this.hasClass(e)){let s=[],r=(t.attr("class").value||"").split(/\s+/gi);for(let t=0;t<r.length;t++)r[t].toLowerCase()!=e.toLowerCase()&&s.push(r[t]);t.attr("class").value=s.join(" ")}}),this}isMultipartCandidate(){return this.querySelectorAll("input[type='file']").firstElem().isPresent()}html(e){return l.Optional.fromNullable(e).isAbsent()?this.getAsElem(0).isPresent()?l.Optional.fromNullable(this.getAsElem(0).value.innerHTML):l.Optional.absent:(this.getAsElem(0).isPresent()&&(this.getAsElem(0).value.innerHTML=e),this)}_mozMatchesSelector(e,t){let s=e;return(s.matchesSelector||s.mozMatchesSelector||s.msMatchesSelector||s.oMatchesSelector||s.webkitMatchesSelector||function(t){let s=(document||window.ownerDocument).querySelectorAll(t),r=s.length;for(;--r>=0&&s.item(r)!==e;);return r>-1}).call(e,t)}filterSelector(e){let t=[];return this.eachElem(s=>{this._mozMatchesSelector(s,e)&&t.push(s)}),new u(...t)}matchesSelector(e){return this.eachElem(t=>{if(!this._mozMatchesSelector(t,e))return!1}),!0}getIf(...e){let t=this.childNodes;for(let s=0;s<e.length;s++)if((t=t.filterSelector(e[s])).isAbsent())return t;return t}eachElem(e){for(let t=0,s=this.rootNode.length;t<s&&!1!==e(this.rootNode[t],t);t++);return this}firstElem(e=(e=>e)){return this.rootNode.length>1&&e(this.rootNode[0],0),this}each(e){for(let t=0,s=this.rootNode.length;t<s&&!1!==e(this.get(t),t);t++);return this}first(e=(e=>e)){return this.rootNode.length>=1?(e(this.get(0),0),this.get(0)):this}filter(e){let t=[];return this.each(s=>{e(s)&&t.push(s)}),new u(...t)}globalEval(e,t){let s=document.getElementsByTagName("head")[0]||document.documentElement,r=document.createElement("script");t&&r.setAttribute("nonce",t),r.type="text/javascript",r.innerHTML=e;let l=s.appendChild(r);return s.removeChild(l),this}detach(){return this.eachElem(e=>{e.parentNode.removeChild(e)}),this}appendTo(e){this.eachElem(t=>{e.getAsElem(0).orElseLazy(()=>({appendChild:e=>{}})).value.appendChild(t)})}loadScriptEval(e,t=0,s){let r=new XMLHttpRequest;if(r.open("GET",e,!1),s&&r.setRequestHeader("Content-Type","application/x-javascript; charset:"+s),r.send(null),4!=r.readyState)throw Error("Loading of script "+e+" failed ");if(200!=r.status)throw Error(r.responseText);return(t?setTimeout((function(){this.globalEval(r.responseText+"\r\n//@ sourceURL="+e)}),t):this.globalEval(r.responseText.replace("\n","\r\n")+"\r\n//@ sourceURL="+e),this)}insertAfter(...e){this.each(t=>{let s=t.getAsElem(0).value,r=s.parentNode;for(let t=0;t<e.length;t++){let l=s.nextSibling;e[t].eachElem(e=>{l?(r.insertBefore(e,l),s=l):r.appendChild(e)})}});let t=[];return t.push(this),t.concat(e),new u(...t)}insertBefore(...e){this.each(t=>{let s=t.getAsElem(0).value,r=s.parentNode;for(let t=0;t<e.length;t++)e[t].eachElem(e=>{r.insertBefore(e,s)})});let t=[];return t.push(this),t.concat(e),new u(...t)}orElse(...e){return this.isPresent()?this:new u(...e)}orElseLazy(e){return this.isPresent()?this:new u(e())}parents(e){let t=[];const s=e.toLowerCase();let r=e=>{(e.tagName||"").toLowerCase()==s&&t.push(e)};return this.eachElem(s=>{for(;s.parentNode;)if(s=s.parentNode,r(s),"form"==e&&t.length)return!1}),new u(...t)}copyAttrs(e){return e.eachElem(e=>{let t=r.Lang.instance.objToArray(e.attributes);for(let e of t){let t=e.value,s=e.name;switch(s){case"id":this.id.value=t;break;case"disabled":this.resolveAttributeHolder("disabled").disabled=t;break;case"checked":this.resolveAttributeHolder("checked").checked=t;break;default:this.attr(s).value=t}}}),this}resolveAttributeHolder(e="value"){let t=[];return t[e]=null,e in this.getAsElem(0).value?this.getAsElem(0).value:t}outerHTML(e,t,s){let r=u.fromMarkup(e),l=[],n=this.getAsElem(0).value,i=r.get(0),a=n.parentNode,o=i.getAsElem(0).value;a.replaceChild(o,n),l.push(new u(o));let h=[];for(let e=1;e<r.length;e++)h.push(r.get(e)),this.rootNode.push(r.get(e).getAsElem(0).value);return l.push(u.byId(o).insertAfter(...h)),t&&this.runScripts(),s&&this.runCss(),new u(...l)}runScripts(e=a){let t=r.Lang.instance,s=[],l=r=>{let l=r.tagName,n=r.type||"";if(l&&t.equalsIgnoreCase(l,"script")&&(""===n||t.equalsIgnoreCase(n,"text/javascript")||t.equalsIgnoreCase(n,"javascript")||t.equalsIgnoreCase(n,"text/ecmascript")||t.equalsIgnoreCase(n,"ecmascript"))){let t=r.getAttribute("src");if(void 0!==t&&null!=t&&t.length>0)e(t)&&(s.length&&(this.globalEval(s.join("\n")),s=[]),this.loadScriptEval(t,0,"UTF-8"));else{let e=r.text||r.innerText||r.innerHTML,t=!0;for(;t;)t=!1," "==e.substring(0,1)&&(e=e.substring(1),t=!0),"\x3c!--"==e.substring(0,4)&&(e=e.substring(4),t=!0),"//<![CDATA["==e.substring(0,11)&&(e=e.substring(11),t=!0);s.push(e)}}};try{let e=this.querySelectorAll("script");if(null==e)return;for(let t=0;t<e.length;t++)l(e.getAsElem(t).value);s.length&&this.globalEval(s.join("\n"))}catch(e){window.console&&window.console.error&&console.error(e.message||e.description)}finally{l=null}}runCss(){const e=r.Lang.instance,t=(e,t)=>{let s=document.createElement("style");document.getElementsByTagName("head")[0].appendChild(s);let r=s.sheet?s.sheet:s.styleSheet;s.setAttribute("rel",e.getAttribute("rel")||"stylesheet"),s.setAttribute("type",e.getAttribute("type")||"text/css"),void 0!==r.cssText?r.cssText=t:s.appendChild(document.createTextNode(t))},s=s=>{const r=e.equalsIgnoreCase,l=s.tagName;if(l&&r(l,"link")&&r(s.getAttribute("type"),"text/css"))t(s,"@import url('"+s.getAttribute("href")+"');");else if(l&&r(l,"style")&&r(s.getAttribute("type"),"text/css")){let e=[],r=s.childNodes;if(r){const t=r.length;for(let s=0;s<t;s++)e.push(r[s].innerHTML||r[s].data)}else s.innerHTML&&e.push(s.innerHTML);t(s,e.join(""))}},l=this.querySelectorAll("link, style");if(null!=l){for(let e=0;e<l.length;e++){s(l.getAsElem(e).value)}return this}}get cDATAAsString(){let e=[];return this.each(t=>{t.childNodes.eachElem(t=>{e.push(t.data)})}),e.join("")}click(){return this.fireEvent("click"),this}addEventListener(e,t,s){return this.eachElem(r=>{r.addEventListener(e,t,s)}),this}removeEventListener(e,t,s){return this.eachElem(r=>{r.removeEventListener(e,t,s)}),this}fireEvent(e){this.eachElem(t=>{var s;if(t.ownerDocument)s=t.ownerDocument;else{if(9!=t.nodeType)throw new Error("Invalid node passed to fireEvent: "+t.id);s=t}if(t.dispatchEvent){var r="";switch(e){case"click":case"mousedown":case"mouseup":r="MouseEvents";break;case"focus":case"change":case"blur":case"select":r="HTMLEvents";break;default:throw"fireEvent: Couldn't find an event class for event '"+e+"'."}let l=s.createEvent(r);l.initEvent(e,!0,!0),l.synthetic=!0,t.dispatchEvent(l)}else if(t.fireEvent){var l=s.createEventObject();l.synthetic=!0,t.fireEvent("on"+e,l)}})}textContent(e=""){return this.stream.map(e=>{return e.getAsElem(0).orElseLazy(()=>({textContent:""})).value.textContent||""}).reduce((t,s)=>t+e+s,"").value}innerText(e=""){return this.stream.map(e=>{return e.getAsElem(0).orElseLazy(()=>({innerText:""})).value.innerText||""}).reduce((t,s)=>t+e+s,"").value}encodeFormElement(e=new l.Config({})){if(this.name.isAbsent())return;let t=e.shallowCopy;return this.eachElem(e=>{if(!e.name)return;let s=e.name,r=e.tagName.toLowerCase(),l=e.type.orElse("__none__").value.toLowerCase();if(l=l.toLowerCase(),("input"==r||"textarea"==r||"select"==r)&&null!=s&&""!=s&&!e.disabled){if("select"==r){let r=e.getAsElem(0).value;if(r.selectedIndex>=0){let e=r.options.length;for(let l=0;l<e;l++)if(r.options[l].selected){let e=r.options[l];t.apply(s).value=null!=e.getAttribute("value")?e.value:e.text}}}if("select"!=r&&"button"!=l&&"reset"!=l&&"submit"!=l&&"image"!=l&&("checkbox"!=l&&"radio"!=l||e.checked)){let r=e.value.files;r&&r.length?t.apply(s).value=r[0]:t.apply(s).value=e.inputValue.value}}}),t}subNodes(e,t){return l.Optional.fromNullable(t).isAbsent()&&(t=this.length),new u(...this.rootNode.slice(e,Math.min(t,this.length)))}limits(e){return this._limits=e,this}hasNext(){let e=-1!=this._limits&&this.pos>=this._limits-1,t=this.pos>=this.values.length-1;return!(e||t)}next(){return this.hasNext()?(this.pos++,new u(this.values[this.pos])):null}reset(){this.pos=-1}}u.absent=new u;class o{constructor(){this.data=[]}collect(e){this.data.push(e)}get finalValue(){return new u(...this.data)}}const h=u},function(e,t,s){"use strict";s.r(t),s.d(t,"XMLQuery",(function(){return n})),s.d(t,"XQ",(function(){return i}));var r=s(1),l=s(5);class n extends l.DomQuery{constructor(e,t="text/xml"){let s=e=>{if(null==e)return null;return r.Lang.saveResolveLazy(()=>new window.DOMParser,()=>(()=>{let e=new ActiveXObject("Microsoft.XMLDOM");return e.async=!1,{parseFromString:(t,s)=>e.loadXML(t)}})()).value.parseFromString(e,t)};r.Lang.instance.isString(e)?super(s(e)):super(e)}isXMLParserError(){return this.querySelectorAll("parsererror").isPresent()}toString(){let e=[];return this.eachElem(t=>{void 0!==window.XMLSerializer?e.push((new window.XMLSerializer).serializeToString(t)):void 0!==t.xml&&e.push(t.xml)}),e.join("")}parserErrorText(e){return this.querySelectorAll("parsererror").textContent(e)}static parseXML(e){return new n(e)}static parseHTML(e){return new n(e,"text/html")}static fromString(e,t="text/xml"){return new n(e,t)}}const i=n}]));
//# sourceMappingURL=XmlQuery.js.map