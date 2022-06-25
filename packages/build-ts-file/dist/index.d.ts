/**
 * Created by user on 2020/5/27.
 */
/// <reference types="node" />
/// <reference types="node" />
import { ITsconfig } from '@ts-type/package-dts/tsconfig-json';
import { IOptions as IGetCurrentTsconfigOptions } from 'get-current-tsconfig';
export interface IOptions {
    bin?: string;
    cwd?: string;
    compilerOptions?: ITsconfig["compilerOptions"];
    getCurrentTsconfigOptions?: IGetCurrentTsconfigOptions;
    verbose?: boolean;
}
export declare function handleOptions(files: string | string[], options?: IOptions): {
    files: string[];
    cwd: string;
    bin: string;
    compilerOptions: ITsconfig["compilerOptions"];
};
export declare function spawnEmitTsFiles(inputFiles: string | string[], options?: IOptions): import("cross-spawn-extra").SpawnSyncReturns<Buffer>;
export declare function emitTsFiles(files: string | string[], options?: IOptions): {
    cwd: string;
    files: string[];
    exitCode: number;
    emitResult: import("typescript").EmitResult;
    compilerOptions: import("typescript").CompilerOptions;
    program: import("typescript").Program;
};
export default emitTsFiles;
