/**
 * Created by user on 2020/5/27.
 */

// @ts-ignore
import { JsxEmit, ModuleKind, ModuleResolutionKind, NewLineKind, ScriptTarget, createProgram, getPreEmitDiagnostics,
	flattenDiagnosticMessageText } from 'typescript';
import { sync as crossSpawn } from 'cross-spawn-extra';
import { ITsconfig } from '@ts-type/package-dts/tsconfig-json';
import { dirname, resolve } from 'path';
// @ts-ignore
import unparse from 'yargs-unparser';
import { getCurrentTsconfig, IOptions as IGetCurrentTsconfigOptions } from 'get-current-tsconfig';
import { consoleLogger as console } from 'debug-color2/logger';
import { tsconfigToCliArgs, tsconfigToProgram } from '@ts-type/tsconfig-to-program';

export interface IOptions
{
	bin?: string;
	cwd?: string;
	compilerOptions?: ITsconfig["compilerOptions"];
	getCurrentTsconfigOptions?: IGetCurrentTsconfigOptions;
	verbose?: boolean,
}

export function handleOptions(files: string | string[], options?: IOptions)
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

	const compilerOptions: ITsconfig["compilerOptions"] = options?.compilerOptions ?? getCurrentTsconfig({
		...options?.getCurrentTsconfigOptions,
		cwd,
	}).compilerOptions;

	const bin = options?.bin || 'tsc';

	return {
		files,
		cwd,
		bin,
		compilerOptions,
	} as {
		files: string[];
		cwd: string;
		bin: string;
		compilerOptions: ITsconfig["compilerOptions"];
	}
}

export function spawnEmitTsFiles(inputFiles: string | string[], options?: IOptions)
{

	let { cwd, compilerOptions, files, bin } = handleOptions(inputFiles, options)

	let args = tsconfigToCliArgs(compilerOptions);

	//console.dir(compilerOptions)
	//console.dir(args)
	//console.dir(cwd)
	//console.dir(files)

	let cp = crossSpawn(bin, [
		...args,
		`--tsBuildInfoFile`,
		`.`,
		files[0],
	], {
		cwd,
		stdio: 'inherit',
	});

	return cp
}

export function emitTsFiles(files: string | string[], options?: IOptions)
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

	files = files.map(file => resolve(cwd, file));

	let getCurrentTsconfigOptions = options?.getCurrentTsconfigOptions ?? {};

	let compilerOptions = tsconfigToProgram(options?.compilerOptions ?? getCurrentTsconfig({
		...getCurrentTsconfigOptions,
		cwd,
	}).compilerOptions);

	const program = createProgram(files, compilerOptions as any);
	const emitResult = program.emit();

	const exitCode = emitResult.emitSkipped ? 1 : 0;

	let print = console;

	if (exitCode)
	{
		print = print.red;
	}

	if (options?.verbose)
	{
		const allDiagnostics = getPreEmitDiagnostics(program)
			.concat(emitResult.diagnostics)
		;

		allDiagnostics.forEach(diagnostic =>
		{
			let message = flattenDiagnosticMessageText(diagnostic.messageText, "\n");

			if (diagnostic.file)
			{
				const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);

				message = `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
			}

			print.info(`[Diagnostic]`, message);
		});

		print.debug(`[CWD] ${cwd}`);

	}

	if (exitCode)
	{
		print.error(`[Program] Process exiting with code '${exitCode}'.`);
	}

	//console.log(`Process exiting with code '${exitCode}'.`);

	return {
		cwd,
		files,
		exitCode,
		emitResult,
		compilerOptions,
		program,
	}
}

export default emitTsFiles
