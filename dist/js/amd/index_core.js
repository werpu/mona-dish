define((function(){return function(){"use strict";var e={447:function(e,t,r){r.r(t),r.d(t,{append:function(){return i},appendIf:function(){return a},assign:function(){return s},assignIf:function(){return o},buildPath:function(){return v},deepCopy:function(){return p},deepEqual:function(){return y},resolve:function(){return u},shallowMerge:function(){return m},simpleShallowMerge:function(){return g}});var n=r(484);class l{constructor(e){this.parent=e}set value(e){}get value(){return this.parent}}function s(e,...t){if(t.length<1)return new l(e);const r=v(e,...t);return new class{set value(e){r.target[r.key]=e}get value(){return r.target[r.key]}}}function i(e,...t){if(t.length<1)return new l(e);const r=v(e,...t);return new class{set value(e){Array.isArray(e)||(e=[e]),r.target[r.key]?(Array.isArray(r.target[r.key])||(r.target[r.key]=[r.target[r.key]]),r.target[r.key].push(...e)):r.target[r.key]=e}}}function o(e,t,...r){return!e||r.length<1?new l(t):s(t,...r)}function a(e,t,...r){return!e||r.length<1?new l(t):i(t,...r)}function u(e,...t){let r=null;t=f(t);let n=e;for(let e=0;e<t.length;e++){let l=t[e];if(l=-1!=c(l)?c(l):l,n=null==n?void 0:n[l],void 0===n)return null;r=n}return n}function h(e){let t=e.indexOf("[");return t>=0?e.substring(0,t):e}function c(e){let t=e.indexOf("["),r=e.indexOf("]");return t>=0&&r>0&&t<r?parseInt(e.substring(t+1,r)):-1}function d(e,t,r={}){let n=[];n.length=t,n[t-1]=r,e.push(...n)}function f(e){return new n.Es2019Array(...e).flatMap((e=>e.split("["))).map((e=>-1!=e.indexOf("]")?"["+e:e)).filter((e=>""!=e))}function v(e,...t){t=f(t);let r=e,n=null,l=null,s=-1;for(let e=0;e<t.length;e++)if(l=h(t[e]),s=c(t[e]),-1!=s){if(!Array.isArray(r))throw Error("Associative array referenced as index array in path reference");let l=-1;e<t.length-1&&(l=c(t[e+1]));let i=void 0!==(null==r?void 0:r[s]);d(r,s+1,-1!=l?[]:{}),n=s,e==t.length-1?r[s]=i?r[s]:null:r=r[s]}else{if(Array.isArray(r))throw Error("Index array referenced as associative array in path reference");let s=-1;e<t.length-1&&(s=c(t[e+1])),n=l;let i=void 0!==(null==r?void 0:r[l]);e==t.length-1?i||(r[l]=null):(i||(r[l]=-1==s?{}:[]),r=r[l])}return{target:r,key:n}}function p(e){return JSON.parse(JSON.stringify(e))}function g(...e){return m(!0,!1,...e)}function m(e=!0,t=!1,...r){let l={};return new n.Es2019Array(...r).map((e=>({arr:e,keys:Object.keys(e)}))).forEach((({arr:r,keys:s})=>{s.forEach((s=>{let i=r[s];!Array.isArray(i)&&t&&(i=new n.Es2019Array(...[i])),e||!(null==l?void 0:l[s])?function(e,t,r,l,s){if(e)if(void 0===(null==t?void 0:t[r]))t[r]=s;else if(Array.isArray(t[r])){let e=t[r],n=[];s.forEach((t=>{-1==e.indexOf(t)&&n.push(t)})),t[r].push(...n)}else{let e=t[r],l=[];s.forEach((t=>{e!=t&&l.push(t)})),t[r]=new n.Es2019Array(...[]),t[r].push(e),t[r].push(...l)}else t[r]=l[r]}(t,l,s,r,i):!e&&(null==l?void 0:l[s])&&function(e,t,r,l,s){if(e)if(void 0===(null==t?void 0:t[r]))t[r]=s;else if(Array.isArray(t[r]))t[r].push(...s);else{let e=t[r];t[r]=new n.Es2019Array(...[]),t[r].push(e),t[r].push(...s)}}(t,l,s,0,i)}))})),l}function y(e,t){if(e==t)return!1;if(typeof e!=typeof t)return!1;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!=t.length)return;return e.every(((e,r)=>y(e,t[r])))}if("object"==typeof e&&"object"==typeof t){let r=Object.keys(e),n=Object.keys(t);return r.length==n.length&&(r.every((e=>-1!=n.indexOf(e)))&&r.every((r=>y(e[r],t[r]))))}return!1}},549:function(e,t,r){r.d(t,{De:function(){return c},ac:function(){return u},ko:function(){return h}});var n=r(484),l=r(152),s=r(805),i=r(447),o=s.Lang.objAssign;class a extends l.ValueEmbedder{constructor(e,t,r){super(e,t),this.arrPos=null!=r?r:-1}get value(){return""==this.key&&this.arrPos>=0?this._value[this.arrPos]:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]:this._value[this.key]}set value(e){""==this.key&&this.arrPos>=0?this._value[this.arrPos]=e:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]=e:this._value[this.key]=e}}a.absent=a.fromNullable(null);const u="__END_POINT__",h="__ANY_POINT__";class c extends l.Optional{constructor(e,t){super(e),this.configDef=t}get shallowCopy(){return this.shallowCopy$()}shallowCopy$(){let e=new c({});return e.shallowMerge(this.value),e}get deepCopy(){return this.deepCopy$()}deepCopy$(){return new c(o({},this.value))}static fromNullable(e){return new c(e)}shallowMerge(e,t=!0,r=!1){let n=(0,i.shallowMerge)(t,r,this.value,e.value);Array.isArray(this._value)?(this._value.length=0,this._value.push(...n)):(Object.getOwnPropertyNames(this._value).forEach((e=>delete this._value[e])),Object.getOwnPropertyNames(n).forEach((e=>this._value[e]=n[e])))}append(...e){return(0,i.append)(this._value,...e)}appendIf(e,...t){return(0,i.appendIf)(e,this._value,...t)}assign(...e){return(0,i.assign)(this.value,...e)}assignIf(e,...t){return(0,i.assignIf)(e,this._value,...t)}getIf(...e){return this.assertAccessPath(...e),this.getClass().fromNullable((0,i.resolve)(this.value,...e))}get(e){return this.getClass().fromNullable(super.get(e).value)}delete(e){return e in this.value&&delete this.value[e],this}toJson(){return JSON.stringify(this.value)}getClass(){return c}setVal(e){this._value=e}assertAccessPath(...e){var t,r,s,i,o,a,u,c,d;if(e=this.preprocessKeys(...e),!this.configDef)return;let f=l.Optional.fromNullable(Object.keys(this.configDef).map((e=>{let t={};return t[e]=this.configDef[e],t})));for(let v=0;v<e.length;v++){let p=this.keyVal(e[v]),g=this.arrayIndex(e[v]);if(f=this.isArray(g)?""!=p?Array.isArray(f.value)?l.Optional.fromNullable(null===(r=null===(t=new n.Es2019Array(...f.value).find((e=>{var t;return!(null===(t=null==e?void 0:e[p])||void 0===t||!t)})))||void 0===t?void 0:t[p])||void 0===r?void 0:r[g]):l.Optional.fromNullable(null!==(o=null===(i=null===(s=f.value)||void 0===s?void 0:s[p])||void 0===i?void 0:i[g])&&void 0!==o?o:null):Array.isArray(f.value)?l.Optional.fromNullable(null===(a=f.value)||void 0===a?void 0:a[g]):l.Optional.absent:Array.isArray(f.value)?l.Optional.fromNullable(null===(u=new n.Es2019Array(...f.value).find((e=>{var t;return!(null===(t=null==e?void 0:e[p])||void 0===t||!t)})))||void 0===u?void 0:u[p]):l.Optional.fromNullable(null!==(d=null===(c=f.value)||void 0===c?void 0:c[p])&&void 0!==d?d:null),!f.isPresent())throw Error("Access Path to config invalid");if(f.value==h)return}}isNoArray(e){return-1==e}isArray(e){return!this.isNoArray(e)}}},585:function(e,t,r){r.d(t,{DQ:function(){return E},DQ$:function(){return A},DomQuery:function(){return y},DomQueryCollector:function(){return b},ElementAttribute:function(){return p}});var n,l=r(152),s=r(255),i=r(805),o=r(456),a=r(484),u=r(447),h=i.Lang.trim,c=i.Lang.isString,d=i.Lang.equalsIgnoreCase,f=i.Lang.objToArray;class v extends l.ValueEmbedder{constructor(e){super(null==e?void 0:e[0],"nonce"),this.rootElems=e}isAbsent(){const e=this.value;return void 0===e||""==e}get value(){var e,t,r,n,l;return null!==(r=null===(t=null===(e=null==this?void 0:this.rootElems)||void 0===e?void 0:e[0])||void 0===t?void 0:t.nonce)&&void 0!==r?r:null===(l=null===(n=null==this?void 0:this.rootElems)||void 0===n?void 0:n[0])||void 0===l?void 0:l.getAttribute("nonce")}set value(e){var t;(null===(t=null==this?void 0:this.rootElems)||void 0===t?void 0:t.length)&&this.rootElems.forEach((t=>{void 0!==(null==t?void 0:t.nonce)?t.nonce=e:t.setAttribute("nonce",e)}))}}!function(e){e.SELECT="select",e.BUTTON="button",e.SUBMIT="submit",e.RESET="reset",e.IMAGE="image",e.RADIO="radio",e.CHECKBOX="checkbox"}(n||(n={}));class p extends l.ValueEmbedder{constructor(e,t,r=null){super(e,t),this.element=e,this.name=t,this.defaultVal=r}get value(){let e=this.element.get(0).orElse().values;return e.length?e[0].getAttribute(this.name):this.defaultVal}set value(e){let t=this.element.get(0).orElse().values;for(let r=0;r<t.length;r++)t[r].setAttribute(this.name,e);t[0].setAttribute(this.name,e)}getClass(){return p}static fromNullable(e,t="value"){return new p(e,t)}}class g extends l.ValueEmbedder{constructor(e,t,r=null){super(e,t),this.element=e,this.name=t,this.defaultVal=r}get value(){let e=this.element.values;return e.length?e[0].style[this.name]:this.defaultVal}set value(e){let t=this.element.values;for(let r=0;r<t.length;r++)t[r].style[this.name]=e}getClass(){return p}static fromNullable(e,t="value"){return new p(e,t)}}const m=()=>!0;class y{constructor(...e){if(this.rootNode=[],this.pos=-1,this._limits=-1,!l.Optional.fromNullable(e).isAbsent()&&e.length)for(let t=0;t<e.length;t++)if(e[t])if(c(e[t])){let r=y.querySelectorAll(e[t]);r.isAbsent()||e.push(...r.values)}else e[t]instanceof y?this.rootNode.push(...e[t].values):this.rootNode.push(e[t]);else;}get value(){return this.getAsElem(0)}get values(){return this.allElems()}get global(){return o.R}get stream(){throw Error("Not implemented, include Stream.ts for this to work")}get lazyStream(){throw Error("Not implemented, include Stream.ts for this to work")}get id(){return new p(this.get(0),"id")}get length(){return this.rootNode.length}get tagName(){return this.getAsElem(0).getIf("tagName")}get nodeName(){return this.getAsElem(0).getIf("nodeName")}isTag(e){return!this.isAbsent()&&(this.nodeName.orElse("__none___").value.toLowerCase()==e.toLowerCase()||this.tagName.orElse("__none___").value.toLowerCase()==e.toLowerCase())}get type(){return this.getAsElem(0).getIf("type")}get name(){return new l.ValueEmbedder(this.getAsElem(0).value,"name")}get inputValue(){return this.getAsElem(0).getIf("value").isPresent()?new l.ValueEmbedder(this.getAsElem(0).value):l.ValueEmbedder.absent}get val(){return this.inputValue.value}set val(e){this.inputValue.value=e}get nodeId(){return this.id.value}set nodeId(e){this.id.value=e}get checked(){return new a.Es2019Array(...this.values).every((e=>!!e.checked))}set checked(e){this.eachElem((t=>t.checked=e))}get elements(){return this.querySelectorAll("input, checkbox, select, textarea, fieldset")}get deepElements(){return this.querySelectorAllDeep("input, select, textarea, checkbox, fieldset")}querySelectorAllDeep(e){let t=[],r=this.querySelectorAll(e);r.length&&t.push(r);let n=this.querySelectorAll("*").shadowRoot;if(n.length){let r=n.querySelectorAllDeep(e);r.length&&t.push(r)}return new y(...t)}get disabled(){return this.attr("disabled").isPresent()}set disabled(e){e?this.attr("disabled").value="disabled":this.removeAttribute("disabled")}removeAttribute(e){this.eachElem((t=>t.removeAttribute(e)))}get childNodes(){let e=[];return this.eachElem((t=>{e=e.concat(f(t.childNodes))})),new y(...e)}get asArray(){return new a.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>y.byId(e)))}get offsetWidth(){return new a.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>e.offsetWidth)).reduce(((e,t)=>e+t),0)}get offsetHeight(){return new a.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>e.offsetHeight)).reduce(((e,t)=>e+t),0)}get offsetLeft(){return new a.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>e.offsetLeft)).reduce(((e,t)=>e+t),0)}get offsetTop(){return new a.Es2019Array(this.rootNode).filter((e=>null!=e)).map((e=>e.offsetTop)).reduce(((e,t)=>e+t),0)}get asNodeArray(){return new a.Es2019Array(...this.rootNode.filter((e=>null!=e)))}get nonce(){return new v(this.rootNode)}static querySelectorAllDeep(e){return new y(document).querySelectorAllDeep(e)}static querySelectorAll(e){return-1!=e.indexOf("/shadow/")?new y(document)._querySelectorAllDeep(e):new y(document)._querySelectorAll(e)}static byId(e,t=!1){return c(e)?t?new y(document).byIdDeep(e):new y(document).byId(e):new y(e)}static byTagName(e){return c(e)?new y(document).byTagName(e):new y(e)}static globalEval(e,t){return new y(document).globalEval(e,t)}static globalEvalSticky(e,t){return new y(document).globalEvalSticky(e,t)}static fromMarkup(e){const t=document.implementation.createHTMLDocument("");let r=(e=h(e)).toLowerCase();if(-1!=r.search(/<!doctype[^\w\-]+/gi)||-1!=r.search(/<html[^\w\-]+/gi)||-1!=r.search(/<head[^\w\-]+/gi)||-1!=r.search(/<body[^\w\-]+/gi))return t.documentElement.innerHTML=e,new y(t.documentElement);{let t=function(e,t){let r=["<",t,">"].join(""),n=["<",t," "].join("");return 0==e.indexOf(r)||0==e.indexOf(n)},n=new y(document.createElement("div"));return t(r,"thead")||t(r,"tbody")?(n.html(`<table>${e}</table>`),n.querySelectorAll("table").get(0).childNodes.detach()):t(r,"tfoot")?(n.html(`<table><thead></thead><tbody><tbody${e}</table>`),n.querySelectorAll("table").get(2).childNodes.detach()):t(r,"tr")?(n.html(`<table><tbody>${e}</tbody></table>`),n.querySelectorAll("tbody").get(0).childNodes.detach()):t(r,"td")?(n.html(`<table><tbody><tr>${e}</tr></tbody></table>`),n.querySelectorAll("tr").get(0).childNodes.detach()):(n.html(e),n.childNodes.detach())}}get(e){return e<this.rootNode.length?new y(this.rootNode[e]):y.absent}getAsElem(e,t=l.Optional.absent){return e<this.rootNode.length?l.Optional.fromNullable(this.rootNode[e]):t}filesFromElem(e){var t;return e<this.rootNode.length&&(null===(t=this.rootNode[e])||void 0===t?void 0:t.files)?this.rootNode[e].files:[]}allElems(){return this.rootNode}isAbsent(){return 0==this.length}isPresent(e){let t=this.isAbsent();return!t&&e&&e.call(this,this),!t}ifPresentLazy(e=function(){}){return this.isPresent.call(this,e),this}delete(){this.eachElem((e=>{e.parentNode&&e.parentNode.removeChild(e)}))}querySelectorAll(e){return-1!=e.indexOf("/shadow/")?this._querySelectorAllDeep(e):this._querySelectorAll(e)}closest(e){return-1!=e.indexOf("/shadow/")?this._closestDeep(e):this._closest(e)}byId(e,t){let r=[];return t&&(r=r.concat(...new a.Es2019Array(...(null==this?void 0:this.rootNode)||[]).filter((t=>e==t.id)).map((e=>new y(e))))),r=r.concat(this.querySelectorAll(`[id="${e}"]`)),new y(...r)}byIdDeep(e,t){let r=[];t&&(r=r.concat(new a.Es2019Array(...(null==this?void 0:this.rootNode)||[]).filter((t=>e==t.id)).map((e=>new y(e)))));let n=this.querySelectorAllDeep(`[id="${e}"]`);return n.length&&r.push(n),new y(...r)}byTagName(e,t,r){var n;let l=[];return t&&(l=new a.Es2019Array(...null!==(n=null==this?void 0:this.rootNode)&&void 0!==n?n:[]).filter((t=>(null==t?void 0:t.tagName)==e)).reduce(((e,t)=>e.concat([t])),l)),r?l.push(this.querySelectorAllDeep(e)):l.push(this.querySelectorAll(e)),new y(...l)}attr(e,t=null){return new p(this,e,t)}style(e,t=null){return new g(this,e,t)}hasClass(e){let t=!1;return this.eachElem((r=>{if(t=r.classList.contains(e),t)return!1})),t}addClass(e){return this.eachElem((t=>t.classList.add(e))),this}removeClass(e){return this.eachElem((t=>t.classList.remove(e))),this}isMultipartCandidate(e=!1){const t="input[type='file']";return this.matchesSelector(t)||(e?this.querySelectorAllDeep(t):this.querySelectorAll(t)).first().isPresent()}html(e){return l.Optional.fromNullable(e).isAbsent()?this.isPresent()?l.Optional.fromNullable(this.innerHTML):l.Optional.absent:(this.innerHTML=e,this)}dispatchEvent(e){return this.eachElem((t=>t.dispatchEvent(e))),this}set innerHTML(e){this.eachElem((t=>t.innerHTML=e))}get innerHTML(){let e=[];return this.eachElem((t=>e.push(t.innerHTML))),e.join("")}set innerHtml(e){this.innerHTML=e}get innerHtml(){return this.innerHTML}filterSelector(e){let t=[];return this.eachElem((r=>{this._mozMatchesSelector(r,e)&&t.push(r)})),new y(...t)}matchesSelector(e){return this.asArray.some((t=>this._mozMatchesSelector(t.getAsElem(0).value,e)))}getIf(...e){let t=this.childNodes;for(let r=0;r<e.length;r++)if(t=t.filterSelector(e[r]),t.isAbsent())return t;return t}eachElem(e){for(let t=0,r=this.rootNode.length;t<r&&!1!==e(this.rootNode[t],t);t++);return this}firstElem(e=(e=>e)){return this.rootNode.length>1&&e(this.rootNode[0],0),this}lastElem(e=(e=>e)){return this.rootNode.length>1&&e(this.rootNode[this.rootNode.length-1],0),this}each(e){return new a.Es2019Array(...this.rootNode).forEach(((t,r)=>{if(null!=t)return e(y.byId(t),r)})),this}replace(e){return this.each((t=>{let r=t.getAsElem(0).value,n=r.parentElement,l=r.nextElementSibling,s=r.previousElementSibling;null!=l?new y(l).insertBefore(e):s?new y(s).insertAfter(e):new y(n).append(e),t.delete()})),e}first(e=(e=>e)){return this.rootNode.length>=1?(e(this.get(0),0),this.get(0)):this}last(e=(e=>e)){if(this.rootNode.length>=1){let t=this.get(this.rootNode.length-1);return e(t,0),t}return this}filter(e){let t=[];return this.each((r=>{e(r)&&t.push(r)})),new y(...t)}globalEval(e,t){var r,n,l;const s=null!==(n=null===(r=document.getElementsByTagName("head"))||void 0===r?void 0:r[0])&&void 0!==n?n:null===(l=document.documentElement.getElementsByTagName("head"))||void 0===l?void 0:l[0],i=document.createElement("script");t&&(void 0!==(null==i?void 0:i.nonce)?i.nonce=t:i.setAttribute("nonce",t)),i.type="text/javascript",i.innerHTML=e;let o=s.appendChild(i);return s.removeChild(o),this}globalEvalSticky(e,t){let r=document.getElementsByTagName("head")[0]||document.documentElement,n=document.createElement("script");return this.applyNonce(t,n),n.type="text/javascript",n.innerHTML=e,r.appendChild(n),this}detach(){return this.eachElem((e=>{e.parentNode.removeChild(e)})),this}appendTo(e){return i.Lang.isString(e)?(this.appendTo(y.querySelectorAll(e)),this):(this.eachElem((t=>{e.getAsElem(0).orElseLazy((()=>({appendChild:()=>{}}))).value.appendChild(t)})),this)}loadScriptEval(e,t=0,r){return this._loadScriptEval(!1,e,t,r),this}loadScriptEvalSticky(e,t=0,r){return this._loadScriptEval(!0,e,t,r),this}insertAfter(...e){this.each((t=>{let r=t.getAsElem(0).value,n=r.parentNode;for(let t=0;t<e.length;t++){let l=r.nextSibling;e[t].eachElem((e=>{l?(n.insertBefore(e,l),r=l):n.appendChild(e)}))}}));let t=[];return t.push(this),t=t.concat(e),new y(...t)}insertBefore(...e){this.each((t=>{let r=t.getAsElem(0).value,n=r.parentNode;for(let t=0;t<e.length;t++)e[t].eachElem((e=>{n.insertBefore(e,r)}))}));let t=[];return t.push(this),t=t.concat(e),new y(...t)}orElse(...e){return this.isPresent()?this:new y(...e)}orElseLazy(e){return this.isPresent()?this:new y(e())}allParents(e){let t=this.parent(),r=[];for(;t.isPresent();)t.matchesSelector(e)&&r.push(t),t=t.parent();return new y(...r)}firstParent(e){let t=this.parent();for(;t.isPresent();){if(t.matchesSelector(e))return t;t=t.parent()}return y.absent}parentsWhileMatch(e){const t=[];let r=this.parent().filter((t=>t.matchesSelector(e)));for(;r.isPresent();)t.push(r),r=r.parent().filter((t=>t.matchesSelector(e)));return new y(...t)}parent(){let e=[];return this.eachElem((t=>{let r=t.parentNode||t.host||t.shadowRoot;r&&-1==e.indexOf(r)&&e.push(r)})),new y(...e)}copyAttrs(e){return e.eachElem((e=>{let t=f(e.attributes);for(let e of t){let t=e.value,r=e.name;switch(r){case"id":this.id.value=t;break;case"disabled":this.resolveAttributeHolder("disabled").disabled=t;break;case"checked":this.resolveAttributeHolder("checked").checked=t;break;case"nonce":break;default:this.attr(r).value=t}}})),e.nonce.isPresent((()=>{this.nonce.value=e.nonce.value})),this}outerHTML(e,t,r,n=!1){var l;if(this.isAbsent())return;let s=null===(l=null===document||void 0===document?void 0:document.activeElement)||void 0===l?void 0:l.id,i=s?y.getCaretPosition(document.activeElement):null,o=y.fromMarkup(e),a=[],u=this.getAsElem(0).value,h=o.get(0),c=u.parentNode,d=h.getAsElem(0).value;if(c.replaceChild(d,u),a.push(new y(d)),this.isAbsent())return this;let f=[];o.length>1&&(f=f.concat(...o.values.slice(1)),a.push(y.byId(d).insertAfter(new y(...f)))),t&&this.runScripts(),r&&this.runCss();let v=y.byId(s);return s&&v.isPresent()&&null!=i&&void 0!==i&&v.eachElem((e=>y.setCaretPosition(e,i))),o}runScripts(e=!1,t=m){const r=t=>{if(t.length){let r=[];new a.Es2019Array(...t).forEach((t=>{t.nonce?(r.length&&(this.globalEval(r.join("\n")),r.length=0),e?this.globalEvalSticky(t.evalText,t.nonce):this.globalEval(t.evalText,t.nonce)):r.push(t.evalText)})),r.length&&(e?this.globalEvalSticky(r.join("\n")):this.globalEval(r.join("\n")),r.length=0),t=[]}return t};let n=[],l=["","script","text/javascript","text/ecmascript","ecmascript"],s=s=>{var i,o,a,u;let c=s.tagName,f=(null!==(i=null==s?void 0:s.type)&&void 0!==i?i:"").toLowerCase();if(c&&d(c,"script")&&-1!=l.indexOf(f)){let l=s.getAttribute("src");if(void 0!==l&&null!=l&&l.length>0){let i=null!==(o=null==s?void 0:s.nonce)&&void 0!==o?o:s.getAttribute("nonce").value;t(l)&&(n=r(n),e?i?this.loadScriptEvalSticky(l,0,i):this.loadScriptEvalSticky(l,0):i?this.loadScriptEval(l,0,i):this.loadScriptEval(l,0))}else{let e=h(s.text||s.innerText||s.innerHTML),t=!0;for(;t;)t=!1,"\x3c!--"==e.substring(0,4)&&(e=e.substring(4),t=!0),"//\x3c!--"==e.substring(0,4)&&(e=e.substring(6),t=!0),"//<![CDATA["==e.substring(0,11)&&(e=e.substring(11),t=!0);let r=null!==(u=null!==(a=null==s?void 0:s.nonce)&&void 0!==a?a:s.getAttribute("nonce").value)&&void 0!==u?u:"";n.push({nonce:r,evalText:e})}}};try{new y(this.filterSelector("script"),this.querySelectorAll("script")).asArray.flatMap((e=>[...e.values])).sort(((e,t)=>t.compareDocumentPosition(e)-3)).forEach((e=>s(e))),r(n)}catch(e){console&&console.error&&console.error(e.message||e.description)}finally{s=null}return this}runCss(){return new y(this.filterSelector("link, style"),this.querySelectorAll("link, style")).asArray.flatMap((e=>[...e.values])).sort(((e,t)=>e.compareDocumentPosition(t)-3)).forEach((e=>(e=>{const t=y.byId(e),r=t.tagName.orElse("").value;let n=y.fromMarkup(`<${r.toLowerCase()} />`);n=n.copyAttrs(t),n.innerHTML=e.innerHTML,t.replace(n)})(e))),this}click(){return this.fireEvent("click"),this}addEventListener(e,t,r){return this.eachElem((n=>n.addEventListener(e,t,r))),this}removeEventListener(e,t,r){return this.eachElem((n=>n.removeEventListener(e,t,r))),this}fireEvent(e,t={}){let r={bubbles:!0,cancelable:!0};r=(0,u.simpleShallowMerge)(r,t),this.eachElem((t=>{let n;if(t.ownerDocument)n=t.ownerDocument;else{if(9!=t.nodeType)throw new Error("Invalid node passed to fireEvent: "+t.id);n=t}if(t.dispatchEvent){let n=Event;switch(e){case"click":case"mousedown":case"mouseup":case"mousemove":n=this.global().MouseEvent;break;case"keyup":case"keydown":case"keypress":n=this.global().KeyboardEvent;break;case"focus":case"change":case"blur":case"select":break;default:throw"fireEvent: Couldn't find an event class for event '"+e+"'."}let l=new n(e,r);l.synthetic=!0,t.dispatchEvent(l)}else if(t.fireEvent){let l=n.createEventObject();l.synthetic=!0,Object.keys(r).forEach((e=>l[e]=r[e])),t.fireEvent("on"+e,l)}}))}textContent(e=""){return this.asArray.map((e=>e.getAsElem(0).orElseLazy((()=>({textContent:""}))).value.textContent||"")).reduce(((t,r)=>[t,e,r].join("")),"")}innerText(e=""){return this.asArray.map((e=>e.getAsElem(0).orElseLazy((()=>({innerText:""}))).value.innerText||"")).reduce(((t,r)=>[t,r].join(e)),"")}encodeFormElement(e={}){if(this.name.isAbsent())return;let t=(0,u.simpleShallowMerge)(e);return this.each((e=>{var r,l;if(e.name.isAbsent())return;let s=e.name.value,i=e.tagName.orElse("__none__").value.toLowerCase(),o=e.type.orElse("__none__").value.toLowerCase();if(o=o.toLowerCase(),("input"==i||"textarea"==i||"select"==i)&&null!=s&&""!=s&&!e.disabled){if("select"==i){let r=e.getAsElem(0).value;if(r.selectedIndex>=0){let e=r.options.length;for(let n=0;n<e;n++)if(r.options[n].selected){let e=r.options[n];(0,u.append)(t,s).value=null!=e.getAttribute("value")?e.value:e.text}}}if(i!=n.SELECT&&o!=n.BUTTON&&o!=n.RESET&&o!=n.SUBMIT&&o!=n.IMAGE&&(o!=n.CHECKBOX&&o!=n.RADIO||e.checked)){let n=null===(l=null===(r=e.value)||void 0===r?void 0:r.value)||void 0===l?void 0:l.files,i=null!=n?n:[];if(null==i?void 0:i.length)(0,u.assign)(t,s).value=Array.from(i);else{if(n)return;(0,u.append)(t,s).value=e.inputValue.value}}}})),t}get cDATAAsString(){return this.asArray.flatMap((e=>e.childNodes.asArray)).filter((e=>{var t,r;return 4==(null===(r=null===(t=null==e?void 0:e.value)||void 0===t?void 0:t.value)||void 0===r?void 0:r.nodeType)})).reduce(((e,t)=>{var r,n,l;return e.push(null!==(l=null===(n=null===(r=null==t?void 0:t.value)||void 0===r?void 0:r.value)||void 0===n?void 0:n.data)&&void 0!==l?l:""),e}),[]).join("")}subNodes(e,t){return l.Optional.fromNullable(t).isAbsent()&&(t=this.length),new y(...this.rootNode.slice(e,Math.min(t,this.length)))}limits(e){return this._limits=e,this}hasNext(){let e=-1!=this._limits&&this.pos>=this._limits-1,t=this.pos>=this.values.length-1;return!(e||t)}next(){return this.hasNext()?(this.pos++,new y(this.values[this.pos])):null}lookAhead(e=1){return this.values.length-1<this.pos+e?s.dD.EO_STRM:new y(this.values[this.pos+e])}current(){return-1==this.pos?s.dD.BEF_STRM:new y(this.values[this.pos])}reset(){this.pos=-1}attachShadow(e={mode:"open"}){let t=[];return this.eachElem((r=>{let n;if(!(null==r?void 0:r.attachShadow))throw new Error("Shadow dom creation not supported by the browser, please use a shim, to gain this functionality");n=y.byId(r.attachShadow(e)),t.push(n)})),new y(...t)}async waitUntilDom(e,t={attributes:!0,childList:!0,subtree:!0,timeout:500,interval:100}){return function(e,t,r={attributes:!0,childList:!0,subtree:!0,timeout:500,interval:100}){return new Promise(((n,l)=>{let s=null;const i=new Error("Mutation observer timeout");function o(e,t){let n=null;return t(e)?e:(n=r.childList?t(e)?e:e.childNodes.filter((e=>t(e))).first().value.value:r.subtree?t(e)?e:e.querySelectorAll(" * ").filter((e=>t(e))).first().value.value:t(e)?e:null,n)}let a=e;if(a=o(a,t))n(new y(a));else if("undefined"!=typeof MutationObserver){const o=setTimeout((()=>(s.disconnect(),l(i))),r.timeout),a=r=>{const l=new y(r.map((e=>e.target))).filter((e=>t(e))).first();l.isPresent()&&(clearTimeout(o),s.disconnect(),n(new y(l||e)))};s=new MutationObserver(a);let u={...r};delete u.timeout,e.eachElem((e=>{s.observe(e,u)}))}else{let s=setInterval((()=>{let r=o(e,t);r&&(a&&(clearTimeout(a),clearInterval(s),s=null),n(new y(r||e)))}),r.interval),a=setTimeout((()=>{s&&(clearInterval(s),l(i))}),r.timeout)}}))}(this,e,t)}get shadowElements(){let e=(this.querySelectorAll("*").filter((e=>e.hasShadow)).allElems()||[]).map((e=>e.shadowRoot));return new y(...e)}get shadowRoot(){let e=[];for(let t=0;t<this.rootNode.length;t++)this.rootNode[t].shadowRoot&&e.push(this.rootNode[t].shadowRoot);return new y(...e)}get hasShadow(){for(let e=0;e<this.rootNode.length;e++)if(this.rootNode[e].shadowRoot)return!0;return!1}static getCaretPosition(e){let t=0;try{if(null===document||void 0===document?void 0:document.selection){e.focus();let r=document.selection.createRange();r.moveStart("character",-e.value.length),t=r.text.length}}catch(e){}return t}static setCaretPosition(e,t){(null==e?void 0:e.focus)&&(null==e||e.focus()),(null==e?void 0:e.setSelectiongRange)&&(null==e||e.setSelectiongRange(t,t))}[Symbol.iterator](){return{next:()=>({done:!this.hasNext(),value:this.next()})}}concat(e,t=!0){let r=this.asArray;const n=new y(...r.concat(e.asArray));if(!t)return n;let l={};return new y(...n.asArray.filter((e=>{const t=!(null==l?void 0:l[e.value.value.outerHTML]);return l[e.value.value.outerHTML]=!0,t})))}append(e){return this.each((t=>e.appendTo(t))),this}prependTo(e){return e.eachElem((e=>{e.prepend(...this.allElems())})),this}prepend(e){return this.eachElem((t=>{t.prepend(...e.allElems())})),this}_querySelectorAll(e){var t,r;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let n=[];for(let t=0;t<this.rootNode.length;t++){if(!(null===(r=this.rootNode[t])||void 0===r?void 0:r.querySelectorAll))continue;let l=this.rootNode[t].querySelectorAll(e);n=n.concat(...f(l))}return new y(...n)}_querySelectorAllDeep(e){var t;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let r=new y(...this.rootNode),n=e.split(/\/shadow\//);for(let e=0;e<n.length;e++){if(""==n[e])continue;let t=n[e];r=r.querySelectorAll(t),e<n.length-1&&(r=r.shadowRoot)}return r}_closest(e){var t,r;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let n=[];for(let t=0;t<this.rootNode.length;t++){if(!(null===(r=this.rootNode[t])||void 0===r?void 0:r.closest))continue;let l=[this.rootNode[t].closest(e)];n=n.concat(...l)}return new y(...n)}_closestDeep(e){var t;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let r=new y(...this.rootNode),n=e.split(/\/shadow\//);for(let e=0;e<n.length;e++){if(""==n[e])continue;let t=n[e];r=r.closest(t),e<n.length-1&&(r=r.shadowRoot)}return r}_mozMatchesSelector(e,t){let r=e;return(r.matches||r.matchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector||r.webkitMatchesSelector||function(t){let r=(document||ownerDocument).querySelectorAll(t),n=r.length;for(;--n>=0&&r.item(n)!==e;);return n>-1}).call(e,t)}_loadScriptEval(e,t,r=0,n){let l=this.createSourceNode(t,n),s=this.createSourceNode(null,n),i=`nonce_${Date.now()}_${Math.random()}`;s.innerHTML=`document.head["${i}"] = true`;let o=document.head;if(o.appendChild(s),o.removeChild(s),o[i]){try{r?setTimeout((()=>{o.appendChild(l),e||o.removeChild(l)}),r):(o.appendChild(l),e||o.removeChild(l))}finally{delete o[i]}return this}}resolveAttributeHolder(e="value"){let t=[];return t[e]=null,e in this.getAsElem(0).value?this.getAsElem(0).value:t}createSourceNode(e,t){let r=document.createElement("script");return r.type="text/javascript",t&&(void 0!==(null==r?void 0:r.nonce)?r.nonce=t:r.setAttribute("nonce",t)),e&&(r.src=e),r}applyNonce(e,t){e&&(void 0!==(null==t?void 0:t.nonce)?t.nonce=e:t.setAttribute("nonce",e))}}y.absent=new y,y.global=o.R;class b{constructor(){this.data=[]}collect(e){this.data.push(e)}get finalValue(){return new y(...this.data)}}const E=y,A=y.querySelectorAll},484:function(e,t,r){r.d(t,{Es2019Array:function(){return s},_Es2019Array:function(){return l}});class n extends Array{constructor(...e){super(...e),e._another?this._another=e._another:this._another=e,this.flatMap=e=>this._flatMap(e),this.flat=(e=1)=>this._flat(e)}map(e,t){return new l(...Array.prototype.map.call(this._another,e,t))}concat(...e){return new l(...Array.prototype.concat.call(this._another,...e))}reverse(){return new l(...Array.prototype.reverse.call(this._another))}slice(e,t){return new l(...Array.prototype.slice.call(this._another,e,t))}splice(e,t){return new l(...Array.prototype.splice.call(this._another,e,t))}filter(e,t){return new l(...Array.prototype.filter.call(this._another,e,t))}reduce(e,t){return Array.prototype.reduce.call(this._another,e,t)}_flat(e=1){return this._flatResolve(this._another,e)}_flatResolve(e,t=1){if(0==t)return e;let r=[];return e.forEach((e=>{e=Array.isArray(e)?e:[e];let n=this._flatResolve(e,t-1);r=r.concat(n)})),new s(...r)}_flatMap(e){let t=this.map((t=>e(t)));return this._flatResolve(t)}}function l(...e){let t=new n(...e);return new Proxy(t,{get(e,t,r){return"symbol"==typeof t?e._another[t]:isNaN(parseInt(t))?e[t]:e._another[t]},set(e,t,r){return e[t]=r,e._another[t]=r,!0}})}var s=Array.prototype.flatMap?function(...e){return(null==e?void 0:e.flatMap)?e:l(...e)}:l},456:function(e,t,r){function n(){var e;let t="undefined"!=typeof globalThis&&globalThis.window?globalThis.window:"undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:void 0!==r.g&&(null===r.g||void 0===r.g?void 0:r.g.window)?r.g.window:void 0!==r.g?r.g:null;return null!==(e=null==t?void 0:t.window)&&void 0!==e?e:t}r.d(t,{R:function(){return n}})},805:function(e,t,r){r.d(t,{Lang:function(){return n}});var n,l=r(152),s=r(484);!function(e){function t(e){let t=/\s/,r=(e=e.replace(/^\s\s*/,"")).length;for(;t.test(e.charAt(--r)););return e.slice(0,r+1)}function r(e){return!!arguments.length&&null!=e&&("string"==typeof e||e instanceof String)}e.saveResolve=function(e,t=null){try{let r=e();return l.Optional.fromNullable(null!=r?r:t)}catch(e){return l.Optional.absent}},e.saveResolveLazy=function(e,t=null){try{let r=e();return l.Optional.fromNullable(null!=r?r:t())}catch(e){return l.Optional.absent}},e.strToArray=function(e,r=/\./gi){let n=[];return e.split(r).forEach((e=>{n.push(t(e))})),n},e.trim=t,e.objToArray=function(e,t=0,r=[]){return"__undefined__"==(null!=e?e:"__undefined__")?null!=r?r:null:e instanceof Array&&!t&&!r?e:new s.Es2019Array(...r.concat(Array.prototype.slice.call(e,t)))},e.equalsIgnoreCase=function(e,t){let r=null!=t?t:"___no_value__";return(null!=e?e:"___no_value__").toLowerCase()===r.toLowerCase()},e.assertType=function(e,t){return r(t)?typeof e==t:e instanceof t},e.isString=r,e.isFunc=function(e){return e instanceof Function||"function"==typeof e},e.objAssign=function(e,...t){if(null==e)throw new TypeError("Cannot convert undefined or null to object");let r=Object(e);return Object.assign?(t.forEach((e=>Object.assign(r,e))),r):(t.filter((e=>null!=e)).forEach((e=>{let t=e;Object.keys(t).filter((e=>Object.prototype.hasOwnProperty.call(t,e))).forEach((e=>r[e]=t[e]))})),r)}}(n||(n={}))},152:function(e,t,r){r.d(t,{Monad:function(){return l},Optional:function(){return s},ValueEmbedder:function(){return i}});var n=r(484);class l{constructor(e){this._value=e}get value(){return this._value}map(e){e||(e=e=>e);let t=e(this.value);return new l(t)}flatMap(e){let t=this.map(e);for(;(null==t?void 0:t.value)instanceof l;)t=t.value;return t}}class s extends l{constructor(e){super(e)}get value(){return this._value instanceof l?this._value.flatMap().value:this._value}static fromNullable(e){return new s(e)}isAbsent(){return void 0===this.value||null==this.value}isPresent(e){let t=this.isAbsent();return!t&&e&&e.call(this,this),!t}ifPresentLazy(e=(()=>{})){return this.isPresent.call(this,e),this}orElse(e){return this.isPresent()?this:null==e?s.absent:this.flatMap((()=>e))}orElseLazy(e){return this.isPresent()?this:this.flatMap(e)}flatMap(e){let t=super.flatMap(e);return t instanceof s?t.flatMap():s.fromNullable(t.value)}getIf(...e){e=this.preprocessKeys(...e);let t=this;for(let r=0;r<e.length;r++){let n=this.keyVal(e[r]),l=this.arrayIndex(e[r]);if(""===n&&l>=0){if(t=this.getClass().fromNullable(t.value instanceof Array?t.value.length<l?null:t.value[l]:null),t.isAbsent())return t}else if(n&&l>=0){if(t.getIfPresent(n).isAbsent())return t;if(t=t.getIfPresent(n).value instanceof Array?this.getClass().fromNullable(t.getIfPresent(n).value[l]):this.getClass().absent,t.isAbsent())return t}else{if(t=t.getIfPresent(n),t.isAbsent())return t;l>-1&&(t=this.getClass().fromNullable(t.value[l]))}}return t}match(e){return!this.isAbsent()&&e(this.value)}get(e=s.absent){return this.isAbsent()?this.getClass().fromNullable(e).flatMap():this.getClass().fromNullable(this.value).flatMap()}toJson(){return JSON.stringify(this.value)}getClass(){return s}arrayIndex(e){let t=e.indexOf("["),r=e.indexOf("]");return t>=0&&r>0&&t<r?parseInt(e.substring(t+1,r)):-1}keyVal(e){let t=e.indexOf("[");return t>=0?e.substring(0,t):e}getIfPresent(e){return this.isAbsent()?this.getClass().absent:this.getClass().fromNullable(this.value[e]).flatMap()}resolve(e){if(this.isAbsent())return s.absent;try{return s.fromNullable(e(this.value))}catch(e){return s.absent}}preprocessKeys(...e){return new n.Es2019Array(...e).flatMap((e=>new n.Es2019Array(...e.split(/]\s*\[/gi)).map((e=>(-1==(e=e.replace(/^\s+|\s+$/g,"")).indexOf("[")&&-1!=e.indexOf("]")&&(e="["+e),-1==e.indexOf("]")&&-1!=e.indexOf("[")&&(e+="]"),e)))))}}s.absent=s.fromNullable(null);class i extends s{constructor(e,t="value"){super(e),this.key=t}get value(){return this._value?this._value[this.key]:null}set value(e){this._value&&(this._value[this.key]=e)}orElse(e){let t={};return t[this.key]=e,this.isPresent()?this:new i(t,this.key)}orElseLazy(e){if(this.isPresent())return this;{let t={};return t[this.key]=e(),new i(t,this.key)}}getClass(){return i}static fromNullable(e,t="value"){return new i(e,t)}}i.absent=i.fromNullable(null)},255:function(e,t,r){r.d(t,{dD:function(){return n}});var n;r(484),r(549);!function(e){e.EO_STRM="__EO_STRM__",e.BEF_STRM="___BEF_STRM__"}(n||(n={}))},121:function(e,t,r){r.d(t,{XMLQuery:function(){return o},XQ:function(){return a}});var n=r(805),l=r(585),s=r(456),i=n.Lang.isString;class o extends l.DomQuery{constructor(e,t="text/xml"){let r=e=>{if(null==e)return null;return n.Lang.saveResolveLazy((()=>new((0,s.R)().DOMParser)),(()=>(()=>{let e=new ActiveXObject("Microsoft.XMLDOM");return e.async=!1,{parseFromString:(t,r)=>e.loadXML(t)}})())).value.parseFromString(e,t)};i(e)?super(r(e)):super(e)}isXMLParserError(){return this.querySelectorAll("parsererror").isPresent()}toString(){let e=[];return this.eachElem((t=>{var r,n,l,i;let o=null!==(i=null===(l=null===(n=null===(r=(0,s.R)())||void 0===r?void 0:r.XMLSerializer)||void 0===n?void 0:n.constructor())||void 0===l?void 0:l.serializeToString(t))&&void 0!==i?i:null==t?void 0:t.xml;o&&e.push(o)})),e.join("")}parserErrorText(e){return this.querySelectorAll("parsererror").textContent(e)}static parseXML(e){return new o(e)}static parseHTML(e){return new o(e,"text/html")}static fromString(e,t="text/xml"){return new o(e,t)}}const a=o}},t={};function r(n){var l=t[n];if(void 0!==l)return l.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,r),s.exports}r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};return function(){r.r(n),r.d(n,{Assoc:function(){return i},CONFIG_ANY:function(){return o.ko},CONFIG_VALUE:function(){return o.ac},Config:function(){return o.De},DQ:function(){return e.DQ},DQ$:function(){return e.DQ$},DomQuery:function(){return e.DomQuery},DomQueryCollector:function(){return e.DomQueryCollector},ElementAttribute:function(){return e.ElementAttribute},Es2019Array:function(){return a.Es2019Array},Lang:function(){return t.Lang},Monad:function(){return l.Monad},Optional:function(){return l.Optional},ValueEmbedder:function(){return l.ValueEmbedder},XMLQuery:function(){return s.XMLQuery},XQ:function(){return s.XQ},_Es2019Array:function(){return a._Es2019Array},append:function(){return i.append},assign:function(){return i.assign},assignIf:function(){return i.assignIf},shallowMerge:function(){return i.shallowMerge},simpleShallowMerge:function(){return i.simpleShallowMerge}});var e=r(585),t=r(805),l=r(152),s=r(121),i=r(447),o=r(549),a=r(484)}(),n}()}));
//# sourceMappingURL=index_core.js.map