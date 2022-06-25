import { valueFromRecord as e } from "value-from-record";

import { ScriptTarget as o, NewLineKind as r, ModuleResolutionKind as n, ModuleKind as t, JsxEmit as i } from "typescript";

function tsconfigToCliArgs(e) {
  return Object.entries(e).reduce(((e, [o, r]) => ("locale" === o || ("boolean" == typeof r ? !0 === r && e.push(`--${o}`) : (e.push(`--${o}`), 
  e.push(r))), e)), []);
}

function tsconfigToProgram(l) {
  return Object.entries(l).reduce(((l, [s, c]) => {
    var a, u, d, f, m;
    let g = !1;
    switch (s) {
     case "jsx":
      c = null !== (a = e(c, i)) && void 0 !== a ? a : c;
      break;

     case "module":
      c = null !== (u = e(c, t)) && void 0 !== u ? u : c;
      break;

     case "moduleResolution":
      "node" === c || "nodenext" === c ? c = n.NodeJs : g = !0;
      break;

     case "newLine":
      "lf" === (null === (d = c) || void 0 === d || null === (f = d.toLowerCase) || void 0 === f ? void 0 : f.call(d)) ? c = r.LineFeed : g = !0;
      break;

     case "target":
      c = null !== (m = e(c, o)) && void 0 !== m ? m : c;
      break;

     case "incremental":
      g = !0;
    }
    return g || (l[s] = c), l;
  }), {});
}

export { tsconfigToCliArgs, tsconfigToProgram };
//# sourceMappingURL=index.esm.mjs.map
