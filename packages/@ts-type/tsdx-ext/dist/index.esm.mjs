var s;

function defaultFormatOrder() {
  return [ "esm", "cjs", "umd" ];
}

function getExtensionsByFormat(s) {
  return [ ..."cjs" === s ? [ ".cts" ] : "esm" === s ? [ ".mts" ] : "umd" === s ? [ ".umd.ts" ] : [], ".ts", ".tsx", ..."cjs" === s || "esm" === s ? [] : [ ".mts", ".cts" ], ".jsx", ..."cjs" === s ? [ ".cjs" ] : "esm" === s ? [ ".mjs" ] : "umd" === s ? [ ".umd.js" ] : [], ".js", ..."cjs" === s || "esm" === s ? [] : [ ".mjs", ".cjs" ], ".js" ];
}

!function(s) {
  s.cjs = "cjs", s.umd = "umd", s.esm = "esm", s.system = "system";
}(s || (s = {}));

export { s as EnumTsdxFormat, getExtensionsByFormat as default, defaultFormatOrder, getExtensionsByFormat };
//# sourceMappingURL=index.esm.mjs.map
