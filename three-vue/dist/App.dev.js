"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports["default"] = exports.num2 = exports.num1 = void 0;

var _my = _interopRequireDefault(require("./my.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = {
  data: function data() {
    return {
      imgSrc: _my["default"]
    };
  },
  template: "\n    <div>\n      <img :src='imgSrc'>\n    </div>\n  "
}; //声明并导出

var num1 = 5; //做为一整个对象key导出
//声明再导出

exports.num1 = num1;
var num2 = 10;
exports.num2 = num2;

function add(x, y) {
  return console.log(x + y);
} //抛出对象


var _default = app;
exports["default"] = _default;