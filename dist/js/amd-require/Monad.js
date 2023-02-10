require([],(function(){return function(){"use strict";var t={805:function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.Lang=void 0;var n=r(152);!function(t){function e(t){for(var e=/\s/,r=(t=t.replace(/^\s\s*/,"")).length;e.test(t.charAt(--r)););return t.slice(0,r+1)}function r(t){return!!arguments.length&&null!=t&&("string"==typeof t||t instanceof String)}t.saveResolve=function(t,e){void 0===e&&(e=null);try{var r=t();return n.Optional.fromNullable(null!=r?r:e)}catch(t){return n.Optional.absent}},t.saveResolveLazy=function(t,e){void 0===e&&(e=null);try{var r=t();return n.Optional.fromNullable(null!=r?r:e())}catch(t){return n.Optional.absent}},t.strToArray=function(t,r){void 0===r&&(r=/\./gi);var n=[];return t.split(r).forEach((function(t){n.push(e(t))})),n},t.trim=e,t.objToArray=function(t,e,r){return void 0===e&&(e=0),void 0===r&&(r=[]),"__undefined__"==(null!=t?t:"__undefined__")?null!=r?r:null:t instanceof Array&&!e&&!r?t:r.concat(Array.prototype.slice.call(t,e))},t.equalsIgnoreCase=function(t,e){var r=null!=e?e:"___no_value__";return(null!=t?t:"___no_value__").toLowerCase()===r.toLowerCase()},t.assertType=function(t,e){return r(e)?typeof t==e:t instanceof e},t.isString=r,t.isFunc=function(t){return t instanceof Function||"function"==typeof t},t.objAssign=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];if(null==t)throw new TypeError("Cannot convert undefined or null to object");var n=Object(t);return Object.assign?(e.forEach((function(t){return Object.assign(n,t)})),n):(e.filter((function(t){return null!=t})).forEach((function(t){var e=t;Object.keys(e).filter((function(t){return Object.prototype.hasOwnProperty.call(e,t)})).forEach((function(t){return n[t]=e[t]}))})),n)}}(e.Lang||(e.Lang={}))},152:function(t,e,r){var n,o=this&&this.__extends||(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},n(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),i=this&&this.__read||function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)a.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return a},a=this&&this.__spreadArray||function(t,e,r){if(r||2===arguments.length)for(var n,o=0,i=e.length;o<i;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return t.concat(n||Array.prototype.slice.call(e))};Object.defineProperty(e,"__esModule",{value:!0}),e.Config=e.CONFIG_ANY=e.CONFIG_VALUE=e.ValueEmbedder=e.Optional=e.Monad=void 0;var s=r(805),u=r(255),l=r(551),c=s.Lang.objAssign,h=function(){function t(t){this._value=t}return Object.defineProperty(t.prototype,"value",{get:function(){return this._value},enumerable:!1,configurable:!0}),t.prototype.map=function(e){return e||(e=function(t){return t}),new t(e(this.value))},t.prototype.flatMap=function(e){for(var r=this.map(e);(null==r?void 0:r.value)instanceof t;)r=r.value;return r},t}();e.Monad=h;var f=function(t){function e(e){return t.call(this,e)||this}return o(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return this._value instanceof h?this._value.flatMap().value:this._value},enumerable:!1,configurable:!0}),e.fromNullable=function(t){return new e(t)},e.prototype.isAbsent=function(){return void 0===this.value||null==this.value},e.prototype.isPresent=function(t){var e=this.isAbsent();return!e&&t&&t.call(this,this),!e},e.prototype.ifPresentLazy=function(t){return void 0===t&&(t=function(){}),this.isPresent.call(this,t),this},e.prototype.orElse=function(t){return this.isPresent()?this:null==t?e.absent:this.flatMap((function(){return t}))},e.prototype.orElseLazy=function(t){return this.isPresent()?this:this.flatMap(t)},e.prototype.flatMap=function(r){var n=t.prototype.flatMap.call(this,r);return n instanceof e?n.flatMap():e.fromNullable(n.value)},e.prototype.getIf=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];t=this.preprocessKeys.apply(this,a([],i(t),!1));for(var r=this,n=0;n<t.length;n++){var o=this.keyVal(t[n]),s=this.arrayIndex(t[n]);if(""===o&&s>=0){if((r=this.getClass().fromNullable(r.value instanceof Array?r.value.length<s?null:r.value[s]:null)).isAbsent())return r}else if(o&&s>=0){if(r.getIfPresent(o).isAbsent())return r;if((r=r.getIfPresent(o).value instanceof Array?this.getClass().fromNullable(r.getIfPresent(o).value[s]):this.getClass().absent).isAbsent())return r}else{if((r=r.getIfPresent(o)).isAbsent())return r;s>-1&&(r=this.getClass().fromNullable(r.value[s]))}}return r},e.prototype.match=function(t){return!this.isAbsent()&&t(this.value)},e.prototype.get=function(t){return void 0===t&&(t=e.absent),this.isAbsent()?this.getClass().fromNullable(t).flatMap():this.getClass().fromNullable(this.value).flatMap()},e.prototype.toJson=function(){return JSON.stringify(this.value)},e.prototype.getClass=function(){return e},e.prototype.arrayIndex=function(t){var e=t.indexOf("["),r=t.indexOf("]");return e>=0&&r>0&&e<r?parseInt(t.substring(e+1,r)):-1},e.prototype.keyVal=function(t){var e=t.indexOf("[");return e>=0?t.substring(0,e):t},e.prototype.getIfPresent=function(t){return this.isAbsent()?this.getClass().absent:this.getClass().fromNullable(this.value[t]).flatMap()},e.prototype.resolve=function(t){if(this.isAbsent())return e.absent;try{return e.fromNullable(t(this.value))}catch(t){return e.absent}},e.prototype.preprocessKeys=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return l.Stream.of.apply(l.Stream,a([],i(t),!1)).flatMap((function(t){return l.Stream.of.apply(l.Stream,a([],i(t.split(/\]\s*\[/gi)),!1)).map((function(t){return-1==(t=t.replace(/^\s+|\s+$/g,"")).indexOf("[")&&-1!=t.indexOf("]")&&(t="["+t),-1==t.indexOf("]")&&-1!=t.indexOf("[")&&(t+="]"),t}))})).collect(new u.ArrayCollector)},e.absent=e.fromNullable(null),e}(h);e.Optional=f;var p=function(t){function e(e,r){void 0===r&&(r="value");var n=t.call(this,e)||this;return n.key=r,n}return o(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return this._value?this._value[this.key]:null},set:function(t){this._value&&(this._value[this.key]=t)},enumerable:!1,configurable:!0}),e.prototype.orElse=function(t){var r={};return r[this.key]=t,this.isPresent()?this:new e(r,this.key)},e.prototype.orElseLazy=function(t){if(this.isPresent())return this;var r={};return r[this.key]=t(),new e(r,this.key)},e.prototype.getClass=function(){return e},e.fromNullable=function(t,r){return void 0===r&&(r="value"),new e(t,r)},e.absent=e.fromNullable(null),e}(f);e.ValueEmbedder=p;var v=function(t){function e(e,r,n){var o=t.call(this,e,r)||this;return o.arrPos=null!=n?n:-1,o}return o(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return""==this.key&&this.arrPos>=0?this._value[this.arrPos]:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]:this._value[this.key]},set:function(t){""==this.key&&this.arrPos>=0?this._value[this.arrPos]=t:this.key&&this.arrPos>=0?this._value[this.key][this.arrPos]=t:this._value[this.key]=t},enumerable:!1,configurable:!0}),e.absent=e.fromNullable(null),e}(p);e.CONFIG_VALUE="__END_POINT__",e.CONFIG_ANY="__ANY_POINT__";var y=function(t){function r(e,r){var n=t.call(this,e)||this;return n.configDef=r,n}return o(r,t),Object.defineProperty(r.prototype,"shallowCopy",{get:function(){return this.shallowCopy$()},enumerable:!1,configurable:!0}),r.prototype.shallowCopy$=function(){return new r(l.Stream.ofAssoc(this.value).collect(new u.AssocArrayCollector))},Object.defineProperty(r.prototype,"deepCopy",{get:function(){return this.deepCopy$()},enumerable:!1,configurable:!0}),r.prototype.deepCopy$=function(){return new r(c({},this.value))},r.fromNullable=function(t){return new r(t)},r.prototype.shallowMerge=function(t,e,r){var n=this;void 0===e&&(e=!0),void 0===r&&(r=!1);var o=function(o){if(void 0===o||null==o)return"continue";!e&&o in s.value||(r?Array.isArray(t.getIf(o).value)?l.Stream.of.apply(l.Stream,a([],i(t.getIf(o).value),!1)).each((function(t){return n.append(o).value=t})):s.append(o).value=t.getIf(o).value:s.assign(o).value=t.getIf(o).value)},s=this;for(var u in t.value)o(u)},r.prototype.append=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=t.length<1;if(!r){this.assertAccessPath.apply(this,a([],i(t),!1));var n=t[t.length-1],o=(this.keyVal(n),this.getIf.apply(this,a([],i(t),!1)).isPresent());this.buildPath.apply(this,a([],i(t),!1));var s=this.arrayIndex(n);if(s>-1)throw Error("Append only possible on non array properties, use assign on indexed data");var u=this.getIf.apply(this,a([],i(t),!1)).value;Array.isArray(u)||(u=this.assign.apply(this,a([],i(t),!1)).value=[u]),o&&u.push({}),s=u.length-1;var l=new v(1==t.length?this.value:this.getIf.apply(this,t.slice(0,t.length-1)).value,n,s);return l}},r.prototype.appendIf=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return t?this.append.apply(this,a([],i(e),!1)):{value:null}},r.prototype.assign=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if(!(t.length<1)){this.assertAccessPath.apply(this,a([],i(t),!1)),this.buildPath.apply(this,a([],i(t),!1));var r=this.keyVal(t[t.length-1]),n=this.arrayIndex(t[t.length-1]),o=new v(1==t.length?this.value:this.getIf.apply(this,t.slice(0,t.length-1)).value,r,n);return o}},r.prototype.assignIf=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return t?this.assign.apply(this,a([],i(e),!1)):{value:null}},r.prototype.getIf=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return this.assertAccessPath.apply(this,a([],i(e),!1)),this.getClass().fromNullable(t.prototype.getIf.apply(this,e).value)},r.prototype.get=function(e){return this.getClass().fromNullable(t.prototype.get.call(this,e).value)},r.prototype.delete=function(t){return t in this.value&&delete this.value[t],this},r.prototype.toJson=function(){return JSON.stringify(this.value)},Object.defineProperty(r.prototype,"stream",{get:function(){var t=this;return l.Stream.of.apply(l.Stream,a([],i(Object.keys(this.value)),!1)).map((function(e){return[e,t.value[e]]}))},enumerable:!1,configurable:!0}),r.prototype.getClass=function(){return r},r.prototype.setVal=function(t){this._value=t},r.prototype.assertAccessPath=function(){for(var t,r,n=[],o=0;o<arguments.length;o++)n[o]=arguments[o];if(n=this.preprocessKeys.apply(this,a([],i(n),!1)),this.configDef){var s=null,u="Access Path to config invalid";s=this.configDef;for(var c=function(o){var c=h.keyVal(n[o]),p=h.arrayIndex(n[o]);if(s=h.isArray(p)?""!=c?Array.isArray(s)?l.Stream.of.apply(l.Stream,a([],i(s),!1)).filter((function(t){var e;return!(null===(e=null==t?void 0:t[c])||void 0===e||!e)})).map((function(t){return null==t?void 0:t[c]})).first():f.fromNullable(null!==(t=null==s?void 0:s[c])&&void 0!==t?t:null):Array.isArray(s)?l.Stream.of.apply(l.Stream,a([],i(s),!1)).filter((function(t){return Array.isArray(t)})).flatMap((function(t){return l.Stream.of.apply(l.Stream,a([],i(t),!1))})).first():f.absent:Array.isArray(s)?l.Stream.of.apply(l.Stream,a([],i(s),!1)).filter((function(t){var e;return!(null===(e=null==t?void 0:t[c])||void 0===e||!e)})).map((function(t){return null==t?void 0:t[c]})).first():f.fromNullable(null!==(r=null==s?void 0:s[c])&&void 0!==r?r:null),!s.isPresent())throw Error(u);if((s=s.value)==e.CONFIG_ANY)return{value:void 0}},h=this,p=0;p<n.length;p++){var v=c(p);if("object"==typeof v)return v.value}}},r.prototype.buildPath=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];t=this.preprocessKeys.apply(this,a([],i(t),!1));for(var r=this,n=this.getClass().fromNullable(null),o=-1,s=function(t,e){for(var r=t.length,n=r+e,o=r;o<n;o++)t.push({})},u=0;u<t.length;u++){var l=this.keyVal(t[u]),c=this.arrayIndex(t[u]);if(this.isArrayPos(l,c))r.setVal(r.value instanceof Array?r.value:[]),s(r.value,c+1),o>=0&&(n.value[o]=r.value),n=r,o=c,r=this.getClass().fromNullable(r.value[c]);else{var h=r.getIf(l);if(this.isNoArray(c))h.isAbsent()?h=this.getClass().fromNullable(r.value[l]={}):r=h;else{var f=h.value instanceof Array?h.value:[];s(f,c+1),r.value[l]=f,h=this.getClass().fromNullable(f[c])}n=r,o=c,r=h}}return this},r.prototype.isNoArray=function(t){return-1==t},r.prototype.isArray=function(t){return!this.isNoArray(t)},r.prototype.isArrayPos=function(t,e){return""===t&&e>=0},r}(f);e.Config=y},255:function(t,e,r){var n=this&&this.__read||function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)a.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return a},o=this&&this.__spreadArray||function(t,e,r){if(r||2===arguments.length)for(var n,o=0,i=e.length;o<i;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return t.concat(n||Array.prototype.slice.call(e))};Object.defineProperty(e,"__esModule",{value:!0}),e.QueryFormStringCollector=e.QueryFormDataCollector=e.FormDataCollector=e.ConfigCollector=e.AssocArrayCollector=e.Run=e.ArrayAssocArrayCollector=e.InverseArrayCollector=e.ArrayCollector=e.FlatMapStreamDataSource=e.MappedStreamDataSource=e.FilteredStreamDatasource=e.ArrayStreamDataSource=e.SequenceDataSource=e.MultiStreamDatasource=e.ITERATION_STATUS=void 0;var i,a=r(551),s=r(152);function u(t){for(var e=1;t.lookAhead(e)!=i.EO_STRM;)e++;return--e}!function(t){t.EO_STRM="__EO_STRM__",t.BEF_STRM="___BEF_STRM__"}(i=e.ITERATION_STATUS||(e.ITERATION_STATUS={}));var l=function(){function t(t){for(var e,r=[],i=1;i<arguments.length;i++)r[i-1]=arguments[i];this.first=t,this.selectedPos=0,this.strms=(e=[t]).concat.apply(e,o([],n(r),!1)),this.activeStrm=this.strms[this.selectedPos]}return t.prototype.current=function(){return this.activeStrm.current()},t.prototype.hasNext=function(){return!!this.activeStrm.hasNext()||!(this.selectedPos>=this.strms.length)&&-1!=this.findNextStrm()},t.prototype.findNextStrm=function(){for(var t=!1,e=this.selectedPos;!t&&e<this.strms.length;)(t=this.strms[e].hasNext())||e++;return t?e:-1},t.prototype.lookAhead=function(t){void 0===t&&(t=1);var e=this.strms.slice(this.selectedPos);if(!e.length)return i.EO_STRM;for(var r=o([],n(e),!1);r.length;){var a=r.shift(),s=a.lookAhead(t);if(s!=i.EO_STRM)return s;t-=u(a)}return i.EO_STRM},t.prototype.next=function(){return this.activeStrm.hasNext()?this.activeStrm.next():(this.selectedPos=this.findNextStrm(),-1==this.selectedPos?i.EO_STRM:(this.activeStrm=this.strms[this.selectedPos],this.activeStrm.next()))},t.prototype.reset=function(){this.activeStrm=this.strms[0],this.selectedPos=0;for(var t=0;t<this.strms.length;t++)this.strms[t].reset()},t}();e.MultiStreamDatasource=l;var c=function(){function t(t,e){this.total=e,this.start=t,this.value=t-1}return t.prototype.hasNext=function(){return this.value<this.total-1},t.prototype.next=function(){return this.value++,this.value<=this.total-1?this.value:i.EO_STRM},t.prototype.lookAhead=function(t){return void 0===t&&(t=1),this.value+t>this.total-1?i.EO_STRM:this.value+t},t.prototype.reset=function(){this.value=this.start-1},t.prototype.current=function(){return this.start-1?i.BEF_STRM:this.value},t}();e.SequenceDataSource=c;var h=function(){function t(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.dataPos=-1,this.value=t}return t.prototype.lookAhead=function(t){return void 0===t&&(t=1),this.dataPos+t>this.value.length-1?i.EO_STRM:this.value[this.dataPos+t]},t.prototype.hasNext=function(){return this.value.length-1>this.dataPos},t.prototype.next=function(){var t;return this.dataPos++,null!==(t=null==this?void 0:this.value[this.dataPos])&&void 0!==t?t:i.EO_STRM},t.prototype.reset=function(){this.dataPos=-1},t.prototype.current=function(){return this.value[Math.max(0,this.dataPos)]},t}();e.ArrayStreamDataSource=h;var f=function(){function t(t,e){this._current=i.BEF_STRM,this._filterIdx={},this._unfilteredPos=0,this.filterFunc=t,this.inputDataSource=e}return t.prototype.hasNext=function(){for(var t,e=1,r=!1;!r&&(t=this.inputDataSource.lookAhead(e))!=i.EO_STRM;)this.filterFunc(t)?(this._filterIdx[this._unfilteredPos+e]=!0,r=!0):e++;return r},t.prototype.next=function(){for(var t,e,r=i.EO_STRM;this.inputDataSource.hasNext();){this._unfilteredPos++;var n=this.inputDataSource.next();if(n!=i.EO_STRM&&(null!==(e=null===(t=this._filterIdx)||void 0===t?void 0:t[this._unfilteredPos])&&void 0!==e&&e||this.filterFunc(n))){this._filterIdx[this._unfilteredPos]=!0,r=n;break}}return this._current=r,r},t.prototype.lookAhead=function(t){var e,r;void 0===t&&(t=1);for(var n=1;t>0&&(r=this.inputDataSource.lookAhead(n))!=i.EO_STRM;n++){((null===(e=this._filterIdx)||void 0===e?void 0:e[this._unfilteredPos+n])||this.filterFunc(r))&&(t--,this._filterIdx[this._unfilteredPos+n]=!0)}return r},t.prototype.current=function(){return this._current},t.prototype.reset=function(){this._current=i.BEF_STRM,this._filterIdx={},this._unfilteredPos=0,this.inputDataSource.reset()},t}();e.FilteredStreamDatasource=f;var p=function(){function t(t,e){this.mapFunc=t,this.inputDataSource=e}return t.prototype.hasNext=function(){return this.inputDataSource.hasNext()},t.prototype.next=function(){return this.mapFunc(this.inputDataSource.next())},t.prototype.reset=function(){this.inputDataSource.reset()},t.prototype.current=function(){return this.mapFunc(this.inputDataSource.current())},t.prototype.lookAhead=function(t){void 0===t&&(t=1);var e=this.inputDataSource.lookAhead(t);return e==i.EO_STRM?e:this.mapFunc(e)},t}();e.MappedStreamDataSource=p;var v=function(){function t(t,e){this.walkedDataSources=[],this._currPos=0,this.mapFunc=t,this.inputDataSource=e}return t.prototype.hasNext=function(){return this.resolveActiveHasNext()||this.resolveNextHasNext()},t.prototype.resolveActiveHasNext=function(){var t=!1;return this.activeDataSource&&(t=this.activeDataSource.hasNext()),t},t.prototype.lookAhead=function(t){var e;void 0===t&&(t=1);var r=null===(e=null==this?void 0:this.activeDataSource)||void 0===e?void 0:e.lookAhead(t);if((null==this?void 0:this.activeDataSource)&&r!=i.EO_STRM)return r;this.activeDataSource&&(t-=u(this.activeDataSource));for(var n=1;;n++){var o=this.inputDataSource.lookAhead(n);if(o===i.EO_STRM)return i.EO_STRM;var a=this.mapFunc(o),s=this.toDatasource(a),l=s.lookAhead(t);if(l!=i.EO_STRM)return l;t-=u(s)}},t.prototype.toDatasource=function(t){var e=Array.isArray(t)?new(h.bind.apply(h,o([void 0],n(t),!1))):t;return this.walkedDataSources.push(e),e},t.prototype.resolveNextHasNext=function(){for(var t=!1;!t&&this.inputDataSource.hasNext();){var e=this.mapFunc(this.inputDataSource.next());this.activeDataSource=this.toDatasource(e),t=this.activeDataSource.hasNext()}return t},t.prototype.next=function(){if(this.hasNext())return this._currPos++,this.activeDataSource.next()},t.prototype.reset=function(){this.inputDataSource.reset(),this.walkedDataSources.forEach((function(t){return t.reset()})),this.walkedDataSources=[],this._currPos=0,this.activeDataSource=null},t.prototype.current=function(){return this.activeDataSource||this.hasNext(),this.activeDataSource.current()},t}();e.FlatMapStreamDataSource=v;var y=function(){function t(){this.data=[]}return t.prototype.collect=function(t){this.data.push(t)},Object.defineProperty(t.prototype,"finalValue",{get:function(){return this.data},enumerable:!1,configurable:!0}),t}();e.ArrayCollector=y;var d=function(){function t(){this.data=[]}return t.prototype.collect=function(t){this.data.unshift(t)},Object.defineProperty(t.prototype,"finalValue",{get:function(){return this.data},enumerable:!1,configurable:!0}),t}();e.InverseArrayCollector=d;var m=function(){function t(){this.finalValue={}}return t.prototype.collect=function(t){var e,r,n,o,i=null!==(e=null==t?void 0:t[0])&&void 0!==e?e:t;this.finalValue[i]=null!==(n=null===(r=this.finalValue)||void 0===r?void 0:r[i])&&void 0!==n?n:[],this.finalValue[i].push(null===(o=null==t?void 0:t[1])||void 0===o||o)},t}();e.ArrayAssocArrayCollector=m;var S=function(){function t(){}return t.prototype.collect=function(t){},Object.defineProperty(t.prototype,"finalValue",{get:function(){return null},enumerable:!1,configurable:!0}),t}();e.Run=S;var _=function(){function t(){this.finalValue={}}return t.prototype.collect=function(t){var e,r;this.finalValue[null!==(e=t[0])&&void 0!==e?e:t]=null===(r=t[1])||void 0===r||r},t}();e.AssocArrayCollector=_;var g=function(){function t(){this.finalValue=new s.Config({})}return t.prototype.collect=function(t){this.finalValue.append(t.key).value=t.value},t}();e.ConfigCollector=g;var b=function(){function t(){this.finalValue=new FormData}return t.prototype.collect=function(t){this.finalValue.append(t.key,t.value)},t}();e.FormDataCollector=b;var A=function(){function t(){this.finalValue=new FormData}return t.prototype.collect=function(t){var e=t.encodeFormElement();e.isPresent()&&this.finalValue.append(t.name.value,e.get(t.name).value)},t}();e.QueryFormDataCollector=A;var x=function(){function t(){this.formData=[]}return t.prototype.collect=function(t){var e=t.encodeFormElement();e.isPresent()&&this.formData.push([t.name.value,e.get(t.name).value])},Object.defineProperty(t.prototype,"finalValue",{get:function(){return a.Stream.of.apply(a.Stream,o([],n(this.formData),!1)).map((function(t){return t.join("=")})).reduce((function(t,e){return[t,e].join("&")})).orElse("").value},enumerable:!1,configurable:!0}),t}();e.QueryFormStringCollector=x},551:function(t,e,r){var n=this&&this.__read||function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)a.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return a},o=this&&this.__spreadArray||function(t,e,r){if(r||2===arguments.length)for(var n,o=0,i=e.length;o<i;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return t.concat(n||Array.prototype.slice.call(e))};Object.defineProperty(e,"__esModule",{value:!0}),e.LazyStream=e.Stream=void 0;var i=r(152),a=r(255),s=function(){function t(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._limits=-1,this.pos=-1,this.value=t}return t.of=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return new(t.bind.apply(t,o([void 0],n(e),!1)))},t.ofAssoc=function(t){return this.of.apply(this,o([],n(Object.keys(t)),!1)).map((function(e){return[e,t[e]]}))},t.ofDataSource=function(e){for(var r=[];e.hasNext();)r.push(e.next());return new(t.bind.apply(t,o([void 0],n(r),!1)))},t.prototype.current=function(){return-1==this.pos?a.ITERATION_STATUS.BEF_STRM:this.pos>=this.value.length?a.ITERATION_STATUS.EO_STRM:this.value[this.pos]},t.prototype.limits=function(t){return this._limits=t,this},t.prototype.concat=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];var i=[this].concat(e);return t.of.apply(t,o([],n(i),!1)).flatMap((function(t){return t}))},t.prototype.onElem=function(t){for(var e=0;e<this.value.length&&(-1==this._limits||e<this._limits)&&!1!==t(this.value[e],e);e++);return this},t.prototype.each=function(t){this.onElem(t),this.reset()},t.prototype.map=function(e){e||(e=function(t){return t});var r=[];return this.each((function(t){r.push(e(t))})),new(t.bind.apply(t,o([void 0],n(r),!1)))},t.prototype.flatMap=function(e){var r=[];return this.each((function(t){var n=e(t);r=Array.isArray(n)?r.concat(n):r.concat(n.value)})),t.of.apply(t,o([],n(r),!1))},t.prototype.filter=function(e){var r=[];return this.each((function(t){e(t)&&r.push(t)})),new(t.bind.apply(t,o([void 0],n(r),!1)))},t.prototype.reduce=function(t,e){void 0===e&&(e=null);for(var r=null!=e?0:1,n=null!=e?e:this.value.length?this.value[0]:null,o=r;o<this.value.length&&(-1==this._limits||o<this._limits);o++)n=t(n,this.value[o]);return this.reset(),i.Optional.fromNullable(n)},t.prototype.first=function(){return this.reset(),this.value&&this.value.length?i.Optional.fromNullable(this.value[0]):i.Optional.absent},t.prototype.last=function(){var t=this._limits>0?Math.min(this._limits,this.value.length):this.value.length;return this.reset(),i.Optional.fromNullable(t?this.value[t-1]:null)},t.prototype.anyMatch=function(t){for(var e=0;e<this.value.length&&(-1==this._limits||e<this._limits);e++)if(t(this.value[e]))return!0;return this.reset(),!1},t.prototype.allMatch=function(t){if(!this.value.length)return!1;for(var e=0,r=0;r<this.value.length;r++)t(this.value[r])&&e++;return this.reset(),e==this.value.length},t.prototype.noneMatch=function(t){for(var e=0,r=0;r<this.value.length;r++)t(this.value[r])||e++;return this.reset(),e==this.value.length},t.prototype.sort=function(e){var r=this.value.slice().sort(e);return t.of.apply(t,o([],n(r),!1))},t.prototype.collect=function(t){return this.each((function(e){return t.collect(e)})),this.reset(),t.finalValue},t.prototype.hasNext=function(){var t=-1!=this._limits&&this.pos>=this._limits-1,e=this.pos>=this.value.length-1;return!(t||e)},t.prototype.next=function(){return this.hasNext()?(this.pos++,this.value[this.pos]):null},t.prototype.lookAhead=function(t){return void 0===t&&(t=1),this.pos+t>=this.value.length?a.ITERATION_STATUS.EO_STRM:this.value[this.pos+t]},t.prototype[Symbol.iterator]=function(){var t=this;return{next:function(){return{done:!t.hasNext(),value:t.next()}}}},t.prototype.reset=function(){this.pos=-1},t}();e.Stream=s;var u=function(){function t(t){this._limits=-1,this.pos=-1,this.dataSource=t}return t.of=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return new t(new(a.ArrayStreamDataSource.bind.apply(a.ArrayStreamDataSource,o([void 0],n(e),!1))))},t.ofAssoc=function(t){return this.of.apply(this,o([],n(Object.keys(t)),!1)).map((function(e){return[e,t[e]]}))},t.ofStreamDataSource=function(e){return new t(e)},t.prototype.hasNext=function(){return!this.isOverLimits()&&this.dataSource.hasNext()},t.prototype.next=function(){var t=this.dataSource.next();return this.pos++,t},t.prototype.lookAhead=function(t){return void 0===t&&(t=1),this.dataSource.lookAhead(t)},t.prototype.current=function(){return this.dataSource.current()},t.prototype.reset=function(){this.dataSource.reset(),this.pos=-1,this._limits=-1},t.prototype.concat=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return t.ofStreamDataSource(new a.MultiStreamDatasource(this,e))},t.prototype.nextFilter=function(t){if(this.hasNext()){var e=this.next();return t(e)?e:this.nextFilter(t)}return null},t.prototype.limits=function(t){return this._limits=t,this},t.prototype.collect=function(t){for(;this.hasNext();){var e=this.next();t.collect(e)}return this.reset(),t.finalValue},t.prototype.onElem=function(e){var r=this;return new t(new a.MappedStreamDataSource((function(t){return!1===e(t,r.pos)&&r.stop(),t}),this))},t.prototype.filter=function(e){return new t(new a.FilteredStreamDatasource(e,this))},t.prototype.map=function(e){return new t(new a.MappedStreamDataSource(e,this))},t.prototype.flatMap=function(e){return new t(new a.FlatMapStreamDataSource(e,this))},t.prototype.each=function(t){for(;this.hasNext();)!1===t(this.next())&&this.stop();this.reset()},t.prototype.reduce=function(t,e){if(void 0===e&&(e=null),!this.hasNext())return i.Optional.absent;var r,n=null;if(null!=e)r=e,n=this.next();else{if(r=this.next(),!this.hasNext())return i.Optional.fromNullable(r);n=this.next()}for(r=t(r,n);this.hasNext();)r=t(r,n=this.next());return this.reset(),i.Optional.fromNullable(r)},t.prototype.last=function(){return this.hasNext()?this.reduce((function(t,e){return e})):i.Optional.absent},t.prototype.first=function(){return this.reset(),this.hasNext()?i.Optional.fromNullable(this.next()):i.Optional.absent},t.prototype.anyMatch=function(t){for(;this.hasNext();)if(t(this.next()))return!0;return!1},t.prototype.allMatch=function(t){for(;this.hasNext();)if(!t(this.next()))return!1;return!0},t.prototype.noneMatch=function(t){for(;this.hasNext();)if(t(this.next()))return!1;return!0},t.prototype.sort=function(e){var r=this.collect(new a.ArrayCollector);return r=r.sort(e),t.of.apply(t,o([],n(r),!1))},Object.defineProperty(t.prototype,"value",{get:function(){return this.collect(new a.ArrayCollector)},enumerable:!1,configurable:!0}),t.prototype[Symbol.iterator]=function(){var t=this;return{next:function(){return{done:!t.hasNext(),value:t.next()}}}},t.prototype.stop=function(){this.pos=this._limits+1e9,this._limits=0},t.prototype.isOverLimits=function(){return-1!=this._limits&&this.pos>=this._limits-1},t}();e.LazyStream=u}},e={};var r=function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n].call(i.exports,i,i.exports,r),i.exports}(152);return r}()}));
//# sourceMappingURL=Monad.js.map