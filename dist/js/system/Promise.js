System.register([],(function(t,e){return{execute:function(){t(function(){"use strict";var t={484:function(t,e,s){s.d(e,{Es2019Array:function(){return r}});class n extends Array{constructor(...t){super(...t),t._another?this._another=t._another:this._another=t,this.flatMap=t=>this._flatMap(t),this.flat=(t=1)=>this._flat(t)}map(t,e){const s=Array.prototype.map.call(this._another,t,e);return new r(...s)}concat(...t){const e=Array.prototype.concat.call(this._another,...t);return new r(...e)}reverse(){const t=Array.prototype.reverse.call(this._another);return new r(...t)}slice(t,e){const s=Array.prototype.slice.call(this._another,t,e);return new r(...s)}splice(t,e){const s=Array.prototype.splice.call(this._another,t,e);return new r(...s)}filter(t,e){const s=Array.prototype.filter.call(this._another,t,e);return new r(...s)}reduce(t,e){return Array.prototype.reduce.call(this._another,t,e)}_flat(t=1){return this._flatResolve(this._another,t)}_flatResolve(t,e=1){if(0==e)return t;let s=[];return t.forEach((t=>{t=Array.isArray(t)?t:[t];let n=this._flatResolve(t,e-1);s=s.concat(n)})),new r(...s)}_flatMap(t,e=!1){let s=this.map((e=>t(e)));return this._flatResolve(s)}}var r=function(...t){let e=new n(...t);return new Proxy(e,{get(t,e,s){return"symbol"==typeof e?t._another[e]:isNaN(parseInt(e))?t[e]:t._another[e]},set(t,e,s){return t[e]=s,t._another[e]=s,!0}})}},805:function(t,e,s){s.d(e,{Lang:function(){return n}});var n,r=s(152),l=s(484);!function(t){function e(t){let e=/\s/,s=(t=t.replace(/^\s\s*/,"")).length;for(;e.test(t.charAt(--s)););return t.slice(0,s+1)}function s(t){return!!arguments.length&&null!=t&&("string"==typeof t||t instanceof String)}t.saveResolve=function(t,e=null){try{let s=t();return r.Optional.fromNullable(null!=s?s:e)}catch(t){return r.Optional.absent}},t.saveResolveLazy=function(t,e=null){try{let s=t();return r.Optional.fromNullable(null!=s?s:e())}catch(t){return r.Optional.absent}},t.strToArray=function(t,s=/\./gi){let n=[];return t.split(s).forEach((t=>{n.push(e(t))})),n},t.trim=e,t.objToArray=function(t,e=0,s=[]){return"__undefined__"==(null!=t?t:"__undefined__")?null!=s?s:null:t instanceof Array&&!e&&!s?t:new l.Es2019Array(...s.concat(Array.prototype.slice.call(t,e)))},t.equalsIgnoreCase=function(t,e){let s=null!=e?e:"___no_value__";return(null!=t?t:"___no_value__").toLowerCase()===s.toLowerCase()},t.assertType=function(t,e){return s(e)?typeof t==e:t instanceof e},t.isString=s,t.isFunc=function(t){return t instanceof Function||"function"==typeof t},t.objAssign=function(t,...e){if(null==t)throw new TypeError("Cannot convert undefined or null to object");let s=Object(t);return Object.assign?(e.forEach((t=>Object.assign(s,t))),s):(e.filter((t=>null!=t)).forEach((t=>{let e=t;Object.keys(e).filter((t=>Object.prototype.hasOwnProperty.call(e,t))).forEach((t=>s[t]=e[t]))})),s)}}(n||(n={}))},152:function(t,e,s){s.d(e,{Optional:function(){return a}});var n=s(805),r=s(484);n.Lang.objAssign;class l{constructor(t){this._value=t}get value(){return this._value}map(t){t||(t=t=>t);let e=t(this.value);return new l(e)}flatMap(t){let e=this.map(t);for(;(null==e?void 0:e.value)instanceof l;)e=e.value;return e}}class a extends l{constructor(t){super(t)}get value(){return this._value instanceof l?this._value.flatMap().value:this._value}static fromNullable(t){return new a(t)}isAbsent(){return void 0===this.value||null==this.value}isPresent(t){let e=this.isAbsent();return!e&&t&&t.call(this,this),!e}ifPresentLazy(t=(()=>{})){return this.isPresent.call(this,t),this}orElse(t){return this.isPresent()?this:null==t?a.absent:this.flatMap((()=>t))}orElseLazy(t){return this.isPresent()?this:this.flatMap(t)}flatMap(t){let e=super.flatMap(t);return e instanceof a?e.flatMap():a.fromNullable(e.value)}getIf(...t){t=this.preprocessKeys(...t);let e=this;for(let s=0;s<t.length;s++){let n=this.keyVal(t[s]),r=this.arrayIndex(t[s]);if(""===n&&r>=0){if(e=this.getClass().fromNullable(e.value instanceof Array?e.value.length<r?null:e.value[r]:null),e.isAbsent())return e}else if(n&&r>=0){if(e.getIfPresent(n).isAbsent())return e;if(e=e.getIfPresent(n).value instanceof Array?this.getClass().fromNullable(e.getIfPresent(n).value[r]):this.getClass().absent,e.isAbsent())return e}else{if(e=e.getIfPresent(n),e.isAbsent())return e;r>-1&&(e=this.getClass().fromNullable(e.value[r]))}}return e}match(t){return!this.isAbsent()&&t(this.value)}get(t=a.absent){return this.isAbsent()?this.getClass().fromNullable(t).flatMap():this.getClass().fromNullable(this.value).flatMap()}toJson(){return JSON.stringify(this.value)}getClass(){return a}arrayIndex(t){let e=t.indexOf("["),s=t.indexOf("]");return e>=0&&s>0&&e<s?parseInt(t.substring(e+1,s)):-1}keyVal(t){let e=t.indexOf("[");return e>=0?t.substring(0,e):t}getIfPresent(t){return this.isAbsent()?this.getClass().absent:this.getClass().fromNullable(this.value[t]).flatMap()}resolve(t){if(this.isAbsent())return a.absent;try{return a.fromNullable(t(this.value))}catch(t){return a.absent}}preprocessKeys(...t){return new r.Es2019Array(...t).flatMap((t=>new r.Es2019Array(...t.split(/]\s*\[/gi)).map((t=>(-1==(t=t.replace(/^\s+|\s+$/g,"")).indexOf("[")&&-1!=t.indexOf("]")&&(t="["+t),-1==t.indexOf("]")&&-1!=t.indexOf("[")&&(t+="]"),t)))))}}a.absent=a.fromNullable(null);class i extends a{constructor(t,e="value"){super(t),this.key=e}get value(){return this._value?this._value[this.key]:null}set value(t){this._value&&(this._value[this.key]=t)}orElse(t){let e={};return e[this.key]=t,this.isPresent()?this:new i(e,this.key)}orElseLazy(t){if(this.isPresent())return this;{let e={};return e[this.key]=t(),new i(e,this.key)}}getClass(){return i}static fromNullable(t,e="value"){return new i(t,e)}}i.absent=i.fromNullable(null);class u extends i{constructor(t,e,s){super(t,e),this.arrPos=null!=s?s:-1}get value(){return""==this.key&&this.arrPos>=0?this._value[this.arrPos]:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]:this._value[this.key]}set value(t){""==this.key&&this.arrPos>=0?this._value[this.arrPos]=t:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]=t:this._value[this.key]=t}}u.absent=u.fromNullable(null)}},e={};function s(n){var r=e[n];if(void 0!==r)return r.exports;var l=e[n]={exports:{}};return t[n](l,l.exports,s),l.exports}s.d=function(t,e){for(var n in e)s.o(e,n)&&!s.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var n={};return function(){s.r(n),s.d(n,{CancellablePromise:function(){return i},Promise:function(){return a},PromiseStatus:function(){return t},interval:function(){return l},timeout:function(){return r}});var t,e=s(152);function r(t){let e=null;return new i(((s,n)=>{e=setTimeout((()=>s()),t)}),(()=>{e&&(clearTimeout(e),e=null)}))}function l(t){let e=null;return new i(((s,n)=>{e=setInterval((()=>{s()}),t)}),(()=>{e&&(clearInterval(e),e=null)}))}!function(t){t[t.PENDING=0]="PENDING",t[t.FULLFILLED=1]="FULLFILLED",t[t.REJECTED=2]="REJECTED"}(t||(t={}));class a{constructor(e){this.status=t.PENDING,this.allFuncs=[],this.value=e,this.value((t=>this.resolve(t)),(t=>this.reject(t)))}static all(...t){let e,s=0,n=new a(((t,s)=>{e=t})),r=()=>{s++,t.length==s&&e()};r.__last__=!0;for(let e=0;e<t.length;e++)t[e].finally(r);return n}static race(...t){let e,s,n=new a(((t,n)=>{e=t,s=n})),r=()=>(e&&e(),e=null,s=null,null);r.__last__=!0;let l=()=>(s&&s(),s=null,e=null,null);l.__last__=!0;for(let e=0;e<t.length;e++)t[e].then(r),t[e].catch(l);return n}static reject(t){return new a(((e,s)=>{t instanceof a?t.then((t=>{s(t)})):setTimeout((()=>{s(t)}),1)}))}static resolve(t){return new a(((e,s)=>{t instanceof a?t.then((t=>e(t))):setTimeout((()=>{e(t)}),1)}))}then(t,e){return this.allFuncs.push({then:t}),e&&this.allFuncs.push({catch:e}),this.spliceLastFuncs(),this}catch(t){return this.allFuncs.push({catch:t}),this.spliceLastFuncs(),this}finally(t){if(!this.__reason__)return this.allFuncs.push({finally:t}),this.spliceLastFuncs(),this;this.__reason__.finally(t)}resolve(s){for(;this.allFuncs.length&&this.allFuncs[0].then;){let t=this.allFuncs.shift(),n=e.Optional.fromNullable(t.then(s));if(!n.isPresent())break;if(n=n.flatMap(),(s=n.value)instanceof a)return void this.transferIntoNewPromise(s)}this.appyFinally(),this.status=t.FULLFILLED}reject(s){for(;this.allFuncs.length&&!this.allFuncs[0].finally;){let n=this.allFuncs.shift();if(n.catch){let r=e.Optional.fromNullable(n.catch(s));if(r.isPresent()){if(r=r.flatMap(),(s=r.value)instanceof a)return void this.transferIntoNewPromise(s);this.status=t.REJECTED;break}break}}this.status=t.REJECTED,this.appyFinally()}appyFinally(){for(;this.allFuncs.length;){let t=this.allFuncs.shift();t.finally&&t.finally()}}spliceLastFuncs(){let t=[],e=[];for(let s=0;s<this.allFuncs.length;s++)for(let n in this.allFuncs[s])this.allFuncs[s][n].__last__?t.push(this.allFuncs[s]):e.push(this.allFuncs[s]);this.allFuncs=e.concat(t)}transferIntoNewPromise(t){for(let e=0;e<this.allFuncs.length;e++)for(let s in this.allFuncs[e])t[s](this.allFuncs[e][s])}}class i extends a{constructor(t,e){super(t),this.cancellator=()=>{},this.cancellator=e}cancel(){this.status=t.REJECTED,this.appyFinally(),this.allFuncs=[]}then(t,e){return super.then(t,e)}catch(t){return super.catch(t)}finally(t){return super.finally(t)}}}(),n}())}}}));
//# sourceMappingURL=Promise.js.map