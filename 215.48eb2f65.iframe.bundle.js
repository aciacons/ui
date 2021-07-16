(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[215],{

/***/ 5273:
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
        "stroke-width": "1pt",
        "clip-path": "url(#a)",
        "transform": "scale(1.0321)"
      }
    }, [_c('path', {
      attrs: {
        "d": "M0 330.7h992.1v165.4H0z"
      }
    }), _c('path', {
      attrs: {
        "fill": "#fff",
        "d": "M0 165.3h992.1v165.4H0z"
      }
    }), _c('path', {
      attrs: {
        "fill": "red",
        "d": "M0 0h992.9v165.4H0z"
      }
    }), _c('path', {
      attrs: {
        "fill": "#009a00",
        "d": "M0 0v496l330.7-248L0 0z"
      }
    })])]));
  }

};

/***/ })

}]);