define((function(){return function(){"use strict";var t={484:function(t,e,s){s.d(e,{Es2019Array:function(){return r}});class r extends Array{constructor(...t){if(super(...t),!Array.prototype.flatMap){let t=r.prototype.flatMap_;this.flatMap=t}}flatMap_(t,e=!1){let s=[],i=e=>{let r=t(e);if(Array.isArray(r)){if(1==r.length)return void s.push(r[1]);r.length>1&&r.forEach((t=>i(t)))}else s.push(e)};return this.forEach((t=>i(t))),new r(...s)}concat(...t){return new r(...super.concat(...t))}reverse(){return new r(...super.reverse())}slice(t,e){return new r(...super.slice(t,e))}splice(t,e){return new r(...super.splice(t,e))}filter(t,e){return new r(...super.filter(t,e))}}},805:function(t,e,s){s.d(e,{Lang:function(){return r}});var r,i=s(152);!function(t){function e(t){let e=/\s/,s=(t=t.replace(/^\s\s*/,"")).length;for(;e.test(t.charAt(--s)););return t.slice(0,s+1)}function s(t){return!!arguments.length&&null!=t&&("string"==typeof t||t instanceof String)}t.saveResolve=function(t,e=null){try{let s=t();return i.Optional.fromNullable(null!=s?s:e)}catch(t){return i.Optional.absent}},t.saveResolveLazy=function(t,e=null){try{let s=t();return i.Optional.fromNullable(null!=s?s:e())}catch(t){return i.Optional.absent}},t.strToArray=function(t,s=/\./gi){let r=[];return t.split(s).forEach((t=>{r.push(e(t))})),r},t.trim=e,t.objToArray=function(t,e=0,s=[]){return"__undefined__"==(null!=t?t:"__undefined__")?null!=s?s:null:t instanceof Array&&!e&&!s?t:s.concat(Array.prototype.slice.call(t,e))},t.equalsIgnoreCase=function(t,e){let s=null!=e?e:"___no_value__";return(null!=t?t:"___no_value__").toLowerCase()===s.toLowerCase()},t.assertType=function(t,e){return s(e)?typeof t==e:t instanceof e},t.isString=s,t.isFunc=function(t){return t instanceof Function||"function"==typeof t},t.objAssign=function(t,...e){if(null==t)throw new TypeError("Cannot convert undefined or null to object");let s=Object(t);return Object.assign?(e.forEach((t=>Object.assign(s,t))),s):(e.filter((t=>null!=t)).forEach((t=>{let e=t;Object.keys(e).filter((t=>Object.prototype.hasOwnProperty.call(e,t))).forEach((t=>s[t]=e[t]))})),s)}}(r||(r={}))},152:function(t,e,s){s.d(e,{Optional:function(){return a}});var r=s(805),i=s(484);r.Lang.objAssign;class n{constructor(t){this._value=t}get value(){return this._value}map(t){t||(t=t=>t);let e=t(this.value);return new n(e)}flatMap(t){let e=this.map(t);for(;(null==e?void 0:e.value)instanceof n;)e=e.value;return e}}class a extends n{constructor(t){super(t)}get value(){return this._value instanceof n?this._value.flatMap().value:this._value}static fromNullable(t){return new a(t)}isAbsent(){return void 0===this.value||null==this.value}isPresent(t){let e=this.isAbsent();return!e&&t&&t.call(this,this),!e}ifPresentLazy(t=(()=>{})){return this.isPresent.call(this,t),this}orElse(t){return this.isPresent()?this:null==t?a.absent:this.flatMap((()=>t))}orElseLazy(t){return this.isPresent()?this:this.flatMap(t)}flatMap(t){let e=super.flatMap(t);return e instanceof a?e.flatMap():a.fromNullable(e.value)}getIf(...t){t=this.preprocessKeys(...t);let e=this;for(let s=0;s<t.length;s++){let r=this.keyVal(t[s]),i=this.arrayIndex(t[s]);if(""===r&&i>=0){if(e=this.getClass().fromNullable(e.value instanceof Array?e.value.length<i?null:e.value[i]:null),e.isAbsent())return e}else if(r&&i>=0){if(e.getIfPresent(r).isAbsent())return e;if(e=e.getIfPresent(r).value instanceof Array?this.getClass().fromNullable(e.getIfPresent(r).value[i]):this.getClass().absent,e.isAbsent())return e}else{if(e=e.getIfPresent(r),e.isAbsent())return e;i>-1&&(e=this.getClass().fromNullable(e.value[i]))}}return e}match(t){return!this.isAbsent()&&t(this.value)}get(t=a.absent){return this.isAbsent()?this.getClass().fromNullable(t).flatMap():this.getClass().fromNullable(this.value).flatMap()}toJson(){return JSON.stringify(this.value)}getClass(){return a}arrayIndex(t){let e=t.indexOf("["),s=t.indexOf("]");return e>=0&&s>0&&e<s?parseInt(t.substring(e+1,s)):-1}keyVal(t){let e=t.indexOf("[");return e>=0?t.substring(0,e):t}getIfPresent(t){return this.isAbsent()?this.getClass().absent:this.getClass().fromNullable(this.value[t]).flatMap()}resolve(t){if(this.isAbsent())return a.absent;try{return a.fromNullable(t(this.value))}catch(t){return a.absent}}preprocessKeys(...t){return new i.Es2019Array(...t).flatMap((t=>new i.Es2019Array(...t.split(/]\s*\[/gi)).map((t=>(-1==(t=t.replace(/^\s+|\s+$/g,"")).indexOf("[")&&-1!=t.indexOf("]")&&(t="["+t),-1==t.indexOf("]")&&-1!=t.indexOf("[")&&(t+="]"),t)))))}}a.absent=a.fromNullable(null);class l extends a{constructor(t,e="value"){super(t),this.key=e}get value(){return this._value?this._value[this.key]:null}set value(t){this._value&&(this._value[this.key]=t)}orElse(t){let e={};return e[this.key]=t,this.isPresent()?this:new l(e,this.key)}orElseLazy(t){if(this.isPresent())return this;{let e={};return e[this.key]=t(),new l(e,this.key)}}getClass(){return l}static fromNullable(t,e="value"){return new l(t,e)}}l.absent=l.fromNullable(null);class u extends l{constructor(t,e,s){super(t,e),this.arrPos=null!=s?s:-1}get value(){return""==this.key&&this.arrPos>=0?this._value[this.arrPos]:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]:this._value[this.key]}set value(t){""==this.key&&this.arrPos>=0?this._value[this.arrPos]=t:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]=t:this._value[this.key]=t}}u.absent=u.fromNullable(null)},255:function(t,e,s){s.d(e,{NU:function(){return l},Oj:function(){return n},WO:function(){return h},dC:function(){return a},dD:function(){return r},fQ:function(){return i},zl:function(){return u}});var r;s(152),s(484);function i(t){let e=1;for(;t.lookAhead(e)!=r.EO_STRM;)e++;return--e}!function(t){t.EO_STRM="__EO_STRM__",t.BEF_STRM="___BEF_STRM__"}(r||(r={}));class n{constructor(t,...e){this.first=t,this.selectedPos=0,this.strms=[t].concat(...e),this.activeStrm=this.strms[this.selectedPos]}current(){return this.activeStrm.current()}hasNext(){return!!this.activeStrm.hasNext()||!(this.selectedPos>=this.strms.length)&&-1!=this.findNextStrm()}findNextStrm(){let t=!1,e=this.selectedPos;for(;!t&&e<this.strms.length;)t=this.strms[e].hasNext(),t||e++;return t?e:-1}lookAhead(t=1){const e=this.strms.slice(this.selectedPos);if(!e.length)return r.EO_STRM;const s=[...e];for(;s.length;){let e=s.shift(),n=e.lookAhead(t);if(n!=r.EO_STRM)return n;t-=i(e)}return r.EO_STRM}next(){return this.activeStrm.hasNext()?this.activeStrm.next():(this.selectedPos=this.findNextStrm(),-1==this.selectedPos?r.EO_STRM:(this.activeStrm=this.strms[this.selectedPos],this.activeStrm.next()))}reset(){this.activeStrm=this.strms[0],this.selectedPos=0;for(let t=0;t<this.strms.length;t++)this.strms[t].reset()}}class a{constructor(...t){this.dataPos=-1,this.value=t}lookAhead(t=1){return this.dataPos+t>this.value.length-1?r.EO_STRM:this.value[this.dataPos+t]}hasNext(){return this.value.length-1>this.dataPos}next(){var t;return this.dataPos++,null!==(t=null==this?void 0:this.value[this.dataPos])&&void 0!==t?t:r.EO_STRM}reset(){this.dataPos=-1}current(){return this.value[Math.max(0,this.dataPos)]}}class l{constructor(t,e){this._current=r.BEF_STRM,this._filterIdx={},this._unfilteredPos=0,this.filterFunc=t,this.inputDataSource=e}hasNext(){let t,e=1,s=!1;for(;!s&&(t=this.inputDataSource.lookAhead(e))!=r.EO_STRM;)this.filterFunc(t)?(this._filterIdx[this._unfilteredPos+e]=!0,s=!0):e++;return s}next(){var t,e;let s=r.EO_STRM;for(;this.inputDataSource.hasNext();){this._unfilteredPos++;let i=this.inputDataSource.next();if(i!=r.EO_STRM&&(null!==(e=null===(t=this._filterIdx)||void 0===t?void 0:t[this._unfilteredPos])&&void 0!==e&&e||this.filterFunc(i))){this._filterIdx[this._unfilteredPos]=!0,s=i;break}}return this._current=s,s}lookAhead(t=1){var e;let s;for(let i=1;t>0&&(s=this.inputDataSource.lookAhead(i))!=r.EO_STRM;i++){((null===(e=this._filterIdx)||void 0===e?void 0:e[this._unfilteredPos+i])||this.filterFunc(s))&&(t--,this._filterIdx[this._unfilteredPos+i]=!0)}return s}current(){return this._current}reset(){this._current=r.BEF_STRM,this._filterIdx={},this._unfilteredPos=0,this.inputDataSource.reset()}}class u{constructor(t,e){this.mapFunc=t,this.inputDataSource=e}hasNext(){return this.inputDataSource.hasNext()}next(){return this.mapFunc(this.inputDataSource.next())}reset(){this.inputDataSource.reset()}current(){return this.mapFunc(this.inputDataSource.current())}lookAhead(t=1){const e=this.inputDataSource.lookAhead(t);return e==r.EO_STRM?e:this.mapFunc(e)}}class h{constructor(){this.data=[]}collect(t){this.data.push(t)}get finalValue(){return this.data}}}},e={};function s(r){var i=e[r];if(void 0!==i)return i.exports;var n=e[r]={exports:{}};return t[r](n,n.exports,s),n.exports}s.d=function(t,e){for(var r in e)s.o(e,r)&&!s.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};return function(){s.r(r),s.d(r,{FlatMapStreamDataSource:function(){return i},LazyStream:function(){return a},Stream:function(){return n}});var t=s(152),e=s(255);class i{constructor(t,e){this.walkedDataSources=[],this._currPos=0,this.mapFunc=t,this.inputDataSource=e}hasNext(){return this.resolveActiveHasNext()||this.resolveNextHasNext()}resolveActiveHasNext(){let t=!1;return this.activeDataSource&&(t=this.activeDataSource.hasNext()),t}lookAhead(t=1){var s;let r=null===(s=null==this?void 0:this.activeDataSource)||void 0===s?void 0:s.lookAhead(t);if((null==this?void 0:this.activeDataSource)&&r!=e.dD.EO_STRM)return r;this.activeDataSource&&(t-=(0,e.fQ)(this.activeDataSource));for(let s=1;;s++){let r=this.inputDataSource.lookAhead(s);if(r===e.dD.EO_STRM)return e.dD.EO_STRM;let i=this.mapFunc(r),n=this.toDatasource(i),a=n.lookAhead(t);if(a!=e.dD.EO_STRM)return a;t-=(0,e.fQ)(n)}}toDatasource(t){let s=Array.isArray(t)?new e.dC(...t):t;return this.walkedDataSources.push(s),s}resolveNextHasNext(){let t=!1;for(;!t&&this.inputDataSource.hasNext();){let e=this.mapFunc(this.inputDataSource.next());this.activeDataSource=this.toDatasource(e),t=this.activeDataSource.hasNext()}return t}next(){if(this.hasNext())return this._currPos++,this.activeDataSource.next()}reset(){this.inputDataSource.reset(),this.walkedDataSources.forEach((t=>t.reset())),this.walkedDataSources=[],this._currPos=0,this.activeDataSource=null}current(){return this.activeDataSource||this.hasNext(),this.activeDataSource.current()}}class n{constructor(...t){this._limits=-1,this.pos=-1,this.value=t}static of(...t){return new n(...t)}static ofAssoc(t){return this.of(...Object.keys(t)).map((e=>[e,t[e]]))}static ofDataSource(t){let e=[];for(;t.hasNext();)e.push(t.next());return new n(...e)}static ofDomQuery(t){return n.of(...t.asArray)}static ofConfig(t){return n.of(...Object.keys(t.value)).map((e=>[e,t.value[e]]))}current(){return-1==this.pos?e.dD.BEF_STRM:this.pos>=this.value.length?e.dD.EO_STRM:this.value[this.pos]}limits(t){return this._limits=t,this}concat(...t){let e=[this].concat(t);return n.of(...e).flatMap((t=>t))}onElem(t){for(let e=0;e<this.value.length&&(-1==this._limits||e<this._limits)&&!1!==t(this.value[e],e);e++);return this}each(t){this.onElem(t),this.reset()}map(t){t||(t=t=>t);let e=[];return this.each((s=>{e.push(t(s))})),new n(...e)}flatMap(t){let e=[];return this.each((s=>{let r=t(s);e=Array.isArray(r)?e.concat(r):e.concat(r.value)})),n.of(...e)}filter(t){let e=[];return this.each((s=>{t(s)&&e.push(s)})),new n(...e)}reduce(e,s=null){let r=null!=s?0:1,i=null!=s?s:this.value.length?this.value[0]:null;for(let t=r;t<this.value.length&&(-1==this._limits||t<this._limits);t++)i=e(i,this.value[t]);return this.reset(),t.Optional.fromNullable(i)}first(){return this.reset(),this.value&&this.value.length?t.Optional.fromNullable(this.value[0]):t.Optional.absent}last(){let e=this._limits>0?Math.min(this._limits,this.value.length):this.value.length;return this.reset(),t.Optional.fromNullable(e?this.value[e-1]:null)}anyMatch(t){for(let e=0;e<this.value.length&&(-1==this._limits||e<this._limits);e++)if(t(this.value[e]))return!0;return this.reset(),!1}allMatch(t){if(!this.value.length)return!1;let e=0;for(let s=0;s<this.value.length;s++)t(this.value[s])&&e++;return this.reset(),e==this.value.length}noneMatch(t){let e=0;for(let s=0;s<this.value.length;s++)t(this.value[s])||e++;return this.reset(),e==this.value.length}sort(t){let e=this.value.slice().sort(t);return n.of(...e)}collect(t){return this.each((e=>t.collect(e))),this.reset(),t.finalValue}hasNext(){let t=-1!=this._limits&&this.pos>=this._limits-1,e=this.pos>=this.value.length-1;return!(t||e)}next(){return this.hasNext()?(this.pos++,this.value[this.pos]):null}lookAhead(t=1){return this.pos+t>=this.value.length?e.dD.EO_STRM:this.value[this.pos+t]}[Symbol.iterator](){return{next:()=>({done:!this.hasNext(),value:this.next()})}}reset(){this.pos=-1}}class a{constructor(t){this._limits=-1,this.pos=-1,this.dataSource=t}static of(...t){return new a(new e.dC(...t))}static ofAssoc(t){return this.of(...Object.keys(t)).map((e=>[e,t[e]]))}static ofStreamDataSource(t){return new a(t)}static ofDomQuery(t){return a.of(...t.asArray)}static ofConfig(t){return a.of(...Object.keys(t.value)).map((e=>[e,t.value[e]]))}hasNext(){return!this.isOverLimits()&&this.dataSource.hasNext()}next(){let t=this.dataSource.next();return this.pos++,t}lookAhead(t=1){return this.dataSource.lookAhead(t)}current(){return this.dataSource.current()}reset(){this.dataSource.reset(),this.pos=-1,this._limits=-1}concat(...t){return a.ofStreamDataSource(new e.Oj(this,t))}nextFilter(t){if(this.hasNext()){let e=this.next();return t(e)?e:this.nextFilter(t)}return null}limits(t){return this._limits=t,this}collect(t){for(;this.hasNext();){let e=this.next();t.collect(e)}return this.reset(),t.finalValue}onElem(t){return new a(new e.zl((e=>(!1===t(e,this.pos)&&this.stop(),e)),this))}filter(t){return new a(new e.NU(t,this))}map(t){return new a(new e.zl(t,this))}flatMap(t){return new a(new i(t,this))}each(t){for(;this.hasNext();)!1===t(this.next())&&this.stop();this.reset()}reduce(e,s=null){if(!this.hasNext())return t.Optional.absent;let r,i=null;if(null!=s)r=s,i=this.next();else{if(r=this.next(),!this.hasNext())return t.Optional.fromNullable(r);i=this.next()}for(r=e(r,i);this.hasNext();)i=this.next(),r=e(r,i);return this.reset(),t.Optional.fromNullable(r)}last(){return this.hasNext()?this.reduce(((t,e)=>e)):t.Optional.absent}first(){return this.reset(),this.hasNext()?t.Optional.fromNullable(this.next()):t.Optional.absent}anyMatch(t){for(;this.hasNext();)if(t(this.next()))return!0;return!1}allMatch(t){for(;this.hasNext();)if(!t(this.next()))return!1;return!0}noneMatch(t){for(;this.hasNext();)if(t(this.next()))return!1;return!0}sort(t){let s=this.collect(new e.WO);return s=s.sort(t),a.of(...s)}get value(){return this.collect(new e.WO)}[Symbol.iterator](){return{next:()=>({done:!this.hasNext(),value:this.next()})}}stop(){this.pos=this._limits+1e9,this._limits=0}isOverLimits(){return-1!=this._limits&&this.pos>=this._limits-1}}}(),r}()}));
//# sourceMappingURL=Stream.js.map