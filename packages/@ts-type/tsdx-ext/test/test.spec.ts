//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />
/// <reference types="expect" />

import { getExtensionsByFormat, EnumTsdxFormat } from '../src/index';

beforeAll(async () =>
{

});

describe(`getExtensionsByFormat`, () =>
{
	[
		EnumTsdxFormat.umd,
		EnumTsdxFormat.cjs,
		EnumTsdxFormat.esm,
		EnumTsdxFormat.system,
	].forEach(format => {
		test(format, () =>
		{

			let actual = getExtensionsByFormat(format);

			expect(actual).toMatchSnapshot();

		});
	});

})
