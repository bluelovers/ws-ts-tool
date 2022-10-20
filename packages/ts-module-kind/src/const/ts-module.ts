import { ModuleKind } from 'typescript';

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

export type ITsModuleKindIsCJS = ModuleKind.CommonJS | ModuleKind.Node16;
export const TS_MODULE_KIND_IS_CJS = [1 as ModuleKind.CommonJS, 100 as ModuleKind.Node16] as const;

export type ITsModuleKindIsESM = ModuleKind.ES2015 | ModuleKind.ES2020 | ModuleKind.ES2022 | ModuleKind.ESNext | ModuleKind.NodeNext;
export const TS_MODULE_KIND_IS_ESM = [5 as ModuleKind.ES2015, 6 as ModuleKind.ES2020, 7 as ModuleKind.ES2022, 99 as ModuleKind.ESNext, 199 as ModuleKind.NodeNext] as const;

