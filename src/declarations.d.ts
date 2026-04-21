declare module '*.png' {
    const src: string;
    export = src;
}

declare module '*.css' {}

declare function require(module: string): any;
