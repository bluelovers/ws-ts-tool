import { CompilerOptions, ModuleKind } from 'typescript';
import { strictEqual } from 'assert';
import {
	ITsModuleKindIsCJS,
	ITsModuleKindIsESM,
	TS_MODULE_KIND_IS_CJS,
	TS_MODULE_KIND_IS_ESM,
} from './const/ts-module';
import { ITSAndTypeAndStringLiteral } from 'ts-type/lib/helper/string';
import { valueFromRecord } from 'value-from-record';

export const enum EnumJsKind
{
	cjs = 'cjs',
	esm = 'esm',
}

export {
	TS_MODULE_KIND_IS_CJS,
	TS_MODULE_KIND_IS_ESM,
}

export function tsModuleKindIsCJS(module: ModuleKind | number): module is ITsModuleKindIsCJS
{
	strictEqual(typeof module, 'number');
	return TS_MODULE_KIND_IS_CJS.indexOf(module) !== -1
}

export function tsModuleKindIsESM(module: ModuleKind | number): module is ITsModuleKindIsESM
{
	strictEqual(typeof module, 'number');
	return TS_MODULE_KIND_IS_ESM.indexOf(module) !== -1
}

export function handleModuleKindLazy(module: ITSAndTypeAndStringLiteral<keyof typeof ModuleKind | ModuleKind, string | number>)
{
	if (typeof module === 'string')
	{
		if (/^\d+$/.test(module))
		{
			module = parseInt(module);
		}
		else
		{
			module = valueFromRecord<ModuleKind>(module, ModuleKind)
		}
	}

	return module as ModuleKind
}

export function tsModuleKindIsCJSLazy(module: ITSAndTypeAndStringLiteral<keyof typeof ModuleKind | ModuleKind, string | number>): module is ITsModuleKindIsCJS
{
	return tsModuleKindIsCJS(handleModuleKindLazy(module))
}

export function tsModuleKindIsESMLazy(module: ITSAndTypeAndStringLiteral<keyof typeof ModuleKind | ModuleKind, string | number>): module is ITsModuleKindIsESM
{
	return tsModuleKindIsESM(handleModuleKindLazy(module))
}

export function tsModuleKind(module: ModuleKind | number)
{
	if (tsModuleKindIsCJS(module))
	{
		return EnumJsKind.cjs
	}
	else if (tsModuleKindIsESM(module))
	{
		return EnumJsKind.esm
	}
}

export function tsModuleKindLazy(module: ITSAndTypeAndStringLiteral<keyof typeof ModuleKind | ModuleKind, string | number>)
{
	return tsModuleKind(handleModuleKindLazy(module))
}

export function getExtensionsByCompilerOptions(options: CompilerOptions & {
	module?: ITSAndTypeAndStringLiteral<keyof typeof ModuleKind | ModuleKind, string | number>
})
{
	const tsExtensions: string[] = ['.ts'];
	const jsExtensions: string[] = [];

	const module: ModuleKind = handleModuleKindLazy(options.module);

	const useESM = tsModuleKindIsESM(module);
	const useCJS = tsModuleKindIsCJS(module);

	if (options.jsx) tsExtensions.push('.tsx');
	if (useESM) tsExtensions.push('.mts');
	if (useCJS) tsExtensions.push('.cts');

	if (options.allowJs)
	{
		jsExtensions.push('.js');
		if (options.jsx) jsExtensions.push('.jsx');
		if (useESM) tsExtensions.push('.mjs');
		if (useCJS) tsExtensions.push('.cjs');
	}

	return {
		tsExtensions,
		jsExtensions,
		useESM,
		useCJS,
		module,
	}
}

export default getExtensionsByCompilerOptions
