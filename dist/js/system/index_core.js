System.register([],(function(e,t){return{execute:function(){e(function(){"use strict";var e={585:function(e,t,r){r.d(t,{DQ:function(){return b},DQ$:function(){return E},DomQuery:function(){return m},DomQueryCollector:function(){return y},ElementAttribute:function(){return v}});var l,n=r(152),s=r(255),i=r(805),o=r(456),a=r(484),u=function(e,t,r,l){return new(r||(r=Promise))((function(n,s){function i(e){try{a(l.next(e))}catch(e){s(e)}}function o(e){try{a(l.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,o)}a((l=l.apply(e,t||[])).next())}))},h=i.Lang.trim,c=i.Lang.isString,d=i.Lang.equalsIgnoreCase,f=i.Lang.objToArray;!function(e){e.SELECT="select",e.BUTTON="button",e.SUBMIT="submit",e.RESET="reset",e.IMAGE="image",e.RADIO="radio",e.CHECKBOX="checkbox"}(l||(l={}));class v extends n.ValueEmbedder{constructor(e,t,r=null){super(e,t),this.element=e,this.name=t,this.defaultVal=r}get value(){let e=this.element.get(0).orElse().values;return e.length?e[0].getAttribute(this.name):this.defaultVal}set value(e){let t=this.element.get(0).orElse().values;for(let r=0;r<t.length;r++)t[r].setAttribute(this.name,e);t[0].setAttribute(this.name,e)}getClass(){return v}static fromNullable(e,t="value"){return new v(e,t)}}class p extends n.ValueEmbedder{constructor(e,t,r=null){super(e,t),this.element=e,this.name=t,this.defaultVal=r}get value(){let e=this.element.values;return e.length?e[0].style[this.name]:this.defaultVal}set value(e){let t=this.element.values;for(let r=0;r<t.length;r++)t[r].style[this.name]=e}getClass(){return v}static fromNullable(e,t="value"){return new v(e,t)}}const g=()=>!0;class m{constructor(...e){if(this.rootNode=[],this.pos=-1,this._limits=-1,!n.Optional.fromNullable(e).isAbsent()&&e.length)for(let t=0;t<e.length;t++)if(e[t])if(c(e[t])){let r=m.querySelectorAll(e[t]);r.isAbsent()||e.push(...r.values)}else e[t]instanceof m?this.rootNode.push(...e[t].values):this.rootNode.push(e[t]);else;}get value(){return this.getAsElem(0)}get values(){return this.allElems()}get global(){return o.R}get stream(){throw Error("Not implemented, include Stream.ts for this to work")}get lazyStream(){throw Error("Not implemented, include Stream.ts for this to work")}get id(){return new v(this.get(0),"id")}get length(){return this.rootNode.length}get tagName(){return this.getAsElem(0).getIf("tagName")}get nodeName(){return this.getAsElem(0).getIf("nodeName")}isTag(e){return!this.isAbsent()&&(this.nodeName.orElse("__none___").value.toLowerCase()==e.toLowerCase()||this.tagName.orElse("__none___").value.toLowerCase()==e.toLowerCase())}get type(){return this.getAsElem(0).getIf("type")}get name(){return new n.ValueEmbedder(this.getAsElem(0).value,"name")}get inputValue(){return this.getAsElem(0).getIf("value").isPresent()?new n.ValueEmbedder(this.getAsElem(0).value):n.ValueEmbedder.absent}get val(){return this.inputValue.value}set val(e){this.inputValue.value=e}get nodeId(){return this.id.value}set nodeId(e){this.id.value=e}get checked(){return new a.Es2019Array(...this.values).every((e=>!!e.checked))}set checked(e){this.eachElem((t=>t.checked=e))}get elements(){return this.querySelectorAll("input, checkbox, select, textarea, fieldset")}get deepElements(){return this.querySelectorAllDeep("input, select, textarea, checkbox, fieldset")}querySelectorAllDeep(e){let t=[],r=this.querySelectorAll(e);r.length&&t.push(r);let l=this.querySelectorAll("*").shadowRoot;if(l.length){let r=l.querySelectorAllDeep(e);r.length&&t.push(r)}return new m(...t)}get disabled(){return this.attr("disabled").isPresent()}set disabled(e){e?this.attr("disabled").value="disabled":this.removeAttribute("disabled")}removeAttribute(e){this.eachElem((t=>t.removeAttribute(e)))}get childNodes(){let e=[];return this.eachElem((t=>{e=e.concat(f(t.childNodes))})),new m(...e)}get asArray(){return new a.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>m.byId(e)))}get offsetWidth(){return new a.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>e.offsetWidth)).reduce(((e,t)=>e+t),0)}get offsetHeight(){return new a.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>e.offsetHeight)).reduce(((e,t)=>e+t),0)}get offsetLeft(){return new a.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>e.offsetLeft)).reduce(((e,t)=>e+t),0)}get offsetTop(){return new a.Es2019Array(this.rootNode).filter((e=>null!=e)).map((e=>e.offsetTop)).reduce(((e,t)=>e+t),0)}get asNodeArray(){return new a.Es2019Array(...this.rootNode.filter((e=>null!=e)))}static querySelectorAllDeep(e){return new m(document).querySelectorAllDeep(e)}static querySelectorAll(e){return-1!=e.indexOf("/shadow/")?new m(document)._querySelectorAllDeep(e):new m(document)._querySelectorAll(e)}static byId(e,t=!1){return c(e)?t?new m(document).byIdDeep(e):new m(document).byId(e):new m(e)}static byTagName(e){return c(e)?new m(document).byTagName(e):new m(e)}static globalEval(e,t){return new m(document).globalEval(e,t)}static globalEvalSticky(e,t){return new m(document).globalEvalSticky(e,t)}static fromMarkup(e){const t=document.implementation.createHTMLDocument("");let r=(e=h(e)).toLowerCase();if(-1!=r.search(/<!doctype[^\w\-]+/gi)||-1!=r.search(/<html[^\w\-]+/gi)||-1!=r.search(/<head[^\w\-]+/gi)||-1!=r.search(/<body[^\w\-]+/gi))return t.documentElement.innerHTML=e,new m(t.documentElement);{let t=function(e,t){let r=["<",t,">"].join(""),l=["<",t," "].join("");return 0==e.indexOf(r)||0==e.indexOf(l)},l=new m(document.createElement("div"));return t(r,"thead")||t(r,"tbody")?(l.html(`<table>${e}</table>`),l.querySelectorAll("table").get(0).childNodes.detach()):t(r,"tfoot")?(l.html(`<table><thead></thead><tbody><tbody${e}</table>`),l.querySelectorAll("table").get(2).childNodes.detach()):t(r,"tr")?(l.html(`<table><tbody>${e}</tbody></table>`),l.querySelectorAll("tbody").get(0).childNodes.detach()):t(r,"td")?(l.html(`<table><tbody><tr>${e}</tr></tbody></table>`),l.querySelectorAll("tr").get(0).childNodes.detach()):(l.html(e),l.childNodes.detach())}}get(e){return e<this.rootNode.length?new m(this.rootNode[e]):m.absent}getAsElem(e,t=n.Optional.absent){return e<this.rootNode.length?n.Optional.fromNullable(this.rootNode[e]):t}filesFromElem(e){var t;return e<this.rootNode.length&&(null===(t=this.rootNode[e])||void 0===t?void 0:t.files)?this.rootNode[e].files:[]}allElems(){return this.rootNode}isAbsent(){return 0==this.length}isPresent(e){let t=this.isAbsent();return!t&&e&&e.call(this,this),!t}ifPresentLazy(e=function(){}){return this.isPresent.call(this,e),this}delete(){this.eachElem((e=>{e.parentNode&&e.parentNode.removeChild(e)}))}querySelectorAll(e){return-1!=e.indexOf("/shadow/")?this._querySelectorAllDeep(e):this._querySelectorAll(e)}closest(e){return-1!=e.indexOf("/shadow/")?this._closestDeep(e):this._closest(e)}byId(e,t){let r=[];return t&&(r=r.concat(...new a.Es2019Array(...(null==this?void 0:this.rootNode)||[]).filter((t=>e==t.id)).map((e=>new m(e))))),r=r.concat(this.querySelectorAll(`[id="${e}"]`)),new m(...r)}byIdDeep(e,t){let r=[];t&&(r=r.concat(new a.Es2019Array(...(null==this?void 0:this.rootNode)||[]).filter((t=>e==t.id)).map((e=>new m(e)))));let l=this.querySelectorAllDeep(`[id="${e}"]`);return l.length&&r.push(l),new m(...r)}byTagName(e,t,r){var l;let n=[];return t&&(n=new a.Es2019Array(...null!==(l=null==this?void 0:this.rootNode)&&void 0!==l?l:[]).filter((t=>(null==t?void 0:t.tagName)==e)).reduce(((e,t)=>e.concat([t])),n)),r?n.push(this.querySelectorAllDeep(e)):n.push(this.querySelectorAll(e)),new m(...n)}attr(e,t=null){return new v(this,e,t)}style(e,t=null){return new p(this,e,t)}hasClass(e){let t=!1;return this.eachElem((r=>{if(t=r.classList.contains(e),t)return!1})),t}addClass(e){return this.eachElem((t=>t.classList.add(e))),this}removeClass(e){return this.eachElem((t=>t.classList.remove(e))),this}isMultipartCandidate(e=!1){const t="input[type='file']";return this.matchesSelector(t)||(e?this.querySelectorAllDeep(t):this.querySelectorAll(t)).first().isPresent()}html(e){return n.Optional.fromNullable(e).isAbsent()?this.isPresent()?n.Optional.fromNullable(this.innerHTML):n.Optional.absent:(this.innerHTML=e,this)}dispatchEvent(e){return this.eachElem((t=>t.dispatchEvent(e))),this}set innerHTML(e){this.eachElem((t=>t.innerHTML=e))}get innerHTML(){let e=[];return this.eachElem((t=>e.push(t.innerHTML))),e.join("")}set innerHtml(e){this.innerHTML=e}get innerHtml(){return this.innerHTML}filterSelector(e){let t=[];return this.eachElem((r=>{this._mozMatchesSelector(r,e)&&t.push(r)})),new m(...t)}matchesSelector(e){return this.asArray.some((t=>this._mozMatchesSelector(t.getAsElem(0).value,e)))}getIf(...e){let t=this.childNodes;for(let r=0;r<e.length;r++)if(t=t.filterSelector(e[r]),t.isAbsent())return t;return t}eachElem(e){for(let t=0,r=this.rootNode.length;t<r&&!1!==e(this.rootNode[t],t);t++);return this}firstElem(e=(e=>e)){return this.rootNode.length>1&&e(this.rootNode[0],0),this}lastElem(e=(e=>e)){return this.rootNode.length>1&&e(this.rootNode[this.rootNode.length-1],0),this}each(e){return new a.Es2019Array(...this.rootNode).forEach(((t,r)=>{if(null!=t)return e(m.byId(t),r)})),this}replace(e){return this.each((t=>{let r=t.getAsElem(0).value,l=r.parentElement,n=r.nextElementSibling,s=r.previousElementSibling;null!=n?new m(n).insertBefore(e):s?new m(s).insertAfter(e):new m(l).append(e),t.delete()})),e}first(e=(e=>e)){return this.rootNode.length>=1?(e(this.get(0),0),this.get(0)):this}last(e=(e=>e)){if(this.rootNode.length>=1){let t=this.get(this.rootNode.length-1);return e(t,0),t}return this}filter(e){let t=[];return this.each((r=>{e(r)&&t.push(r)})),new m(...t)}globalEval(e,t){var r,l,n;const s=null!==(l=null===(r=document.getElementsByTagName("head"))||void 0===r?void 0:r[0])&&void 0!==l?l:null===(n=document.documentElement.getElementsByTagName("head"))||void 0===n?void 0:n[0],i=document.createElement("script");t&&(void 0!==(null==i?void 0:i.nonce)?i.nonce=t:i.setAttribute("nonce",t)),i.type="text/javascript",i.innerHTML=e;let o=s.appendChild(i);return s.removeChild(o),this}globalEvalSticky(e,t){let r=document.getElementsByTagName("head")[0]||document.documentElement,l=document.createElement("script");return this.applyNonce(t,l),l.type="text/javascript",l.innerHTML=e,r.appendChild(l),this}detach(){return this.eachElem((e=>{e.parentNode.removeChild(e)})),this}appendTo(e){return i.Lang.isString(e)?(this.appendTo(m.querySelectorAll(e)),this):(this.eachElem((t=>{e.getAsElem(0).orElseLazy((()=>({appendChild:()=>{}}))).value.appendChild(t)})),this)}loadScriptEval(e,t=0,r){return this._loadScriptEval(!1,e,t,r),this}loadScriptEvalSticky(e,t=0,r){return this._loadScriptEval(!0,e,t,r),this}insertAfter(...e){this.each((t=>{let r=t.getAsElem(0).value,l=r.parentNode;for(let t=0;t<e.length;t++){let n=r.nextSibling;e[t].eachElem((e=>{n?(l.insertBefore(e,n),r=n):l.appendChild(e)}))}}));let t=[];return t.push(this),t=t.concat(e),new m(...t)}insertBefore(...e){this.each((t=>{let r=t.getAsElem(0).value,l=r.parentNode;for(let t=0;t<e.length;t++)e[t].eachElem((e=>{l.insertBefore(e,r)}))}));let t=[];return t.push(this),t=t.concat(e),new m(...t)}orElse(...e){return this.isPresent()?this:new m(...e)}orElseLazy(e){return this.isPresent()?this:new m(e())}allParents(e){let t=this.parent(),r=[];for(;t.isPresent();)t.matchesSelector(e)&&r.push(t),t=t.parent();return new m(...r)}firstParent(e){let t=this.parent();for(;t.isPresent();){if(t.matchesSelector(e))return t;t=t.parent()}return m.absent}parentsWhileMatch(e){const t=[];let r=this.parent().filter((t=>t.matchesSelector(e)));for(;r.isPresent();)t.push(r),r=r.parent().filter((t=>t.matchesSelector(e)));return new m(...t)}parent(){let e=[];return this.eachElem((t=>{let r=t.parentNode||t.host||t.shadowRoot;r&&-1==e.indexOf(r)&&e.push(r)})),new m(...e)}copyAttrs(e){return e.eachElem((e=>{let t=f(e.attributes);for(let e of t){let t=e.value,r=e.name;switch(r){case"id":this.id.value=t;break;case"disabled":this.resolveAttributeHolder("disabled").disabled=t;break;case"checked":this.resolveAttributeHolder("checked").checked=t;break;default:this.attr(r).value=t}}})),this}outerHTML(e,t,r,l=!1){var n;if(this.isAbsent())return;let s=null===(n=null===document||void 0===document?void 0:document.activeElement)||void 0===n?void 0:n.id,i=s?m.getCaretPosition(document.activeElement):null,o=m.fromMarkup(e),a=[],u=this.getAsElem(0).value,h=o.get(0),c=u.parentNode,d=h.getAsElem(0).value;if(c.replaceChild(d,u),a.push(new m(d)),this.isAbsent())return this;let f=[];o.length>1&&(f=f.concat(...o.values.slice(1)),a.push(m.byId(d).insertAfter(new m(...f)))),t&&this.runScripts(),r&&this.runCss();let v=m.byId(s);return s&&v.isPresent()&&null!=i&&void 0!==i&&v.eachElem((e=>m.setCaretPosition(e,i))),o}runScripts(e=!1,t=g){const r=t=>{if(t.length){let r=[];new a.Es2019Array(...t).forEach((t=>{t.nonce?(r.length&&(this.globalEval(r.join("\n")),r.length=0),e?this.globalEvalSticky(t.evalText,t.nonce):this.globalEval(t.evalText,t.nonce)):r.push(t.evalText)})),r.length&&(e?this.globalEvalSticky(r.join("\n")):this.globalEval(r.join("\n")),r.length=0),t=[]}return t};let l=[],n=["","script","text/javascript","text/ecmascript","ecmascript"],s=s=>{var i,o,a,u;let c=s.tagName,f=(null!==(i=null==s?void 0:s.type)&&void 0!==i?i:"").toLowerCase();if(c&&d(c,"script")&&-1!=n.indexOf(f)){let n=s.getAttribute("src");if(void 0!==n&&null!=n&&n.length>0){let i=null!==(o=null==s?void 0:s.nonce)&&void 0!==o?o:s.getAttribute("nonce").value;t(n)&&(l=r(l),e?i?this.loadScriptEvalSticky(n,0,i):this.loadScriptEvalSticky(n,0):i?this.loadScriptEval(n,0,i):this.loadScriptEval(n,0))}else{let e=h(s.text||s.innerText||s.innerHTML),t=!0;for(;t;)t=!1,"\x3c!--"==e.substring(0,4)&&(e=e.substring(4),t=!0),"//\x3c!--"==e.substring(0,4)&&(e=e.substring(6),t=!0),"//<![CDATA["==e.substring(0,11)&&(e=e.substring(11),t=!0);let r=null!==(u=null!==(a=null==s?void 0:s.nonce)&&void 0!==a?a:s.getAttribute("nonce").value)&&void 0!==u?u:"";l.push({nonce:r,evalText:e})}}};try{new m(this.filterSelector("script"),this.querySelectorAll("script")).asArray.flatMap((e=>[...e.values])).sort(((e,t)=>e.compareDocumentPosition(t)-3)).forEach((e=>s(e))),r(l)}catch(e){console&&console.error&&console.error(e.message||e.description)}finally{s=null}return this}runCss(){return new m(this.filterSelector("link, style"),this.querySelectorAll("link, style")).asArray.flatMap((e=>[...e.values])).sort(((e,t)=>e.compareDocumentPosition(t)-3)).forEach((e=>(e=>{const t=m.byId(e),r=t.tagName.orElse("").value,l=m.byTagName("head");if(r&&d(r,"link")&&d(e.getAttribute("rel"),"stylesheet")){const r=e.getAttribute("rel"),n=l.querySelectorAll(`link[rel='stylesheet'][href='${r}']`);n.length?n.replace(t):l.append(t)}else if(r&&d(r,"style")){let e=t.innerHTML.replace(/\s+/gi,""),r=l.querySelectorAll("style"),n=r.asArray.filter((t=>t.innerHTML.replace(/\s+/gi,"")==e));r=new m(...n),r.length||l.append(t)}})(e))),this}click(){return this.fireEvent("click"),this}addEventListener(e,t,r){return this.eachElem((l=>l.addEventListener(e,t,r))),this}removeEventListener(e,t,r){return this.eachElem((l=>l.removeEventListener(e,t,r))),this}fireEvent(e,t={}){let r=new n.Config({bubbles:!0,cancelable:!0});r.shallowMerge(new n.Config(t)),r=JSON.parse(r.toJson()),this.eachElem((t=>{let l;if(t.ownerDocument)l=t.ownerDocument;else{if(9!=t.nodeType)throw new Error("Invalid node passed to fireEvent: "+t.id);l=t}if(t.dispatchEvent){let l=Event;switch(e){case"click":case"mousedown":case"mouseup":case"mousemove":l=this.global().MouseEvent;break;case"keyup":case"keydown":case"keypress":l=this.global().KeyboardEvent;break;case"focus":case"change":case"blur":case"select":break;default:throw"fireEvent: Couldn't find an event class for event '"+e+"'."}let n=new l(e,r);n.synthetic=!0,t.dispatchEvent(n)}else if(t.fireEvent){let n=l.createEventObject();n.synthetic=!0,Object.keys(r).forEach((e=>n[e]=r[e])),t.fireEvent("on"+e,n)}}))}textContent(e=""){return this.asArray.map((e=>e.getAsElem(0).orElseLazy((()=>({textContent:""}))).value.textContent||"")).reduce(((t,r)=>[t,e,r].join("")),"")}innerText(e=""){return this.asArray.map((e=>e.getAsElem(0).orElseLazy((()=>({innerText:""}))).value.innerText||"")).reduce(((t,r)=>[t,r].join(e)),"")}encodeFormElement(e=new n.Config({})){if(this.name.isAbsent())return;let t=e.shallowCopy;return this.each((e=>{var r,n;if(e.name.isAbsent())return;let s=e.name.value,i=e.tagName.orElse("__none__").value.toLowerCase(),o=e.type.orElse("__none__").value.toLowerCase();if(o=o.toLowerCase(),("input"==i||"textarea"==i||"select"==i)&&null!=s&&""!=s&&!e.disabled){if("select"==i){let r=e.getAsElem(0).value;if(r.selectedIndex>=0){let e=r.options.length;for(let l=0;l<e;l++)if(r.options[l].selected){let e=r.options[l];t.append(s).value=null!=e.getAttribute("value")?e.value:e.text}}}if(i!=l.SELECT&&o!=l.BUTTON&&o!=l.RESET&&o!=l.SUBMIT&&o!=l.IMAGE&&(o!=l.CHECKBOX&&o!=l.RADIO||e.checked)){let l=null===(n=null===(r=e.value)||void 0===r?void 0:r.value)||void 0===n?void 0:n.files,i=null!=l?l:[];if(null==i?void 0:i.length)t.assign(s).value=Array.from(i);else{if(l)return;t.append(s).value=e.inputValue.value}}}})),t}get cDATAAsString(){return this.asArray.flatMap((e=>e.childNodes.asArray)).filter((e=>{var t,r;return 4==(null===(r=null===(t=null==e?void 0:e.value)||void 0===t?void 0:t.value)||void 0===r?void 0:r.nodeType)})).reduce(((e,t)=>{var r,l,n;return e.push(null!==(n=null===(l=null===(r=null==t?void 0:t.value)||void 0===r?void 0:r.value)||void 0===l?void 0:l.data)&&void 0!==n?n:""),e}),[]).join("")}subNodes(e,t){return n.Optional.fromNullable(t).isAbsent()&&(t=this.length),new m(...this.rootNode.slice(e,Math.min(t,this.length)))}limits(e){return this._limits=e,this}hasNext(){let e=-1!=this._limits&&this.pos>=this._limits-1,t=this.pos>=this.values.length-1;return!(e||t)}next(){return this.hasNext()?(this.pos++,new m(this.values[this.pos])):null}lookAhead(e=1){return this.values.length-1<this.pos+e?s.dD.EO_STRM:new m(this.values[this.pos+e])}current(){return-1==this.pos?s.dD.BEF_STRM:new m(this.values[this.pos])}reset(){this.pos=-1}attachShadow(e={mode:"open"}){let t=[];return this.eachElem((r=>{let l;if(!(null==r?void 0:r.attachShadow))throw new Error("Shadow dom creation not supported by the browser, please use a shim, to gain this functionality");l=m.byId(r.attachShadow(e)),t.push(l)})),new m(...t)}waitUntilDom(e,t={attributes:!0,childList:!0,subtree:!0,timeout:500,interval:100}){return u(this,void 0,void 0,(function*(){return function(e,t,r={attributes:!0,childList:!0,subtree:!0,timeout:500,interval:100}){return new Promise(((l,n)=>{let s=null;const i=new Error("Mutation observer timeout");function o(e,t){let l=null;return t(e)?e:(l=r.childList?t(e)?e:e.childNodes.filter((e=>t(e))).first().value.value:r.subtree?t(e)?e:e.querySelectorAll(" * ").filter((e=>t(e))).first().value.value:t(e)?e:null,l)}let a=e;if(a=o(a,t))l(new m(a));else if("undefined"!=typeof MutationObserver){const o=setTimeout((()=>(s.disconnect(),n(i))),r.timeout),a=r=>{const n=new m(r.map((e=>e.target))).filter((e=>t(e))).first();n.isPresent()&&(clearTimeout(o),s.disconnect(),l(new m(n||e)))};s=new MutationObserver(a);let u=Object.assign({},r);delete u.timeout,e.eachElem((e=>{s.observe(e,u)}))}else{let s=setInterval((()=>{let r=o(e,t);r&&(a&&(clearTimeout(a),clearInterval(s),s=null),l(new m(r||e)))}),r.interval),a=setTimeout((()=>{s&&(clearInterval(s),n(i))}),r.timeout)}}))}(this,e,t)}))}get shadowElements(){let e=(this.querySelectorAll("*").filter((e=>e.hasShadow)).allElems()||[]).map((e=>e.shadowRoot));return new m(...e)}get shadowRoot(){let e=[];for(let t=0;t<this.rootNode.length;t++)this.rootNode[t].shadowRoot&&e.push(this.rootNode[t].shadowRoot);return new m(...e)}get hasShadow(){for(let e=0;e<this.rootNode.length;e++)if(this.rootNode[e].shadowRoot)return!0;return!1}static getCaretPosition(e){let t=0;try{if(null===document||void 0===document?void 0:document.selection){e.focus();let r=document.selection.createRange();r.moveStart("character",-e.value.length),t=r.text.length}}catch(e){}return t}static setCaretPosition(e,t){(null==e?void 0:e.focus)&&(null==e||e.focus()),(null==e?void 0:e.setSelectiongRange)&&(null==e||e.setSelectiongRange(t,t))}[Symbol.iterator](){return{next:()=>({done:!this.hasNext(),value:this.next()})}}concat(e,t=!0){const r=new m(...this.asArray.concat(e.asArray));if(!t)return r;let l={};return new m(...r.asArray.filter((e=>{const t=!(null==l?void 0:l[e.value.value.outerHTML]);return l[e.value.value.outerHTML]=!0,t})))}append(e){return this.each((t=>e.appendTo(t))),this}prependTo(e){return e.eachElem((e=>{e.prepend(...this.allElems())})),this}prepend(e){return this.eachElem((t=>{t.prepend(...e.allElems())})),this}_querySelectorAll(e){var t,r;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let l=[];for(let t=0;t<this.rootNode.length;t++){if(!(null===(r=this.rootNode[t])||void 0===r?void 0:r.querySelectorAll))continue;let n=this.rootNode[t].querySelectorAll(e);l=l.concat(f(n))}return new m(...l)}_querySelectorAllDeep(e){var t;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let r=new m(...this.rootNode),l=e.split(/\/shadow\//);for(let e=0;e<l.length;e++){if(""==l[e])continue;let t=l[e];r=r.querySelectorAll(t),e<l.length-1&&(r=r.shadowRoot)}return r}_closest(e){var t,r;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let l=[];for(let t=0;t<this.rootNode.length;t++){if(!(null===(r=this.rootNode[t])||void 0===r?void 0:r.closest))continue;let n=[this.rootNode[t].closest(e)];l=l.concat(...n)}return new m(...l)}_closestDeep(e){var t;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let r=new m(...this.rootNode),l=e.split(/\/shadow\//);for(let e=0;e<l.length;e++){if(""==l[e])continue;let t=l[e];r=r.closest(t),e<l.length-1&&(r=r.shadowRoot)}return r}_mozMatchesSelector(e,t){let r=e;return(r.matches||r.matchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector||r.webkitMatchesSelector||function(t){let r=(document||ownerDocument).querySelectorAll(t),l=r.length;for(;--l>=0&&r.item(l)!==e;);return l>-1}).call(e,t)}_loadScriptEval(e,t,r=0,l){let n=this.createSourceNode(t,l),s=this.createSourceNode(null,l),i=`nonce_${Date.now()}_${Math.random()}`;s.innerHTML=`document.head["${i}"] = true`;let o=document.head;if(o.appendChild(s),o.removeChild(s),o[i]){try{r?setTimeout((()=>{o.appendChild(n),e||o.removeChild(n)}),r):(o.appendChild(n),e||o.removeChild(n))}finally{delete o[i]}return this}}resolveAttributeHolder(e="value"){let t=[];return t[e]=null,e in this.getAsElem(0).value?this.getAsElem(0).value:t}createSourceNode(e,t){let r=document.createElement("script");return r.type="text/javascript",t&&(void 0!==(null==r?void 0:r.nonce)?r.nonce=t:r.setAttribute("nonce",t)),e&&(r.src=e),r}applyNonce(e,t){e&&(void 0!==(null==t?void 0:t.nonce)?t.nonce=e:t.setAttribute("nonce",e))}}m.absent=new m,m.global=o.R;class y{constructor(){this.data=[]}collect(e){this.data.push(e)}get finalValue(){return new m(...this.data)}}const b=m,E=m.querySelectorAll},484:function(e,t,r){r.d(t,{Es2019Array:function(){return l}});class l extends Array{constructor(...e){super(...e),Array.prototype.flatMap||(this.flatMap=e=>this._flatMap(e)),Array.prototype.flat||(this.flat=(e=1)=>this._flat(e))}concat(...e){return new l(...super.concat(...e))}reverse(){return new l(...super.reverse())}slice(e,t){return new l(...super.slice(e,t))}splice(e,t){return new l(...super.splice(e,t))}filter(e,t){return new l(...super.filter(e,t))}_flat(e=1){return this._flatResolve(this,e)}_flatResolve(e,t=1){if(0==t)return e;let r=[];return e.forEach((e=>{e=Array.isArray(e)?e:[e];let l=this._flatResolve(e,t-1);r=r.concat(l)})),new l(...r)}_flatMap(e,t=!1){let r=this.map((t=>e(t)));return this._flatResolve(r)}}},456:function(e,t,r){function l(){var e;let t="undefined"!=typeof globalThis&&globalThis.window?globalThis.window:"undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:void 0!==r.g&&(null===r.g||void 0===r.g?void 0:r.g.window)?r.g.window:void 0!==r.g?r.g:null;return null!==(e=null==t?void 0:t.window)&&void 0!==e?e:t}r.d(t,{R:function(){return l}})},805:function(e,t,r){r.d(t,{Lang:function(){return l}});var l,n=r(152);!function(e){function t(e){let t=/\s/,r=(e=e.replace(/^\s\s*/,"")).length;for(;t.test(e.charAt(--r)););return e.slice(0,r+1)}function r(e){return!!arguments.length&&null!=e&&("string"==typeof e||e instanceof String)}e.saveResolve=function(e,t=null){try{let r=e();return n.Optional.fromNullable(null!=r?r:t)}catch(e){return n.Optional.absent}},e.saveResolveLazy=function(e,t=null){try{let r=e();return n.Optional.fromNullable(null!=r?r:t())}catch(e){return n.Optional.absent}},e.strToArray=function(e,r=/\./gi){let l=[];return e.split(r).forEach((e=>{l.push(t(e))})),l},e.trim=t,e.objToArray=function(e,t=0,r=[]){return"__undefined__"==(null!=e?e:"__undefined__")?null!=r?r:null:e instanceof Array&&!t&&!r?e:r.concat(Array.prototype.slice.call(e,t))},e.equalsIgnoreCase=function(e,t){let r=null!=t?t:"___no_value__";return(null!=e?e:"___no_value__").toLowerCase()===r.toLowerCase()},e.assertType=function(e,t){return r(t)?typeof e==t:e instanceof t},e.isString=r,e.isFunc=function(e){return e instanceof Function||"function"==typeof e},e.objAssign=function(e,...t){if(null==e)throw new TypeError("Cannot convert undefined or null to object");let r=Object(e);return Object.assign?(t.forEach((e=>Object.assign(r,e))),r):(t.filter((e=>null!=e)).forEach((e=>{let t=e;Object.keys(t).filter((e=>Object.prototype.hasOwnProperty.call(t,e))).forEach((e=>r[e]=t[e]))})),r)}}(l||(l={}))},152:function(e,t,r){r.d(t,{CONFIG_ANY:function(){return c},CONFIG_VALUE:function(){return h},Config:function(){return d},Monad:function(){return i},Optional:function(){return o},ValueEmbedder:function(){return a}});var l=r(805),n=r(484),s=l.Lang.objAssign;class i{constructor(e){this._value=e}get value(){return this._value}map(e){e||(e=e=>e);let t=e(this.value);return new i(t)}flatMap(e){let t=this.map(e);for(;(null==t?void 0:t.value)instanceof i;)t=t.value;return t}}class o extends i{constructor(e){super(e)}get value(){return this._value instanceof i?this._value.flatMap().value:this._value}static fromNullable(e){return new o(e)}isAbsent(){return void 0===this.value||null==this.value}isPresent(e){let t=this.isAbsent();return!t&&e&&e.call(this,this),!t}ifPresentLazy(e=(()=>{})){return this.isPresent.call(this,e),this}orElse(e){return this.isPresent()?this:null==e?o.absent:this.flatMap((()=>e))}orElseLazy(e){return this.isPresent()?this:this.flatMap(e)}flatMap(e){let t=super.flatMap(e);return t instanceof o?t.flatMap():o.fromNullable(t.value)}getIf(...e){e=this.preprocessKeys(...e);let t=this;for(let r=0;r<e.length;r++){let l=this.keyVal(e[r]),n=this.arrayIndex(e[r]);if(""===l&&n>=0){if(t=this.getClass().fromNullable(t.value instanceof Array?t.value.length<n?null:t.value[n]:null),t.isAbsent())return t}else if(l&&n>=0){if(t.getIfPresent(l).isAbsent())return t;if(t=t.getIfPresent(l).value instanceof Array?this.getClass().fromNullable(t.getIfPresent(l).value[n]):this.getClass().absent,t.isAbsent())return t}else{if(t=t.getIfPresent(l),t.isAbsent())return t;n>-1&&(t=this.getClass().fromNullable(t.value[n]))}}return t}match(e){return!this.isAbsent()&&e(this.value)}get(e=o.absent){return this.isAbsent()?this.getClass().fromNullable(e).flatMap():this.getClass().fromNullable(this.value).flatMap()}toJson(){return JSON.stringify(this.value)}getClass(){return o}arrayIndex(e){let t=e.indexOf("["),r=e.indexOf("]");return t>=0&&r>0&&t<r?parseInt(e.substring(t+1,r)):-1}keyVal(e){let t=e.indexOf("[");return t>=0?e.substring(0,t):e}getIfPresent(e){return this.isAbsent()?this.getClass().absent:this.getClass().fromNullable(this.value[e]).flatMap()}resolve(e){if(this.isAbsent())return o.absent;try{return o.fromNullable(e(this.value))}catch(e){return o.absent}}preprocessKeys(...e){return new n.Es2019Array(...e).flatMap((e=>new n.Es2019Array(...e.split(/]\s*\[/gi)).map((e=>(-1==(e=e.replace(/^\s+|\s+$/g,"")).indexOf("[")&&-1!=e.indexOf("]")&&(e="["+e),-1==e.indexOf("]")&&-1!=e.indexOf("[")&&(e+="]"),e)))))}}o.absent=o.fromNullable(null);class a extends o{constructor(e,t="value"){super(e),this.key=t}get value(){return this._value?this._value[this.key]:null}set value(e){this._value&&(this._value[this.key]=e)}orElse(e){let t={};return t[this.key]=e,this.isPresent()?this:new a(t,this.key)}orElseLazy(e){if(this.isPresent())return this;{let t={};return t[this.key]=e(),new a(t,this.key)}}getClass(){return a}static fromNullable(e,t="value"){return new a(e,t)}}a.absent=a.fromNullable(null);class u extends a{constructor(e,t,r){super(e,t),this.arrPos=null!=r?r:-1}get value(){return""==this.key&&this.arrPos>=0?this._value[this.arrPos]:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]:this._value[this.key]}set value(e){""==this.key&&this.arrPos>=0?this._value[this.arrPos]=e:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]=e:this._value[this.key]=e}}u.absent=u.fromNullable(null);const h="__END_POINT__",c="__ANY_POINT__";class d extends o{constructor(e,t){super(e),this.configDef=t}get shallowCopy(){return this.shallowCopy$()}shallowCopy$(){let e=new d({});return e.shallowMerge(this.value),e}get deepCopy(){return this.deepCopy$()}deepCopy$(){return new d(s({},this.value))}static fromNullable(e){return new d(e)}shallowMerge(e,t=!0,r=!1){for(let l in e.value)void 0!==l&&null!=l&&(!t&&l in this.value||(r?Array.isArray(e.getIf(l).value)?new n.Es2019Array(...e.getIf(l).value).forEach((e=>this.append(l).value=e)):this.append(l).value=e.getIf(l).value:this.assign(l).value=e.getIf(l).value))}append(...e){if(e.length<1)return;this.assertAccessPath(...e);let t=e[e.length-1],r=this.getIf(...e).isPresent();this.buildPath(...e);let l=this.arrayIndex(t);if(l>-1)throw Error("Append only possible on non array properties, use assign on indexed data");let n=this.getIf(...e).value;return Array.isArray(n)||(n=this.assign(...e).value=[n]),r&&n.push({}),l=n.length-1,new u(1==e.length?this.value:this.getIf.apply(this,e.slice(0,e.length-1)).value,t,l)}appendIf(e,...t){return e?this.append(...t):{value:null}}assign(...e){if(e.length<1)return;this.assertAccessPath(...e),this.buildPath(...e);let t=this.keyVal(e[e.length-1]),r=this.arrayIndex(e[e.length-1]);return new u(1==e.length?this.value:this.getIf.apply(this,e.slice(0,e.length-1)).value,t,r)}assignIf(e,...t){return e?this.assign(...t):{value:null}}getIf(...e){return this.assertAccessPath(...e),this.getClass().fromNullable(super.getIf.apply(this,e).value)}get(e){return this.getClass().fromNullable(super.get(e).value)}delete(e){return e in this.value&&delete this.value[e],this}toJson(){return JSON.stringify(this.value)}getClass(){return d}setVal(e){this._value=e}assertAccessPath(...e){var t,r,l,s,i,a,u,h,d;if(e=this.preprocessKeys(...e),!this.configDef)return;let f=o.fromNullable(Object.keys(this.configDef).map((e=>{let t={};return t[e]=this.configDef[e],t})));for(let v=0;v<e.length;v++){let p=this.keyVal(e[v]),g=this.arrayIndex(e[v]);if(f=this.isArray(g)?""!=p?Array.isArray(f.value)?o.fromNullable(null===(r=null===(t=new n.Es2019Array(...f.value).find((e=>{var t;return!(null===(t=null==e?void 0:e[p])||void 0===t||!t)})))||void 0===t?void 0:t[p])||void 0===r?void 0:r[g]):o.fromNullable(null!==(i=null===(s=null===(l=f.value)||void 0===l?void 0:l[p])||void 0===s?void 0:s[g])&&void 0!==i?i:null):Array.isArray(f.value)?o.fromNullable(null===(a=f.value)||void 0===a?void 0:a[g]):o.absent:Array.isArray(f.value)?o.fromNullable(null===(u=new n.Es2019Array(...f.value).find((e=>{var t;return!(null===(t=null==e?void 0:e[p])||void 0===t||!t)})))||void 0===u?void 0:u[p]):o.fromNullable(null!==(d=null===(h=f.value)||void 0===h?void 0:h[p])&&void 0!==d?d:null),!f.isPresent())throw Error("Access Path to config invalid");if(f.value==c)return}}buildPath(...e){e=this.preprocessKeys(...e);let t=this,r=this.getClass().fromNullable(null),l=-1,n=function(e,t){let r=e.length,l=r+t;for(let t=r;t<l;t++)e.push({})};for(let s=0;s<e.length;s++){let i=this.keyVal(e[s]),o=this.arrayIndex(e[s]);if(this.isArrayPos(i,o)){t.setVal(t.value instanceof Array?t.value:[]),n(t.value,o+1),l>=0&&(r.value[l]=t.value),r=t,l=o,t=this.getClass().fromNullable(t.value[o]);continue}let a=t.getIf(i);if(this.isNoArray(o))a.isAbsent()?a=this.getClass().fromNullable(t.value[i]={}):t=a;else{let e=a.value instanceof Array?a.value:[];n(e,o+1),t.value[i]=e,a=this.getClass().fromNullable(e[o])}r=t,l=o,t=a}return this}isNoArray(e){return-1==e}isArray(e){return!this.isNoArray(e)}isArrayPos(e,t){return""===e&&t>=0}}},255:function(e,t,r){r.d(t,{dD:function(){return l}});var l;r(152),r(484);!function(e){e.EO_STRM="__EO_STRM__",e.BEF_STRM="___BEF_STRM__"}(l||(l={}))},121:function(e,t,r){r.d(t,{XMLQuery:function(){return o},XQ:function(){return a}});var l=r(805),n=r(585),s=r(456),i=l.Lang.isString;class o extends n.DomQuery{constructor(e,t="text/xml"){let r=e=>{if(null==e)return null;return l.Lang.saveResolveLazy((()=>new((0,s.R)().DOMParser)),(()=>(()=>{let e=new ActiveXObject("Microsoft.XMLDOM");return e.async=!1,{parseFromString:(t,r)=>e.loadXML(t)}})())).value.parseFromString(e,t)};i(e)?super(r(e)):super(e)}isXMLParserError(){return this.querySelectorAll("parsererror").isPresent()}toString(){let e=[];return this.eachElem((t=>{var r,l,n,i;let o=null!==(i=null===(n=null===(l=null===(r=(0,s.R)())||void 0===r?void 0:r.XMLSerializer)||void 0===l?void 0:l.constructor())||void 0===n?void 0:n.serializeToString(t))&&void 0!==i?i:null==t?void 0:t.xml;o&&e.push(o)})),e.join("")}parserErrorText(e){return this.querySelectorAll("parsererror").textContent(e)}static parseXML(e){return new o(e)}static parseHTML(e){return new o(e,"text/html")}static fromString(e,t="text/xml"){return new o(e,t)}}const a=o}},t={};function r(l){var n=t[l];if(void 0!==n)return n.exports;var s=t[l]={exports:{}};return e[l](s,s.exports,r),s.exports}r.d=function(e,t){for(var l in t)r.o(t,l)&&!r.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var l={};return function(){r.r(l),r.d(l,{CONFIG_ANY:function(){return n.CONFIG_ANY},CONFIG_VALUE:function(){return n.CONFIG_VALUE},Config:function(){return n.Config},DQ:function(){return e.DQ},DQ$:function(){return e.DQ$},DomQuery:function(){return e.DomQuery},DomQueryCollector:function(){return e.DomQueryCollector},ElementAttribute:function(){return e.ElementAttribute},Lang:function(){return t.Lang},Monad:function(){return n.Monad},Optional:function(){return n.Optional},ValueEmbedder:function(){return n.ValueEmbedder},XMLQuery:function(){return s.XMLQuery},XQ:function(){return s.XQ}});var e=r(585),t=r(805),n=r(152),s=r(121)}(),l}())}}}));
//# sourceMappingURL=index_core.js.map