(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 4));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 14));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 17));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 18));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 19));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 23);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 24));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = tt.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook, params) {
  return function (data) {
    return hook(data, params) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data, params) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      var res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res, options).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        // 重新访问 getApiInterceptorHooks, 允许 invoke 中再次调用 addInterceptor,removeInterceptor
        return api.apply(void 0, [wrapperOptions(getApiInterceptorHooks(method), options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name) || !isFn(api)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var _tt$getSystemInfoSync = tt.getSystemInfoSync(),
    platform = _tt$getSystemInfoSync.platform,
    pixelRatio = _tt$getSystemInfoSync.pixelRatio,
    windowWidth = _tt$getSystemInfoSync.windowWidth; // uni=>tt runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
var locale;
{
  locale = normalizeLocale(tt.getSystemInfoSync().language) || LOCALE_EN;
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  if (isFn(getApp)) {
    var app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
  }
  return normalizeLocale(tt.getSystemInfoSync().language) || LOCALE_EN;
}
function setLocale$1(locale) {
  var app = isFn(getApp) ? getApp() : false;
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
var EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {
    var _this2 = this;
    (0, _classCallCheck2.default)(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this2.on(name, events[name]);
      });
    }
  }
  (0, _createClass2.default)(EventChannel, [{
    key: "emit",
    value: function emit(eventName) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {
        return opt.type !== 'once';
      });
    }
  }, {
    key: "on",
    value: function on(eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    }
  }, {
    key: "once",
    value: function once(eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    }
  }, {
    key: "off",
    value: function off(eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    }
  }, {
    key: "_clearCache",
    value: function _clearCache(eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    }
  }, {
    key: "_addListener",
    value: function _addListener(eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type
      });
    }
  }]);
  return EventChannel;
}();
var eventChannels = {};
var id = 0;
function initEventChannel(events) {
  var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
  }
  return eventChannel;
}
function getEventChannel(id) {
  var eventChannel = eventChannels[id];
  delete eventChannels[id];
  return eventChannel;
}
function navigateTo() {
  var eventChannel;
  return {
    args: function args(fromArgs, toArgs) {
      eventChannel = initEventChannel(fromArgs.events);
      if (fromArgs.url) {
        fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + eventChannel.id;
      }
    },
    returnValue: function returnValue(fromRes, toRes) {
      fromRes.eventChannel = eventChannel;
    }
  };
}
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || tt.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    tt.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-toutiao".indexOf('quickapp-webview') !== -1

  var extraParam = {};

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__BB0EA57",
    appName: "tt",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.98",
    uniRuntimeVersion: "3.98",
    uniPlatform: undefined || "mp-toutiao",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  };
  Object.assign(result, parameters, extraParam);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = "mp-toutiao".split('-')[1];
  var _hostName = result.hostName || _platform; // mp-jd
  {
    _hostName = result.appName;
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var oName = 'getUserInfo';
var nName = 'getUserProfile';
var getUserProfile = {
  name: tt.canIUse(nName) ? nName : oName
};

// 不支持的 API 列表
var todos = ['preloadPage', 'unPreloadPage', 'loadSubPackage'
// 'createCameraContext',
// 'createLivePlayerContext',
// 'getSavedFileInfo',
// 'createMapContext',
// 'onMemoryWarning',
// 'onGyroscopeChange',
// 'startGyroscope',
// 'stopGyroscope',
// 'setScreenBrightness',
// 'getScreenBrightness',
// 'addPhoneContact',
// 'openBluetoothAdapter',
// 'startBluetoothDevicesDiscovery',
// 'onBluetoothDeviceFound',
// 'stopBluetoothDevicesDiscovery',
// 'onBluetoothAdapterStateChange',
// 'getConnectedBluetoothDevices',
// 'getBluetoothDevices',
// 'getBluetoothAdapterState',
// 'closeBluetoothAdapter',
// 'writeBLECharacteristicValue',
// 'readBLECharacteristicValue',
// 'onBLEConnectionStateChange',
// 'onBLECharacteristicValueChange',
// 'notifyBLECharacteristicValueChange',
// 'getBLEDeviceServices',
// 'getBLEDeviceCharacteristics',
// 'createBLEConnection',
// 'closeBLEConnection',
// 'onBeaconServiceChange',
// 'onBeaconUpdate',
// 'getBeacons',
// 'startBeaconDiscovery',
// 'stopBeaconDiscovery',
// 'showNavigationBarLoading',
// 'hideNavigationBarLoading',
// 'setTabBarItem',
// 'setTabBarStyle',
// 'hideTabBar',
// 'showTabBar',
// 'setTabBarBadge',
// 'removeTabBarBadge',
// 'showTabBarRedDot',
// 'hideTabBarRedDot',
// 'setBackgroundColor',
// 'setBackgroundTextStyle',
// 'chooseInvoiceTitle',
// 'addTemplate',
// 'deleteTemplate',
// 'getTemplateLibraryById',
// 'getTemplateLibraryList',
// 'getTemplateList',
// 'sendTemplateMessage',
// 'setEnableDebug',
// 'onWindowResize',
// 'offWindowResize',
// 'createOffscreenCanvas',
// 'vibrate'
];

// 存在兼容性的 API 列表
// 头条小程序自1.35.0+支持canIUses
var canIUses = [
  // 'createIntersectionObserver',
  // 'getSavedFileList',
  // 'removeSavedFile',
  // 'hideKeyboard',
  // 'getImageInfo',
  // 'createVideoContext',
  // 'onSocketOpen',
  // 'onSocketError',
  // 'sendSocketMessage',
  // 'onSocketMessage',
  // 'closeSocket',
  // 'onSocketClose',
  // 'getExtConfig',
  // 'getExtConfigSync',
  // 'navigateToMiniProgram',
  // 'navigateBackMiniProgram',
  // 'compressImage',
  // 'chooseLocation',
  // 'openDocument',
  // 'onUserCaptureScreen',
  // 'getBackgroundAudioManager',
  // 'setNavigationBarColor',
];

// 需要做转换的 API 列表
var protocols = {
  navigateTo: navigateTo(),
  redirectTo: redirectTo,
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  getUserProfile: getUserProfile,
  connectSocket: {
    args: {
      method: false
    }
  },
  chooseVideo: {
    args: {
      camera: false
    }
  },
  scanCode: {
    args: {
      onlyFromCamera: false,
      scanType: false
    }
  },
  startAccelerometer: {
    args: {
      interval: false
    }
  },
  login: {
    args: {
      scopes: false,
      timeout: false
    }
  },
  getUserInfo: {
    args: {
      lang: false,
      timeout: false
    }
  },
  requestPayment: {
    name: tt.pay ? 'pay' : 'requestPayment',
    args: {
      orderInfo: tt.pay ? 'orderInfo' : 'data'
    }
  },
  getFileInfo: {
    args: {
      digestAlgorithm: false
    }
  }
};
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5934\u6761\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5934\u6761\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = tt[methodName].apply(tt, args);
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['toutiao'],
  share: ['toutiao'],
  payment: ['toutiao'],
  push: ['toutiao']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});
function createMediaQueryObserver() {
  var mediaQueryObserver = {};
  var _tt$getSystemInfoSync2 = tt.getSystemInfoSync(),
    windowWidth = _tt$getSystemInfoSync2.windowWidth,
    windowHeight = _tt$getSystemInfoSync2.windowHeight;
  var orientation = windowWidth < windowHeight ? 'portrait' : 'landscape';
  mediaQueryObserver.observe = function (options, callback) {
    var matches = true;
    for (var item in options) {
      var itemValue = item === 'orientation' ? options[item] : Number(options[item]);
      if (options[item] !== '') {
        if (item === 'width') {
          if (itemValue === windowWidth) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'minWidth') {
          if (windowWidth >= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'maxWidth') {
          if (windowWidth <= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'height') {
          if (itemValue === windowHeight) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'minHeight') {
          if (windowHeight >= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'maxHeight') {
          if (windowHeight <= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'orientation') {
          if (options[item] === orientation) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
      }
    }
    callback(matches);
    return matches;
  };
  mediaQueryObserver.disconnect = function () {};
  return mediaQueryObserver;
}

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createMediaQueryObserver: createMediaQueryObserver,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback
});
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    }
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  {
    // fix by Lxh 字节自定义组件Component构造器文档上写有created，但是实测只触发了lifetimes上的created
    isComponent && options.lifetimes && options.lifetimes[name] && (options = options.lifetimes);
  }
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options, true);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"tt","VUE_APP_PLATFORM":"mp-toutiao","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "tt".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      // 用于字节跳动小程序模拟抽象节点
      properties.generic = {
        type: Object,
        value: null
      };
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this3 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this3.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this3.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this3.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this3.route || _this3.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this3.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel$1() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  function currentId(fn) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      fn(vueId);
    }
  }
  _vue.default.prototype.$hasSSP = function (vueId) {
    var slot = center[vueId];
    if (!slot) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return slot;
  };
  _vue.default.prototype.$getSSP = function (vueId, name, needAll) {
    var slot = center[vueId];
    if (slot) {
      var params = slot[name] || [];
      if (needAll) {
        return params;
      }
      return params[0];
    }
  };
  _vue.default.prototype.$setSSP = function (name, value) {
    var index = 0;
    currentId.call(this, function (vueId) {
      var slot = center[vueId];
      var params = slot[name] = slot[name] || [];
      params.push(value);
      index = params.length - 1;
    });
    return index;
  };
  _vue.default.prototype.$initSSP = function () {
    currentId.call(this, function (vueId) {
      center[vueId] = {};
    });
  };
  _vue.default.prototype.$callSSP = function () {
    currentId.call(this, function (vueId) {
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    });
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel$1();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-toutiao";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, normalizeLocale(tt.getSystemInfoSync().language) || LOCALE_EN);
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
var mocks = ['__route__', '__webviewId__', '__nodeid__', '__nodeId__'];
function isPage() {
  return this.__nodeid__ === 0 || this.__nodeId__ === 0;
}
function initRefs$1(vm) {
  var mpInstance = vm.$scope;
  /* eslint-disable no-undef */
  var _tt$getSystemInfoSync3 = tt.getSystemInfoSync().SDKVersion.split('.'),
    _tt$getSystemInfoSync4 = (0, _slicedToArray2.default)(_tt$getSystemInfoSync3, 2),
    _tt$getSystemInfoSync5 = _tt$getSystemInfoSync4[0],
    majorVersion = _tt$getSystemInfoSync5 === void 0 ? '' : _tt$getSystemInfoSync5,
    _tt$getSystemInfoSync6 = _tt$getSystemInfoSync4[1],
    minorVersion = _tt$getSystemInfoSync6 === void 0 ? '' : _tt$getSystemInfoSync6;
  if (parseInt(majorVersion) > 1 || parseInt(minorVersion) > 16) {
    initRefs(vm);
  } else {
    mpInstance.selectAllComponents('.vue-ref', function (components) {
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        vm.$refs[ref] = component.$vm || toSkip(component);
      });
    });
    mpInstance.selectAllComponents('.vue-ref-in-for', function (forComponents) {
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!vm.$refs[ref]) {
          vm.$refs[ref] = [];
        }
        vm.$refs[ref].push(component.$vm || toSkip(component));
      });
    });
  }
}
var instances = Object.create(null);
var components = Object.create(null);
function initRelation(_ref5) {
  var vuePid = _ref5.vuePid,
    mpInstance = _ref5.mpInstance;
  // 头条 triggerEvent 后，接收事件时机特别晚，已经到了 ready 之后
  var nodeId = (mpInstance.__nodeId__ || mpInstance.__nodeid__) + '';
  var webviewId = mpInstance.__webviewId__ + '';
  instances[webviewId + '_' + nodeId] = mpInstance.$vm;
  this.triggerEvent('__l', {
    vuePid: vuePid,
    nodeId: nodeId,
    webviewId: webviewId
  });
}
function handleLink$1(_ref6) {
  var _ref6$detail = _ref6.detail,
    vuePid = _ref6$detail.vuePid,
    nodeId = _ref6$detail.nodeId,
    webviewId = _ref6$detail.webviewId;
  var vm = instances[webviewId + '_' + nodeId];
  if (!vm) {
    return;
  }
  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vm.$parent = parentVm;
  vm.$root = parentVm.$root;
  parentVm.$children.push(vm);
  vm.__call_hook('created');
  vm.__call_hook('beforeMount');
  vm._isMounted = true;
  vm.__call_hook('mounted');
  vm.__call_hook('onReady');
}
function parseApp(vm) {
  _vue.default.prototype._$fallback = true; // 降级（调整原 vue 的部分生命周期，如 created，beforeMount,inject,provide）

  _vue.default.mixin({
    created: function created() {
      // 处理 injections,头条 triggerEvent 是异步，且触发时机很慢，故延迟 relation 设置
      if (this.mpType !== 'app') {
        if (this.mpType === 'page' && !this.$scope.route && this.$scope.__route__) {
          this.$scope.route = this.$scope.__route__;
        }
        initRefs$1(this);
        this.__init_injections(this);
        this.__init_provide(this);
      }
    }
  });
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: function initRefs() {} // attached 时，可能查询不到
  });
}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref7.isPage,
    initRelation = _ref7.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true
  }, vueOptions.options || {});
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function currentComponents(mpInstance, callback) {
  var webviewId = mpInstance.__webviewId__;
  var currentComponents = components[webviewId];
  if (currentComponents) {
    callback(currentComponents);
  }
}
function parseComponent(vueComponentOptions, needVueOptions) {
  var _parseBaseComponent = parseBaseComponent(vueComponentOptions, {
      isPage: isPage,
      initRelation: initRelation
    }, true),
    _parseBaseComponent2 = (0, _slicedToArray2.default)(_parseBaseComponent, 3),
    componentOptions = _parseBaseComponent2[0],
    vueOptions = _parseBaseComponent2[1],
    VueComponent = _parseBaseComponent2[2];
  var lifetimes = componentOptions.lifetimes;

  // 基础库 2.0 以上 attached 顺序错乱，按照 created 顺序强制纠正
  lifetimes.created = function created() {
    var _this4 = this;
    currentComponents(this, function (components) {
      components.push(_this4);
    });
  };
  lifetimes.attached = function attached() {
    var _this5 = this;
    this.__lifetimes_attached = function () {
      var properties = this.properties;
      var options = {
        mpType: isPage.call(this) ? 'page' : 'component',
        mpInstance: this,
        propsData: properties
      };
      initVueIds(properties.vueId, this);

      // 初始化 vue 实例
      this.$vm = new VueComponent(options);

      // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
      initSlots(this.$vm, properties.vueSlots);

      // 处理父子关系
      initRelation.call(this, {
        vuePid: this._$vuePid,
        mpInstance: this
      });

      // 触发首次 setData
      this.$vm.$mount();
    };
    currentComponents(this, function (components) {
      var component = _this5;
      while (component && component.__lifetimes_attached && components[0] && component === components[0]) {
        components.shift();
        component.__lifetimes_attached();
        delete component.__lifetimes_attached;
        component = components[0];
      }
    });
  };
  var oldDetached = lifetimes.detached;
  lifetimes.detached = function detached() {
    var _this6 = this;
    if (typeof oldDetached === 'function') {
      oldDetached.call(this);
    }
    currentComponents(this, function (components) {
      var index = components.indexOf(_this6);
      if (index >= 0) {
        components.splice(index, 1);
      }
    });
  };

  // ready 比 handleLink 还早，初始化逻辑放到 handleLink 中
  delete lifetimes.ready;
  componentOptions.methods.__l = handleLink$1;
  return needVueOptions ? [componentOptions, vueOptions] : componentOptions;
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  var pageOptions = parseBasePage(vuePageOptions);
  var lifetimes = pageOptions.lifetimes;
  var oldCreated = lifetimes.created;
  lifetimes.created = function created() {
    var webviewId = this.__webviewId__;
    components[webviewId] = [];
    if (typeof oldCreated === 'function') {
      oldCreated.call(this);
    }
  };
  // 页面需要在 ready 中触发，其他组件是在 handleLink 中触发
  lifetimes.ready = function ready() {
    if (this.$vm && this.$vm.mpType === 'page') {
      this.$vm.__call_hook('created');
      this.$vm.__call_hook('beforeMount');
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted');
      this.$vm.__call_hook('onReady');
    } else {
      this.is && console.warn(this.is + ' is not ready');
    }
  };
  var oldDetached = lifetimes.detached;
  lifetimes.detached = function detached() {
    if (typeof oldDetached === 'function') {
      oldDetached.call(this);
    }
    // 清理
    var webviewId = this.__webviewId__;
    webviewId && Object.keys(instances).forEach(function (key) {
      if (key.indexOf(webviewId + '_') === 0) {
        delete instances[key];
      }
    });
    delete components[webviewId];
  };
  return pageOptions;
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && tt.onAppShow) {
    tt.onAppShow(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && tt.onAppHide) {
    tt.onAppHide(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = tt.getLaunchOptionsSync && tt.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && tt.onAppShow) {
    tt.onAppShow(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && tt.onAppHide) {
    tt.onAppHide(function () {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = tt.getLaunchOptionsSync && tt.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!tt.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-toutiao" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      return promisify(name, wrapper(name, tt[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, extraApi[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(tt).forEach(function (name) {
    if (hasOwn(tt, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, tt[name]));
    }
  });
}
tt.createApp = createApp;
tt.createPage = createPage;
tt.createComponent = createComponent;
tt.createSubpackageApp = createSubpackageApp;
tt.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 2 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 4 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 5);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 6);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 7);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 9);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 5 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 6 */
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 7 */
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 8);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 8 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 9 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 10 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 11);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 11 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 12)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 13);
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 12 */
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 13 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 12)["default"];
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 14 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 15);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 16);
function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _construct.apply(null, arguments);
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 15 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 16 */
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 17 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 18 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 11);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 19 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 20);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 21);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 7);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 22);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 20 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 8);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 21 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 22 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 23 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 4));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 17));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  var lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (Array.isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 24 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2023 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"tt","VUE_APP_PLATFORM":"mp-toutiao","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"tt","VUE_APP_PLATFORM":"mp-toutiao","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"tt","VUE_APP_PLATFORM":"mp-toutiao","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret, clearInstance))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"tt","VUE_APP_PLATFORM":"mp-toutiao","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    'onUploadDouyinVideo',
    'onNFCReadMessage',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 25 */
/*!*******************************!*\
  !*** D:/抖音秒火食品/tt/pages.json ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/*!***********************************!*\
  !*** D:/抖音秒火食品/tt/api/netwrok.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _config = _interopRequireDefault(__webpack_require__(/*! ./config.js */ 30));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = function _default(url, method, data) {
  tt.showLoading({
    title: '加载中',
    mask: true
  });
  return new Promise(function (resolve, reject) {
    uni.request({
      headers: {
        'Content-type': 'application/json'
      },
      url: _config.default.host + url,
      data: _objectSpread({}, data),
      method: method,
      success: function success(res) {
        resolve(res.data);
      },
      fail: function fail(res) {},
      complete: function complete() {
        tt.hideLoading();
      }
    });
  });
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),
/* 30 */
/*!**********************************!*\
  !*** D:/抖音秒火食品/tt/api/config.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  //host: "https://localhost:44310", 
  host: "https://tiktokapi.spdl.com"
};
exports.default = _default;

/***/ }),
/* 31 */,
/* 32 */,
/* 33 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    if(typeof renderjs.beforeCreate === 'function'){
			renderjs.beforeCreate = [renderjs.beforeCreate]
		}
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/*!****************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/sear.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABShJREFUWEfNmH2IFVUUwH9nXd3I/FgLM1Op2NDVyCy1kkL6oNJKDbUsNGT1zVu3hKQPlMK2AvujyMBS3x0zyixRK4sWK0pMMFOpNDL7EgXRDUstFM3c3RMzb97snbezb98u+x6e/+bMPef85tyPOfcIHRCtoR8N3AoMRxhOE+UIvYC/gePADyjfImwSw18dCBGaSL7GWsMFNPIIyjRgKNAtD9tTwE/AGkpJyVJO5mETGdImoIKQZCbKIqBfewNY4/8A5ovhrfb4yAmoCYYhrAMqczjdh3IQoREoBQYBl+cYv4suTJNl/JIPaKuAmuRelI9jnBwDtiKsR9khhp+zx6jDEOB6lPsRbgJ6Zo1pRJkkLp+0BRkLqAmeQHgpxnghDbwqKznRluPMe51DOY0sAJ5sYaM44uLm8tUCUJNMRNkQMVK2AvPEZWe+YC2yWs0IFBfluqx394ihrjW/EUCdTSUl/q5rFmG1pJjeUbAWoEk+QLkvoi9lkCzlYFyMENDfrQ71wMXWwJVimNVZcOG0O7wNzLD8HhATv7GaAR0eAlZbRnvEcFVnw1mQ+4ArQv/KRHFbbkofUKfSjXIOAReFBk0MlRXsLRhgNaNpYrvlv57jDJR1/nEVShrQYT7woqVfJIanCwVnZTEFOFacGjEsiwP8FbgyeHFSDD0KDWfN3GHgwiDebjFcEwHUWfShC0ct5UYxjC8GYDB73rr31r8nZ+lOL1nM6Ux80SQPorxrTXqVpHiziIDzgFeszTJeXDY2AzosBh6zgCrE4O2woogmGIWwwwpWK4bnbMDPgDsCRb0Y+heFLAiiMzmPbhyBYN0LayXFA/YUb0O5IVB8J6bFr6jgvOrwG1ARBNoihrF2Br30jgoU28WEsAUHywRQhz1BEeypdophtA34NXBjoNglhhFFI8tMs8N+4LLg8XMx3GkDejvmrkBxREzkX1xwVp1LT874a7AsCLZKDA/bgC8Dj1vbfLC4eAd3UUQTjEXYHAYTnpcUz9qbJLv+myuG14pC5/1mkzyD8oIFOE5SfGpn8PzgutjVVyqbxeWWogE6rAWmBvFOUUYfWcKZENBnctgNXB0o/6WM3vagQsEGZ6B32/Pu1J5sE8MYO166mklQg/C6lWZXUpEqoyCM6rAKrGpdmS5upCYlDVhLCYf9nZSpKqCEa2U53xeELJ2UMYh/18nIfjFWARto7Yp6EvChZbBPTHi6dzqnOn5LpDkhTdwmK9iUHSh6aXLY5fdbMqJ8JC4eeKeJVtGDrtSh3Gw5bfUPFgX0+i8NfulvX7S/FMPtnUWoDo8CSyx/OQuUuHvxcNTPpC17UZ7KpxPQ1ofE3LuPISyQFCbONr6z4Pjnknc+RUV5g0YWykq8Mj0v0TkMpoGB4vJFuHKSLEL9bkOzKFPE5f2cazAyPsE4hPesMyrz+jRKHeJneScN/Egpf4rhrH877OX3CocEPRmvKpkQGNbRnwlSS5P3rEkMSiICJMyQFO/YutzdrWr60sQayPlnaQB/R3qNyz5AeY7eYW8x/BNm0mE9MDkLcpikmrsbbfYH/a91uBuoBUbmNa/xgzbQn8mZDIaQCdYhTLFM/kOZIC5epZ8+qPMVTXcfqoLi8pI87A6hfjZWiBuzpgMHmmRL1rHTSAkVspwD7QK0pqYrwki/UyVUogwAugMnEA6j/E4JOzjKN9mdgtY+Kqvs94Z567pvhwDzyFy7h+hsBlDCV3a/RgxyzgD6az3dRPAqK6+6OSGGS88pwLi0/w/TKYk4YFq8RwAAAABJRU5ErkJggg=="

/***/ }),
/* 39 */
/*!****************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/dgao.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAdCAYAAAC5UQwxAAAAAXNSR0IArs4c6QAABO1JREFUSEutlnto1mUUxz/f57c5dXN7t1kZZletDCoi+qM/isBM0EpB/KP7oBvukoRlKGFDMpWCom1Oqpk4kUZZ3pDoZthfUQQlWISZaUreNl/dxfnu/Z14nved2zt3wzp/vfze5znf55zzPd9zxCjMnqCQotJ7cTwGmomYAOYAgVLAXuAjxBbVtf49nEuNhGc1ZcWYPQ5aBEwBxmEY0I5IAmWYFSBakbbRk16lxuSBofwOC2gvMo5U4hnMvYKY3OfEzmP6FNLrwS0F3YcQxjnEDix+WQ2n/xoMdEhA8+mqStyD1ASamnvZUhi7cLQQqxpxdya9wTrAGknHb6gx2TYQ9AKgLSCivKicvIIy4tQEcEVIixBzQHk5F31KRSfmnVOMGDvA8RFiXiOOf8K5k0QkVdd6xp8JgPYc4xmTuB9zFWC3InkHEVg5aMxIdR7k/xhZK6Yu4DhmX+Hi96lLHlCoU3fpk4gliKsviuYS0Aa50oHZd5gtlVWVz0C2Frjx//E9lBdPNL6Q1ZS1YDYXVBDo7muDdQIll5jOfmTOtg92CqkYGCOrLjsCXJmpZ6D7dsy24lgMuuM/RW3mRWELzlZjbh5m1R7wVGjeYNaN1Ay2EWMNyNN9QEdwFrEPwyFuAQqHfpR1Y2rGetYg9yByS2RVpX+Crsk2rleQM1kFuSyoSm4/9AA7id0yFKTtLcQDgP89mMVgbaA/sipVLKsubcBUgRg/Yvq8kjhrojO9nMgc+flvInsk1H80ZiRlC0vuJHJNmG4LUQ5vMWYHQQ0oRFUDXDVMhP0JdBbiFgWFuTzh81uLhdYYNyxwYLIlA5+RV5kRHmlp4DSmbcTplRmlqSWPYyW3E7n5oLuCwoj8QOqLSSOkKEsyX9NhOKMOxEHgG+Lu7Vrb8U+fltbiOJGYQsy1RG4iRhT0fzAL0YVGGvp/f8bFXTgd4ByH9V6bH2V96bDKwkm4gtcxfC0Ns+zrRyrr4C8KFTbGIrVhtoH2tk+0gXN9EVYWT8VFn4NuGA3hRn3GMxvWkbJaH2U/wMJJRAUfYv37KkSZxFSI8NQPsWdGk3UhEv3EPg7jSuFOMVyocytoCcdam/Ux5/sA/d5SXLYYeCmzswQ7CrYSmAnMzmirdQOfgXZjLO/bBOw00BgY6X0gLxw+r4cgmq/6kz/m1tCrRXXpLNB6YFL28H5cejZxNANYBUpkJjprsFQL5O9AvVPGDpHmIeQHsvxCNTmTDdsD3Y+qvvNoDmB4S3XJdRDtBKZn03cYtAB6ilDUnBX5LrB3sJ4NKH8bcHM2G7+D5hLH85CWZbPkt4JGHCtyJn4vAaxqQjnkvQssQMpHdhJTJT3xD0T6EoXdJgOouIk48hFOz9Z1N5ZaCPmrEXMz6mMnkCrZ27pV3xJYn8N5q2AsRYlnQSuy6fPkaMBsM3I+TTdlAFmHpTdBtDl882NI2oSl65H7IDvWfI/uBz2s+lO/9QaVC+gfUFk2E8dG4IrM/mle6b8HZiFNBLxU/YrZzygQqRQCM38B9oHmAKWYpcPK2JN6Xuvajw8KGOr4QvE00tGubPr8Jz9iUqD8fiI98Jt/WBqTB/ZLsQ+kC7O3sbZVWkv70IAViQSFvAp6Cqlo1A2ee9Dn5hAuXU1d8mu/SgwN6NNaU3I95p7GNK3fYB4ddhhb1kmsPUS09LKz9/K/AQzzyADyDW0AAAAASUVORK5CYII="

/***/ }),
/* 40 */
/*!***************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/s_g.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 41 */
/*!***************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/h_j.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAfCAYAAAD0ma06AAAAAXNSR0IArs4c6QAAA7dJREFUSEvt102IlVUcx/HPuXccR8WccdLMwrDUEAuiaFNCpYVEi4jIVYtq1aJNm0DE16Q3zSKQSLA3DCuzNyixKBN0HbSoyChKsNKZ6zi+NG/3njjzPFeee7XmziStOpsZ5jn/8z3/t9/5T1BYkXKFu7AG10fOlNhd5ZlZHC3unejvoWh4nMtLvI5laMu/HQ088Ru7lzA0UVDdrgF4koUjfI6rCgefDjw1xEtzOHPRgVX2Rq4pHNwf2DTAtrmcvajAYywosTewoHDwSTw5yMv/A1sJd0PR/Och7WP+CPsCCwu37Yus7WZ7YLD+9/20LWF+YG7qn2EiYlv+M+2L1PL96VuoMXjOw8NM7uJqfNQErNRYXWZXF6dCfsjvzJ7ENtxygVAmwHkrcjYkdellUWRp4LrAg5hZ2D2Ar0ocwjclDs6g0sMV+eVuaiV3aU+KUOhhWeozXIvJmIJSo+KliBkIpBZ5M7BlhCmBXYHbWgWiP/Syr0nKxrL/tcRDk/hugJ2B5WMZFHs6AfswYxxGp7EOu7FDJvatrlEPT6CzVQucqrGxzLsxA945DttR4HFcOh6j3MM9eM34Qjph4Ea8g1dwd1aALa3TRQ9T76QWqKDadMjUQGdqoRTSyNNVXm1jVeTRkFV3K6sBWIscKLOhRk/IWiMOU25jeWB1zPozFc3mGi8Ebg68gSvHogVGIvuLHlYjXwbW14GRmIPvCKQwdufA56tsGaR9GhsiD2PaGNDv8XhDSCN/Bir5bYp5SWKQYCmkycNR4CzO9DGvlrXJvei6QD7TWHI4iUsX70+kSs8BZ2dwx5gziQciKyOLc3Cqh57IF6m4/uDrNBM1F01/5KeQDUvJw1GVz9tmXj5YnQdM0CNMmUp35L7AusihEpvLfHsJJ0J2loYc4rMaa0eyogmT800j3FpiK2YXQ1r3sJi749xY4j3sGWZ98+DV7OEPgT2R3pCNiaO3qnFDyHKUCuOCHtahJ7i9llXuh2m+7aa/eKHmHKb+S7Fv6MNIe6A9D+8/Anszbd0R+BirZ2YvzLmVgD15BY7VSvXv/xo4LvFO4z9ejDw7i1PNt6ywFDsjH1RZ05znibwWCbi1ynP1w9J40k1HKrQhFrfxVpoGOtg8xNlBhi9L40USkl4+TY9oylOLMT1S47H9fLKS6s90TGcFVgQ6MCeSlCn9T3Iwpt7jxxLbO1N7VLhHJk+L6lX5N+A0/yQlerudTdOzZy0pfXq8V9V4JAcmDU7TWlKlVHwxcrjM/V388heWW2zuUZno1QAAAABJRU5ErkJggg=="

/***/ }),
/* 42 */
/*!***************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/t_w.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAA81JREFUSEutll1oHGUUhp93djdJs5tmJ22joNTaKCKSWhQvFBQREakWRE1NC2JEDLVtpKkRUUuTIlELSiV/lUixVhGsFS/qldCLKniloBWxtqKIIiYxm938mLjZnSMzydYmbvYnca4Gvu+c57xz/kYUeOxOwlxf00AoshWzO0ARxGnIfqS+1M+FbJc601IH1kYlGfduQtoHdiNQM393Auk0yuynZ/xHgZUDzgu0dlaRjm9D2g9cDQotdGpp4CRe+hkNTP2xImCgzIs3g7qQNizpzGwU6TmGEu/qQ/wASnoWKLQmKqivewDsFaSNRTx4wJeQbS4nnxeB1kqEigD2MqgBWDK/FwMxUhgvUZkY0GGmS5EYOLUuHIbd+3D0GnBtSbA57x7Yt2S9B3Uk9VNJQPOVtMU34ek4qBGVoOxSz75KcZDJxBEdY6YYVNbqrifCIaAJLa7GYubzKs3O4nkPlaJStsfdCToI1JfkPv+lcbBu0mN9GuSvQn584CngHlDFsoEWNP95ZO3gnWPaUjo6nsjnT7a77htEYxmFskRclsU0gkiCfYZlXlf/xPnFl2Vt7ueYbgUWTZNl6/Xr/m+MTyHTQf/EhUvHn2xPXSewF4ivBPFf22D8fYzUod7Eb7lzWWttAxWhQ2BbV5THvNFaAvQ8k4njuZZR0IdPr76GbPhFZFtAawDn/1FraUzvMZN5NldE/462nbF6nPC9SC1INwOrVww1ZpD1IHWrNzHu+1s4vP156sSvIKTtiO3zM7V62WDjB2RP0Df2Ra5w8u/DR4lS624EPY7xMLJ6UGV5YPsF2QEmkifIXhaiYWhaXXgFN4LtjceZ1W2gJrD7g/yWNmt/xbNuZsbeJ+puxuN2pK+YTJwpuoKCTZJwryQrv312IKqKKP0dvFfxkm+Tqa4hUnUCsQm4gM3uKAoM1lcLVUTddqQXgFgB4BBmh5nlTQ2OpWxX9HKcyncwuwk4h+O1lAb0i2t37V3gHEW6Kj/QRjCnh6lsn44lk0GgTYRY696AbDN435MZ/7okYGDs5zOjDuApUN1CqI2CBlC6l6yF8KpCeKPDGmQ2sG0lknsvGRgY+p9IFfuQHgPWzkNHMN7CSfeQduKEQz2IKJ51Up8841dmMFx2ESVTpErzfTpri63Dws2YswWZv5Y+wTIfMDyRZJ27DdGPqMZ4g+lQN+v/nGI4dh1OxSPAZFkKcwEE/61edG4SpaZS/pyc+1VZcwtmvWCrMOvku+QpNsRjxJwuoAWzwn1YXqPPV3P16kYIRyBxVgNMWqtbS0QHgCf9FfgPF19kcoVgtmIAAAAASUVORK5CYII="

/***/ }),
/* 43 */
/*!***************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/jia.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAAXNSR0IArs4c6QAAAhFJREFUWEft17mLVEEQBvBfeeB9gApGBoYqRgr+BQYimAkGJqLgjScIHqAYm5gYGAmioLkIRiIGYiAYGGhk5L2IorIeLTX2k1WY2TfDTjTb0Xt0dX3VVV9VdYUBVillOU5gBz7hMq5FxNd+1EU/wilbSpmFbbiEVfiFZ2lIRDztR98g4ItxDvsxr4J9wAHcjogfbQ0YBHwpzmPPBPD3OInrETE+TPAlOIt9mF+B3uEYbkbE92nwyTwwSMyn3T56hFuI0ziEBZVUb3GwFpmseK1Wh3CllNk1Z2fmb4+TuZe5ncAJlobkelP/79XzvYice1kLvkQpZRk2Y2NVlpZ3MyD30sANWI80Olc2lPt4gVQ+o8sFmr0sSo8S/CJ2IjvVZDdvdGZzSdnmhmls1vSfLfydZ1J2LMHTZStaHJpqkfEEf4J19SZTDdBLXyfmW3EUa3rEqlGS7s14JsuznTZuTy58xrcWhEtdSbjHCZ7xW4m1lcm92J4xTeDt2II51aqPuIqHNZ7dCNdcYgzP/6ZEKSW/29T6TK/jtYU2qfYau3FnklTtgEdEpxa0AfsnbqWURThTXy4Ti8xh3IqINoz/Y0S/DCulTHe10etqox3zHBr2/vd0zty/Meyncw4NF+rQMLemak4sObsNfWjIwnIEpyY8Jl5hF+421atN/RikyOSZTbiC1XVQfJATTES8bAPayPwG8b/o+XavjSwAAAAASUVORK5CYII="

/***/ }),
/* 44 */
/*!****************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/time.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABA9JREFUWEftll2IlFUYx3//M187ri7rblSWfagR4tpSjn1p9HFpQbH0cRFZeLOzfWBBUJct3QXhhYi1YulVQXcZ1F0ECkI1KqhhaB8sLVIq6brr7szOnCfO+042O868u2sX3vjAwMzLO+f5nf/zP89zxDUOXeP8XAeYtwJ3bbdcR57udIVVyrBKNW6XYzFCGBXz/I04Vavyq2YYO3KBcYbl5yrxPABM9+ykO+VYn4J1Jm4CshgZCRclMAxHDZgxz3QAmYGDF7Oc/H2LppMgkgGGzRWWscI8myTuRuTrOw4pLVo4ViD+7nBm0e8q4jxiv4z9paIutINoDxAn78MYAJZHy4NXWL4eJjweLivx73NwBk4wIfHjRIWvT7yhc60g2gCYCiOsNM9mHLfJqM1KbMhEGTiBqGCskdHZ+E5UGZEyYxrPwclx9v38ri42Q7QE6NtmPbk8r0j0Ne86LnmkxqhP80mtQjWT4jkz+mW4NhAXvefL7j858N2wqo0QVwD0fWHZ7HkelfGMRD7svvEPocYmzIxjlRp7Js9Q7bmFp/E8JpEVoSizw0NaMAbsLhU1mghQGLFl5ikqxfLm5NHuA0BQVxxPl9lbzVENsAaP0AbAjJRB2eDA4SF9nghw70e20YnnwxlvBxBkNuOndIU9AcA8AxIb2gHUwVPAhdKQ3k4EWPexbQHWt5MzKNAIMFWmll7CC4KHTZHUtYQylEtFvZYMMGLvYdwazNFsqHYlAJ5CFMyTQ2SAtAsdoiHCicCYLBX15lwe+BCjW5ptvstnv25CPEfLnr3Hz3Bp9Q0s7czQCSwyTwHHQ4KORiUiAJgoDeqtuRTYJqOrHUCkgseZ47dUlU99mnNLTsfN6Qy47M30S7wo0dXooYUAfCCjNxEgtF/PtMFhg1EcVXzoOyxCUT9YcUV3XIAC7wArWzWV5vNtxAOo7g1TPAty8YRq0QvEZGlQWxNLcN8ue1bG4801bNXHLR5E8SeEIhXajeCMN6YODen1ZA/stH6leNlgqYNZbbMVxHyeRRMyjj9KQ3o/EWD1DuvtTPMSYm0Ys62O4nySNh9B80xg7Dv0qr5NBMBMhV2sNWMzovf/qhDtPjbtURyflYo6mwwQhv82y9+4iE2IJ1oNpIUo4Ika02lv7D0yxCmiUfJftL2Q9O22nnyVAXOsA3Kt5kISSH1qho541ju+6hrjYPMojn2bEA/ssN6ZLE86Y73B4uDwBJdHK9UNF92egLOW4pvxKb4/tVXhAnNFzHkpfXC7dc1k2SDHRvP0yMiSag1eTx5OziWJkxjBcL+Uiop6xVUBhD/ducc6uqa4I+24X7AGRX0/OveXFw0zIlxOxV/e+CElDpcGOYdm17wZYk4FFmK4q3n3OsA1V+AfBfLAMA4vu08AAAAASUVORK5CYII="

/***/ }),
/* 45 */
/*!****************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/eyes.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 46 */
/*!**************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/xx.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABDpJREFUWEftl2molWUUhZ9V2aQllc2jzQPN1I+KaICIwCyLSkgxmqkgqH9SQQRBIQ2UZGgkZRRUSCMNP/yRiXrBUiuKFEqNBsxuqaVZK1bsC+fm+c453C5I0AsHDu/3nXevd+21195HbOOlbRyf/xYA23sAewJHAQfX912AzcBaYDXwJfADsE6SuzHcEwO2E/Q4YBxwFnAYsDOwPbAdkEBbCsgqYAHwOrAM+FHSn01AOgKwnSAnAjcCF9eNd62Av1XQBM85OwA7FaiNCQzMA54NIEnZ22o1ArA9GrgGuL0oz+Eb6uClwBfA98AmYASwN3AEcAowBtithZEngdmSAmrQagvA9u7ATcCdwIF10FfAy8AbwAogDPxebAwwEMYOAS4BJgBHA9HId8BTwOP/BLEVANu56STgPuAg4OcKmlssk/RLN2HZHgWMBW4Frq7UBcSDwExJYfLvNQiA7QjqzMpb0Cf400EOrOlF1a3gbO9bTN5RaVkJ3C1pbhOA0PcIcFnRPhu4X9I33W7d9Nx2tHEXcBsQAc+XdG4TgCvrtkH+KXCVpM+GGnzgd7YPL1ZTwpskjWwCEKqvA1K3yddjkn4dBgAp0YnF7khJEWZbDaRuzwZC+XhJH+Ut2ymp0Le+VUC2c5MIbmOrOEuEebZB0vo640jg3VSVpAi9LYAE3g9YUgBW205NR81nlLHMktRfPhGDSj4XA9MlrS27vhk4B/gQmFH7Kee3gGMkpVzbAugH4gEfJP/At8B5lb+UZFR8haSltuOQr5T5xH4nSlpg+yTg1SrD7E+RNM/2/vX+qZ1SEINJ/cbpxklaZftk4Bng0HK/SZJW2M57qZLjga+ByZKW244bPl/uGfO6Pqm0HQbejjl1YiAvXFg3nyCpz/aOwGmhDvgYWC5pi+0I6wQgANMB+yRtrv3shaFU0JLaTwd9p5sGHgBiGjGoh4FpA03E9ghJsd5Bq5f9vFPumjNHdRLh+cCsovvz2KiktNR/tWzHVZ8DTgf6Je3VJMK41r3ADdVWXwSmRgtDRVDimxotlL/MkZRG17YKQn0GjzmV29TwzBhShDaEXnAAcEvZcKapvvSGAX8JgnbdMFPOeOChKrF0v9RvuuFiSWnDHVd5xLFA/OByILNFUpr2/l7rhNQ0D8Sp4gP3VFlm6vkEuLaUnREtv80sGNtunQdShgl6abXzdNhUQ1L7ZiqoFX2niSggLkj7LLdLP0+ziqLjjHkebWTUyl4cM8HjDwEYt1sHvA88WmU6KHjbFLSis510pDVPr4DzSyOZiNsxEG9IiqKd3PoF4LVMRE366TaU5vlFZcX71PgV2tcU0DSovJOb/VSOmFQtAhZmPJeUmbFxdQMQBjLbZZ6LijPvZy6cUTeNv+eMCDXPcvt80gX/6CbWXlIQAeW/wBN1+2nAS5LSpIZl9fTHZFgiNRzyP4C/ABTUlzCerowdAAAAAElFTkSuQmCC"

/***/ }),
/* 47 */
/*!******************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/center.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 48 */
/*!*********************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/footerImg.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABG9JREFUaEO1mlfIXUUUhb+FBRQUMbEQH0QJNiI2oiAkGBAlFjA2EgQJKhgLGvub4JtErBELYtAXg4Ix2AhYsCIWiB0LithbRLFh3bJ/54aTyzl39pwzd8P/8s+atfeaPTNnZs8VBWZmZwD+tx3wPHCXpM/aKMxsEXA48DmwVtK/Ba7CUEWRZvYAcNoY/i9gsaSnRv83M+d8GDihgf0IWCjpy6i/KC4kwMzOBO7tIDVgN0nfebuZnQvc0YJ9UNKpDaE+GFcAOwPPAOdL+jMa+AgXFfA+sM8E8pWSbk4CHhkb/VG3TZJmJ8xxwGNjfBuB+ZL+KRERFeAjs80E4lWSrkrBrQOWtGC/kbR7wrwOHNSCWSJp/TQE/ATsOIF4uaSZKWZmy4D7WrBrJJ2dMF/7tGvBrJB05zQE3Apc0EH8K7CrpN8a8/t2YEUD73P8JEk+EC5yVZr/45RzJH01DQHbAs8BR7SQHy/p8fH/m9m+wGHAF5KebWn3LHm23HwDWOa7mZnNB3wAfHE/Ick3hU4LrYHGyF6ettJZwGvA9ZJeLRmxJtbMfB3sArwkyTPp2XkLmDfCSZoYY5GAvoFG+5mZbxR/AKO4fpY0ae1tBkZ9bIEzs1OAE4EDge0LSX4BPgFeBNZJ+jRl4M3EN0M3lQyY2VHA6maqC4Mfh/sx4xbAp+iewEONNXBWtTWQRsiPCP6xmob5B3OepL/9SCLJv/ITrXgNmFnuo5bzmWvfKOnQHGjzIo8C0+ifB9xW0qcn9jJJN0T6FmXAzN4F9o8QD8T41Jkt6YccT1iAmfl+/W2OsGL7pZJuzPGVCDgAeCdHWLH9UUm+RddZxGY2x48FOcKK7W9IOjjHF85AWsQfA3vlSCu1fyDJz1N1MpAErASy8zLnNNj+iqS2w+MW3Usz4Hi/MRX1CwY8DvOT6DG5vsWBmNnpwP054grt6yW13ez6Z2DU08wWAn5z2q9CoF0UqyVdlOMvzkBDxFbAe8DcnJOe7edIujvXt7eAtKiPBTbknPRsXyDphVzfQQKSiK4Les53rn1W1aNElzcz8/qO13lqml8xj4wQ1sjAWmBpxFkB5kpJ10XwNQR0FbIi/rswcyV5PTVrNQT4nTaU7mw0/wPeluR37JANEpCqCJuAHULeYqCbJF0Sgw48EpiZ1/9fjjoL4g6R5LXTkA3NgBd0rw15ioHCu8+IbqiA2vO/aPRdRG8BZrZHej6KjW0eFTq8jdMMEXANcHU+rjDCK9wzrzwlNkTAhxUPchdL8spcsfUSYGZ7A6EPTSCiDZIWB3CtkL4CjvbafV+njX4/pgfC4se9QbtQquuH9+oOoV688jqoF8t6W98MbJ1eVXbq7RkWSfKnp0HWS4B7NDMvr1/Y0/vJkryEPtiGCPBnpu8LI/C57m9qTxb264T3FpCy0PZg3eXM66r+cwN/A6hmgwQkEf6qeA/gtdMu899SLJVUmrGs0MECRh7MzJ+CFgBeQ/Vfs/yeFvrTktZkI+kJqCagp//B3f4DgjBhQEPtSAEAAAAASUVORK5CYII="

/***/ }),
/* 49 */
/*!********************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/shop_ing.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA+xJREFUaEPtmdur1FUUxz/friTdhC5iEVFQRFCQKARdzJQu2I3KoMKs8CUTH8oe+gN8SH2Q1BfpSgVlEmWQ3e0CgVFQEGFQRGSUBWaG0XXF97RH5owzs/fM7DNnDrRefjCz9nev715773XZYoqLprj9VCcQEZcA9wH+Wt4F1kryt7pUJRARVwEvAEe2WPo7cIOkV2ozqEYgIo4FPgTO6mDkF8BsSb/UJFGTwL3AwxnjlktaP3IEIuI44B3g/IxxnwCXStpbi0QVD0TEEuCxQqPulPR4oW5WbWACEXFU2vvnZmf7T+GzdBZ+K9TvqlaDwB1Aryu6RNITk04gIo4GdgDn9GjM58AcSb/2OO4g9YE8EBF3AY/0acTdkh7tc+yBYX0TSHv/oz5WvzG5vTBL0kBnoYhARBwKnALMTN9TgWuBeQOu4FvAS8C3wC7gO38l/V2KexCBiPBdfjZwGnBGMvpk4CTgROCYUvAe9fYBPwK7gR8Sma+Ab4CdkhxDOp+BiLgMeAg4HZgOeNVHQeyNPcDXwAOS3m42aswDETEbeANwPjPK4jxqviTnXGPSIOB9eM0oW95k21ZJPn/jCPwMOJ+ZCrJX0vGtBOyaiTqctRdln6QDW72xhVxoXFl7pgnC2ybJhdO4LXQR4Dv58AmatBbsn449kt4fRyDdRNcDzwJH1JqtMo7L0lskvdiMOy6QRcTViYSTtFESJ32L2tXU7SLxQuDJFMxGgYSD2GJJL7czpm0uFBFXAE8BJ0wyg5+A2yW92smOjslcSi22TKInvPI3tqYOrUS6ZqMRMQfwoZkxZE98D1wnycVSV8mm0yk79f5zCj0McWq9sFP22ZMHGsoR8TRw6zCsB56RdFvpXFkPpBjxvPdjKeiAelsk3VSKkSWQqrEP3AopBR1Qz6nyhaVVWQmBM4HtQz4DcyV9WbIQJQSc5G0FDisBrKDzl2sTSdtKsEoI3ANsKAGrqLNM0sYSvBICq4H7S8Aq6qyRtLIEr4TAc8DNJWAVdTZLWlSCl4vELt1c7M8qAauo44aZi3eXul0lR+C8dAO5zdKr/JMGHNLrwNRG8U30aW5sjsB84PUcSMv/frzwO9mq9PuDfh/ro2mwQJK9P5AHXGq+lwNJ/7ticsRe19y38X+p77QCcIRtfQDsBH9xc+nYSSnnAZ+BN4ELMiQ2A5skdfVWRCwAlhZcCh8Dlw98BtLquYHrQDatDQmn2hslvVbopTG1RGSZU+Y24/anQOYmQ1ay12ia0FvJ97L7pxY/6PlFcrukP7KztFGICDcP5gLL/fCXVNz3XF2ydRqQRQT6MXBYY/4nMKyV7usWmmzjSub/F0DSF0AMbiblAAAAAElFTkSuQmCC"

/***/ }),
/* 50 */
/*!*****************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/login.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 51 */
/*!****************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/fbwz.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 52 */
/*!******************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/helper.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 53 */
/*!*********************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/house_big.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA0CAYAAADBjcvWAAAAAXNSR0IArs4c6QAABLlJREFUaEPt2V9oW3UUB/Dzu7lpmq6yDlYtUmvZ1g7xzYeiOFzqcG/FPw8+9EHnhiKOPShUpYIUXNMiImLcHqZO7aNkUzGIVHwRRajgU0HcWpiu3Uhaitt6e9Pc3N9Xzu/epEmb/klzE3MlhcDlJiX3k3N+5/fnCPqf/olqujpfvR5ebQkNA3iOgC4CFqUQl4IWvZ18ryNVze+uGmzfG0t7dT37PQEPgwUAgV/O9d9ZYR+7PX7fTLVwVYExKqjbkyD0KdBGGN+bt4UdqRbOcxijmoL2JEB9irQZjLUC87aQVcF5ClOokJwkiT6waTsYfwL4SxN0ZOndzjkv09IzGKNCIUwCbvrtHMb82YCgiJc4T2D3jtxokbLpO4I4mo9SeTBO2dmAJjzDVQxjFMnmhCT0q8zLpV/5ME7LWT2geYKrCKZQ1JyApH4HVDGMh9msFdAiZoVjbtcwBxVOAIWR8gSmIpfVAxXhdgVjlKCWBAj9POmuRcozmIpc1gpEzNjuqmXZMIUSLQmCk35VhBEkZm3bipixnrKngrJgjNJEawIk84WiqjBnGfaHsLNHl2M9C+XMczuGKZTWmiCgqFDUAMZLlGlhW4+Xg9sR7MERNN3W7sRBGFg/nmoD42kO05q0d4zbFuagjDiRHCgu6U6hqCGMM3HHuC1hjLqjGXEIjpRibKiANYaRBKZ1yG0jtylMoXQjTsBAfttRBzBnT8c4bIkrCWOUETTiEuRGyt0o1glMDQLQtE6b4zbAHNSKKhQ89xbtp+oLxg83rROVjFwRTKFCK3FIGnB/lXqHMe639GrgCbpw8FbhPJeHRUagXwuZl9WYcgYVB6vuYfyMgjCVzgSOF+Ic2JcIdM+YE0Q0mAf5COY+81TGWsMJB5WeEIRBFagcyH8wfvapjKWryIkD4+YnAJ3KFwl/w7i8TVmWflwcGDMtEOkKJuhbgjQB8ayfxhgRTIDCa9lGPzDsMxCdIIlLLVZ40GhauQDQ836CgWhCSKxA4GW38GVV8eh8H+G514TJ191R43P/wfBF5qOeF5pOXzkL0CAEzm+YoP0L6z1Rch7L3WzA3BOpWq/u1fetq9wgTsVGxDxdUqUJ+FNC8jb/MAHNa8u24m6M05hxlwpu62n9vXqImEFEwxSkiwsjdy/zA7aPpFrlSvakJIoSYU9Bz6wIlMMUIteA7o/upmStU9GQoMcWo+2/lzpd2jt04yFN4CcAewr7Zz6ImDidGt1/PofiSPF1LnJ8ve/1+VcAnPMTbPmuW//sn4n1rKr0G05eBvC0k3biq6XxjmcU+MzVUFsovAhBrblWbr1H7Jfk2fYjCjWU6kAQNwt70LqmdaSi9yT5/bahuZ9B9Kg/YIRvku+0P6Vgb6YOQcPVQliAsj0LbmO9bej61yDxZAP2n07QjYjxGGukonNw0UjFdcsCT7YtdTnGxoxPIelkRUcDtYYBFzPnek9tudG8P2oME2jUVzAh38rEDke33kGPmd2Q8goRgrs+Ca5txCyhZ3vTHzxwbUsYv9kVNV4UAJ9W7e6Iu4YwIvFSOnbo4/U7iE37Y12jy8cINEzAIyAKl9X4qz6MzxF/JSGi6Q8P/lhqW7Rtq7bUP/nh3r/X88JKO/m81wAAAABJRU5ErkJggg=="

/***/ }),
/* 54 */
/*!*******************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/house_b.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA0CAYAAADBjcvWAAAAAXNSR0IArs4c6QAABGxJREFUaEPt2W9oG2UcB/DvL9ckdBRlHbjhvxf6ws33iojiVNwLxU1kiyBu9q5Nc2lp8R/4B/+BwzmEKi1pnsc2l1pkaCziNhm64Vtf6FvRKc4Xc5P6Z0GlQ7rk7ieXJusluXS55NIk0nvVJs899/vc7/c8T547wv/0oFa6JiYyvb29F18k4gEANwD4E6CFUIhf1TTtj1Zeu2UwKeXVzMHPAdzhAjhrmtb9o6NDP7UK1xLYCip0EuDb1wj8vGlaO1uF8x1WA/WeZeGwonCEmQ45sC3D+QpzR5GIxQZGiIhtkJRGnBnTDtzPimLeE41Gz/lZlr7BEolEn6Js+rK8/MpRpcBdcGcUxdzpJ84XmJRyE3PwMwD3rt51d9R64ZqGNYJaD1xTsGZQrcY1DPMDVcIJYTwH4G3H5NH0mGsI5oYighweVuOl2c/rDCdl6oWKpaApnGeYG4oZR7Zs6TsQiURMryBn+2oc/xgK0V2N/PzyBGslanXMVWXu21AI93nF1Q3LZDKhbPbiJwA/VArCr0xVZtmlLD3j6oKtoJYWADzcapRfmbsirB0oP3BrwtqJWsWlX2Pm1x3lWldZ1oR1Asqxzr0F4HkvOFeYG4oIxzZv7nu02Sm90eVACKMKFw7T3aqq/uXWZxXMDQXgeH9/395IJHKp0cD8OK8aR18TXdoVi8X+ruy/DJbJZJRsdulDAHsdDTsCVbss3XGXYTbqwoWleSI83qkoL7gCrAYqB9Czuq5O+VFGfvchRPoLgHc59n9lZUk1UIX2RPx0LDb4rt9B+dGflKmnmOmd8r5Wy5KEMCSAYUeDX4rPALsQVkhHIXM2LAegpwg7RcSLzLS/yzL2A4BbHGV5kqRMzRchJ4hy+ywrOE2EJ7sJxoz3iehfgPUizixMHpOTH1w1Pv7EP/bfyaQx140wXVdVKdOHiLAfoETVAt2tsHhcs98PXD42YH5M0X724Zzu7TG2kTE/Z8XZ2dl+06Rb7T4Vhb8bGhrKNpu9tmYsmZy/hsicAPgxx1qZB+gjZuWZePzA740C2wabmZnZaprKVwBuqhG8/Zblzmg0+lsjuLbBhDA+rtj+lABbHZAFXdf2dQ1saip1bTBI5x0Bv7S4ePaw/f+2bTfaW/w3S9/lcnzd2Njgr15xbcnY9HRqdyBAR4vBntZ1bYczcCGM7wFstz+zLN4zMjJ4rCtgyWRqgIjSxWCP67q2uwJmQwrPKJlZjccH57oRdlTXtUcqYJ8C2LMBc0lnW8ZYRSluZMzLONvIWOlu+bEf68hSFMIwAKhF6Cu6rh30UiJ22/WACWG8DOCNYmxpXdc0Z5xVG82KE84BHAmHA/aCWvexvGw/dOVE8YRT+bwVdZ7c0xOYAfDAymc0Gg7jSN2dA1hetnYAlAFwfa0EVMGknLuZ2Trt+DXu5ZrtaJsnCmyPxQbOrJkx+0sh0mMAT7YjSu/XpHG3p9U1348JkX4QYLuOb+vA7OUBfAPQQV1XT7jdjCu+qvV+BzvjjP8Ap9i22S1QUkAAAAAASUVORK5CYII="

/***/ }),
/* 55 */
/*!****************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/qy_q.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 56 */
/*!****************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/tech.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 57 */
/*!******************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/selest.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 58 */
/*!***************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/f_w.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 59 */
/*!**************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/my.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 60 */
/*!*****************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/men_i.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */
/*!****************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/logo.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 78 */
/*!***************************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/shopHome_select.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 79 */
/*!********************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/showHome.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABvhJREFUeF7tWmlsG1UQ/mbtuNCU8gNQEBQColBUQDTwp0XcCBCHEKBiGq8T79sEIgFCBVUqoAIpV+kPQFQgiJrsrhOvg0KFBKKBUiHKXYSg3CqUQ+GOACFoU3LuoOfsJo7rK4edo36Sf9g7883M92bfmzfPhIN80EEeP0oElDLgIGeg9ArkkwDNzW2L/X56gJmuArAwH51plPmXiLcS+RsjkVXf5PIjZwaYZtt5REonMxbkApthz3vkhOl66M1sfmUl4OmnOxbMnz/wNYBjZlhw+brTvX9/2eJbbw3uy6SQlQDLsm9mRpOr3MdM9YB/G1HPQL4eFFOuv3+ePxBwLgOoBcAh0jYzbtF19ZkJEWAY9ntEWOEqPymEurqYAU3UlmXZjzPjDld/pxCqF8MBkBkzwDTtkwEkLyJVQqifTNSpYuqZZuwMgD7zbCqKb0mmBTEjAYYRW09E97kgnwmhnlnMICZryzTjnwCc8JmZH9b18Lp0mGkJYGayrPj3AE6QSkS8RtPCj03WqWLqG4Z9BxEed212aVroRCLiVB/SEiC3PkB5yxV2/H5nUU1NzW/FDGCytjZvjlf4/fwLAN8wlnOREDU78iLAsuzNzKgfFuZXhQhfMVmHpkPfMOxOIri+kyFEqC4nAaZpHgIEukcrPlaFCMenI4DJ2jSM2I1E9JyLs7e8vKwiGAz+l4x7wCuQj9JkHSuWfkdHx6E9PQO/Z5vMNASMpg0RTE1T9WI5XAg7uV7nMQTku3AUwtFCYeZa0McQkO/WUShnC4Gba0sfQ4Bp2rsALMtVPBTC0UJiZivqRghobm493efzfe45kq18LKSzhcBOLesdx1lWV1fzqbQ1QoBp2g8DuMfd+z8QIry8EM5MF6Zpxt4F6JxE0EQbNC2UiDWZANk4ON91cLUQ6pPT5Wwh7FqWfTszvJjeEkK9IJWAPwEc4WbACiHCOwvhyHRhmmZsOUDvu/b/EkI9MpWAkYOCogwuikQiso6eMyMajR7rOP6fvYCEUBPZn/wKDHoHB0UZrIxEIj/OmegBRKPR4x3H3+XGNCSE6k8lQJaMFcMCzvlC1Lw9lwhIKYi6hVCPTiVAHhUTCwMz7tV19aG5RIBh2OuI8KAb05tCqBeOISBFYLemhZamayDMRlLcavArAKemTvDIGtDa2nri0JDvWwCKG2S1EKp3lBx33KZpXw/gtPLyso3BYLB/3AAAOjo6Aj09A2sBfCmE+sJEMKSOadqrALS7+o7PN7S4trb2hzEZIL9YVvx5Zl7pCnb7/U7VRDpBKaXn10KoCebHO0zT3g1gyfCs8QO6Hr5/vBgtLe3HKIrzsbe+EdEWTQvd4OGMOQu4WSBTxeup7wLKLtf14B/5GjbNmA5Qc/IOA2C7EOpl+WK4s/YagEuTdBjgeiHCRr44htFxFDCwjQhVrk6vzze01Jv9AzJA/mAY8Xoi3jzCEOFbZg4JEf4wm+HGxkalsvJkC0BNBrnvmJWLdL36p2w4htF+HJHzBoCTMsi1dXXt0RobG51sONFo7DrHIVn5HefJMdNNuh6SkzMyMjRFYxsAuivFQBdAm/r79z7b0NCw33vW3GxX+v1Yy4xaAOUpOvIGqSzpN+n0DiJ+RNPCryfLWlbsEmaS9blcnb11SIqkYsjfeojQOjiIjfX1qre3Y9OmznkLF/7dwIw7AVSO9YUfFSJ8dypp2S5GpDNy20h2xtPvAzDkBpccoPfcYcZaInoZYFlSH55mtiQZEkeOeRns/APQcma+mggbM8hIguRHdn8lTuqQFe46IdRH0mVM1rvBlpb4uYrC2701IVvKec+I8DORck0kUi17C2hqappfVrZgy2h3Nh+URC3yysDAvpVetkWj7VXMzkvMWJQfwrAUEd7RNPW8TDp5XI+P3rBkMSxnczcz36/r4S3p5Nwz+VMApDOHZsCSHVtZgd4mhLonnYxhxFYS0Xp3T0+XnVJN4ng2XhRCvXZKCCDiywHlMGZeAvBhAGT7fOd4T45yoQP4SsBxr92VXwHqzLVApgYxfMKD/FQAtBfAnv7+fVsDgfKbAXrClZ86AjLdrownJYsha5qx1SUCShlQegVKa0BpERxmoLQLTFkdUNoGM/zLohh7+3hslOqAUiFUqgSnshS2PwJwlvsOBoVQnx/P+zgdspZlP8gM73+BthBqeMKnQcuKxZmpevhsTV8QUa3j9CY6qjNtBAIB6uvD2YqCdmYk7v6Y+R5dD2+YMAGGEb+YiMe0r2Za4Fn86WVWTsl2zM7ZEJHgppm2RzjTeZBNGk0ItS2bo3kRIAEsKx5k5jWyxcyMxMXiDB29sg02NETr6+pC7+TyMW8CcgHN1uclAmbrzE2V36UMmComZytOKQNm68xNld//A1kqHG4NEYyuAAAAAElFTkSuQmCC"

/***/ }),
/* 80 */
/*!*********************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/fl_select.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 81 */
/*!**************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/fl.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAACMNJREFUeF7tW/9vW9UV/5z77BRwOmDiyzTQ2m60E2ya0DYktoEqNrFvsK9MJokTx89J6jYtjG3/QP6BbSVt3LhJ/JwvTlILurHBBkMMIdCGxBqhaQOtZWszwbQVtMIawxr7vTMdx4++vDzbL46TrqrfT5Hvvefc+7nn2z3nhHCJf3SJnx9NAJoScIkjcEFUwDCmbiOiPcz4ruBPhKPMfEjXO1/a6PvYMAAmJiZClqW1MaMfwKcrHHSOCEmlzNloNJrfCDDWHYB0euoWIuwGKArgSp+HegfgCWYMx+Odr/hcU9e0dQEgl8u15PMFEe/dAHZW2NkzRHRIxph5D4AvVZj3HIDhUCh4NBwOL9Z1yiqLGgqAYcxsJeJdzNwL4FoPvmcAGHIgXY+ccI4bRnZ7GTAdwNUea98kolFmOqzr7acaBcSaARgYGFBbtuy4B2C57a+JTfPY3IvMPExUOKLr+n+rbd4wjMuYg/cTkdC73WMuA/g1QMPz88efGBgYsNYCRt0AjIxMXx8MopeZdwH4iMcm8gBNA5zU9cjL9WzSMLK3AtQPcAeAkAeNvxPR4UIBo319Hf+qh8eqAGBmymSmdjLTHiL6DoCgmykR/QmwhgMBTHZ2dv6nnk2510xNTX2gWEQXoHYz8yc9aBaY+WdEfCgW63yOiERKfH2+ABgYeDawdesbCcvCXiK62YOyGKdH5OC63vW8L851TjKMyTsFCADfA9DiJsPMryqFoVOnbkgNDNxVrMXGFwCGMf1TgB/yIHaSiIctq8WIx8Nv1mLWyPF0OnetUos6c8lWbFtJm/brescPavH0CUBW9Os6mxgRXmdGYn7+xJNrNUK1NlhrfMkIb/8qEVLMuNEx/7SuR66vtd4XAJlM9nlm3OEiJq5oeHGRxhKJjrdqMVqP8VRq+pqWFu4pu8+tTh5EeCEWi9xZi68vAMbHZ3dYljlTIYQV/T+yZO07X6zFsBHjhjF1+5J3wP1edgDAnFJae3d32/Fa/KoCkEqlgolEomATGRubvkPTrH5mEgO0wgMAeJmZhgqFs9OJROLdWsxXM55Kpa4IBjd3EPFeALd6eQIifsQ0VbKnp+MFe9x9Bvc6TwAmJmZvNk1zSm6cCK9ZFpKFQjCdSITfEQITExPXWVagr0oMIPMySmlJP7dQDYiy9Mltxyq8JUqxgFLFkWg0elpopVK5K4PBQlwp9DPjJpEITdM6o9G2V30BYBjZYx7inieCYZrWwZ6err8IoVwupy0sFO4lKr3w7q4QBT6jFA+dPHnDL/24JaErbnfbtje+YVkkt+31RhA//zQzkq2twcfD4bAp68bGJj+uaWofMyScdgdOc7oe+YxfAGoFEk8pxQ9Ho5En7aBjdHTypkBACeJyUytiefEcAI0wBw7revifXrduGLkPERV3Adznsuj29DNEyBSLVrK3t+s1+XEpOJuWEPxBAF+pJk26Hlkh8Z4qYBjZ9wFgph8TcZfTDTqYHAfooGW9l+np6TlblorLFxaKbWVdXYE4gFLUBqhkPN4hLz2k09M7Aau/UnQJ4JjYltbWwGw4HH5v6bbHNit1eQzgfQB2eBz8NDNNEvGP7LG6AAAWrw6FQu8uLCy2E5Gg7JXMkMOnibQDsVjbX22GkvkB1F6A2wBs8tik/da/xWPsHECzgDXkzBRlMrMfYzYfABAHsNlj3RwzD7a2tszk8/krgBZ5gZa+ugHQdf1tm0g6PfN5wPw+Ed0HQHNtgInwBMAHursjT59Xj9wHlSrEiSDv/o9WE1MAf2PGIcsKpnt7w/+2xXx8PHs3QA8w4x4PW2My86OA9nA83v678xdgXNVwAGziIyNTNwaDSl5qoq/XeN8uH9A0a9JOb5Wfzl8GWIzmvY6DiMo9DlByfv74b+zoUtJopqm65OAAVkgJEd4Su1IoWMm+vs7X3XswjHUEwIHyZUQtEeaSEfqUBxBvM9MYER10JjJGR7NbAgF8S+YXi3istzcyf57mzFZm3kdUivKu8qD5RyIMMi9mq+UXNgQA5+bEmBGxAPFtAMq1cUlc/EIpDHZ3R571UoPx8exdllUC8psV1v+cmQZt41lDlbDhADhvEDD7AZLUmFd665hpWm22KxMXqmlqFoCX1zgD8CigJVebCrtgANhAlMPXrrJULNNh52OlwmPrFbntQuHsZL1h9QUHwAZCgpXx8ewXmemHAL5e/t3U9UhA/jaMrCQubI/yKyL+SXd35Leryex4qcP/DQDLVcM66fbLzsALUNtWK+qVbEETgI1wg7UssXNc6gZAUwKaKtC0AWUE7MdJ0wg6nt9NL9B0g804oBkINSPBBjVANEPhZii8ASmx5ltgFQhclI8hIsnW8v7GJCg25jVoJ2AAeoi5lH0ufb7rAplM9iVmfNZ1uX+WTOy5cwtT9aeo1hcAScFt2tTaWc5Qf8K5fyL8IRaL3OYW2EqlMenZkySlVxWolKQ0TRpyprL9aMJ6qYCk2DVNyuYVk7BzANrcvYmy56r9ATXS1FKRfWx1aerGSoAjDS/1BXeVqmYaviYArlyeXY/zLFQw036iczPVCxVrB2CpkXJTO1GpacuzECN1SkAd8BNR+mqRsYGwS1WiY17tcrVLVfUDUKsUJ+1xYqOcpTg/arkqAFxp7orFSiIUmfEosxpcXqxcPQBSjCWyHiTCfcwopdEdn2cx1s/B7Tl1AeBkIOVqyzJlg9KV4VmuBrA/FAoeyefND/tJioZC2j/y+YI0QImYe5bjmWEopQ06y/GrOXjDALAJ+WlYAHC03NK2zC8vT4lhGCj9J8n7fYmOg61oyKjn0Mvc41oJuNfbjYs+WlYsXY+ULLdhZMWjuIupTtJPARhcj8bMNatANQClaUkp6SqhbnfTkrM2aBhZaWv7gotWHuBxy+JBuymr0Zfl2w2ulbHdtlbuENnOjN9blhV1VoeVUhNE+ByAE9Ih4mzLWyv/auvXVQLWc+ONot0EoFFIXqx0mhJwsd5co/b9P4B+YowcdxX/AAAAAElFTkSuQmCC"

/***/ }),
/* 82 */
/*!*********************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/sc_select.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABWxJREFUeF7tmluME1UYx39fF7a7nSKoMVETUYEFb3gJCZj4IEr0wagR4wVCFAyReEETX9htQSm3TpcXE8FLUOM9oBgxanzQqPhgoiTEy3qDBRRMlMSgXDrd7S7bz0wXlGC7M3Pa6bZhT9Knfv/v8jvfzJk5c4RTfMgpXj8jAEY64BQnMHIJ1LoBtL1lPJGmJ4CbgHOAP4APKQyslM7efbXOp6YdoB2xaYh8AowtUeghVGdJJre9lhBqBkBTtJC3fgQuHKLAX4g6l0iK3lpBqB2AjvhDiD7tWZjKw5LJPuNpVyWDmgDQFM3krV3AeT7y/o2oM0lS9PmwrdikNgA6Yg8g8qzvbFUflEzuOd/2FRiGDiDg7B8vpWZdED6AROx+kA3BJ0kXiZ17PrgumCJUAJpiFPnYzyATg6XlWutuormLJMXR4Fr/inABJK0FKC/5T+ckS+E+STsvG+t9CEMDUNnsH888/C4ID0DSuhflFR+TMLSJMF/SzqsV+ynjIBQAeidNtFldKBdXnLjwE93OVNnMQMW+SjioOgBNnRUn76RBHqlewrqOqJWU1J/Z6vkc9GQEoDjDU8ZewNGjbUSkDS1MBmkb/On5QFO1EwW3A2QvaHfxJ5GdFLSbUaO62XHoV9MO8QSg7fFLkcI1iEwBJqO0IUwARodQpKnLfpQ9CN3ATlR3oJEvpDP7g5fDsgB0SexcmsRdgm7wclLH/3/MgC6Qtbnfy+VYEoAuP+M0+nq3g0yq4+J8pqa7aG6ZJiv+OlxKUBpAwuoElviM0Ahma8V22oMA2AuMb4TKfOa4T2zHvTn/b5TrAPXpuGHMxHZK1loGQOwISLxhqvNMVLNi58b474Bk/B1UZ3v6bRQDkS2Szt7uH0C7dQURtgHNjVLjEHn2UWC6dDrf+gbgGmoyPgfVN4BIA0MoIDJP0tlNgZ4DjhtrMn4Xqq/X2VOf3/noR2WeZLKbhxJ4PwonYreCvN1gEPpB7xA7954XLU8AxcuhsSD4Lt6tzReAwXuCNQvlfaDVi+ow/t+DcIukHffzm6/hG0ARQkf8ekQ/qFMIPajcLJnsp74qP2YUCMAJELYApwUJFLLtYVRmBy0+0CVwYgGaaJ0BkY/qBMJhKNwods9XJpADd8C/S2Qifi3oVpOg1dXITLGzn5v6NAYwuDpY7uGGs02DV0G3X2zHPWRhPIwBaIoIecvdpBzOVaGHqBOXFAVTAuYAOlomIE27TQNXTacDEyXTu8fUnzmAROw2EHc1GOahs8XOvWuahDmAjthSRFabBq6aTnWZZHJrTP2ZA0hYG4E5poGrqNsktjPX1F8lAL4DppoGrqKuS2znclN/RgB0EaM503Lq5A2xnwOOJRvoN4FgBsD9WhTR700ChqIpyGV+vgKVim0GYHCj5M1QijFxKnK3pLNvGUlNRJqMr0T1cRNtKBqRVZLOusdvAw/TDqivXeMhdn29iJgBSFhfA1d6OS/7v8qXwFJaslvpjc8E1iB6tbE/+EZs5yoTvSkA99VzukHALtBlpfbqjm27uQ9WJkvrNrGdGQb5+N8SO9G5JmLrQBb7D6i7UVlOi7NxqBeX4gtWrzUX0RXBjtbperFzRidSzDpg2ZgpDBS6fDwH7AdZyYHsC0HW6cHTpfGFoO6Nzet1u5+myFRZfWSH/wn5z9IIgCvXhDUfeLHMcZi/UTrJO0/Jk/SYJFaM8RitRK1HEdxP26eX8OMenFootmN8Gs0YQDHBpa3TKUTc5fC6Y/sCu0BfI9q8XlIHD5oWfrJOU+PGke9bDHIP4B7acKF+RqSwStb0uJ/wjEdFAIyj1pFwBEAdTcawpDLSAcOCvY6CjnRAHU3GsKTyDwHmrVAEyNokAAAAAElFTkSuQmCC"

/***/ }),
/* 83 */
/*!**************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/sc.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */
/*!*******************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/loginBj.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/loginBj.png";

/***/ }),
/* 93 */
/*!*******************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/iphone_.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAzpJREFUaEPtWU2oTVEYXWvfc+/zk5CSR0mGXq/37jnP70AZSZSJDAyMmGBASZkwYyADI0qRMpG/pBgp0yf73d7rRRkYEJLfCHnnnv3pe50nqXv3fhyk9q472vus71vfXnufc79F/OeD/3n+mA6BWpqmgwC2A8gAzFTyJOV3iyAik3mQ/ARgOM/zS2NjYw8AOB92KAEzODi43hhzjGQfgFkazwf+C/Oa8GeS94uiON5qte74MIKSaDabAyRPA1hN0vhAK5gvADyy1q7wYQURSNP0KMkDAOYqoOiekxqk0iEiNZKTOYnI15GRkRm+AKEErgDYQrJHsQE8FxEL4EsVOyIiKp1ZJNcBWFAm/cVaq1LtOoIIZFl2XUQ2lQS08rfzPD9Yr9ffOOeCMLplYYyRPM8XJUlyjuTKygmkaXqF5GYAuqVK4CaA3dba174Khc5nWdYL4BqANZUTyLLsskpICZTbfWtiYmLX+Pj4y9AEfesGBgaWJEmiBFZFAj9XK+6ATz8AooS6FSlKKEqocwWC3qJRQlFCUULxW8h7CuKbOL6JvSLpviBKKEooSij+J+6sgfg1GnA+4jU6nWuU5E3n3O5Wq/UqoLhBS/5aZ05biyJyo1ar7XfOvQnKzrOo0WhIu93uLYriIsm1f7wzR/KhiGi/9KO2xDvlp114Ywydc9qO7+jklK36eQB2Alj6RwmU4G11UspWu+9/tc77bCidV+NE2+lTBam0vf69uRsqGRGZIPkYgJ6TJWVlk9Dn1XuozB9I0/QqgM2lPxCSg56TuyQPAXhRFMXyWq12EsDQDxX24VRK4AaAjdMg8N45d8QYc8Zam/f19TV6enr2kDwKQLUeMqojkGXZWQA7So2GBP8I4FSSJCeGh4c/9Pf3z6/X64cBKInZIQCVemRDQ0PbnHMnSC4LDK6e1xMAx51z94wxGwAcBLBoGp7aW2vtlF/WMazvBpl8UCvYaDT2AdgrIgunnMRuZEon8x2ATyIyh2SQdNQBIqnOzwVrre5a1xFEQBGazeZiY8w+EdkKoJdkx/v/h4j18tDqtau/rkNECpJPAVxut9vnR0dHn/meCSbgA/pX85HAv6r8VNxvQOfkT342DawAAAAASUVORK5CYII="

/***/ }),
/* 94 */
/*!*************************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/mine_iconCopy.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 95 */
/*!*******************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/gs_copy.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */
/*!***************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/ljt.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAABEJJREFUSEvtlkuIW1UYx//fOblJ7bszMjZDrSj4hG5cuNCFglCL4GNVEdrByTC5ncl0sNVxVTVFrSJIoWYyvcZsCj4IXQhC0YUPKGipj4pafKH4AEFbmhSmk9zc3POXb5oZMtN22urQlQeSG3K/c37f+R7n/AVXeMhCvPHx8eXW2qyI9JFcJyIEoJ/pQdKISF1EPoyiaFcul/vjYv4vCCwUCtd5nvcuyVtF5BTJUGR6ipCkiBgAawCcds5t7+7ufmfz5s3xQtBZYD6f18lzRjqdvgnA+wCSJB8neVx3ZYxRYOycW2mtfUJE7nXO7THGFHzfr+fz+c5150Rl+sXExMQ91tqVuph67pxjIpHQkG0AsJPkGREZMsb80mq1rAKjKHKe5y0HMALgYZIfAHirbWuttWi1WsZaO0XyO9/3f58OjX4FQfArgKtmUtN+6rsUgBUANEwnALQ0ktMTz+ZTo7KybdMAMAnAdczXn3UAB33ff7ITeAjANW3AjW1HfgMQ6gJn0yV2xsF5kVdA3GHTC2A5yT9FRJ08JSKVbDZbmgVOTEz0APBIXmuMqbSLYasx5ifn3Dm5PV9RtFotep6naXme5N3GGH0eNMaEtVptcmxs7MwscGaBUql0vXNOc2HiOL5veHj4h4uVeef7vXv3rl66dOmrADaRfKqrq+vA/Kqd0xbFYvFma61WpfbXg9ls9qvLARYKhW7P8woANpJ8utlslkdHRzUts2MOMAiCW9ptoGF8yPf9L9tF5YVhuHrZsmWNgYEBLQzm8/nk+vXrV9Xr9Xoul9NwsQ0cJ7nRGLOr0Wj8K6AEQXAHyZ0iciyRSIxnMpnJcrl8ZxzH20kejeP4tVwuN7kowH379qWSyWS/iOwB8E0ymXwEQK3ZbGYB7AZw1BjTNzg4+NeiAVOp1GMAXiL5WaPR2Fqr1U739vYOknyO5OFkMpnJZDInFgWouUqn030AXgbwiXMuE0XR6SVLlgyQfIHkR81m0x8dHV18IMlPSfZ3AgF8HIZh9n/gTCNetA+veA472uJFAJ/X6/UtWqXpdDqrVSoih7WQhoaG/l6UKq1UKslqtapVukdEjkdR9Ggcx1XP8waNMc+S/IJk36IB9UoqlUobnHPbSH4bx/EBPcqKxeLt1toBAHr8ven7/tR/2SGiKLp/ZGTkuCa7UqnYkydPqpwIVUK0z9JET0/PivZ/U2pXLBbXWGv18N4E4JkwDF9f8PDev3//bSLyXvvWfiAMwx8v9bZYu3Ytq9Vqt4i8QlKvp92pVCro7+9XJXD+26JYLN5gjDkkIusAvAHga4Xrdb8Q2DmnkkNlyNUAMiRXkdxhjHnb9/3ogsByubwiiqIdIrJNZYKIRCqqLiAt5vugdratVY8AGPZ9/+f5Rud4HgRBGsAWknepOBIR3eGs+L3QTp1zqnl0l98DONDV1XXsfBp1wVBdav4ux+4fP/MiSls/7PIAAAAASUVORK5CYII="

/***/ }),
/* 129 */
/*!***************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/hot.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABMlJREFUWEfF132o3nUZx/HX9TvzeO777OxoS5YtgugBocgkwj8yiCmamZSIJYUPtbI1soflaqQdl4VkQmsisQZGuX/MMGFSCEIpSEVByyLwDwNTy7ONzua287jdvyu+90Md5zm773WovnDDff/u7+93vb/Xw+e6fuH/vGKl9qd5bcVNNb9r8liwcDrPXDHAUc6puItYH3J7g98EOSjEigEmGR1nSy2+EPLnFdtH+Mv/DCBpzPIZYgJ1yB0j7AyODAKxYg8cYPUYW4hbkrHgWXJikp+8gbl+ECsGOMRZI9yZ4uMY6XjBn0NuOZNfBPWpIFYMMMP6ELuT96HqGjtOPhx8ucFf/2sAydA8l6XYkbzlJEMHyW812BXMLAcxkAdKbGcZb7A/ON572GHOHuZW4tNYfZKRTJ5aJW8Y5k/LlWZfgGTdLNeW2M6z52wOF0NJNc/FtbgXb8YrnhXM1XJPzW1jHFjKC6cESNbOsLkS16Xc3eB7xZ3F+AwXVNyR4lKsOkWcJ8kvNnhosfd6+5cFOMjYKBuJrRglv9ZgNxamOb9iIsT7kzP7lFqLfKRi6wjPnLx3SYBucm1oibuDt2ufOu85zt0N1rXYTnywW3b9Sr38/0Itbx3lwRKWxTcsCTDD64KvprgRjRJ/PFXLe4Z4T4qPdLwy8JpLuSf4RpPn+wLMcVlL7AjO6yVXMJ+8GJyTp2e8m7P2kZ9v8mRfgGnuDXHDEqU18JFP3phMhbyrybf7AsyKPyZv624srbV8eipXwlG+98JXYjqEM7qhOrFof68t9/57sinf2xdgWhwori7Jh992PdFOxpILOqF5VfKHkL9K1oS4GGvIXwaTGKuZjva1+ED5jf1N+Zq+ALPiSFE/PBfyE8lbia93ciBvT7GRInQmao4NU7Xa1RKbUv54FY8PMzVPs+YdOmJ1bnC0Idf0BZgWL3XIvdCS11esDrEtOFzL3aH6cKW+v+6c7paQ/8h2R7QhxEdDPlvUDzeGuALrS4jKjNCQ44MATAbrtF2Zm1s8HbyrYi6Zr1RXp3oXNhEfw+GUExWzKb5ZTtqSRUE/h+L+Xv4cbQ7igRmxD+fj75XcWLcbTWwjX8T9qbqyUt8XXNESNxXPhLytZpy4veLgiQ7AzcFV3SQtBz/WlCW0/1rLCdF3iE+WkxUAvLEWdwb7y0m1hSifKINHzTU4VPPoEJ8irkmeqeTNyWbiQ4t6xWRTntsXYJrLQ+zEqyv5g5p1Ia7KdifMn6bYEDTJh6rOADpccyFxOc7C38gHiFJyFxQPFAlOsbepLira1wM9Kb4eJ4Kqq351dkqr2Uuq5KWui9f6d2MqM8N0V8aHi7Xg6VpuHeVnfQFKMzrGu4fEHbhoUQz/UyXcH3LnAt8fZ6ovQFe8h2e4NMRXgguzo3SnvbI9ReUPg12N9sT88tVvIDljlndiG3HJEh2wvIZNJSPRroCXTUUldM+l/G7Ng6MUdX3FG9MgI1m1wHmtznByZfD67hAyT+5NfhTtkSw+W6ql9IPkSCV/ndzX4NHo5MOSqy9A764jrB3iouDq7GR3EalNTfZNMdboAH4Jz4d85AR7V3cErDSnZdfAAN28WLXAm1pckuQce9Z2X8HmOtdLif2+2XlBPTRIwvwTxi+qMKF9HLoAAAAASUVORK5CYII="

/***/ }),
/* 130 */
/*!**************************************!*\
  !*** D:/抖音秒火食品/tt/static/img/sx.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAABPtJREFUSEu9lmtsU2UYx//P252264ZsOmjGMCBEA5GghpBIIBFDTDRq8BLQqODKtvN2panShBASJSeRhMjGBoOt7bqFJZqgVfxixOAlRI1x+sEPKor6ATcwTAlj2ZFd2nPex7xbt4xxK5fwfDzv5fc+l/M8f8JtNiqUZ1lWUWVl5TIAzzDzEiGEUkr9wcw/OY7zW0lJSU9vb+85y7LU1e68IrClpcU3Y8YMCoVCowA4lUoFANQDiAIoA6DPugByzPwfMx8jokw2m/0+FosNXgl6CVCDfD7fXGZeLYQ4bRjGV6FQaMSyLFFVVbVEKfU0M3uJSJ+tBHA/gLsBzAQwoJR6x+fzJTdt2nTqctAxoL5s3rx5Xtu2K/x+/xPMXA1grhBij23b6Xg8Pqz3MTM1NjYGgsEgbNvWTMN13WKv17sAwDoAzwO4A8AxANuklCemQ8eA7e3ty5l5FYDHmXkZEZUz83khRKSsrOzw+vXrdeiuas3NzWWBQGAlM28jouVEdNRxnHgkEjmp3zpxeAyYTCa3E9HLAO4DYOS96RNCVJumefRasIn1TCbjGRgYWKSU2kdEK5i5q6io6M3a2tr+i4CJRGK2EOIRAPvyedHh6wPwQjgc/rpQ4MS+tra2pR6P56C+i5m39PX1HbYsy9HrkzmcP3/+quHh4Xd1uQPIAlCu61ZHIpHu6wXqmqisrHwx78AJIcTGuro6HdpxYCKRqDIMo8V1XR2GLQD0ppUAvjBN88+pOSgU3tnZOSeXy71PRAsBvCal/GASeODAgTWGYRxUSp1XSj21efPmU01NTcUlJSWOlDJXKGTqvlQqZSilNgghdhLR56ZpvjoJTKfTryultiuljvj9/i2hUGjgRiDTzySTyXt1tQLwSynnTAXuVkptBLAfQLOUcuhWAHWqhBCfAFgkpfRPApPJZIKI1hLRzpGRkc5YLKbb2U1bOp0OMvN7zPywlLJ4KrCViJ4F8NaZM2c6LcvSVXrTlgceYuYV04E7iCgMIDU4ONi4devWCzdN0/nZv3+O1+s9AmCxlNI36WEqlVpHRPuY+btcLmdGo9FztwI4pWhmSylLpxbNYqVUhpn1K54Mh8P637sRo4aGhkBFRYVh2/aw1+t9iYgaiOiEaZq6V4//+KlUaqZuukKIWmbeNTo62nYjhWNZltcwjMeCweBqZv7Rdd0QET1ERI2mab49CdTgZDK5lIg+IqLRbDa7LhqNHr9eFzOZjHdwcPAVx3F2CiGK9IxUSv2SzWY3xGKxX6cCx7zUoxGAycw6vG/U19f/fT1QPbxLS0urc7ncLmYuH5/ROO667p5IJKKb+XhI80YdHR0LHcfpIqIHAKSFEE11dXWnC4Xm26Gu9h15GaKP6ibyl5RSK4OLgGMTPZ1O6waeAHAPgI+ZudkwjN9ramrsa4FbW1tLPR6PHsDx/Fw9y8yfMfOn9fX1mUuA+kNeu6xRSulXPgjgH2b+EMAR13VPFhcXjwwNDSmfz1fk8XhUd3f3QHt7+1iD7+jouFMptZuZtUz5BsAhIvq2vLz8/IRquKxq05O7v79/ARHFADwHQCu2IWbWk7uXiC4Q0V1ENGDbthWPx3/WQO2hrlKt5nK53A+zZs06O12eXFWX7t27NxgIBB4FsJaZ1+QFkh7QWqMIIvoXQI1pml+Oayymrq4uX09PT/ZK+rRgIXyt/BW6ftuB/wN1r0Y7M3wOrwAAAABJRU5ErkJggg=="

/***/ }),
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */
/*!********************************!*\
  !*** D:/抖音秒火食品/tt/api/ajax.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _configNew = _interopRequireDefault(__webpack_require__(/*! ./configNew.js */ 198));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = function _default(url, method, data) {
  tt.showLoading({
    title: '加载中',
    mask: true
  });
  return new Promise(function (resolve, reject) {
    uni.request({
      headers: {
        'Content-type': 'application/json'
      },
      url: _configNew.default.hostUrl + url,
      data: _objectSpread({}, data),
      method: method,
      success: function success(res) {
        resolve(res.data);
      },
      fail: function fail(res) {},
      complete: function complete() {
        tt.hideLoading();
      }
    });
  });
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),
/* 198 */
/*!*************************************!*\
  !*** D:/抖音秒火食品/tt/api/configNew.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  hostUrl: "https://api.spdl.com"
  // https://tiktok.spdl.com
  // https://localhost:44310 	
};
exports.default = _default;

/***/ }),
/* 199 */
/*!***********************************!*\
  !*** D:/抖音秒火食品/tt/static/city.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var provinceList = [{
  name: '北京',
  cityList: [{
    name: '市辖区',
    areaList: ['东城区', '西城区', '崇文区', '宣武区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区']
  }, {
    name: '县',
    areaList: ['密云县', '延庆县']
  }]
}, {
  name: '上海',
  cityList: [{
    name: '市辖区',
    areaList: ['黄浦区', '卢湾区', '徐汇区', '长宁区', '静安区', '普陀区', '闸北区', '虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区', '松江区', '青浦区', '南汇区', '奉贤区']
  }, {
    name: '县',
    areaList: ['崇明县']
  }]
}, {
  name: '天津',
  cityList: [{
    name: '市辖区',
    areaList: ['和平区', '河东区', '河西区', '南开区', '河北区', '红桥区', '塘沽区', '汉沽区', '大港区', '东丽区', '西青区', '津南区', '北辰区', '武清区', '宝坻区']
  }, {
    name: '县',
    areaList: ['宁河县', '静海县', '蓟　县']
  }]
}, {
  name: '重庆',
  cityList: [{
    name: '市辖区',
    areaList: ['万州区', '涪陵区', '渝中区', '大渡口区', '江北区', '沙坪坝区', '九龙坡区', '南岸区', '北碚区', '万盛区', '双桥区', '渝北区', '巴南区', '黔江区', '长寿区']
  }, {
    name: '县',
    areaList: ['綦江县', '潼南县', '铜梁县', '大足县', '荣昌县', '璧山县', '梁平县', '城口县', '丰都县', '垫江县', '武隆县', '忠　县', '开　县', '云阳县', '奉节县', '巫山县', '巫溪县', '石柱土家族自治县', '秀山土家族苗族自治县', '酉阳土家族苗族自治县', '彭水苗族土家族自治县']
  }, {
    name: '市',
    areaList: ['江津市', '合川市', '永川市', '南川市']
  }]
}, {
  name: '四川',
  cityList: [{
    name: '成都市',
    areaList: ['市辖区', '锦江区', '青羊区', '金牛区', '武侯区', '成华区', '龙泉驿区', '青白江区', '新都区', '温江县', '金堂县', '双流县', '郫　县', '大邑县', '蒲江县', '新津县', '都江堰市', '彭州市', '邛崃市', '崇州市']
  }, {
    name: '自贡市',
    areaList: ['市辖区', '自流井区', '贡井区', '大安区', '沿滩区', '荣　县', '富顺县']
  }, {
    name: '攀枝花市',
    areaList: ['市辖区', '东　区', '西　区', '仁和区', '米易县', '盐边县']
  }, {
    name: '泸州市',
    areaList: ['市辖区', '江阳区', '纳溪区', '龙马潭区', '泸　县', '合江县', '叙永县', '古蔺县']
  }, {
    name: '德阳市',
    areaList: ['市辖区', '旌阳区', '中江县', '罗江县', '广汉市', '什邡市', '绵竹市']
  }, {
    name: '绵阳市',
    areaList: ['市辖区', '涪城区', '游仙区', '三台县', '盐亭县', '安　县', '梓潼县', '北川羌族自治县', '平武县', '江油市']
  }, {
    name: '广元市',
    areaList: ['市辖区', '市中区', '元坝区', '朝天区', '旺苍县', '青川县', '剑阁县', '苍溪县']
  }, {
    name: '遂宁市',
    areaList: ['市辖区', '船山区', '安居区', '蓬溪县', '射洪县', '大英县']
  }, {
    name: '内江市',
    areaList: ['市辖区', '市中区', '东兴区', '威远县', '资中县', '隆昌县']
  }, {
    name: '乐山市',
    areaList: ['市辖区', '市中区', '沙湾区', '五通桥区', '金口河区', '犍为县', '井研县', '夹江县', '沐川县', '峨边彝族自治县', '马边彝族自治县', '峨眉山市']
  }, {
    name: '南充市',
    areaList: ['市辖区', '顺庆区', '高坪区', '嘉陵区', '南部县', '营山县', '蓬安县', '仪陇县', '西充县', '阆中市']
  }, {
    name: '眉山市',
    areaList: ['市辖区', '东坡区', '仁寿县', '彭山县', '洪雅县', '丹棱县', '青神县']
  }, {
    name: '宜宾市',
    areaList: ['市辖区', '翠屏区', '宜宾县', '南溪县', '江安县', '长宁县', '高　县', '珙　县', '筠连县', '兴文县', '屏山县']
  }, {
    name: '广安市',
    areaList: ['市辖区', '广安区', '岳池县', '武胜县', '邻水县', '华莹市']
  }, {
    name: '达州市',
    areaList: ['市辖区', '通川区', '达　县', '宣汉县', '开江县', '大竹县', '渠　县', '万源市']
  }, {
    name: '雅安市',
    areaList: ['市辖区', '雨城区', '名山县', '荥经县', '汉源县', '石棉县', '天全县', '芦山县', '宝兴县']
  }, {
    name: '巴中市',
    areaList: ['市辖区', '巴州区', '通江县', '南江县', '平昌县']
  }, {
    name: '资阳市',
    areaList: ['市辖区', '雁江区', '安岳县', '乐至县', '简阳市']
  }, {
    name: '阿坝藏族羌族自治州',
    areaList: ['汶川县', '理　县', '茂　县', '松潘县', '九寨沟县', '金川县', '小金县', '黑水县', '马尔康县', '壤塘县', '阿坝县', '若尔盖县', '红原县']
  }, {
    name: '甘孜藏族自治州',
    areaList: ['康定县', '泸定县', '丹巴县', '九龙县', '雅江县', '道孚县', '炉霍县', '甘孜县', '新龙县', '德格县', '白玉县', '石渠县', '色达县', '理塘县', '巴塘县', '乡城县', '稻城县', '得荣县']
  }, {
    name: '凉山彝族自治州',
    areaList: ['西昌市', '木里藏族自治县', '盐源县', '德昌县', '会理县', '会东县', '宁南县', '普格县', '布拖县', '金阳县', '昭觉县', '喜德县', '冕宁县', '越西县', '甘洛县', '美姑县', '雷波县']
  }]
}, {
  name: '贵州',
  cityList: [{
    name: '贵阳市',
    areaList: ['市辖区', '南明区', '云岩区', '花溪区', '乌当区', '白云区', '小河区', '开阳县', '息烽县', '修文县', '清镇市']
  }, {
    name: '六盘水市',
    areaList: ['钟山区', '六枝特区', '水城县', '盘　县']
  }, {
    name: '遵义市',
    areaList: ['市辖区', '红花岗区', '汇川区', '遵义县', '桐梓县', '绥阳县', '正安县', '道真仡佬族苗族自治县', '务川仡佬族苗族自治县', '凤冈县', '湄潭县', '余庆县', '习水县', '赤水市', '仁怀市']
  }, {
    name: '安顺市',
    areaList: ['市辖区', '西秀区', '平坝县', '普定县', '镇宁布依族苗族自治县', '关岭布依族苗族自治县', '紫云苗族布依族自治县']
  }, {
    name: '铜仁地区',
    areaList: ['铜仁市', '江口县', '玉屏侗族自治县', '石阡县', '思南县', '印江土家族苗族自治县', '德江县', '沿河土家族自治县', '松桃苗族自治县', '万山特区']
  }, {
    name: '黔西南布依族苗族自治州',
    areaList: ['兴义市', '兴仁县', '普安县', '晴隆县', '贞丰县', '望谟县', '册亨县', '安龙县']
  }, {
    name: '毕节地区',
    areaList: ['毕节市', '大方县', '黔西县', '金沙县', '织金县', '纳雍县', '威宁彝族回族苗族自治县', '赫章县']
  }, {
    name: '黔东南苗族侗族自治州',
    areaList: ['凯里市', '黄平县', '施秉县', '三穗县', '镇远县', '岑巩县', '天柱县', '锦屏县', '剑河县', '台江县', '黎平县', '榕江县', '从江县', '雷山县', '麻江县', '丹寨县']
  }, {
    name: '黔南布依族苗族自治州',
    areaList: ['都匀市', '福泉市', '荔波县', '贵定县', '瓮安县', '独山县', '平塘县', '罗甸县', '长顺县', '龙里县', '惠水县', '三都水族自治县']
  }]
}, {
  name: '云南',
  cityList: [{
    name: '昆明市',
    areaList: ['市辖区', '五华区', '盘龙区', '官渡区', '西山区', '东川区', '呈贡县', '晋宁县', '富民县', '宜良县', '石林彝族自治县', '嵩明县', '禄劝彝族苗族自治县', '寻甸回族彝族自治县', '安宁市']
  }, {
    name: '曲靖市',
    areaList: ['市辖区', '麒麟区', '马龙县', '陆良县', '师宗县', '罗平县', '富源县', '会泽县', '沾益县', '宣威市']
  }, {
    name: '玉溪市',
    areaList: ['市辖区', '红塔区', '江川县', '澄江县', '通海县', '华宁县', '易门县', '峨山彝族自治县', '新平彝族傣族自治县', '元江哈尼族彝族傣族自治县']
  }, {
    name: '保山市',
    areaList: ['市辖区', '隆阳区', '施甸县', '腾冲县', '龙陵县', '昌宁县']
  }, {
    name: '昭通市',
    areaList: ['市辖区', '昭阳区', '鲁甸县', '巧家县', '盐津县', '大关县', '永善县', '绥江县', '镇雄县', '彝良县', '威信县', '水富县']
  }, {
    name: '丽江市',
    areaList: ['市辖区', '古城区', '玉龙纳西族自治县', '永胜县', '华坪县', '宁蒗彝族自治县']
  }, {
    name: '思茅市',
    areaList: ['市辖区', '翠云区', '普洱哈尼族彝族自治县', '墨江哈尼族自治县', '景东彝族自治县', '景谷傣族彝族自治县', '镇沅彝族哈尼族拉祜族自治县', '江城哈尼族彝族自治县', '孟连傣族拉祜族佤族自治县', '澜沧拉祜族自治县', '西盟佤族自治县']
  }, {
    name: '临沧市',
    areaList: ['市辖区', '临翔区', '凤庆县', '云　县', '永德县', '镇康县', '双江拉祜族佤族布朗族傣族自治县', '耿马傣族佤族自治县', '沧源佤族自治县']
  }, {
    name: '楚雄彝族自治州',
    areaList: ['楚雄市', '双柏县', '牟定县', '南华县', '姚安县', '大姚县', '永仁县', '元谋县', '武定县', '禄丰县']
  }, {
    name: '红河哈尼族彝族自治州',
    areaList: ['个旧市', '开远市', '蒙自县', '屏边苗族自治县', '建水县', '石屏县', '弥勒县', '泸西县', '元阳县', '红河县', '金平苗族瑶族傣族自治县', '绿春县', '河口瑶族自治县']
  }, {
    name: '文山壮族苗族自治州',
    areaList: ['文山县', '砚山县', '西畴县', '麻栗坡县', '马关县', '丘北县', '广南县', '富宁县']
  }, {
    name: '西双版纳傣族自治州',
    areaList: ['景洪市', '勐海县', '勐腊县']
  }, {
    name: '大理白族自治州',
    areaList: ['大理市', '漾濞彝族自治县', '祥云县', '宾川县', '弥渡县', '南涧彝族自治县', '巍山彝族回族自治县', '永平县', '云龙县', '洱源县', '剑川县', '鹤庆县']
  }, {
    name: '德宏傣族景颇族自治州',
    areaList: ['瑞丽市', '潞西市', '梁河县', '盈江县', '陇川县']
  }, {
    name: '怒江傈僳族自治州',
    areaList: ['泸水县', '福贡县', '贡山独龙族怒族自治县', '兰坪白族普米族自治县']
  }, {
    name: '迪庆藏族自治州',
    areaList: ['香格里拉县', '德钦县', '维西傈僳族自治县']
  }]
}, {
  name: '西藏',
  cityList: [{
    name: '拉萨市',
    areaList: ['市辖区', '城关区', '林周县', '当雄县', '尼木县', '曲水县', '堆龙德庆县', '达孜县', '墨竹工卡县']
  }, {
    name: '昌都地区',
    areaList: ['昌都县', '江达县', '贡觉县', '类乌齐县', '丁青县', '察雅县', '八宿县', '左贡县', '芒康县', '洛隆县', '边坝县']
  }, {
    name: '山南地区',
    areaList: ['乃东县', '扎囊县', '贡嘎县', '桑日县', '琼结县', '曲松县', '措美县', '洛扎县', '加查县', '隆子县', '错那县', '浪卡子县']
  }, {
    name: '日喀则地区',
    areaList: ['日喀则市', '南木林县', '江孜县', '定日县', '萨迦县', '拉孜县', '昂仁县', '谢通门县', '白朗县', '仁布县', '康马县', '定结县', '仲巴县', '亚东县', '吉隆县', '聂拉木县', '萨嘎县', '岗巴县']
  }, {
    name: '那曲地区',
    areaList: ['那曲县', '嘉黎县', '比如县', '聂荣县', '安多县', '申扎县', '索　县', '班戈县', '巴青县', '尼玛县']
  }, {
    name: '阿里地区',
    areaList: ['普兰县', '札达县', '噶尔县', '日土县', '革吉县', '改则县', '措勤县']
  }, {
    name: '林芝地区',
    areaList: ['林芝县', '工布江达县', '米林县', '墨脱县', '波密县', '察隅县', '朗　县']
  }]
}, {
  name: '河南',
  cityList: [{
    name: '郑州市',
    areaList: ['市辖区', '中原区', '二七区', '管城回族区', '金水区', '上街区', '邙山区', '中牟县', '巩义市', '荥阳市', '新密市', '新郑市', '登封市']
  }, {
    name: '开封市',
    areaList: ['市辖区', '龙亭区', '顺河回族区', '鼓楼区', '南关区', '郊　区', '杞　县', '通许县', '尉氏县', '开封县', '兰考县']
  }, {
    name: '洛阳市',
    areaList: ['市辖区', '老城区', '西工区', '廛河回族区', '涧西区', '吉利区', '洛龙区', '孟津县', '新安县', '栾川县', '嵩　县', '汝阳县', '宜阳县', '洛宁县', '伊川县', '偃师市']
  }, {
    name: '平顶山市',
    areaList: ['市辖区', '新华区', '卫东区', '石龙区', '湛河区', '宝丰县', '叶　县', '鲁山县', '郏　县', '舞钢市', '汝州市']
  }, {
    name: '安阳市',
    areaList: ['市辖区', '文峰区', '北关区', '殷都区', '龙安区', '安阳县', '汤阴县', '滑　县', '内黄县', '林州市']
  }, {
    name: '鹤壁市',
    areaList: ['市辖区', '鹤山区', '山城区', '淇滨区', '浚　县', '淇　县']
  }, {
    name: '新乡市',
    areaList: ['市辖区', '红旗区', '卫滨区', '凤泉区', '牧野区', '新乡县', '获嘉县', '原阳县', '延津县', '封丘县', '长垣县', '卫辉市', '辉县市']
  }, {
    name: '焦作市',
    areaList: ['市辖区', '解放区', '中站区', '马村区', '山阳区', '修武县', '博爱县', '武陟县', '温　县', '济源市', '沁阳市', '孟州市']
  }, {
    name: '濮阳市',
    areaList: ['市辖区', '华龙区', '清丰县', '南乐县', '范　县', '台前县', '濮阳县']
  }, {
    name: '许昌市',
    areaList: ['市辖区', '魏都区', '许昌县', '鄢陵县', '襄城县', '禹州市', '长葛市']
  }, {
    name: '漯河市',
    areaList: ['市辖区', '源汇区', '郾城区', '召陵区', '舞阳县', '临颍县']
  }, {
    name: '三门峡市',
    areaList: ['市辖区', '湖滨区', '渑池县', '陕　县', '卢氏县', '义马市', '灵宝市']
  }, {
    name: '南阳市',
    areaList: ['市辖区', '宛城区', '卧龙区', '南召县', '方城县', '西峡县', '镇平县', '内乡县', '淅川县', '社旗县', '唐河县', '新野县', '桐柏县', '邓州市']
  }, {
    name: '商丘市',
    areaList: ['市辖区', '梁园区', '睢阳区', '民权县', '睢　县', '宁陵县', '柘城县', '虞城县', '夏邑县', '永城市']
  }, {
    name: '信阳市',
    areaList: ['市辖区', '师河区', '平桥区', '罗山县', '光山县', '新　县', '商城县', '固始县', '潢川县', '淮滨县', '息　县']
  }, {
    name: '周口市',
    areaList: ['市辖区', '川汇区', '扶沟县', '西华县', '商水县', '沈丘县', '郸城县', '淮阳县', '太康县', '鹿邑县', '项城市']
  }, {
    name: '驻马店市',
    areaList: ['市辖区', '驿城区', '西平县', '上蔡县', '平舆县', '正阳县', '确山县', '泌阳县', '汝南县', '遂平县', '新蔡县']
  }]
}, {
  name: '湖北',
  cityList: [{
    name: '武汉市',
    areaList: ['市辖区', '江岸区', '江汉区', '乔口区', '汉阳区', '武昌区', '青山区', '洪山区', '东西湖区', '汉南区', '蔡甸区', '江夏区', '黄陂区', '新洲区']
  }, {
    name: '黄石市',
    areaList: ['市辖区', '黄石港区', '西塞山区', '下陆区', '铁山区', '阳新县', '大冶市']
  }, {
    name: '十堰市',
    areaList: ['市辖区', '茅箭区', '张湾区', '郧　县', '郧西县', '竹山县', '竹溪县', '房　县', '丹江口市']
  }, {
    name: '宜昌市',
    areaList: ['市辖区', '西陵区', '伍家岗区', '点军区', '猇亭区', '夷陵区', '远安县', '兴山县', '秭归县', '长阳土家族自治县', '五峰土家族自治县', '宜都市', '当阳市', '枝江市']
  }, {
    name: '襄樊市',
    areaList: ['市辖区', '襄城区', '樊城区', '襄阳区', '南漳县', '谷城县', '保康县', '老河口市', '枣阳市', '宜城市']
  }, {
    name: '鄂州市',
    areaList: ['市辖区', '梁子湖区', '华容区', '鄂城区']
  }, {
    name: '荆门市',
    areaList: ['市辖区', '东宝区', '掇刀区', '京山县', '沙洋县', '钟祥市']
  }, {
    name: '孝感市',
    areaList: ['市辖区', '孝南区', '孝昌县', '大悟县', '云梦县', '应城市', '安陆市', '汉川市']
  }, {
    name: '荆州市',
    areaList: ['市辖区', '沙市区', '荆州区', '公安县', '监利县', '江陵县', '石首市', '洪湖市', '松滋市']
  }, {
    name: '黄冈市',
    areaList: ['市辖区', '黄州区', '团风县', '红安县', '罗田县', '英山县', '浠水县', '蕲春县', '黄梅县', '麻城市', '武穴市']
  }, {
    name: '咸宁市',
    areaList: ['市辖区', '咸安区', '嘉鱼县', '通城县', '崇阳县', '通山县', '赤壁市']
  }, {
    name: '随州市',
    areaList: ['市辖区', '曾都区', '广水市']
  }, {
    name: '恩施土家族苗族自治州',
    areaList: ['恩施市', '利川市', '建始县', '巴东县', '宣恩县', '咸丰县', '来凤县', '鹤峰县']
  }, {
    name: '省直辖行政单位',
    areaList: ['仙桃市', '潜江市', '天门市', '神农架林区']
  }]
}, {
  name: '湖南',
  cityList: [{
    name: '长沙市',
    areaList: ['市辖区', '芙蓉区', '天心区', '岳麓区', '开福区', '雨花区', '长沙县', '望城县', '宁乡县', '浏阳市']
  }, {
    name: '株洲市',
    areaList: ['市辖区', '荷塘区', '芦淞区', '石峰区', '天元区', '株洲县', '攸　县', '茶陵县', '炎陵县', '醴陵市']
  }, {
    name: '湘潭市',
    areaList: ['市辖区', '雨湖区', '岳塘区', '湘潭县', '湘乡市', '韶山市']
  }, {
    name: '衡阳市',
    areaList: ['市辖区', '珠晖区', '雁峰区', '石鼓区', '蒸湘区', '南岳区', '衡阳县', '衡南县', '衡山县', '衡东县', '祁东县', '耒阳市', '常宁市']
  }, {
    name: '邵阳市',
    areaList: ['市辖区', '双清区', '大祥区', '北塔区', '邵东县', '新邵县', '邵阳县', '隆回县', '洞口县', '绥宁县', '新宁县', '城步苗族自治县', '武冈市']
  }, {
    name: '岳阳市',
    areaList: ['市辖区', '岳阳楼区', '云溪区', '君山区', '岳阳县', '华容县', '湘阴县', '平江县', '汨罗市', '临湘市']
  }, {
    name: '常德市',
    areaList: ['市辖区', '武陵区', '鼎城区', '安乡县', '汉寿县', '澧　县', '临澧县', '桃源县', '石门县', '津市市']
  }, {
    name: '张家界市',
    areaList: ['市辖区', '永定区', '武陵源区', '慈利县', '桑植县']
  }, {
    name: '益阳市',
    areaList: ['市辖区', '资阳区', '赫山区', '南　县', '桃江县', '安化县', '沅江市']
  }, {
    name: '郴州市',
    areaList: ['市辖区', '北湖区', '苏仙区', '桂阳县', '宜章县', '永兴县', '嘉禾县', '临武县', '汝城县', '桂东县', '安仁县', '资兴市']
  }, {
    name: '永州市',
    areaList: ['市辖区', '芝山区', '冷水滩区', '祁阳县', '东安县', '双牌县', '道　县', '江永县', '宁远县', '蓝山县', '新田县', '江华瑶族自治县']
  }, {
    name: '怀化市',
    areaList: ['市辖区', '鹤城区', '中方县', '沅陵县', '辰溪县', '溆浦县', '会同县', '麻阳苗族自治县', '新晃侗族自治县', '芷江侗族自治县', '靖州苗族侗族自治县', '通道侗族自治县', '洪江市']
  }, {
    name: '娄底市',
    areaList: ['市辖区', '娄星区', '双峰县', '新化县', '冷水江市', '涟源市']
  }, {
    name: '湘西土家族苗族自治州',
    areaList: ['吉首市', '泸溪县', '凤凰县', '花垣县', '保靖县', '古丈县', '永顺县', '龙山县']
  }]
}, {
  name: '广东',
  cityList: [{
    name: '广州市',
    areaList: ['市辖区', '东山区', '荔湾区', '越秀区', '海珠区', '天河区', '芳村区', '白云区', '黄埔区', '番禺区', '花都区', '增城市', '从化市']
  }, {
    name: '韶关市',
    areaList: ['市辖区', '武江区', '浈江区', '曲江区', '始兴县', '仁化县', '翁源县', '乳源瑶族自治县', '新丰县', '乐昌市', '南雄市']
  }, {
    name: '深圳市',
    areaList: ['市辖区', '罗湖区', '福田区', '南山区', '宝安区', '龙岗区', '盐田区']
  }, {
    name: '珠海市',
    areaList: ['市辖区', '香洲区', '斗门区', '金湾区']
  }, {
    name: '汕头市',
    areaList: ['市辖区', '龙湖区', '金平区', '濠江区', '潮阳区', '潮南区', '澄海区', '南澳县']
  }, {
    name: '佛山市',
    areaList: ['市辖区', '禅城区', '南海区', '顺德区', '三水区', '高明区']
  }, {
    name: '江门市',
    areaList: ['市辖区', '蓬江区', '江海区', '新会区', '台山市', '开平市', '鹤山市', '恩平市']
  }, {
    name: '湛江市',
    areaList: ['市辖区', '赤坎区', '霞山区', '坡头区', '麻章区', '遂溪县', '徐闻县', '廉江市', '雷州市', '吴川市']
  }, {
    name: '茂名市',
    areaList: ['市辖区', '茂南区', '茂港区', '电白县', '高州市', '化州市', '信宜市']
  }, {
    name: '肇庆市',
    areaList: ['市辖区', '端州区', '鼎湖区', '广宁县', '怀集县', '封开县', '德庆县', '高要市', '四会市']
  }, {
    name: '惠州市',
    areaList: ['市辖区', '惠城区', '惠阳区', '博罗县', '惠东县', '龙门县']
  }, {
    name: '梅州市',
    areaList: ['市辖区', '梅江区', '梅　县', '大埔县', '丰顺县', '五华县', '平远县', '蕉岭县', '兴宁市']
  }, {
    name: '汕尾市',
    areaList: ['市辖区', '城　区', '海丰县', '陆河县', '陆丰市']
  }, {
    name: '河源市',
    areaList: ['市辖区', '源城区', '紫金县', '龙川县', '连平县', '和平县', '东源县']
  }, {
    name: '阳江市',
    areaList: ['市辖区', '江城区', '阳西县', '阳东县', '阳春市']
  }, {
    name: '清远市',
    areaList: ['市辖区', '清城区', '佛冈县', '阳山县', '连山壮族瑶族自治县', '连南瑶族自治县', '清新县', '英德市', '连州市']
  }, {
    name: '东莞市',
    areaList: ['东莞市']
  }, {
    name: '中山市',
    areaList: ['中山市']
  }, {
    name: '潮州市',
    areaList: ['市辖区', '湘桥区', '潮安县', '饶平县']
  }, {
    name: '揭阳市',
    areaList: ['市辖区', '榕城区', '揭东县', '揭西县', '惠来县', '普宁市']
  }, {
    name: '云浮市',
    areaList: ['市辖区', '云城区', '新兴县', '郁南县', '云安县', '罗定市']
  }]
}, {
  name: '广西',
  cityList: [{
    name: '南宁市',
    areaList: ['市辖区', '兴宁区', '青秀区', '江南区', '西乡塘区', '良庆区', '邕宁区', '武鸣县', '隆安县', '马山县', '上林县', '宾阳县', '横　县']
  }, {
    name: '柳州市',
    areaList: ['市辖区', '城中区', '鱼峰区', '柳南区', '柳北区', '柳江县', '柳城县', '鹿寨县', '融安县', '融水苗族自治县', '三江侗族自治县']
  }, {
    name: '桂林市',
    areaList: ['市辖区', '秀峰区', '叠彩区', '象山区', '七星区', '雁山区', '阳朔县', '临桂县', '灵川县', '全州县', '兴安县', '永福县', '灌阳县', '龙胜各族自治县', '资源县', '平乐县', '荔蒲县', '恭城瑶族自治县']
  }, {
    name: '梧州市',
    areaList: ['市辖区', '万秀区', '蝶山区', '长洲区', '苍梧县', '藤　县', '蒙山县', '岑溪市']
  }, {
    name: '北海市',
    areaList: ['市辖区', '海城区', '银海区', '铁山港区', '合浦县']
  }, {
    name: '防城港市',
    areaList: ['市辖区', '港口区', '防城区', '上思县', '东兴市']
  }, {
    name: '钦州市',
    areaList: ['市辖区', '钦南区', '钦北区', '灵山县', '浦北县']
  }, {
    name: '贵港市',
    areaList: ['市辖区', '港北区', '港南区', '覃塘区', '平南县', '桂平市']
  }, {
    name: '玉林市',
    areaList: ['市辖区', '玉州区', '容　县', '陆川县', '博白县', '兴业县', '北流市']
  }, {
    name: '百色市',
    areaList: ['市辖区', '右江区', '田阳县', '田东县', '平果县', '德保县', '靖西县', '那坡县', '凌云县', '乐业县', '田林县', '西林县', '隆林各族自治县']
  }, {
    name: '贺州市',
    areaList: ['市辖区', '八步区', '昭平县', '钟山县', '富川瑶族自治县']
  }, {
    name: '河池市',
    areaList: ['市辖区', '金城江区', '南丹县', '天峨县', '凤山县', '东兰县', '罗城仫佬族自治县', '环江毛南族自治县', '巴马瑶族自治县', '都安瑶族自治县', '大化瑶族自治县', '宜州市']
  }, {
    name: '来宾市',
    areaList: ['市辖区', '兴宾区', '忻城县', '象州县', '武宣县', '金秀瑶族自治县', '合山市']
  }, {
    name: '崇左市',
    areaList: ['市辖区', '江洲区', '扶绥县', '宁明县', '龙州县', '大新县', '天等县', '凭祥市']
  }]
}, {
  name: '陕西',
  cityList: [{
    name: '西安市',
    areaList: ['市辖区', '新城区', '碑林区', '莲湖区', '灞桥区', '未央区', '雁塔区', '阎良区', '临潼区', '长安区', '蓝田县', '周至县', '户　县', '高陵县']
  }, {
    name: '铜川市',
    areaList: ['市辖区', '王益区', '印台区', '耀州区', '宜君县']
  }, {
    name: '宝鸡市',
    areaList: ['市辖区', '渭滨区', '金台区', '陈仓区', '凤翔县', '岐山县', '扶风县', '眉　县', '陇　县', '千阳县', '麟游县', '凤　县', '太白县']
  }, {
    name: '咸阳市',
    areaList: ['市辖区', '秦都区', '杨凌区', '渭城区', '三原县', '泾阳县', '乾　县', '礼泉县', '永寿县', '彬　县', '长武县', '旬邑县', '淳化县', '武功县', '兴平市']
  }, {
    name: '渭南市',
    areaList: ['市辖区', '临渭区', '华　县', '潼关县', '大荔县', '合阳县', '澄城县', '蒲城县', '白水县', '富平县', '韩城市', '华阴市']
  }, {
    name: '延安市',
    areaList: ['市辖区', '宝塔区', '延长县', '延川县', '子长县', '安塞县', '志丹县', '吴旗县', '甘泉县', '富　县', '洛川县', '宜川县', '黄龙县', '黄陵县']
  }, {
    name: '汉中市',
    areaList: ['市辖区', '汉台区', '南郑县', '城固县', '洋　县', '西乡县', '勉　县', '宁强县', '略阳县', '镇巴县', '留坝县', '佛坪县']
  }, {
    name: '榆林市',
    areaList: ['市辖区', '榆阳区', '神木县', '府谷县', '横山县', '靖边县', '定边县', '绥德县', '米脂县', '佳　县', '吴堡县', '清涧县', '子洲县']
  }, {
    name: '安康市',
    areaList: ['市辖区', '汉滨区', '汉阴县', '石泉县', '宁陕县', '紫阳县', '岚皋县', '平利县', '镇坪县', '旬阳县', '白河县']
  }, {
    name: '商洛市',
    areaList: ['市辖区', '商州区', '洛南县', '丹凤县', '商南县', '山阳县', '镇安县', '柞水县']
  }]
}, {
  name: '甘肃',
  cityList: [{
    name: '兰州市',
    areaList: ['市辖区', '城关区', '七里河区', '西固区', '安宁区', '红古区', '永登县', '皋兰县', '榆中县']
  }, {
    name: '嘉峪关市',
    areaList: ['市辖区']
  }, {
    name: '金昌市',
    areaList: ['市辖区', '金川区', '永昌县']
  }, {
    name: '白银市',
    areaList: ['市辖区', '白银区', '平川区', '靖远县', '会宁县', '景泰县']
  }, {
    name: '天水市',
    areaList: ['市辖区', '秦城区', '北道区', '清水县', '秦安县', '甘谷县', '武山县', '张家川回族自治县']
  }, {
    name: '武威市',
    areaList: ['市辖区', '凉州区', '民勤县', '古浪县', '天祝藏族自治县']
  }, {
    name: '张掖市',
    areaList: ['市辖区', '甘州区', '肃南裕固族自治县', '民乐县', '临泽县', '高台县', '山丹县']
  }, {
    name: '平凉市',
    areaList: ['市辖区', '崆峒区', '泾川县', '灵台县', '崇信县', '华亭县', '庄浪县', '静宁县']
  }, {
    name: '酒泉市',
    areaList: ['市辖区', '肃州区', '金塔县', '安西县', '肃北蒙古族自治县', '阿克塞哈萨克族自治县', '玉门市', '敦煌市']
  }, {
    name: '庆阳市',
    areaList: ['市辖区', '西峰区', '庆城县', '环　县', '华池县', '合水县', '正宁县', '宁　县', '镇原县']
  }, {
    name: '定西市',
    areaList: ['市辖区', '安定区', '通渭县', '陇西县', '渭源县', '临洮县', '漳　县', '岷　县']
  }, {
    name: '陇南市',
    areaList: ['市辖区', '武都区', '成　县', '文　县', '宕昌县', '康　县', '西和县', '礼　县', '徽　县', '两当县']
  }, {
    name: '临夏回族自治州',
    areaList: ['临夏市', '临夏县', '康乐县', '永靖县', '广河县', '和政县', '东乡族自治县', '积石山保安族东乡族撒拉族自治县']
  }, {
    name: '甘南藏族自治州',
    areaList: ['合作市', '临潭县', '卓尼县', '舟曲县', '迭部县', '玛曲县', '碌曲县', '夏河县']
  }]
}, {
  name: '青海',
  cityList: [{
    name: '西宁市',
    areaList: ['市辖区', '城东区', '城中区', '城西区', '城北区', '大通回族土族自治县', '湟中县', '湟源县']
  }, {
    name: '海东地区',
    areaList: ['平安县', '民和回族土族自治县', '乐都县', '互助土族自治县', '化隆回族自治县', '循化撒拉族自治县']
  }, {
    name: '海北藏族自治州',
    areaList: ['门源回族自治县', '祁连县', '海晏县', '刚察县']
  }, {
    name: '黄南藏族自治州',
    areaList: ['同仁县', '尖扎县', '泽库县', '河南蒙古族自治县']
  }, {
    name: '海南藏族自治州',
    areaList: ['共和县', '同德县', '贵德县', '兴海县', '贵南县']
  }, {
    name: '果洛藏族自治州',
    areaList: ['玛沁县', '班玛县', '甘德县', '达日县', '久治县', '玛多县']
  }, {
    name: '玉树藏族自治州',
    areaList: ['玉树县', '杂多县', '称多县', '治多县', '囊谦县', '曲麻莱县']
  }, {
    name: '海西蒙古族藏族自治州',
    areaList: ['格尔木市', '德令哈市', '乌兰县', '都兰县', '天峻县']
  }]
}, {
  name: '宁夏',
  cityList: [{
    name: '银川市',
    areaList: ['市辖区', '兴庆区', '西夏区', '金凤区', '永宁县', '贺兰县', '灵武市']
  }, {
    name: '石嘴山市',
    areaList: ['市辖区', '大武口区', '惠农区', '平罗县']
  }, {
    name: '吴忠市',
    areaList: ['市辖区', '利通区', '盐池县', '同心县', '青铜峡市']
  }, {
    name: '固原市',
    areaList: ['市辖区', '原州区', '西吉县', '隆德县', '泾源县', '彭阳县', '海原县']
  }, {
    name: '中卫市',
    areaList: ['市辖区', '沙坡头区', '中宁县']
  }]
}, {
  name: '新疆',
  cityList: [{
    name: '乌鲁木齐市',
    areaList: ['市辖区', '天山区', '沙依巴克区', '新市区', '水磨沟区', '头屯河区', '达坂城区', '东山区', '乌鲁木齐县']
  }, {
    name: '克拉玛依市',
    areaList: ['市辖区', '独山子区', '克拉玛依区', '白碱滩区', '乌尔禾区']
  }, {
    name: '吐鲁番地区',
    areaList: ['吐鲁番市', '鄯善县', '托克逊县']
  }, {
    name: '哈密地区',
    areaList: ['哈密市', '巴里坤哈萨克自治县', '伊吾县']
  }, {
    name: '昌吉回族自治州',
    areaList: ['昌吉市', '阜康市', '米泉市', '呼图壁县', '玛纳斯县', '奇台县', '吉木萨尔县', '木垒哈萨克自治县']
  }, {
    name: '博尔塔拉蒙古自治州',
    areaList: ['博乐市', '精河县', '温泉县']
  }, {
    name: '巴音郭楞蒙古自治州',
    areaList: ['库尔勒市', '轮台县', '尉犁县', '若羌县', '且末县', '焉耆回族自治县', '和静县', '和硕县', '博湖县']
  }, {
    name: '阿克苏地区',
    areaList: ['阿克苏市', '温宿县', '库车县', '沙雅县', '新和县', '拜城县', '乌什县', '阿瓦提县', '柯坪县']
  }, {
    name: '克孜勒苏柯尔克孜自治州',
    areaList: ['阿图什市', '阿克陶县', '阿合奇县', '乌恰县']
  }, {
    name: '喀什地区',
    areaList: ['喀什市', '疏附县', '疏勒县', '英吉沙县', '泽普县', '莎车县', '叶城县', '麦盖提县', '岳普湖县', '伽师县', '巴楚县', '塔什库尔干塔吉克自治县']
  }, {
    name: '和田地区',
    areaList: ['和田市', '和田县', '墨玉县', '皮山县', '洛浦县', '策勒县', '于田县', '民丰县']
  }, {
    name: '伊犁哈萨克自治州',
    areaList: ['伊宁市', '奎屯市', '伊宁县', '察布查尔锡伯自治县', '霍城县', '巩留县', '新源县', '昭苏县', '特克斯县', '尼勒克县']
  }, {
    name: '塔城地区',
    areaList: ['塔城市', '乌苏市', '额敏县', '沙湾县', '托里县', '裕民县', '和布克赛尔蒙古自治县']
  }, {
    name: '阿勒泰地区',
    areaList: ['阿勒泰市', '布尔津县', '富蕴县', '福海县', '哈巴河县', '青河县', '吉木乃县']
  }, {
    name: '省直辖行政单位',
    areaList: ['石河子市', '阿拉尔市', '图木舒克市', '五家渠市']
  }]
}, {
  name: '河北',
  cityList: [{
    name: '石家庄市',
    areaList: ['市辖区', '长安区', '桥东区', '桥西区', '新华区', '井陉矿区', '裕华区', '井陉县', '正定县', '栾城县', '行唐县', '灵寿县', '高邑县', '深泽县', '赞皇县', '无极县', '平山县', '元氏县', '赵　县', '辛集市', '藁城市', '晋州市', '新乐市', '鹿泉市']
  }, {
    name: '唐山市',
    areaList: ['市辖区', '路南区', '路北区', '古冶区', '开平区', '丰南区', '丰润区', '滦　县', '滦南县', '乐亭县', '迁西县', '玉田县', '唐海县', '遵化市', '迁安市']
  }, {
    name: '秦皇岛市',
    areaList: ['市辖区', '海港区', '山海关区', '北戴河区', '青龙满族自治县', '昌黎县', '抚宁县', '卢龙县']
  }, {
    name: '邯郸市',
    areaList: ['市辖区', '邯山区', '丛台区', '复兴区', '峰峰矿区', '邯郸县', '临漳县', '成安县', '大名县', '涉　县', '磁　县', '肥乡县', '永年县', '邱　县', '鸡泽县', '广平县', '馆陶县', '魏　县', '曲周县', '武安市']
  }, {
    name: '邢台市',
    areaList: ['市辖区', '桥东区', '桥西区', '邢台县', '临城县', '内丘县', '柏乡县', '隆尧县', '任　县', '南和县', '宁晋县', '巨鹿县', '新河县', '广宗县', '平乡县', '威　县', '清河县', '临西县', '南宫市', '沙河市']
  }, {
    name: '保定市',
    areaList: ['市辖区', '新市区', '北市区', '南市区', '满城县', '清苑县', '涞水县', '阜平县', '徐水县', '定兴县', '唐　县', '高阳县', '容城县', '涞源县', '望都县', '安新县', '易　县', '曲阳县', '蠡　县', '顺平县', '博野县', '雄　县', '涿州市', '定州市', '安国市', '高碑店市']
  }, {
    name: '张家口市',
    areaList: ['市辖区', '桥东区', '桥西区', '宣化区', '下花园区', '宣化县', '张北县', '康保县', '沽源县', '尚义县', '蔚　县', '阳原县', '怀安县', '万全县', '怀来县', '涿鹿县', '赤城县', '崇礼县']
  }, {
    name: '承德市',
    areaList: ['市辖区', '双桥区', '双滦区', '鹰手营子矿区', '承德县', '兴隆县', '平泉县', '滦平县', '隆化县', '丰宁满族自治县', '宽城满族自治县', '围场满族蒙古族自治县']
  }, {
    name: '沧州市',
    areaList: ['市辖区', '新华区', '运河区', '沧　县', '青　县', '东光县', '海兴县', '盐山县', '肃宁县', '南皮县', '吴桥县', '献　县', '孟村回族自治县', '泊头市', '任丘市', '黄骅市', '河间市']
  }, {
    name: '廊坊市',
    areaList: ['市辖区', '安次区', '广阳区', '固安县', '永清县', '香河县', '大城县', '文安县', '大厂回族自治县', '霸州市', '三河市']
  }, {
    name: '衡水市',
    areaList: ['市辖区', '桃城区', '枣强县', '武邑县', '武强县', '饶阳县', '安平县', '故城县', '景　县', '阜城县', '冀州市', '深州市']
  }]
}, {
  name: '山西',
  cityList: [{
    name: '太原市',
    areaList: ['市辖区', '小店区', '迎泽区', '杏花岭区', '尖草坪区', '万柏林区', '晋源区', '清徐县', '阳曲县', '娄烦县', '古交市']
  }, {
    name: '大同市',
    areaList: ['市辖区', '城　区', '矿　区', '南郊区', '新荣区', '阳高县', '天镇县', '广灵县', '灵丘县', '浑源县', '左云县', '大同县']
  }, {
    name: '阳泉市',
    areaList: ['市辖区', '城　区', '矿　区', '郊　区', '平定县', '盂　县']
  }, {
    name: '长治市',
    areaList: ['市辖区', '城　区', '郊　区', '长治县', '襄垣县', '屯留县', '平顺县', '黎城县', '壶关县', '长子县', '武乡县', '沁　县', '沁源县', '潞城市']
  }, {
    name: '晋城市',
    areaList: ['市辖区', '城　区', '沁水县', '阳城县', '陵川县', '泽州县', '高平市']
  }, {
    name: '朔州市',
    areaList: ['市辖区', '朔城区', '平鲁区', '山阴县', '应　县', '右玉县', '怀仁县']
  }, {
    name: '晋中市',
    areaList: ['市辖区', '榆次区', '榆社县', '左权县', '和顺县', '昔阳县', '寿阳县', '太谷县', '祁　县', '平遥县', '灵石县', '介休市']
  }, {
    name: '运城市',
    areaList: ['市辖区', '盐湖区', '临猗县', '万荣县', '闻喜县', '稷山县', '新绛县', '绛　县', '垣曲县', '夏　县', '平陆县', '芮城县', '永济市', '河津市']
  }, {
    name: '忻州市',
    areaList: ['市辖区', '忻府区', '定襄县', '五台县', '代　县', '繁峙县', '宁武县', '静乐县', '神池县', '五寨县', '岢岚县', '河曲县', '保德县', '偏关县', '原平市']
  }, {
    name: '临汾市',
    areaList: ['市辖区', '尧都区', '曲沃县', '翼城县', '襄汾县', '洪洞县', '古　县', '安泽县', '浮山县', '吉　县', '乡宁县', '大宁县', '隰　县', '永和县', '蒲　县', '汾西县', '侯马市', '霍州市']
  }, {
    name: '吕梁市',
    areaList: ['市辖区', '离石区', '文水县', '交城县', '兴　县', '临　县', '柳林县', '石楼县', '岚　县', '方山县', '中阳县', '交口县', '孝义市', '汾阳市']
  }]
}, {
  name: '内蒙古',
  cityList: [{
    name: '呼和浩特市',
    areaList: ['市辖区', '新城区', '回民区', '玉泉区', '赛罕区', '土默特左旗', '托克托县', '和林格尔县', '清水河县', '武川县']
  }, {
    name: '包头市',
    areaList: ['市辖区', '东河区', '昆都仑区', '青山区', '石拐区', '白云矿区', '九原区', '土默特右旗', '固阳县', '达尔罕茂明安联合旗']
  }, {
    name: '乌海市',
    areaList: ['市辖区', '海勃湾区', '海南区', '乌达区']
  }, {
    name: '赤峰市',
    areaList: ['市辖区', '红山区', '元宝山区', '松山区', '阿鲁科尔沁旗', '巴林左旗', '巴林右旗', '林西县', '克什克腾旗', '翁牛特旗', '喀喇沁旗', '宁城县', '敖汉旗']
  }, {
    name: '通辽市',
    areaList: ['市辖区', '科尔沁区', '科尔沁左翼中旗', '科尔沁左翼后旗', '开鲁县', '库伦旗', '奈曼旗', '扎鲁特旗', '霍林郭勒市']
  }, {
    name: '鄂尔多斯市',
    areaList: ['东胜区', '达拉特旗', '准格尔旗', '鄂托克前旗', '鄂托克旗', '杭锦旗', '乌审旗', '伊金霍洛旗']
  }, {
    name: '呼伦贝尔市',
    areaList: ['市辖区', '海拉尔区', '阿荣旗', '莫力达瓦达斡尔族自治旗', '鄂伦春自治旗', '鄂温克族自治旗', '陈巴尔虎旗', '新巴尔虎左旗', '新巴尔虎右旗', '满洲里市', '牙克石市', '扎兰屯市', '额尔古纳市', '根河市']
  }, {
    name: '巴彦淖尔市',
    areaList: ['市辖区', '临河区', '五原县', '磴口县', '乌拉特前旗', '乌拉特中旗', '乌拉特后旗', '杭锦后旗']
  }, {
    name: '乌兰察布市',
    areaList: ['市辖区', '集宁区', '卓资县', '化德县', '商都县', '兴和县', '凉城县', '察哈尔右翼前旗', '察哈尔右翼中旗', '察哈尔右翼后旗', '四子王旗', '丰镇市']
  }, {
    name: '兴安盟',
    areaList: ['乌兰浩特市', '阿尔山市', '科尔沁右翼前旗', '科尔沁右翼中旗', '扎赉特旗', '突泉县']
  }, {
    name: '锡林郭勒盟',
    areaList: ['二连浩特市', '锡林浩特市', '阿巴嘎旗', '苏尼特左旗', '苏尼特右旗', '东乌珠穆沁旗', '西乌珠穆沁旗', '太仆寺旗', '镶黄旗', '正镶白旗', '正蓝旗', '多伦县']
  }, {
    name: '阿拉善盟',
    areaList: ['阿拉善左旗', '阿拉善右旗', '额济纳旗']
  }]
}, {
  name: '江苏',
  cityList: [{
    name: '南京市',
    areaList: ['市辖区', '玄武区', '白下区', '秦淮区', '建邺区', '鼓楼区', '下关区', '浦口区', '栖霞区', '雨花台区', '江宁区', '六合区', '溧水县', '高淳县']
  }, {
    name: '无锡市',
    areaList: ['市辖区', '崇安区', '南长区', '北塘区', '锡山区', '惠山区', '滨湖区', '江阴市', '宜兴市']
  }, {
    name: '徐州市',
    areaList: ['市辖区', '鼓楼区', '云龙区', '九里区', '贾汪区', '泉山区', '丰　县', '沛　县', '铜山县', '睢宁县', '新沂市', '邳州市']
  }, {
    name: '常州市',
    areaList: ['市辖区', '天宁区', '钟楼区', '戚墅堰区', '新北区', '武进区', '溧阳市', '金坛市']
  }, {
    name: '苏州市',
    areaList: ['市辖区', '沧浪区', '平江区', '金阊区', '虎丘区', '吴中区', '相城区', '常熟市', '张家港市', '昆山市', '吴江市', '太仓市']
  }, {
    name: '南通市',
    areaList: ['市辖区', '崇川区', '港闸区', '海安县', '如东县', '启东市', '如皋市', '通州市', '海门市']
  }, {
    name: '连云港市',
    areaList: ['市辖区', '连云区', '新浦区', '海州区', '赣榆县', '东海县', '灌云县', '灌南县']
  }, {
    name: '淮安市',
    areaList: ['市辖区', '清河区', '楚州区', '淮阴区', '清浦区', '涟水县', '洪泽县', '盱眙县', '金湖县']
  }, {
    name: '盐城市',
    areaList: ['市辖区', '亭湖区', '盐都区', '响水县', '滨海县', '阜宁县', '射阳县', '建湖县', '东台市', '大丰市']
  }, {
    name: '扬州市',
    areaList: ['市辖区', '广陵区', '邗江区', '郊　区', '宝应县', '仪征市', '高邮市', '江都市']
  }, {
    name: '镇江市',
    areaList: ['市辖区', '京口区', '润州区', '丹徒区', '丹阳市', '扬中市', '句容市']
  }, {
    name: '泰州市',
    areaList: ['市辖区', '海陵区', '高港区', '兴化市', '靖江市', '泰兴市', '姜堰市']
  }, {
    name: '宿迁市',
    areaList: ['市辖区', '宿城区', '宿豫区', '沭阳县', '泗阳县', '泗洪县']
  }]
}, {
  name: '浙江',
  cityList: [{
    name: '杭州市',
    areaList: ['市辖区', '上城区', '下城区', '江干区', '拱墅区', '西湖区', '滨江区', '萧山区', '余杭区', '桐庐县', '淳安县', '建德市', '富阳市', '临安市']
  }, {
    name: '宁波市',
    areaList: ['市辖区', '海曙区', '江东区', '江北区', '北仑区', '镇海区', '鄞州区', '象山县', '宁海县', '余姚市', '慈溪市', '奉化市']
  }, {
    name: '温州市',
    areaList: ['市辖区', '鹿城区', '龙湾区', '瓯海区', '洞头县', '永嘉县', '平阳县', '苍南县', '文成县', '泰顺县', '瑞安市', '乐清市']
  }, {
    name: '嘉兴市',
    areaList: ['市辖区', '秀城区', '秀洲区', '嘉善县', '海盐县', '海宁市', '平湖市', '桐乡市']
  }, {
    name: '湖州市',
    areaList: ['市辖区', '吴兴区', '南浔区', '德清县', '长兴县', '安吉县']
  }, {
    name: '绍兴市',
    areaList: ['市辖区', '越城区', '绍兴县', '新昌县', '诸暨市', '上虞市', '嵊州市']
  }, {
    name: '金华市',
    areaList: ['市辖区', '婺城区', '金东区', '武义县', '浦江县', '磐安县', '兰溪市', '义乌市', '东阳市', '永康市']
  }, {
    name: '衢州市',
    areaList: ['市辖区', '柯城区', '衢江区', '常山县', '开化县', '龙游县', '江山市']
  }, {
    name: '舟山市',
    areaList: ['市辖区', '定海区', '普陀区', '岱山县', '嵊泗县']
  }, {
    name: '台州市',
    areaList: ['市辖区', '椒江区', '黄岩区', '路桥区', '玉环县', '三门县', '天台县', '仙居县', '温岭市', '临海市']
  }, {
    name: '丽水市',
    areaList: ['市辖区', '莲都区', '青田县', '缙云县', '遂昌县', '松阳县', '云和县', '庆元县', '景宁畲族自治县', '龙泉市']
  }]
}, {
  name: '安徽',
  cityList: [{
    name: '合肥市',
    areaList: ['市辖区', '瑶海区', '庐阳区', '蜀山区', '包河区', '长丰县', '肥东县', '肥西县']
  }, {
    name: '芜湖市',
    areaList: ['市辖区', '镜湖区', '马塘区', '新芜区', '鸠江区', '芜湖县', '繁昌县', '南陵县']
  }, {
    name: '蚌埠市',
    areaList: ['市辖区', '龙子湖区', '蚌山区', '禹会区', '淮上区', '怀远县', '五河县', '固镇县']
  }, {
    name: '淮南市',
    areaList: ['市辖区', '大通区', '田家庵区', '谢家集区', '八公山区', '潘集区', '凤台县']
  }, {
    name: '马鞍山市',
    areaList: ['市辖区', '金家庄区', '花山区', '雨山区', '当涂县']
  }, {
    name: '淮北市',
    areaList: ['市辖区', '杜集区', '相山区', '烈山区', '濉溪县']
  }, {
    name: '铜陵市',
    areaList: ['市辖区', '铜官山区', '狮子山区', '郊　区', '铜陵县']
  }, {
    name: '安庆市',
    areaList: ['市辖区', '迎江区', '大观区', '郊　区', '怀宁县', '枞阳县', '潜山县', '太湖县', '宿松县', '望江县', '岳西县', '桐城市']
  }, {
    name: '黄山市',
    areaList: ['市辖区', '屯溪区', '黄山区', '徽州区', '歙　县', '休宁县', '黟　县', '祁门县']
  }, {
    name: '滁州市',
    areaList: ['市辖区', '琅琊区', '南谯区', '来安县', '全椒县', '定远县', '凤阳县', '天长市', '明光市']
  }, {
    name: '阜阳市',
    areaList: ['市辖区', '颍州区', '颍东区', '颍泉区', '临泉县', '太和县', '阜南县', '颍上县', '界首市']
  }, {
    name: '宿州市',
    areaList: ['市辖区', '墉桥区', '砀山县', '萧　县', '灵璧县', '泗　县']
  }, {
    name: '巢湖市',
    areaList: ['市辖区', '居巢区', '庐江县', '无为县', '含山县', '和　县']
  }, {
    name: '六安市',
    areaList: ['市辖区', '金安区', '裕安区', '寿　县', '霍邱县', '舒城县', '金寨县', '霍山县']
  }, {
    name: '亳州市',
    areaList: ['市辖区', '谯城区', '涡阳县', '蒙城县', '利辛县']
  }, {
    name: '池州市',
    areaList: ['市辖区', '贵池区', '东至县', '石台县', '青阳县']
  }, {
    name: '宣城市',
    areaList: ['市辖区', '宣州区', '郎溪县', '广德县', '泾　县', '绩溪县', '旌德县', '宁国市']
  }]
}, {
  name: '福建',
  cityList: [{
    name: '福州市',
    areaList: ['市辖区', '鼓楼区', '台江区', '仓山区', '马尾区', '晋安区', '闽侯县', '连江县', '罗源县', '闽清县', '永泰县', '平潭县', '福清市', '长乐市']
  }, {
    name: '厦门市',
    areaList: ['市辖区', '思明区', '海沧区', '湖里区', '集美区', '同安区', '翔安区']
  }, {
    name: '莆田市',
    areaList: ['市辖区', '城厢区', '涵江区', '荔城区', '秀屿区', '仙游县']
  }, {
    name: '三明市',
    areaList: ['市辖区', '梅列区', '三元区', '明溪县', '清流县', '宁化县', '大田县', '尤溪县', '沙　县', '将乐县', '泰宁县', '建宁县', '永安市']
  }, {
    name: '泉州市',
    areaList: ['市辖区', '鲤城区', '丰泽区', '洛江区', '泉港区', '惠安县', '安溪县', '永春县', '德化县', '金门县', '石狮市', '晋江市', '南安市']
  }, {
    name: '漳州市',
    areaList: ['市辖区', '芗城区', '龙文区', '云霄县', '漳浦县', '诏安县', '长泰县', '东山县', '南靖县', '平和县', '华安县', '龙海市']
  }, {
    name: '南平市',
    areaList: ['市辖区', '延平区', '顺昌县', '浦城县', '光泽县', '松溪县', '政和县', '邵武市', '武夷山市', '建瓯市', '建阳市']
  }, {
    name: '龙岩市',
    areaList: ['市辖区', '新罗区', '长汀县', '永定县', '上杭县', '武平县', '连城县', '漳平市']
  }, {
    name: '宁德市',
    areaList: ['市辖区', '蕉城区', '霞浦县', '古田县', '屏南县', '寿宁县', '周宁县', '柘荣县', '福安市', '福鼎市']
  }]
}, {
  name: '江西',
  cityList: [{
    name: '南昌市',
    areaList: ['市辖区', '东湖区', '西湖区', '青云谱区', '湾里区', '青山湖区', '南昌县', '新建县', '安义县', '进贤县']
  }, {
    name: '景德镇市',
    areaList: ['市辖区', '昌江区', '珠山区', '浮梁县', '乐平市']
  }, {
    name: '萍乡市',
    areaList: ['市辖区', '安源区', '湘东区', '莲花县', '上栗县', '芦溪县']
  }, {
    name: '九江市',
    areaList: ['市辖区', '庐山区', '浔阳区', '九江县', '武宁县', '修水县', '永修县', '德安县', '星子县', '都昌县', '湖口县', '彭泽县', '瑞昌市']
  }, {
    name: '新余市',
    areaList: ['市辖区', '渝水区', '分宜县']
  }, {
    name: '鹰潭市',
    areaList: ['市辖区', '月湖区', '余江县', '贵溪市']
  }, {
    name: '赣州市',
    areaList: ['市辖区', '章贡区', '赣　县', '信丰县', '大余县', '上犹县', '崇义县', '安远县', '龙南县', '定南县', '全南县', '宁都县', '于都县', '兴国县', '会昌县', '寻乌县', '石城县', '瑞金市', '南康市']
  }, {
    name: '吉安市',
    areaList: ['市辖区', '吉州区', '青原区', '吉安县', '吉水县', '峡江县', '新干县', '永丰县', '泰和县', '遂川县', '万安县', '安福县', '永新县', '井冈山市']
  }, {
    name: '宜春市',
    areaList: ['市辖区', '袁州区', '奉新县', '万载县', '上高县', '宜丰县', '靖安县', '铜鼓县', '丰城市', '樟树市', '高安市']
  }, {
    name: '抚州市',
    areaList: ['市辖区', '临川区', '南城县', '黎川县', '南丰县', '崇仁县', '乐安县', '宜黄县', '金溪县', '资溪县', '东乡县', '广昌县']
  }, {
    name: '上饶市',
    areaList: ['市辖区', '信州区', '上饶县', '广丰县', '玉山县', '铅山县', '横峰县', '弋阳县', '余干县', '鄱阳县', '万年县', '婺源县', '德兴市']
  }]
}, {
  name: '山东',
  cityList: [{
    name: '济南市',
    areaList: ['市辖区', '历下区', '市中区', '槐荫区', '天桥区', '历城区', '长清区', '平阴县', '济阳县', '商河县', '章丘市']
  }, {
    name: '青岛市',
    areaList: ['市辖区', '市南区', '市北区', '四方区', '黄岛区', '崂山区', '李沧区', '城阳区', '胶州市', '即墨市', '平度市', '胶南市', '莱西市']
  }, {
    name: '淄博市',
    areaList: ['市辖区', '淄川区', '张店区', '博山区', '临淄区', '周村区', '桓台县', '高青县', '沂源县']
  }, {
    name: '枣庄市',
    areaList: ['市辖区', '市中区', '薛城区', '峄城区', '台儿庄区', '山亭区', '滕州市']
  }, {
    name: '东营市',
    areaList: ['市辖区', '东营区', '河口区', '垦利县', '利津县', '广饶县']
  }, {
    name: '烟台市',
    areaList: ['市辖区', '芝罘区', '福山区', '牟平区', '莱山区', '长岛县', '龙口市', '莱阳市', '莱州市', '蓬莱市', '招远市', '栖霞市', '海阳市']
  }, {
    name: '潍坊市',
    areaList: ['市辖区', '潍城区', '寒亭区', '坊子区', '奎文区', '临朐县', '昌乐县', '青州市', '诸城市', '寿光市', '安丘市', '高密市', '昌邑市']
  }, {
    name: '济宁市',
    areaList: ['市辖区', '市中区', '任城区', '微山县', '鱼台县', '金乡县', '嘉祥县', '汶上县', '泗水县', '梁山县', '曲阜市', '兖州市', '邹城市']
  }, {
    name: '泰安市',
    areaList: ['市辖区', '泰山区', '岱岳区', '宁阳县', '东平县', '新泰市', '肥城市']
  }, {
    name: '威海市',
    areaList: ['市辖区', '环翠区', '文登市', '荣成市', '乳山市']
  }, {
    name: '日照市',
    areaList: ['市辖区', '东港区', '岚山区', '五莲县', '莒　县']
  }, {
    name: '莱芜市',
    areaList: ['市辖区', '莱城区', '钢城区']
  }, {
    name: '临沂市',
    areaList: ['市辖区', '兰山区', '罗庄区', '河东区', '沂南县', '郯城县', '沂水县', '苍山县', '费　县', '平邑县', '莒南县', '蒙阴县', '临沭县']
  }, {
    name: '德州市',
    areaList: ['市辖区', '德城区', '陵　县', '宁津县', '庆云县', '临邑县', '齐河县', '平原县', '夏津县', '武城县', '乐陵市', '禹城市']
  }, {
    name: '聊城市',
    areaList: ['市辖区', '东昌府区', '阳谷县', '莘　县', '茌平县', '东阿县', '冠　县', '高唐县', '临清市']
  }, {
    name: '滨州市',
    areaList: ['市辖区', '滨城区', '惠民县', '阳信县', '无棣县', '沾化县', '博兴县', '邹平县']
  }, {
    name: '荷泽市',
    areaList: ['市辖区', '牡丹区', '曹　县', '单　县', '成武县', '巨野县', '郓城县', '鄄城县', '定陶县', '东明县']
  }]
}, {
  name: '辽宁',
  cityList: [{
    name: '沈阳市',
    areaList: ['市辖区', '和平区', '沈河区', '大东区', '皇姑区', '铁西区', '苏家屯区', '东陵区', '新城子区', '于洪区', '辽中县', '康平县', '法库县', '新民市']
  }, {
    name: '大连市',
    areaList: ['市辖区', '中山区', '西岗区', '沙河口区', '甘井子区', '旅顺口区', '金州区', '长海县', '瓦房店市', '普兰店市', '庄河市']
  }, {
    name: '鞍山市',
    areaList: ['市辖区', '铁东区', '铁西区', '立山区', '千山区', '台安县', '岫岩满族自治县', '海城市']
  }, {
    name: '抚顺市',
    areaList: ['市辖区', '新抚区', '东洲区', '望花区', '顺城区', '抚顺县', '新宾满族自治县', '清原满族自治县']
  }, {
    name: '本溪市',
    areaList: ['市辖区', '平山区', '溪湖区', '明山区', '南芬区', '本溪满族自治县', '桓仁满族自治县']
  }, {
    name: '丹东市',
    areaList: ['市辖区', '元宝区', '振兴区', '振安区', '宽甸满族自治县', '东港市', '凤城市']
  }, {
    name: '锦州市',
    areaList: ['市辖区', '古塔区', '凌河区', '太和区', '黑山县', '义　县', '凌海市', '北宁市']
  }, {
    name: '营口市',
    areaList: ['市辖区', '站前区', '西市区', '鲅鱼圈区', '老边区', '盖州市', '大石桥市']
  }, {
    name: '阜新市',
    areaList: ['市辖区', '海州区', '新邱区', '太平区', '清河门区', '细河区', '阜新蒙古族自治县', '彰武县']
  }, {
    name: '辽阳市',
    areaList: ['市辖区', '白塔区', '文圣区', '宏伟区', '弓长岭区', '太子河区', '辽阳县', '灯塔市']
  }, {
    name: '盘锦市',
    areaList: ['市辖区', '双台子区', '兴隆台区', '大洼县', '盘山县']
  }, {
    name: '铁岭市',
    areaList: ['市辖区', '银州区', '清河区', '铁岭县', '西丰县', '昌图县', '调兵山市', '开原市']
  }, {
    name: '朝阳市',
    areaList: ['市辖区', '双塔区', '龙城区', '朝阳县', '建平县', '喀喇沁左翼蒙古族自治县', '北票市', '凌源市']
  }, {
    name: '葫芦岛市',
    areaList: ['市辖区', '连山区', '龙港区', '南票区', '绥中县', '建昌县', '兴城市']
  }]
}, {
  name: '吉林',
  cityList: [{
    name: '长春市',
    areaList: ['市辖区', '南关区', '宽城区', '朝阳区', '二道区', '绿园区', '双阳区', '农安县', '九台市', '榆树市', '德惠市']
  }, {
    name: '吉林市',
    areaList: ['市辖区', '昌邑区', '龙潭区', '船营区', '丰满区', '永吉县', '蛟河市', '桦甸市', '舒兰市', '磐石市']
  }, {
    name: '四平市',
    areaList: ['市辖区', '铁西区', '铁东区', '梨树县', '伊通满族自治县', '公主岭市', '双辽市']
  }, {
    name: '辽源市',
    areaList: ['市辖区', '龙山区', '西安区', '东丰县', '东辽县']
  }, {
    name: '通化市',
    areaList: ['市辖区', '东昌区', '二道江区', '通化县', '辉南县', '柳河县', '梅河口市', '集安市']
  }, {
    name: '白山市',
    areaList: ['市辖区', '八道江区', '抚松县', '靖宇县', '长白朝鲜族自治县', '江源县', '临江市']
  }, {
    name: '松原市',
    areaList: ['市辖区', '宁江区', '前郭尔罗斯蒙古族自治县', '长岭县', '乾安县', '扶余县']
  }, {
    name: '白城市',
    areaList: ['市辖区', '洮北区', '镇赉县', '通榆县', '洮南市', '大安市']
  }, {
    name: '延边朝鲜族自治州',
    areaList: ['延吉市', '图们市', '敦化市', '珲春市', '龙井市', '和龙市', '汪清县', '安图县']
  }]
}, {
  name: '黑龙江',
  cityList: [{
    name: '哈尔滨市',
    areaList: ['市辖区', '道里区', '南岗区', '道外区', '香坊区', '动力区', '平房区', '松北区', '呼兰区', '依兰县', '方正县', '宾　县', '巴彦县', '木兰县', '通河县', '延寿县', '阿城市', '双城市', '尚志市', '五常市']
  }, {
    name: '齐齐哈尔市',
    areaList: ['市辖区', '龙沙区', '建华区', '铁锋区', '昂昂溪区', '富拉尔基区', '碾子山区', '梅里斯达斡尔族区', '龙江县', '依安县', '泰来县', '甘南县', '富裕县', '克山县', '克东县', '拜泉县', '讷河市']
  }, {
    name: '鸡西市',
    areaList: ['市辖区', '鸡冠区', '恒山区', '滴道区', '梨树区', '城子河区', '麻山区', '鸡东县', '虎林市', '密山市']
  }, {
    name: '鹤岗市',
    areaList: ['市辖区', '向阳区', '工农区', '南山区', '兴安区', '东山区', '兴山区', '萝北县', '绥滨县']
  }, {
    name: '双鸭山市',
    areaList: ['市辖区', '尖山区', '岭东区', '四方台区', '宝山区', '集贤县', '友谊县', '宝清县', '饶河县']
  }, {
    name: '大庆市',
    areaList: ['市辖区', '萨尔图区', '龙凤区', '让胡路区', '红岗区', '大同区', '肇州县', '肇源县', '林甸县', '杜尔伯特蒙古族自治县']
  }, {
    name: '伊春市',
    areaList: ['市辖区', '伊春区', '南岔区', '友好区', '西林区', '翠峦区', '新青区', '美溪区', '金山屯区', '五营区', '乌马河区', '汤旺河区', '带岭区', '乌伊岭区', '红星区', '上甘岭区', '嘉荫县', '铁力市']
  }, {
    name: '佳木斯市',
    areaList: ['市辖区', '永红区', '向阳区', '前进区', '东风区', '郊　区', '桦南县', '桦川县', '汤原县', '抚远县', '同江市', '富锦市']
  }, {
    name: '七台河市',
    areaList: ['市辖区', '新兴区', '桃山区', '茄子河区', '勃利县']
  }, {
    name: '牡丹江市',
    areaList: ['市辖区', '东安区', '阳明区', '爱民区', '西安区', '东宁县', '林口县', '绥芬河市', '海林市', '宁安市', '穆棱市']
  }, {
    name: '黑河市',
    areaList: ['市辖区', '爱辉区', '嫩江县', '逊克县', '孙吴县', '北安市', '五大连池市']
  }, {
    name: '绥化市',
    areaList: ['市辖区', '北林区', '望奎县', '兰西县', '青冈县', '庆安县', '明水县', '绥棱县', '安达市', '肇东市', '海伦市']
  }, {
    name: '大兴安岭地区',
    areaList: ['呼玛县', '塔河县', '漠河县']
  }]
}, {
  name: '海南',
  cityList: [{
    name: '海口市',
    areaList: ['市辖区', '秀英区', '龙华区', '琼山区', '美兰区']
  }, {
    name: '三亚市',
    areaList: ['市辖区']
  }, {
    name: '省直辖县级行政单位',
    areaList: ['五指山市', '琼海市', '儋州市', '文昌市', '万宁市', '东方市', '定安县', '屯昌县', '澄迈县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县', '西沙群岛', '南沙群岛', '中沙群岛的岛礁及其海域']
  }]
}, {
  name: '台湾',
  cityList: []
}, {
  name: '香港',
  cityList: []
}, {
  name: '澳门',
  cityList: []
}];
var _default = provinceList;
exports.default = _default;

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-toutiao/common/vendor.js.map