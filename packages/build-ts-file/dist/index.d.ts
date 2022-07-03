/**
 * Created by user on 2020/5/27.
 */
/// <reference types="node" />
/// <reference types="node" />
import { ITsconfig } from '@ts-type/package-dts/tsconfig-json';
import { IOptions as IGetCurrentTsconfigOptions } from 'get-current-tsconfig';
import { Console2 } from 'debug-color2';
export interface IOptions {
    bin?: string;
    cwd?: string;
    compilerOptions?: ITsconfig["compilerOptions"];
    getCurrentTsconfigOptions?: IGetCurrentTsconfigOptions;
    verbose?: boolean;
    compilerHost?: import("typescript").CompilerHost | ((programCompilerOptions: import("typescript").CompilerOptions) => import("typescript").CompilerHost);
    overwriteCompilerOptions?: ITsconfig["compilerOptions"];
    logger?: Console2;
}
export declare function handleOptions(files: string | string[], options?: IOptions): IOptions & {
    files: string[];
    cwd: string;
    bin: string;
    compilerOptions: ITsconfig["compilerOptions"];
};
export declare function spawnEmitTsFiles(inputFiles: string | string[], options?: IOptions): import("cross-spawn-extra").SpawnSyncReturns<Buffer>;
/**
 * @see https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API
 */
export declare function emitTsFiles(inputFiles: string | string[], options?: IOptions): {
    cwd: string;
    files: string[];
    exitCode: number;
    emitResult: import("typescript").EmitResult;
    compilerOptions: ITsconfig["compilerOptions"];
    programCompilerOptions: import("typescript").CompilerOptions;
    program: import("typescript").Program;
    compilerHost: import("typescript").CompilerHost;
};
export default emitTsFiles;
