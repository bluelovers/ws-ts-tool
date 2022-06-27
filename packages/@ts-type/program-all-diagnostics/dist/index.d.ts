import { Diagnostic, EmitResult, Program } from 'typescript';

export declare function getAllDiagnostics(program: Program, emitResult: EmitResult): Diagnostic[];
export declare function forEachDiagnostics<T>(allDiagnostics: Diagnostic[], cb: (diagnostic: Diagnostic, message: string) => T): T[];

export {};
