"use strict";

var t;

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.EnumTsdxFormat = void 0, (t = exports.EnumTsdxFormat || (exports.EnumTsdxFormat = {})).cjs = "cjs", 
t.umd = "umd", t.esm = "esm", t.system = "system";

const s = defaultAllowedFormat(), e = new Map;

function defaultAllowedFormat() {
  return [ "esm", "cjs", "umd", "system" ];
}

function isAllowedFormat(t) {
  return s.includes(t);
}

function _getExtensionsByFormat(t) {
  return [ ..."cjs" === t ? [ ".cts" ] : "esm" === t ? [ ".mts" ] : "umd" === t ? [ ".umd.ts" ] : [], ".ts", ".tsx", ..."cjs" === t || "esm" === t ? [] : [ ".mts", ".cts" ], ".jsx", ..."cjs" === t ? [ ".cjs" ] : "esm" === t ? [ ".mjs" ] : "umd" === t ? [ ".umd.js" ] : [], ".js", ..."cjs" === t || "esm" === t ? [] : [ ".mjs", ".cjs" ], ".js" ];
}

function getExtensionsByFormat(t) {
  var s;
  let o = e.get(t);
  if (null === (s = o) || void 0 === s || !s.length) {
    if (!isAllowedFormat(t)) throw new RangeError(`Invalid format ${t}`);
    o = _getExtensionsByFormat(t), e.set(t, o);
  }
  return o.slice();
}

exports._getExtensionsByFormat = _getExtensionsByFormat, exports.default = getExtensionsByFormat, 
exports.defaultAllowedFormat = defaultAllowedFormat, exports.defaultFormatOrder = function defaultFormatOrder() {
  return [ "esm", "cjs", "umd" ];
}, exports.getExtensionsByFormat = getExtensionsByFormat, exports.isAllowedFormat = isAllowedFormat;
//# sourceMappingURL=index.cjs.production.min.cjs.map
