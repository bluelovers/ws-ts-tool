import { ModuleKind } from 'typescript';
import { handleModuleKindLazy, tsModuleKindLazy } from '../src/index';

describe(`ModuleKind`, () =>
{

	Object.keys(ModuleKind).forEach(input =>
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
