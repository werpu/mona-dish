System.register([],(function(e,t){return{execute:function(){e(function(){"use strict";var e={447:function(e,t,r){r.d(t,{append:function(){return i},assign:function(){return s},simpleShallowMerge:function(){return d}});var l=r(484);class n{constructor(e){this.parent=e}set value(e){}get value(){return this.parent}}function s(e,...t){if(t.length<1)return new n(e);const r=c(e,...t);return new class{set value(e){r.target[r.key]=e}get value(){return r.target[r.key]}}}function i(e,...t){if(t.length<1)return new n(e);const r=c(e,...t);return new class{set value(e){Array.isArray(e)||(e=[e]),r.target[r.key]?(Array.isArray(r.target[r.key])||(r.target[r.key]=[r.target[r.key]]),r.target[r.key].push(...e)):r.target[r.key]=e}}}function o(e){let t=e.indexOf("[");return t>=0?e.substring(0,t):e}function a(e){let t=e.indexOf("["),r=e.indexOf("]");return t>=0&&r>0&&t<r?parseInt(e.substring(t+1,r)):-1}function u(e,t,r={}){let l=[];l.length=t,l[t-1]=r,e.push(...l)}function h(e){return new l.Es2019Array(...e).flatMap((e=>e.split("["))).map((e=>-1!=e.indexOf("]")?"["+e:e)).filter((e=>""!=e))}function c(e,...t){t=h(t);let r=e,l=null,n=null,s=-1;for(let e=0;e<t.length;e++)if(n=o(t[e]),s=a(t[e]),-1!=s){if(!Array.isArray(r))throw Error("Associative array referenced as index array in path reference");let n=-1;e<t.length-1&&(n=a(t[e+1]));let i=void 0!==(null==r?void 0:r[s]);u(r,s+1,-1!=n?[]:{}),l=s,e==t.length-1?r[s]=i?r[s]:null:r=r[s]}else{if(Array.isArray(r))throw Error("Index array referenced as associative array in path reference");let s=-1;e<t.length-1&&(s=a(t[e+1])),l=n;let i=void 0!==(null==r?void 0:r[n]);e==t.length-1?i||(r[n]=null):(i||(r[n]=-1==s?{}:[]),r=r[n])}return{target:r,key:l}}function d(...e){return function(e=!0,t=!1,...r){let n={};return new l.Es2019Array(...r).map((e=>({arr:e,keys:Object.keys(e)}))).forEach((({arr:r,keys:s})=>{s.forEach((s=>{let i=r[s];if(!Array.isArray(i)&&t&&(i=new l.Es2019Array(...[i])),e||!(null==n?void 0:n[s]))if(t)if(void 0===(null==n?void 0:n[s]))n[s]=i;else if(Array.isArray(n[s]))n[s].push(...i);else{let e=n[s];n[s]=new l.Es2019Array(...[]),n[s].push(e),n[s].push(...i)}else n[s]=r[s]}))})),n}(!0,!1,...e)}},549:function(e,t,r){r(484);var l=r(152),n=r(805);r(447),n.Lang.objAssign;class s extends l.ValueEmbedder{constructor(e,t,r){super(e,t),this.arrPos=null!=r?r:-1}get value(){return""==this.key&&this.arrPos>=0?this._value[this.arrPos]:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]:this._value[this.key]}set value(e){""==this.key&&this.arrPos>=0?this._value[this.arrPos]=e:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]=e:this._value[this.key]=e}}s.absent=s.fromNullable(null)},484:function(e,t,r){r.d(t,{Es2019Array:function(){return s}});class l extends Array{constructor(...e){super(...e),e._another?this._another=e._another:this._another=e,this.flatMap=e=>this._flatMap(e),this.flat=(e=1)=>this._flat(e)}map(e,t){return new n(...Array.prototype.map.call(this._another,e,t))}concat(...e){return new n(...Array.prototype.concat.call(this._another,...e))}reverse(){return new n(...Array.prototype.reverse.call(this._another))}slice(e,t){return new n(...Array.prototype.slice.call(this._another,e,t))}splice(e,t){return new n(...Array.prototype.splice.call(this._another,e,t))}filter(e,t){return new n(...Array.prototype.filter.call(this._another,e,t))}reduce(e,t){return Array.prototype.reduce.call(this._another,e,t)}_flat(e=1){return this._flatResolve(this._another,e)}_flatResolve(e,t=1){if(0==t)return e;let r=[];return e.forEach((e=>{e=Array.isArray(e)?e:[e];let l=this._flatResolve(e,t-1);r=r.concat(l)})),new s(...r)}_flatMap(e){let t=this.map((t=>e(t)));return this._flatResolve(t)}}function n(...e){let t=new l(...e);return new Proxy(t,{get(e,t,r){return"symbol"==typeof t?e._another[t]:isNaN(parseInt(t))?e[t]:e._another[t]},set(e,t,r){return e[t]=r,e._another[t]=r,!0}})}var s=n},456:function(e,t,r){function l(){var e;let t="undefined"!=typeof globalThis&&globalThis.window?globalThis.window:"undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:void 0!==r.g&&(null===r.g||void 0===r.g?void 0:r.g.window)?r.g.window:void 0!==r.g?r.g:null;return null!==(e=null==t?void 0:t.window)&&void 0!==e?e:t}r.d(t,{R:function(){return l}})},805:function(e,t,r){r.d(t,{Lang:function(){return l}});var l,n=r(152),s=r(484);!function(e){function t(e){let t=/\s/,r=(e=e.replace(/^\s\s*/,"")).length;for(;t.test(e.charAt(--r)););return e.slice(0,r+1)}function r(e){return!!arguments.length&&null!=e&&("string"==typeof e||e instanceof String)}e.saveResolve=function(e,t=null){try{let r=e();return n.Optional.fromNullable(null!=r?r:t)}catch(e){return n.Optional.absent}},e.saveResolveLazy=function(e,t=null){try{let r=e();return n.Optional.fromNullable(null!=r?r:t())}catch(e){return n.Optional.absent}},e.strToArray=function(e,r=/\./gi){let l=[];return e.split(r).forEach((e=>{l.push(t(e))})),l},e.trim=t,e.objToArray=function(e,t=0,r=[]){return"__undefined__"==(null!=e?e:"__undefined__")?null!=r?r:null:e instanceof Array&&!t&&!r?e:new s.Es2019Array(...r.concat(Array.prototype.slice.call(e,t)))},e.equalsIgnoreCase=function(e,t){let r=null!=t?t:"___no_value__";return(null!=e?e:"___no_value__").toLowerCase()===r.toLowerCase()},e.assertType=function(e,t){return r(t)?typeof e==t:e instanceof t},e.isString=r,e.isFunc=function(e){return e instanceof Function||"function"==typeof e},e.objAssign=function(e,...t){if(null==e)throw new TypeError("Cannot convert undefined or null to object");let r=Object(e);return Object.assign?(t.forEach((e=>Object.assign(r,e))),r):(t.filter((e=>null!=e)).forEach((e=>{let t=e;Object.keys(t).filter((e=>Object.prototype.hasOwnProperty.call(t,e))).forEach((e=>r[e]=t[e]))})),r)}}(l||(l={}))},152:function(e,t,r){r.d(t,{Optional:function(){return s},ValueEmbedder:function(){return i}});var l=r(484);class n{constructor(e){this._value=e}get value(){return this._value}map(e){e||(e=e=>e);let t=e(this.value);return new n(t)}flatMap(e){let t=this.map(e);for(;(null==t?void 0:t.value)instanceof n;)t=t.value;return t}}class s extends n{constructor(e){super(e)}get value(){return this._value instanceof n?this._value.flatMap().value:this._value}static fromNullable(e){return new s(e)}isAbsent(){return void 0===this.value||null==this.value}isPresent(e){let t=this.isAbsent();return!t&&e&&e.call(this,this),!t}ifPresentLazy(e=(()=>{})){return this.isPresent.call(this,e),this}orElse(e){return this.isPresent()?this:null==e?s.absent:this.flatMap((()=>e))}orElseLazy(e){return this.isPresent()?this:this.flatMap(e)}flatMap(e){let t=super.flatMap(e);return t instanceof s?t.flatMap():s.fromNullable(t.value)}getIf(...e){e=this.preprocessKeys(...e);let t=this;for(let r=0;r<e.length;r++){let l=this.keyVal(e[r]),n=this.arrayIndex(e[r]);if(""===l&&n>=0){if(t=this.getClass().fromNullable(t.value instanceof Array?t.value.length<n?null:t.value[n]:null),t.isAbsent())return t}else if(l&&n>=0){if(t.getIfPresent(l).isAbsent())return t;if(t=t.getIfPresent(l).value instanceof Array?this.getClass().fromNullable(t.getIfPresent(l).value[n]):this.getClass().absent,t.isAbsent())return t}else{if(t=t.getIfPresent(l),t.isAbsent())return t;n>-1&&(t=this.getClass().fromNullable(t.value[n]))}}return t}match(e){return!this.isAbsent()&&e(this.value)}get(e=s.absent){return this.isAbsent()?this.getClass().fromNullable(e).flatMap():this.getClass().fromNullable(this.value).flatMap()}toJson(){return JSON.stringify(this.value)}getClass(){return s}arrayIndex(e){let t=e.indexOf("["),r=e.indexOf("]");return t>=0&&r>0&&t<r?parseInt(e.substring(t+1,r)):-1}keyVal(e){let t=e.indexOf("[");return t>=0?e.substring(0,t):e}getIfPresent(e){return this.isAbsent()?this.getClass().absent:this.getClass().fromNullable(this.value[e]).flatMap()}resolve(e){if(this.isAbsent())return s.absent;try{return s.fromNullable(e(this.value))}catch(e){return s.absent}}preprocessKeys(...e){return new l.Es2019Array(...e).flatMap((e=>new l.Es2019Array(...e.split(/]\s*\[/gi)).map((e=>(-1==(e=e.replace(/^\s+|\s+$/g,"")).indexOf("[")&&-1!=e.indexOf("]")&&(e="["+e),-1==e.indexOf("]")&&-1!=e.indexOf("[")&&(e+="]"),e)))))}}s.absent=s.fromNullable(null);class i extends s{constructor(e,t="value"){super(e),this.key=t}get value(){return this._value?this._value[this.key]:null}set value(e){this._value&&(this._value[this.key]=e)}orElse(e){let t={};return t[this.key]=e,this.isPresent()?this:new i(t,this.key)}orElseLazy(e){if(this.isPresent())return this;{let t={};return t[this.key]=e(),new i(t,this.key)}}getClass(){return i}static fromNullable(e,t="value"){return new i(e,t)}}i.absent=i.fromNullable(null)},255:function(e,t,r){r.d(t,{dD:function(){return l}});var l;r(484),r(549);!function(e){e.EO_STRM="__EO_STRM__",e.BEF_STRM="___BEF_STRM__"}(l||(l={}))}},t={};function r(l){var n=t[l];if(void 0!==n)return n.exports;var s=t[l]={exports:{}};return e[l](s,s.exports,r),s.exports}r.d=function(e,t){for(var l in t)r.o(t,l)&&!r.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var l={};return function(){r.r(l),r.d(l,{DQ:function(){return b},DQ$:function(){return E},DomQuery:function(){return g},DomQueryCollector:function(){return y},ElementAttribute:function(){return v},Style:function(){return p}});var e,t=r(152),n=r(255),s=r(805),i=r(456),o=r(484),a=r(447),u=function(e,t,r,l){return new(r||(r=Promise))((function(n,s){function i(e){try{a(l.next(e))}catch(e){s(e)}}function o(e){try{a(l.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,o)}a((l=l.apply(e,t||[])).next())}))},h=s.Lang.trim,c=s.Lang.isString,d=s.Lang.equalsIgnoreCase,f=s.Lang.objToArray;!function(e){e.SELECT="select",e.BUTTON="button",e.SUBMIT="submit",e.RESET="reset",e.IMAGE="image",e.RADIO="radio",e.CHECKBOX="checkbox"}(e||(e={}));class v extends t.ValueEmbedder{constructor(e,t,r=null){super(e,t),this.element=e,this.name=t,this.defaultVal=r}get value(){let e=this.element.get(0).orElse().values;return e.length?e[0].getAttribute(this.name):this.defaultVal}set value(e){let t=this.element.get(0).orElse().values;for(let r=0;r<t.length;r++)t[r].setAttribute(this.name,e);t[0].setAttribute(this.name,e)}getClass(){return v}static fromNullable(e,t="value"){return new v(e,t)}}class p extends t.ValueEmbedder{constructor(e,t,r=null){super(e,t),this.element=e,this.name=t,this.defaultVal=r}get value(){let e=this.element.values;return e.length?e[0].style[this.name]:this.defaultVal}set value(e){let t=this.element.values;for(let r=0;r<t.length;r++)t[r].style[this.name]=e}getClass(){return v}static fromNullable(e,t="value"){return new v(e,t)}}const m=()=>!0;class g{constructor(...e){if(this.rootNode=[],this.pos=-1,this._limits=-1,!t.Optional.fromNullable(e).isAbsent()&&e.length)for(let t=0;t<e.length;t++)if(e[t])if(c(e[t])){let r=g.querySelectorAll(e[t]);r.isAbsent()||e.push(...r.values)}else e[t]instanceof g?this.rootNode.push(...e[t].values):this.rootNode.push(e[t]);else;}get value(){return this.getAsElem(0)}get values(){return this.allElems()}get global(){return i.R}get stream(){throw Error("Not implemented, include Stream.ts for this to work")}get lazyStream(){throw Error("Not implemented, include Stream.ts for this to work")}get id(){return new v(this.get(0),"id")}get length(){return this.rootNode.length}get tagName(){return this.getAsElem(0).getIf("tagName")}get nodeName(){return this.getAsElem(0).getIf("nodeName")}isTag(e){return!this.isAbsent()&&(this.nodeName.orElse("__none___").value.toLowerCase()==e.toLowerCase()||this.tagName.orElse("__none___").value.toLowerCase()==e.toLowerCase())}get type(){return this.getAsElem(0).getIf("type")}get name(){return new t.ValueEmbedder(this.getAsElem(0).value,"name")}get inputValue(){return this.getAsElem(0).getIf("value").isPresent()?new t.ValueEmbedder(this.getAsElem(0).value):t.ValueEmbedder.absent}get val(){return this.inputValue.value}set val(e){this.inputValue.value=e}get nodeId(){return this.id.value}set nodeId(e){this.id.value=e}get checked(){return new o.Es2019Array(...this.values).every((e=>!!e.checked))}set checked(e){this.eachElem((t=>t.checked=e))}get elements(){return this.querySelectorAll("input, checkbox, select, textarea, fieldset")}get deepElements(){return this.querySelectorAllDeep("input, select, textarea, checkbox, fieldset")}querySelectorAllDeep(e){let t=[],r=this.querySelectorAll(e);r.length&&t.push(r);let l=this.querySelectorAll("*").shadowRoot;if(l.length){let r=l.querySelectorAllDeep(e);r.length&&t.push(r)}return new g(...t)}get disabled(){return this.attr("disabled").isPresent()}set disabled(e){e?this.attr("disabled").value="disabled":this.removeAttribute("disabled")}removeAttribute(e){this.eachElem((t=>t.removeAttribute(e)))}get childNodes(){let e=[];return this.eachElem((t=>{e=e.concat(f(t.childNodes))})),new g(...e)}get asArray(){return new o.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>g.byId(e)))}get offsetWidth(){return new o.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>e.offsetWidth)).reduce(((e,t)=>e+t),0)}get offsetHeight(){return new o.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>e.offsetHeight)).reduce(((e,t)=>e+t),0)}get offsetLeft(){return new o.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>e.offsetLeft)).reduce(((e,t)=>e+t),0)}get offsetTop(){return new o.Es2019Array(this.rootNode).filter((e=>null!=e)).map((e=>e.offsetTop)).reduce(((e,t)=>e+t),0)}get asNodeArray(){return new o.Es2019Array(...this.rootNode.filter((e=>null!=e)))}static querySelectorAllDeep(e){return new g(document).querySelectorAllDeep(e)}static querySelectorAll(e){return-1!=e.indexOf("/shadow/")?new g(document)._querySelectorAllDeep(e):new g(document)._querySelectorAll(e)}static byId(e,t=!1){return c(e)?t?new g(document).byIdDeep(e):new g(document).byId(e):new g(e)}static byTagName(e){return c(e)?new g(document).byTagName(e):new g(e)}static globalEval(e,t){return new g(document).globalEval(e,t)}static globalEvalSticky(e,t){return new g(document).globalEvalSticky(e,t)}static fromMarkup(e){const t=document.implementation.createHTMLDocument("");let r=(e=h(e)).toLowerCase();if(-1!=r.search(/<!doctype[^\w\-]+/gi)||-1!=r.search(/<html[^\w\-]+/gi)||-1!=r.search(/<head[^\w\-]+/gi)||-1!=r.search(/<body[^\w\-]+/gi))return t.documentElement.innerHTML=e,new g(t.documentElement);{let t=function(e,t){let r=["<",t,">"].join(""),l=["<",t," "].join("");return 0==e.indexOf(r)||0==e.indexOf(l)},l=new g(document.createElement("div"));return t(r,"thead")||t(r,"tbody")?(l.html(`<table>${e}</table>`),l.querySelectorAll("table").get(0).childNodes.detach()):t(r,"tfoot")?(l.html(`<table><thead></thead><tbody><tbody${e}</table>`),l.querySelectorAll("table").get(2).childNodes.detach()):t(r,"tr")?(l.html(`<table><tbody>${e}</tbody></table>`),l.querySelectorAll("tbody").get(0).childNodes.detach()):t(r,"td")?(l.html(`<table><tbody><tr>${e}</tr></tbody></table>`),l.querySelectorAll("tr").get(0).childNodes.detach()):(l.html(e),l.childNodes.detach())}}get(e){return e<this.rootNode.length?new g(this.rootNode[e]):g.absent}getAsElem(e,r=t.Optional.absent){return e<this.rootNode.length?t.Optional.fromNullable(this.rootNode[e]):r}filesFromElem(e){var t;return e<this.rootNode.length&&(null===(t=this.rootNode[e])||void 0===t?void 0:t.files)?this.rootNode[e].files:[]}allElems(){return this.rootNode}isAbsent(){return 0==this.length}isPresent(e){let t=this.isAbsent();return!t&&e&&e.call(this,this),!t}ifPresentLazy(e=function(){}){return this.isPresent.call(this,e),this}delete(){this.eachElem((e=>{e.parentNode&&e.parentNode.removeChild(e)}))}querySelectorAll(e){return-1!=e.indexOf("/shadow/")?this._querySelectorAllDeep(e):this._querySelectorAll(e)}closest(e){return-1!=e.indexOf("/shadow/")?this._closestDeep(e):this._closest(e)}byId(e,t){let r=[];return t&&(r=r.concat(...new o.Es2019Array(...(null==this?void 0:this.rootNode)||[]).filter((t=>e==t.id)).map((e=>new g(e))))),r=r.concat(this.querySelectorAll(`[id="${e}"]`)),new g(...r)}byIdDeep(e,t){let r=[];t&&(r=r.concat(new o.Es2019Array(...(null==this?void 0:this.rootNode)||[]).filter((t=>e==t.id)).map((e=>new g(e)))));let l=this.querySelectorAllDeep(`[id="${e}"]`);return l.length&&r.push(l),new g(...r)}byTagName(e,t,r){var l;let n=[];return t&&(n=new o.Es2019Array(...null!==(l=null==this?void 0:this.rootNode)&&void 0!==l?l:[]).filter((t=>(null==t?void 0:t.tagName)==e)).reduce(((e,t)=>e.concat([t])),n)),r?n.push(this.querySelectorAllDeep(e)):n.push(this.querySelectorAll(e)),new g(...n)}attr(e,t=null){return new v(this,e,t)}style(e,t=null){return new p(this,e,t)}hasClass(e){let t=!1;return this.eachElem((r=>{if(t=r.classList.contains(e),t)return!1})),t}addClass(e){return this.eachElem((t=>t.classList.add(e))),this}removeClass(e){return this.eachElem((t=>t.classList.remove(e))),this}isMultipartCandidate(e=!1){const t="input[type='file']";return this.matchesSelector(t)||(e?this.querySelectorAllDeep(t):this.querySelectorAll(t)).first().isPresent()}html(e){return t.Optional.fromNullable(e).isAbsent()?this.isPresent()?t.Optional.fromNullable(this.innerHTML):t.Optional.absent:(this.innerHTML=e,this)}dispatchEvent(e){return this.eachElem((t=>t.dispatchEvent(e))),this}set innerHTML(e){this.eachElem((t=>t.innerHTML=e))}get innerHTML(){let e=[];return this.eachElem((t=>e.push(t.innerHTML))),e.join("")}set innerHtml(e){this.innerHTML=e}get innerHtml(){return this.innerHTML}filterSelector(e){let t=[];return this.eachElem((r=>{this._mozMatchesSelector(r,e)&&t.push(r)})),new g(...t)}matchesSelector(e){return this.asArray.some((t=>this._mozMatchesSelector(t.getAsElem(0).value,e)))}getIf(...e){let t=this.childNodes;for(let r=0;r<e.length;r++)if(t=t.filterSelector(e[r]),t.isAbsent())return t;return t}eachElem(e){for(let t=0,r=this.rootNode.length;t<r&&!1!==e(this.rootNode[t],t);t++);return this}firstElem(e=(e=>e)){return this.rootNode.length>1&&e(this.rootNode[0],0),this}lastElem(e=(e=>e)){return this.rootNode.length>1&&e(this.rootNode[this.rootNode.length-1],0),this}each(e){return new o.Es2019Array(...this.rootNode).forEach(((t,r)=>{if(null!=t)return e(g.byId(t),r)})),this}replace(e){return this.each((t=>{let r=t.getAsElem(0).value,l=r.parentElement,n=r.nextElementSibling,s=r.previousElementSibling;null!=n?new g(n).insertBefore(e):s?new g(s).insertAfter(e):new g(l).append(e),t.delete()})),e}first(e=(e=>e)){return this.rootNode.length>=1?(e(this.get(0),0),this.get(0)):this}last(e=(e=>e)){if(this.rootNode.length>=1){let t=this.get(this.rootNode.length-1);return e(t,0),t}return this}filter(e){let t=[];return this.each((r=>{e(r)&&t.push(r)})),new g(...t)}globalEval(e,t){var r,l,n;const s=null!==(l=null===(r=document.getElementsByTagName("head"))||void 0===r?void 0:r[0])&&void 0!==l?l:null===(n=document.documentElement.getElementsByTagName("head"))||void 0===n?void 0:n[0],i=document.createElement("script");t&&(void 0!==(null==i?void 0:i.nonce)?i.nonce=t:i.setAttribute("nonce",t)),i.type="text/javascript",i.innerHTML=e;let o=s.appendChild(i);return s.removeChild(o),this}globalEvalSticky(e,t){let r=document.getElementsByTagName("head")[0]||document.documentElement,l=document.createElement("script");return this.applyNonce(t,l),l.type="text/javascript",l.innerHTML=e,r.appendChild(l),this}detach(){return this.eachElem((e=>{e.parentNode.removeChild(e)})),this}appendTo(e){return s.Lang.isString(e)?(this.appendTo(g.querySelectorAll(e)),this):(this.eachElem((t=>{e.getAsElem(0).orElseLazy((()=>({appendChild:()=>{}}))).value.appendChild(t)})),this)}loadScriptEval(e,t=0,r){return this._loadScriptEval(!1,e,t,r),this}loadScriptEvalSticky(e,t=0,r){return this._loadScriptEval(!0,e,t,r),this}insertAfter(...e){this.each((t=>{let r=t.getAsElem(0).value,l=r.parentNode;for(let t=0;t<e.length;t++){let n=r.nextSibling;e[t].eachElem((e=>{n?(l.insertBefore(e,n),r=n):l.appendChild(e)}))}}));let t=[];return t.push(this),t=t.concat(e),new g(...t)}insertBefore(...e){this.each((t=>{let r=t.getAsElem(0).value,l=r.parentNode;for(let t=0;t<e.length;t++)e[t].eachElem((e=>{l.insertBefore(e,r)}))}));let t=[];return t.push(this),t=t.concat(e),new g(...t)}orElse(...e){return this.isPresent()?this:new g(...e)}orElseLazy(e){return this.isPresent()?this:new g(e())}allParents(e){let t=this.parent(),r=[];for(;t.isPresent();)t.matchesSelector(e)&&r.push(t),t=t.parent();return new g(...r)}firstParent(e){let t=this.parent();for(;t.isPresent();){if(t.matchesSelector(e))return t;t=t.parent()}return g.absent}parentsWhileMatch(e){const t=[];let r=this.parent().filter((t=>t.matchesSelector(e)));for(;r.isPresent();)t.push(r),r=r.parent().filter((t=>t.matchesSelector(e)));return new g(...t)}parent(){let e=[];return this.eachElem((t=>{let r=t.parentNode||t.host||t.shadowRoot;r&&-1==e.indexOf(r)&&e.push(r)})),new g(...e)}copyAttrs(e){return e.eachElem((e=>{let t=f(e.attributes);for(let e of t){let t=e.value,r=e.name;switch(r){case"id":this.id.value=t;break;case"disabled":this.resolveAttributeHolder("disabled").disabled=t;break;case"checked":this.resolveAttributeHolder("checked").checked=t;break;default:this.attr(r).value=t}}})),this}outerHTML(e,t,r,l=!1){var n;if(this.isAbsent())return;let s=null===(n=null===document||void 0===document?void 0:document.activeElement)||void 0===n?void 0:n.id,i=s?g.getCaretPosition(document.activeElement):null,o=g.fromMarkup(e),a=[],u=this.getAsElem(0).value,h=o.get(0),c=u.parentNode,d=h.getAsElem(0).value;if(c.replaceChild(d,u),a.push(new g(d)),this.isAbsent())return this;let f=[];o.length>1&&(f=f.concat(...o.values.slice(1)),a.push(g.byId(d).insertAfter(new g(...f)))),t&&this.runScripts(),r&&this.runCss();let v=g.byId(s);return s&&v.isPresent()&&null!=i&&void 0!==i&&v.eachElem((e=>g.setCaretPosition(e,i))),o}runScripts(e=!1,t=m){const r=t=>{if(t.length){let r=[];new o.Es2019Array(...t).forEach((t=>{t.nonce?(r.length&&(this.globalEval(r.join("\n")),r.length=0),e?this.globalEvalSticky(t.evalText,t.nonce):this.globalEval(t.evalText,t.nonce)):r.push(t.evalText)})),r.length&&(e?this.globalEvalSticky(r.join("\n")):this.globalEval(r.join("\n")),r.length=0),t=[]}return t};let l=[],n=["","script","text/javascript","text/ecmascript","ecmascript"],s=s=>{var i,o,a,u;let c=s.tagName,f=(null!==(i=null==s?void 0:s.type)&&void 0!==i?i:"").toLowerCase();if(c&&d(c,"script")&&-1!=n.indexOf(f)){let n=s.getAttribute("src");if(void 0!==n&&null!=n&&n.length>0){let i=null!==(o=null==s?void 0:s.nonce)&&void 0!==o?o:s.getAttribute("nonce").value;t(n)&&(l=r(l),e?i?this.loadScriptEvalSticky(n,0,i):this.loadScriptEvalSticky(n,0):i?this.loadScriptEval(n,0,i):this.loadScriptEval(n,0))}else{let e=h(s.text||s.innerText||s.innerHTML),t=!0;for(;t;)t=!1,"\x3c!--"==e.substring(0,4)&&(e=e.substring(4),t=!0),"//\x3c!--"==e.substring(0,4)&&(e=e.substring(6),t=!0),"//<![CDATA["==e.substring(0,11)&&(e=e.substring(11),t=!0);let r=null!==(u=null!==(a=null==s?void 0:s.nonce)&&void 0!==a?a:s.getAttribute("nonce").value)&&void 0!==u?u:"";l.push({nonce:r,evalText:e})}}};try{new g(this.filterSelector("script"),this.querySelectorAll("script")).asArray.flatMap((e=>[...e.values])).sort(((e,t)=>e.compareDocumentPosition(t)-3)).forEach((e=>s(e))),r(l)}catch(e){console&&console.error&&console.error(e.message||e.description)}finally{s=null}return this}runCss(){return new g(this.filterSelector("link, style"),this.querySelectorAll("link, style")).asArray.flatMap((e=>[...e.values])).sort(((e,t)=>e.compareDocumentPosition(t)-3)).forEach((e=>(e=>{const t=g.byId(e),r=t.tagName.orElse("").value,l=g.byTagName("head");if(r&&d(r,"link")&&d(e.getAttribute("rel"),"stylesheet")){const r=e.getAttribute("rel"),n=l.querySelectorAll(`link[rel='stylesheet'][href='${r}']`);n.length?n.replace(t):l.append(t)}else if(r&&d(r,"style")){let e=t.innerHTML.replace(/\s+/gi,""),r=l.querySelectorAll("style"),n=r.asArray.filter((t=>t.innerHTML.replace(/\s+/gi,"")==e));r=new g(...n),r.length||l.append(t)}})(e))),this}click(){return this.fireEvent("click"),this}addEventListener(e,t,r){return this.eachElem((l=>l.addEventListener(e,t,r))),this}removeEventListener(e,t,r){return this.eachElem((l=>l.removeEventListener(e,t,r))),this}fireEvent(e,t={}){let r={bubbles:!0,cancelable:!0};r=(0,a.simpleShallowMerge)(r,t),this.eachElem((t=>{let l;if(t.ownerDocument)l=t.ownerDocument;else{if(9!=t.nodeType)throw new Error("Invalid node passed to fireEvent: "+t.id);l=t}if(t.dispatchEvent){let l=Event;switch(e){case"click":case"mousedown":case"mouseup":case"mousemove":l=this.global().MouseEvent;break;case"keyup":case"keydown":case"keypress":l=this.global().KeyboardEvent;break;case"focus":case"change":case"blur":case"select":break;default:throw"fireEvent: Couldn't find an event class for event '"+e+"'."}let n=new l(e,r);n.synthetic=!0,t.dispatchEvent(n)}else if(t.fireEvent){let n=l.createEventObject();n.synthetic=!0,Object.keys(r).forEach((e=>n[e]=r[e])),t.fireEvent("on"+e,n)}}))}textContent(e=""){return this.asArray.map((e=>e.getAsElem(0).orElseLazy((()=>({textContent:""}))).value.textContent||"")).reduce(((t,r)=>[t,e,r].join("")),"")}innerText(e=""){return this.asArray.map((e=>e.getAsElem(0).orElseLazy((()=>({innerText:""}))).value.innerText||"")).reduce(((t,r)=>[t,r].join(e)),"")}encodeFormElement(t={}){if(this.name.isAbsent())return;let r=(0,a.simpleShallowMerge)(t);return this.each((t=>{var l,n;if(t.name.isAbsent())return;let s=t.name.value,i=t.tagName.orElse("__none__").value.toLowerCase(),o=t.type.orElse("__none__").value.toLowerCase();if(o=o.toLowerCase(),("input"==i||"textarea"==i||"select"==i)&&null!=s&&""!=s&&!t.disabled){if("select"==i){let e=t.getAsElem(0).value;if(e.selectedIndex>=0){let t=e.options.length;for(let l=0;l<t;l++)if(e.options[l].selected){let t=e.options[l];(0,a.append)(r,s).value=null!=t.getAttribute("value")?t.value:t.text}}}if(i!=e.SELECT&&o!=e.BUTTON&&o!=e.RESET&&o!=e.SUBMIT&&o!=e.IMAGE&&(o!=e.CHECKBOX&&o!=e.RADIO||t.checked)){let e=null===(n=null===(l=t.value)||void 0===l?void 0:l.value)||void 0===n?void 0:n.files,i=null!=e?e:[];if(null==i?void 0:i.length)(0,a.assign)(r,s).value=Array.from(i);else{if(e)return;(0,a.append)(r,s).value=t.inputValue.value}}}})),r}get cDATAAsString(){return this.asArray.flatMap((e=>e.childNodes.asArray)).filter((e=>{var t,r;return 4==(null===(r=null===(t=null==e?void 0:e.value)||void 0===t?void 0:t.value)||void 0===r?void 0:r.nodeType)})).reduce(((e,t)=>{var r,l,n;return e.push(null!==(n=null===(l=null===(r=null==t?void 0:t.value)||void 0===r?void 0:r.value)||void 0===l?void 0:l.data)&&void 0!==n?n:""),e}),[]).join("")}subNodes(e,r){return t.Optional.fromNullable(r).isAbsent()&&(r=this.length),new g(...this.rootNode.slice(e,Math.min(r,this.length)))}limits(e){return this._limits=e,this}hasNext(){let e=-1!=this._limits&&this.pos>=this._limits-1,t=this.pos>=this.values.length-1;return!(e||t)}next(){return this.hasNext()?(this.pos++,new g(this.values[this.pos])):null}lookAhead(e=1){return this.values.length-1<this.pos+e?n.dD.EO_STRM:new g(this.values[this.pos+e])}current(){return-1==this.pos?n.dD.BEF_STRM:new g(this.values[this.pos])}reset(){this.pos=-1}attachShadow(e={mode:"open"}){let t=[];return this.eachElem((r=>{let l;if(!(null==r?void 0:r.attachShadow))throw new Error("Shadow dom creation not supported by the browser, please use a shim, to gain this functionality");l=g.byId(r.attachShadow(e)),t.push(l)})),new g(...t)}waitUntilDom(e,t={attributes:!0,childList:!0,subtree:!0,timeout:500,interval:100}){return u(this,void 0,void 0,(function*(){return function(e,t,r={attributes:!0,childList:!0,subtree:!0,timeout:500,interval:100}){return new Promise(((l,n)=>{let s=null;const i=new Error("Mutation observer timeout");function o(e,t){let l=null;return t(e)?e:(l=r.childList?t(e)?e:e.childNodes.filter((e=>t(e))).first().value.value:r.subtree?t(e)?e:e.querySelectorAll(" * ").filter((e=>t(e))).first().value.value:t(e)?e:null,l)}let a=e;if(a=o(a,t))l(new g(a));else if("undefined"!=typeof MutationObserver){const o=setTimeout((()=>(s.disconnect(),n(i))),r.timeout),a=r=>{const n=new g(r.map((e=>e.target))).filter((e=>t(e))).first();n.isPresent()&&(clearTimeout(o),s.disconnect(),l(new g(n||e)))};s=new MutationObserver(a);let u=Object.assign({},r);delete u.timeout,e.eachElem((e=>{s.observe(e,u)}))}else{let s=setInterval((()=>{let r=o(e,t);r&&(a&&(clearTimeout(a),clearInterval(s),s=null),l(new g(r||e)))}),r.interval),a=setTimeout((()=>{s&&(clearInterval(s),n(i))}),r.timeout)}}))}(this,e,t)}))}get shadowElements(){let e=(this.querySelectorAll("*").filter((e=>e.hasShadow)).allElems()||[]).map((e=>e.shadowRoot));return new g(...e)}get shadowRoot(){let e=[];for(let t=0;t<this.rootNode.length;t++)this.rootNode[t].shadowRoot&&e.push(this.rootNode[t].shadowRoot);return new g(...e)}get hasShadow(){for(let e=0;e<this.rootNode.length;e++)if(this.rootNode[e].shadowRoot)return!0;return!1}static getCaretPosition(e){let t=0;try{if(null===document||void 0===document?void 0:document.selection){e.focus();let r=document.selection.createRange();r.moveStart("character",-e.value.length),t=r.text.length}}catch(e){}return t}static setCaretPosition(e,t){(null==e?void 0:e.focus)&&(null==e||e.focus()),(null==e?void 0:e.setSelectiongRange)&&(null==e||e.setSelectiongRange(t,t))}[Symbol.iterator](){return{next:()=>({done:!this.hasNext(),value:this.next()})}}concat(e,t=!0){let r=this.asArray;const l=new g(...r.concat(e.asArray));if(!t)return l;let n={};return new g(...l.asArray.filter((e=>{const t=!(null==n?void 0:n[e.value.value.outerHTML]);return n[e.value.value.outerHTML]=!0,t})))}append(e){return this.each((t=>e.appendTo(t))),this}prependTo(e){return e.eachElem((e=>{e.prepend(...this.allElems())})),this}prepend(e){return this.eachElem((t=>{t.prepend(...e.allElems())})),this}_querySelectorAll(e){var t,r;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let l=[];for(let t=0;t<this.rootNode.length;t++){if(!(null===(r=this.rootNode[t])||void 0===r?void 0:r.querySelectorAll))continue;let n=this.rootNode[t].querySelectorAll(e);l=l.concat(...f(n))}return new g(...l)}_querySelectorAllDeep(e){var t;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let r=new g(...this.rootNode),l=e.split(/\/shadow\//);for(let e=0;e<l.length;e++){if(""==l[e])continue;let t=l[e];r=r.querySelectorAll(t),e<l.length-1&&(r=r.shadowRoot)}return r}_closest(e){var t,r;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let l=[];for(let t=0;t<this.rootNode.length;t++){if(!(null===(r=this.rootNode[t])||void 0===r?void 0:r.closest))continue;let n=[this.rootNode[t].closest(e)];l=l.concat(...n)}return new g(...l)}_closestDeep(e){var t;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let r=new g(...this.rootNode),l=e.split(/\/shadow\//);for(let e=0;e<l.length;e++){if(""==l[e])continue;let t=l[e];r=r.closest(t),e<l.length-1&&(r=r.shadowRoot)}return r}_mozMatchesSelector(e,t){let r=e;return(r.matches||r.matchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector||r.webkitMatchesSelector||function(t){let r=(document||ownerDocument).querySelectorAll(t),l=r.length;for(;--l>=0&&r.item(l)!==e;);return l>-1}).call(e,t)}_loadScriptEval(e,t,r=0,l){let n=this.createSourceNode(t,l),s=this.createSourceNode(null,l),i=`nonce_${Date.now()}_${Math.random()}`;s.innerHTML=`document.head["${i}"] = true`;let o=document.head;if(o.appendChild(s),o.removeChild(s),o[i]){try{r?setTimeout((()=>{o.appendChild(n),e||o.removeChild(n)}),r):(o.appendChild(n),e||o.removeChild(n))}finally{delete o[i]}return this}}resolveAttributeHolder(e="value"){let t=[];return t[e]=null,e in this.getAsElem(0).value?this.getAsElem(0).value:t}createSourceNode(e,t){let r=document.createElement("script");return r.type="text/javascript",t&&(void 0!==(null==r?void 0:r.nonce)?r.nonce=t:r.setAttribute("nonce",t)),e&&(r.src=e),r}applyNonce(e,t){e&&(void 0!==(null==t?void 0:t.nonce)?t.nonce=e:t.setAttribute("nonce",e))}}g.absent=new g,g.global=i.R;class y{constructor(){this.data=[]}collect(e){this.data.push(e)}get finalValue(){return new g(...this.data)}}const b=g,E=g.querySelectorAll}(),l}())}}}));
//# sourceMappingURL=DomQuery.js.map