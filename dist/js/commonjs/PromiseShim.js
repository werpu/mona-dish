!function(){"use strict";var t={484:function(t,e,s){s.d(e,{Es2019Array:function(){return l}});class r extends Array{constructor(...t){super(...t),t._another?this._another=t._another:this._another=t,this.flatMap=t=>this._flatMap(t),this.flat=(t=1)=>this._flat(t)}map(t,e){return new n(...Array.prototype.map.call(this._another,t,e))}concat(...t){return new n(...Array.prototype.concat.call(this._another,...t))}reverse(){return new n(...Array.prototype.reverse.call(this._another))}slice(t,e){return new n(...Array.prototype.slice.call(this._another,t,e))}splice(t,e){return new n(...Array.prototype.splice.call(this._another,t,e))}filter(t,e){return new n(...Array.prototype.filter.call(this._another,t,e))}reduce(t,e){return Array.prototype.reduce.call(this._another,t,e)}_flat(t=1){return this._flatResolve(this._another,t)}_flatResolve(t,e=1){if(0==e)return t;let s=[];return t.forEach((t=>{t=Array.isArray(t)?t:[t];let r=this._flatResolve(t,e-1);s=s.concat(r)})),new l(...s)}_flatMap(t){let e=this.map((e=>t(e)));return this._flatResolve(e)}}function n(...t){let e=new r(...t);return new Proxy(e,{get(t,e,s){return"symbol"==typeof e?t._another[e]:isNaN(parseInt(e))?t[e]:t._another[e]},set(t,e,s){return t[e]=s,t._another[e]=s,!0}})}var l=Array.prototype.flatMap?function(...t){return t}:n},805:function(t,e,s){s.d(e,{Lang:function(){return r}});var r,n=s(152),l=s(484);!function(t){function e(t){let e=/\s/,s=(t=t.replace(/^\s\s*/,"")).length;for(;e.test(t.charAt(--s)););return t.slice(0,s+1)}function s(t){return!!arguments.length&&null!=t&&("string"==typeof t||t instanceof String)}t.saveResolve=function(t,e=null){try{let s=t();return n.Optional.fromNullable(null!=s?s:e)}catch(t){return n.Optional.absent}},t.saveResolveLazy=function(t,e=null){try{let s=t();return n.Optional.fromNullable(null!=s?s:e())}catch(t){return n.Optional.absent}},t.strToArray=function(t,s=/\./gi){let r=[];return t.split(s).forEach((t=>{r.push(e(t))})),r},t.trim=e,t.objToArray=function(t,e=0,s=[]){return"__undefined__"==(null!=t?t:"__undefined__")?null!=s?s:null:t instanceof Array&&!e&&!s?t:new l.Es2019Array(...s.concat(Array.prototype.slice.call(t,e)))},t.equalsIgnoreCase=function(t,e){let s=null!=e?e:"___no_value__";return(null!=t?t:"___no_value__").toLowerCase()===s.toLowerCase()},t.assertType=function(t,e){return s(e)?typeof t==e:t instanceof e},t.isString=s,t.isFunc=function(t){return t instanceof Function||"function"==typeof t},t.objAssign=function(t,...e){if(null==t)throw new TypeError("Cannot convert undefined or null to object");let s=Object(t);return Object.assign?(e.forEach((t=>Object.assign(s,t))),s):(e.filter((t=>null!=t)).forEach((t=>{let e=t;Object.keys(e).filter((t=>Object.prototype.hasOwnProperty.call(e,t))).forEach((t=>s[t]=e[t]))})),s)}}(r||(r={}))},152:function(t,e,s){s.d(e,{Optional:function(){return a}});var r=s(805),n=s(484);r.Lang.objAssign;class l{constructor(t){this._value=t}get value(){return this._value}map(t){t||(t=t=>t);let e=t(this.value);return new l(e)}flatMap(t){let e=this.map(t);for(;(null==e?void 0:e.value)instanceof l;)e=e.value;return e}}class a extends l{constructor(t){super(t)}get value(){return this._value instanceof l?this._value.flatMap().value:this._value}static fromNullable(t){return new a(t)}isAbsent(){return void 0===this.value||null==this.value}isPresent(t){let e=this.isAbsent();return!e&&t&&t.call(this,this),!e}ifPresentLazy(t=(()=>{})){return this.isPresent.call(this,t),this}orElse(t){return this.isPresent()?this:null==t?a.absent:this.flatMap((()=>t))}orElseLazy(t){return this.isPresent()?this:this.flatMap(t)}flatMap(t){let e=super.flatMap(t);return e instanceof a?e.flatMap():a.fromNullable(e.value)}getIf(...t){t=this.preprocessKeys(...t);let e=this;for(let s=0;s<t.length;s++){let r=this.keyVal(t[s]),n=this.arrayIndex(t[s]);if(""===r&&n>=0){if(e=this.getClass().fromNullable(e.value instanceof Array?e.value.length<n?null:e.value[n]:null),e.isAbsent())return e}else if(r&&n>=0){if(e.getIfPresent(r).isAbsent())return e;if(e=e.getIfPresent(r).value instanceof Array?this.getClass().fromNullable(e.getIfPresent(r).value[n]):this.getClass().absent,e.isAbsent())return e}else{if(e=e.getIfPresent(r),e.isAbsent())return e;n>-1&&(e=this.getClass().fromNullable(e.value[n]))}}return e}match(t){return!this.isAbsent()&&t(this.value)}get(t=a.absent){return this.isAbsent()?this.getClass().fromNullable(t).flatMap():this.getClass().fromNullable(this.value).flatMap()}toJson(){return JSON.stringify(this.value)}getClass(){return a}arrayIndex(t){let e=t.indexOf("["),s=t.indexOf("]");return e>=0&&s>0&&e<s?parseInt(t.substring(e+1,s)):-1}keyVal(t){let e=t.indexOf("[");return e>=0?t.substring(0,e):t}getIfPresent(t){return this.isAbsent()?this.getClass().absent:this.getClass().fromNullable(this.value[t]).flatMap()}resolve(t){if(this.isAbsent())return a.absent;try{return a.fromNullable(t(this.value))}catch(t){return a.absent}}preprocessKeys(...t){return new n.Es2019Array(...t).flatMap((t=>new n.Es2019Array(...t.split(/]\s*\[/gi)).map((t=>(-1==(t=t.replace(/^\s+|\s+$/g,"")).indexOf("[")&&-1!=t.indexOf("]")&&(t="["+t),-1==t.indexOf("]")&&-1!=t.indexOf("[")&&(t+="]"),t)))))}}a.absent=a.fromNullable(null);class i extends a{constructor(t,e="value"){super(t),this.key=e}get value(){return this._value?this._value[this.key]:null}set value(t){this._value&&(this._value[this.key]=t)}orElse(t){let e={};return e[this.key]=t,this.isPresent()?this:new i(e,this.key)}orElseLazy(t){if(this.isPresent())return this;{let e={};return e[this.key]=t(),new i(e,this.key)}}getClass(){return i}static fromNullable(t,e="value"){return new i(t,e)}}i.absent=i.fromNullable(null);class u extends i{constructor(t,e,s){super(t,e),this.arrPos=null!=s?s:-1}get value(){return""==this.key&&this.arrPos>=0?this._value[this.arrPos]:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]:this._value[this.key]}set value(t){""==this.key&&this.arrPos>=0?this._value[this.arrPos]=t:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]=t:this._value[this.key]=t}}u.absent=u.fromNullable(null)},376:function(t,e,s){s.d(e,{Promise:function(){return l}});var r,n=s(152);!function(t){t[t.PENDING=0]="PENDING",t[t.FULLFILLED=1]="FULLFILLED",t[t.REJECTED=2]="REJECTED"}(r||(r={}));class l{constructor(t){this.status=r.PENDING,this.allFuncs=[],this.value=t,this.value((t=>this.resolve(t)),(t=>this.reject(t)))}static all(...t){let e,s=0,r=new l(((t,s)=>{e=t})),n=()=>{s++,t.length==s&&e()};n.__last__=!0;for(let e=0;e<t.length;e++)t[e].finally(n);return r}static race(...t){let e,s,r=new l(((t,r)=>{e=t,s=r})),n=()=>(e&&e(),e=null,s=null,null);n.__last__=!0;let a=()=>(s&&s(),s=null,e=null,null);a.__last__=!0;for(let e=0;e<t.length;e++)t[e].then(n),t[e].catch(a);return r}static reject(t){return new l(((e,s)=>{t instanceof l?t.then((t=>{s(t)})):setTimeout((()=>{s(t)}),1)}))}static resolve(t){return new l(((e,s)=>{t instanceof l?t.then((t=>e(t))):setTimeout((()=>{e(t)}),1)}))}then(t,e){return this.allFuncs.push({then:t}),e&&this.allFuncs.push({catch:e}),this.spliceLastFuncs(),this}catch(t){return this.allFuncs.push({catch:t}),this.spliceLastFuncs(),this}finally(t){if(!this.__reason__)return this.allFuncs.push({finally:t}),this.spliceLastFuncs(),this;this.__reason__.finally(t)}resolve(t){for(;this.allFuncs.length&&this.allFuncs[0].then;){let e=this.allFuncs.shift(),s=n.Optional.fromNullable(e.then(t));if(!s.isPresent())break;if(s=s.flatMap(),(t=s.value)instanceof l)return void this.transferIntoNewPromise(t)}this.appyFinally(),this.status=r.FULLFILLED}reject(t){for(;this.allFuncs.length&&!this.allFuncs[0].finally;){let e=this.allFuncs.shift();if(e.catch){let s=n.Optional.fromNullable(e.catch(t));if(s.isPresent()){if(s=s.flatMap(),(t=s.value)instanceof l)return void this.transferIntoNewPromise(t);this.status=r.REJECTED;break}break}}this.status=r.REJECTED,this.appyFinally()}appyFinally(){for(;this.allFuncs.length;){let t=this.allFuncs.shift();t.finally&&t.finally()}}spliceLastFuncs(){let t=[],e=[];for(let s=0;s<this.allFuncs.length;s++)for(let r in this.allFuncs[s])this.allFuncs[s][r].__last__?t.push(this.allFuncs[s]):e.push(this.allFuncs[s]);this.allFuncs=e.concat(t)}transferIntoNewPromise(t){for(let e=0;e<this.allFuncs.length;e++)for(let s in this.allFuncs[e])t[s](this.allFuncs[e][s])}}}},e={};function s(r){var n=e[r];if(void 0!==n)return n.exports;var l=e[r]={exports:{}};return t[r](l,l.exports,s),l.exports}s.d=function(t,e){for(var r in e)s.o(e,r)&&!s.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};!function(){s.r(r);var t=s(376);Promise||t.Promise}();var n=exports;for(var l in r)n[l]=r[l];r.__esModule&&Object.defineProperty(n,"__esModule",{value:!0})}();
//# sourceMappingURL=PromiseShim.js.map