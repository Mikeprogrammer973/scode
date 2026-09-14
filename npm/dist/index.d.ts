declare class Alphabet {
    private letters;
    get(): string[];
    normal(): this;
    shuffle(): this;
}

interface EncodeOptions {
    message: string;
    pattern: string;
}
interface EncodeResult {
    encrypted: string;
    config?: string;
    pattern: string;
    message: string;
}
interface DecodeOptions {
    encrypted: string;
    pattern: string;
    config?: string;
}
type DecodeResult = {
    status: "success";
    message: string;
} | {
    status: "empty";
} | {
    status: "invalid-config";
} | {
    status: "error";
    message: string;
};
interface CipherInfo {
    name: string;
    symbol: string;
    description: string;
}

declare function decrypt({ encrypted, pattern, config }: DecodeOptions): DecodeResult;

declare function encrypt({ message, pattern }: EncodeOptions): EncodeResult;

declare const CIPHERS: CipherInfo[];
declare function listCiphers(): CipherInfo[];

declare function validatePattern(pattern: string): boolean;
declare function validateConfig(pattern: string, config: string | null): boolean;

declare function isSymbolValid(symbol: string): boolean;
declare function isSymbolGlobal(symbol: string): boolean;
declare function symbolNeedsConfig(symbol: string): boolean;
declare function allSymbols(): string[];
declare function allGlobalSymbols(): string[];
declare function allNames(): string[];

declare function format_str(str: string): string;

declare function valid_char(char: string): boolean;

export { Alphabet, CIPHERS, type CipherInfo, type DecodeOptions, type DecodeResult, type EncodeOptions, type EncodeResult, allGlobalSymbols, allNames, allSymbols, decrypt as decode, encrypt as encode, format_str, isSymbolGlobal, isSymbolValid, listCiphers, symbolNeedsConfig, valid_char, validateConfig, validatePattern };
