import { createProgram as i, getPreEmitDiagnostics as t, flattenDiagnosticMessageText as e } from "typescript";

import { sync as o } from "cross-spawn-extra";

import { dirname as r, resolve as n } from "path";

import { getCurrentTsconfig as s } from "get-current-tsconfig";

import { consoleLogger as l } from "debug-color2/logger";

import { tsconfigToCliArgs as c, tsconfigToProgram as p } from "@ts-type/tsconfig-to-program/src/index";

function handleOptions(i, t) {
  var e;
  let o = null == t ? void 0 : t.cwd;
  Array.isArray(i) || (i = [ i ]), o || (o = r(i[0]));
  const n = null !== (e = null == t ? void 0 : t.compilerOptions) && void 0 !== e ? e : s({
    ...null == t ? void 0 : t.getCurrentTsconfigOptions,
    cwd: o
  }).compilerOptions;
  return {
    files: i,
    cwd: o,
    bin: (null == t ? void 0 : t.bin) || "tsc",
    compilerOptions: n
  };
}

function spawnEmitTsFiles(i, t) {
  let {cwd: e, compilerOptions: r, files: n, bin: s} = handleOptions(i, t), l = c(r);
  return o(s, [ ...l, "--tsBuildInfoFile", ".", n[0] ], {
    cwd: e,
    stdio: "inherit"
  });
}

function emitTsFiles(o, c) {
  var d, m;
  let a = null == c ? void 0 : c.cwd;
  Array.isArray(o) || (o = [ o ]), a || (a = r(n(process.cwd(), o[0]))), o = o.map((i => n(a, i)));
  let f = null !== (d = null == c ? void 0 : c.getCurrentTsconfigOptions) && void 0 !== d ? d : {}, u = p(null !== (m = null == c ? void 0 : c.compilerOptions) && void 0 !== m ? m : s({
    ...f,
    cwd: a
  }).compilerOptions);
  const g = i(o, u), v = g.emit(), w = v.emitSkipped ? 1 : 0;
  let O = l;
  return w && (O = O.red), null != c && c.verbose && (t(g).concat(v.diagnostics).forEach((i => {
    let t = e(i.messageText, "\n");
    if (i.file) {
      const {line: e, character: o} = i.file.getLineAndCharacterOfPosition(i.start);
      t = `${i.file.fileName} (${e + 1},${o + 1}): ${t}`;
    }
    O.info("[Diagnostic]", t);
  })), O.debug(`[CWD] ${a}`)), w && O.error(`[Program] Process exiting with code '${w}'.`), 
  {
    cwd: a,
    files: o,
    exitCode: w,
    emitResult: v,
    compilerOptions: u,
    program: g
  };
}

export { emitTsFiles as default, emitTsFiles, handleOptions, spawnEmitTsFiles };
//# sourceMappingURL=index.esm.mjs.map
