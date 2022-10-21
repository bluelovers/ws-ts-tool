#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("debug-color2/logger");
const yargs_1 = __importDefault(require("yargs"));
const __1 = require("../");
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
    let json = (0, __1.getCurrentTsconfig)(argv);
    console.log(JSON.stringify(json, null, 2));
}
else {
    let file = (0, __1.outputCurrentTsconfig)(argv);
    logger_1.consoleLogger.success(`outpput tsconfig to file: ${file}`);
}
//# sourceMappingURL=output-tsconfig.cjs.map