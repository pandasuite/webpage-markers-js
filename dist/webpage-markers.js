/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/pandasuite-bridge/src/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/pandasuite-bridge/src/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* eslint-disable no-param-reassign */\n\nconst PandaBridge = function PandaBridge() {};\n\nPandaBridge.initCallBack = null;\nPandaBridge.loadCallBack = null;\nPandaBridge.updateCallBack = null;\n\nPandaBridge.globalReceive = [];\nPandaBridge.eventReceive = {};\n\nPandaBridge.bridge = null;\nPandaBridge.isStudio = false;\n\nPandaBridge.resources = [];\nPandaBridge.properties = {};\nPandaBridge.markers = [];\n\nPandaBridge.isCoreInitialized = false;\n\nPandaBridge.INITIALIZE = '__ps_initialize';\nPandaBridge.UPDATE = '__ps_update';\nPandaBridge.SYNCHRONIZE = 'synchronize';\nPandaBridge.TRIGGER_MARKER = 'triggerMarker';\nPandaBridge.INITIALIZED = '__ps_initialized';\nPandaBridge.UPDATED = '__ps_updated';\n\nPandaBridge.STUDIO = '__ps_studio';\nPandaBridge.LANGUAGE = '__ps_language';\n\nPandaBridge.GET_SNAPSHOT_DATA = '__ps_getSnapshotData';\nPandaBridge.SET_SNAPSHOT_DATA = '__ps_setSnapshotData';\nPandaBridge.SNAPSHOT_DATA_RESULT = '__ps_snapshotDataResult';\n\nPandaBridge.GET_SCREENSHOT = '__ps_getScreenshot';\nPandaBridge.SCREENSHOT_RESULT = '__ps_screenshotResult';\n\nfunction isIOS() {\n  return (\n    (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)\n    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)\n  );\n}\n\nfunction connectWebViewJavascriptBridge(callback) {\n  if (window.WebViewJavascriptBridge) {\n    callback(window.WebViewJavascriptBridge);\n\n    /* Android */\n  } else if (window.WebViewAndroidBridge) {\n    callback({\n      init(receiveCallBack) {\n        window.sendMessage = function sendMessage(message) {\n          receiveCallBack(message);\n        };\n      },\n      send(message) {\n        window.WebViewAndroidBridge.send(message);\n      },\n    });\n  } else {\n    /* In case we are on iOS */\n    document.addEventListener(\n      'WebViewJavascriptBridgeReady',\n      () => {\n        callback(window.WebViewJavascriptBridge);\n      },\n      false,\n    );\n\n    if (isIOS()) {\n      if (window.WVJBCallbacks) {\n        return window.WVJBCallbacks.push(callback);\n      }\n      window.WVJBCallbacks = [callback];\n      const WVJBIframe = document.createElement('iframe');\n      WVJBIframe.style.display = 'none';\n      WVJBIframe.src = 'https://__bridge_loaded__';\n      document.documentElement.appendChild(WVJBIframe);\n      setTimeout(() => {\n        document.documentElement.removeChild(WVJBIframe);\n      }, 0);\n    }\n\n    /* Javascript */\n    window.addEventListener(\n      'message',\n      (event) => {\n        if (event.data === 'PandaJavascriptBridgeReady') {\n          PandaBridge.listen(PandaBridge.STUDIO, () => {\n            PandaBridge.isStudio = true;\n          });\n          PandaBridge.listen(PandaBridge.LANGUAGE, (args) => {\n            PandaBridge.currentLanguage = args && args.language;\n          });\n          callback({\n            init(receiveCallBack) {\n              window.addEventListener(\n                'message',\n                (messageEvent) => {\n                  if (messageEvent.data !== 'PandaJavascriptBridgeReady') {\n                    receiveCallBack(messageEvent.data);\n                  }\n                },\n                false,\n              );\n            },\n            send(message) {\n              if (window !== window.parent) {\n                // Protect to an endless looping in local dev\n                window.parent.postMessage(message, '*');\n              }\n            },\n          });\n        }\n      },\n      false,\n    );\n  }\n  return null;\n}\n\nfunction executeHook(event, args) {\n  PandaBridge.globalReceive.forEach((callback) => {\n    callback(event, args || []);\n  });\n\n  if (PandaBridge.eventReceive[event]) {\n    PandaBridge.eventReceive[event].forEach((callback) => {\n      callback(args || []);\n    });\n  }\n}\n\nconnectWebViewJavascriptBridge((bridge) => {\n  /* This is only for the new IOS bridge */\n  if (\n    window.WebViewJavascriptBridge\n    && bridge === window.WebViewJavascriptBridge\n    && window.WebViewJavascriptBridge.send === undefined\n  ) {\n    bridge = {\n      init: (function initClosure(internalBridge) {\n        return function init(receiveCallBack) {\n          internalBridge.registerHandler('message', (data) => {\n            receiveCallBack(data);\n          });\n        };\n      }(bridge)),\n      send: (function sendClosure(internalBridge) {\n        return function send(message) {\n          internalBridge.callHandler('message', message);\n        };\n      }(bridge)),\n    };\n  }\n\n  PandaBridge.bridge = bridge;\n\n  if (PandaBridge.initCallBack) {\n    PandaBridge.initCallBack();\n  }\n\n  bridge.init((message) => {\n    try {\n      const parsed = JSON.parse(message);\n      executeHook(parsed.event, parsed.args);\n    // eslint-disable-next-line no-empty\n    } catch (e) {}\n  });\n});\n\nPandaBridge.init = function init(callBack) {\n  PandaBridge.initCallBack = callBack;\n  if (PandaBridge.bridge) {\n    PandaBridge.initCallBack();\n  }\n};\n\nPandaBridge.send = function send(event, args) {\n  if (PandaBridge.bridge) {\n    try {\n      const stringify = JSON.stringify({ event, args });\n      PandaBridge.bridge.send.call(PandaBridge.bridge, stringify);\n    // eslint-disable-next-line no-empty\n    } catch (e) {}\n  }\n};\n\n/* General events handling */\n\nPandaBridge.listen = function listen(arg1, arg2) {\n  if (typeof arg1 === 'function') {\n    PandaBridge.globalReceive.push(arg1);\n  } else {\n    if (PandaBridge.eventReceive[arg1] === undefined) {\n      PandaBridge.eventReceive[arg1] = [];\n    }\n    PandaBridge.eventReceive[arg1].push(arg2);\n  }\n};\n\nPandaBridge.unlisten = function unlisten(arg1, arg2) {\n  if (arg1 === undefined && arg2 === undefined) {\n    PandaBridge.globalReceive = [];\n    PandaBridge.eventReceive = {};\n  } else if (typeof arg1 === 'function') {\n    const index = PandaBridge.globalReceive.indexOf(arg1);\n    if (index !== -1) {\n      PandaBridge.globalReceive.splice(index, 1);\n    }\n  } else if (arg2 === undefined) {\n    PandaBridge.eventReceive[arg1] = [];\n  } else {\n    const index = PandaBridge.eventReceive[arg1].indexOf(arg2);\n    if (index !== -1) {\n      PandaBridge.eventReceive[arg1].splice(index, 1);\n    }\n  }\n};\n\n/* Shortcut */\n\nPandaBridge.listen(PandaBridge.INITIALIZE, (args) => {\n  PandaBridge.isCoreInitialized = true;\n\n  args = args || [];\n\n  PandaBridge.resources = args[2] || [];\n  PandaBridge.properties = args[0] || {};\n  PandaBridge.markers = args[1] || [];\n\n  if (PandaBridge.loadCallBack) {\n    PandaBridge.loadCallBack({\n      properties: PandaBridge.properties,\n      markers: PandaBridge.markers,\n      resources: PandaBridge.resources,\n    });\n    PandaBridge.loadCallBack = null;\n  }\n});\n\nPandaBridge.onLoad = function onLoad(callBack) {\n  PandaBridge.loadCallBack = callBack;\n\n  if (PandaBridge.loadCallBack && PandaBridge.isCoreInitialized) {\n    PandaBridge.loadCallBack({\n      properties: PandaBridge.properties,\n      markers: PandaBridge.markers,\n      resources: PandaBridge.resources,\n    });\n    PandaBridge.loadCallBack = null;\n  }\n};\n\nPandaBridge.listen(PandaBridge.UPDATE, (args) => {\n  args = args || [];\n\n  PandaBridge.resources = args[2] || [];\n  PandaBridge.properties = args[0] || {};\n  PandaBridge.markers = args[1] || [];\n\n  if (PandaBridge.updateCallBack) {\n    PandaBridge.updateCallBack({\n      properties: PandaBridge.properties,\n      markers: PandaBridge.markers,\n      resources: PandaBridge.resources,\n    });\n  }\n});\n\nPandaBridge.onUpdate = function onUpdate(callBack) {\n  PandaBridge.updateCallBack = callBack;\n};\n\nPandaBridge.getSnapshotData = function getSnapshotData(callBack) {\n  PandaBridge.listen(PandaBridge.GET_SNAPSHOT_DATA, (args) => {\n    PandaBridge.send(PandaBridge.SNAPSHOT_DATA_RESULT, [callBack(args)]);\n  });\n};\n\nPandaBridge.setSnapshotData = function setSnapshotData(callBack) {\n  PandaBridge.listen(PandaBridge.SET_SNAPSHOT_DATA, (args) => {\n    args = args || [];\n    callBack({\n      data: args[0] || {},\n      params: args[1] || {},\n    });\n  });\n};\n\nPandaBridge.getScreenshot = function getScreenshot(callBack) {\n  PandaBridge.listen(PandaBridge.GET_SCREENSHOT, (args) => {\n    const resultCallback = (result) => {\n      PandaBridge.send(PandaBridge.SCREENSHOT_RESULT, [result]);\n    };\n    callBack(resultCallback, args);\n  });\n};\n\nPandaBridge.synchronize = function synchronize(arg1, arg2) {\n  if (typeof arg1 === 'function') {\n    PandaBridge.listen(PandaBridge.SYNCHRONIZE, (args) => {\n      arg1(args[0]);\n    });\n  } else if (typeof arg2 === 'function') {\n    PandaBridge.listen(PandaBridge.SYNCHRONIZE, (args) => {\n      if ((args || [])[1] === arg1) {\n        arg2(args[0]);\n      }\n    });\n  }\n};\n\nPandaBridge.resolvePath = function resolvePath(id, def) {\n  const resources = PandaBridge.resources.filter(\n    (resource) => resource.id === id && resource.path,\n  );\n  let resource = resources && resources[0];\n\n  if (resource && PandaBridge.currentLanguage) {\n    const localizedResource = resources.find((r) => r.language === PandaBridge.currentLanguage);\n\n    if (localizedResource) {\n      resource = localizedResource;\n    }\n  }\n\n  if (resource) {\n    return resource.path;\n  }\n  return def;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (PandaBridge);\n\nif (!Array.prototype.find) {\n  // eslint-disable-next-line no-extend-native\n  Object.defineProperty(Array.prototype, 'find', {\n    value(predicate) {\n      if (this == null) {\n        throw TypeError('\"this\" is null or not defined');\n      }\n\n      const o = Object(this);\n\n      // eslint-disable-next-line no-bitwise\n      const len = o.length >>> 0;\n\n      if (typeof predicate !== 'function') {\n        throw TypeError('predicate must be a function');\n      }\n\n      // eslint-disable-next-line prefer-rest-params\n      const thisArg = arguments[1];\n\n      let k = 0;\n\n      while (k < len) {\n        const kValue = o[k];\n        if (predicate.call(thisArg, kValue, k, o)) {\n          return kValue;\n        }\n        // eslint-disable-next-line no-plusplus\n        k++;\n      }\n      return undefined;\n    },\n    configurable: true,\n    writable: true,\n  });\n}\n\n\n//# sourceURL=webpack:///./node_modules/pandasuite-bridge/src/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var pandasuite_bridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pandasuite-bridge */ \"./node_modules/pandasuite-bridge/src/index.js\");\n\n\nvar hoverDiv;\nvar selectedElement;\nvar lockedElement;\n\nvar properties = null;\nvar markers = null;\n\npandasuite_bridge__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init(function() {\n  pandasuite_bridge__WEBPACK_IMPORTED_MODULE_0__[\"default\"].onLoad(function(pandaData) {\n    properties = pandaData.properties;\n    markers = pandaData.markers;\n\n    if (document.readyState != 'loading'){\n      main();\n    } else {\n      document.addEventListener('DOMContentLoaded', main);\n    }    \n  });\n});\n\nfunction main() {\n  if (pandasuite_bridge__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isStudio) {\n    editionMode();\n  }\n\n  watchMode();\n}\n\nfunction watchMode() {\n  triggerEvents();\n\n  window.addEventListener('scroll', function(event) {\n    triggerEvents();\n  });\n}\n\nfunction triggerEvents() {\n  if (markers) {\n    markers.forEach(function(m) {\n      var element = document.getElementById(m.elementId);\n\n      if (element) {\n        var elementInViewport = isElementInViewport(element);\n        if ((elementInViewport && !m.enter && !m.exit && !m.oldVisibility) ||\n            (elementInViewport && m.enter && !m.oldVisibility) ||\n            (!elementInViewport && m.exit && m.oldVisibility)) {\n          pandasuite_bridge__WEBPACK_IMPORTED_MODULE_0__[\"default\"].send(pandasuite_bridge__WEBPACK_IMPORTED_MODULE_0__[\"default\"].TRIGGER_MARKER, m.id);\n        }\n        m.oldVisibility = elementInViewport;\n      }\n    });\n  }\n}\n\nfunction editionMode() {\n  hoverDiv = createHover();\n  document.body.appendChild(hoverDiv);\n\n  pandasuite_bridge__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getSnapshotData(function() {\n    if (selectedElement) {\n      return { elementId: getSelectedElementId() };\n    }\n    return null;\n  });\n\n  pandasuite_bridge__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setSnapshotData(function(pandaData) {\n    var element = document.getElementById(pandaData.data.elementId);\n\n    if (element) {\n      element.scrollIntoView();\n    }\n  });\n\n  pandasuite_bridge__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getSnapshotData(function() {\n    if (selectedElement) {\n      return { elementId: getSelectedElementId() };\n    }\n    return null;\n  });\n\n  document.onmousemove = function(e){\n    var e = e || window.event;\n    var x = e.clientX || e.pageX;\n    var y = e.clientY || e.pageY;\n    var element = document.elementFromPoint(x,y);\n    if (\n      (element.getAttribute('id') || element.querySelector('[id]'))\n      && element != document.body && element != document.body.parentNode && element.id !== 'hover'\n      && !lockedElement) {\n      selectedElement = element;\n      updateHover(element);\n    }\n  };\n  \n  window.addEventListener('scroll', function(event){\n    if (selectedElement) {\n      updateHover(selectedElement);\n    }\n  });\n  \n  hoverDiv.addEventListener('click', function (event) {\n    if (lockedElement) {\n      lockedElement = undefined;\n  \n      hoverDiv.style.borderStyle = 'none';\n  \n    } else if (selectedElement) {\n      lockedElement = selectedElement;\n  \n      hoverDiv.style.borderStyle = 'dashed';\n      hoverDiv.style.borderWidth = '2px';\n      hoverDiv.style.borderColor = 'black';\n    }\n  });\n  \n  document.body.addEventListener('click', function cb(e) {\n    e = e || window.event;\n    var target = e.target || e.srcElement;\n\n    if (target.getAttribute('id') != 'hover') {      \n      selectedElement = undefined;\n      lockedElement = undefined;\n      hoverDiv.style.borderStyle = 'none';\n      hoverDiv.style.visibility = 'hidden';\n    }\n  });\n}\n\nfunction createHover() {\n  var node = document.createElement('div');\n  node.setAttribute('id', 'hover');\n  node.style.background = 'blue';\n  node.style.opacity = 0.2;\n  node.style.position = 'fixed';\n  node.style.visibility = 'hidden';\n  node.style.zIndex = 1000;\n  return node;\n}\n\nfunction updateHover(element) {\n  if (element) {\n    var bounds = element.getBoundingClientRect();\n    \n    hoverDiv.style.visibility = 'visible';\n    hoverDiv.style.top = bounds.top + 'px';\n    hoverDiv.style.left = bounds.left + 'px';\n    hoverDiv.style.width = bounds.width + 'px';\n    hoverDiv.style.height = bounds.height + 'px';\n  }\n}\n\nfunction getSelectedElementId() {\n  if (selectedElement) {\n    return (selectedElement.getAttribute('id') || selectedElement.querySelector('[id]').getAttribute('id'));\n  }\n  return null;\n}\n\nfunction isElementInViewport(element) {\n  var rect = element.getBoundingClientRect();\n\n  return (\n      rect.top >= 0 &&\n      rect.left >= 0 &&\n      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&\n      rect.right <= (window.innerWidth || document.documentElement.clientWidth)\n  );\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });