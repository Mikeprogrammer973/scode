import PatternSymbols from "../refs/pattern_symbols_refs"

/**
 * Check if a symbol is valid
 * @param symbol 
 * @returns boolean
 */
export function isSymbolValid(symbol: string): boolean {
  return PatternSymbols.all().indexOf(symbol) !== -1
}

/**
 * Check if a symbol is global
 * @param symbol 
 * @returns boolean
 */
export function isSymbolGlobal(symbol: string): boolean {
  return PatternSymbols.global().indexOf(symbol) !== -1
}

/**
 * Check if a symbol needs a config
 * @param symbol 
 * @returns boolean
 */
export function symbolNeedsConfig(symbol: string): boolean {
  return PatternSymbols.with_config().indexOf(symbol) !== -1
}

/**
 * Get all the available ciphers symbols
 * @returns string[]
 */
export function allSymbols(): string[] {
  return PatternSymbols.all()
}

/**
 * Get all the available global symbols
 * @returns string[]
 */
export function allGlobalSymbols(): string[] {
  return PatternSymbols.global()
}

/**
 * Get all the available symbols that need a config
 * @returns string[]
 */
export function allSymbolsWithConfig(): string[] {
  return PatternSymbols.with_config()
}

/**
 * Get all the available ciphers names
 * @returns string[]
 */
export function allNames(): string[] {
  return PatternSymbols.all_names()
}