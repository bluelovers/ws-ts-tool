"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("typescript"), i = require("cross-spawn-extra"), o = require("path"), t = require("get-current-tsconfig"), r = require("debug-color2/logger"), s = require("@ts-type/tsconfig-to-program"), n = require("@ts-type/program-all-diagnostics");

function handleOptions(e, i) {
  var r, s, n;
  null !== (r = i) && void 0 !== r || (i = {});
  let l = i.cwd;
  Array.isArray(e) || (e = [ e ]), l || (l = o.dirname(o.resolve(process.cwd(), e[0])));
  const c = null !== (s = i.tsconfig) && void 0 !== s ? s : t.getCurrentTsconfig({
    ...i.getCurrentTsconfigOptions,
    cwd: l
  });
  let p = null !== (n = i.compilerOptions) && void 0 !== n ? n : null == c ? void 0 : c.compilerOptions;
  i.overwriteCompilerOptions && (p = {
    ...p,
    ...i.overwriteCompilerOptions
  });
  const g = i.bin || "tsc";
  return {
    ...i,
    files: e,
    cwd: l,
    bin: g,
    tsconfig: c,
    compilerOptions: p
  };
}

function emitTsFiles(i, t) {
  let {cwd: l, tsconfig: c, compilerOptions: p, files: g, logger: a, verbose: d, compilerHost: u} = handleOptions(i, t);
  g = g.map((e => o.resolve(l, e)));
  const m = s.tsconfigToProgram(p);
  "function" == typeof u && (u = u(m, c));
  const f = e.createProgram(g, m, u), O = f.emit(), w = O.emitSkipped ? 1 : 0;
  let v = null != a ? a : r.consoleLogger;
  if (w && (v = v.red), d) {
    const e = n.getAllDiagnostics(f, O);
    n.forEachDiagnostics(e, ((e, i) => {
      v.info("[Diagnostic]", i);
    })), v.debug(`[CWD] ${l}`);
  }
  return w && v.error(`[Program] Process exiting with code '${w}'.`), {
    cwd: l,
    files: g,
    exitCode: w,
    emitResult: O,
    tsconfig: c,
    compilerOptions: p,
    programCompilerOptions: m,
    program: f,
    compilerHost: u
  };
}

exports.default = emitTsFiles, exports.emitTsFiles = emitTsFiles, exports.handleOptions = handleOptions, 
exports.spawnEmitTsFiles = function spawnEmitTsFiles(e, o) {
  let {cwd: t, compilerOptions: r, files: n, bin: l} = handleOptions(e, o), c = s.tsconfigToCliArgs(r);
  return i.sync(l, [ ...c, "--tsBuildInfoFile", ".", n[0] ], {
    cwd: t,
    stdio: "inherit"
  });
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
