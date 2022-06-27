import { getPreEmitDiagnostics as t, flattenDiagnosticMessageText as i } from "typescript";

function getAllDiagnostics(i, e) {
  return t(i).concat(e.diagnostics);
}

function forEachDiagnostics(t, e) {
  return t.map((t => {
    let n = i(t.messageText, "\n");
    if (t.file) {
      const {line: i, character: e} = t.file.getLineAndCharacterOfPosition(t.start);
      n = `${t.file.fileName} (${i + 1},${e + 1}): ${n}`;
    }
    return e(t, n);
  }));
}

export { forEachDiagnostics, getAllDiagnostics };
//# sourceMappingURL=index.esm.mjs.map
