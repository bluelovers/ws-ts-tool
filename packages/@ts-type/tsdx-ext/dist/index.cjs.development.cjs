'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

exports.EnumTsdxFormat = void 0;
(function (EnumTsdxFormat) {
  EnumTsdxFormat["cjs"] = "cjs";
  EnumTsdxFormat["umd"] = "umd";
  EnumTsdxFormat["esm"] = "esm";
  EnumTsdxFormat["system"] = "system";
})(exports.EnumTsdxFormat || (exports.EnumTsdxFormat = {}));
function defaultFormatOrder() {
  return ["esm", "cjs", "umd"];
}
function getExtensionsByFormat(currentFormat) {
  return [...(currentFormat === "cjs" ? ['.cts'] : currentFormat === "esm" ? ['.mts'] : currentFormat === "umd" ? ['.umd.ts'] : []), '.ts', '.tsx', ...(currentFormat === "cjs" || currentFormat === "esm" ? [] : ['.mts', '.cts']), '.jsx', ...(currentFormat === "cjs" ? ['.cjs'] : currentFormat === "esm" ? ['.mjs'] : currentFormat === "umd" ? ['.umd.js'] : []), '.js', ...(currentFormat === "cjs" || currentFormat === "esm" ? [] : ['.mjs', '.cjs']), '.js'];
}

exports["default"] = getExtensionsByFormat;
exports.defaultFormatOrder = defaultFormatOrder;
exports.getExtensionsByFormat = getExtensionsByFormat;
//# sourceMappingURL=index.cjs.development.cjs.map
