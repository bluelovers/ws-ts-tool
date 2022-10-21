"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("cross-spawn-extra"), t = require("fs-extra"), r = require("path");

function handleOptions(...e) {
  let t = {};
  if ("object" == typeof e[0] && null !== e[0]) t = e[0]; else {
    let [r, n, s, o] = e;
    t = {
      cwd: r,
      bin: n,
      sourceFile: s,
      extraArgv: o
    };
  }
  return t;
}

function getCurrentTsconfig(...t) {
  const {cwd: r, bin: n, sourceFile: s, extraArgv: o} = handleOptions(...t), u = [ "--showConfig" ];
  null != s && s.length && u.push("-p", s), null != o && o.length && u.push(...o);
  const c = e.sync(n || "tsc", u, {
    cwd: r
  });
  let i = Buffer.concat(c.output.filter((e => e))).toString().replace(/^\s+|\s+$/g, "");
  if (c.status) throw new Error(i);
  const l = JSON.parse(i);
  return delete l.files, l;
}

exports.default = getCurrentTsconfig, exports.getCurrentTsconfig = getCurrentTsconfig, 
exports.handleOptions = handleOptions, exports.outputCurrentTsconfig = function outputCurrentTsconfig(e) {
  var n, s, o, u;
  null !== (s = (n = e = {
    ...e
  }).cwd) && void 0 !== s || (n.cwd = process.cwd()), null !== (u = (o = e).outputFile) && void 0 !== u || (o.outputFile = "tsconfig.json");
  const c = getCurrentTsconfig(e);
  let i = r.resolve(e.cwd, e.outputFile);
  try {
    t.copySync(i, i + ".bak", {
      preserveTimestamps: !0
    });
  } catch (e) {}
  return t.outputJSONSync(i, c, {
    spaces: 2
  }), i;
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
