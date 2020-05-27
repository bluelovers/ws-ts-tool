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
        switch (key) {
            case 'jsx':
                value = value_from_record_1.default(value, typescript_1.JsxEmit);
                break;
            case 'module':
                value = value_from_record_1.default(value, typescript_1.ModuleKind);
                break;
            case 'moduleResolution':
                value = value_from_record_1.default(value, typescript_1.ModuleResolutionKind);
                break;
            case 'newLine':
                value = value_from_record_1.default(value, typescript_1.NewLineKind);
                break;
            case 'target':
                value = value_from_record_1.default(value, typescript_1.ScriptTarget);
                break;
            case 'incremental':
                return a;
                break;
        }
        a[key] = value;
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
    console.dir(compilerOptions);
    console.dir(args);
    console.dir(cwd);
    console.dir(files);
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
        cwd = path_1.dirname(files[0]);
    }
    let compilerOptions = tsconfigToProgram((_a = options === null || options === void 0 ? void 0 : options.compilerOptions) !== null && _a !== void 0 ? _a : get_current_tsconfig_1.default(cwd).compilerOptions);
    let program = ts.createProgram(files, compilerOptions);
    let emitResult = program.emit();
    let allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);
    allDiagnostics.forEach(diagnostic => {
        if (diagnostic.file) {
            let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
            let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        }
        else {
            console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        }
    });
    let exitCode = emitResult.emitSkipped ? 1 : 0;
    //console.log(`Process exiting with code '${exitCode}'.`);
    return {
        cwd,
        files,
        exitCode,
        emitResult,
        compilerOptions,
    };
}
exports.emitTsFiles = emitTsFiles;
exports.default = emitTsFiles;
//# sourceMappingURL=index.js.map