import { ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';
export declare const enum EnumTsdxFormat {
    'cjs' = "cjs",
    'umd' = "umd",
    'esm' = "esm",
    'system' = "system"
}
export type IModuleFormat = ITSTypeAndStringLiteral<EnumTsdxFormat>;
export declare function defaultFormatOrder(): readonly [EnumTsdxFormat.esm, EnumTsdxFormat.cjs, EnumTsdxFormat.umd];
export declare function defaultAllowedFormat(): readonly [EnumTsdxFormat.esm, EnumTsdxFormat.cjs, EnumTsdxFormat.umd, EnumTsdxFormat.system];
export declare function isAllowedFormat(format: IModuleFormat): format is EnumTsdxFormat;
export declare function _getExtensionsByFormat(currentFormat: IModuleFormat): readonly (".cts" | ".mts" | ".umd.ts" | ".ts" | ".tsx" | ".jsx" | ".cjs" | ".mjs" | ".umd.js" | ".js")[];
export declare function getExtensionsByFormat(currentFormat: IModuleFormat): readonly (".cts" | ".mts" | ".umd.ts" | ".ts" | ".tsx" | ".jsx" | ".cjs" | ".mjs" | ".umd.js" | ".js")[];
export default getExtensionsByFormat;
