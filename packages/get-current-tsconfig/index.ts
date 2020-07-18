import ITsconfig from '@ts-type/package-dts/tsconfig-json';
import { sync as crossSpawnSync } from 'cross-spawn-extra';

export interface IOptions
{
	cwd?: string,
	bin?: string,
	sourceFile?: string,
	extraArgv?: string[],
}

export type IOptionsArgv = [
	cwd?: string,
	bin?: string,
	sourceFile?: string,
	extraArgv?: string[],
] | [
	options: IOptions
];

export function handleOptions(...argv: IOptionsArgv)
{
	let options: IOptions = {};

	if (typeof argv[0] === 'object' && argv[0] !== null)
	{
		options = argv[0];
	}
	else
	{
		let [cwd, bin, sourceFile, extraArgv] = argv;

		options = {
			// @ts-ignore
			cwd,
			bin,
			sourceFile,
			extraArgv,
		}
	}

	return options;
}

export function getCurrentTsconfig(...argv: IOptionsArgv): ITsconfig
{

	const { cwd, bin, sourceFile, extraArgv } = handleOptions(...argv);

	const binArgv = [
		`--showConfig`,
	];

	if (sourceFile?.length)
	{
		binArgv.push('-p', sourceFile);
	}

	if (extraArgv?.length)
	{
		binArgv.push(...extraArgv);
	}

	const cp = crossSpawnSync(bin || 'tsc', binArgv, {
		cwd,
	});

	// @ts-ignore
	let msg = Buffer.concat(cp.output.filter(v => v)).toString().replace(/^\s+|\s+$/g, '');

	if (cp.status)
	{
		throw new Error(msg)
	}

	return JSON.parse(msg)
}

export default getCurrentTsconfig
