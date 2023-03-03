!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var s=e();for(var n in s)("object"==typeof exports?exports:t)[n]=s[n]}}(this,(function(){return function(){"use strict";var t={484:function(t,e,s){s.d(e,{Es2019Array:function(){return n}});class n extends Array{constructor(...t){super(...t),Array.prototype.flatMap||(this.flatMap=t=>this._flatMap(t)),Array.prototype.flat||(this.flat=(t=1)=>this._flat(t))}map(t,e){return new n(...super.map(t))}concat(...t){return new n(...super.concat(...t))}reverse(){return new n(...super.reverse())}slice(t,e){return new n(...super.slice(t,e))}splice(t,e){return new n(...super.splice(t,e))}filter(t,e){return new n(...super.filter(t,e))}_flat(t=1){return this._flatResolve(this,t)}_flatResolve(t,e=1){if(0==e)return t;let s=[];return t.forEach((t=>{t=Array.isArray(t)?t:[t];let n=this._flatResolve(t,e-1);s=s.concat(n)})),new n(...s)}_flatMap(t,e=!1){let s=this.map((e=>t(e)));return this._flatResolve(s)}}},805:function(t,e,s){s.d(e,{Lang:function(){return n}});var n,r=s(152);!function(t){function e(t){let e=/\s/,s=(t=t.replace(/^\s\s*/,"")).length;for(;e.test(t.charAt(--s)););return t.slice(0,s+1)}function s(t){return!!arguments.length&&null!=t&&("string"==typeof t||t instanceof String)}t.saveResolve=function(t,e=null){try{let s=t();return r.Optional.fromNullable(null!=s?s:e)}catch(t){return r.Optional.absent}},t.saveResolveLazy=function(t,e=null){try{let s=t();return r.Optional.fromNullable(null!=s?s:e())}catch(t){return r.Optional.absent}},t.strToArray=function(t,s=/\./gi){let n=[];return t.split(s).forEach((t=>{n.push(e(t))})),n},t.trim=e,t.objToArray=function(t,e=0,s=[]){return"__undefined__"==(null!=t?t:"__undefined__")?null!=s?s:null:t instanceof Array&&!e&&!s?t:s.concat(Array.prototype.slice.call(t,e))},t.equalsIgnoreCase=function(t,e){let s=null!=e?e:"___no_value__";return(null!=t?t:"___no_value__").toLowerCase()===s.toLowerCase()},t.assertType=function(t,e){return s(e)?typeof t==e:t instanceof e},t.isString=s,t.isFunc=function(t){return t instanceof Function||"function"==typeof t},t.objAssign=function(t,...e){if(null==t)throw new TypeError("Cannot convert undefined or null to object");let s=Object(t);return Object.assign?(e.forEach((t=>Object.assign(s,t))),s):(e.filter((t=>null!=t)).forEach((t=>{let e=t;Object.keys(e).filter((t=>Object.prototype.hasOwnProperty.call(e,t))).forEach((t=>s[t]=e[t]))})),s)}}(n||(n={}))},152:function(t,e,s){s.d(e,{Optional:function(){return i}});var n=s(805),r=s(484);n.Lang.objAssign;class l{constructor(t){this._value=t}get value(){return this._value}map(t){t||(t=t=>t);let e=t(this.value);return new l(e)}flatMap(t){let e=this.map(t);for(;(null==e?void 0:e.value)instanceof l;)e=e.value;return e}}class i extends l{constructor(t){super(t)}get value(){return this._value instanceof l?this._value.flatMap().value:this._value}static fromNullable(t){return new i(t)}isAbsent(){return void 0===this.value||null==this.value}isPresent(t){let e=this.isAbsent();return!e&&t&&t.call(this,this),!e}ifPresentLazy(t=(()=>{})){return this.isPresent.call(this,t),this}orElse(t){return this.isPresent()?this:null==t?i.absent:this.flatMap((()=>t))}orElseLazy(t){return this.isPresent()?this:this.flatMap(t)}flatMap(t){let e=super.flatMap(t);return e instanceof i?e.flatMap():i.fromNullable(e.value)}getIf(...t){t=this.preprocessKeys(...t);let e=this;for(let s=0;s<t.length;s++){let n=this.keyVal(t[s]),r=this.arrayIndex(t[s]);if(""===n&&r>=0){if(e=this.getClass().fromNullable(e.value instanceof Array?e.value.length<r?null:e.value[r]:null),e.isAbsent())return e}else if(n&&r>=0){if(e.getIfPresent(n).isAbsent())return e;if(e=e.getIfPresent(n).value instanceof Array?this.getClass().fromNullable(e.getIfPresent(n).value[r]):this.getClass().absent,e.isAbsent())return e}else{if(e=e.getIfPresent(n),e.isAbsent())return e;r>-1&&(e=this.getClass().fromNullable(e.value[r]))}}return e}match(t){return!this.isAbsent()&&t(this.value)}get(t=i.absent){return this.isAbsent()?this.getClass().fromNullable(t).flatMap():this.getClass().fromNullable(this.value).flatMap()}toJson(){return JSON.stringify(this.value)}getClass(){return i}arrayIndex(t){let e=t.indexOf("["),s=t.indexOf("]");return e>=0&&s>0&&e<s?parseInt(t.substring(e+1,s)):-1}keyVal(t){let e=t.indexOf("[");return e>=0?t.substring(0,e):t}getIfPresent(t){return this.isAbsent()?this.getClass().absent:this.getClass().fromNullable(this.value[t]).flatMap()}resolve(t){if(this.isAbsent())return i.absent;try{return i.fromNullable(t(this.value))}catch(t){return i.absent}}preprocessKeys(...t){return new r.Es2019Array(...t).flatMap((t=>new r.Es2019Array(...t.split(/]\s*\[/gi)).map((t=>(-1==(t=t.replace(/^\s+|\s+$/g,"")).indexOf("[")&&-1!=t.indexOf("]")&&(t="["+t),-1==t.indexOf("]")&&-1!=t.indexOf("[")&&(t+="]"),t)))))}}i.absent=i.fromNullable(null);class a extends i{constructor(t,e="value"){super(t),this.key=e}get value(){return this._value?this._value[this.key]:null}set value(t){this._value&&(this._value[this.key]=t)}orElse(t){let e={};return e[this.key]=t,this.isPresent()?this:new a(e,this.key)}orElseLazy(t){if(this.isPresent())return this;{let e={};return e[this.key]=t(),new a(e,this.key)}}getClass(){return a}static fromNullable(t,e="value"){return new a(t,e)}}a.absent=a.fromNullable(null);class u extends a{constructor(t,e,s){super(t,e),this.arrPos=null!=s?s:-1}get value(){return""==this.key&&this.arrPos>=0?this._value[this.arrPos]:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]:this._value[this.key]}set value(t){""==this.key&&this.arrPos>=0?this._value[this.arrPos]=t:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]=t:this._value[this.key]=t}}u.absent=u.fromNullable(null)},376:function(t,e,s){s.d(e,{Promise:function(){return l}});var n,r=s(152);!function(t){t[t.PENDING=0]="PENDING",t[t.FULLFILLED=1]="FULLFILLED",t[t.REJECTED=2]="REJECTED"}(n||(n={}));class l{constructor(t){this.status=n.PENDING,this.allFuncs=[],this.value=t,this.value((t=>this.resolve(t)),(t=>this.reject(t)))}static all(...t){let e,s=0,n=new l(((t,s)=>{e=t})),r=()=>{s++,t.length==s&&e()};r.__last__=!0;for(let e=0;e<t.length;e++)t[e].finally(r);return n}static race(...t){let e,s,n=new l(((t,n)=>{e=t,s=n})),r=()=>(e&&e(),e=null,s=null,null);r.__last__=!0;let i=()=>(s&&s(),s=null,e=null,null);i.__last__=!0;for(let e=0;e<t.length;e++)t[e].then(r),t[e].catch(i);return n}static reject(t){return new l(((e,s)=>{t instanceof l?t.then((t=>{s(t)})):setTimeout((()=>{s(t)}),1)}))}static resolve(t){return new l(((e,s)=>{t instanceof l?t.then((t=>e(t))):setTimeout((()=>{e(t)}),1)}))}then(t,e){return this.allFuncs.push({then:t}),e&&this.allFuncs.push({catch:e}),this.spliceLastFuncs(),this}catch(t){return this.allFuncs.push({catch:t}),this.spliceLastFuncs(),this}finally(t){if(!this.__reason__)return this.allFuncs.push({finally:t}),this.spliceLastFuncs(),this;this.__reason__.finally(t)}resolve(t){for(;this.allFuncs.length&&this.allFuncs[0].then;){let e=this.allFuncs.shift(),s=r.Optional.fromNullable(e.then(t));if(!s.isPresent())break;if(s=s.flatMap(),(t=s.value)instanceof l)return void this.transferIntoNewPromise(t)}this.appyFinally(),this.status=n.FULLFILLED}reject(t){for(;this.allFuncs.length&&!this.allFuncs[0].finally;){let e=this.allFuncs.shift();if(e.catch){let s=r.Optional.fromNullable(e.catch(t));if(s.isPresent()){if(s=s.flatMap(),(t=s.value)instanceof l)return void this.transferIntoNewPromise(t);this.status=n.REJECTED;break}break}}this.status=n.REJECTED,this.appyFinally()}appyFinally(){for(;this.allFuncs.length;){let t=this.allFuncs.shift();t.finally&&t.finally()}}spliceLastFuncs(){let t=[],e=[];for(let s=0;s<this.allFuncs.length;s++)for(let n in this.allFuncs[s])this.allFuncs[s][n].__last__?t.push(this.allFuncs[s]):e.push(this.allFuncs[s]);this.allFuncs=e.concat(t)}transferIntoNewPromise(t){for(let e=0;e<this.allFuncs.length;e++)for(let s in this.allFuncs[e])t[s](this.allFuncs[e][s])}}}},e={};function s(n){var r=e[n];if(void 0!==r)return r.exports;var l=e[n]={exports:{}};return t[n](l,l.exports,s),l.exports}s.d=function(t,e){for(var n in e)s.o(e,n)&&!s.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var n={};return function(){s.r(n);var t=s(376);Promise||t.Promise}(),n}()}));
//# sourceMappingURL=PromiseShim.js.map