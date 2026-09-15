/**
 * Reference class for the alphabet
 */
declare class Alphabet {
    private letters;
    get(): string[];
    normal(): this;
    shuffle(): this;
}

/**
 * @field message
 * @field pattern
 */
interface EncodeOptions {
    message: string;
    pattern: string;
}
/**
 * @field encrypted
 * @field config?
 * @field pattern
 * @field message
 */
interface EncodeResult {
    encrypted: string;
    config?: string;
    pattern: string;
    message: string;
}
/**
 * @field encrypted
 * @field pattern
 * @field config?
 */
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
/**
 * @field name
 * @field symbol
 * @field description
 */
interface CipherInfo {
    name: string;
    symbol: string;
    description: string;
}

/**
 * Decrypt a message
 * @param DecodeOptions options
 * @param {string} options.encrypted value to decrypt
 * @param {string} options.pattern pattern to use
 * @param {object} options.config config to use
 * @returns DecodeResult
 * @throws Error
 * - if the message is empty
 * - if the pattern is invalid
 * - if the config is invalid
 * - if the pattern is not supported
 * - if the config is not supported
 * - if the config is not valid for the pattern
 * - if the config is not valid for the cipher
 */
declare function decrypt({ encrypted, pattern, config }: DecodeOptions): DecodeResult;

/**
 * Encrypts a message using a given pattern
 * @param EncodeOptions options
 * @param {string} options.message The message to encode
 * @param {string} options.pattern The pattern to use for encoding the message
 * @returns EncodeResult
 * @throws Error
 * - if the message is empty or the pattern is invalid
 */
declare function encrypt({ message, pattern }: EncodeOptions): EncodeResult;

declare const CIPHERS: CipherInfo[];
declare function listCiphers(): CipherInfo[];

/**
 * Check if a pattern is valid
 * @param pattern
 * @returns boolean
 */
declare function validatePattern(pattern: string): boolean;
/**
 * Check if a decode config is valid
 * @param pattern
 * @param config
 * @returns boolean
 */
declare function validateConfig(pattern: string, config: string | null): boolean;

/**
 * Check if a symbol is valid
 * @param symbol
 * @returns boolean
 */
declare function isSymbolValid(symbol: string): boolean;
/**
 * Check if a symbol is global
 * @param symbol
 * @returns boolean
 */
declare function isSymbolGlobal(symbol: string): boolean;
/**
 * Check if a symbol needs a config
 * @param symbol
 * @returns boolean
 */
declare function symbolNeedsConfig(symbol: string): boolean;
/**
 * Get all the available ciphers symbols
 * @returns string[]
 */
declare function allSymbols(): string[];
/**
 * Get all the available global symbols
 * @returns string[]
 */
declare function allGlobalSymbols(): string[];
/**
 * Get all the available symbols that need a config
 * @returns string[]
 */
declare function allSymbolsWithConfig(): string[];
/**
 * Get all the available ciphers names
 * @returns string[]
 */
declare function allNames(): string[];

/**
 * Format a string to be used in the encryption process
 * - Remove all spaces
 * - Convert to uppercase
 * - Remove all non valid characters
 * @param str
 * @returns string
 */
declare function format_str(str: string): string;

/**
 * Checks if a character is valid
 * @param char
 * @returns boolean
 */
declare function valid_char(char: string): boolean;

export { Alphabet, CIPHERS, type CipherInfo, type DecodeOptions, type DecodeResult, type EncodeOptions, type EncodeResult, allGlobalSymbols, allNames, allSymbols, allSymbolsWithConfig, decrypt as decode, encrypt as encode, format_str, isSymbolGlobal, isSymbolValid, listCiphers, symbolNeedsConfig, valid_char, validateConfig, validatePattern };
