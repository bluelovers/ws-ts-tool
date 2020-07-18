#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("debug-color2/logger"));
const yargs_1 = __importDefault(require("yargs"));
const index_1 = require("../index");
let argv = yargs_1.default
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
    .argv;
let file = index_1.outputCurrentTsconfig(argv);
logger_1.default.log(`create tsconfig file: ${file}`);
//# sourceMappingURL=output-tsconfig.js.map