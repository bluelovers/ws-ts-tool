'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var crossSpawnExtra = require('cross-spawn-extra');
var fsExtra = require('fs-extra');
var path = require('path');

function handleOptions(...argv) {
  let options = {};

  if (typeof argv[0] === 'object' && argv[0] !== null) {
    options = argv[0];
  } else {
    let [cwd, bin, sourceFile, extraArgv] = argv;
    options = {
      cwd,
      bin,
      sourceFile,
      extraArgv
    };
  }

  return options;
}
function getCurrentTsconfig(...argv) {
  const {
    cwd,
    bin,
    sourceFile,
    extraArgv
  } = handleOptions(...argv);
  const binArgv = [`--showConfig`];

  if (sourceFile !== null && sourceFile !== void 0 && sourceFile.length) {
    binArgv.push('-p', sourceFile);
  }

  if (extraArgv !== null && extraArgv !== void 0 && extraArgv.length) {
    binArgv.push(...extraArgv);
  }

  const cp = crossSpawnExtra.sync(bin || 'tsc', binArgv, {
    cwd
  });
  let msg = Buffer.concat(cp.output.filter(v => v)).toString().replace(/^\s+|\s+$/g, '');

  if (cp.status) {
    throw new Error(msg);
  }

  const newTsconfig = JSON.parse(msg);
  delete newTsconfig.files;
  return newTsconfig;
}
function outputCurrentTsconfig(options) {
  var _options, _options$cwd, _options2, _options2$outputFile;

  options = { ...options
  };
  (_options$cwd = (_options = options).cwd) !== null && _options$cwd !== void 0 ? _options$cwd : _options.cwd = process.cwd();
  (_options2$outputFile = (_options2 = options).outputFile) !== null && _options2$outputFile !== void 0 ? _options2$outputFile : _options2.outputFile = 'tsconfig.json';
  const newTsconfig = getCurrentTsconfig(options);
  let outputFile = path.resolve(options.cwd, options.outputFile);

  try {
    fsExtra.copySync(outputFile, outputFile + '.bak', {
      preserveTimestamps: true
    });
  } catch (e) {}

  fsExtra.outputJSONSync(outputFile, newTsconfig, {
    spaces: 2
  });
  return outputFile;
}

exports["default"] = getCurrentTsconfig;
exports.getCurrentTsconfig = getCurrentTsconfig;
exports.handleOptions = handleOptions;
exports.outputCurrentTsconfig = outputCurrentTsconfig;
//# sourceMappingURL=index.cjs.development.cjs.map
