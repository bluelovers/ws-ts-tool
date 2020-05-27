import ITsconfig from '@ts-type/package-dts/tsconfig-json';
import crossSpawn from 'cross-spawn-extra';

export function getCurrentTsconfig(cwd?: string, bin?: string): ITsconfig
{
	let cp = crossSpawn.sync(bin || 'tsc', [
		`--showConfig`,
	], {
		cwd,
	})

	// @ts-ignore
	let msg = Buffer.concat(cp.output.filter(v => v)).toString().replace(/^\s+|\s+$/g, '');

	if (cp.status)
	{
		throw new Error(msg)
	}

	return JSON.parse(msg)
}

export default getCurrentTsconfig
