(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[446],{

/***/ 5504:
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
        "fill": "#21468b",
        "d": "M0 0h640v480H0z"
      }
    }), _c('path', {
      attrs: {
        "fill": "#fff",
        "d": "M0 0h640v320H0z"
      }
    }), _c('path', {
      attrs: {
        "fill": "#ae1c28",
        "d": "M0 0h640v160H0z"
      }
    })]));
  }

};

/***/ })

}]);