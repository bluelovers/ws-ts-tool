import { ModuleKind } from 'typescript';
import { outputFile } from 'fs-extra';
import { join } from 'path';
import { __root } from '../__root';
import { array_unique } from 'array-hyper-unique';
import { $enum } from "ts-enum-util";

// @ts-ignore
const TS_MODULE_KIND_IS_CJS = array_unique([ModuleKind.CommonJS, ModuleKind.Node12 ?? 100, ModuleKind.Node16] as const);
const TS_MODULE_KIND_IS_ESM = array_unique([
	ModuleKind.ES2015,
	ModuleKind.ES2020,
	ModuleKind.ES2022,
	ModuleKind.ESNext,
	ModuleKind.NodeNext,
] as const);

export function buildTsModuleKind()
{
	const lines: string[] = [];

	lines.push(`import { ModuleKind } from 'typescript';`);
	lines.push(``);

	lines.push(`export enum EnumModuleKind`);
	lines.push(`{`);
	for (const key of [
		'Node12',
		'Node16',
		'Node18',
	] as const)
	{
		if (!$enum(ModuleKind).isKey(key))
		{
			lines.push(`\t${key} = 100,`);
		}
		else
		{
			break;
		}
	}
	for (const key of $enum(ModuleKind).keys())
	{
		lines.push(`\t${key} = ${ModuleKind[key]},`);
	}
	lines.push(`}`);
	lines.push(``);

	let arr = TS_MODULE_KIND_IS_CJS.slice().map((v) =>
	{
		return `${v} as ModuleKind.${ModuleKind[v]}`
	});

	lines.push(`export type ITsModuleKindIsCJS = ${TS_MODULE_KIND_IS_CJS.slice()
		.map(v => `ModuleKind.${ModuleKind[v]}`)
		.join(' | ')};`);
	lines.push(`export const TS_MODULE_KIND_IS_CJS = [${arr.join(', ')}] as const;`);
	lines.push(``);

	arr = TS_MODULE_KIND_IS_ESM.slice().map((v) =>
	{
		return `${v} as ModuleKind.${ModuleKind[v]}`
	});

	lines.push(`export type ITsModuleKindIsESM = ${TS_MODULE_KIND_IS_ESM.slice()
		.map(v => `ModuleKind.${ModuleKind[v]}`)
		.join(' | ')};`);
	lines.push(`export const TS_MODULE_KIND_IS_ESM = [${arr.join(', ')}] as const;`);
	lines.push(``);

	lines.push(``);

	return outputFile(join(__root, 'src/const/ts-module.ts'), lines.join('\n'));
}

export default buildTsModuleKind();
