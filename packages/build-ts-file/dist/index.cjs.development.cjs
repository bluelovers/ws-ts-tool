'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var typescript = require('typescript');
var crossSpawnExtra = require('cross-spawn-extra');
var path = require('path');
var getCurrentTsconfig = require('get-current-tsconfig');
var logger = require('debug-color2/logger');
var tsconfigToProgram = require('@ts-type/tsconfig-to-program');

function handleOptions(files, options) {
  var _options, _options$compilerOpti;

  (_options = options) !== null && _options !== void 0 ? _options : options = {};
  let cwd = options.cwd;

  if (!Array.isArray(files)) {
    files = [files];
  }

  if (!cwd) {
    cwd = path.dirname(path.resolve(process.cwd(), files[0]));
  }

  let compilerOptions = (_options$compilerOpti = options.compilerOptions) !== null && _options$compilerOpti !== void 0 ? _options$compilerOpti : getCurrentTsconfig.getCurrentTsconfig({ ...options.getCurrentTsconfigOptions,
    cwd
  }).compilerOptions;

  if (options.overwriteCompilerOptions) {
    compilerOptions = { ...compilerOptions,
      ...options.overwriteCompilerOptions
    };
  }

  const bin = options.bin || 'tsc';
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
  let args = tsconfigToProgram.tsconfigToCliArgs(compilerOptions);
  let cp = crossSpawnExtra.sync(bin, [...args, `--tsBuildInfoFile`, `.`, files[0]], {
    cwd,
    stdio: 'inherit'
  });
  return cp;
}
function emitTsFiles(inputFiles, options) {
  var _options2;

  (_options2 = options) !== null && _options2 !== void 0 ? _options2 : options = {};
  let {
    cwd,
    compilerOptions,
    files
  } = handleOptions(inputFiles, options);
  files = files.map(file => path.resolve(cwd, file));
  const programCompilerOptions = tsconfigToProgram.tsconfigToProgram(compilerOptions);
  let {
    compilerHost
  } = options;

  if (typeof compilerHost === 'function') {
    compilerHost = compilerHost(programCompilerOptions);
  }

  const program = typescript.createProgram(files, programCompilerOptions, compilerHost);
  const emitResult = program.emit();
  const exitCode = emitResult.emitSkipped ? 1 : 0;
  let print = logger.consoleLogger;

  if (exitCode) {
    print = print.red;
  }

  if (options.verbose) {
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
