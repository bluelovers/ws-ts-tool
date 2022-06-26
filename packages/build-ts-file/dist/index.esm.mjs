import { createProgram as i, getPreEmitDiagnostics as e, flattenDiagnosticMessageText as t } from "typescript";

import { sync as o } from "cross-spawn-extra";

import { dirname as r, resolve as s } from "path";

import { getCurrentTsconfig as n } from "get-current-tsconfig";

import { consoleLogger as l } from "debug-color2/logger";

import { tsconfigToCliArgs as p, tsconfigToProgram as c } from "@ts-type/tsconfig-to-program";

function handleOptions(i, e) {
  var t, o;
  null !== (t = e) && void 0 !== t || (e = {});
  let l = e.cwd;
  Array.isArray(i) || (i = [ i ]), l || (l = r(s(process.cwd(), i[0])));
  let p = null !== (o = e.compilerOptions) && void 0 !== o ? o : n({
    ...e.getCurrentTsconfigOptions,
    cwd: l
  }).compilerOptions;
  return e.overwriteCompilerOptions && (p = {
    ...p,
    ...e.overwriteCompilerOptions
  }), {
    files: i,
    cwd: l,
    bin: e.bin || "tsc",
    compilerOptions: p
  };
}

function spawnEmitTsFiles(i, e) {
  let {cwd: t, compilerOptions: r, files: s, bin: n} = handleOptions(i, e), l = p(r);
  return o(n, [ ...l, "--tsBuildInfoFile", ".", s[0] ], {
    cwd: t,
    stdio: "inherit"
  });
}

function emitTsFiles(o, r) {
  var n;
  null !== (n = r) && void 0 !== n || (r = {});
  let {cwd: p, compilerOptions: m, files: a} = handleOptions(o, r);
  a = a.map((i => s(p, i)));
  const f = c(m);
  let {compilerHost: d} = r;
  "function" == typeof d && (d = d(f));
  const g = i(a, f, d), u = g.emit(), O = u.emitSkipped ? 1 : 0;
  let w = l;
  return O && (w = w.red), r.verbose && (e(g).concat(u.diagnostics).forEach((i => {
    let e = t(i.messageText, "\n");
    if (i.file) {
      const {line: t, character: o} = i.file.getLineAndCharacterOfPosition(i.start);
      e = `${i.file.fileName} (${t + 1},${o + 1}): ${e}`;
    }
    w.info("[Diagnostic]", e);
  })), w.debug(`[CWD] ${p}`)), O && w.error(`[Program] Process exiting with code '${O}'.`), 
  {
    cwd: p,
    files: a,
    exitCode: O,
    emitResult: u,
    compilerOptions: m,
    programCompilerOptions: f,
    program: g,
    compilerHost: d
  };
}

export { emitTsFiles as default, emitTsFiles, handleOptions, spawnEmitTsFiles };
//# sourceMappingURL=index.esm.mjs.map
