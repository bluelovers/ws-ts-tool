import { ITSNumberEnumToNumber } from 'ts-type/lib/helper/record/enum';
import { ITSAndTypeAndStringLiteral } from 'ts-type/lib/helper/string';
import { CompilerOptions, ModuleKind } from 'typescript';

declare enum EnumModuleKind {
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
	NodeNext = 199
}
export type ITsModuleKindIsCJS = ModuleKind.None | EnumModuleKind.None | ModuleKind.CommonJS | EnumModuleKind.CommonJS | ModuleKind.Node16 | EnumModuleKind.Node16;
export declare const TS_MODULE_KIND_IS_CJS: readonly [
	ModuleKind.None | EnumModuleKind.None,
	ModuleKind.CommonJS | EnumModuleKind.CommonJS,
	ModuleKind.Node16 | EnumModuleKind.Node12
];
export type ITsModuleKindIsESM = ModuleKind.ES2015 | EnumModuleKind.ES2015 | ModuleKind.ES2020 | EnumModuleKind.ES2020 | ModuleKind.ES2022 | EnumModuleKind.ES2022 | ModuleKind.ESNext | EnumModuleKind.ESNext | ModuleKind.NodeNext | EnumModuleKind.NodeNext;
export declare const TS_MODULE_KIND_IS_ESM: readonly [
	ModuleKind.ES2015 | EnumModuleKind.ES2015,
	ModuleKind.ES2020 | EnumModuleKind.ES2020,
	ModuleKind.ES2022 | EnumModuleKind.ES2022,
	ModuleKind.ESNext | EnumModuleKind.ESNext,
	ModuleKind.NodeNext | EnumModuleKind.NodeNext
];
export declare const enum EnumJsKind {
	cjs = "cjs",
	esm = "esm"
}
export declare const enum EnumJsKindExt {
	cjs = ".cjs",
	esm = ".mjs"
}
export type IEnumModuleKind = typeof EnumModuleKind | typeof ModuleKind;
export type IModuleKind = ModuleKind | EnumModuleKind;
export type IModuleKindKeys = keyof typeof EnumModuleKind | keyof typeof ModuleKind;
export type IModuleKindNumber = ITSNumberEnumToNumber<IModuleKind>;
export type IModuleKindInput = IModuleKind | IModuleKindNumber;
export type IModuleKindInputMixin = ITSAndTypeAndStringLiteral<IModuleKindKeys | IModuleKindInput, string | number>;
export declare function tsModuleKindIsCJS(module: IModuleKindInput | number): module is ITsModuleKindIsCJS;
export declare function tsModuleKindIsESM(module: IModuleKindInput | number): module is ITsModuleKindIsESM;
export declare function isModuleKindName(module: IModuleKindInputMixin): module is IModuleKindKeys;
export declare function toModuleKindName(module: IModuleKindInputMixin): IModuleKindKeys;
export declare function handleModuleKindLazy(module: IModuleKindInputMixin): ModuleKind;
export declare function tsModuleKindIsCJSLazy(module: IModuleKindInputMixin): module is ITsModuleKindIsCJS;
export declare function tsModuleKindIsESMLazy(module: IModuleKindInputMixin): module is ITsModuleKindIsESM;
export declare function tsModuleKindType(module: IModuleKindInput): EnumJsKind;
export declare function tsModuleKindExt(module: IModuleKindInput): EnumJsKindExt;
export declare function tsModuleKindTypeLazy(module: IModuleKindInputMixin): EnumJsKind;
export declare function tsModuleKindExtLazy(module: IModuleKindInputMixin): EnumJsKindExt;
export declare function getExtensionsByCompilerOptions(options: CompilerOptions & {
	module?: IModuleKindInputMixin;
}): {
	tsExtensions: string[];
	jsExtensions: string[];
	useESM: boolean;
	useCJS: boolean;
	module: ModuleKind;
};

export {
	getExtensionsByCompilerOptions as default,
};

export {};
