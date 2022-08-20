#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const yargs_1 = tslib_1.__importDefault(require("yargs"));
const get_current_tsconfig_1 = require("get-current-tsconfig");
const bluebird_1 = require("@bluelovers/fast-glob/bluebird");
const __1 = require("../");
const logger_1 = require("debug-color2/logger");
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
    .option(`project`, {
    desc: `Compile the project given the path to its configuration file, or to a folder with a 'tsconfig.json'.`,
    alias: [
        'p',
    ],
    normalize: true,
})
    .option(`module`, {
    desc: `Specify what module code is generated.`,
    alias: [
        'm',
    ],
    string: true,
})
    .option(`declaration`, {
    desc: `Generate .d.ts files from TypeScript and JavaScript files in your project.`,
    alias: [
        'd',
    ],
    boolean: true,
})
    .option(`emitDeclarationOnly`, {
    desc: `Only output d.ts files and not JavaScript files.`,
    boolean: true,
})
    .command({
    command: 'tsconfig',
    aliases: [
        'config',
        'conf',
    ],
    handler(args) {
        var _a, _b, _c;
        logger_1.consoleLogger.dir((0, get_current_tsconfig_1.getCurrentTsconfig)({
            // @ts-ignore
            cwd: args.cwd,
            // @ts-ignore
            sourceFile: args.project,
            extraArgv: [
                // @ts-ignore
                ((_a = args.module) === null || _a === void 0 ? void 0 : _a.length) && `-m ${args.module}`,
                // @ts-ignore
                ((_b = args.declaration) === null || _b === void 0 ? void 0 : _b.length) && `--declaration`,
                // @ts-ignore
                ((_c = args.emitDeclarationOnly) === null || _c === void 0 ? void 0 : _c.length) && `--emitDeclarationOnly`,
            ].filter(v => v === null || v === void 0 ? void 0 : v.length)
        }));
    },
})
    .command({
    command: '$0',
    // @ts-ignore
    handler(args) {
        var _a, _b, _c;
        if (!args._.length) {
            yargs_1.default.showHelp();
            yargs_1.default.exit(1, new Error(`file list is empty`));
            return;
        }
        let ignore = Array.isArray(args.ignore) ? args.ignore : [args.ignore];
        let verbose = args.verbose;
        // @ts-ignore
        let cwd = args.cwd || process.cwd();
        let getCurrentTsconfigOptions = {
            // @ts-ignore
            cwd: args.cwd,
            // @ts-ignore
            sourceFile: args.project,
            extraArgv: [
                // @ts-ignore
                ((_a = args.module) === null || _a === void 0 ? void 0 : _a.length) && `-m ${args.module}`,
                // @ts-ignore
                ((_b = args.declaration) === null || _b === void 0 ? void 0 : _b.length) && `--declaration`,
                // @ts-ignore
                ((_c = args.emitDeclarationOnly) === null || _c === void 0 ? void 0 : _c.length) && `--emitDeclarationOnly`,
            ].filter(v => v === null || v === void 0 ? void 0 : v.length)
        };
        return (0, bluebird_1.async)([
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
            verbose && logger_1.consoleLogger.debug(`emit:`, file);
            let ret = (0, __1.emitTsFiles)(file, {
                cwd: args.cwd,
                verbose,
                getCurrentTsconfigOptions,
            });
            if (ret.exitCode) {
                logger_1.consoleLogger.error(`error:`, file);
            }
            else {
                logger_1.consoleLogger.success(`success:`, file);
            }
        });
    },
})
    .showHelpOnFail(true)
    .help()
    .version()
    .argv;
//# sourceMappingURL=bts.cjs.map