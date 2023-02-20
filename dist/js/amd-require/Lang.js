require([],(function(){return function(){"use strict";var e={484:function(e,t,r){r.d(t,{Es2019Array:function(){return s}});class s extends Array{constructor(...e){if(super(...e),!Array.prototype.flatMap){let e=s.prototype.flatMap_;this.flatMap=e}}flatMap_(e,t=!1){let r=[],n=t=>{let s=e(t);if(Array.isArray(s)){if(1==s.length)return void r.push(s[1]);s.length>1&&s.forEach((e=>n(e)))}else r.push(t)};return this.forEach((e=>n(e))),new s(...r)}concat(...e){return new s(...super.concat(...e))}reverse(){return new s(...super.reverse())}slice(e,t){return new s(...super.slice(e,t))}splice(e,t){return new s(...super.splice(e,t))}filter(e,t){return new s(...super.filter(e,t))}}},805:function(e,t,r){r.r(t),r.d(t,{Lang:function(){return s}});var s,n=r(152);!function(e){function t(e){let t=/\s/,r=(e=e.replace(/^\s\s*/,"")).length;for(;t.test(e.charAt(--r)););return e.slice(0,r+1)}function r(e){return!!arguments.length&&null!=e&&("string"==typeof e||e instanceof String)}e.saveResolve=function(e,t=null){try{let r=e();return n.Optional.fromNullable(null!=r?r:t)}catch(e){return n.Optional.absent}},e.saveResolveLazy=function(e,t=null){try{let r=e();return n.Optional.fromNullable(null!=r?r:t())}catch(e){return n.Optional.absent}},e.strToArray=function(e,r=/\./gi){let s=[];return e.split(r).forEach((e=>{s.push(t(e))})),s},e.trim=t,e.objToArray=function(e,t=0,r=[]){return"__undefined__"==(null!=e?e:"__undefined__")?null!=r?r:null:e instanceof Array&&!t&&!r?e:r.concat(Array.prototype.slice.call(e,t))},e.equalsIgnoreCase=function(e,t){let r=null!=t?t:"___no_value__";return(null!=e?e:"___no_value__").toLowerCase()===r.toLowerCase()},e.assertType=function(e,t){return r(t)?typeof e==t:e instanceof t},e.isString=r,e.isFunc=function(e){return e instanceof Function||"function"==typeof e},e.objAssign=function(e,...t){if(null==e)throw new TypeError("Cannot convert undefined or null to object");let r=Object(e);return Object.assign?(t.forEach((e=>Object.assign(r,e))),r):(t.filter((e=>null!=e)).forEach((e=>{let t=e;Object.keys(t).filter((e=>Object.prototype.hasOwnProperty.call(t,e))).forEach((e=>r[e]=t[e]))})),r)}}(s||(s={}))},152:function(e,t,r){r.d(t,{Optional:function(){return a}});var s=r(805),n=r(484);s.Lang.objAssign;class l{constructor(e){this._value=e}get value(){return this._value}map(e){e||(e=e=>e);let t=e(this.value);return new l(t)}flatMap(e){let t=this.map(e);for(;(null==t?void 0:t.value)instanceof l;)t=t.value;return t}}class a extends l{constructor(e){super(e)}get value(){return this._value instanceof l?this._value.flatMap().value:this._value}static fromNullable(e){return new a(e)}isAbsent(){return void 0===this.value||null==this.value}isPresent(e){let t=this.isAbsent();return!t&&e&&e.call(this,this),!t}ifPresentLazy(e=(()=>{})){return this.isPresent.call(this,e),this}orElse(e){return this.isPresent()?this:null==e?a.absent:this.flatMap((()=>e))}orElseLazy(e){return this.isPresent()?this:this.flatMap(e)}flatMap(e){let t=super.flatMap(e);return t instanceof a?t.flatMap():a.fromNullable(t.value)}getIf(...e){e=this.preprocessKeys(...e);let t=this;for(let r=0;r<e.length;r++){let s=this.keyVal(e[r]),n=this.arrayIndex(e[r]);if(""===s&&n>=0){if(t=this.getClass().fromNullable(t.value instanceof Array?t.value.length<n?null:t.value[n]:null),t.isAbsent())return t}else if(s&&n>=0){if(t.getIfPresent(s).isAbsent())return t;if(t=t.getIfPresent(s).value instanceof Array?this.getClass().fromNullable(t.getIfPresent(s).value[n]):this.getClass().absent,t.isAbsent())return t}else{if(t=t.getIfPresent(s),t.isAbsent())return t;n>-1&&(t=this.getClass().fromNullable(t.value[n]))}}return t}match(e){return!this.isAbsent()&&e(this.value)}get(e=a.absent){return this.isAbsent()?this.getClass().fromNullable(e).flatMap():this.getClass().fromNullable(this.value).flatMap()}toJson(){return JSON.stringify(this.value)}getClass(){return a}arrayIndex(e){let t=e.indexOf("["),r=e.indexOf("]");return t>=0&&r>0&&t<r?parseInt(e.substring(t+1,r)):-1}keyVal(e){let t=e.indexOf("[");return t>=0?e.substring(0,t):e}getIfPresent(e){return this.isAbsent()?this.getClass().absent:this.getClass().fromNullable(this.value[e]).flatMap()}resolve(e){if(this.isAbsent())return a.absent;try{return a.fromNullable(e(this.value))}catch(e){return a.absent}}preprocessKeys(...e){return new n.Es2019Array(...e).flatMap((e=>new n.Es2019Array(...e.split(/]\s*\[/gi)).map((e=>(-1==(e=e.replace(/^\s+|\s+$/g,"")).indexOf("[")&&-1!=e.indexOf("]")&&(e="["+e),-1==e.indexOf("]")&&-1!=e.indexOf("[")&&(e+="]"),e)))))}}a.absent=a.fromNullable(null);class i extends a{constructor(e,t="value"){super(e),this.key=t}get value(){return this._value?this._value[this.key]:null}set value(e){this._value&&(this._value[this.key]=e)}orElse(e){let t={};return t[this.key]=e,this.isPresent()?this:new i(t,this.key)}orElseLazy(e){if(this.isPresent())return this;{let t={};return t[this.key]=e(),new i(t,this.key)}}getClass(){return i}static fromNullable(e,t="value"){return new i(e,t)}}i.absent=i.fromNullable(null);class u extends i{constructor(e,t,r){super(e,t),this.arrPos=null!=r?r:-1}get value(){return""==this.key&&this.arrPos>=0?this._value[this.arrPos]:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]:this._value[this.key]}set value(e){""==this.key&&this.arrPos>=0?this._value[this.arrPos]=e:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]=e:this._value[this.key]=e}}u.absent=u.fromNullable(null)}},t={};function r(s){var n=t[s];if(void 0!==n)return n.exports;var l=t[s]={exports:{}};return e[s](l,l.exports,r),l.exports}return r.d=function(e,t){for(var s in t)r.o(t,s)&&!r.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r(805)}()}));
//# sourceMappingURL=Lang.js.map