//  webpackBootstrap webpack启动
(function(modules) {
    // 模块的缓存，每个模块的导出对象 exports
 	var installedModules = {};

    // __webpack_require__ 函数
 	function __webpack_require__(moduleId) {

 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		var module = installedModules[moduleId] = {
 			i: moduleId,
            l: false,
            // 每个模块都有一个 exports 对象
 			exports: {}
 		};

        // module、exports、require
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		module.l = true;

 		return module.exports;
 	}
 	__webpack_require__.m = modules;

 	__webpack_require__.c = installedModules;

 	__webpack_require__.d = function(exports, name, getter) {
 		if(!__webpack_require__.o(exports, name)) {
 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
 		}
 	};

 	__webpack_require__.r = function(exports) {
 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
 		}
 		Object.defineProperty(exports, '__esModule', { value: true });
 	};
 	__webpack_require__.t = function(value, mode) {
 		if(mode & 1) value = __webpack_require__(value);
 		if(mode & 8) return value;
 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
 		var ns = Object.create(null);
 		__webpack_require__.r(ns);
 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
 		return ns;
 	};

 	__webpack_require__.n = function(module) {
 		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
 		__webpack_require__.d(getter, 'a', getter);
 		return getter;
 	};

 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

 	__webpack_require__.p = "";

    // 入口的名字
 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
})({
    // key: 一个模块的路径
    "./src/a.js": (function(module, exports) {
        eval("module.exports = 'lyy'\n\n");
    }),
    "./src/index.js": (function(module, exports, __webpack_require__) {
        eval("let str = __webpack_require__(\"./src/a.js\")\r\n\r\nconsole.log(str)\n\n");
    })
});

// webpack 自己实现了一个 require 方法