"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e, s = require("assert"), t = require("value-from-record");

!function(e) {
  e[e.Node12 = 100] = "Node12", e[e.None = 0] = "None", e[e.CommonJS = 1] = "CommonJS", 
  e[e.AMD = 2] = "AMD", e[e.UMD = 3] = "UMD", e[e.System = 4] = "System", e[e.ES2015 = 5] = "ES2015", 
  e[e.ES2020 = 6] = "ES2020", e[e.ES2022 = 7] = "ES2022", e[e.ESNext = 99] = "ESNext", 
  e[e.Node16 = 100] = "Node16", e[e.NodeNext = 199] = "NodeNext";
}(e || (e = {}));

const n = [ 0, 1, 100 ], o = [ 5, 6, 7, 99, 199 ];

var d, u;

function _assertNumber(e) {
  const t = typeof e;
  s.strictEqual(t, "number", new TypeError(`should be a number, but got ${t}`));
}

function tsModuleKindIsCJS(e) {
  return _assertNumber(e), n.includes(e);
}

function tsModuleKindIsESM(e) {
  return _assertNumber(e), o.includes(e);
}

function isModuleKindName(s) {
  return "string" == typeof s && s in e;
}

function handleModuleKindLazy(s) {
  return "string" == typeof s && (s = /^\d+$/.test(s) ? parseInt(s) : t.valueFromRecord(s, e)), 
  s;
}

function tsModuleKindType(e) {
  return tsModuleKindIsCJS(e) ? "cjs" : tsModuleKindIsESM(e) ? "esm" : void 0;
}

function tsModuleKindExt(e) {
  return tsModuleKindIsCJS(e) ? ".cjs" : tsModuleKindIsESM(e) ? ".mjs" : void 0;
}

function getExtensionsByCompilerOptions(e) {
  const s = [ ".ts" ], t = [], n = handleModuleKindLazy(e.module), o = tsModuleKindIsESM(n), d = !o && tsModuleKindIsCJS(n);
  return e.jsx && s.push(".tsx"), o ? s.push(".mts") : d && s.push(".cts"), e.allowJs && (t.push(".js"), 
  e.jsx && t.push(".jsx"), o ? s.push(".mjs") : d && s.push(".cjs")), {
    tsExtensions: s,
    jsExtensions: t,
    useESM: o,
    useCJS: d,
    module: n
  };
}

exports.EnumJsKind = void 0, (d = exports.EnumJsKind || (exports.EnumJsKind = {})).cjs = "cjs", 
d.esm = "esm", exports.EnumJsKindExt = void 0, (u = exports.EnumJsKindExt || (exports.EnumJsKindExt = {})).cjs = ".cjs", 
u.esm = ".mjs", exports.TS_MODULE_KIND_IS_CJS = n, exports.TS_MODULE_KIND_IS_ESM = o, 
exports.default = getExtensionsByCompilerOptions, exports.getExtensionsByCompilerOptions = getExtensionsByCompilerOptions, 
exports.handleModuleKindLazy = handleModuleKindLazy, exports.isModuleKindName = isModuleKindName, 
exports.toModuleKindName = function toModuleKindName(t) {
  let n;
  return isModuleKindName(t) ? n = t : (n = e[handleModuleKindLazy(t)], function _assertString(e) {
    const t = typeof e;
    s.strictEqual(t, "string", new TypeError(`should be a string, but got ${t}`));
  }(n)), n;
}, exports.tsModuleKindExt = tsModuleKindExt, exports.tsModuleKindExtLazy = function tsModuleKindExtLazy(e) {
  return tsModuleKindExt(handleModuleKindLazy(e));
}, exports.tsModuleKindIsCJS = tsModuleKindIsCJS, exports.tsModuleKindIsCJSLazy = function tsModuleKindIsCJSLazy(e) {
  return tsModuleKindIsCJS(handleModuleKindLazy(e));
}, exports.tsModuleKindIsESM = tsModuleKindIsESM, exports.tsModuleKindIsESMLazy = function tsModuleKindIsESMLazy(e) {
  return tsModuleKindIsESM(handleModuleKindLazy(e));
}, exports.tsModuleKindType = tsModuleKindType, exports.tsModuleKindTypeLazy = function tsModuleKindTypeLazy(e) {
  return tsModuleKindType(handleModuleKindLazy(e));
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
