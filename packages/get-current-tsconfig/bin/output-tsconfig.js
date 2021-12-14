#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const logger_1 = tslib_1.__importDefault(require("debug-color2/logger"));
const yargs_1 = tslib_1.__importDefault(require("yargs"));
const index_1 = tslib_1.__importStar(require("../index"));
const argv = yargs_1.default
    .option(`cwd`, {
    alias: [
        'c',
    ],
    string: true,
    normalize: true,
})
    .option(`bin`, {
    string: true,
    normalize: true,
})
    .option(`sourceFile`, {
    alias: [
        's',
    ],
    string: true,
    normalize: true,
})
    .option(`outputFile`, {
    alias: [
        'o',
    ],
    string: true,
    normalize: true,
})
    .option(`print`, {
    alias: [
        'p',
    ],
    boolean: true,
    default: true,
})
    .parseSync();
if (argv.print) {
    let json = (0, index_1.default)(argv);
    console.log(JSON.stringify(json, null, 2));
}
else {
    let file = (0, index_1.outputCurrentTsconfig)(argv);
    logger_1.default.success(`outpput tsconfig to file: ${file}`);
}
//# sourceMappingURL=output-tsconfig.js.map