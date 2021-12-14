'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var typescript = require('typescript');
var assert = require('assert');
var valueFromRecord = require('value-from-record');

const TS_MODULE_KIND_IS_CJS = [1, 100];
const TS_MODULE_KIND_IS_ESM = [5, 6, 7, 99, 199];

exports.EnumJsKind = void 0;

(function (EnumJsKind) {
  EnumJsKind["cjs"] = "cjs";
  EnumJsKind["esm"] = "esm";
})(exports.EnumJsKind || (exports.EnumJsKind = {}));
function tsModuleKindIsCJS(module) {
  assert.strictEqual(typeof module, 'number');
  return TS_MODULE_KIND_IS_CJS.indexOf(module) !== -1;
}
function tsModuleKindIsESM(module) {
  assert.strictEqual(typeof module, 'number');
  return TS_MODULE_KIND_IS_ESM.indexOf(module) !== -1;
}
function handleModuleKindLazy(module) {
  if (typeof module === 'string') {
    if (/^\d+$/.test(module)) {
      module = parseInt(module);
    } else {
      module = valueFromRecord.valueFromRecord(module, typescript.ModuleKind);
    }
  }

  return module;
}
function tsModuleKindIsCJSLazy(module) {
  return tsModuleKindIsCJS(handleModuleKindLazy(module));
}
function tsModuleKindIsESMLazy(module) {
  return tsModuleKindIsESM(handleModuleKindLazy(module));
}
function tsModuleKind(module) {
  if (tsModuleKindIsCJS(module)) {
    return "cjs";
  } else if (tsModuleKindIsESM(module)) {
    return "esm";
  }
}
function tsModuleKindLazy(module) {
  return tsModuleKind(handleModuleKindLazy(module));
}
function getExtensionsByCompilerOptions(options) {
  const tsExtensions = ['.ts'];
  const jsExtensions = [];
  const module = handleModuleKindLazy(options.module);
  const useESM = tsModuleKindIsESM(module);
  const useCJS = tsModuleKindIsCJS(module);
  if (options.jsx) tsExtensions.push('.tsx');
  if (useESM) tsExtensions.push('.mts');
  if (useCJS) tsExtensions.push('.cts');

  if (options.allowJs) {
    jsExtensions.push('.js');
    if (options.jsx) jsExtensions.push('.jsx');
    if (useESM) tsExtensions.push('.mjs');
    if (useCJS) tsExtensions.push('.cjs');
  }

  return {
    tsExtensions,
    jsExtensions,
    useESM,
    useCJS,
    module
  };
}

exports.TS_MODULE_KIND_IS_CJS = TS_MODULE_KIND_IS_CJS;
exports.TS_MODULE_KIND_IS_ESM = TS_MODULE_KIND_IS_ESM;
exports["default"] = getExtensionsByCompilerOptions;
exports.getExtensionsByCompilerOptions = getExtensionsByCompilerOptions;
exports.handleModuleKindLazy = handleModuleKindLazy;
exports.tsModuleKind = tsModuleKind;
exports.tsModuleKindIsCJS = tsModuleKindIsCJS;
exports.tsModuleKindIsCJSLazy = tsModuleKindIsCJSLazy;
exports.tsModuleKindIsESM = tsModuleKindIsESM;
exports.tsModuleKindIsESMLazy = tsModuleKindIsESMLazy;
exports.tsModuleKindLazy = tsModuleKindLazy;
//# sourceMappingURL=index.cjs.development.cjs.map
