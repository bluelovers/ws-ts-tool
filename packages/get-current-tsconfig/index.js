"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentTsconfig = void 0;
const cross_spawn_extra_1 = __importDefault(require("cross-spawn-extra"));
function getCurrentTsconfig(cwd, bin) {
    let cp = cross_spawn_extra_1.default.sync(bin || 'tsc', [
        `--showConfig`,
    ], {
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