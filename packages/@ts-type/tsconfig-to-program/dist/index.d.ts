import { ITsconfig } from '@ts-type/package-dts/tsconfig-json';
import { CompilerOptions } from 'typescript';

export declare function tsconfigToCliArgs(compilerOptions: ITsconfig["compilerOptions"]): string[];
/**
 * for `ts.createProgram`
 */
export declare function tsconfigToProgram<T extends CompilerOptions>(compilerOptions: ITsconfig["compilerOptions"]): T;

export {};
