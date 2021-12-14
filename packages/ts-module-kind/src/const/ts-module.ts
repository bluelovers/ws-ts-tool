import { ModuleKind } from 'typescript';

export type ITsModuleKindIsCJS = ModuleKind.CommonJS | ModuleKind.Node12;
export const TS_MODULE_KIND_IS_CJS = [1 as ModuleKind.CommonJS, 100 as ModuleKind.Node12] as const;

export type ITsModuleKindIsESM = ModuleKind.ES2015 | ModuleKind.ES2020 | ModuleKind.ES2022 | ModuleKind.ESNext | ModuleKind.NodeNext;
export const TS_MODULE_KIND_IS_ESM = [5 as ModuleKind.ES2015, 6 as ModuleKind.ES2020, 7 as ModuleKind.ES2022, 99 as ModuleKind.ESNext, 199 as ModuleKind.NodeNext] as const;

