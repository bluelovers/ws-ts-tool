import { valueFromRecord as e } from "value-from-record";

import { ImportsNotUsedAsValues as o, ScriptTarget as r, NewLineKind as l, ModuleDetectionKind as a, ModuleResolutionKind as t, ModuleKind as i, JsxEmit as n } from "typescript";

function tsconfigToCliArgs(e) {
  return Object.entries(e).reduce(((e, [o, r]) => ("locale" === o || ("boolean" == typeof r ? !0 === r && e.push(`--${o}`) : (e.push(`--${o}`), 
  e.push(r))), e)), []);
}

function tsconfigToProgram(s) {
  return Object.entries(s).reduce(((s, [c, u]) => {
    var d, f, b, m, v, g, p, k;
    let h = !1;
    switch (c) {
     case "jsx":
      u = null !== (d = e(u, n)) && void 0 !== d ? d : u;
      break;

     case "module":
      u = null !== (f = e(u, i)) && void 0 !== f ? f : u;
      break;

     case "moduleResolution":
      "node" === (u = null !== (b = e(u, t)) && void 0 !== b ? b : u) && (u = t.NodeJs);
      break;

     case "moduleDetection":
      u = null !== (m = e(u, a)) && void 0 !== m ? m : u;
      break;

     case "newLine":
      switch (null === (v = u) || void 0 === v || null === (g = v.toLowerCase) || void 0 === g ? void 0 : g.call(v)) {
       case "lf":
        u = l.LineFeed;
        break;

       case "crlf":
        u = l.CarriageReturnLineFeed;
        break;

       default:
        h = !0;
      }
      break;

     case "target":
      u = null !== (p = e(u, r)) && void 0 !== p ? p : u;
      break;

     case "incremental":
      h = !0;
      break;

     case "importsNotUsedAsValues":
      u = null !== (k = e(u, o)) && void 0 !== k ? k : u;
    }
    return h || (s[c] = u), s;
  }), {});
}

export { tsconfigToCliArgs, tsconfigToProgram };
//# sourceMappingURL=index.esm.mjs.map
