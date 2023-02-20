require([],(function(){return function(){"use strict";var e={484:function(e,t,l){l.d(t,{Es2019Array:function(){return r}});class r extends Array{constructor(...e){if(super(...e),!Array.prototype.flatMap){let e=r.prototype.flatMap_;this.flatMap=e}}flatMap_(e,t=!1){let l=[],n=t=>{let r=e(t);if(Array.isArray(r)){if(1==r.length)return void l.push(r[1]);r.length>1&&r.forEach((e=>n(e)))}else l.push(t)};return this.forEach((e=>n(e))),new r(...l)}concat(...e){return new r(...super.concat(...e))}reverse(){return new r(...super.reverse())}slice(e,t){return new r(...super.slice(e,t))}splice(e,t){return new r(...super.splice(e,t))}filter(e,t){return new r(...super.filter(e,t))}}},456:function(e,t,l){function r(){var e;let t="undefined"!=typeof globalThis&&globalThis.window?globalThis.window:"undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:void 0!==l.g&&(null===l.g||void 0===l.g?void 0:l.g.window)?l.g.window:void 0!==l.g?l.g:null;return null!==(e=null==t?void 0:t.window)&&void 0!==e?e:t}l.d(t,{R:function(){return r}})},805:function(e,t,l){l.d(t,{Lang:function(){return r}});var r,n=l(152);!function(e){function t(e){let t=/\s/,l=(e=e.replace(/^\s\s*/,"")).length;for(;t.test(e.charAt(--l)););return e.slice(0,l+1)}function l(e){return!!arguments.length&&null!=e&&("string"==typeof e||e instanceof String)}e.saveResolve=function(e,t=null){try{let l=e();return n.Optional.fromNullable(null!=l?l:t)}catch(e){return n.Optional.absent}},e.saveResolveLazy=function(e,t=null){try{let l=e();return n.Optional.fromNullable(null!=l?l:t())}catch(e){return n.Optional.absent}},e.strToArray=function(e,l=/\./gi){let r=[];return e.split(l).forEach((e=>{r.push(t(e))})),r},e.trim=t,e.objToArray=function(e,t=0,l=[]){return"__undefined__"==(null!=e?e:"__undefined__")?null!=l?l:null:e instanceof Array&&!t&&!l?e:l.concat(Array.prototype.slice.call(e,t))},e.equalsIgnoreCase=function(e,t){let l=null!=t?t:"___no_value__";return(null!=e?e:"___no_value__").toLowerCase()===l.toLowerCase()},e.assertType=function(e,t){return l(t)?typeof e==t:e instanceof t},e.isString=l,e.isFunc=function(e){return e instanceof Function||"function"==typeof e},e.objAssign=function(e,...t){if(null==e)throw new TypeError("Cannot convert undefined or null to object");let l=Object(e);return Object.assign?(t.forEach((e=>Object.assign(l,e))),l):(t.filter((e=>null!=e)).forEach((e=>{let t=e;Object.keys(t).filter((e=>Object.prototype.hasOwnProperty.call(t,e))).forEach((e=>l[e]=t[e]))})),l)}}(r||(r={}))},152:function(e,t,l){l.d(t,{Config:function(){return h},Optional:function(){return o},ValueEmbedder:function(){return a}});var r=l(805),n=l(484),s=r.Lang.objAssign;class i{constructor(e){this._value=e}get value(){return this._value}map(e){e||(e=e=>e);let t=e(this.value);return new i(t)}flatMap(e){let t=this.map(e);for(;(null==t?void 0:t.value)instanceof i;)t=t.value;return t}}class o extends i{constructor(e){super(e)}get value(){return this._value instanceof i?this._value.flatMap().value:this._value}static fromNullable(e){return new o(e)}isAbsent(){return void 0===this.value||null==this.value}isPresent(e){let t=this.isAbsent();return!t&&e&&e.call(this,this),!t}ifPresentLazy(e=(()=>{})){return this.isPresent.call(this,e),this}orElse(e){return this.isPresent()?this:null==e?o.absent:this.flatMap((()=>e))}orElseLazy(e){return this.isPresent()?this:this.flatMap(e)}flatMap(e){let t=super.flatMap(e);return t instanceof o?t.flatMap():o.fromNullable(t.value)}getIf(...e){e=this.preprocessKeys(...e);let t=this;for(let l=0;l<e.length;l++){let r=this.keyVal(e[l]),n=this.arrayIndex(e[l]);if(""===r&&n>=0){if(t=this.getClass().fromNullable(t.value instanceof Array?t.value.length<n?null:t.value[n]:null),t.isAbsent())return t}else if(r&&n>=0){if(t.getIfPresent(r).isAbsent())return t;if(t=t.getIfPresent(r).value instanceof Array?this.getClass().fromNullable(t.getIfPresent(r).value[n]):this.getClass().absent,t.isAbsent())return t}else{if(t=t.getIfPresent(r),t.isAbsent())return t;n>-1&&(t=this.getClass().fromNullable(t.value[n]))}}return t}match(e){return!this.isAbsent()&&e(this.value)}get(e=o.absent){return this.isAbsent()?this.getClass().fromNullable(e).flatMap():this.getClass().fromNullable(this.value).flatMap()}toJson(){return JSON.stringify(this.value)}getClass(){return o}arrayIndex(e){let t=e.indexOf("["),l=e.indexOf("]");return t>=0&&l>0&&t<l?parseInt(e.substring(t+1,l)):-1}keyVal(e){let t=e.indexOf("[");return t>=0?e.substring(0,t):e}getIfPresent(e){return this.isAbsent()?this.getClass().absent:this.getClass().fromNullable(this.value[e]).flatMap()}resolve(e){if(this.isAbsent())return o.absent;try{return o.fromNullable(e(this.value))}catch(e){return o.absent}}preprocessKeys(...e){return new n.Es2019Array(...e).flatMap((e=>new n.Es2019Array(...e.split(/]\s*\[/gi)).map((e=>(-1==(e=e.replace(/^\s+|\s+$/g,"")).indexOf("[")&&-1!=e.indexOf("]")&&(e="["+e),-1==e.indexOf("]")&&-1!=e.indexOf("[")&&(e+="]"),e)))))}}o.absent=o.fromNullable(null);class a extends o{constructor(e,t="value"){super(e),this.key=t}get value(){return this._value?this._value[this.key]:null}set value(e){this._value&&(this._value[this.key]=e)}orElse(e){let t={};return t[this.key]=e,this.isPresent()?this:new a(t,this.key)}orElseLazy(e){if(this.isPresent())return this;{let t={};return t[this.key]=e(),new a(t,this.key)}}getClass(){return a}static fromNullable(e,t="value"){return new a(e,t)}}a.absent=a.fromNullable(null);class u extends a{constructor(e,t,l){super(e,t),this.arrPos=null!=l?l:-1}get value(){return""==this.key&&this.arrPos>=0?this._value[this.arrPos]:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]:this._value[this.key]}set value(e){""==this.key&&this.arrPos>=0?this._value[this.arrPos]=e:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]=e:this._value[this.key]=e}}u.absent=u.fromNullable(null);class h extends o{constructor(e,t){super(e),this.configDef=t}get shallowCopy(){return this.shallowCopy$()}shallowCopy$(){let e=new h({});return e.shallowMerge(this.value),e}get deepCopy(){return this.deepCopy$()}deepCopy$(){return new h(s({},this.value))}static fromNullable(e){return new h(e)}shallowMerge(e,t=!0,l=!1){for(let r in e.value)void 0!==r&&null!=r&&(!t&&r in this.value||(l?Array.isArray(e.getIf(r).value)?new n.Es2019Array(...e.getIf(r).value).forEach((e=>this.append(r).value=e)):this.append(r).value=e.getIf(r).value:this.assign(r).value=e.getIf(r).value))}append(...e){if(e.length<1)return;this.assertAccessPath(...e);let t=e[e.length-1],l=this.getIf(...e).isPresent();this.buildPath(...e);let r=this.arrayIndex(t);if(r>-1)throw Error("Append only possible on non array properties, use assign on indexed data");let n=this.getIf(...e).value;return Array.isArray(n)||(n=this.assign(...e).value=[n]),l&&n.push({}),r=n.length-1,new u(1==e.length?this.value:this.getIf.apply(this,e.slice(0,e.length-1)).value,t,r)}appendIf(e,...t){return e?this.append(...t):{value:null}}assign(...e){if(e.length<1)return;this.assertAccessPath(...e),this.buildPath(...e);let t=this.keyVal(e[e.length-1]),l=this.arrayIndex(e[e.length-1]);return new u(1==e.length?this.value:this.getIf.apply(this,e.slice(0,e.length-1)).value,t,l)}assignIf(e,...t){return e?this.assign(...t):{value:null}}getIf(...e){return this.assertAccessPath(...e),this.getClass().fromNullable(super.getIf.apply(this,e).value)}get(e){return this.getClass().fromNullable(super.get(e).value)}delete(e){return e in this.value&&delete this.value[e],this}toJson(){return JSON.stringify(this.value)}getClass(){return h}setVal(e){this._value=e}assertAccessPath(...e){var t,l,r,s,i,a,u,h,c;if(e=this.preprocessKeys(...e),!this.configDef)return;let d=o.fromNullable(Object.keys(this.configDef).map((e=>{let t={};return t[e]=this.configDef[e],t})));for(let f=0;f<e.length;f++){let v=this.keyVal(e[f]),p=this.arrayIndex(e[f]);if(d=this.isArray(p)?""!=v?Array.isArray(d.value)?o.fromNullable(null===(l=null===(t=new n.Es2019Array(...d.value).find((e=>{var t;return!(null===(t=null==e?void 0:e[v])||void 0===t||!t)})))||void 0===t?void 0:t[v])||void 0===l?void 0:l[p]):o.fromNullable(null!==(i=null===(s=null===(r=d.value)||void 0===r?void 0:r[v])||void 0===s?void 0:s[p])&&void 0!==i?i:null):Array.isArray(d.value)?o.fromNullable(null===(a=d.value)||void 0===a?void 0:a[p]):o.absent:Array.isArray(d.value)?o.fromNullable(null===(u=new n.Es2019Array(...d.value).find((e=>{var t;return!(null===(t=null==e?void 0:e[v])||void 0===t||!t)})))||void 0===u?void 0:u[v]):o.fromNullable(null!==(c=null===(h=d.value)||void 0===h?void 0:h[v])&&void 0!==c?c:null),!d.isPresent())throw Error("Access Path to config invalid");if("__ANY_POINT__"==d.value)return}}buildPath(...e){e=this.preprocessKeys(...e);let t=this,l=this.getClass().fromNullable(null),r=-1,n=function(e,t){let l=e.length,r=l+t;for(let t=l;t<r;t++)e.push({})};for(let s=0;s<e.length;s++){let i=this.keyVal(e[s]),o=this.arrayIndex(e[s]);if(this.isArrayPos(i,o)){t.setVal(t.value instanceof Array?t.value:[]),n(t.value,o+1),r>=0&&(l.value[r]=t.value),l=t,r=o,t=this.getClass().fromNullable(t.value[o]);continue}let a=t.getIf(i);if(this.isNoArray(o))a.isAbsent()?a=this.getClass().fromNullable(t.value[i]={}):t=a;else{let e=a.value instanceof Array?a.value:[];n(e,o+1),t.value[i]=e,a=this.getClass().fromNullable(e[o])}l=t,r=o,t=a}return this}isNoArray(e){return-1==e}isArray(e){return!this.isNoArray(e)}isArrayPos(e,t){return""===e&&t>=0}}},255:function(e,t,l){l.d(t,{dD:function(){return r}});var r;l(152),l(484);!function(e){e.EO_STRM="__EO_STRM__",e.BEF_STRM="___BEF_STRM__"}(r||(r={}))}},t={};function l(r){var n=t[r];if(void 0!==n)return n.exports;var s=t[r]={exports:{}};return e[r](s,s.exports,l),s.exports}l.d=function(e,t){for(var r in t)l.o(t,r)&&!l.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},l.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};return function(){l.r(r),l.d(r,{DQ:function(){return y},DQ$:function(){return b},DomQuery:function(){return g},DomQueryCollector:function(){return m},ElementAttribute:function(){return f},Style:function(){return v}});var e,t=l(152),n=l(255),s=l(805),i=l(456),o=l(484),a=function(e,t,l,r){return new(l||(l=Promise))((function(n,s){function i(e){try{a(r.next(e))}catch(e){s(e)}}function o(e){try{a(r.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?n(e.value):(t=e.value,t instanceof l?t:new l((function(e){e(t)}))).then(i,o)}a((r=r.apply(e,t||[])).next())}))},u=s.Lang.trim,h=s.Lang.isString,c=s.Lang.equalsIgnoreCase,d=s.Lang.objToArray;!function(e){e.SELECT="select",e.BUTTON="button",e.SUBMIT="submit",e.RESET="reset",e.IMAGE="image",e.RADIO="radio",e.CHECKBOX="checkbox"}(e||(e={}));class f extends t.ValueEmbedder{constructor(e,t,l=null){super(e,t),this.element=e,this.name=t,this.defaultVal=l}get value(){let e=this.element.get(0).orElse().values;return e.length?e[0].getAttribute(this.name):this.defaultVal}set value(e){let t=this.element.get(0).orElse().values;for(let l=0;l<t.length;l++)t[l].setAttribute(this.name,e);t[0].setAttribute(this.name,e)}getClass(){return f}static fromNullable(e,t="value"){return new f(e,t)}}class v extends t.ValueEmbedder{constructor(e,t,l=null){super(e,t),this.element=e,this.name=t,this.defaultVal=l}get value(){let e=this.element.values;return e.length?e[0].style[this.name]:this.defaultVal}set value(e){let t=this.element.values;for(let l=0;l<t.length;l++)t[l].style[this.name]=e}getClass(){return f}static fromNullable(e,t="value"){return new f(e,t)}}const p=()=>!0;class g{constructor(...e){if(this.rootNode=[],this.pos=-1,this._limits=-1,!t.Optional.fromNullable(e).isAbsent()&&e.length)for(let t=0;t<e.length;t++)if(e[t])if(h(e[t])){let l=g.querySelectorAll(e[t]);l.isAbsent()||e.push(...l.values)}else e[t]instanceof g?this.rootNode.push(...e[t].values):this.rootNode.push(e[t]);else;}get value(){return this.getAsElem(0)}get values(){return this.allElems()}get global(){return i.R}get id(){return new f(this.get(0),"id")}get length(){return this.rootNode.length}get tagName(){return this.getAsElem(0).getIf("tagName")}get nodeName(){return this.getAsElem(0).getIf("nodeName")}isTag(e){return!this.isAbsent()&&(this.nodeName.orElse("__none___").value.toLowerCase()==e.toLowerCase()||this.tagName.orElse("__none___").value.toLowerCase()==e.toLowerCase())}get type(){return this.getAsElem(0).getIf("type")}get name(){return new t.ValueEmbedder(this.getAsElem(0).value,"name")}get inputValue(){return this.getAsElem(0).getIf("value").isPresent()?new t.ValueEmbedder(this.getAsElem(0).value):t.ValueEmbedder.absent}get val(){return this.inputValue.value}set val(e){this.inputValue.value=e}get nodeId(){return this.id.value}set nodeId(e){this.id.value=e}get checked(){return new o.Es2019Array(...this.values).every((e=>!!e.checked))}set checked(e){this.eachElem((t=>t.checked=e))}get elements(){return this.querySelectorAll("input, checkbox, select, textarea, fieldset")}get deepElements(){return this.querySelectorAllDeep("input, select, textarea, checkbox, fieldset")}querySelectorAllDeep(e){let t=[],l=this.querySelectorAll(e);l.length&&t.push(l);let r=this.querySelectorAll("*").shadowRoot;if(r.length){let l=r.querySelectorAllDeep(e);l.length&&t.push(l)}return new g(...t)}get disabled(){return this.attr("disabled").isPresent()}set disabled(e){e?this.attr("disabled").value="disabled":this.removeAttribute("disabled")}removeAttribute(e){this.eachElem((t=>t.removeAttribute(e)))}get childNodes(){let e=[];return this.eachElem((t=>{e=e.concat(d(t.childNodes))})),new g(...e)}get asArray(){return new o.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>g.byId(e)))}get offsetWidth(){return new o.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>e.offsetWidth)).reduce(((e,t)=>e+t),0)}get offsetHeight(){return new o.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>e.offsetHeight)).reduce(((e,t)=>e+t),0)}get offsetLeft(){return new o.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>e.offsetLeft)).reduce(((e,t)=>e+t),0)}get offsetTop(){return new o.Es2019Array(this.rootNode).filter((e=>null!=e)).map((e=>e.offsetTop)).reduce(((e,t)=>e+t),0)}get asNodeArray(){return new o.Es2019Array(...this.rootNode.filter((e=>null!=e)))}static querySelectorAllDeep(e){return new g(document).querySelectorAllDeep(e)}static querySelectorAll(e){return-1!=e.indexOf("/shadow/")?new g(document)._querySelectorAllDeep(e):new g(document)._querySelectorAll(e)}static byId(e,t=!1){return h(e)?t?new g(document).byIdDeep(e):new g(document).byId(e):new g(e)}static byTagName(e){return h(e)?new g(document).byTagName(e):new g(e)}static globalEval(e,t){return new g(document).globalEval(e,t)}static globalEvalSticky(e,t){return new g(document).globalEvalSticky(e,t)}static fromMarkup(e){const t=document.implementation.createHTMLDocument("");let l=(e=u(e)).toLowerCase();if(-1!=l.search(/\<\!doctype[^\w\-]+/gi)||-1!=l.search(/\<html[^\w\-]+/gi)||-1!=l.search(/\<head[^\w\-]+/gi)||-1!=l.search(/\<body[^\w\-]+/gi))return t.documentElement.innerHTML=e,new g(t.documentElement);{let t=function(e,t){let l=["<",t,">"].join(""),r=["<",t," "].join("");return 0==e.indexOf(l)||0==e.indexOf(r)},r=new g(document.createElement("div"));return t(l,"thead")||t(l,"tbody")?(r.html(`<table>${e}</table>`),r.querySelectorAll("table").get(0).childNodes.detach()):t(l,"tfoot")?(r.html(`<table><thead></thead><tbody><tbody${e}</table>`),r.querySelectorAll("table").get(2).childNodes.detach()):t(l,"tr")?(r.html(`<table><tbody>${e}</tbody></table>`),r.querySelectorAll("tbody").get(0).childNodes.detach()):t(l,"td")?(r.html(`<table><tbody><tr>${e}</tr></tbody></table>`),r.querySelectorAll("tr").get(0).childNodes.detach()):(r.html(e),r.childNodes.detach())}}get(e){return e<this.rootNode.length?new g(this.rootNode[e]):g.absent}getAsElem(e,l=t.Optional.absent){return e<this.rootNode.length?t.Optional.fromNullable(this.rootNode[e]):l}filesFromElem(e){var t;return e<this.rootNode.length&&(null===(t=this.rootNode[e])||void 0===t?void 0:t.files)?this.rootNode[e].files:[]}allElems(){return this.rootNode}isAbsent(){return 0==this.length}isPresent(e){let t=this.isAbsent();return!t&&e&&e.call(this,this),!t}ifPresentLazy(e=function(){}){return this.isPresent.call(this,e),this}delete(){this.eachElem((e=>{e.parentNode&&e.parentNode.removeChild(e)}))}querySelectorAll(e){return-1!=e.indexOf("/shadow/")?this._querySelectorAllDeep(e):this._querySelectorAll(e)}closest(e){return-1!=e.indexOf("/shadow/")?this._closestDeep(e):this._closest(e)}byId(e,t){let l=[];return t&&(l=l.concat(...new o.Es2019Array(...(null==this?void 0:this.rootNode)||[]).filter((t=>e==t.id)).map((e=>new g(e))))),l=l.concat(this.querySelectorAll(`[id="${e}"]`)),new g(...l)}byIdDeep(e,t){let l=[];t&&(l=l.concat(new o.Es2019Array(...(null==this?void 0:this.rootNode)||[]).filter((t=>e==t.id)).map((e=>new g(e)))));let r=this.querySelectorAllDeep(`[id="${e}"]`);return r.length&&l.push(r),new g(...l)}byTagName(e,t,l){var r;let n=[];return t&&(n=new o.Es2019Array(...null!==(r=null==this?void 0:this.rootNode)&&void 0!==r?r:[]).filter((t=>(null==t?void 0:t.tagName)==e)).reduce(((e,t)=>e.concat([t])),n)),l?n.push(this.querySelectorAllDeep(e)):n.push(this.querySelectorAll(e)),new g(...n)}attr(e,t=null){return new f(this,e,t)}style(e,t=null){return new v(this,e,t)}hasClass(e){let t=!1;return this.eachElem((l=>{if(t=l.classList.contains(e),t)return!1})),t}addClass(e){return this.eachElem((t=>t.classList.add(e))),this}removeClass(e){return this.eachElem((t=>t.classList.remove(e))),this}isMultipartCandidate(e=!1){const t="input[type='file']";return this.matchesSelector(t)||(e?this.querySelectorAllDeep(t):this.querySelectorAll(t)).first().isPresent()}html(e){return t.Optional.fromNullable(e).isAbsent()?this.isPresent()?t.Optional.fromNullable(this.innerHTML):t.Optional.absent:(this.innerHTML=e,this)}dispatchEvent(e){return this.eachElem((t=>t.dispatchEvent(e))),this}set innerHTML(e){this.eachElem((t=>t.innerHTML=e))}get innerHTML(){let e=[];return this.eachElem((t=>e.push(t.innerHTML))),e.join("")}set innerHtml(e){this.innerHTML=e}get innerHtml(){return this.innerHTML}filterSelector(e){let t=[];return this.eachElem((l=>{this._mozMatchesSelector(l,e)&&t.push(l)})),new g(...t)}matchesSelector(e){return this.asArray.some((t=>this._mozMatchesSelector(t.getAsElem(0).value,e)))}getIf(...e){let t=this.childNodes;for(let l=0;l<e.length;l++)if(t=t.filterSelector(e[l]),t.isAbsent())return t;return t}eachElem(e){for(let t=0,l=this.rootNode.length;t<l&&!1!==e(this.rootNode[t],t);t++);return this}firstElem(e=(e=>e)){return this.rootNode.length>1&&e(this.rootNode[0],0),this}lastElem(e=(e=>e)){return this.rootNode.length>1&&e(this.rootNode[this.rootNode.length-1],0),this}each(e){return new o.Es2019Array(...this.rootNode).forEach(((t,l)=>{if(null!=t)return e(g.byId(t),l)})),this}replace(e){return this.each((t=>{let l=t.getAsElem(0).value,r=l.parentElement,n=l.nextElementSibling,s=l.previousElementSibling;null!=n?new g(n).insertBefore(e):s?new g(s).insertAfter(e):new g(r).append(e),t.delete()})),e}first(e=(e=>e)){return this.rootNode.length>=1?(e(this.get(0),0),this.get(0)):this}last(e=(e=>e)){if(this.rootNode.length>=1){let t=this.get(this.rootNode.length-1);return e(t,0),t}return this}filter(e){let t=[];return this.each((l=>{e(l)&&t.push(l)})),new g(...t)}globalEval(e,t){var l,r,n;const s=null!==(r=null===(l=document.getElementsByTagName("head"))||void 0===l?void 0:l[0])&&void 0!==r?r:null===(n=document.documentElement.getElementsByTagName("head"))||void 0===n?void 0:n[0],i=document.createElement("script");t&&(void 0!==(null==i?void 0:i.nonce)?i.nonce=t:i.setAttribute("nonce",t)),i.type="text/javascript",i.innerHTML=e;let o=s.appendChild(i);return s.removeChild(o),this}globalEvalSticky(e,t){let l=document.getElementsByTagName("head")[0]||document.documentElement,r=document.createElement("script");return this.applyNonce(t,r),r.type="text/javascript",r.innerHTML=e,l.appendChild(r),this}detach(){return this.eachElem((e=>{e.parentNode.removeChild(e)})),this}appendTo(e){return s.Lang.isString(e)?(this.appendTo(g.querySelectorAll(e)),this):(this.eachElem((t=>{e.getAsElem(0).orElseLazy((()=>({appendChild:()=>{}}))).value.appendChild(t)})),this)}loadScriptEval(e,t=0,l){return this._loadScriptEval(!1,e,t,l),this}loadScriptEvalSticky(e,t=0,l){return this._loadScriptEval(!0,e,t,l),this}insertAfter(...e){this.each((t=>{let l=t.getAsElem(0).value,r=l.parentNode;for(let t=0;t<e.length;t++){let n=l.nextSibling;e[t].eachElem((e=>{n?(r.insertBefore(e,n),l=n):r.appendChild(e)}))}}));let t=[];return t.push(this),t=t.concat(e),new g(...t)}insertBefore(...e){this.each((t=>{let l=t.getAsElem(0).value,r=l.parentNode;for(let t=0;t<e.length;t++)e[t].eachElem((e=>{r.insertBefore(e,l)}))}));let t=[];return t.push(this),t=t.concat(e),new g(...t)}orElse(...e){return this.isPresent()?this:new g(...e)}orElseLazy(e){return this.isPresent()?this:new g(e())}allParents(e){let t=this.parent(),l=[];for(;t.isPresent();)t.matchesSelector(e)&&l.push(t),t=t.parent();return new g(...l)}firstParent(e){let t=this.parent();for(;t.isPresent();){if(t.matchesSelector(e))return t;t=t.parent()}return g.absent}parentsWhileMatch(e){const t=[];let l=this.parent().filter((t=>t.matchesSelector(e)));for(;l.isPresent();)t.push(l),l=l.parent().filter((t=>t.matchesSelector(e)));return new g(...t)}parent(){let e=[];return this.eachElem((t=>{let l=t.parentNode||t.host||t.shadowRoot;l&&-1==e.indexOf(l)&&e.push(l)})),new g(...e)}copyAttrs(e){return e.eachElem((e=>{let t=d(e.attributes);for(let e of t){let t=e.value,l=e.name;switch(l){case"id":this.id.value=t;break;case"disabled":this.resolveAttributeHolder("disabled").disabled=t;break;case"checked":this.resolveAttributeHolder("checked").checked=t;break;default:this.attr(l).value=t}}})),this}outerHTML(e,t,l,r=!1){var n;if(this.isAbsent())return;let s=null===(n=null===document||void 0===document?void 0:document.activeElement)||void 0===n?void 0:n.id,i=s?g.getCaretPosition(document.activeElement):null,o=g.fromMarkup(e),a=[],u=this.getAsElem(0).value,h=o.get(0),c=u.parentNode,d=h.getAsElem(0).value;if(c.replaceChild(d,u),a.push(new g(d)),this.isAbsent())return this;let f=[];o.length>1&&(f=f.concat(...o.values.slice(1)),a.push(g.byId(d).insertAfter(new g(...f)))),t&&this.runScripts(),l&&this.runCss();let v=g.byId(s);return s&&v.isPresent()&&null!=i&&void 0!==i&&v.eachElem((e=>g.setCaretPosition(e,i))),o}runScripts(e=!1,t=p){const l=t=>{if(t.length){let l=[];new o.Es2019Array(...t).forEach((t=>{t.nonce?(l.length&&(this.globalEval(l.join("\n")),l.length=0),e?this.globalEvalSticky(t.evalText,t.nonce):this.globalEval(t.evalText,t.nonce)):l.push(t.evalText)})),l.length&&(e?this.globalEvalSticky(l.join("\n")):this.globalEval(l.join("\n")),l.length=0),t=[]}return t};let r=[],n=["","script","text/javascript","text/ecmascript","ecmascript"],s=s=>{var i,o,a,h;let d=s.tagName,f=(null!==(i=null==s?void 0:s.type)&&void 0!==i?i:"").toLowerCase();if(d&&c(d,"script")&&-1!=n.indexOf(f)){let n=s.getAttribute("src");if(void 0!==n&&null!=n&&n.length>0){let i=null!==(o=null==s?void 0:s.nonce)&&void 0!==o?o:s.getAttribute("nonce").value;t(n)&&(r=l(r),e?i?this.loadScriptEvalSticky(n,0,i):this.loadScriptEvalSticky(n,0):i?this.loadScriptEval(n,0,i):this.loadScriptEval(n,0))}else{let e=u(s.text||s.innerText||s.innerHTML),t=!0;for(;t;)t=!1,"\x3c!--"==e.substring(0,4)&&(e=e.substring(4),t=!0),"//\x3c!--"==e.substring(0,4)&&(e=e.substring(6),t=!0),"//<![CDATA["==e.substring(0,11)&&(e=e.substring(11),t=!0);let l=null!==(h=null!==(a=null==s?void 0:s.nonce)&&void 0!==a?a:s.getAttribute("nonce").value)&&void 0!==h?h:"";r.push({nonce:l,evalText:e})}}};try{new g(this.filterSelector("script"),this.querySelectorAll("script")).asArray.flatMap((e=>[...e.values])).sort(((e,t)=>e.compareDocumentPosition(t)-3)).forEach((e=>s(e))),l(r)}catch(e){console&&console.error&&console.error(e.message||e.description)}finally{s=null}return this}runCss(){return new g(this.filterSelector("link, style"),this.querySelectorAll("link, style")).asArray.flatMap((e=>[...e.values])).sort(((e,t)=>e.compareDocumentPosition(t)-3)).forEach((e=>(e=>{const t=g.byId(e),l=t.tagName.orElse("").value,r=g.byTagName("head");if(l&&c(l,"link")&&c(e.getAttribute("rel"),"stylesheet")){const l=e.getAttribute("rel"),n=r.querySelectorAll(`link[rel='stylesheet'][href='${l}']`);n.length?n.replace(t):r.append(t)}else if(l&&c(l,"style")){let e=t.innerHTML.replace(/\s+/gi,""),l=r.querySelectorAll("style"),n=l.asArray.filter((t=>t.innerHTML.replace(/\s+/gi,"")==e));l=new g(...n),l.length||r.append(t)}})(e))),this}click(){return this.fireEvent("click"),this}addEventListener(e,t,l){return this.eachElem((r=>r.addEventListener(e,t,l))),this}removeEventListener(e,t,l){return this.eachElem((r=>r.removeEventListener(e,t,l))),this}fireEvent(e,l={}){let r=new t.Config({bubbles:!0,cancelable:!0});r.shallowMerge(new t.Config(l)),r=JSON.parse(r.toJson()),this.eachElem((t=>{let l;if(t.ownerDocument)l=t.ownerDocument;else{if(9!=t.nodeType)throw new Error("Invalid node passed to fireEvent: "+t.id);l=t}if(t.dispatchEvent){let l=Event;switch(e){case"click":case"mousedown":case"mouseup":case"mousemove":l=this.global().MouseEvent;break;case"keyup":case"keydown":case"keypress":l=this.global().KeyboardEvent;break;case"focus":case"change":case"blur":case"select":break;default:throw"fireEvent: Couldn't find an event class for event '"+e+"'."}let n=new l(e,r);n.synthetic=!0,t.dispatchEvent(n)}else if(t.fireEvent){let n=l.createEventObject();n.synthetic=!0,Object.keys(r).forEach((e=>n[e]=r[e])),t.fireEvent("on"+e,n)}}))}textContent(e=""){return this.asArray.map((e=>e.getAsElem(0).orElseLazy((()=>({textContent:""}))).value.textContent||"")).reduce(((t,l)=>[t,e,l].join("")),"")}innerText(e=""){return this.asArray.map((e=>e.getAsElem(0).orElseLazy((()=>({innerText:""}))).value.innerText||"")).reduce(((t,l)=>[t,l].join(e)),"")}encodeFormElement(l=new t.Config({})){if(this.name.isAbsent())return;let r=l.shallowCopy;return this.each((t=>{var l,n;if(t.name.isAbsent())return;let s=t.name.value,i=t.tagName.orElse("__none__").value.toLowerCase(),o=t.type.orElse("__none__").value.toLowerCase();if(o=o.toLowerCase(),("input"==i||"textarea"==i||"select"==i)&&null!=s&&""!=s&&!t.disabled){if("select"==i){let e=t.getAsElem(0).value;if(e.selectedIndex>=0){let t=e.options.length;for(let l=0;l<t;l++)if(e.options[l].selected){let t=e.options[l];r.append(s).value=null!=t.getAttribute("value")?t.value:t.text}}}if(i!=e.SELECT&&o!=e.BUTTON&&o!=e.RESET&&o!=e.SUBMIT&&o!=e.IMAGE&&(o!=e.CHECKBOX&&o!=e.RADIO||t.checked)){let e=null===(n=null===(l=t.value)||void 0===l?void 0:l.value)||void 0===n?void 0:n.files,i=null!=e?e:[];if(null==i?void 0:i.length)r.assign(s).value=Array.from(i);else{if(e)return;r.append(s).value=t.inputValue.value}}}})),r}get cDATAAsString(){return this.asArray.flatMap((e=>e.childNodes.asArray)).filter((e=>{var t,l;return 4==(null===(l=null===(t=null==e?void 0:e.value)||void 0===t?void 0:t.value)||void 0===l?void 0:l.nodeType)})).reduce(((e,t)=>{var l,r,n;return e.push(null!==(n=null===(r=null===(l=null==t?void 0:t.value)||void 0===l?void 0:l.value)||void 0===r?void 0:r.data)&&void 0!==n?n:""),e}),[]).join("")}subNodes(e,l){return t.Optional.fromNullable(l).isAbsent()&&(l=this.length),new g(...this.rootNode.slice(e,Math.min(l,this.length)))}limits(e){return this._limits=e,this}hasNext(){let e=-1!=this._limits&&this.pos>=this._limits-1,t=this.pos>=this.values.length-1;return!(e||t)}next(){return this.hasNext()?(this.pos++,new g(this.values[this.pos])):null}lookAhead(e=1){return this.values.length-1<this.pos+e?n.dD.EO_STRM:new g(this.values[this.pos+e])}current(){return-1==this.pos?n.dD.BEF_STRM:new g(this.values[this.pos])}reset(){this.pos=-1}attachShadow(e={mode:"open"}){let t=[];return this.eachElem((l=>{let r;if(!(null==l?void 0:l.attachShadow))throw new Error("Shadow dom creation not supported by the browser, please use a shim, to gain this functionality");r=g.byId(l.attachShadow(e)),t.push(r)})),new g(...t)}waitUntilDom(e,t={attributes:!0,childList:!0,subtree:!0,timeout:500,interval:100}){return a(this,void 0,void 0,(function*(){return function(e,t,l={attributes:!0,childList:!0,subtree:!0,timeout:500,interval:100}){return new Promise(((r,n)=>{let s=null;const i=new Error("Mutation observer timeout");function o(e,t){let r=null;return t(e)?e:(r=l.childList?t(e)?e:e.childNodes.filter((e=>t(e))).first().value.value:l.subtree?t(e)?e:e.querySelectorAll(" * ").filter((e=>t(e))).first().value.value:t(e)?e:null,r)}let a=e;if(a=o(a,t))r(new g(a));else if("undefined"!=typeof MutationObserver){const o=setTimeout((()=>(s.disconnect(),n(i))),l.timeout),a=l=>{const n=new g(l.map((e=>e.target))).filter((e=>t(e))).first();n.isPresent()&&(clearTimeout(o),s.disconnect(),r(new g(n||e)))};s=new MutationObserver(a);let u=Object.assign({},l);delete u.timeout,e.eachElem((e=>{s.observe(e,u)}))}else{let s=setInterval((()=>{let l=o(e,t);l&&(a&&(clearTimeout(a),clearInterval(s),s=null),r(new g(l||e)))}),l.interval),a=setTimeout((()=>{s&&(clearInterval(s),n(i))}),l.timeout)}}))}(this,e,t)}))}get shadowElements(){let e=(this.querySelectorAll("*").filter((e=>e.hasShadow)).allElems()||[]).map((e=>e.shadowRoot));return new g(...e)}get shadowRoot(){let e=[];for(let t=0;t<this.rootNode.length;t++)this.rootNode[t].shadowRoot&&e.push(this.rootNode[t].shadowRoot);return new g(...e)}get hasShadow(){for(let e=0;e<this.rootNode.length;e++)if(this.rootNode[e].shadowRoot)return!0;return!1}static getCaretPosition(e){let t=0;try{if(null===document||void 0===document?void 0:document.selection){e.focus();let l=document.selection.createRange();l.moveStart("character",-e.value.length),t=l.text.length}}catch(e){}return t}static setCaretPosition(e,t){(null==e?void 0:e.focus)&&(null==e||e.focus()),(null==e?void 0:e.setSelectiongRange)&&(null==e||e.setSelectiongRange(t,t))}[Symbol.iterator](){return{next:()=>({done:!this.hasNext(),value:this.next()})}}concat(e,t=!0){const l=new g(...this.asArray.concat(e.asArray));if(!t)return l;let r={};return new g(...l.asArray.filter((e=>{const t=!(null==r?void 0:r[e.value.value.outerHTML]);return r[e.value.value.outerHTML]=!0,t})))}append(e){return this.each((t=>e.appendTo(t))),this}prependTo(e){return e.eachElem((e=>{e.prepend(...this.allElems())})),this}prepend(e){return this.eachElem((t=>{t.prepend(...e.allElems())})),this}_querySelectorAll(e){var t,l;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let r=[];for(let t=0;t<this.rootNode.length;t++){if(!(null===(l=this.rootNode[t])||void 0===l?void 0:l.querySelectorAll))continue;let n=this.rootNode[t].querySelectorAll(e);r=r.concat(d(n))}return new g(...r)}_querySelectorAllDeep(e){var t;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let l=new g(...this.rootNode),r=e.split(/\/shadow\//);for(let e=0;e<r.length;e++){if(""==r[e])continue;let t=r[e];l=l.querySelectorAll(t),e<r.length-1&&(l=l.shadowRoot)}return l}_closest(e){var t,l;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let r=[];for(let t=0;t<this.rootNode.length;t++){if(!(null===(l=this.rootNode[t])||void 0===l?void 0:l.closest))continue;let n=[this.rootNode[t].closest(e)];r=r.concat(...n)}return new g(...r)}_closestDeep(e){var t;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let l=new g(...this.rootNode),r=e.split(/\/shadow\//);for(let e=0;e<r.length;e++){if(""==r[e])continue;let t=r[e];l=l.closest(t),e<r.length-1&&(l=l.shadowRoot)}return l}_mozMatchesSelector(e,t){let l=e;return(l.matches||l.matchesSelector||l.mozMatchesSelector||l.msMatchesSelector||l.oMatchesSelector||l.webkitMatchesSelector||function(t){let l=(document||ownerDocument).querySelectorAll(t),r=l.length;for(;--r>=0&&l.item(r)!==e;);return r>-1}).call(e,t)}_loadScriptEval(e,t,l=0,r){let n=this.createSourceNode(t,r),s=this.createSourceNode(null,r),i=`nonce_${Date.now()}_${Math.random()}`;s.innerHTML=`document.head["${i}"] = true`;let o=document.head;if(o.appendChild(s),o.removeChild(s),o[i]){try{l?setTimeout((()=>{o.appendChild(n),e||o.removeChild(n)}),l):(o.appendChild(n),e||o.removeChild(n))}finally{delete o[i]}return this}}resolveAttributeHolder(e="value"){let t=[];return t[e]=null,e in this.getAsElem(0).value?this.getAsElem(0).value:t}createSourceNode(e,t){let l=document.createElement("script");return l.type="text/javascript",t&&(void 0!==(null==l?void 0:l.nonce)?l.nonce=t:l.setAttribute("nonce",t)),e&&(l.src=e),l}applyNonce(e,t){e&&(void 0!==(null==t?void 0:t.nonce)?t.nonce=e:t.setAttribute("nonce",e))}}g.absent=new g,g.global=i.R;class m{constructor(){this.data=[]}collect(e){this.data.push(e)}get finalValue(){return new g(...this.data)}}const y=g,b=g.querySelectorAll}(),r}()}));
//# sourceMappingURL=DomQuery.js.map