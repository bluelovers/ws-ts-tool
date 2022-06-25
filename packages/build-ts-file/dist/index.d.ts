import { ITsconfig } from '@ts-type/package-dts/tsconfig-json';
import ts from 'typescript';

export interface IOptions {
	cwd?: string;
	bin?: string;
	sourceFile?: string;
	extraArgv?: string[];
}
export declare function tsconfigToCliArgs(compilerOptions: ITsconfig["compilerOptions"]): string[];
export declare function tsconfigToProgram(compilerOptions: ITsconfig["compilerOptions"]): ts.CompilerOptions;
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
	emitResult: ts.EmitResult;
	compilerOptions: ts.CompilerOptions;
	program: ts.Program;
};
export default emitTsFiles;

export {};
