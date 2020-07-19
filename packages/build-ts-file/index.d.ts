/**
 * Created by user on 2020/5/27.
 */
import * as ts from 'typescript';
import ITsconfig from '@ts-type/package-dts/tsconfig-json';
import { IOptions as IGetCurrentTsconfigOptions } from 'get-current-tsconfig';
export declare function tsconfigToCliArgs(compilerOptions: ITsconfig["compilerOptions"]): string[];
export declare function tsconfigToProgram(compilerOptions: ITsconfig["compilerOptions"]): ts.CompilerOptions;
export interface IOptions {
    bin?: string;
    cwd?: string;
    compilerOptions?: ITsconfig["compilerOptions"];
    getCurrentTsconfigOptions?: IGetCurrentTsconfigOptions;
}
export declare function handleOptions(files: string | string[], options?: IOptions): {
    files: string[];
    cwd: string;
    bin: string;
    compilerOptions: {
        [k: string]: unknown;
        charset?: string;
        composite?: boolean;
        declaration?: boolean;
        declarationDir?: string;
        diagnostics?: boolean;
        emitBOM?: boolean;
        emitDeclarationOnly?: boolean;
        incremental?: boolean;
        tsBuildInfoFile?: string;
        inlineSourceMap?: boolean;
        inlineSources?: boolean;
        jsx?: "preserve" | "react" | "react-native";
        reactNamespace?: string;
        listFiles?: boolean;
        mapRoot?: string;
        module?: {
            [k: string]: unknown;
        } | "CommonJS" | "AMD" | "System" | "UMD" | "ES6" | "ES2015" | "ES2020" | "ESNext" | "None";
        newLine?: {
            [k: string]: unknown;
        } | "crlf" | "lf";
        noEmit?: boolean;
        noEmitHelpers?: boolean;
        noEmitOnError?: boolean;
        noImplicitAny?: boolean;
        noImplicitThis?: boolean;
        noUnusedLocals?: boolean;
        noUnusedParameters?: boolean;
        noLib?: boolean;
        noResolve?: boolean;
        noStrictGenericChecks?: boolean;
        skipDefaultLibCheck?: boolean;
        skipLibCheck?: boolean;
        outFile?: string;
        outDir?: string;
        preserveConstEnums?: boolean;
        preserveSymlinks?: boolean;
        preserveWatchOutput?: boolean;
        pretty?: boolean;
        removeComments?: boolean;
        rootDir?: string;
        isolatedModules?: boolean;
        sourceMap?: boolean;
        sourceRoot?: string;
        suppressExcessPropertyErrors?: boolean;
        suppressImplicitAnyIndexErrors?: boolean;
        stripInternal?: boolean;
        target?: "ES6" | "ES2015" | "ES2020" | "ESNext" | {
            [k: string]: unknown;
        } | "ES3" | "ES5" | "ES2016" | "ES2017" | "ES2018" | "ES2019";
        watch?: boolean;
        experimentalDecorators?: boolean;
        emitDecoratorMetadata?: boolean;
        moduleResolution?: {
            [k: string]: unknown;
        } | "Classic" | "Node";
        allowUnusedLabels?: boolean;
        noImplicitReturns?: boolean;
        noFallthroughCasesInSwitch?: boolean;
        allowUnreachableCode?: boolean;
        forceConsistentCasingInFileNames?: boolean;
        baseUrl?: string;
        paths?: {
            [k: string]: string[];
        };
        plugins?: {
            [k: string]: unknown;
            name?: string;
        }[];
        rootDirs?: string[];
        typeRoots?: string[];
        types?: string[];
        traceResolution?: boolean;
        allowJs?: boolean;
        noErrorTruncation?: boolean;
        allowSyntheticDefaultImports?: boolean;
        noImplicitUseStrict?: boolean;
        listEmittedFiles?: boolean;
        disableSizeLimit?: boolean;
        lib?: ("ES6" | "ES2015" | "ES2020" | "ESNext" | "ES5" | "ES2016" | "ES2017" | "ES2018" | "ES2019" | {
            [k: string]: unknown;
        } | {
            [k: string]: unknown;
        } | {
            [k: string]: unknown;
        } | {
            [k: string]: unknown;
        } | {
            [k: string]: unknown;
        } | {
            [k: string]: unknown;
        } | {
            [k: string]: unknown;
        } | {
            [k: string]: unknown;
        } | {
            [k: string]: unknown;
        } | {
            [k: string]: unknown;
        } | {
            [k: string]: unknown;
        } | "ES2015.Collection" | "ES2015.Core" | "ES2015.Generator" | "ES2015.Iterable" | "ES2015.Promise" | "ES2015.Proxy" | "ES2015.Reflect" | "ES2015.Symbol.WellKnown" | "ES2015.Symbol" | "ES2016.Array.Include" | "ES2017.Intl" | "ES2017.Object" | "ES2017.SharedMemory" | "ES2017.String" | "ES2017.TypedArrays" | "ES2018.AsyncGenerator" | "ES2018.AsyncIterable" | "ES2018.Intl" | "ES2018.Promise" | "ES2018.Regexp" | "ES2019.Array" | "ES2019.Object" | "ES2019.String" | "ES2019.Symbol" | "ES2020.BigInt" | "ES2020.Promise" | "ES2020.String" | "ES2020.Symbol.WellKnown" | "ESNext.Array" | "ESNext.AsyncIterable" | "ESNext.BigInt" | "ESNext.Intl" | "ESNext.Promise" | "ESNext.String" | "ESNext.Symbol" | "DOM" | "DOM.Iterable" | "ScriptHost" | "WebWorker" | "WebWorker.ImportScripts")[];
        strictNullChecks?: boolean;
        maxNodeModuleJsDepth?: number;
        importHelpers?: boolean;
        importsNotUsedAsValues?: "error" | "preserve" | "remove";
        jsxFactory?: string;
        jsxFragmentFactory?: string;
        alwaysStrict?: boolean;
        strict?: boolean;
        strictBindCallApply?: boolean;
        downlevelIteration?: boolean;
        checkJs?: boolean;
        strictFunctionTypes?: boolean;
        strictPropertyInitialization?: boolean;
        esModuleInterop?: boolean;
        allowUmdGlobalAccess?: boolean;
        keyofStringsOnly?: boolean;
        useDefineForClassFields?: boolean;
        declarationMap?: boolean;
        resolveJsonModule?: boolean;
        assumeChangesOnlyAffectDirectDependencies?: boolean;
    };
};
export declare function spawnEmitTsFiles(inputFiles: string | string[], options?: IOptions): void;
export declare function emitTsFiles(files: string | string[], options?: {
    cwd?: string;
    compilerOptions?: ITsconfig["compilerOptions"];
    verbose?: boolean;
}): {
    cwd: string;
    files: string[];
    exitCode: number;
    emitResult: ts.EmitResult;
    compilerOptions: ts.CompilerOptions;
    program: ts.Program;
};
export default emitTsFiles;
