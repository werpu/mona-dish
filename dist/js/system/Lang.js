System.register([],(function(t,e){return{execute:function(){t(function(){"use strict";var t={484:function(t,e){var r,n=this&&this.__extends||(r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},r(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__read||function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)a.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return a},i=this&&this.__spreadArray||function(t,e,r){if(r||2===arguments.length)for(var n,o=0,i=e.length;o<i;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return t.concat(n||Array.prototype.slice.call(e))};Object.defineProperty(e,"__esModule",{value:!0}),e.Es2019Array=void 0;var a=function(t){function e(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];var a=t.apply(this,i([],o(r),!1))||this;if(!Array.prototype.flatMap){var l=e.prototype.flatMap_;a.flatMap=l}return a}return n(e,t),e.prototype.flatMap_=function(t,r){void 0===r&&(r=!1);var n=[],a=function(e){var r=t(e);if(Array.isArray(r)){if(1==r.length)return void n.push(r[1]);r.length>1&&r.forEach((function(t){return a(t)}))}else n.push(e)};return this.forEach((function(t){return a(t)})),new(e.bind.apply(e,i([void 0],o(n),!1)))},e.prototype.concat=function(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];return new(e.bind.apply(e,i([void 0],o(t.prototype.concat.apply(this,i([],o(r),!1))),!1)))},e.prototype.reverse=function(){return new(e.bind.apply(e,i([void 0],o(t.prototype.reverse.call(this)),!1)))},e.prototype.slice=function(r,n){return new(e.bind.apply(e,i([void 0],o(t.prototype.slice.call(this,r,n)),!1)))},e.prototype.splice=function(r,n){return new(e.bind.apply(e,i([void 0],o(t.prototype.splice.call(this,r,n)),!1)))},e.prototype.filter=function(r,n){return new(e.bind.apply(e,i([void 0],o(t.prototype.filter.call(this,r,n)),!1)))},e}(Array);e.Es2019Array=a},805:function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.Lang=void 0;var n=r(152);!function(t){function e(t){for(var e=/\s/,r=(t=t.replace(/^\s\s*/,"")).length;e.test(t.charAt(--r)););return t.slice(0,r+1)}function r(t){return!!arguments.length&&null!=t&&("string"==typeof t||t instanceof String)}t.saveResolve=function(t,e){void 0===e&&(e=null);try{var r=t();return n.Optional.fromNullable(null!=r?r:e)}catch(t){return n.Optional.absent}},t.saveResolveLazy=function(t,e){void 0===e&&(e=null);try{var r=t();return n.Optional.fromNullable(null!=r?r:e())}catch(t){return n.Optional.absent}},t.strToArray=function(t,r){void 0===r&&(r=/\./gi);var n=[];return t.split(r).forEach((function(t){n.push(e(t))})),n},t.trim=e,t.objToArray=function(t,e,r){return void 0===e&&(e=0),void 0===r&&(r=[]),"__undefined__"==(null!=t?t:"__undefined__")?null!=r?r:null:t instanceof Array&&!e&&!r?t:r.concat(Array.prototype.slice.call(t,e))},t.equalsIgnoreCase=function(t,e){var r=null!=e?e:"___no_value__";return(null!=t?t:"___no_value__").toLowerCase()===r.toLowerCase()},t.assertType=function(t,e){return r(e)?typeof t==e:t instanceof e},t.isString=r,t.isFunc=function(t){return t instanceof Function||"function"==typeof t},t.objAssign=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];if(null==t)throw new TypeError("Cannot convert undefined or null to object");var n=Object(t);return Object.assign?(e.forEach((function(t){return Object.assign(n,t)})),n):(e.filter((function(t){return null!=t})).forEach((function(t){var e=t;Object.keys(e).filter((function(t){return Object.prototype.hasOwnProperty.call(e,t)})).forEach((function(t){return n[t]=e[t]}))})),n)}}(e.Lang||(e.Lang={}))},152:function(t,e,r){var n,o=this&&this.__extends||(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},n(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),i=this&&this.__read||function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)a.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return a},a=this&&this.__spreadArray||function(t,e,r){if(r||2===arguments.length)for(var n,o=0,i=e.length;o<i;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return t.concat(n||Array.prototype.slice.call(e))};Object.defineProperty(e,"__esModule",{value:!0}),e.Config=e.CONFIG_ANY=e.CONFIG_VALUE=e.ValueEmbedder=e.Optional=e.Monad=void 0;var l=r(805),s=r(484),u=l.Lang.objAssign,f=function(){function t(t){this._value=t}return Object.defineProperty(t.prototype,"value",{get:function(){return this._value},enumerable:!1,configurable:!0}),t.prototype.map=function(e){return e||(e=function(t){return t}),new t(e(this.value))},t.prototype.flatMap=function(e){for(var r=this.map(e);(null==r?void 0:r.value)instanceof t;)r=r.value;return r},t}();e.Monad=f;var p=function(t){function e(e){return t.call(this,e)||this}return o(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return this._value instanceof f?this._value.flatMap().value:this._value},enumerable:!1,configurable:!0}),e.fromNullable=function(t){return new e(t)},e.prototype.isAbsent=function(){return void 0===this.value||null==this.value},e.prototype.isPresent=function(t){var e=this.isAbsent();return!e&&t&&t.call(this,this),!e},e.prototype.ifPresentLazy=function(t){return void 0===t&&(t=function(){}),this.isPresent.call(this,t),this},e.prototype.orElse=function(t){return this.isPresent()?this:null==t?e.absent:this.flatMap((function(){return t}))},e.prototype.orElseLazy=function(t){return this.isPresent()?this:this.flatMap(t)},e.prototype.flatMap=function(r){var n=t.prototype.flatMap.call(this,r);return n instanceof e?n.flatMap():e.fromNullable(n.value)},e.prototype.getIf=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];t=this.preprocessKeys.apply(this,a([],i(t),!1));for(var r=this,n=0;n<t.length;n++){var o=this.keyVal(t[n]),l=this.arrayIndex(t[n]);if(""===o&&l>=0){if((r=this.getClass().fromNullable(r.value instanceof Array?r.value.length<l?null:r.value[l]:null)).isAbsent())return r}else if(o&&l>=0){if(r.getIfPresent(o).isAbsent())return r;if((r=r.getIfPresent(o).value instanceof Array?this.getClass().fromNullable(r.getIfPresent(o).value[l]):this.getClass().absent).isAbsent())return r}else{if((r=r.getIfPresent(o)).isAbsent())return r;l>-1&&(r=this.getClass().fromNullable(r.value[l]))}}return r},e.prototype.match=function(t){return!this.isAbsent()&&t(this.value)},e.prototype.get=function(t){return void 0===t&&(t=e.absent),this.isAbsent()?this.getClass().fromNullable(t).flatMap():this.getClass().fromNullable(this.value).flatMap()},e.prototype.toJson=function(){return JSON.stringify(this.value)},e.prototype.getClass=function(){return e},e.prototype.arrayIndex=function(t){var e=t.indexOf("["),r=t.indexOf("]");return e>=0&&r>0&&e<r?parseInt(t.substring(e+1,r)):-1},e.prototype.keyVal=function(t){var e=t.indexOf("[");return e>=0?t.substring(0,e):t},e.prototype.getIfPresent=function(t){return this.isAbsent()?this.getClass().absent:this.getClass().fromNullable(this.value[t]).flatMap()},e.prototype.resolve=function(t){if(this.isAbsent())return e.absent;try{return e.fromNullable(t(this.value))}catch(t){return e.absent}},e.prototype.preprocessKeys=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return(new(s.Es2019Array.bind.apply(s.Es2019Array,a([void 0],i(t),!1)))).flatMap((function(t){return(new(s.Es2019Array.bind.apply(s.Es2019Array,a([void 0],i(t.split(/]\s*\[/gi)),!1)))).map((function(t){return-1==(t=t.replace(/^\s+|\s+$/g,"")).indexOf("[")&&-1!=t.indexOf("]")&&(t="["+t),-1==t.indexOf("]")&&-1!=t.indexOf("[")&&(t+="]"),t}))}))},e.absent=e.fromNullable(null),e}(f);e.Optional=p;var c=function(t){function e(e,r){void 0===r&&(r="value");var n=t.call(this,e)||this;return n.key=r,n}return o(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return this._value?this._value[this.key]:null},set:function(t){this._value&&(this._value[this.key]=t)},enumerable:!1,configurable:!0}),e.prototype.orElse=function(t){var r={};return r[this.key]=t,this.isPresent()?this:new e(r,this.key)},e.prototype.orElseLazy=function(t){if(this.isPresent())return this;var r={};return r[this.key]=t(),new e(r,this.key)},e.prototype.getClass=function(){return e},e.fromNullable=function(t,r){return void 0===r&&(r="value"),new e(t,r)},e.absent=e.fromNullable(null),e}(p);e.ValueEmbedder=c;var h=function(t){function e(e,r,n){var o=t.call(this,e,r)||this;return o.arrPos=null!=n?n:-1,o}return o(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return""==this.key&&this.arrPos>=0?this._value[this.arrPos]:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]:this._value[this.key]},set:function(t){""==this.key&&this.arrPos>=0?this._value[this.arrPos]=t:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]=t:this._value[this.key]=t},enumerable:!1,configurable:!0}),e.absent=e.fromNullable(null),e}(c);e.CONFIG_VALUE="__END_POINT__",e.CONFIG_ANY="__ANY_POINT__";var y=function(t){function r(e,r){var n=t.call(this,e)||this;return n.configDef=r,n}return o(r,t),Object.defineProperty(r.prototype,"shallowCopy",{get:function(){return this.shallowCopy$()},enumerable:!1,configurable:!0}),r.prototype.shallowCopy$=function(){var t=new r({});return t.shallowMerge(this.value),t},Object.defineProperty(r.prototype,"deepCopy",{get:function(){return this.deepCopy$()},enumerable:!1,configurable:!0}),r.prototype.deepCopy$=function(){return new r(u({},this.value))},r.fromNullable=function(t){return new r(t)},r.prototype.shallowMerge=function(t,e,r){var n=this;void 0===e&&(e=!0),void 0===r&&(r=!1);var o=function(o){if(void 0===o||null==o)return"continue";!e&&o in l.value||(r?Array.isArray(t.getIf(o).value)?(new(s.Es2019Array.bind.apply(s.Es2019Array,a([void 0],i(t.getIf(o).value),!1)))).forEach((function(t){return n.append(o).value=t})):l.append(o).value=t.getIf(o).value:l.assign(o).value=t.getIf(o).value)},l=this;for(var u in t.value)o(u)},r.prototype.append=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=t.length<1;if(!r){this.assertAccessPath.apply(this,a([],i(t),!1));var n=t[t.length-1],o=this.getIf.apply(this,a([],i(t),!1)).isPresent();this.buildPath.apply(this,a([],i(t),!1));var l=this.arrayIndex(n);if(l>-1)throw Error("Append only possible on non array properties, use assign on indexed data");var s=this.getIf.apply(this,a([],i(t),!1)).value;return Array.isArray(s)||(s=this.assign.apply(this,a([],i(t),!1)).value=[s]),o&&s.push({}),l=s.length-1,new h(1==t.length?this.value:this.getIf.apply(this,t.slice(0,t.length-1)).value,n,l)}},r.prototype.appendIf=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return t?this.append.apply(this,a([],i(e),!1)):{value:null}},r.prototype.assign=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if(!(t.length<1)){this.assertAccessPath.apply(this,a([],i(t),!1)),this.buildPath.apply(this,a([],i(t),!1));var r=this.keyVal(t[t.length-1]),n=this.arrayIndex(t[t.length-1]);return new h(1==t.length?this.value:this.getIf.apply(this,t.slice(0,t.length-1)).value,r,n)}},r.prototype.assignIf=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return t?this.assign.apply(this,a([],i(e),!1)):{value:null}},r.prototype.getIf=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return this.assertAccessPath.apply(this,a([],i(e),!1)),this.getClass().fromNullable(t.prototype.getIf.apply(this,e).value)},r.prototype.get=function(e){return this.getClass().fromNullable(t.prototype.get.call(this,e).value)},r.prototype.delete=function(t){return t in this.value&&delete this.value[t],this},r.prototype.toJson=function(){return JSON.stringify(this.value)},r.prototype.getClass=function(){return r},r.prototype.setVal=function(t){this._value=t},r.prototype.assertAccessPath=function(){for(var t,r,n,o,l,u,f,c,h,y=this,v=[],d=0;d<arguments.length;d++)v[d]=arguments[d];if(v=this.preprocessKeys.apply(this,a([],i(v),!1)),this.configDef)for(var g="Access Path to config invalid",b=p.fromNullable(Object.keys(this.configDef).map((function(t){var e={};return e[t]=y.configDef[t],e}))),_=function(y){var d=A.keyVal(v[y]),_=A.arrayIndex(v[y]);if(!(b=A.isArray(_)?""!=d?Array.isArray(b.value)?p.fromNullable(null===(r=null===(t=(new(s.Es2019Array.bind.apply(s.Es2019Array,a([void 0],i(b.value),!1)))).find((function(t){var e;return!(null===(e=null==t?void 0:t[d])||void 0===e||!e)})))||void 0===t?void 0:t[d])||void 0===r?void 0:r[_]):p.fromNullable(null!==(l=null===(o=null===(n=b.value)||void 0===n?void 0:n[d])||void 0===o?void 0:o[_])&&void 0!==l?l:null):Array.isArray(b.value)?p.fromNullable(null===(u=b.value)||void 0===u?void 0:u[_]):p.absent:Array.isArray(b.value)?p.fromNullable(null===(f=(new(s.Es2019Array.bind.apply(s.Es2019Array,a([void 0],i(b.value),!1)))).find((function(t){var e;return!(null===(e=null==t?void 0:t[d])||void 0===e||!e)})))||void 0===f?void 0:f[d]):p.fromNullable(null!==(h=null===(c=b.value)||void 0===c?void 0:c[d])&&void 0!==h?h:null)).isPresent())throw Error(g);if(b.value==e.CONFIG_ANY)return{value:void 0}},A=this,P=0;P<v.length;P++){var O=_(P);if("object"==typeof O)return O.value}},r.prototype.buildPath=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];t=this.preprocessKeys.apply(this,a([],i(t),!1));for(var r=this,n=this.getClass().fromNullable(null),o=-1,l=function(t,e){for(var r=t.length,n=r+e,o=r;o<n;o++)t.push({})},s=0;s<t.length;s++){var u=this.keyVal(t[s]),f=this.arrayIndex(t[s]);if(this.isArrayPos(u,f))r.setVal(r.value instanceof Array?r.value:[]),l(r.value,f+1),o>=0&&(n.value[o]=r.value),n=r,o=f,r=this.getClass().fromNullable(r.value[f]);else{var p=r.getIf(u);if(this.isNoArray(f))p.isAbsent()?p=this.getClass().fromNullable(r.value[u]={}):r=p;else{var c=p.value instanceof Array?p.value:[];l(c,f+1),r.value[u]=c,p=this.getClass().fromNullable(c[f])}n=r,o=f,r=p}}return this},r.prototype.isNoArray=function(t){return-1==t},r.prototype.isArray=function(t){return!this.isNoArray(t)},r.prototype.isArrayPos=function(t,e){return""===t&&e>=0},r}(p);e.Config=y}},e={};var r=function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n].call(i.exports,i,i.exports,r),i.exports}(805);return r}())}}}));
//# sourceMappingURL=Lang.js.map