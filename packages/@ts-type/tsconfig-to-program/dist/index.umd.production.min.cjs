!function(e, o) {
  "object" == typeof exports && "undefined" != typeof module ? o(exports, require("value-from-record"), require("typescript")) : "function" == typeof define && define.amd ? define([ "exports", "value-from-record", "typescript" ], o) : o((e = "undefined" != typeof globalThis ? globalThis : e || self).TsTypeTsconfigToProgram = {}, e.valueFromRecord, e.typescript);
}(this, (function(e, o, r) {
  "use strict";
  e.tsconfigToCliArgs = function tsconfigToCliArgs(e) {
    return Object.entries(e).reduce(((e, [o, r]) => ("locale" === o || ("boolean" == typeof r ? !0 === r && e.push(`--${o}`) : (e.push(`--${o}`), 
    e.push(r))), e)), []);
  }, e.tsconfigToProgram = function tsconfigToProgram(e) {
    return Object.entries(e).reduce(((e, [i, t]) => {
      var n, l, s, u, d, a, c, f;
      let p = !1;
      switch (i) {
       case "jsx":
        t = null !== (n = o.valueFromRecord(t, r.JsxEmit)) && void 0 !== n ? n : t;
        break;

       case "module":
        t = null !== (l = o.valueFromRecord(t, r.ModuleKind)) && void 0 !== l ? l : t;
        break;

       case "moduleResolution":
        "node" === (t = null !== (s = o.valueFromRecord(t, r.ModuleResolutionKind)) && void 0 !== s ? s : t) && (t = r.ModuleResolutionKind.NodeJs);
        break;

       case "moduleDetection":
        t = null !== (u = o.valueFromRecord(t, r.ModuleDetectionKind)) && void 0 !== u ? u : t;
        break;

       case "newLine":
        switch (null === (d = t) || void 0 === d || null === (a = d.toLowerCase) || void 0 === a ? void 0 : a.call(d)) {
         case "lf":
          t = r.NewLineKind.LineFeed;
          break;

         case "crlf":
          t = r.NewLineKind.CarriageReturnLineFeed;
          break;

         default:
          p = !0;
        }
        break;

       case "target":
        t = null !== (c = o.valueFromRecord(t, r.ScriptTarget)) && void 0 !== c ? c : t;
        break;

       case "incremental":
        p = !0;
        break;

       case "importsNotUsedAsValues":
        t = null !== (f = o.valueFromRecord(t, r.ImportsNotUsedAsValues)) && void 0 !== f ? f : t;
      }
      return p || (e[i] = t), e;
    }), {});
  }, Object.defineProperty(e, "__esModule", {
    value: !0
  });
}));
//# sourceMappingURL=index.umd.production.min.cjs.map
