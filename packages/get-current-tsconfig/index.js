"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentTsconfig = exports.handleOptions = void 0;
const cross_spawn_extra_1 = require("cross-spawn-extra");
function handleOptions(...argv) {
    let options = {};
    if (typeof argv[0] === 'object' && argv[0] !== null) {
        options = argv[0];
    }
    else {
        let [cwd, bin, sourceFile, extraArgv] = argv;
        options = {
            // @ts-ignore
            cwd,
            bin,
            sourceFile,
            extraArgv,
        };
    }
    return options;
}
exports.handleOptions = handleOptions;
function getCurrentTsconfig(...argv) {
    const { cwd, bin, sourceFile, extraArgv } = handleOptions(...argv);
    const binArgv = [
        `--showConfig`,
    ];
    if (sourceFile === null || sourceFile === void 0 ? void 0 : sourceFile.length) {
        binArgv.push('-p', sourceFile);
    }
    if (extraArgv === null || extraArgv === void 0 ? void 0 : extraArgv.length) {
        binArgv.push(...extraArgv);
    }
    const cp = cross_spawn_extra_1.sync(bin || 'tsc', binArgv, {
        cwd,
    });
    // @ts-ignore
    let msg = Buffer.concat(cp.output.filter(v => v)).toString().replace(/^\s+|\s+$/g, '');
    if (cp.status) {
        throw new Error(msg);
    }
    return JSON.parse(msg);
}
exports.getCurrentTsconfig = getCurrentTsconfig;
exports.default = getCurrentTsconfig;
//# sourceMappingURL=index.js.map