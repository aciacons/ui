(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[240],{

/***/ 5298:
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
        "viewBox": "0 0 512 512"
      }, attrs),
      ...rest
    }, children.concat([_c('defs', [_c('clipPath', {
      attrs: {
        "id": "a"
      }
    }, [_c('path', {
      attrs: {
        "fill-opacity": ".7",
        "d": "M0 0h496v496H0z"
      }
    })])]), _c('g', {
      attrs: {
        "fill-rule": "evenodd",
        "clip-path": "url(#a)",
        "transform": "scale(1.0321)"
      }
    }, [_c('path', {
      attrs: {
        "fill": "#cb000f",
        "d": "M0 0h999v496H0z"
      }
    }), _c('path', {
      attrs: {
        "fill": "#f8c00c",
        "d": "M0 0c3.1 0 496 248.7 496 248.7L0 496.1V0z"
      }
    }), _c('path', {
      attrs: {
        "d": "M0 0c2 0 330 248.7 330 248.7L0 496.1V0z"
      }
    }), _c('path', {
      attrs: {
        "fill": "#fff",
        "d": "M181.9 288.9l-59-13L93 327l-5-57.8-58.8-13 53.1-24-3.2-57.5 39 42 53.6-24.4-28 52.2 38 44.4z"
      }
    })])]));
  }

};

/***/ })

}]);