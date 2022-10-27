'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

exports.EnumTsdxFormat = void 0;
(function (EnumTsdxFormat) {
  EnumTsdxFormat["cjs"] = "cjs";
  EnumTsdxFormat["umd"] = "umd";
  EnumTsdxFormat["esm"] = "esm";
  EnumTsdxFormat["system"] = "system";
})(exports.EnumTsdxFormat || (exports.EnumTsdxFormat = {}));
const allowFormat = /*#__PURE__*/defaultAllowedFormat();
const cacheFormatExt = /*#__PURE__*/new Map();
function defaultFormatOrder() {
  return ["esm", "cjs", "umd"];
}
function defaultAllowedFormat() {
  return ["esm", "cjs", "umd", "system"];
}
function isAllowedFormat(format) {
  return allowFormat.includes(format);
}
function _getExtensionsByFormat(currentFormat) {
  const list = [...(currentFormat === "cjs" ? ['.cts'] : currentFormat === "esm" ? ['.mts'] : currentFormat === "umd" ? ['.umd.ts'] : []), '.ts', '.tsx', ...(currentFormat === "cjs" || currentFormat === "esm" ? [] : ['.mts', '.cts']), '.jsx', ...(currentFormat === "cjs" ? ['.cjs'] : currentFormat === "esm" ? ['.mjs'] : currentFormat === "umd" ? ['.umd.js'] : []), '.js', ...(currentFormat === "cjs" || currentFormat === "esm" ? [] : ['.mjs', '.cjs']), '.js'];
  return list;
}
function getExtensionsByFormat(currentFormat) {
  var _list;
  let list = cacheFormatExt.get(currentFormat);
  if (!((_list = list) !== null && _list !== void 0 && _list.length)) {
    if (!isAllowedFormat(currentFormat)) {
      throw new RangeError(`Invalid format ${currentFormat}`);
    }
    list = _getExtensionsByFormat(currentFormat);
    cacheFormatExt.set(currentFormat, list);
  }
  return list.slice();
}

exports._getExtensionsByFormat = _getExtensionsByFormat;
exports.default = getExtensionsByFormat;
exports.defaultAllowedFormat = defaultAllowedFormat;
exports.defaultFormatOrder = defaultFormatOrder;
exports.getExtensionsByFormat = getExtensionsByFormat;
exports.isAllowedFormat = isAllowedFormat;
//# sourceMappingURL=index.cjs.development.cjs.map
