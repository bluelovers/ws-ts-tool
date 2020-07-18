import ITsconfig from '@ts-type/package-dts/tsconfig-json';
export interface IOptions {
    cwd?: string;
    bin?: string;
    sourceFile?: string;
    extraArgv?: string[];
}
export declare type IOptionsArgv = [
    cwd?: string,
    bin?: string,
    sourceFile?: string,
    extraArgv?: string[]
] | [
    options: IOptions
];
export declare function handleOptions(...argv: IOptionsArgv): IOptions;
export declare function getCurrentTsconfig(...argv: IOptionsArgv): ITsconfig;
export default getCurrentTsconfig;
