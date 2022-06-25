import e, { ScriptTarget as i, NewLineKind as o, ModuleResolutionKind as t, ModuleKind as n, JsxEmit as r } from "typescript";

import { sync as s } from "cross-spawn-extra";

import { dirname as l, resolve as c } from "path";

import { valueFromRecord as a } from "value-from-record";

import { getCurrentTsconfig as d } from "get-current-tsconfig";

import { consoleLogger as u } from "debug-color2/logger";

function tsconfigToCliArgs(e) {
  return Object.entries(e).reduce(((e, [i, o]) => ("locale" === i || ("boolean" == typeof o ? !0 === o && e.push(`--${i}`) : (e.push(`--${i}`), 
  e.push(o))), e)), []);
}

function tsconfigToProgram(e) {
  return Object.entries(e).reduce(((e, [s, l]) => {
    var c, d, u, m, p;
    let f = !1;
    switch (s) {
     case "jsx":
      l = null !== (c = a(l, r)) && void 0 !== c ? c : l;
      break;

     case "module":
      l = null !== (d = a(l, n)) && void 0 !== d ? d : l;
      break;

     case "moduleResolution":
      "node" === l || "nodenext" === l ? l = t.NodeJs : f = !0;
      break;

     case "newLine":
      "lf" === (null === (u = l) || void 0 === u || null === (m = u.toLowerCase) || void 0 === m ? void 0 : m.call(u)) ? l = o.LineFeed : f = !0;
      break;

     case "target":
      l = null !== (p = a(l, i)) && void 0 !== p ? p : l;
      break;

     case "incremental":
      f = !0;
    }
    return f || (e[s] = l), e;
  }), {});
}

function handleOptions(e, i) {
  var o;
  let t = null == i ? void 0 : i.cwd;
  Array.isArray(e) || (e = [ e ]), t || (t = l(e[0]));
  const n = null !== (o = null == i ? void 0 : i.compilerOptions) && void 0 !== o ? o : d({
    ...null == i ? void 0 : i.getCurrentTsconfigOptions,
    cwd: t
  }).compilerOptions;
  return {
    files: e,
    cwd: t,
    bin: (null == i ? void 0 : i.bin) || "tsc",
    compilerOptions: n
  };
}

function spawnEmitTsFiles(e, i) {
  let {cwd: o, compilerOptions: t, files: n, bin: r} = handleOptions(e, i), l = tsconfigToCliArgs(t);
  return s(r, [ ...l, "--tsBuildInfoFile", ".", n[0] ], {
    cwd: o,
    stdio: "inherit"
  });
}

function emitTsFiles(i, o) {
  var t, n;
  let r = null == o ? void 0 : o.cwd;
  Array.isArray(i) || (i = [ i ]), r || (r = l(c(process.cwd(), i[0]))), i = i.map((e => c(r, e)));
  let s = null !== (t = null == o ? void 0 : o.getCurrentTsconfigOptions) && void 0 !== t ? t : {}, a = tsconfigToProgram(null !== (n = null == o ? void 0 : o.compilerOptions) && void 0 !== n ? n : d({
    ...s,
    cwd: r
  }).compilerOptions);
  const m = e.createProgram(i, a), p = m.emit(), f = p.emitSkipped ? 1 : 0;
  let g = u;
  return f && (g = g.red), null != o && o.verbose && (e.getPreEmitDiagnostics(m).concat(p.diagnostics).forEach((i => {
    if (i.file) {
      const {line: o, character: t} = i.file.getLineAndCharacterOfPosition(i.start), n = e.flattenDiagnosticMessageText(i.messageText, "\n");
      g.info("[Diagnostic]", `${i.file.fileName} (${o + 1},${t + 1}): ${n}`);
    } else g.info("[Diagnostic]", e.flattenDiagnosticMessageText(i.messageText, "\n"));
  })), g.debug(`[CWD] ${r}`)), f && g.error(`[Program] Process exiting with code '${f}'.`), 
  {
    cwd: r,
    files: i,
    exitCode: f,
    emitResult: p,
    compilerOptions: a,
    program: m
  };
}

export { emitTsFiles as default, emitTsFiles, handleOptions, spawnEmitTsFiles, tsconfigToCliArgs, tsconfigToProgram };
//# sourceMappingURL=index.esm.mjs.map
