System.register([],(function(e,t){return{execute:function(){e(function(){"use strict";var e={484:function(e,t,r){r.d(t,{Es2019Array:function(){return a}});class s extends Array{constructor(...e){super(...e),e._another?this._another=e._another:this._another=e,this.flatMap=e=>this._flatMap(e),this.flat=(e=1)=>this._flat(e)}map(e,t){return new n(...Array.prototype.map.call(this._another,e,t))}concat(...e){return new n(...Array.prototype.concat.call(this._another,...e))}reverse(){return new n(...Array.prototype.reverse.call(this._another))}slice(e,t){return new n(...Array.prototype.slice.call(this._another,e,t))}splice(e,t){return new n(...Array.prototype.splice.call(this._another,e,t))}filter(e,t){return new n(...Array.prototype.filter.call(this._another,e,t))}reduce(e,t){return Array.prototype.reduce.call(this._another,e,t)}_flat(e=1){return this._flatResolve(this._another,e)}_flatResolve(e,t=1){if(0==t)return e;let r=[];return e.forEach((e=>{e=Array.isArray(e)?e:[e];let s=this._flatResolve(e,t-1);r=r.concat(s)})),new a(...r)}_flatMap(e){let t=this.map((t=>e(t)));return this._flatResolve(t)}}function n(...e){let t=new s(...e);return new Proxy(t,{get(e,t,r){return"symbol"==typeof t?e._another[t]:isNaN(parseInt(t))?e[t]:e._another[t]},set(e,t,r){return e[t]=r,e._another[t]=r,!0}})}var a=n}},t={};function r(s){var n=t[s];if(void 0!==n)return n.exports;var a=t[s]={exports:{}};return e[s](a,a.exports,r),a.exports}r.d=function(e,t){for(var s in t)r.o(t,s)&&!r.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var s={};return function(){r.r(s),r.d(s,{Monad:function(){return t},Optional:function(){return n},ValueEmbedder:function(){return a}});var e=r(484);class t{constructor(e){this._value=e}get value(){return this._value}map(e){e||(e=e=>e);let r=e(this.value);return new t(r)}flatMap(e){let r=this.map(e);for(;(null==r?void 0:r.value)instanceof t;)r=r.value;return r}}class n extends t{constructor(e){super(e)}get value(){return this._value instanceof t?this._value.flatMap().value:this._value}static fromNullable(e){return new n(e)}isAbsent(){return void 0===this.value||null==this.value}isPresent(e){let t=this.isAbsent();return!t&&e&&e.call(this,this),!t}ifPresentLazy(e=(()=>{})){return this.isPresent.call(this,e),this}orElse(e){return this.isPresent()?this:null==e?n.absent:this.flatMap((()=>e))}orElseLazy(e){return this.isPresent()?this:this.flatMap(e)}flatMap(e){let t=super.flatMap(e);return t instanceof n?t.flatMap():n.fromNullable(t.value)}getIf(...e){e=this.preprocessKeys(...e);let t=this;for(let r=0;r<e.length;r++){let s=this.keyVal(e[r]),n=this.arrayIndex(e[r]);if(""===s&&n>=0){if(t=this.getClass().fromNullable(t.value instanceof Array?t.value.length<n?null:t.value[n]:null),t.isAbsent())return t}else if(s&&n>=0){if(t.getIfPresent(s).isAbsent())return t;if(t=t.getIfPresent(s).value instanceof Array?this.getClass().fromNullable(t.getIfPresent(s).value[n]):this.getClass().absent,t.isAbsent())return t}else{if(t=t.getIfPresent(s),t.isAbsent())return t;n>-1&&(t=this.getClass().fromNullable(t.value[n]))}}return t}match(e){return!this.isAbsent()&&e(this.value)}get(e=n.absent){return this.isAbsent()?this.getClass().fromNullable(e).flatMap():this.getClass().fromNullable(this.value).flatMap()}toJson(){return JSON.stringify(this.value)}getClass(){return n}arrayIndex(e){let t=e.indexOf("["),r=e.indexOf("]");return t>=0&&r>0&&t<r?parseInt(e.substring(t+1,r)):-1}keyVal(e){let t=e.indexOf("[");return t>=0?e.substring(0,t):e}getIfPresent(e){return this.isAbsent()?this.getClass().absent:this.getClass().fromNullable(this.value[e]).flatMap()}resolve(e){if(this.isAbsent())return n.absent;try{return n.fromNullable(e(this.value))}catch(e){return n.absent}}preprocessKeys(...t){return new e.Es2019Array(...t).flatMap((t=>new e.Es2019Array(...t.split(/]\s*\[/gi)).map((e=>(-1==(e=e.replace(/^\s+|\s+$/g,"")).indexOf("[")&&-1!=e.indexOf("]")&&(e="["+e),-1==e.indexOf("]")&&-1!=e.indexOf("[")&&(e+="]"),e)))))}}n.absent=n.fromNullable(null);class a extends n{constructor(e,t="value"){super(e),this.key=t}get value(){return this._value?this._value[this.key]:null}set value(e){this._value&&(this._value[this.key]=e)}orElse(e){let t={};return t[this.key]=e,this.isPresent()?this:new a(t,this.key)}orElseLazy(e){if(this.isPresent())return this;{let t={};return t[this.key]=e(),new a(t,this.key)}}getClass(){return a}static fromNullable(e,t="value"){return new a(e,t)}}a.absent=a.fromNullable(null)}(),s}())}}}));
//# sourceMappingURL=Monad.js.map