require([],(function(){return function(){"use strict";var e={585:function(e,t,l){l.d(t,{DomQuery:function(){return m}});var r,n=l(152),s=l(255),i=l(805),a=l(456),o=l(484),u=function(e,t,l,r){return new(l||(l=Promise))((function(n,s){function i(e){try{o(r.next(e))}catch(e){s(e)}}function a(e){try{o(r.throw(e))}catch(e){s(e)}}function o(e){var t;e.done?n(e.value):(t=e.value,t instanceof l?t:new l((function(e){e(t)}))).then(i,a)}o((r=r.apply(e,t||[])).next())}))},h=i.Lang.trim,c=i.Lang.isString,d=i.Lang.equalsIgnoreCase,f=i.Lang.objToArray;!function(e){e.SELECT="select",e.BUTTON="button",e.SUBMIT="submit",e.RESET="reset",e.IMAGE="image",e.RADIO="radio",e.CHECKBOX="checkbox"}(r||(r={}));class v extends n.ValueEmbedder{constructor(e,t,l=null){super(e,t),this.element=e,this.name=t,this.defaultVal=l}get value(){let e=this.element.get(0).orElse().values;return e.length?e[0].getAttribute(this.name):this.defaultVal}set value(e){let t=this.element.get(0).orElse().values;for(let l=0;l<t.length;l++)t[l].setAttribute(this.name,e);t[0].setAttribute(this.name,e)}getClass(){return v}static fromNullable(e,t="value"){return new v(e,t)}}class p extends n.ValueEmbedder{constructor(e,t,l=null){super(e,t),this.element=e,this.name=t,this.defaultVal=l}get value(){let e=this.element.values;return e.length?e[0].style[this.name]:this.defaultVal}set value(e){let t=this.element.values;for(let l=0;l<t.length;l++)t[l].style[this.name]=e}getClass(){return v}static fromNullable(e,t="value"){return new v(e,t)}}const g=()=>!0;class m{constructor(...e){if(this.rootNode=[],this.pos=-1,this._limits=-1,!n.Optional.fromNullable(e).isAbsent()&&e.length)for(let t=0;t<e.length;t++)if(e[t])if(c(e[t])){let l=m.querySelectorAll(e[t]);l.isAbsent()||e.push(...l.values)}else e[t]instanceof m?this.rootNode.push(...e[t].values):this.rootNode.push(e[t]);else;}get value(){return this.getAsElem(0)}get values(){return this.allElems()}get global(){return a.R}get stream(){throw Error("Not implemented, include Stream.ts for this to work")}get lazyStream(){throw Error("Not implemented, include Stream.ts for this to work")}get id(){return new v(this.get(0),"id")}get length(){return this.rootNode.length}get tagName(){return this.getAsElem(0).getIf("tagName")}get nodeName(){return this.getAsElem(0).getIf("nodeName")}isTag(e){return!this.isAbsent()&&(this.nodeName.orElse("__none___").value.toLowerCase()==e.toLowerCase()||this.tagName.orElse("__none___").value.toLowerCase()==e.toLowerCase())}get type(){return this.getAsElem(0).getIf("type")}get name(){return new n.ValueEmbedder(this.getAsElem(0).value,"name")}get inputValue(){return this.getAsElem(0).getIf("value").isPresent()?new n.ValueEmbedder(this.getAsElem(0).value):n.ValueEmbedder.absent}get val(){return this.inputValue.value}set val(e){this.inputValue.value=e}get nodeId(){return this.id.value}set nodeId(e){this.id.value=e}get checked(){return new o.Es2019Array(...this.values).every((e=>!!e.checked))}set checked(e){this.eachElem((t=>t.checked=e))}get elements(){return this.querySelectorAll("input, checkbox, select, textarea, fieldset")}get deepElements(){return this.querySelectorAllDeep("input, select, textarea, checkbox, fieldset")}querySelectorAllDeep(e){let t=[],l=this.querySelectorAll(e);l.length&&t.push(l);let r=this.querySelectorAll("*").shadowRoot;if(r.length){let l=r.querySelectorAllDeep(e);l.length&&t.push(l)}return new m(...t)}get disabled(){return this.attr("disabled").isPresent()}set disabled(e){e?this.attr("disabled").value="disabled":this.removeAttribute("disabled")}removeAttribute(e){this.eachElem((t=>t.removeAttribute(e)))}get childNodes(){let e=[];return this.eachElem((t=>{e=e.concat(f(t.childNodes))})),new m(...e)}get asArray(){return new o.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>m.byId(e)))}get offsetWidth(){return new o.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>e.offsetWidth)).reduce(((e,t)=>e+t),0)}get offsetHeight(){return new o.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>e.offsetHeight)).reduce(((e,t)=>e+t),0)}get offsetLeft(){return new o.Es2019Array(...this.rootNode).filter((e=>null!=e)).map((e=>e.offsetLeft)).reduce(((e,t)=>e+t),0)}get offsetTop(){return new o.Es2019Array(this.rootNode).filter((e=>null!=e)).map((e=>e.offsetTop)).reduce(((e,t)=>e+t),0)}get asNodeArray(){return new o.Es2019Array(...this.rootNode.filter((e=>null!=e)))}static querySelectorAllDeep(e){return new m(document).querySelectorAllDeep(e)}static querySelectorAll(e){return-1!=e.indexOf("/shadow/")?new m(document)._querySelectorAllDeep(e):new m(document)._querySelectorAll(e)}static byId(e,t=!1){return c(e)?t?new m(document).byIdDeep(e):new m(document).byId(e):new m(e)}static byTagName(e){return c(e)?new m(document).byTagName(e):new m(e)}static globalEval(e,t){return new m(document).globalEval(e,t)}static globalEvalSticky(e,t){return new m(document).globalEvalSticky(e,t)}static fromMarkup(e){const t=document.implementation.createHTMLDocument("");let l=(e=h(e)).toLowerCase();if(-1!=l.search(/<!doctype[^\w\-]+/gi)||-1!=l.search(/<html[^\w\-]+/gi)||-1!=l.search(/<head[^\w\-]+/gi)||-1!=l.search(/<body[^\w\-]+/gi))return t.documentElement.innerHTML=e,new m(t.documentElement);{let t=function(e,t){let l=["<",t,">"].join(""),r=["<",t," "].join("");return 0==e.indexOf(l)||0==e.indexOf(r)},r=new m(document.createElement("div"));return t(l,"thead")||t(l,"tbody")?(r.html(`<table>${e}</table>`),r.querySelectorAll("table").get(0).childNodes.detach()):t(l,"tfoot")?(r.html(`<table><thead></thead><tbody><tbody${e}</table>`),r.querySelectorAll("table").get(2).childNodes.detach()):t(l,"tr")?(r.html(`<table><tbody>${e}</tbody></table>`),r.querySelectorAll("tbody").get(0).childNodes.detach()):t(l,"td")?(r.html(`<table><tbody><tr>${e}</tr></tbody></table>`),r.querySelectorAll("tr").get(0).childNodes.detach()):(r.html(e),r.childNodes.detach())}}get(e){return e<this.rootNode.length?new m(this.rootNode[e]):m.absent}getAsElem(e,t=n.Optional.absent){return e<this.rootNode.length?n.Optional.fromNullable(this.rootNode[e]):t}filesFromElem(e){var t;return e<this.rootNode.length&&(null===(t=this.rootNode[e])||void 0===t?void 0:t.files)?this.rootNode[e].files:[]}allElems(){return this.rootNode}isAbsent(){return 0==this.length}isPresent(e){let t=this.isAbsent();return!t&&e&&e.call(this,this),!t}ifPresentLazy(e=function(){}){return this.isPresent.call(this,e),this}delete(){this.eachElem((e=>{e.parentNode&&e.parentNode.removeChild(e)}))}querySelectorAll(e){return-1!=e.indexOf("/shadow/")?this._querySelectorAllDeep(e):this._querySelectorAll(e)}closest(e){return-1!=e.indexOf("/shadow/")?this._closestDeep(e):this._closest(e)}byId(e,t){let l=[];return t&&(l=l.concat(...new o.Es2019Array(...(null==this?void 0:this.rootNode)||[]).filter((t=>e==t.id)).map((e=>new m(e))))),l=l.concat(this.querySelectorAll(`[id="${e}"]`)),new m(...l)}byIdDeep(e,t){let l=[];t&&(l=l.concat(new o.Es2019Array(...(null==this?void 0:this.rootNode)||[]).filter((t=>e==t.id)).map((e=>new m(e)))));let r=this.querySelectorAllDeep(`[id="${e}"]`);return r.length&&l.push(r),new m(...l)}byTagName(e,t,l){var r;let n=[];return t&&(n=new o.Es2019Array(...null!==(r=null==this?void 0:this.rootNode)&&void 0!==r?r:[]).filter((t=>(null==t?void 0:t.tagName)==e)).reduce(((e,t)=>e.concat([t])),n)),l?n.push(this.querySelectorAllDeep(e)):n.push(this.querySelectorAll(e)),new m(...n)}attr(e,t=null){return new v(this,e,t)}style(e,t=null){return new p(this,e,t)}hasClass(e){let t=!1;return this.eachElem((l=>{if(t=l.classList.contains(e),t)return!1})),t}addClass(e){return this.eachElem((t=>t.classList.add(e))),this}removeClass(e){return this.eachElem((t=>t.classList.remove(e))),this}isMultipartCandidate(e=!1){const t="input[type='file']";return this.matchesSelector(t)||(e?this.querySelectorAllDeep(t):this.querySelectorAll(t)).first().isPresent()}html(e){return n.Optional.fromNullable(e).isAbsent()?this.isPresent()?n.Optional.fromNullable(this.innerHTML):n.Optional.absent:(this.innerHTML=e,this)}dispatchEvent(e){return this.eachElem((t=>t.dispatchEvent(e))),this}set innerHTML(e){this.eachElem((t=>t.innerHTML=e))}get innerHTML(){let e=[];return this.eachElem((t=>e.push(t.innerHTML))),e.join("")}set innerHtml(e){this.innerHTML=e}get innerHtml(){return this.innerHTML}filterSelector(e){let t=[];return this.eachElem((l=>{this._mozMatchesSelector(l,e)&&t.push(l)})),new m(...t)}matchesSelector(e){return this.asArray.some((t=>this._mozMatchesSelector(t.getAsElem(0).value,e)))}getIf(...e){let t=this.childNodes;for(let l=0;l<e.length;l++)if(t=t.filterSelector(e[l]),t.isAbsent())return t;return t}eachElem(e){for(let t=0,l=this.rootNode.length;t<l&&!1!==e(this.rootNode[t],t);t++);return this}firstElem(e=(e=>e)){return this.rootNode.length>1&&e(this.rootNode[0],0),this}lastElem(e=(e=>e)){return this.rootNode.length>1&&e(this.rootNode[this.rootNode.length-1],0),this}each(e){return new o.Es2019Array(...this.rootNode).forEach(((t,l)=>{if(null!=t)return e(m.byId(t),l)})),this}replace(e){return this.each((t=>{let l=t.getAsElem(0).value,r=l.parentElement,n=l.nextElementSibling,s=l.previousElementSibling;null!=n?new m(n).insertBefore(e):s?new m(s).insertAfter(e):new m(r).append(e),t.delete()})),e}first(e=(e=>e)){return this.rootNode.length>=1?(e(this.get(0),0),this.get(0)):this}last(e=(e=>e)){if(this.rootNode.length>=1){let t=this.get(this.rootNode.length-1);return e(t,0),t}return this}filter(e){let t=[];return this.each((l=>{e(l)&&t.push(l)})),new m(...t)}globalEval(e,t){var l,r,n;const s=null!==(r=null===(l=document.getElementsByTagName("head"))||void 0===l?void 0:l[0])&&void 0!==r?r:null===(n=document.documentElement.getElementsByTagName("head"))||void 0===n?void 0:n[0],i=document.createElement("script");t&&(void 0!==(null==i?void 0:i.nonce)?i.nonce=t:i.setAttribute("nonce",t)),i.type="text/javascript",i.innerHTML=e;let a=s.appendChild(i);return s.removeChild(a),this}globalEvalSticky(e,t){let l=document.getElementsByTagName("head")[0]||document.documentElement,r=document.createElement("script");return this.applyNonce(t,r),r.type="text/javascript",r.innerHTML=e,l.appendChild(r),this}detach(){return this.eachElem((e=>{e.parentNode.removeChild(e)})),this}appendTo(e){return i.Lang.isString(e)?(this.appendTo(m.querySelectorAll(e)),this):(this.eachElem((t=>{e.getAsElem(0).orElseLazy((()=>({appendChild:()=>{}}))).value.appendChild(t)})),this)}loadScriptEval(e,t=0,l){return this._loadScriptEval(!1,e,t,l),this}loadScriptEvalSticky(e,t=0,l){return this._loadScriptEval(!0,e,t,l),this}insertAfter(...e){this.each((t=>{let l=t.getAsElem(0).value,r=l.parentNode;for(let t=0;t<e.length;t++){let n=l.nextSibling;e[t].eachElem((e=>{n?(r.insertBefore(e,n),l=n):r.appendChild(e)}))}}));let t=[];return t.push(this),t=t.concat(e),new m(...t)}insertBefore(...e){this.each((t=>{let l=t.getAsElem(0).value,r=l.parentNode;for(let t=0;t<e.length;t++)e[t].eachElem((e=>{r.insertBefore(e,l)}))}));let t=[];return t.push(this),t=t.concat(e),new m(...t)}orElse(...e){return this.isPresent()?this:new m(...e)}orElseLazy(e){return this.isPresent()?this:new m(e())}allParents(e){let t=this.parent(),l=[];for(;t.isPresent();)t.matchesSelector(e)&&l.push(t),t=t.parent();return new m(...l)}firstParent(e){let t=this.parent();for(;t.isPresent();){if(t.matchesSelector(e))return t;t=t.parent()}return m.absent}parentsWhileMatch(e){const t=[];let l=this.parent().filter((t=>t.matchesSelector(e)));for(;l.isPresent();)t.push(l),l=l.parent().filter((t=>t.matchesSelector(e)));return new m(...t)}parent(){let e=[];return this.eachElem((t=>{let l=t.parentNode||t.host||t.shadowRoot;l&&-1==e.indexOf(l)&&e.push(l)})),new m(...e)}copyAttrs(e){return e.eachElem((e=>{let t=f(e.attributes);for(let e of t){let t=e.value,l=e.name;switch(l){case"id":this.id.value=t;break;case"disabled":this.resolveAttributeHolder("disabled").disabled=t;break;case"checked":this.resolveAttributeHolder("checked").checked=t;break;default:this.attr(l).value=t}}})),this}outerHTML(e,t,l,r=!1){var n;if(this.isAbsent())return;let s=null===(n=null===document||void 0===document?void 0:document.activeElement)||void 0===n?void 0:n.id,i=s?m.getCaretPosition(document.activeElement):null,a=m.fromMarkup(e),o=[],u=this.getAsElem(0).value,h=a.get(0),c=u.parentNode,d=h.getAsElem(0).value;if(c.replaceChild(d,u),o.push(new m(d)),this.isAbsent())return this;let f=[];a.length>1&&(f=f.concat(...a.values.slice(1)),o.push(m.byId(d).insertAfter(new m(...f)))),t&&this.runScripts(),l&&this.runCss();let v=m.byId(s);return s&&v.isPresent()&&null!=i&&void 0!==i&&v.eachElem((e=>m.setCaretPosition(e,i))),a}runScripts(e=!1,t=g){const l=t=>{if(t.length){let l=[];new o.Es2019Array(...t).forEach((t=>{t.nonce?(l.length&&(this.globalEval(l.join("\n")),l.length=0),e?this.globalEvalSticky(t.evalText,t.nonce):this.globalEval(t.evalText,t.nonce)):l.push(t.evalText)})),l.length&&(e?this.globalEvalSticky(l.join("\n")):this.globalEval(l.join("\n")),l.length=0),t=[]}return t};let r=[],n=["","script","text/javascript","text/ecmascript","ecmascript"],s=s=>{var i,a,o,u;let c=s.tagName,f=(null!==(i=null==s?void 0:s.type)&&void 0!==i?i:"").toLowerCase();if(c&&d(c,"script")&&-1!=n.indexOf(f)){let n=s.getAttribute("src");if(void 0!==n&&null!=n&&n.length>0){let i=null!==(a=null==s?void 0:s.nonce)&&void 0!==a?a:s.getAttribute("nonce").value;t(n)&&(r=l(r),e?i?this.loadScriptEvalSticky(n,0,i):this.loadScriptEvalSticky(n,0):i?this.loadScriptEval(n,0,i):this.loadScriptEval(n,0))}else{let e=h(s.text||s.innerText||s.innerHTML),t=!0;for(;t;)t=!1,"\x3c!--"==e.substring(0,4)&&(e=e.substring(4),t=!0),"//\x3c!--"==e.substring(0,4)&&(e=e.substring(6),t=!0),"//<![CDATA["==e.substring(0,11)&&(e=e.substring(11),t=!0);let l=null!==(u=null!==(o=null==s?void 0:s.nonce)&&void 0!==o?o:s.getAttribute("nonce").value)&&void 0!==u?u:"";r.push({nonce:l,evalText:e})}}};try{new m(this.filterSelector("script"),this.querySelectorAll("script")).asArray.flatMap((e=>[...e.values])).sort(((e,t)=>e.compareDocumentPosition(t)-3)).forEach((e=>s(e))),l(r)}catch(e){console&&console.error&&console.error(e.message||e.description)}finally{s=null}return this}runCss(){return new m(this.filterSelector("link, style"),this.querySelectorAll("link, style")).asArray.flatMap((e=>[...e.values])).sort(((e,t)=>e.compareDocumentPosition(t)-3)).forEach((e=>(e=>{const t=m.byId(e),l=t.tagName.orElse("").value,r=m.byTagName("head");if(l&&d(l,"link")&&d(e.getAttribute("rel"),"stylesheet")){const l=e.getAttribute("rel"),n=r.querySelectorAll(`link[rel='stylesheet'][href='${l}']`);n.length?n.replace(t):r.append(t)}else if(l&&d(l,"style")){let e=t.innerHTML.replace(/\s+/gi,""),l=r.querySelectorAll("style"),n=l.asArray.filter((t=>t.innerHTML.replace(/\s+/gi,"")==e));l=new m(...n),l.length||r.append(t)}})(e))),this}click(){return this.fireEvent("click"),this}addEventListener(e,t,l){return this.eachElem((r=>r.addEventListener(e,t,l))),this}removeEventListener(e,t,l){return this.eachElem((r=>r.removeEventListener(e,t,l))),this}fireEvent(e,t={}){let l=new n.Config({bubbles:!0,cancelable:!0});l.shallowMerge(new n.Config(t)),l=JSON.parse(l.toJson()),this.eachElem((t=>{let r;if(t.ownerDocument)r=t.ownerDocument;else{if(9!=t.nodeType)throw new Error("Invalid node passed to fireEvent: "+t.id);r=t}if(t.dispatchEvent){let r=Event;switch(e){case"click":case"mousedown":case"mouseup":case"mousemove":r=this.global().MouseEvent;break;case"keyup":case"keydown":case"keypress":r=this.global().KeyboardEvent;break;case"focus":case"change":case"blur":case"select":break;default:throw"fireEvent: Couldn't find an event class for event '"+e+"'."}let n=new r(e,l);n.synthetic=!0,t.dispatchEvent(n)}else if(t.fireEvent){let n=r.createEventObject();n.synthetic=!0,Object.keys(l).forEach((e=>n[e]=l[e])),t.fireEvent("on"+e,n)}}))}textContent(e=""){return this.asArray.map((e=>e.getAsElem(0).orElseLazy((()=>({textContent:""}))).value.textContent||"")).reduce(((t,l)=>[t,e,l].join("")),"")}innerText(e=""){return this.asArray.map((e=>e.getAsElem(0).orElseLazy((()=>({innerText:""}))).value.innerText||"")).reduce(((t,l)=>[t,l].join(e)),"")}encodeFormElement(e=new n.Config({})){if(this.name.isAbsent())return;let t=e.shallowCopy;return this.each((e=>{var l,n;if(e.name.isAbsent())return;let s=e.name.value,i=e.tagName.orElse("__none__").value.toLowerCase(),a=e.type.orElse("__none__").value.toLowerCase();if(a=a.toLowerCase(),("input"==i||"textarea"==i||"select"==i)&&null!=s&&""!=s&&!e.disabled){if("select"==i){let l=e.getAsElem(0).value;if(l.selectedIndex>=0){let e=l.options.length;for(let r=0;r<e;r++)if(l.options[r].selected){let e=l.options[r];t.append(s).value=null!=e.getAttribute("value")?e.value:e.text}}}if(i!=r.SELECT&&a!=r.BUTTON&&a!=r.RESET&&a!=r.SUBMIT&&a!=r.IMAGE&&(a!=r.CHECKBOX&&a!=r.RADIO||e.checked)){let r=null===(n=null===(l=e.value)||void 0===l?void 0:l.value)||void 0===n?void 0:n.files,i=null!=r?r:[];if(null==i?void 0:i.length)t.assign(s).value=Array.from(i);else{if(r)return;t.append(s).value=e.inputValue.value}}}})),t}get cDATAAsString(){return this.asArray.flatMap((e=>e.childNodes.asArray)).filter((e=>{var t,l;return 4==(null===(l=null===(t=null==e?void 0:e.value)||void 0===t?void 0:t.value)||void 0===l?void 0:l.nodeType)})).reduce(((e,t)=>{var l,r,n;return e.push(null!==(n=null===(r=null===(l=null==t?void 0:t.value)||void 0===l?void 0:l.value)||void 0===r?void 0:r.data)&&void 0!==n?n:""),e}),[]).join("")}subNodes(e,t){return n.Optional.fromNullable(t).isAbsent()&&(t=this.length),new m(...this.rootNode.slice(e,Math.min(t,this.length)))}limits(e){return this._limits=e,this}hasNext(){let e=-1!=this._limits&&this.pos>=this._limits-1,t=this.pos>=this.values.length-1;return!(e||t)}next(){return this.hasNext()?(this.pos++,new m(this.values[this.pos])):null}lookAhead(e=1){return this.values.length-1<this.pos+e?s.dD.EO_STRM:new m(this.values[this.pos+e])}current(){return-1==this.pos?s.dD.BEF_STRM:new m(this.values[this.pos])}reset(){this.pos=-1}attachShadow(e={mode:"open"}){let t=[];return this.eachElem((l=>{let r;if(!(null==l?void 0:l.attachShadow))throw new Error("Shadow dom creation not supported by the browser, please use a shim, to gain this functionality");r=m.byId(l.attachShadow(e)),t.push(r)})),new m(...t)}waitUntilDom(e,t={attributes:!0,childList:!0,subtree:!0,timeout:500,interval:100}){return u(this,void 0,void 0,(function*(){return function(e,t,l={attributes:!0,childList:!0,subtree:!0,timeout:500,interval:100}){return new Promise(((r,n)=>{let s=null;const i=new Error("Mutation observer timeout");function a(e,t){let r=null;return t(e)?e:(r=l.childList?t(e)?e:e.childNodes.filter((e=>t(e))).first().value.value:l.subtree?t(e)?e:e.querySelectorAll(" * ").filter((e=>t(e))).first().value.value:t(e)?e:null,r)}let o=e;if(o=a(o,t))r(new m(o));else if("undefined"!=typeof MutationObserver){const a=setTimeout((()=>(s.disconnect(),n(i))),l.timeout),o=l=>{const n=new m(l.map((e=>e.target))).filter((e=>t(e))).first();n.isPresent()&&(clearTimeout(a),s.disconnect(),r(new m(n||e)))};s=new MutationObserver(o);let u=Object.assign({},l);delete u.timeout,e.eachElem((e=>{s.observe(e,u)}))}else{let s=setInterval((()=>{let l=a(e,t);l&&(o&&(clearTimeout(o),clearInterval(s),s=null),r(new m(l||e)))}),l.interval),o=setTimeout((()=>{s&&(clearInterval(s),n(i))}),l.timeout)}}))}(this,e,t)}))}get shadowElements(){let e=(this.querySelectorAll("*").filter((e=>e.hasShadow)).allElems()||[]).map((e=>e.shadowRoot));return new m(...e)}get shadowRoot(){let e=[];for(let t=0;t<this.rootNode.length;t++)this.rootNode[t].shadowRoot&&e.push(this.rootNode[t].shadowRoot);return new m(...e)}get hasShadow(){for(let e=0;e<this.rootNode.length;e++)if(this.rootNode[e].shadowRoot)return!0;return!1}static getCaretPosition(e){let t=0;try{if(null===document||void 0===document?void 0:document.selection){e.focus();let l=document.selection.createRange();l.moveStart("character",-e.value.length),t=l.text.length}}catch(e){}return t}static setCaretPosition(e,t){(null==e?void 0:e.focus)&&(null==e||e.focus()),(null==e?void 0:e.setSelectiongRange)&&(null==e||e.setSelectiongRange(t,t))}[Symbol.iterator](){return{next:()=>({done:!this.hasNext(),value:this.next()})}}concat(e,t=!0){const l=new m(...this.asArray.concat(e.asArray));if(!t)return l;let r={};return new m(...l.asArray.filter((e=>{const t=!(null==r?void 0:r[e.value.value.outerHTML]);return r[e.value.value.outerHTML]=!0,t})))}append(e){return this.each((t=>e.appendTo(t))),this}prependTo(e){return e.eachElem((e=>{e.prepend(...this.allElems())})),this}prepend(e){return this.eachElem((t=>{t.prepend(...e.allElems())})),this}_querySelectorAll(e){var t,l;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let r=[];for(let t=0;t<this.rootNode.length;t++){if(!(null===(l=this.rootNode[t])||void 0===l?void 0:l.querySelectorAll))continue;let n=this.rootNode[t].querySelectorAll(e);r=r.concat(f(n))}return new m(...r)}_querySelectorAllDeep(e){var t;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let l=new m(...this.rootNode),r=e.split(/\/shadow\//);for(let e=0;e<r.length;e++){if(""==r[e])continue;let t=r[e];l=l.querySelectorAll(t),e<r.length-1&&(l=l.shadowRoot)}return l}_closest(e){var t,l;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let r=[];for(let t=0;t<this.rootNode.length;t++){if(!(null===(l=this.rootNode[t])||void 0===l?void 0:l.closest))continue;let n=[this.rootNode[t].closest(e)];r=r.concat(...n)}return new m(...r)}_closestDeep(e){var t;if(!(null===(t=null==this?void 0:this.rootNode)||void 0===t?void 0:t.length))return this;let l=new m(...this.rootNode),r=e.split(/\/shadow\//);for(let e=0;e<r.length;e++){if(""==r[e])continue;let t=r[e];l=l.closest(t),e<r.length-1&&(l=l.shadowRoot)}return l}_mozMatchesSelector(e,t){let l=e;return(l.matches||l.matchesSelector||l.mozMatchesSelector||l.msMatchesSelector||l.oMatchesSelector||l.webkitMatchesSelector||function(t){let l=(document||ownerDocument).querySelectorAll(t),r=l.length;for(;--r>=0&&l.item(r)!==e;);return r>-1}).call(e,t)}_loadScriptEval(e,t,l=0,r){let n=this.createSourceNode(t,r),s=this.createSourceNode(null,r),i=`nonce_${Date.now()}_${Math.random()}`;s.innerHTML=`document.head["${i}"] = true`;let a=document.head;if(a.appendChild(s),a.removeChild(s),a[i]){try{l?setTimeout((()=>{a.appendChild(n),e||a.removeChild(n)}),l):(a.appendChild(n),e||a.removeChild(n))}finally{delete a[i]}return this}}resolveAttributeHolder(e="value"){let t=[];return t[e]=null,e in this.getAsElem(0).value?this.getAsElem(0).value:t}createSourceNode(e,t){let l=document.createElement("script");return l.type="text/javascript",t&&(void 0!==(null==l?void 0:l.nonce)?l.nonce=t:l.setAttribute("nonce",t)),e&&(l.src=e),l}applyNonce(e,t){e&&(void 0!==(null==t?void 0:t.nonce)?t.nonce=e:t.setAttribute("nonce",e))}}m.absent=new m,m.global=a.R;m.querySelectorAll},484:function(e,t,l){l.d(t,{Es2019Array:function(){return r}});class r extends Array{constructor(...e){super(...e),Array.prototype.flatMap||(this.flatMap=e=>this._flatMap(e)),Array.prototype.flat||(this.flat=(e=1)=>this._flat(e))}concat(...e){return new r(...super.concat(...e))}reverse(){return new r(...super.reverse())}slice(e,t){return new r(...super.slice(e,t))}splice(e,t){return new r(...super.splice(e,t))}filter(e,t){return new r(...super.filter(e,t))}_flat(e=1){return this._flatResolve(this,e)}_flatResolve(e,t=1){if(0==t)return e;let l=[];return e.forEach((e=>{e=Array.isArray(e)?e:[e];let r=this._flatResolve(e,t-1);l=l.concat(r)})),new r(...l)}_flatMap(e,t=!1){let l=this.map((t=>e(t)));return this._flatResolve(l)}}},456:function(e,t,l){function r(){var e;let t="undefined"!=typeof globalThis&&globalThis.window?globalThis.window:"undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:void 0!==l.g&&(null===l.g||void 0===l.g?void 0:l.g.window)?l.g.window:void 0!==l.g?l.g:null;return null!==(e=null==t?void 0:t.window)&&void 0!==e?e:t}l.d(t,{R:function(){return r}})},805:function(e,t,l){l.d(t,{Lang:function(){return r}});var r,n=l(152);!function(e){function t(e){let t=/\s/,l=(e=e.replace(/^\s\s*/,"")).length;for(;t.test(e.charAt(--l)););return e.slice(0,l+1)}function l(e){return!!arguments.length&&null!=e&&("string"==typeof e||e instanceof String)}e.saveResolve=function(e,t=null){try{let l=e();return n.Optional.fromNullable(null!=l?l:t)}catch(e){return n.Optional.absent}},e.saveResolveLazy=function(e,t=null){try{let l=e();return n.Optional.fromNullable(null!=l?l:t())}catch(e){return n.Optional.absent}},e.strToArray=function(e,l=/\./gi){let r=[];return e.split(l).forEach((e=>{r.push(t(e))})),r},e.trim=t,e.objToArray=function(e,t=0,l=[]){return"__undefined__"==(null!=e?e:"__undefined__")?null!=l?l:null:e instanceof Array&&!t&&!l?e:l.concat(Array.prototype.slice.call(e,t))},e.equalsIgnoreCase=function(e,t){let l=null!=t?t:"___no_value__";return(null!=e?e:"___no_value__").toLowerCase()===l.toLowerCase()},e.assertType=function(e,t){return l(t)?typeof e==t:e instanceof t},e.isString=l,e.isFunc=function(e){return e instanceof Function||"function"==typeof e},e.objAssign=function(e,...t){if(null==e)throw new TypeError("Cannot convert undefined or null to object");let l=Object(e);return Object.assign?(t.forEach((e=>Object.assign(l,e))),l):(t.filter((e=>null!=e)).forEach((e=>{let t=e;Object.keys(t).filter((e=>Object.prototype.hasOwnProperty.call(t,e))).forEach((e=>l[e]=t[e]))})),l)}}(r||(r={}))},152:function(e,t,l){l.d(t,{Config:function(){return h},Optional:function(){return a},ValueEmbedder:function(){return o}});var r=l(805),n=l(484),s=r.Lang.objAssign;class i{constructor(e){this._value=e}get value(){return this._value}map(e){e||(e=e=>e);let t=e(this.value);return new i(t)}flatMap(e){let t=this.map(e);for(;(null==t?void 0:t.value)instanceof i;)t=t.value;return t}}class a extends i{constructor(e){super(e)}get value(){return this._value instanceof i?this._value.flatMap().value:this._value}static fromNullable(e){return new a(e)}isAbsent(){return void 0===this.value||null==this.value}isPresent(e){let t=this.isAbsent();return!t&&e&&e.call(this,this),!t}ifPresentLazy(e=(()=>{})){return this.isPresent.call(this,e),this}orElse(e){return this.isPresent()?this:null==e?a.absent:this.flatMap((()=>e))}orElseLazy(e){return this.isPresent()?this:this.flatMap(e)}flatMap(e){let t=super.flatMap(e);return t instanceof a?t.flatMap():a.fromNullable(t.value)}getIf(...e){e=this.preprocessKeys(...e);let t=this;for(let l=0;l<e.length;l++){let r=this.keyVal(e[l]),n=this.arrayIndex(e[l]);if(""===r&&n>=0){if(t=this.getClass().fromNullable(t.value instanceof Array?t.value.length<n?null:t.value[n]:null),t.isAbsent())return t}else if(r&&n>=0){if(t.getIfPresent(r).isAbsent())return t;if(t=t.getIfPresent(r).value instanceof Array?this.getClass().fromNullable(t.getIfPresent(r).value[n]):this.getClass().absent,t.isAbsent())return t}else{if(t=t.getIfPresent(r),t.isAbsent())return t;n>-1&&(t=this.getClass().fromNullable(t.value[n]))}}return t}match(e){return!this.isAbsent()&&e(this.value)}get(e=a.absent){return this.isAbsent()?this.getClass().fromNullable(e).flatMap():this.getClass().fromNullable(this.value).flatMap()}toJson(){return JSON.stringify(this.value)}getClass(){return a}arrayIndex(e){let t=e.indexOf("["),l=e.indexOf("]");return t>=0&&l>0&&t<l?parseInt(e.substring(t+1,l)):-1}keyVal(e){let t=e.indexOf("[");return t>=0?e.substring(0,t):e}getIfPresent(e){return this.isAbsent()?this.getClass().absent:this.getClass().fromNullable(this.value[e]).flatMap()}resolve(e){if(this.isAbsent())return a.absent;try{return a.fromNullable(e(this.value))}catch(e){return a.absent}}preprocessKeys(...e){return new n.Es2019Array(...e).flatMap((e=>new n.Es2019Array(...e.split(/]\s*\[/gi)).map((e=>(-1==(e=e.replace(/^\s+|\s+$/g,"")).indexOf("[")&&-1!=e.indexOf("]")&&(e="["+e),-1==e.indexOf("]")&&-1!=e.indexOf("[")&&(e+="]"),e)))))}}a.absent=a.fromNullable(null);class o extends a{constructor(e,t="value"){super(e),this.key=t}get value(){return this._value?this._value[this.key]:null}set value(e){this._value&&(this._value[this.key]=e)}orElse(e){let t={};return t[this.key]=e,this.isPresent()?this:new o(t,this.key)}orElseLazy(e){if(this.isPresent())return this;{let t={};return t[this.key]=e(),new o(t,this.key)}}getClass(){return o}static fromNullable(e,t="value"){return new o(e,t)}}o.absent=o.fromNullable(null);class u extends o{constructor(e,t,l){super(e,t),this.arrPos=null!=l?l:-1}get value(){return""==this.key&&this.arrPos>=0?this._value[this.arrPos]:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]:this._value[this.key]}set value(e){""==this.key&&this.arrPos>=0?this._value[this.arrPos]=e:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]=e:this._value[this.key]=e}}u.absent=u.fromNullable(null);class h extends a{constructor(e,t){super(e),this.configDef=t}get shallowCopy(){return this.shallowCopy$()}shallowCopy$(){let e=new h({});return e.shallowMerge(this.value),e}get deepCopy(){return this.deepCopy$()}deepCopy$(){return new h(s({},this.value))}static fromNullable(e){return new h(e)}shallowMerge(e,t=!0,l=!1){for(let r in e.value)void 0!==r&&null!=r&&(!t&&r in this.value||(l?Array.isArray(e.getIf(r).value)?new n.Es2019Array(...e.getIf(r).value).forEach((e=>this.append(r).value=e)):this.append(r).value=e.getIf(r).value:this.assign(r).value=e.getIf(r).value))}append(...e){if(e.length<1)return;this.assertAccessPath(...e);let t=e[e.length-1],l=this.getIf(...e).isPresent();this.buildPath(...e);let r=this.arrayIndex(t);if(r>-1)throw Error("Append only possible on non array properties, use assign on indexed data");let n=this.getIf(...e).value;return Array.isArray(n)||(n=this.assign(...e).value=[n]),l&&n.push({}),r=n.length-1,new u(1==e.length?this.value:this.getIf.apply(this,e.slice(0,e.length-1)).value,t,r)}appendIf(e,...t){return e?this.append(...t):{value:null}}assign(...e){if(e.length<1)return;this.assertAccessPath(...e),this.buildPath(...e);let t=this.keyVal(e[e.length-1]),l=this.arrayIndex(e[e.length-1]);return new u(1==e.length?this.value:this.getIf.apply(this,e.slice(0,e.length-1)).value,t,l)}assignIf(e,...t){return e?this.assign(...t):{value:null}}getIf(...e){return this.assertAccessPath(...e),this.getClass().fromNullable(super.getIf.apply(this,e).value)}get(e){return this.getClass().fromNullable(super.get(e).value)}delete(e){return e in this.value&&delete this.value[e],this}toJson(){return JSON.stringify(this.value)}getClass(){return h}setVal(e){this._value=e}assertAccessPath(...e){var t,l,r,s,i,o,u,h,c;if(e=this.preprocessKeys(...e),!this.configDef)return;let d=a.fromNullable(Object.keys(this.configDef).map((e=>{let t={};return t[e]=this.configDef[e],t})));for(let f=0;f<e.length;f++){let v=this.keyVal(e[f]),p=this.arrayIndex(e[f]);if(d=this.isArray(p)?""!=v?Array.isArray(d.value)?a.fromNullable(null===(l=null===(t=new n.Es2019Array(...d.value).find((e=>{var t;return!(null===(t=null==e?void 0:e[v])||void 0===t||!t)})))||void 0===t?void 0:t[v])||void 0===l?void 0:l[p]):a.fromNullable(null!==(i=null===(s=null===(r=d.value)||void 0===r?void 0:r[v])||void 0===s?void 0:s[p])&&void 0!==i?i:null):Array.isArray(d.value)?a.fromNullable(null===(o=d.value)||void 0===o?void 0:o[p]):a.absent:Array.isArray(d.value)?a.fromNullable(null===(u=new n.Es2019Array(...d.value).find((e=>{var t;return!(null===(t=null==e?void 0:e[v])||void 0===t||!t)})))||void 0===u?void 0:u[v]):a.fromNullable(null!==(c=null===(h=d.value)||void 0===h?void 0:h[v])&&void 0!==c?c:null),!d.isPresent())throw Error("Access Path to config invalid");if("__ANY_POINT__"==d.value)return}}buildPath(...e){e=this.preprocessKeys(...e);let t=this,l=this.getClass().fromNullable(null),r=-1,n=function(e,t){let l=e.length,r=l+t;for(let t=l;t<r;t++)e.push({})};for(let s=0;s<e.length;s++){let i=this.keyVal(e[s]),a=this.arrayIndex(e[s]);if(this.isArrayPos(i,a)){t.setVal(t.value instanceof Array?t.value:[]),n(t.value,a+1),r>=0&&(l.value[r]=t.value),l=t,r=a,t=this.getClass().fromNullable(t.value[a]);continue}let o=t.getIf(i);if(this.isNoArray(a))o.isAbsent()?o=this.getClass().fromNullable(t.value[i]={}):t=o;else{let e=o.value instanceof Array?o.value:[];n(e,a+1),t.value[i]=e,o=this.getClass().fromNullable(e[a])}l=t,r=a,t=o}return this}isNoArray(e){return-1==e}isArray(e){return!this.isNoArray(e)}isArrayPos(e,t){return""===e&&t>=0}}},255:function(e,t,l){l.d(t,{dD:function(){return r}});var r;l(152),l(484);!function(e){e.EO_STRM="__EO_STRM__",e.BEF_STRM="___BEF_STRM__"}(r||(r={}))}},t={};function l(r){var n=t[r];if(void 0!==n)return n.exports;var s=t[r]={exports:{}};return e[r](s,s.exports,l),s.exports}l.d=function(e,t){for(var r in t)l.o(t,r)&&!l.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},l.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};return function(){l.r(r),l.d(r,{TagBuilder:function(){return n}});var e=l(585),t=l(456);void 0!==t.R&&function(){if(void 0===(0,t.R)().Reflect||void 0===(0,t.R)().customElements||(0,t.R)().customElements.polyfillWrapFlushCallback)return;const e=HTMLElement;(0,t.R)().HTMLElement={HTMLElement:function(){return Reflect.construct(e,[],this.constructor)}}.HTMLElement,HTMLElement.prototype=e.prototype,HTMLElement.prototype.constructor=HTMLElement,Object.setPrototypeOf(HTMLElement,e)}();class n{constructor(e){this.extendsType=HTMLElement,this.observedAttrs=[],this.tagName=e}static withTagName(e){return new n(e)}withObservedAttributes(...e){this.observedAttrs=e}withConnectedCallback(e){return this.connectedCallback=e,this}withDisconnectedCallback(e){return this.disconnectedCallback=e,this}withAdoptedCallback(e){return this.adoptedCallback=e,this}withAttributeChangedCallback(e){return this.attributeChangedCallback=e,this}withExtendsType(e){return this.extendsType=e,this}withOptions(e){return this.theOptions=e,this}withClass(e){if(this.markup)throw Error("Markup already defined, markup must be set in the class");return this.clazz=e,this}withMarkup(e){if(this.clazz)throw Error("Class already defined, markup must be set in the class");return this.markup=e,this}register(){if(!this.clazz&&!this.markup)throw Error("Class or markup must be defined");if(this.clazz){let l=t=>{let l=this[t],r=this.clazz.prototype[t],n=l||r;n&&(this.clazz.prototype[t]=function(){l?n.apply(e.DomQuery.byId(this)):r.apply(this)})};l("connectedCallback"),l("disconnectedCallback"),l("adoptedCallback"),l("attributeChangedCallback"),this.observedAttrs.length&&Object.defineProperty(this.clazz.prototype,"observedAttributes",{get(){return this.observedAttrs}}),(0,t.R)().customElements.define(this.tagName,this.clazz,this.theOptions||null)}else{let l=this,r=(t,r)=>{l[t]&&l[t].apply(e.DomQuery.byId(r))};(0,t.R)().customElements.define(this.tagName,class extends this.extendsType{constructor(){super(),this.innerHTML=l.markup}static get observedAttributes(){return l.observedAttrs}connectedCallback(){r("connectedCallback",this)}disconnectedCallback(){r("disconnectedCallback",this)}adoptedCallback(){r("adoptedCallback",this)}attributeChangedCallback(){r("attributeChangedCallback",this)}},this.theOptions||null)}}}}(),r}()}));
//# sourceMappingURL=TagBuilder.js.map