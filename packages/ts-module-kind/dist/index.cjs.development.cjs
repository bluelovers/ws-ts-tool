'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var assert = require('assert');
var valueFromRecord = require('value-from-record');

var EnumModuleKind;
(function (EnumModuleKind) {
  EnumModuleKind[EnumModuleKind["Node12"] = 100] = "Node12";
  EnumModuleKind[EnumModuleKind["None"] = 0] = "None";
  EnumModuleKind[EnumModuleKind["CommonJS"] = 1] = "CommonJS";
  EnumModuleKind[EnumModuleKind["AMD"] = 2] = "AMD";
  EnumModuleKind[EnumModuleKind["UMD"] = 3] = "UMD";
  EnumModuleKind[EnumModuleKind["System"] = 4] = "System";
  EnumModuleKind[EnumModuleKind["ES2015"] = 5] = "ES2015";
  EnumModuleKind[EnumModuleKind["ES2020"] = 6] = "ES2020";
  EnumModuleKind[EnumModuleKind["ES2022"] = 7] = "ES2022";
  EnumModuleKind[EnumModuleKind["ESNext"] = 99] = "ESNext";
  EnumModuleKind[EnumModuleKind["Node16"] = 100] = "Node16";
  EnumModuleKind[EnumModuleKind["NodeNext"] = 199] = "NodeNext";
})(EnumModuleKind || (EnumModuleKind = {}));
const TS_MODULE_KIND_IS_CJS = [0, 1, 100];
const TS_MODULE_KIND_IS_ESM = [5, 6, 7, 99, 199];

exports.EnumJsKind = void 0;
(function (EnumJsKind) {
  EnumJsKind["cjs"] = "cjs";
  EnumJsKind["esm"] = "esm";
})(exports.EnumJsKind || (exports.EnumJsKind = {}));
exports.EnumJsKindExt = void 0;
(function (EnumJsKindExt) {
  EnumJsKindExt["cjs"] = ".cjs";
  EnumJsKindExt["esm"] = ".mjs";
})(exports.EnumJsKindExt || (exports.EnumJsKindExt = {}));
function _assertNumber(n) {
  const type = typeof n;
  assert.strictEqual(type, 'number', new TypeError(`should be a number, but got ${type}`));
}
function _assertString(n) {
  const type = typeof n;
  assert.strictEqual(type, 'string', new TypeError(`should be a string, but got ${type}`));
}
function tsModuleKindIsCJS(module) {
  _assertNumber(module);
  return TS_MODULE_KIND_IS_CJS.includes(module);
}
function tsModuleKindIsESM(module) {
  _assertNumber(module);
  return TS_MODULE_KIND_IS_ESM.includes(module);
}
function isModuleKindName(module) {
  return typeof module === 'string' && module in EnumModuleKind;
}
function toModuleKindName(module) {
  let name;
  if (isModuleKindName(module)) {
    name = module;
  } else {
    name = EnumModuleKind[handleModuleKindLazy(module)];
    _assertString(name);
  }
  return name;
}
function handleModuleKindLazy(module) {
  if (typeof module === 'string') {
    if (/^\d+$/.test(module)) {
      module = parseInt(module);
    } else {
      module = valueFromRecord.valueFromRecord(module, EnumModuleKind);
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
function tsModuleKindType(module) {
  if (tsModuleKindIsCJS(module)) {
    return "cjs";
  } else if (tsModuleKindIsESM(module)) {
    return "esm";
  }
}
function tsModuleKindExt(module) {
  if (tsModuleKindIsCJS(module)) {
    return ".cjs";
  } else if (tsModuleKindIsESM(module)) {
    return ".mjs";
  }
}
function tsModuleKindLazy(module) {
  return tsModuleKindType(handleModuleKindLazy(module));
}
function getExtensionsByCompilerOptions(options) {
  const tsExtensions = ['.ts'];
  const jsExtensions = [];
  const module = handleModuleKindLazy(options.module);
  const useESM = tsModuleKindIsESM(module);
  const useCJS = !useESM && tsModuleKindIsCJS(module);
  if (options.jsx) tsExtensions.push('.tsx');
  if (useESM) tsExtensions.push('.mts');else if (useCJS) tsExtensions.push('.cts');
  if (options.allowJs) {
    jsExtensions.push('.js');
    if (options.jsx) jsExtensions.push('.jsx');
    if (useESM) tsExtensions.push('.mjs');else if (useCJS) tsExtensions.push('.cjs');
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
exports.isModuleKindName = isModuleKindName;
exports.toModuleKindName = toModuleKindName;
exports.tsModuleKindExt = tsModuleKindExt;
exports.tsModuleKindIsCJS = tsModuleKindIsCJS;
exports.tsModuleKindIsCJSLazy = tsModuleKindIsCJSLazy;
exports.tsModuleKindIsESM = tsModuleKindIsESM;
exports.tsModuleKindIsESMLazy = tsModuleKindIsESMLazy;
exports.tsModuleKindLazy = tsModuleKindLazy;
exports.tsModuleKindType = tsModuleKindType;
//# sourceMappingURL=index.cjs.development.cjs.map
