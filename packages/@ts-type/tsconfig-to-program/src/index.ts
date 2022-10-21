import { ITsconfig } from '@ts-type/package-dts/tsconfig-json';
import { valueFromRecord } from 'value-from-record';
import {
	JsxEmit,
	ModuleKind,
	ModuleResolutionKind,
	NewLineKind,
	ScriptTarget,
	CompilerOptions,
	ImportsNotUsedAsValues, ModuleDetectionKind,
} from 'typescript';

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
export function tsconfigToProgram<T extends CompilerOptions>(compilerOptions: ITsconfig["compilerOptions"])
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
					value = valueFromRecord<ModuleKind>(value, ModuleKind) ?? value
					break;
				case 'moduleResolution':

					value = valueFromRecord<ModuleResolutionKind>(value, ModuleResolutionKind) ?? value

					if (value === 'node')
					{
						value = ModuleResolutionKind.NodeJs
					}

					break;
				case 'moduleDetection':
					value = valueFromRecord<ModuleDetectionKind>(value, ModuleDetectionKind) ?? value
					break;
				case 'newLine':

					switch ((value as string)?.toLowerCase?.())
					{
						case 'lf':
							value = NewLineKind.LineFeed
							break;
						case 'crlf':
							value = NewLineKind.CarriageReturnLineFeed
							break;
						default:
							_skip = true;
					}

					break;
				case 'target':
					value = valueFromRecord<string>(value, ScriptTarget) ?? value;
					break;
				case 'incremental':
					_skip = true;
					break;
				case 'importsNotUsedAsValues':
					value = valueFromRecord<string>(value, ImportsNotUsedAsValues) ?? value;
					break;
			}

			if (!_skip)
			{
				// @ts-ignore
				a[key] = value;
			}

			return a
		}, {} as T)
}
