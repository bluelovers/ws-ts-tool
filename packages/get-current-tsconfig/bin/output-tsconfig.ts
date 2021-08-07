#!/usr/bin/env node

import console2 from 'debug-color2/logger';
import yargs from 'yargs';
import getCurrentTsconfig, { outputCurrentTsconfig } from '../index';

const argv = yargs
	.option(`cwd`, {
		alias: [
			'c',
		],
		string: true,
		normalize: true,
	})
	.option(`bin`, {
		string: true,
		normalize: true,
	})
	.option(`sourceFile`, {
		alias: [
			's',
		],
		string: true,
		normalize: true,
	})
	.option(`outputFile`, {
		alias: [
			'o',
		],
		string: true,
		normalize: true,
	})
	.option(`print`, {
		alias: [
			'p',
		],
		boolean: true,
		default: true,
	})
	.parseSync()
;

if (argv.print)
{
	let json = getCurrentTsconfig(argv);

	console.log(JSON.stringify(json, null, 2));
}
else
{
	let file = outputCurrentTsconfig(argv);

	console2.success(`outpput tsconfig to file: ${file}`);
}
