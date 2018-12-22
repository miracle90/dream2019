"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// es6 => this 闭包 作用域 继承
// es6 中的类
// 判断是否为 new 调用
// function _check(instance, construct) {
//     if (!(instance instanceof construct)) {
//         throw new TypeError(`Class constructor Fn cannot be invoked without 'new'`)
//     }
// }
// function Fn() {
//     _check(this, Fn)
// }
// new Fn()
var Animal =
/*#__PURE__*/
function () {
  // es6只支持静态的方法 并不支持静态属性 Animal.a = 1(es7支持)
  function Animal(val) {
    _classCallCheck(this, Animal);

    _defineProperty(this, "age", 9);

    this.name = val;
  }

  _createClass(Animal, [{
    key: "eat",
    value: function eat() {
      // 原型上的方法
      console.log('吃');
    }
  }], [{
    key: "a",
    value: function a() {
      return 1;
    }
  }]);

  return Animal;
}(); // Animal.prototype.eat = function () {}


_defineProperty(Animal, "a", 1);

var animal = new Animal('动物');
animal.eat(); // 静态方法不需要 new，直接调用

console.log(Animal.a()); // es6 中的继承会继承实例上的和原型上的（包括静态方法）

var Cat =
/*#__PURE__*/
function (_Animal) {
  _inherits(Cat, _Animal);

  function Cat(name) {// super(name)     // Animal.call(this)

    var _this;

    _classCallCheck(this, Cat);

    return _possibleConstructorReturn(_this);
  }

  return Cat;
}(Animal);

var c = new Cat('小猫');
console.log(Cat.a());
console.log(c.name);
console.log(Animal.a); // @babel/core babel核心包
// @babel/cli babel命令行工具
// @babel/preset-env es6...转换成es5
