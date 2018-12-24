"use strict";

var _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

// 装饰器
// 装饰器可以装饰类中的属性和类中的方法和类
// 不能装饰函数
// 装饰类
var Circle = flag(_class = (_class2 = (_temp =
/*#__PURE__*/
function () {
  function Circle() {
    _classCallCheck(this, Circle);

    _initializerDefineProperty(this, "PI", _descriptor, this);
  }

  _createClass(Circle, [{
    key: "say",
    // 装饰方法
    value: function say() {}
  }]);

  return Circle;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "PI", [readOnly], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 3.14;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "say", [log], Object.getOwnPropertyDescriptor(_class2.prototype, "say"), _class2.prototype)), _class2)) || _class;

function readOnly(prototype, key, desc) {
  desc.writable = false;
  console.log(prototype, key, desc.initializer());
}

function log(prototype, key, desc) {
  var old = desc.value;

  desc.value = function () {
    console.log('----');
    old();
  }; // console.log(prototype, key, desc)

}

function flag(target) {
  console.log(target);
}

var c = new Circle(); // 修改类中属性
// Object.defineProperty(c, 'PI', { })
// c.PI = 3.15

console.log(c.PI);
c.say();
