#!/usr/bin/env node

import console from 'debug-color2/logger';
import yargs from 'yargs';
import { outputCurrentTsconfig } from '../index';

let argv = yargs
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
	.argv
;

let file = outputCurrentTsconfig(argv);

console.log(`create tsconfig file: ${file}`);
