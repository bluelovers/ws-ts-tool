import { ITSAndTypeAndStringLiteral } from 'ts-type/lib/helper/string';
import { CompilerOptions, ModuleKind } from 'typescript';

export declare type ITsModuleKindIsCJS = ModuleKind.CommonJS | ModuleKind.Node12;
export declare const TS_MODULE_KIND_IS_CJS: readonly [
	ModuleKind.CommonJS,
	ModuleKind.Node12
];
export declare type ITsModuleKindIsESM = ModuleKind.ES2015 | ModuleKind.ES2020 | ModuleKind.ES2022 | ModuleKind.ESNext | ModuleKind.NodeNext;
export declare const TS_MODULE_KIND_IS_ESM: readonly [
	ModuleKind.ES2015,
	ModuleKind.ES2020,
	ModuleKind.ES2022,
	ModuleKind.ESNext,
	ModuleKind.NodeNext
];
export declare const enum EnumJsKind {
	cjs = "cjs",
	esm = "esm"
}
export declare function tsModuleKindIsCJS(module: ModuleKind | number): module is ITsModuleKindIsCJS;
export declare function tsModuleKindIsESM(module: ModuleKind | number): module is ITsModuleKindIsESM;
export declare function handleModuleKindLazy(module: ITSAndTypeAndStringLiteral<keyof typeof ModuleKind | ModuleKind, string | number>): ModuleKind;
export declare function tsModuleKindIsCJSLazy(module: ITSAndTypeAndStringLiteral<keyof typeof ModuleKind | ModuleKind, string | number>): module is ITsModuleKindIsCJS;
export declare function tsModuleKindIsESMLazy(module: ITSAndTypeAndStringLiteral<keyof typeof ModuleKind | ModuleKind, string | number>): module is ITsModuleKindIsESM;
export declare function tsModuleKind(module: ModuleKind | number): EnumJsKind;
export declare function tsModuleKindLazy(module: ITSAndTypeAndStringLiteral<keyof typeof ModuleKind | ModuleKind, string | number>): EnumJsKind;
export declare function getExtensionsByCompilerOptions(options: CompilerOptions & {
	module?: ITSAndTypeAndStringLiteral<keyof typeof ModuleKind | ModuleKind, string | number>;
}): {
	tsExtensions: string[];
	jsExtensions: string[];
	useESM: boolean;
	useCJS: boolean;
	module: ModuleKind;
};
export default getExtensionsByCompilerOptions;

export {};
