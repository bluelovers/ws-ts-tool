/**
 * Created by user on 2020/5/27.
 */

// @ts-ignore
import { JsxEmit, ModuleKind, ModuleResolutionKind, NewLineKind, ScriptTarget, createProgram } from 'typescript';
import { sync as crossSpawn } from 'cross-spawn-extra';
import { ITsconfig } from '@ts-type/package-dts/tsconfig-json';
import { dirname, resolve } from 'path';
// @ts-ignore
import unparse from 'yargs-unparser';
// @ts-ignore
import { getCurrentTsconfig, IOptions as IGetCurrentTsconfigOptions } from 'get-current-tsconfig';
import { consoleLogger } from 'debug-color2/logger';
import { Console2 } from 'debug-color2';
import { tsconfigToCliArgs, tsconfigToProgram } from '@ts-type/tsconfig-to-program';
import { forEachDiagnostics, getAllDiagnostics } from '@ts-type/program-all-diagnostics';

export interface IOptions
{
	bin?: string;
	cwd?: string;
	compilerOptions?: ITsconfig["compilerOptions"];
	getCurrentTsconfigOptions?: IGetCurrentTsconfigOptions;
	verbose?: boolean,
	compilerHost?: import("typescript").CompilerHost | ((programCompilerOptions: import("typescript").CompilerOptions) =>
		import("typescript").CompilerHost),
	overwriteCompilerOptions?: ITsconfig["compilerOptions"];
	logger?: Console2,
}

export function handleOptions(files: string | string[], options?: IOptions)
{
	options ??= {};

	let cwd = options.cwd;

	if (!Array.isArray(files))
	{
		files = [files];
	}

	if (!cwd)
	{
		cwd = dirname(resolve(process.cwd(), files[0]))
	}

	let compilerOptions: ITsconfig["compilerOptions"] = options.compilerOptions ?? getCurrentTsconfig({
		...options.getCurrentTsconfigOptions,
		cwd,
	}).compilerOptions;

	if (options.overwriteCompilerOptions)
	{
		compilerOptions = {
			...compilerOptions,
			...options.overwriteCompilerOptions,
		}
	}

	const bin = options.bin || 'tsc';

	return {
		...options,
		files,
		cwd,
		bin,
		compilerOptions,
	} as IOptions & {
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

/**
 * @see https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API
 */
export function emitTsFiles(inputFiles: string | string[], options?: IOptions)
{
	let {
		cwd,
		compilerOptions,
		files,
		logger,
		verbose,
		compilerHost,
	} = handleOptions(inputFiles, options);

	files = files.map(file => resolve(cwd, file));

	const programCompilerOptions = tsconfigToProgram(compilerOptions);

	if (typeof compilerHost === 'function')
	{
		compilerHost = compilerHost(programCompilerOptions);
	}

	const program = createProgram(files, programCompilerOptions, compilerHost);
	const emitResult = program.emit();

	const exitCode = emitResult.emitSkipped ? 1 : 0;

	let print = logger ?? consoleLogger;

	if (exitCode)
	{
		print = print.red;
	}

	if (verbose)
	{
		const allDiagnostics = getAllDiagnostics(program, emitResult);

		forEachDiagnostics(allDiagnostics, (_diagnostic, message) => {
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
		programCompilerOptions,
		program,
		compilerHost,
	} as {
		cwd: string;
		files: string[];
		exitCode: number;
		emitResult: import("typescript").EmitResult;
		compilerOptions: ITsconfig["compilerOptions"];
		programCompilerOptions: import("typescript").CompilerOptions;
		program: import("typescript").Program;
		compilerHost: import("typescript").CompilerHost;
	}
}

export default emitTsFiles
