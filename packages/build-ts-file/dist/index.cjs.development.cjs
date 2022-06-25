'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var typescript = require('typescript');
var crossSpawnExtra = require('cross-spawn-extra');
var path = require('path');
var getCurrentTsconfig = require('get-current-tsconfig');
var logger = require('debug-color2/logger');
var index = require('@ts-type/tsconfig-to-program/src/index');

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
  let args = index.tsconfigToCliArgs(compilerOptions);
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
  let compilerOptions = index.tsconfigToProgram((_options$compilerOpti2 = options === null || options === void 0 ? void 0 : options.compilerOptions) !== null && _options$compilerOpti2 !== void 0 ? _options$compilerOpti2 : getCurrentTsconfig.getCurrentTsconfig({ ...getCurrentTsconfigOptions,
    cwd
  }).compilerOptions);
  const program = typescript.createProgram(files, compilerOptions);
  const emitResult = program.emit();
  const exitCode = emitResult.emitSkipped ? 1 : 0;
  let print = logger.consoleLogger;

  if (exitCode) {
    print = print.red;
  }

  if (options !== null && options !== void 0 && options.verbose) {
    const allDiagnostics = typescript.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
    allDiagnostics.forEach(diagnostic => {
      let message = typescript.flattenDiagnosticMessageText(diagnostic.messageText, "\n");

      if (diagnostic.file) {
        const {
          line,
          character
        } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        message = `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`;
      }

      print.info(`[Diagnostic]`, message);
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
//# sourceMappingURL=index.cjs.development.cjs.map
