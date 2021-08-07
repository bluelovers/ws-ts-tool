#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const yargs_1 = (0, tslib_1.__importDefault)(require("yargs"));
const get_current_tsconfig_1 = (0, tslib_1.__importDefault)(require("get-current-tsconfig"));
const bluebird_1 = (0, tslib_1.__importDefault)(require("@bluelovers/fast-glob/bluebird"));
const index_1 = (0, tslib_1.__importDefault)(require("../index"));
const logger_1 = (0, tslib_1.__importDefault)(require("debug-color2/logger"));
yargs_1.default
    .option(`cwd`, {
    alias: [
        'c',
    ],
    string: true,
    normalize: true,
})
    .option(`ignore`, {
    alias: [
        'exclude',
        'e',
    ],
    string: true,
    array: true,
    default: [],
})
    .option(`verbose`, {
    boolean: true,
    default: true,
})
    .command({
    command: 'tsconfig',
    aliases: [
        'config',
        'conf',
    ],
    handler(args) {
        logger_1.default.dir((0, get_current_tsconfig_1.default)(args.cwd));
    },
})
    .command({
    command: '$0',
    handler(args) {
        if (!args._.length) {
            yargs_1.default.showHelp();
            yargs_1.default.exit(1, new Error(`file list is empty`));
            return;
        }
        let ignore = Array.isArray(args.ignore) ? args.ignore : [args.ignore];
        let verbose = args.verbose;
        // @ts-ignore
        let cwd = args.cwd || process.cwd();
        return bluebird_1.default
            .async([
            ...args._,
        ], {
            cwd,
            ignore,
            absolute: true,
        })
            .tap(result => {
            if (!result.length) {
                return Promise.reject(`can't match any files`);
            }
        })
            .mapSeries(file => {
            verbose && logger_1.default.debug(`emit:`, file);
            let ret = (0, index_1.default)(file, {
                cwd: args.cwd,
                verbose,
            });
            if (ret.exitCode) {
                logger_1.default.error(`error:`, file);
            }
            else {
                logger_1.default.success(`success:`, file);
            }
        });
    },
})
    .showHelpOnFail(true)
    .help()
    .version()
    .argv;
//# sourceMappingURL=bts.js.map