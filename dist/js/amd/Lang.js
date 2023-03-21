define((function(){return function(){"use strict";var e={484:function(e,t,r){r.d(t,{Es2019Array:function(){return l}});class n extends Array{constructor(...e){super(...e),e._another?this._another=e._another:this._another=e,this.flatMap=e=>this._flatMap(e),this.flat=(e=1)=>this._flat(e)}map(e,t){return new s(...Array.prototype.map.call(this._another,e,t))}concat(...e){return new s(...Array.prototype.concat.call(this._another,...e))}reverse(){return new s(...Array.prototype.reverse.call(this._another))}slice(e,t){return new s(...Array.prototype.slice.call(this._another,e,t))}splice(e,t){return new s(...Array.prototype.splice.call(this._another,e,t))}filter(e,t){return new s(...Array.prototype.filter.call(this._another,e,t))}reduce(e,t){return Array.prototype.reduce.call(this._another,e,t)}_flat(e=1){return this._flatResolve(this._another,e)}_flatResolve(e,t=1){if(0==t)return e;let r=[];return e.forEach((e=>{e=Array.isArray(e)?e:[e];let n=this._flatResolve(e,t-1);r=r.concat(n)})),new l(...r)}_flatMap(e){let t=this.map((t=>e(t)));return this._flatResolve(t)}}function s(...e){let t=new n(...e);return new Proxy(t,{get(e,t,r){return"symbol"==typeof t?e._another[t]:isNaN(parseInt(t))?e[t]:e._another[t]},set(e,t,r){return e[t]=r,e._another[t]=r,!0}})}var l=Array.prototype.flatMap?function(...e){return e}:s},152:function(e,t,r){r.d(t,{Optional:function(){return l}});var n=r(484);class s{constructor(e){this._value=e}get value(){return this._value}map(e){e||(e=e=>e);let t=e(this.value);return new s(t)}flatMap(e){let t=this.map(e);for(;(null==t?void 0:t.value)instanceof s;)t=t.value;return t}}class l extends s{constructor(e){super(e)}get value(){return this._value instanceof s?this._value.flatMap().value:this._value}static fromNullable(e){return new l(e)}isAbsent(){return void 0===this.value||null==this.value}isPresent(e){let t=this.isAbsent();return!t&&e&&e.call(this,this),!t}ifPresentLazy(e=(()=>{})){return this.isPresent.call(this,e),this}orElse(e){return this.isPresent()?this:null==e?l.absent:this.flatMap((()=>e))}orElseLazy(e){return this.isPresent()?this:this.flatMap(e)}flatMap(e){let t=super.flatMap(e);return t instanceof l?t.flatMap():l.fromNullable(t.value)}getIf(...e){e=this.preprocessKeys(...e);let t=this;for(let r=0;r<e.length;r++){let n=this.keyVal(e[r]),s=this.arrayIndex(e[r]);if(""===n&&s>=0){if(t=this.getClass().fromNullable(t.value instanceof Array?t.value.length<s?null:t.value[s]:null),t.isAbsent())return t}else if(n&&s>=0){if(t.getIfPresent(n).isAbsent())return t;if(t=t.getIfPresent(n).value instanceof Array?this.getClass().fromNullable(t.getIfPresent(n).value[s]):this.getClass().absent,t.isAbsent())return t}else{if(t=t.getIfPresent(n),t.isAbsent())return t;s>-1&&(t=this.getClass().fromNullable(t.value[s]))}}return t}match(e){return!this.isAbsent()&&e(this.value)}get(e=l.absent){return this.isAbsent()?this.getClass().fromNullable(e).flatMap():this.getClass().fromNullable(this.value).flatMap()}toJson(){return JSON.stringify(this.value)}getClass(){return l}arrayIndex(e){let t=e.indexOf("["),r=e.indexOf("]");return t>=0&&r>0&&t<r?parseInt(e.substring(t+1,r)):-1}keyVal(e){let t=e.indexOf("[");return t>=0?e.substring(0,t):e}getIfPresent(e){return this.isAbsent()?this.getClass().absent:this.getClass().fromNullable(this.value[e]).flatMap()}resolve(e){if(this.isAbsent())return l.absent;try{return l.fromNullable(e(this.value))}catch(e){return l.absent}}preprocessKeys(...e){return new n.Es2019Array(...e).flatMap((e=>new n.Es2019Array(...e.split(/]\s*\[/gi)).map((e=>(-1==(e=e.replace(/^\s+|\s+$/g,"")).indexOf("[")&&-1!=e.indexOf("]")&&(e="["+e),-1==e.indexOf("]")&&-1!=e.indexOf("[")&&(e+="]"),e)))))}}l.absent=l.fromNullable(null);class a extends l{constructor(e,t="value"){super(e),this.key=t}get value(){return this._value?this._value[this.key]:null}set value(e){this._value&&(this._value[this.key]=e)}orElse(e){let t={};return t[this.key]=e,this.isPresent()?this:new a(t,this.key)}orElseLazy(e){if(this.isPresent())return this;{let t={};return t[this.key]=e(),new a(t,this.key)}}getClass(){return a}static fromNullable(e,t="value"){return new a(e,t)}}a.absent=a.fromNullable(null)}},t={};function r(n){var s=t[n];if(void 0!==s)return s.exports;var l=t[n]={exports:{}};return e[n](l,l.exports,r),l.exports}r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};return function(){r.r(n),r.d(n,{Lang:function(){return e}});var e,t=r(152),s=r(484);!function(e){function r(e){let t=/\s/,r=(e=e.replace(/^\s\s*/,"")).length;for(;t.test(e.charAt(--r)););return e.slice(0,r+1)}function n(e){return!!arguments.length&&null!=e&&("string"==typeof e||e instanceof String)}e.saveResolve=function(e,r=null){try{let n=e();return t.Optional.fromNullable(null!=n?n:r)}catch(e){return t.Optional.absent}},e.saveResolveLazy=function(e,r=null){try{let n=e();return t.Optional.fromNullable(null!=n?n:r())}catch(e){return t.Optional.absent}},e.strToArray=function(e,t=/\./gi){let n=[];return e.split(t).forEach((e=>{n.push(r(e))})),n},e.trim=r,e.objToArray=function(e,t=0,r=[]){return"__undefined__"==(null!=e?e:"__undefined__")?null!=r?r:null:e instanceof Array&&!t&&!r?e:new s.Es2019Array(...r.concat(Array.prototype.slice.call(e,t)))},e.equalsIgnoreCase=function(e,t){let r=null!=t?t:"___no_value__";return(null!=e?e:"___no_value__").toLowerCase()===r.toLowerCase()},e.assertType=function(e,t){return n(t)?typeof e==t:e instanceof t},e.isString=n,e.isFunc=function(e){return e instanceof Function||"function"==typeof e},e.objAssign=function(e,...t){if(null==e)throw new TypeError("Cannot convert undefined or null to object");let r=Object(e);return Object.assign?(t.forEach((e=>Object.assign(r,e))),r):(t.filter((e=>null!=e)).forEach((e=>{let t=e;Object.keys(t).filter((e=>Object.prototype.hasOwnProperty.call(t,e))).forEach((e=>r[e]=t[e]))})),r)}}(e||(e={}))}(),n}()}));
//# sourceMappingURL=Lang.js.map