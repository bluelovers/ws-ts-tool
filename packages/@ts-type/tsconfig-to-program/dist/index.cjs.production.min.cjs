"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("value-from-record"), o = require("typescript");

exports.tsconfigToCliArgs = function tsconfigToCliArgs(e) {
  return Object.entries(e).reduce(((e, [o, r]) => ("locale" === o || ("boolean" == typeof r ? !0 === r && e.push(`--${o}`) : (e.push(`--${o}`), 
  e.push(r))), e)), []);
}, exports.tsconfigToProgram = function tsconfigToProgram(r) {
  return Object.entries(r).reduce(((r, [l, i]) => {
    var t, s, n, u, a, d, c, v;
    let m = !1;
    switch (l) {
     case "jsx":
      i = null !== (t = e.valueFromRecord(i, o.JsxEmit)) && void 0 !== t ? t : i;
      break;

     case "module":
      i = null !== (s = e.valueFromRecord(i, o.ModuleKind)) && void 0 !== s ? s : i;
      break;

     case "moduleResolution":
      "node" === (i = null !== (n = e.valueFromRecord(i, o.ModuleResolutionKind)) && void 0 !== n ? n : i) && (i = o.ModuleResolutionKind.NodeJs);
      break;

     case "moduleDetection":
      i = null !== (u = e.valueFromRecord(i, o.ModuleDetectionKind)) && void 0 !== u ? u : i;
      break;

     case "newLine":
      switch (null === (a = i) || void 0 === a || null === (d = a.toLowerCase) || void 0 === d ? void 0 : d.call(a)) {
       case "lf":
        i = o.NewLineKind.LineFeed;
        break;

       case "crlf":
        i = o.NewLineKind.CarriageReturnLineFeed;
        break;

       default:
        m = !0;
      }
      break;

     case "target":
      i = null !== (c = e.valueFromRecord(i, o.ScriptTarget)) && void 0 !== c ? c : i;
      break;

     case "incremental":
      m = !0;
      break;

     case "importsNotUsedAsValues":
      i = null !== (v = e.valueFromRecord(i, o.ImportsNotUsedAsValues)) && void 0 !== v ? v : i;
    }
    return m || (r[l] = i), r;
  }), {});
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
