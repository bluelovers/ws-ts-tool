import type { CompilerOptions, ModuleKind } from 'typescript';
import { strictEqual } from 'assert';
import {
	EnumModuleKind,
	ITsModuleKindIsCJS,
	ITsModuleKindIsESM,
	TS_MODULE_KIND_IS_CJS,
	TS_MODULE_KIND_IS_ESM,
} from './const/ts-module';
import { ITSAndTypeAndStringLiteral } from 'ts-type/lib/helper/string';
import { valueFromRecord } from 'value-from-record';
import { ITSNumberEnumToNumber } from 'ts-type/lib/helper/record/enum';

export const enum EnumJsKind
{
	cjs = 'cjs',
	esm = 'esm',
}

export const enum EnumJsKindExt
{
	cjs = '.cjs',
	esm = '.mjs',
}

export {
	TS_MODULE_KIND_IS_CJS,
	TS_MODULE_KIND_IS_ESM,
}

export type IEnumModuleKind = typeof EnumModuleKind | typeof ModuleKind;
export type IModuleKind = ModuleKind | EnumModuleKind;
export type IModuleKindKeys = keyof typeof EnumModuleKind | keyof typeof ModuleKind;
export type IModuleKindNumber = ITSNumberEnumToNumber<IModuleKind>;
export type IModuleKindInput = IModuleKind | IModuleKindNumber;
export type IModuleKindInputMixin = ITSAndTypeAndStringLiteral<IModuleKindKeys | IModuleKindInput, string | number>;

function _assertNumber<T extends number>(n: unknown | T): asserts n is T
{
	const type = typeof n;
	strictEqual(type, 'number', new TypeError(`should be a number, but got ${type}`));
}

function _assertString<T extends string>(n: unknown | T): asserts n is T
{
	const type = typeof n;
	strictEqual(type, 'string', new TypeError(`should be a string, but got ${type}`));
}

export function tsModuleKindIsCJS(module: IModuleKindInput | number): module is ITsModuleKindIsCJS
{
	_assertNumber(module);
	return TS_MODULE_KIND_IS_CJS.includes(module)
}

export function tsModuleKindIsESM(module: IModuleKindInput | number): module is ITsModuleKindIsESM
{
	_assertNumber(module);
	return TS_MODULE_KIND_IS_ESM.includes(module)
}

export function isModuleKindName(module: IModuleKindInputMixin): module is IModuleKindKeys
{
	return (typeof module === 'string' && module in EnumModuleKind)
}

export function toModuleKindName(module: IModuleKindInputMixin)
{
	let name: IModuleKindKeys;

	if (isModuleKindName(module))
	{
		name = module
	}
	else
	{
		name = EnumModuleKind[handleModuleKindLazy(module)] as IModuleKindKeys
		_assertString(name);
	}

	return name;
}

export function handleModuleKindLazy(module: IModuleKindInputMixin)
{
	if (typeof module === 'string')
	{
		if (/^\d+$/.test(module))
		{
			module = parseInt(module);
		}
		else
		{
			module = valueFromRecord<ModuleKind>(module, EnumModuleKind)
		}
	}

	return module as ModuleKind
}

export function tsModuleKindIsCJSLazy(module: IModuleKindInputMixin): module is ITsModuleKindIsCJS
{
	return tsModuleKindIsCJS(handleModuleKindLazy(module))
}

export function tsModuleKindIsESMLazy(module: IModuleKindInputMixin): module is ITsModuleKindIsESM
{
	return tsModuleKindIsESM(handleModuleKindLazy(module))
}

export function tsModuleKindType(module: IModuleKindInput)
{
	if (tsModuleKindIsCJS(module))
	{
		return EnumJsKind.cjs as const
	}
	else if (tsModuleKindIsESM(module))
	{
		return EnumJsKind.esm as const
	}
}

export function tsModuleKindExt(module: IModuleKindInput)
{
	if (tsModuleKindIsCJS(module))
	{
		return EnumJsKindExt.cjs as const
	}
	else if (tsModuleKindIsESM(module))
	{
		return EnumJsKindExt.esm as const
	}
}

export function tsModuleKindLazy(module: IModuleKindInputMixin)
{
	return tsModuleKindType(handleModuleKindLazy(module))
}

export function getExtensionsByCompilerOptions(options: CompilerOptions & {
	module?: IModuleKindInputMixin
})
{
	const tsExtensions: string[] = ['.ts'];
	const jsExtensions: string[] = [];

	const module: ModuleKind = handleModuleKindLazy(options.module);

	const useESM = tsModuleKindIsESM(module);
	const useCJS = !useESM && tsModuleKindIsCJS(module);

	if (options.jsx) tsExtensions.push('.tsx');
	if (useESM) tsExtensions.push('.mts');
	else if (useCJS) tsExtensions.push('.cts');

	if (options.allowJs)
	{
		jsExtensions.push('.js');
		if (options.jsx) jsExtensions.push('.jsx');
		if (useESM) tsExtensions.push('.mjs');
		else if (useCJS) tsExtensions.push('.cjs');
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
