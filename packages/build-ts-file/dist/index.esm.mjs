import { createProgram as i } from "typescript";

import { sync as o } from "cross-spawn-extra";

import { dirname as t, resolve as e } from "path";

import { getCurrentTsconfig as r } from "get-current-tsconfig";

import { consoleLogger as s } from "debug-color2/logger";

import { tsconfigToCliArgs as n, tsconfigToProgram as p } from "@ts-type/tsconfig-to-program";

import { getAllDiagnostics as l, forEachDiagnostics as c } from "@ts-type/program-all-diagnostics";

function handleOptions(i, o) {
  var s, n, p;
  null !== (s = o) && void 0 !== s || (o = {});
  let l = o.cwd;
  Array.isArray(i) || (i = [ i ]), l || (l = t(e(process.cwd(), i[0])));
  const c = null !== (n = o.tsconfig) && void 0 !== n ? n : r({
    ...o.getCurrentTsconfigOptions,
    cwd: l
  });
  let m = null !== (p = o.compilerOptions) && void 0 !== p ? p : null == c ? void 0 : c.compilerOptions;
  o.overwriteCompilerOptions && (m = {
    ...m,
    ...o.overwriteCompilerOptions
  });
  const f = o.bin || "tsc";
  return {
    ...o,
    files: i,
    cwd: l,
    bin: f,
    tsconfig: c,
    compilerOptions: m
  };
}

function spawnEmitTsFiles(i, t) {
  let {cwd: e, compilerOptions: r, files: s, bin: p} = handleOptions(i, t), l = n(r);
  return o(p, [ ...l, "--tsBuildInfoFile", ".", s[0] ], {
    cwd: e,
    stdio: "inherit"
  });
}

function emitTsFiles(o, t) {
  let {cwd: r, tsconfig: n, compilerOptions: m, files: f, logger: d, verbose: a, compilerHost: g} = handleOptions(o, t);
  f = f.map((i => e(r, i)));
  const u = p(m);
  "function" == typeof g && (g = g(u, n));
  const w = i(f, u, g), O = w.emit(), v = O.emitSkipped ? 1 : 0;
  let h = null != d ? d : s;
  if (v && (h = h.red), a) {
    const i = l(w, O);
    c(i, ((i, o) => {
      h.info("[Diagnostic]", o);
    })), h.debug(`[CWD] ${r}`);
  }
  return v && h.error(`[Program] Process exiting with code '${v}'.`), {
    cwd: r,
    files: f,
    exitCode: v,
    emitResult: O,
    tsconfig: n,
    compilerOptions: m,
    programCompilerOptions: u,
    program: w,
    compilerHost: g
  };
}

export { emitTsFiles as default, emitTsFiles, handleOptions, spawnEmitTsFiles };
//# sourceMappingURL=index.esm.mjs.map
