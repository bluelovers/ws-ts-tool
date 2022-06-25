'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ts = require('typescript');
var crossSpawnExtra = require('cross-spawn-extra');
var path = require('path');
var valueFromRecord = require('value-from-record');
var getCurrentTsconfig = require('get-current-tsconfig');
var logger = require('debug-color2/logger');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ts__default = /*#__PURE__*/_interopDefaultLegacy(ts);

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
        value = (_valueFromRecord = valueFromRecord.valueFromRecord(value, ts.JsxEmit)) !== null && _valueFromRecord !== void 0 ? _valueFromRecord : value;
        break;

      case 'module':
        value = (_valueFromRecord2 = valueFromRecord.valueFromRecord(value, ts.ModuleKind)) !== null && _valueFromRecord2 !== void 0 ? _valueFromRecord2 : value;
        break;

      case 'moduleResolution':
        if (value === 'node' || value === 'nodenext') {
          value = ts.ModuleResolutionKind.NodeJs;
        } else {
          _skip = true;
        }

        break;

      case 'newLine':
        if (((_value = value) === null || _value === void 0 ? void 0 : (_value$toLowerCase = _value.toLowerCase) === null || _value$toLowerCase === void 0 ? void 0 : _value$toLowerCase.call(_value)) === 'lf') {
          value = ts.NewLineKind.LineFeed;
        } else {
          _skip = true;
        }

        break;

      case 'target':
        value = (_valueFromRecord3 = valueFromRecord.valueFromRecord(value, ts.ScriptTarget)) !== null && _valueFromRecord3 !== void 0 ? _valueFromRecord3 : value;
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
function handleOptions(files, options) {
  var _options$compilerOpti;

  let cwd = options === null || options === void 0 ? void 0 : options.cwd;

  if (!Array.isArray(files)) {
    files = [files];
  }

  if (!cwd) {
    cwd = path.dirname(files[0]);
  }

  const compilerOptions = (_options$compilerOpti = options === null || options === void 0 ? void 0 : options.compilerOptions) !== null && _options$compilerOpti !== void 0 ? _options$compilerOpti : getCurrentTsconfig.getCurrentTsconfig({ ...(options === null || options === void 0 ? void 0 : options.getCurrentTsconfigOptions),
    cwd
  }).compilerOptions;
  const bin = (options === null || options === void 0 ? void 0 : options.bin) || 'tsc';
  return {
    files,
    cwd,
    bin,
    compilerOptions
  };
}
function spawnEmitTsFiles(inputFiles, options) {
  let {
    cwd,
    compilerOptions,
    files,
    bin
  } = handleOptions(inputFiles, options);
  let args = tsconfigToCliArgs(compilerOptions);
  let cp = crossSpawnExtra.sync(bin, [...args, `--tsBuildInfoFile`, `.`, files[0]], {
    cwd,
    stdio: 'inherit'
  });
  return cp;
}
function emitTsFiles(files, options) {
  var _options$getCurrentTs, _options$compilerOpti2;

  let cwd = options === null || options === void 0 ? void 0 : options.cwd;

  if (!Array.isArray(files)) {
    files = [files];
  }

  if (!cwd) {
    cwd = path.dirname(path.resolve(process.cwd(), files[0]));
  }

  files = files.map(file => path.resolve(cwd, file));
  let getCurrentTsconfigOptions = (_options$getCurrentTs = options === null || options === void 0 ? void 0 : options.getCurrentTsconfigOptions) !== null && _options$getCurrentTs !== void 0 ? _options$getCurrentTs : {};
  let compilerOptions = tsconfigToProgram((_options$compilerOpti2 = options === null || options === void 0 ? void 0 : options.compilerOptions) !== null && _options$compilerOpti2 !== void 0 ? _options$compilerOpti2 : getCurrentTsconfig.getCurrentTsconfig({ ...getCurrentTsconfigOptions,
    cwd
  }).compilerOptions);
  const program = ts__default["default"].createProgram(files, compilerOptions);
  const emitResult = program.emit();
  const exitCode = emitResult.emitSkipped ? 1 : 0;
  let print = logger.consoleLogger;

  if (exitCode) {
    print = print.red;
  }

  if (options !== null && options !== void 0 && options.verbose) {
    const allDiagnostics = ts__default["default"].getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
    allDiagnostics.forEach(diagnostic => {
      if (diagnostic.file) {
        const {
          line,
          character
        } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        const message = ts__default["default"].flattenDiagnosticMessageText(diagnostic.messageText, "\n");
        print.info(`[Diagnostic]`, `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
      } else {
        print.info(`[Diagnostic]`, ts__default["default"].flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
      }
    });
    print.debug(`[CWD] ${cwd}`);
  }

  if (exitCode) {
    print.error(`[Program] Process exiting with code '${exitCode}'.`);
  }

  return {
    cwd,
    files,
    exitCode,
    emitResult,
    compilerOptions,
    program
  };
}

exports["default"] = emitTsFiles;
exports.emitTsFiles = emitTsFiles;
exports.handleOptions = handleOptions;
exports.spawnEmitTsFiles = spawnEmitTsFiles;
exports.tsconfigToCliArgs = tsconfigToCliArgs;
exports.tsconfigToProgram = tsconfigToProgram;
//# sourceMappingURL=index.cjs.development.cjs.map
