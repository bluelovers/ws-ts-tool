var t;

!function(t) {
  t.cjs = "cjs", t.umd = "umd", t.esm = "esm", t.system = "system";
}(t || (t = {}));

const s = defaultAllowedFormat(), e = new Map;

function defaultFormatOrder() {
  return [ "esm", "cjs", "umd" ];
}

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
  let m = e.get(t);
  if (null === (s = m) || void 0 === s || !s.length) {
    if (!isAllowedFormat(t)) throw new RangeError(`Invalid format ${t}`);
    m = _getExtensionsByFormat(t), e.set(t, m);
  }
  return m.slice();
}

export { t as EnumTsdxFormat, _getExtensionsByFormat, getExtensionsByFormat as default, defaultAllowedFormat, defaultFormatOrder, getExtensionsByFormat, isAllowedFormat };
//# sourceMappingURL=index.esm.mjs.map
