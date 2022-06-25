#!/usr/bin/env node

import yargs from 'yargs';
import { getCurrentTsconfig } from 'get-current-tsconfig';
import { async as FastGlob } from '@bluelovers/fast-glob/bluebird';
import { emitTsFiles } from '../';
import { consoleLogger as console } from 'debug-color2/logger';

yargs
	.option(`cwd`, {
		alias: [
			'c',
		],
		string: true,
		normalize: true,
	})
	.option(`ignore`, {
		alias: [
			'exclude',
			'e',
		],
		string: true,
		array: true,
		default: [] as string[],
	})
	.option(`verbose`, {
		boolean: true,
		default: true,
	})
	.option(`project`, {
		desc: `Compile the project given the path to its configuration file, or to a folder with a 'tsconfig.json'.`,
		alias: [
			'p',
		],
		normalize: true,
	})
	.option(`module`, {
		desc: `Specify what module code is generated.`,
		alias: [
			'm',
		],
		string: true,
	})
	.option(`declaration`, {
		desc: `Generate .d.ts files from TypeScript and JavaScript files in your project.`,
		alias: [
			'd',
		],
		boolean: true,
	})
	.option(`emitDeclarationOnly`, {
		desc: `Only output d.ts files and not JavaScript files.`,
		boolean: true,
	})
	.command({
		command: 'tsconfig',
		aliases: [
			'config',
			'conf',
		],
		handler(args)
		{
			console.dir(getCurrentTsconfig({
				// @ts-ignore
				cwd: args.cwd as any,
				// @ts-ignore
				sourceFile: args.project as any,
				extraArgv: [
					// @ts-ignore
					args.module?.length && `-m ${args.module}`,
					// @ts-ignore
					args.declaration?.length && `--declaration`,
					// @ts-ignore
					args.emitDeclarationOnly?.length && `--emitDeclarationOnly`,
				].filter(v => v?.length)
			}))
		},
	})
	.command({
		command: '$0',
		// @ts-ignore
		handler(args: any)
		{
			if (!args._.length)
			{
				yargs.showHelp();
				yargs.exit(1, new Error(`file list is empty`))
				return;
			}

			let ignore = Array.isArray(args.ignore) ? args.ignore : [args.ignore]

			let verbose = args.verbose as boolean;

			// @ts-ignore
			let cwd: string = args.cwd || process.cwd();

			let getCurrentTsconfigOptions = {
				// @ts-ignore
				cwd: args.cwd as any,
				// @ts-ignore
				sourceFile: args.project as any,
				extraArgv: [
					// @ts-ignore
					args.module?.length && `-m ${args.module}`,
					// @ts-ignore
					args.declaration?.length && `--declaration`,
					// @ts-ignore
					args.emitDeclarationOnly?.length && `--emitDeclarationOnly`,
				].filter(v => v?.length)
			}

			return FastGlob<string>([
					...args._,
				] as any, {
					cwd,
					ignore,
					absolute: true,
				})
				.tap(result =>
				{

					if (!result.length)
					{
						return Promise.reject(`can't match any files`)
					}

				})
				.mapSeries(file =>
				{

					verbose && console.debug(`emit:`, file)

					let ret = emitTsFiles(file as any, {
						cwd: args.cwd as string,
						verbose,
						getCurrentTsconfigOptions,
					});

					if (ret.exitCode)
					{
						console.error(`error:`, file)
					}
					else
					{
						console.success(`success:`, file)
					}

				})
		},
	})
	.showHelpOnFail(true)
	.help()
	.version()
	.argv
;
