"use strict";

var s;

function getExtensionsByFormat(s) {
  return [ ..."cjs" === s ? [ ".cts" ] : "esm" === s ? [ ".mts" ] : "umd" === s ? [ ".umd.ts" ] : [], ".ts", ".tsx", ..."cjs" === s || "esm" === s ? [] : [ ".mts", ".cts" ], ".jsx", ..."cjs" === s ? [ ".cjs" ] : "esm" === s ? [ ".mjs" ] : "umd" === s ? [ ".umd.js" ] : [], ".js", ..."cjs" === s || "esm" === s ? [] : [ ".mjs", ".cjs" ], ".js" ];
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.EnumTsdxFormat = void 0, (s = exports.EnumTsdxFormat || (exports.EnumTsdxFormat = {})).cjs = "cjs", 
s.umd = "umd", s.esm = "esm", s.system = "system", exports.default = getExtensionsByFormat, 
exports.defaultFormatOrder = function defaultFormatOrder() {
  return [ "esm", "cjs", "umd" ];
}, exports.getExtensionsByFormat = getExtensionsByFormat;
//# sourceMappingURL=index.cjs.production.min.cjs.map
