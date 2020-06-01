/**
 * Created by user on 2020/5/27.
 */

// @ts-ignore
import * as ts from 'typescript';
import crossSpawn from 'cross-spawn-extra';
import ITsconfig from '@ts-type/package-dts/tsconfig-json';
import { dirname, resolve } from 'path';
// @ts-ignore
import unparse from 'yargs-unparser';
// @ts-ignore
import { JsxEmit, ModuleKind, ModuleResolutionKind, NewLineKind, ScriptTarget } from 'typescript';
import valueFromRecord, { keyFromRecord } from 'value-from-record';
import getCurrentTsconfig from 'get-current-tsconfig';
import console from 'debug-color2/logger';

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
			let _skip = false;

			switch (key as keyof ITsconfig["compilerOptions"])
			{
				case 'jsx':
					value = valueFromRecord(value, JsxEmit) ?? value
					break;
				case 'module':
					value = valueFromRecord(value, ModuleKind) ?? value
					break;
				case 'moduleResolution':

					if (value === 'node')
					{
						value = ModuleResolutionKind.NodeJs
					}
					else
					{
						_skip = true;
					}

					break;
				case 'newLine':

					if (value?.toLowerCase?.() === 'lf')
					{
						value = NewLineKind.LineFeed
						//value = valueFromRecord(value, NewLineKind)
					}
					else
					{
						_skip = true;
					}

					break;
				case 'target':
					value = valueFromRecord(value, ScriptTarget) ?? value;
					break;
				case 'incremental':
					_skip = true;
					break;
			}

			if (!_skip)
			{
				a[key] = value;
			}

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

	//console.dir(compilerOptions)
	//console.dir(args)
	//console.dir(cwd)
	//console.dir(files)

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
	verbose?: boolean,
})
{
	let cwd = options?.cwd;

	if (!Array.isArray(files))
	{
		files = [files];
	}

	if (!cwd)
	{
		cwd = dirname(resolve(process.cwd(), files[0]))
	}

	files = files.map(file => resolve(cwd, file))

	let compilerOptions = tsconfigToProgram(options?.compilerOptions ?? getCurrentTsconfig(cwd).compilerOptions);

	const program = ts.createProgram(files, compilerOptions as any);
	const emitResult = program.emit();

	const exitCode = emitResult.emitSkipped ? 1 : 0;

	let print = console;

	if (exitCode)
	{
		print = print.red;
	}

	if (options?.verbose)
	{
		const allDiagnostics = ts
			.getPreEmitDiagnostics(program)
			.concat(emitResult.diagnostics)
		;

		allDiagnostics.forEach(diagnostic =>
		{
			if (diagnostic.file)
			{
				const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
				const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
				print.info(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
			}
			else
			{
				print.info(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
			}
		});
	}

	if (exitCode)
	{
		print.error(`Process exiting with code '${exitCode}'.`);
	}

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
