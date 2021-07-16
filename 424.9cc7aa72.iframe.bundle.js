(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[424],{

/***/ 5482:
/***/ (function(module, exports) {

module.exports = {
  functional: true,

  render(_h, _vm) {
    const {
      _c,
      _v,
      data,
      children = []
    } = _vm;
    const {
      class: classNames,
      staticClass,
      style,
      staticStyle,
      attrs = {},
      ...rest
    } = data;
    return _c('svg', {
      class: [classNames, staticClass],
      style: [style, staticStyle],
      attrs: Object.assign({
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 640 480"
      }, attrs),
      ...rest
    }, children.concat([_c('path', {
      attrs: {
        "fill": "#d20000",
        "d": "M0 0h640v480H0z"
      }
    }), _c('path', {
      attrs: {
        "fill": "#ffe600",
        "d": "M0 0h96l224 231.4L544 0h96L0 480h96l224-231.4L544 480h96zm640 192v96L0 192v96zM280 0l40 205.7L360 0zm0 480l40-205.7L360 480z"
      }
    }), _c('circle', {
      attrs: {
        "cx": "320",
        "cy": "240",
        "r": "77.1",
        "fill": "#ffe600",
        "stroke": "#d20000",
        "stroke-width": "17.1"
      }
    })]));
  }

};

/***/ })

}]);