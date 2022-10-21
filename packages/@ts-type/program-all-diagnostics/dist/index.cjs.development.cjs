'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var typescript = require('typescript');

function getAllDiagnostics(program, emitResult) {
  return typescript.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
}
function forEachDiagnostics(allDiagnostics, cb) {
  return allDiagnostics.map(diagnostic => {
    let message = typescript.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
    if (diagnostic.file) {
      const {
        line,
        character
      } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      message = `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`;
    }
    return cb(diagnostic, message);
  });
}

exports.forEachDiagnostics = forEachDiagnostics;
exports.getAllDiagnostics = getAllDiagnostics;
//# sourceMappingURL=index.cjs.development.cjs.map
