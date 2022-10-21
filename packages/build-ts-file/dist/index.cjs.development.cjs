'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var typescript = require('typescript');
var crossSpawnExtra = require('cross-spawn-extra');
var path = require('path');
var getCurrentTsconfig = require('get-current-tsconfig');
var logger = require('debug-color2/logger');
var tsconfigToProgram = require('@ts-type/tsconfig-to-program');
var programAllDiagnostics = require('@ts-type/program-all-diagnostics');

function handleOptions(files, options) {
  var _options, _options$tsconfig, _options$compilerOpti;
  (_options = options) !== null && _options !== void 0 ? _options : options = {};
  let cwd = options.cwd;
  if (!Array.isArray(files)) {
    files = [files];
  }
  if (!cwd) {
    cwd = path.dirname(path.resolve(process.cwd(), files[0]));
  }
  const tsconfig = (_options$tsconfig = options.tsconfig) !== null && _options$tsconfig !== void 0 ? _options$tsconfig : getCurrentTsconfig.getCurrentTsconfig({
    ...options.getCurrentTsconfigOptions,
    cwd
  });
  let compilerOptions = (_options$compilerOpti = options.compilerOptions) !== null && _options$compilerOpti !== void 0 ? _options$compilerOpti : tsconfig === null || tsconfig === void 0 ? void 0 : tsconfig.compilerOptions;
  if (options.overwriteCompilerOptions) {
    compilerOptions = {
      ...compilerOptions,
      ...options.overwriteCompilerOptions
    };
  }
  const bin = options.bin || 'tsc';
  return {
    ...options,
    files,
    cwd,
    bin,
    tsconfig,
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
  let args = tsconfigToProgram.tsconfigToCliArgs(compilerOptions);
  let cp = crossSpawnExtra.sync(bin, [...args, `--tsBuildInfoFile`, `.`, files[0]], {
    cwd,
    stdio: 'inherit'
  });
  return cp;
}
function emitTsFiles(inputFiles, options) {
  let {
    cwd,
    tsconfig,
    compilerOptions,
    files,
    logger: logger$1,
    verbose,
    compilerHost
  } = handleOptions(inputFiles, options);
  files = files.map(file => path.resolve(cwd, file));
  const programCompilerOptions = tsconfigToProgram.tsconfigToProgram(compilerOptions);
  if (typeof compilerHost === 'function') {
    compilerHost = compilerHost(programCompilerOptions, tsconfig);
  }
  const program = typescript.createProgram(files, programCompilerOptions, compilerHost);
  const emitResult = program.emit();
  const exitCode = emitResult.emitSkipped ? 1 : 0;
  let print = logger$1 !== null && logger$1 !== void 0 ? logger$1 : logger.consoleLogger;
  if (exitCode) {
    print = print.red;
  }
  if (verbose) {
    const allDiagnostics = programAllDiagnostics.getAllDiagnostics(program, emitResult);
    programAllDiagnostics.forEachDiagnostics(allDiagnostics, (_diagnostic, message) => {
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
    tsconfig,
    compilerOptions,
    programCompilerOptions,
    program,
    compilerHost
  };
}

exports["default"] = emitTsFiles;
exports.emitTsFiles = emitTsFiles;
exports.handleOptions = handleOptions;
exports.spawnEmitTsFiles = spawnEmitTsFiles;
//# sourceMappingURL=index.cjs.development.cjs.map
