import { strictEqual as e } from "assert";

import { valueFromRecord as n } from "value-from-record";

var s;

!function(e) {
  e[e.Node12 = 100] = "Node12", e[e.None = 0] = "None", e[e.CommonJS = 1] = "CommonJS", 
  e[e.AMD = 2] = "AMD", e[e.UMD = 3] = "UMD", e[e.System = 4] = "System", e[e.ES2015 = 5] = "ES2015", 
  e[e.ES2020 = 6] = "ES2020", e[e.ES2022 = 7] = "ES2022", e[e.ESNext = 99] = "ESNext", 
  e[e.Node16 = 100] = "Node16", e[e.NodeNext = 199] = "NodeNext";
}(s || (s = {}));

const t = [ 0, 1, 100 ], o = [ 5, 6, 7, 99, 199 ];

var d, u;

function _assertNumber(n) {
  const s = typeof n;
  e(s, "number", new TypeError(`should be a number, but got ${s}`));
}

function tsModuleKindIsCJS(e) {
  return _assertNumber(e), t.includes(e);
}

function tsModuleKindIsESM(e) {
  return _assertNumber(e), o.includes(e);
}

function isModuleKindName(e) {
  return "string" == typeof e && e in s;
}

function toModuleKindName(n) {
  let t;
  return isModuleKindName(n) ? t = n : (t = s[handleModuleKindLazy(n)], function _assertString(n) {
    const s = typeof n;
    e(s, "string", new TypeError(`should be a string, but got ${s}`));
  }(t)), t;
}

function handleModuleKindLazy(e) {
  return "string" == typeof e && (e = /^\d+$/.test(e) ? parseInt(e) : n(e, s)), e;
}

function tsModuleKindIsCJSLazy(e) {
  return tsModuleKindIsCJS(handleModuleKindLazy(e));
}

function tsModuleKindIsESMLazy(e) {
  return tsModuleKindIsESM(handleModuleKindLazy(e));
}

function tsModuleKindType(e) {
  return tsModuleKindIsCJS(e) ? "cjs" : tsModuleKindIsESM(e) ? "esm" : void 0;
}

function tsModuleKindExt(e) {
  return tsModuleKindIsCJS(e) ? ".cjs" : tsModuleKindIsESM(e) ? ".mjs" : void 0;
}

function tsModuleKindLazy(e) {
  return tsModuleKindType(handleModuleKindLazy(e));
}

function getExtensionsByCompilerOptions(e) {
  const n = [ ".ts" ], s = [], t = handleModuleKindLazy(e.module), o = tsModuleKindIsESM(t), d = !o && tsModuleKindIsCJS(t);
  return e.jsx && n.push(".tsx"), o ? n.push(".mts") : d && n.push(".cts"), e.allowJs && (s.push(".js"), 
  e.jsx && s.push(".jsx"), o ? n.push(".mjs") : d && n.push(".cjs")), {
    tsExtensions: n,
    jsExtensions: s,
    useESM: o,
    useCJS: d,
    module: t
  };
}

!function(e) {
  e.cjs = "cjs", e.esm = "esm";
}(d || (d = {})), function(e) {
  e.cjs = ".cjs", e.esm = ".mjs";
}(u || (u = {}));

export { d as EnumJsKind, u as EnumJsKindExt, t as TS_MODULE_KIND_IS_CJS, o as TS_MODULE_KIND_IS_ESM, getExtensionsByCompilerOptions as default, getExtensionsByCompilerOptions, handleModuleKindLazy, isModuleKindName, toModuleKindName, tsModuleKindExt, tsModuleKindIsCJS, tsModuleKindIsCJSLazy, tsModuleKindIsESM, tsModuleKindIsESMLazy, tsModuleKindLazy, tsModuleKindType };
//# sourceMappingURL=index.esm.mjs.map
