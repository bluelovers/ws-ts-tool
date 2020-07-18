import ITsconfig from '@ts-type/package-dts/tsconfig-json';
export interface IOptions {
    cwd?: string;
    bin?: string;
    sourceFile?: string;
    extraArgv?: string[];
}
export interface IOptionsOutput extends IOptions {
    outputFile?: string;
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
export declare function outputCurrentTsconfig(options?: IOptionsOutput): void;
export default getCurrentTsconfig;
