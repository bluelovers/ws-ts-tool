//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />
/// <reference types="expect" />

import { getExtensionsByFormat, EnumTsdxFormat, defaultAllowedFormat } from '../src/index';

beforeAll(async () =>
{

});

describe(`getExtensionsByFormat`, () =>
{
	defaultAllowedFormat().forEach(format => {
		test(format, () =>
		{

			let actual = getExtensionsByFormat(format);

			expect(actual).toMatchSnapshot();

		});
	});

})
