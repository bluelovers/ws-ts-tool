import { ITsconfig } from '@ts-type/package-dts/tsconfig-json';
import { valueFromRecord } from 'value-from-record';
import { JsxEmit, ModuleKind, ModuleResolutionKind, NewLineKind, ScriptTarget, CompilerOptions } from 'typescript';

export function tsconfigToCliArgs(compilerOptions: ITsconfig["compilerOptions"]): string[]
{
	let args = Object.entries(compilerOptions)
		.reduce((a, [key, value]) =>
		{

			if (key === 'locale')
			{
				return a
			}

			if (typeof value === 'boolean')
			{
				if (value === true)
				{
					a.push(`--${key}`);
				}
			}
			else
			{
				a.push(`--${key}`);
				a.push(value);
			}

			return a
		}, [])
	;

	return args;
	//return unparse(compilerOptions)
}

/**
 * for `ts.createProgram`
 */
export function tsconfigToProgram(compilerOptions: ITsconfig["compilerOptions"])
{
	return Object.entries(compilerOptions)
		.reduce((a, [key, value]) =>
		{
			let _skip = false;

			switch (key as keyof ITsconfig["compilerOptions"])
			{
				case 'jsx':
					value = valueFromRecord<string>(value, JsxEmit) ?? value
					break;
				case 'module':
					value = valueFromRecord<string>(value, ModuleKind) ?? value
					break;
				case 'moduleResolution':

					if (value === 'node' || value === 'nodenext')
					{
						value = ModuleResolutionKind.NodeJs
					}
					else
					{
						_skip = true;
					}

					break;
				case 'newLine':

					if ((value as string)?.toLowerCase?.() === 'lf')
					{
						value = NewLineKind.LineFeed
						//value = valueFromRecord(value, NewLineKind)
					}
					else
					{
						_skip = true;
					}

					break;
				case 'target':
					value = valueFromRecord<string>(value, ScriptTarget) ?? value;
					break;
				case 'incremental':
					_skip = true;
					break;
			}

			if (!_skip)
			{
				// @ts-ignore
				a[key] = value;
			}

			return a
		}, {} as CompilerOptions)
}
