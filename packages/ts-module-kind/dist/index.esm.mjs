import { ModuleKind } from 'typescript';
import { strictEqual } from 'assert';
import { valueFromRecord } from 'value-from-record';

const TS_MODULE_KIND_IS_CJS = [1, 100];
const TS_MODULE_KIND_IS_ESM = [5, 6, 7, 99, 199];

var EnumJsKind;

(function (EnumJsKind) {
  EnumJsKind["cjs"] = "cjs";
  EnumJsKind["esm"] = "esm";
})(EnumJsKind || (EnumJsKind = {}));
function tsModuleKindIsCJS(module) {
  strictEqual(typeof module, 'number');
  return TS_MODULE_KIND_IS_CJS.indexOf(module) !== -1;
}
function tsModuleKindIsESM(module) {
  strictEqual(typeof module, 'number');
  return TS_MODULE_KIND_IS_ESM.indexOf(module) !== -1;
}
function handleModuleKindLazy(module) {
  if (typeof module === 'string') {
    if (/^\d+$/.test(module)) {
      module = parseInt(module);
    } else {
      module = valueFromRecord(module, ModuleKind);
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

export { EnumJsKind, TS_MODULE_KIND_IS_CJS, TS_MODULE_KIND_IS_ESM, getExtensionsByCompilerOptions as default, getExtensionsByCompilerOptions, handleModuleKindLazy, tsModuleKind, tsModuleKindIsCJS, tsModuleKindIsCJSLazy, tsModuleKindIsESM, tsModuleKindIsESMLazy, tsModuleKindLazy };
//# sourceMappingURL=index.esm.mjs.map
