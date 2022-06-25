import { sync as t } from "cross-spawn-extra";

import { copySync as e, outputJSONSync as r } from "fs-extra";

import { resolve as n } from "path";

function handleOptions(...t) {
  let e = {};
  if ("object" == typeof t[0] && null !== t[0]) e = t[0]; else {
    let [r, n, o, s] = t;
    e = {
      cwd: r,
      bin: n,
      sourceFile: o,
      extraArgv: s
    };
  }
  return e;
}

function getCurrentTsconfig(...e) {
  const {cwd: r, bin: n, sourceFile: o, extraArgv: s} = handleOptions(...e), u = [ "--showConfig" ];
  null != o && o.length && u.push("-p", o), null != s && s.length && u.push(...s);
  const c = t(n || "tsc", u, {
    cwd: r
  });
  let i = Buffer.concat(c.output.filter((t => t))).toString().replace(/^\s+|\s+$/g, "");
  if (c.status) throw new Error(i);
  const l = JSON.parse(i);
  return delete l.files, l;
}

function outputCurrentTsconfig(t) {
  var o, s, u, c;
  null !== (s = (o = t = {
    ...t
  }).cwd) && void 0 !== s || (o.cwd = process.cwd()), null !== (c = (u = t).outputFile) && void 0 !== c || (u.outputFile = "tsconfig.json");
  const i = getCurrentTsconfig(t);
  let l = n(t.cwd, t.outputFile);
  try {
    e(l, l + ".bak", {
      preserveTimestamps: !0
    });
  } catch (t) {}
  return r(l, i, {
    spaces: 2
  }), l;
}

export { getCurrentTsconfig as default, getCurrentTsconfig, handleOptions, outputCurrentTsconfig };
//# sourceMappingURL=index.esm.mjs.map
