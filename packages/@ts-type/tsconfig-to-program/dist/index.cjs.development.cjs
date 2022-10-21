'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var valueFromRecord = require('value-from-record');
var typescript = require('typescript');

function tsconfigToCliArgs(compilerOptions) {
  let args = Object.entries(compilerOptions).reduce((a, [key, value]) => {
    if (key === 'locale') {
      return a;
    }
    if (typeof value === 'boolean') {
      if (value === true) {
        a.push(`--${key}`);
      }
    } else {
      a.push(`--${key}`);
      a.push(value);
    }
    return a;
  }, []);
  return args;
}
function tsconfigToProgram(compilerOptions) {
  return Object.entries(compilerOptions).reduce((a, [key, value]) => {
    var _valueFromRecord, _valueFromRecord2, _valueFromRecord3, _valueFromRecord4, _value, _value$toLowerCase, _valueFromRecord5, _valueFromRecord6;
    let _skip = false;
    switch (key) {
      case 'jsx':
        value = (_valueFromRecord = valueFromRecord.valueFromRecord(value, typescript.JsxEmit)) !== null && _valueFromRecord !== void 0 ? _valueFromRecord : value;
        break;
      case 'module':
        value = (_valueFromRecord2 = valueFromRecord.valueFromRecord(value, typescript.ModuleKind)) !== null && _valueFromRecord2 !== void 0 ? _valueFromRecord2 : value;
        break;
      case 'moduleResolution':
        value = (_valueFromRecord3 = valueFromRecord.valueFromRecord(value, typescript.ModuleResolutionKind)) !== null && _valueFromRecord3 !== void 0 ? _valueFromRecord3 : value;
        if (value === 'node') {
          value = typescript.ModuleResolutionKind.NodeJs;
        }
        break;
      case 'moduleDetection':
        value = (_valueFromRecord4 = valueFromRecord.valueFromRecord(value, typescript.ModuleDetectionKind)) !== null && _valueFromRecord4 !== void 0 ? _valueFromRecord4 : value;
        break;
      case 'newLine':
        switch ((_value = value) === null || _value === void 0 ? void 0 : (_value$toLowerCase = _value.toLowerCase) === null || _value$toLowerCase === void 0 ? void 0 : _value$toLowerCase.call(_value)) {
          case 'lf':
            value = typescript.NewLineKind.LineFeed;
            break;
          case 'crlf':
            value = typescript.NewLineKind.CarriageReturnLineFeed;
            break;
          default:
            _skip = true;
        }
        break;
      case 'target':
        value = (_valueFromRecord5 = valueFromRecord.valueFromRecord(value, typescript.ScriptTarget)) !== null && _valueFromRecord5 !== void 0 ? _valueFromRecord5 : value;
        break;
      case 'incremental':
        _skip = true;
        break;
      case 'importsNotUsedAsValues':
        value = (_valueFromRecord6 = valueFromRecord.valueFromRecord(value, typescript.ImportsNotUsedAsValues)) !== null && _valueFromRecord6 !== void 0 ? _valueFromRecord6 : value;
        break;
    }
    if (!_skip) {
      a[key] = value;
    }
    return a;
  }, {});
}

exports.tsconfigToCliArgs = tsconfigToCliArgs;
exports.tsconfigToProgram = tsconfigToProgram;
//# sourceMappingURL=index.cjs.development.cjs.map
