import { ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';
export declare const enum EnumTsdxFormat {
    'cjs' = "cjs",
    'umd' = "umd",
    'esm' = "esm",
    'system' = "system"
}
export type IModuleFormat = ITSTypeAndStringLiteral<EnumTsdxFormat>;
export declare function defaultFormatOrder(): readonly [EnumTsdxFormat.esm, EnumTsdxFormat.cjs, EnumTsdxFormat.umd];
export declare function getExtensionsByFormat(currentFormat: IModuleFormat): (".cts" | ".mts" | ".umd.ts" | ".ts" | ".tsx" | ".jsx" | ".cjs" | ".mjs" | ".umd.js" | ".js")[];
export default getExtensionsByFormat;
