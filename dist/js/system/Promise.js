System.register([],(function(t,e){return{execute:function(){t(function(){"use strict";var t={484:function(t,e,s){s.d(e,{Es2019Array:function(){return n}});class r extends Array{constructor(...t){super(...t),t._another?this._another=t._another:this._another=t,this.flatMap=t=>this._flatMap(t),this.flat=(t=1)=>this._flat(t)}map(t,e){return new l(...Array.prototype.map.call(this._another,t,e))}concat(...t){return new l(...Array.prototype.concat.call(this._another,...t))}reverse(){return new l(...Array.prototype.reverse.call(this._another))}slice(t,e){return new l(...Array.prototype.slice.call(this._another,t,e))}splice(t,e){return new l(...Array.prototype.splice.call(this._another,t,e))}filter(t,e){return new l(...Array.prototype.filter.call(this._another,t,e))}reduce(t,e){return Array.prototype.reduce.call(this._another,t,e)}_flat(t=1){return this._flatResolve(this._another,t)}_flatResolve(t,e=1){if(0==e)return t;let s=[];return t.forEach((t=>{t=Array.isArray(t)?t:[t];let r=this._flatResolve(t,e-1);s=s.concat(r)})),new n(...s)}_flatMap(t){let e=this.map((e=>t(e)));return this._flatResolve(e)}}function l(...t){let e=new r(...t);return new Proxy(e,{get(t,e,s){return"symbol"==typeof e?t._another[e]:isNaN(parseInt(e))?t[e]:t._another[e]},set(t,e,s){return t[e]=s,t._another[e]=s,!0}})}var n=Array.prototype.flatMap?function(...t){return(null==t?void 0:t.flatMap)?t:l(...t)}:l},152:function(t,e,s){s.d(e,{Optional:function(){return n}});var r=s(484);class l{constructor(t){this._value=t}get value(){return this._value}map(t){t||(t=t=>t);let e=t(this.value);return new l(e)}flatMap(t){let e=this.map(t);for(;(null==e?void 0:e.value)instanceof l;)e=e.value;return e}}class n extends l{constructor(t){super(t)}get value(){return this._value instanceof l?this._value.flatMap().value:this._value}static fromNullable(t){return new n(t)}isAbsent(){return void 0===this.value||null==this.value}isPresent(t){let e=this.isAbsent();return!e&&t&&t.call(this,this),!e}ifPresentLazy(t=(()=>{})){return this.isPresent.call(this,t),this}orElse(t){return this.isPresent()?this:null==t?n.absent:this.flatMap((()=>t))}orElseLazy(t){return this.isPresent()?this:this.flatMap(t)}flatMap(t){let e=super.flatMap(t);return e instanceof n?e.flatMap():n.fromNullable(e.value)}getIf(...t){t=this.preprocessKeys(...t);let e=this;for(let s=0;s<t.length;s++){let r=this.keyVal(t[s]),l=this.arrayIndex(t[s]);if(""===r&&l>=0){if(e=this.getClass().fromNullable(e.value instanceof Array?e.value.length<l?null:e.value[l]:null),e.isAbsent())return e}else if(r&&l>=0){if(e.getIfPresent(r).isAbsent())return e;if(e=e.getIfPresent(r).value instanceof Array?this.getClass().fromNullable(e.getIfPresent(r).value[l]):this.getClass().absent,e.isAbsent())return e}else{if(e=e.getIfPresent(r),e.isAbsent())return e;l>-1&&(e=this.getClass().fromNullable(e.value[l]))}}return e}match(t){return!this.isAbsent()&&t(this.value)}get(t=n.absent){return this.isAbsent()?this.getClass().fromNullable(t).flatMap():this.getClass().fromNullable(this.value).flatMap()}toJson(){return JSON.stringify(this.value)}getClass(){return n}arrayIndex(t){let e=t.indexOf("["),s=t.indexOf("]");return e>=0&&s>0&&e<s?parseInt(t.substring(e+1,s)):-1}keyVal(t){let e=t.indexOf("[");return e>=0?t.substring(0,e):t}getIfPresent(t){return this.isAbsent()?this.getClass().absent:this.getClass().fromNullable(this.value[t]).flatMap()}resolve(t){if(this.isAbsent())return n.absent;try{return n.fromNullable(t(this.value))}catch(t){return n.absent}}preprocessKeys(...t){return new r.Es2019Array(...t).flatMap((t=>new r.Es2019Array(...t.split(/]\s*\[/gi)).map((t=>(-1==(t=t.replace(/^\s+|\s+$/g,"")).indexOf("[")&&-1!=t.indexOf("]")&&(t="["+t),-1==t.indexOf("]")&&-1!=t.indexOf("[")&&(t+="]"),t)))))}}n.absent=n.fromNullable(null);class a extends n{constructor(t,e="value"){super(t),this.key=e}get value(){return this._value?this._value[this.key]:null}set value(t){this._value&&(this._value[this.key]=t)}orElse(t){let e={};return e[this.key]=t,this.isPresent()?this:new a(e,this.key)}orElseLazy(t){if(this.isPresent())return this;{let e={};return e[this.key]=t(),new a(e,this.key)}}getClass(){return a}static fromNullable(t,e="value"){return new a(t,e)}}a.absent=a.fromNullable(null)}},e={};function s(r){var l=e[r];if(void 0!==l)return l.exports;var n=e[r]={exports:{}};return t[r](n,n.exports,s),n.exports}s.d=function(t,e){for(var r in e)s.o(e,r)&&!s.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};return function(){s.r(r),s.d(r,{CancellablePromise:function(){return i},Promise:function(){return a},PromiseStatus:function(){return t},interval:function(){return n},timeout:function(){return l}});var t,e=s(152);function l(t){let e=null;return new i(((s,r)=>{e=setTimeout((()=>s()),t)}),(()=>{e&&(clearTimeout(e),e=null)}))}function n(t){let e=null;return new i(((s,r)=>{e=setInterval((()=>{s()}),t)}),(()=>{e&&(clearInterval(e),e=null)}))}!function(t){t[t.PENDING=0]="PENDING",t[t.FULLFILLED=1]="FULLFILLED",t[t.REJECTED=2]="REJECTED"}(t||(t={}));class a{constructor(e){this.status=t.PENDING,this.allFuncs=[],this.value=e,this.value((t=>this.resolve(t)),(t=>this.reject(t)))}static all(...t){let e,s=0,r=new a(((t,s)=>{e=t})),l=()=>{s++,t.length==s&&e()};l.__last__=!0;for(let e=0;e<t.length;e++)t[e].finally(l);return r}static race(...t){let e,s,r=new a(((t,r)=>{e=t,s=r})),l=()=>(e&&e(),e=null,s=null,null);l.__last__=!0;let n=()=>(s&&s(),s=null,e=null,null);n.__last__=!0;for(let e=0;e<t.length;e++)t[e].then(l),t[e].catch(n);return r}static reject(t){return new a(((e,s)=>{t instanceof a?t.then((t=>{s(t)})):setTimeout((()=>{s(t)}),1)}))}static resolve(t){return new a(((e,s)=>{t instanceof a?t.then((t=>e(t))):setTimeout((()=>{e(t)}),1)}))}then(t,e){return this.allFuncs.push({then:t}),e&&this.allFuncs.push({catch:e}),this.spliceLastFuncs(),this}catch(t){return this.allFuncs.push({catch:t}),this.spliceLastFuncs(),this}finally(t){if(!this.__reason__)return this.allFuncs.push({finally:t}),this.spliceLastFuncs(),this;this.__reason__.finally(t)}resolve(s){for(;this.allFuncs.length&&this.allFuncs[0].then;){let t=this.allFuncs.shift(),r=e.Optional.fromNullable(t.then(s));if(!r.isPresent())break;if(r=r.flatMap(),(s=r.value)instanceof a)return void this.transferIntoNewPromise(s)}this.appyFinally(),this.status=t.FULLFILLED}reject(s){for(;this.allFuncs.length&&!this.allFuncs[0].finally;){let r=this.allFuncs.shift();if(r.catch){let l=e.Optional.fromNullable(r.catch(s));if(l.isPresent()){if(l=l.flatMap(),(s=l.value)instanceof a)return void this.transferIntoNewPromise(s);this.status=t.REJECTED;break}break}}this.status=t.REJECTED,this.appyFinally()}appyFinally(){for(;this.allFuncs.length;){let t=this.allFuncs.shift();t.finally&&t.finally()}}spliceLastFuncs(){let t=[],e=[];for(let s=0;s<this.allFuncs.length;s++)for(let r in this.allFuncs[s])this.allFuncs[s][r].__last__?t.push(this.allFuncs[s]):e.push(this.allFuncs[s]);this.allFuncs=e.concat(t)}transferIntoNewPromise(t){for(let e=0;e<this.allFuncs.length;e++)for(let s in this.allFuncs[e])t[s](this.allFuncs[e][s])}}class i extends a{constructor(t,e){super(t),this.cancellator=()=>{},this.cancellator=e}cancel(){this.status=t.REJECTED,this.appyFinally(),this.allFuncs=[]}then(t,e){return super.then(t,e)}catch(t){return super.catch(t)}finally(t){return super.finally(t)}}}(),r}())}}}));
//# sourceMappingURL=Promise.js.map