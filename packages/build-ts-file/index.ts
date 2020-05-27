/**
 * Created by user on 2020/5/27.
 */

// @ts-ignore
import * as ts from 'typescript';
import crossSpawn from 'cross-spawn-extra';
import ITsconfig from '@ts-type/package-dts/tsconfig-json';
import { dirname } from 'path';
// @ts-ignore
import unparse from 'yargs-unparser';
// @ts-ignore
import { JsxEmit, ModuleKind, ModuleResolutionKind, NewLineKind, ScriptTarget } from 'typescript';
import valueFromRecord, { keyFromRecord } from 'value-from-record';
import getCurrentTsconfig from 'get-current-tsconfig';

export function tsconfigToCliArgs(compilerOptions: ITsconfig["compilerOptions"]): string[]
{
	let args = Object.entries(compilerOptions)
		.reduce((a, [key, value]) =>
		{

			if (key === 'locale')
			{
				return a
			}

			if (typeof value === 'boolean')
			{
				if (value === true)
				{
					a.push(`--${key}`);
				}
			}
			else
			{
				a.push(`--${key}`);
				a.push(value);
			}

			return a
		}, [])
	;

	return args;
	//return unparse(compilerOptions)
}

export function tsconfigToProgram(compilerOptions: ITsconfig["compilerOptions"])
{
	return Object.entries(compilerOptions)
		.reduce((a, [key, value]) =>
		{

			switch (key as keyof ITsconfig["compilerOptions"])
			{
				case 'jsx':
					value = valueFromRecord(value, JsxEmit)
					break;
				case 'module':
					value = valueFromRecord(value, ModuleKind)
					break;
				case 'moduleResolution':
					value = valueFromRecord(value, ModuleResolutionKind)
					break;
				case 'newLine':
					value = valueFromRecord(value, NewLineKind)
					break;
				case 'target':
					value = valueFromRecord(value, ScriptTarget)
					break;
				case 'incremental':
					return a
					break;
			}

			a[key] = value;

			return a
		}, {} as ts.CompilerOptions)
}

export function handleOptions(files: string | string[], options?: {
	bin?: string,
	cwd?: string,
	compilerOptions?: ITsconfig["compilerOptions"],
})
{
	let cwd = options?.cwd;

	if (!Array.isArray(files))
	{
		files = [files];
	}

	if (!cwd)
	{
		cwd = dirname(files[0])
	}

	const compilerOptions = options?.compilerOptions ?? getCurrentTsconfig(cwd).compilerOptions;

	const bin = options?.bin || 'tsc';

	return {
		files,
		cwd,
		bin,
		compilerOptions,
	}
}

export function spawnEmitTsFiles(inputFiles: string | string[], options?: {
	bin?: string,
	cwd?: string,
	compilerOptions?: ITsconfig["compilerOptions"],
})
{

	let { cwd, compilerOptions, files, bin } = handleOptions(inputFiles, options)

	let args = tsconfigToCliArgs(compilerOptions);

	console.dir(compilerOptions)
	console.dir(args)

	console.dir(cwd)

	console.dir(files)

	let cp = crossSpawn.sync(bin, [
		...args,
		`--tsBuildInfoFile`,
		`.`,
		files[0],
	], {
		cwd,
		stdio: 'inherit',
	})
}

export function emitTsFiles(files: string | string[], options?: {
	cwd?: string,
	compilerOptions?: ITsconfig["compilerOptions"],
})
{
	let cwd = options?.cwd;

	if (!Array.isArray(files))
	{
		files = [files];
	}

	if (!cwd)
	{
		cwd = dirname(files[0])
	}

	let compilerOptions = tsconfigToProgram(options?.compilerOptions ?? getCurrentTsconfig(cwd).compilerOptions);

	let program = ts.createProgram(files, compilerOptions as any);
	let emitResult = program.emit();

	let allDiagnostics = ts
		.getPreEmitDiagnostics(program)
		.concat(emitResult.diagnostics);

	allDiagnostics.forEach(diagnostic =>
	{
		if (diagnostic.file)
		{
			let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
			let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
			console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
		}
		else
		{
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
	}
}

export default emitTsFiles
