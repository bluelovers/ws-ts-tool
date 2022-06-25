(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('value-from-record'), require('typescript')) :
	typeof define === 'function' && define.amd ? define(['exports', 'value-from-record', 'typescript'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Index = {}, global.valueFromRecord, global.typescript));
})(this, (function (exports, valueFromRecord, typescript) { 'use strict';

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
	    var _valueFromRecord, _valueFromRecord2, _value, _value$toLowerCase, _valueFromRecord3;

	    let _skip = false;

	    switch (key) {
	      case 'jsx':
	        value = (_valueFromRecord = valueFromRecord.valueFromRecord(value, typescript.JsxEmit)) !== null && _valueFromRecord !== void 0 ? _valueFromRecord : value;
	        break;

	      case 'module':
	        value = (_valueFromRecord2 = valueFromRecord.valueFromRecord(value, typescript.ModuleKind)) !== null && _valueFromRecord2 !== void 0 ? _valueFromRecord2 : value;
	        break;

	      case 'moduleResolution':
	        if (value === 'node' || value === 'nodenext') {
	          value = typescript.ModuleResolutionKind.NodeJs;
	        } else {
	          _skip = true;
	        }

	        break;

	      case 'newLine':
	        if (((_value = value) === null || _value === void 0 ? void 0 : (_value$toLowerCase = _value.toLowerCase) === null || _value$toLowerCase === void 0 ? void 0 : _value$toLowerCase.call(_value)) === 'lf') {
	          value = typescript.NewLineKind.LineFeed;
	        } else {
	          _skip = true;
	        }

	        break;

	      case 'target':
	        value = (_valueFromRecord3 = valueFromRecord.valueFromRecord(value, typescript.ScriptTarget)) !== null && _valueFromRecord3 !== void 0 ? _valueFromRecord3 : value;
	        break;

	      case 'incremental':
	        _skip = true;
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

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.development.cjs.map
