#!/usr/bin/env node

import yargs from 'yargs';
import getCurrentTsconfig from 'get-current-tsconfig';
import FastGlob from '@bluelovers/fast-glob/bluebird';
import emitTsFiles from '../index';
import { join } from 'path';
import console from 'debug-color2/logger';

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
	.option(`cwd`, {
		alias: [
			'c',
		],
		string: true,
		normalize: true,
	})
	.option(`verbose`, {
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
			console.dir(getCurrentTsconfig(args.cwd as string))
		},
	})
	.command({
		command: '$0',
		handler(args)
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

			return FastGlob
				.async<string>([
					...args._,
				], {
					cwd,
					ignore,
					absolute: true,
				})
				.tap(result => {

					if (!result.length)
					{
						return Promise.reject(`can't match any files`)
					}

				})
				.mapSeries(file => {

					verbose && console.debug(`emit:`, file)

					let ret = emitTsFiles(file as any, {
						cwd: args.cwd as string,
						verbose,
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
