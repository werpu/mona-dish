!function(){"use strict";var e={484:function(e,t,r){r.d(t,{Es2019Array:function(){return n}});class s extends Array{constructor(...e){super(...e),e._another?this._another=e._another:this._another=e,this.flatMap=e=>this._flatMap(e),this.flat=(e=1)=>this._flat(e)}map(e,t){return new l(...Array.prototype.map.call(this._another,e,t))}concat(...e){return new l(...Array.prototype.concat.call(this._another,...e))}reverse(){return new l(...Array.prototype.reverse.call(this._another))}slice(e,t){return new l(...Array.prototype.slice.call(this._another,e,t))}splice(e,t){return new l(...Array.prototype.splice.call(this._another,e,t))}filter(e,t){return new l(...Array.prototype.filter.call(this._another,e,t))}reduce(e,t){return Array.prototype.reduce.call(this._another,e,t)}_flat(e=1){return this._flatResolve(this._another,e)}_flatResolve(e,t=1){if(0==t)return e;let r=[];return e.forEach((e=>{e=Array.isArray(e)?e:[e];let s=this._flatResolve(e,t-1);r=r.concat(s)})),new n(...r)}_flatMap(e){let t=this.map((t=>e(t)));return this._flatResolve(t)}}function l(...e){let t=new s(...e);return new Proxy(t,{get(e,t,r){return"symbol"==typeof t?e._another[t]:isNaN(parseInt(t))?e[t]:e._another[t]},set(e,t,r){return e[t]=r,e._another[t]=r,!0}})}var n=Array.prototype.flatMap?function(...e){return e}:l},805:function(e,t,r){r.d(t,{Lang:function(){return s}});var s,l=r(152),n=r(484);!function(e){function t(e){let t=/\s/,r=(e=e.replace(/^\s\s*/,"")).length;for(;t.test(e.charAt(--r)););return e.slice(0,r+1)}function r(e){return!!arguments.length&&null!=e&&("string"==typeof e||e instanceof String)}e.saveResolve=function(e,t=null){try{let r=e();return l.Optional.fromNullable(null!=r?r:t)}catch(e){return l.Optional.absent}},e.saveResolveLazy=function(e,t=null){try{let r=e();return l.Optional.fromNullable(null!=r?r:t())}catch(e){return l.Optional.absent}},e.strToArray=function(e,r=/\./gi){let s=[];return e.split(r).forEach((e=>{s.push(t(e))})),s},e.trim=t,e.objToArray=function(e,t=0,r=[]){return"__undefined__"==(null!=e?e:"__undefined__")?null!=r?r:null:e instanceof Array&&!t&&!r?e:new n.Es2019Array(...r.concat(Array.prototype.slice.call(e,t)))},e.equalsIgnoreCase=function(e,t){let r=null!=t?t:"___no_value__";return(null!=e?e:"___no_value__").toLowerCase()===r.toLowerCase()},e.assertType=function(e,t){return r(t)?typeof e==t:e instanceof t},e.isString=r,e.isFunc=function(e){return e instanceof Function||"function"==typeof e},e.objAssign=function(e,...t){if(null==e)throw new TypeError("Cannot convert undefined or null to object");let r=Object(e);return Object.assign?(t.forEach((e=>Object.assign(r,e))),r):(t.filter((e=>null!=e)).forEach((e=>{let t=e;Object.keys(t).filter((e=>Object.prototype.hasOwnProperty.call(t,e))).forEach((e=>r[e]=t[e]))})),r)}}(s||(s={}))},152:function(e,t,r){r.r(t),r.d(t,{CONFIG_ANY:function(){return f},CONFIG_VALUE:function(){return h},Config:function(){return c},Monad:function(){return a},Optional:function(){return i},ValueEmbedder:function(){return u}});var s=r(805),l=r(484),n=s.Lang.objAssign;class a{constructor(e){this._value=e}get value(){return this._value}map(e){e||(e=e=>e);let t=e(this.value);return new a(t)}flatMap(e){let t=this.map(e);for(;(null==t?void 0:t.value)instanceof a;)t=t.value;return t}}class i extends a{constructor(e){super(e)}get value(){return this._value instanceof a?this._value.flatMap().value:this._value}static fromNullable(e){return new i(e)}isAbsent(){return void 0===this.value||null==this.value}isPresent(e){let t=this.isAbsent();return!t&&e&&e.call(this,this),!t}ifPresentLazy(e=(()=>{})){return this.isPresent.call(this,e),this}orElse(e){return this.isPresent()?this:null==e?i.absent:this.flatMap((()=>e))}orElseLazy(e){return this.isPresent()?this:this.flatMap(e)}flatMap(e){let t=super.flatMap(e);return t instanceof i?t.flatMap():i.fromNullable(t.value)}getIf(...e){e=this.preprocessKeys(...e);let t=this;for(let r=0;r<e.length;r++){let s=this.keyVal(e[r]),l=this.arrayIndex(e[r]);if(""===s&&l>=0){if(t=this.getClass().fromNullable(t.value instanceof Array?t.value.length<l?null:t.value[l]:null),t.isAbsent())return t}else if(s&&l>=0){if(t.getIfPresent(s).isAbsent())return t;if(t=t.getIfPresent(s).value instanceof Array?this.getClass().fromNullable(t.getIfPresent(s).value[l]):this.getClass().absent,t.isAbsent())return t}else{if(t=t.getIfPresent(s),t.isAbsent())return t;l>-1&&(t=this.getClass().fromNullable(t.value[l]))}}return t}match(e){return!this.isAbsent()&&e(this.value)}get(e=i.absent){return this.isAbsent()?this.getClass().fromNullable(e).flatMap():this.getClass().fromNullable(this.value).flatMap()}toJson(){return JSON.stringify(this.value)}getClass(){return i}arrayIndex(e){let t=e.indexOf("["),r=e.indexOf("]");return t>=0&&r>0&&t<r?parseInt(e.substring(t+1,r)):-1}keyVal(e){let t=e.indexOf("[");return t>=0?e.substring(0,t):e}getIfPresent(e){return this.isAbsent()?this.getClass().absent:this.getClass().fromNullable(this.value[e]).flatMap()}resolve(e){if(this.isAbsent())return i.absent;try{return i.fromNullable(e(this.value))}catch(e){return i.absent}}preprocessKeys(...e){return new l.Es2019Array(...e).flatMap((e=>new l.Es2019Array(...e.split(/]\s*\[/gi)).map((e=>(-1==(e=e.replace(/^\s+|\s+$/g,"")).indexOf("[")&&-1!=e.indexOf("]")&&(e="["+e),-1==e.indexOf("]")&&-1!=e.indexOf("[")&&(e+="]"),e)))))}}i.absent=i.fromNullable(null);class u extends i{constructor(e,t="value"){super(e),this.key=t}get value(){return this._value?this._value[this.key]:null}set value(e){this._value&&(this._value[this.key]=e)}orElse(e){let t={};return t[this.key]=e,this.isPresent()?this:new u(t,this.key)}orElseLazy(e){if(this.isPresent())return this;{let t={};return t[this.key]=e(),new u(t,this.key)}}getClass(){return u}static fromNullable(e,t="value"){return new u(e,t)}}u.absent=u.fromNullable(null);class o extends u{constructor(e,t,r){super(e,t),this.arrPos=null!=r?r:-1}get value(){return""==this.key&&this.arrPos>=0?this._value[this.arrPos]:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]:this._value[this.key]}set value(e){""==this.key&&this.arrPos>=0?this._value[this.arrPos]=e:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]=e:this._value[this.key]=e}}o.absent=o.fromNullable(null);const h="__END_POINT__",f="__ANY_POINT__";class c extends i{constructor(e,t){super(e),this.configDef=t}get shallowCopy(){return this.shallowCopy$()}shallowCopy$(){let e=new c({});return e.shallowMerge(this.value),e}get deepCopy(){return this.deepCopy$()}deepCopy$(){return new c(n({},this.value))}static fromNullable(e){return new c(e)}shallowMerge(e,t=!0,r=!1){for(let s in e.value)void 0!==s&&null!=s&&(!t&&s in this.value||(r?Array.isArray(e.getIf(s).value)?new l.Es2019Array(...e.getIf(s).value).forEach((e=>this.append(s).value=e)):this.append(s).value=e.getIf(s).value:this.assign(s).value=e.getIf(s).value))}append(...e){if(e.length<1)return;this.assertAccessPath(...e);let t=e[e.length-1],r=this.getIf(...e).isPresent();this.buildPath(...e);let s=this.arrayIndex(t);if(s>-1)throw Error("Append only possible on non array properties, use assign on indexed data");let l=this.getIf(...e).value;return Array.isArray(l)||(l=this.assign(...e).value=[l]),r&&l.push({}),s=l.length-1,new o(1==e.length?this.value:this.getIf.apply(this,e.slice(0,e.length-1)).value,t,s)}appendIf(e,...t){return e?this.append(...t):{value:null}}assign(...e){if(e.length<1)return;this.assertAccessPath(...e),this.buildPath(...e);let t=this.keyVal(e[e.length-1]),r=this.arrayIndex(e[e.length-1]);return new o(1==e.length?this.value:this.getIf.apply(this,e.slice(0,e.length-1)).value,t,r)}assignIf(e,...t){return e?this.assign(...t):{value:null}}getIf(...e){return this.assertAccessPath(...e),this.getClass().fromNullable(super.getIf.apply(this,e).value)}get(e){return this.getClass().fromNullable(super.get(e).value)}delete(e){return e in this.value&&delete this.value[e],this}toJson(){return JSON.stringify(this.value)}getClass(){return c}setVal(e){this._value=e}assertAccessPath(...e){var t,r,s,n,a,u,o,h,c;if(e=this.preprocessKeys(...e),!this.configDef)return;let v=i.fromNullable(Object.keys(this.configDef).map((e=>{let t={};return t[e]=this.configDef[e],t})));for(let p=0;p<e.length;p++){let y=this.keyVal(e[p]),g=this.arrayIndex(e[p]);if(v=this.isArray(g)?""!=y?Array.isArray(v.value)?i.fromNullable(null===(r=null===(t=new l.Es2019Array(...v.value).find((e=>{var t;return!(null===(t=null==e?void 0:e[y])||void 0===t||!t)})))||void 0===t?void 0:t[y])||void 0===r?void 0:r[g]):i.fromNullable(null!==(a=null===(n=null===(s=v.value)||void 0===s?void 0:s[y])||void 0===n?void 0:n[g])&&void 0!==a?a:null):Array.isArray(v.value)?i.fromNullable(null===(u=v.value)||void 0===u?void 0:u[g]):i.absent:Array.isArray(v.value)?i.fromNullable(null===(o=new l.Es2019Array(...v.value).find((e=>{var t;return!(null===(t=null==e?void 0:e[y])||void 0===t||!t)})))||void 0===o?void 0:o[y]):i.fromNullable(null!==(c=null===(h=v.value)||void 0===h?void 0:h[y])&&void 0!==c?c:null),!v.isPresent())throw Error("Access Path to config invalid");if(v.value==f)return}}buildPath(...e){e=this.preprocessKeys(...e);let t=this,r=this.getClass().fromNullable(null),s=-1,l=function(e,t){let r=[];r.length=t,r[t-1]={},e.push(...r)};for(let n=0;n<e.length;n++){let a=this.keyVal(e[n]),i=this.arrayIndex(e[n]);if(this.isArrayPos(a,i)){t.setVal(t.value instanceof Array?t.value:[]),l(t.value,i+1),s>=0&&(r.value[s]=t.value),r=t,s=i,t=this.getClass().fromNullable(t.value[i]);continue}let u=t.getIf(a);if(this.isNoArray(i))u.isAbsent()?u=this.getClass().fromNullable(t.value[a]={}):t=u;else{let e=u.value instanceof Array?u.value:[];l(e,i+1),t.value[a]=e,u=this.getClass().fromNullable(e[i])}r=t,s=i,t=u}return this}isNoArray(e){return-1==e}isArray(e){return!this.isNoArray(e)}isArrayPos(e,t){return""===e&&t>=0}}}},t={};function r(s){var l=t[s];if(void 0!==l)return l.exports;var n=t[s]={exports:{}};return e[s](n,n.exports,r),n.exports}r.d=function(e,t){for(var s in t)r.o(t,s)&&!r.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var s=r(152),l=exports;for(var n in s)l[n]=s[n];s.__esModule&&Object.defineProperty(l,"__esModule",{value:!0})}();
//# sourceMappingURL=Monad.js.map