"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputCurrentTsconfig = exports.getCurrentTsconfig = exports.handleOptions = void 0;
const cross_spawn_extra_1 = require("cross-spawn-extra");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
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
function outputCurrentTsconfig(options) {
    var _a, _b;
    options = {
        ...options,
    };
    (_a = options.cwd) !== null && _a !== void 0 ? _a : (options.cwd = process.cwd());
    (_b = options.outputFile) !== null && _b !== void 0 ? _b : (options.outputFile = 'tsconfig.json');
    const newTsconfig = getCurrentTsconfig(options);
    delete newTsconfig.files;
    let outputFile = path_1.resolve(options.cwd, options.outputFile);
    fs_extra_1.outputJSONSync(outputFile, newTsconfig, {
        spaces: 2,
    });
    return outputFile;
}
exports.outputCurrentTsconfig = outputCurrentTsconfig;
exports.default = getCurrentTsconfig;
//# sourceMappingURL=index.js.map