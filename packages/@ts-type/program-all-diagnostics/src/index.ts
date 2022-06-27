/**
 * Created by user on 2022/6/27.
 */
import { Program, EmitResult, getPreEmitDiagnostics, Diagnostic, flattenDiagnosticMessageText } from 'typescript';

export function getAllDiagnostics(program: Program, emitResult: EmitResult)
{
	return getPreEmitDiagnostics(program)
		.concat(emitResult.diagnostics)
}

export function forEachDiagnostics<T>(allDiagnostics: Diagnostic[], cb: (diagnostic: Diagnostic, message: string) => T)
{
	return allDiagnostics.map(diagnostic =>
	{
		let message = flattenDiagnosticMessageText(diagnostic.messageText, "\n");

		if (diagnostic.file)
		{
			const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);

			message = `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
		}

		return cb(diagnostic, message)
	});
}
