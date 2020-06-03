/**
 * Created by user on 2020/5/27.
 */
import * as ts from 'typescript';
import ITsconfig from '@ts-type/package-dts/tsconfig-json';
export declare function tsconfigToCliArgs(compilerOptions: ITsconfig["compilerOptions"]): string[];
export declare function tsconfigToProgram(compilerOptions: ITsconfig["compilerOptions"]): ts.CompilerOptions;
export declare function handleOptions(files: string | string[], options?: {
    bin?: string;
    cwd?: string;
    compilerOptions?: ITsconfig["compilerOptions"];
}): {
    files: string[];
    cwd: string;
    bin: string;
    compilerOptions: {
        [k: string]: any;
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
        module?: "commonjs" | "amd" | "umd" | "system" | "es6" | "es2015" | "esnext" | "none" | {
            [k: string]: any;
        };
        newLine?: "CRLF" | "LF" | {
            [k: string]: any;
        };
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
        target?: "es6" | "es2015" | "esnext" | "es3" | "es5" | "es2016" | "es2017" | "es2018" | {
            [k: string]: any;
        };
        watch?: boolean;
        experimentalDecorators?: boolean;
        emitDecoratorMetadata?: boolean;
        moduleResolution?: "node" | "classic" | {
            [k: string]: any;
        };
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
            [k: string]: any;
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
        lib?: ("es6" | "es2015" | "esnext" | "es5" | "es2016" | "es2017" | "es2018" | "es7" | "dom" | "dom.iterable" | "webworker" | "scripthost" | "es2015.core" | "es2015.collection" | "es2015.generator" | "es2015.iterable" | "es2015.promise" | "es2015.proxy" | "es2015.reflect" | "es2015.symbol" | "es2015.symbol.wellknown" | "es2016.array.include" | "es2017.object" | "es2017.intl" | "es2017.sharedmemory" | "es2017.string" | "es2017.typedarrays" | "es2018.intl" | "es2018.promise" | "es2018.regexp" | "esnext.asynciterable" | "esnext.array" | "esnext.intl" | "esnext.symbol")[];
        strictNullChecks?: boolean;
        maxNodeModuleJsDepth?: number;
        importHelpers?: boolean;
        jsxFactory?: string;
        alwaysStrict?: boolean;
        strict?: boolean;
        strictBindCallApply?: boolean;
        downlevelIteration?: boolean;
        checkJs?: boolean;
        strictFunctionTypes?: boolean;
        strictPropertyInitialization?: boolean;
        esModuleInterop?: boolean;
        keyofStringsOnly?: boolean;
        declarationMap?: boolean;
        resolveJsonModule?: boolean;
    };
};
export declare function spawnEmitTsFiles(inputFiles: string | string[], options?: {
    bin?: string;
    cwd?: string;
    compilerOptions?: ITsconfig["compilerOptions"];
}): void;
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
