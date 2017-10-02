!function(e,r){"function"==typeof define&&define.amd?define([],r):(e.Storage=e.Storage||{},e.Storage=r())}(this,function(){var e,r;return function(t){function n(e){for(var r=0,t=[];r<e.length;r++){var n=s.resolved[e[r]];n&&t.push(n)}return t}function i(){for(var e in s.unresolved){var r=s.unresolved[e],t=n(r.dependencies);o(e,r.factory,r.dependencies,t,!1)}}function o(e,r,t,n,i){n.length===t.length?s.resolved[e]=r.apply(r,n):i&&(s.unresolved[e]={dependencies:t,factory:r})}var s={resolved:{},unresolved:{}};r=function(e,r,t){return s.resolved[e]?void console.warn("There is already a module with id <"+e+"> defined. Therefore this module will be ignored"):"string"==typeof e&&Array.isArray(r)&&"function"==typeof t?(0===r.length?o(e,t,r,[],!1):o(e,t,r,n(r),!0),void i()):void console.warn("Passed arguments for module are invalid")},e=function(e,r){e=Array.isArray(e)?e:[e];var t=n(e);if(1===t.length&&!r)return t[0];if(t.length!==e.length||!r)throw new Error("Not all modules are resolved");r.apply(r,t)}}(),r("node_modules/jean-amd/dist/jean-amd",function(){}),r("TypeCheck",[],function(){return{isString:function(e){return"string"==typeof e},isBoolean:function(e){return"boolean"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:function(e){var r=!1;if(this.isString(e)||this.isFunction(e))return!1;if(this.isEmptyObject(e))return!0;for(var t in e)if(e.hasOwnProperty(t)){r=!0;break}return r},isEmptyObject:function(e){var r=!0;if(!this.isDefined(e)||this.isBoolean(e)||this.isFunction(e)||this.isNumber(e)||this.isString(e)||Array.isArray(e))return!1;for(var t in e)if(e.hasOwnProperty(t)){r=!1;break}return r},isFunction:function(e){return"function"==typeof e},isDefined:function(e){return void 0!==e&&null!=e},isArrayTypeOf:function(e,r){var t=!0;if(!this.isString(r))throw new TypeError("options.type is not a string");if(!Array.isArray(e))throw new TypeError("options.array is not an array");0===e.length&&(t=!1);for(var n=0,i=e.length;n<i;n++){if(typeof e[n]!==r){t=!1;break}}return t}}}),r("StorageNotDefinedError",[],function(){var e=function(e){this.name="StorageNotDefinedError",this.message=e||"Storage must be configured"};return e.prototype=Error.prototype,e}),r("src/Storage",["TypeCheck","StorageNotDefinedError"],function(e,r){return{_storage:null,_currentType:null,storageType:{SESSION:0,LOCAL:1},configure:function(r){if(!e.isNumber(r))throw new TypeError("type is not a number. Use Storage.storageType for configuration.");switch(r){case this.storageType.SESSION:this._storage=sessionStorage,this._currentType=this.storageType.SESSION;break;case this.storageType.LOCAL:this._storage=localStorage,this._currentType=this.storageType.LOCAL}return e.isDefined(this._currentType)},writeElement:function(r,t){var n=!1;if(this._checkConfiguration()){if(!e.isString(r))throw new TypeError("key is not a string");this._storage.setItem(r,JSON.stringify(t)),n=!0}return n},readElement:function(r){var t=null;if(this._checkConfiguration()){if(!e.isString(r))throw new TypeError("key is not a string");t=JSON.parse(this._storage.getItem(r))}return t},readAllElements:function(){var e=null;if(this._checkConfiguration()){var r,t=Object.keys(this._storage);for(e=[],r=0;r<t.length;r++)e.push(JSON.parse(this._storage[t[r]]))}return 0!==e.length?e:null},removeElement:function(r){var t=!1;if(this._checkConfiguration()){if(!e.isString(r))throw new TypeError("key is not a string");this._storage.removeItem(r),t=!0}return t},removeAllElements:function(){var e=!1;return this._checkConfiguration()&&(this._storage.clear(),e=!0),e},_checkConfiguration:function(){if(!e.isDefined(this._storage))throw new r("Storage is not defined. Pass valid storage type to <configure>-method.");return!0}}}),e("src/Storage")});