"use strict";
/**
 * Created by user on 2020/5/27.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitTsFiles = exports.spawnEmitTsFiles = exports.handleOptions = exports.tsconfigToProgram = exports.tsconfigToCliArgs = void 0;
// @ts-ignore
const ts = __importStar(require("typescript"));
const cross_spawn_extra_1 = __importDefault(require("cross-spawn-extra"));
const path_1 = require("path");
// @ts-ignore
const typescript_1 = require("typescript");
const value_from_record_1 = __importDefault(require("value-from-record"));
const get_current_tsconfig_1 = __importDefault(require("get-current-tsconfig"));
const logger_1 = __importDefault(require("debug-color2/logger"));
function tsconfigToCliArgs(compilerOptions) {
    let args = Object.entries(compilerOptions)
        .reduce((a, [key, value]) => {
        if (key === 'locale') {
            return a;
        }
        if (typeof value === 'boolean') {
            if (value === true) {
                a.push(`--${key}`);
            }
        }
        else {
            a.push(`--${key}`);
            a.push(value);
        }
        return a;
    }, []);
    return args;
    //return unparse(compilerOptions)
}
exports.tsconfigToCliArgs = tsconfigToCliArgs;
function tsconfigToProgram(compilerOptions) {
    return Object.entries(compilerOptions)
        .reduce((a, [key, value]) => {
        var _a, _b, _c, _d;
        let _skip = false;
        switch (key) {
            case 'jsx':
                value = (_a = value_from_record_1.default(value, typescript_1.JsxEmit)) !== null && _a !== void 0 ? _a : value;
                break;
            case 'module':
                value = (_b = value_from_record_1.default(value, typescript_1.ModuleKind)) !== null && _b !== void 0 ? _b : value;
                break;
            case 'moduleResolution':
                if (value === 'node') {
                    value = typescript_1.ModuleResolutionKind.NodeJs;
                }
                else {
                    _skip = true;
                }
                break;
            case 'newLine':
                if (((_c = value === null || value === void 0 ? void 0 : value.toLowerCase) === null || _c === void 0 ? void 0 : _c.call(value)) === 'lf') {
                    value = typescript_1.NewLineKind.LineFeed;
                    //value = valueFromRecord(value, NewLineKind)
                }
                else {
                    _skip = true;
                }
                break;
            case 'target':
                value = (_d = value_from_record_1.default(value, typescript_1.ScriptTarget)) !== null && _d !== void 0 ? _d : value;
                break;
            case 'incremental':
                _skip = true;
                break;
        }
        if (!_skip) {
            a[key] = value;
        }
        return a;
    }, {});
}
exports.tsconfigToProgram = tsconfigToProgram;
function handleOptions(files, options) {
    var _a;
    let cwd = options === null || options === void 0 ? void 0 : options.cwd;
    if (!Array.isArray(files)) {
        files = [files];
    }
    if (!cwd) {
        cwd = path_1.dirname(files[0]);
    }
    const compilerOptions = (_a = options === null || options === void 0 ? void 0 : options.compilerOptions) !== null && _a !== void 0 ? _a : get_current_tsconfig_1.default(cwd).compilerOptions;
    const bin = (options === null || options === void 0 ? void 0 : options.bin) || 'tsc';
    return {
        files,
        cwd,
        bin,
        compilerOptions,
    };
}
exports.handleOptions = handleOptions;
function spawnEmitTsFiles(inputFiles, options) {
    let { cwd, compilerOptions, files, bin } = handleOptions(inputFiles, options);
    let args = tsconfigToCliArgs(compilerOptions);
    //console.dir(compilerOptions)
    //console.dir(args)
    //console.dir(cwd)
    //console.dir(files)
    let cp = cross_spawn_extra_1.default.sync(bin, [
        ...args,
        `--tsBuildInfoFile`,
        `.`,
        files[0],
    ], {
        cwd,
        stdio: 'inherit',
    });
}
exports.spawnEmitTsFiles = spawnEmitTsFiles;
function emitTsFiles(files, options) {
    var _a;
    let cwd = options === null || options === void 0 ? void 0 : options.cwd;
    if (!Array.isArray(files)) {
        files = [files];
    }
    if (!cwd) {
        cwd = path_1.dirname(path_1.resolve(process.cwd(), files[0]));
    }
    files = files.map(file => path_1.resolve(cwd, file));
    let compilerOptions = tsconfigToProgram((_a = options === null || options === void 0 ? void 0 : options.compilerOptions) !== null && _a !== void 0 ? _a : get_current_tsconfig_1.default(cwd).compilerOptions);
    const program = ts.createProgram(files, compilerOptions);
    const emitResult = program.emit();
    const exitCode = emitResult.emitSkipped ? 1 : 0;
    let print = logger_1.default;
    if (exitCode) {
        print = print.red;
    }
    if (options === null || options === void 0 ? void 0 : options.verbose) {
        const allDiagnostics = ts
            .getPreEmitDiagnostics(program)
            .concat(emitResult.diagnostics);
        allDiagnostics.forEach(diagnostic => {
            if (diagnostic.file) {
                const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
                const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
                print.info(`[Diagnostic]`, `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
            }
            else {
                print.info(`[Diagnostic]`, ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
            }
        });
        print.debug(`[CWD] ${cwd}`);
    }
    if (exitCode) {
        print.error(`[Program] Process exiting with code '${exitCode}'.`);
    }
    //console.log(`Process exiting with code '${exitCode}'.`);
    return {
        cwd,
        files,
        exitCode,
        emitResult,
        compilerOptions,
        program,
    };
}
exports.emitTsFiles = emitTsFiles;
exports.default = emitTsFiles;
//# sourceMappingURL=index.js.map