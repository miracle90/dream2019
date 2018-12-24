"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Parent = // static a = 'hello'       // es7 语法
// a = 'hello'              // es7 语法
function Parent(age) {
  var _this = this;

  _classCallCheck(this, Parent);

  _defineProperty(this, "drink", function () {
    // es7 语法，保证 this 指向的正确性
    console.log(_this);
  });

  this.age = age;
}; // extends 默认会继承实例上的属性和原型上的属性
// 子类继承父类的静态方法
// Child.__proto__ = Parent


var Child =
/*#__PURE__*/
function (_Parent) {
  _inherits(Child, _Parent);

  // 如果需要传参，则须写constructor，写 constructor 必须写 super
  function Child(val) {
    _classCallCheck(this, Child);

    return _possibleConstructorReturn(this, _getPrototypeOf(Child).call(this, val));
  }

  return Child;
}(Parent);

var child = new Child(5);
var drink = child.drink(); // 不能把原型上的方法拿出来调用，否则 this 无指向

drink(); // console.log(child.drink())
// static 属性是 es7 提供的
// babel 把 es6 => es5      @babel/core     @babel/cli      @babel/preset-env 把 es6+ 转化成低级语法
// 自己安装其他插件
//  npx babel 1. class.js - o 1. class - es5.js
// 命令行命令：
// npx：执行.bin目录下的任意一个文件
// babel：.bin 目录下的命令
// 1.class.js：源文件名
// -o：输出
// 1.class-es5.js：编译后的文件名
// static = 'hello' 为 es7 语法，需要以下插件，需要在 .babelrc 下配置
// @babel/plugin-proposal-class-properties

console.log(Parent.a);
console.log(Child.a);
console.log(child.a);
console.log(child.__proto__.a);
