import type { ModuleKind } from 'typescript';

export enum EnumModuleKind
{
	Node12 = 100,
	None = 0,
	CommonJS = 1,
	AMD = 2,
	UMD = 3,
	System = 4,
	ES2015 = 5,
	ES2020 = 6,
	ES2022 = 7,
	ESNext = 99,
	Node16 = 100,
	NodeNext = 199,
}

export type ITsModuleKindIsCJS = ModuleKind.None | EnumModuleKind.None | ModuleKind.CommonJS | EnumModuleKind.CommonJS | ModuleKind.Node16 | EnumModuleKind.Node16;
export const TS_MODULE_KIND_IS_CJS = [0 as ModuleKind.None | EnumModuleKind.None, 1 as ModuleKind.CommonJS | EnumModuleKind.CommonJS, 100 as ModuleKind.Node16 | EnumModuleKind.Node16] as const;

export type ITsModuleKindIsESM = ModuleKind.ES2015 | EnumModuleKind.ES2015 | ModuleKind.ES2020 | EnumModuleKind.ES2020 | ModuleKind.ES2022 | EnumModuleKind.ES2022 | ModuleKind.ESNext | EnumModuleKind.ESNext | ModuleKind.NodeNext | EnumModuleKind.NodeNext;
export const TS_MODULE_KIND_IS_ESM = [5 as ModuleKind.ES2015 | EnumModuleKind.ES2015, 6 as ModuleKind.ES2020 | EnumModuleKind.ES2020, 7 as ModuleKind.ES2022 | EnumModuleKind.ES2022, 99 as ModuleKind.ESNext | EnumModuleKind.ESNext, 199 as ModuleKind.NodeNext | EnumModuleKind.NodeNext] as const;

