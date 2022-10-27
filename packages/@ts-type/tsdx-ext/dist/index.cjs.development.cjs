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
function defaultAllowedFormat() {
  return ["esm", "cjs", "umd", "system"];
}
const allowFormat = /*#__PURE__*/defaultAllowedFormat();
function isAllowedFormat(format) {
  return allowFormat.includes(format);
}
function getExtensionsByFormat(currentFormat) {
  return [...(currentFormat === "cjs" ? ['.cts'] : currentFormat === "esm" ? ['.mts'] : currentFormat === "umd" ? ['.umd.ts'] : []), '.ts', '.tsx', ...(currentFormat === "cjs" || currentFormat === "esm" ? [] : ['.mts', '.cts']), '.jsx', ...(currentFormat === "cjs" ? ['.cjs'] : currentFormat === "esm" ? ['.mjs'] : currentFormat === "umd" ? ['.umd.js'] : []), '.js', ...(currentFormat === "cjs" || currentFormat === "esm" ? [] : ['.mjs', '.cjs']), '.js'];
}

exports.default = getExtensionsByFormat;
exports.defaultAllowedFormat = defaultAllowedFormat;
exports.defaultFormatOrder = defaultFormatOrder;
exports.getExtensionsByFormat = getExtensionsByFormat;
exports.isAllowedFormat = isAllowedFormat;
//# sourceMappingURL=index.cjs.development.cjs.map
