import { ModuleKind } from 'typescript';
import { handleModuleKindLazy, tsModuleKindLazy } from '../src/index';
import { array_unique } from 'array-hyper-unique';
import { EnumModuleKind } from '../src/const/ts-module';

describe(`ModuleKind`, () =>
{

	array_unique([
		...Object.keys(ModuleKind),
		...Object.keys(EnumModuleKind),
	]).forEach(input =>
	{

		test(`${input}`, () =>
		{

			const module = handleModuleKindLazy(input);

			expect({
				input,
				module,
			}).toStrictEqual({
				input,
				module: expect.any(Number)
			});

			let actual = tsModuleKindLazy(input);
			expect({
				input,
				module,
				moduleName: ModuleKind[module],
				actual,
			}).toMatchSnapshot();

		});

	})

});

test(`Node12`, () =>
{
	expect(EnumModuleKind.Node12).toStrictEqual(ModuleKind.Node16)
	expect(EnumModuleKind[EnumModuleKind.Node12]).toStrictEqual(EnumModuleKind[ModuleKind.Node16])
	expect(EnumModuleKind).toMatchObject(ModuleKind)
})
