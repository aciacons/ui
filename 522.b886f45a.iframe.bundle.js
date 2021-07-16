(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[522],{

/***/ 5580:
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
    }, children.concat([_c('defs', [_c('clipPath', {
      attrs: {
        "id": "a"
      }
    }, [_c('path', {
      attrs: {
        "fill-opacity": ".7",
        "d": "M-85.3 0h682.6v512H-85.3z"
      }
    })])]), _c('g', {
      attrs: {
        "fill-rule": "evenodd",
        "clip-path": "url(#a)",
        "transform": "translate(80) scale(.9375)"
      }
    }, [_c('path', {
      attrs: {
        "fill": "#ec0015",
        "d": "M-128 0h768v512h-768z"
      }
    }), _c('path', {
      attrs: {
        "fill": "#ff0",
        "d": "M349.6 381L260 314.3l-89 67.3L204 272l-89-67.7 110.1-1 34.2-109.4L294 203l110.1.1-88.5 68.4 33.9 109.6z"
      }
    })])]));
  }

};

/***/ })

}]);