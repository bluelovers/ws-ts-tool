import { ModuleKind as s } from "typescript";

import { strictEqual as n } from "assert";

import { valueFromRecord as e } from "value-from-record";

const t = [ 1, 100 ], d = [ 5, 6, 7, 99, 199 ];

var o;

function tsModuleKindIsCJS(s) {
  return n(typeof s, "number"), -1 !== t.indexOf(s);
}

function tsModuleKindIsESM(s) {
  return n(typeof s, "number"), -1 !== d.indexOf(s);
}

function handleModuleKindLazy(n) {
  return "string" == typeof n && (n = /^\d+$/.test(n) ? parseInt(n) : e(n, s)), n;
}

function tsModuleKindIsCJSLazy(s) {
  return tsModuleKindIsCJS(handleModuleKindLazy(s));
}

function tsModuleKindIsESMLazy(s) {
  return tsModuleKindIsESM(handleModuleKindLazy(s));
}

function tsModuleKind(s) {
  return tsModuleKindIsCJS(s) ? "cjs" : tsModuleKindIsESM(s) ? "esm" : void 0;
}

function tsModuleKindLazy(s) {
  return tsModuleKind(handleModuleKindLazy(s));
}

function getExtensionsByCompilerOptions(s) {
  const n = [ ".ts" ], e = [], t = handleModuleKindLazy(s.module), d = tsModuleKindIsESM(t), o = tsModuleKindIsCJS(t);
  return s.jsx && n.push(".tsx"), d && n.push(".mts"), o && n.push(".cts"), s.allowJs && (e.push(".js"), 
  s.jsx && e.push(".jsx"), d && n.push(".mjs"), o && n.push(".cjs")), {
    tsExtensions: n,
    jsExtensions: e,
    useESM: d,
    useCJS: o,
    module: t
  };
}

!function(s) {
  s.cjs = "cjs", s.esm = "esm";
}(o || (o = {}));

export { o as EnumJsKind, t as TS_MODULE_KIND_IS_CJS, d as TS_MODULE_KIND_IS_ESM, getExtensionsByCompilerOptions as default, getExtensionsByCompilerOptions, handleModuleKindLazy, tsModuleKind, tsModuleKindIsCJS, tsModuleKindIsCJSLazy, tsModuleKindIsESM, tsModuleKindIsESMLazy, tsModuleKindLazy };
//# sourceMappingURL=index.esm.mjs.map
