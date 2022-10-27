import { ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';

export const enum EnumTsdxFormat
{
	'cjs' = 'cjs',
	'umd' = 'umd',
	'esm' = 'esm',
	'system' = 'system'
}

export type IModuleFormat = ITSTypeAndStringLiteral<EnumTsdxFormat>;

export function defaultFormatOrder()
{
	return [
		EnumTsdxFormat.esm,
		EnumTsdxFormat.cjs,
		EnumTsdxFormat.umd,
	] as const satisfies readonly IModuleFormat[]
}

export function getExtensionsByFormat(currentFormat: IModuleFormat)
{
	return [
		...(currentFormat === EnumTsdxFormat.cjs ? [
			'.cts' as const,
		] as const : currentFormat === EnumTsdxFormat.esm ? [
			'.mts' as const,
		] as const : currentFormat === EnumTsdxFormat.umd ? [
			'.umd.ts' as const,
		] as const : []),
		'.ts' as const,
		'.tsx' as const,
		...((currentFormat === EnumTsdxFormat.cjs || currentFormat === EnumTsdxFormat.esm) ? [] : [
			'.mts' as const,
			'.cts' as const,
		] as const),
		'.jsx' as const,
		...(currentFormat === EnumTsdxFormat.cjs ? [
			'.cjs' as const,
		] as const : currentFormat === EnumTsdxFormat.esm ? [
			'.mjs' as const,
		] as const : currentFormat === EnumTsdxFormat.umd ? [
			'.umd.js' as const,
		] as const : []),
		'.js' as const,
		...((currentFormat === EnumTsdxFormat.cjs || currentFormat === EnumTsdxFormat.esm) ? [] : [
			'.mjs' as const,
			'.cjs' as const,
		] as const),
		'.js' as const,
	] satisfies `.${string}`[]
}

export default getExtensionsByFormat
