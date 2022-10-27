var s;

function defaultFormatOrder() {
  return [ "esm", "cjs", "umd" ];
}

function defaultAllowedFormat() {
  return [ "esm", "cjs", "umd", "system" ];
}

!function(s) {
  s.cjs = "cjs", s.umd = "umd", s.esm = "esm", s.system = "system";
}(s || (s = {}));

const t = defaultAllowedFormat();

function isAllowedFormat(s) {
  return t.includes(s);
}

function getExtensionsByFormat(s) {
  return [ ..."cjs" === s ? [ ".cts" ] : "esm" === s ? [ ".mts" ] : "umd" === s ? [ ".umd.ts" ] : [], ".ts", ".tsx", ..."cjs" === s || "esm" === s ? [] : [ ".mts", ".cts" ], ".jsx", ..."cjs" === s ? [ ".cjs" ] : "esm" === s ? [ ".mjs" ] : "umd" === s ? [ ".umd.js" ] : [], ".js", ..."cjs" === s || "esm" === s ? [] : [ ".mjs", ".cjs" ], ".js" ];
}

export { s as EnumTsdxFormat, getExtensionsByFormat as default, defaultAllowedFormat, defaultFormatOrder, getExtensionsByFormat, isAllowedFormat };
//# sourceMappingURL=index.esm.mjs.map
