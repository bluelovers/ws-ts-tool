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
  return o.overwriteCompilerOptions && (l = {
    ...l,
    ...o.overwriteCompilerOptions
  }), {
    files: i,
    cwd: p,
    bin: o.bin || "tsc",
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
  var r;
  null !== (r = t) && void 0 !== r || (t = {});
  let {cwd: n, compilerOptions: c, files: d} = handleOptions(o, t);
  d = d.map((i => e(n, i)));
  const a = p(c);
  let {compilerHost: f} = t;
  "function" == typeof f && (f = f(a));
  const g = i(d, a, f), u = g.emit(), w = u.emitSkipped ? 1 : 0;
  let O = s;
  if (w && (O = O.red), t.verbose) {
    const i = l(g, u);
    m(i, ((i, o) => {
      O.info("[Diagnostic]", o);
    })), O.debug(`[CWD] ${n}`);
  }
  return w && O.error(`[Program] Process exiting with code '${w}'.`), {
    cwd: n,
    files: d,
    exitCode: w,
    emitResult: u,
    compilerOptions: c,
    programCompilerOptions: a,
    program: g,
    compilerHost: f
  };
}

export { emitTsFiles as default, emitTsFiles, handleOptions, spawnEmitTsFiles };
//# sourceMappingURL=index.esm.mjs.map
