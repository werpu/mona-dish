define((function(){return function(){"use strict";var t={d:function(r,e){for(var n in e)t.o(e,n)&&!t.o(r,n)&&Object.defineProperty(r,n,{enumerable:!0,get:e[n]})},o:function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},r:function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},r={};t.r(r),t.d(r,{Es2019Array:function(){return a},_Es2019Array:function(){return n}});class e extends Array{constructor(...t){super(...t),t._another?this._another=t._another:this._another=t,this.flatMap=t=>this._flatMap(t),this.flat=(t=1)=>this._flat(t)}map(t,r){return new n(...Array.prototype.map.call(this._another,t,r))}concat(...t){return new n(...Array.prototype.concat.call(this._another,...t))}reverse(){return new n(...Array.prototype.reverse.call(this._another))}slice(t,r){return new n(...Array.prototype.slice.call(this._another,t,r))}splice(t,r){return new n(...Array.prototype.splice.call(this._another,t,r))}filter(t,r){return new n(...Array.prototype.filter.call(this._another,t,r))}reduce(t,r){return Array.prototype.reduce.call(this._another,t,r)}_flat(t=1){return this._flatResolve(this._another,t)}_flatResolve(t,r=1){if(0==r)return t;let e=[];return t.forEach((t=>{t=Array.isArray(t)?t:[t];let n=this._flatResolve(t,r-1);e=e.concat(n)})),new a(...e)}_flatMap(t){let r=this.map((r=>t(r)));return this._flatResolve(r)}}function n(...t){let r=new e(...t);return new Proxy(r,{get(t,r,e){return"symbol"==typeof r?t._another[r]:isNaN(parseInt(r))?t[r]:t._another[r]},set(t,r,e){return t[r]=e,t._another[r]=e,!0}})}var a=Array.prototype.flatMap?function(...t){return(null==t?void 0:t.flatMap)?t:n(...t)}:n;return r}()}));
//# sourceMappingURL=Es2019Array.js.map