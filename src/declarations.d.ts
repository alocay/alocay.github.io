declare module '*.png' {
    const src: string;
    export = src;
}

declare function require(module: string): any;
