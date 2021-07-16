(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[360],{

/***/ 5418:
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
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        "viewBox": "0 0 640 480"
      }, attrs),
      ...rest
    }, children.concat([_c('path', {
      attrs: {
        "fill": "#fff",
        "d": "M0 0h640v480H0z"
      }
    }), _c('path', {
      attrs: {
        "fill": "#e8112d",
        "d": "M256 0h128v480H256z"
      }
    }), _c('path', {
      attrs: {
        "fill": "#e8112d",
        "d": "M0 176h640v128H0z"
      }
    }), _c('path', {
      attrs: {
        "id": "a",
        "fill": "#f9dd16",
        "d": "M110 286.7l23.3-23.4h210v-46.6h-210L110 193.3z"
      }
    }), _c('use', {
      attrs: {
        "width": "36",
        "height": "24",
        "transform": "rotate(90 320 240)",
        "xlink:href": "#a"
      }
    }), _c('use', {
      attrs: {
        "width": "36",
        "height": "24",
        "transform": "rotate(-90 320 240)",
        "xlink:href": "#a"
      }
    }), _c('use', {
      attrs: {
        "width": "36",
        "height": "24",
        "transform": "rotate(180 320 240)",
        "xlink:href": "#a"
      }
    })]));
  }

};

/***/ })

}]);