import { ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';

export const enum EnumTsdxFormat
{
	'cjs' = 'cjs',
	'umd' = 'umd',
	'esm' = 'esm',
	'system' = 'system'
}

export type IModuleFormat = ITSTypeAndStringLiteral<EnumTsdxFormat>;

const allowFormat = defaultAllowedFormat() as readonly IModuleFormat[];

const cacheFormatExt = new Map<IModuleFormat, ReturnType<typeof _getExtensionsByFormat>>();

export function defaultFormatOrder()
{
	return [
		EnumTsdxFormat.esm,
		EnumTsdxFormat.cjs,
		EnumTsdxFormat.umd,
	] as const satisfies readonly IModuleFormat[]
}

export function defaultAllowedFormat()
{
	return [
		EnumTsdxFormat.esm,
		EnumTsdxFormat.cjs,
		EnumTsdxFormat.umd,
		EnumTsdxFormat.system,
	] as const satisfies readonly IModuleFormat[]
}

export function isAllowedFormat(format: IModuleFormat): format is EnumTsdxFormat
{
	return allowFormat.includes(format)
}

export function _getExtensionsByFormat(currentFormat: IModuleFormat)
{
	const list = [
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
	] satisfies `.${string}`[];

	return list as Readonly<typeof list>;
}

export function getExtensionsByFormat(currentFormat: IModuleFormat)
{
	let list = cacheFormatExt.get(currentFormat);

	if (!list?.length)
	{
		if (!isAllowedFormat(currentFormat))
		{
			throw new RangeError(`Invalid format ${currentFormat}`)
		}

		list = _getExtensionsByFormat(currentFormat);
		cacheFormatExt.set(currentFormat, list);
	}

	return list.slice() as typeof list;
}

export default getExtensionsByFormat
