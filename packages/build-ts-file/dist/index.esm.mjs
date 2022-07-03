import { createProgram as i } from "typescript";

import { sync as o } from "cross-spawn-extra";

import { dirname as t, resolve as e } from "path";

import { getCurrentTsconfig as r } from "get-current-tsconfig";

import { consoleLogger as s } from "debug-color2/logger";

import { tsconfigToCliArgs as n, tsconfigToProgram as p } from "@ts-type/tsconfig-to-program";

import { getAllDiagnostics as l, forEachDiagnostics as m } from "@ts-type/program-all-diagnostics";

function handleOptions(i, o) {
  var s, n;
  null !== (s = o) && void 0 !== s || (o = {});
  let p = o.cwd;
  Array.isArray(i) || (i = [ i ]), p || (p = t(e(process.cwd(), i[0])));
  let l = null !== (n = o.compilerOptions) && void 0 !== n ? n : r({
    ...o.getCurrentTsconfigOptions,
    cwd: p
  }).compilerOptions;
  o.overwriteCompilerOptions && (l = {
    ...l,
    ...o.overwriteCompilerOptions
  });
  const m = o.bin || "tsc";
  return {
    ...o,
    files: i,
    cwd: p,
    bin: m,
    compilerOptions: l
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
  let {cwd: r, compilerOptions: n, files: c, logger: d, verbose: a, compilerHost: f} = handleOptions(o, t);
  c = c.map((i => e(r, i)));
  const g = p(n);
  "function" == typeof f && (f = f(g));
  const u = i(c, g, f), w = u.emit(), O = w.emitSkipped ? 1 : 0;
  let h = null != d ? d : s;
  if (O && (h = h.red), a) {
    const i = l(u, w);
    m(i, ((i, o) => {
      h.info("[Diagnostic]", o);
    })), h.debug(`[CWD] ${r}`);
  }
  return O && h.error(`[Program] Process exiting with code '${O}'.`), {
    cwd: r,
    files: c,
    exitCode: O,
    emitResult: w,
    compilerOptions: n,
    programCompilerOptions: g,
    program: u,
    compilerHost: f
  };
}

export { emitTsFiles as default, emitTsFiles, handleOptions, spawnEmitTsFiles };
//# sourceMappingURL=index.esm.mjs.map
