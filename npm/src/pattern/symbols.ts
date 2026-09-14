import PatternSymbols from "../refs/pattern_symbols_refs"

export function isSymbolValid(symbol: string): boolean {
  return PatternSymbols.all().indexOf(symbol) !== -1
}

export function isSymbolGlobal(symbol: string): boolean {
  return PatternSymbols.global().indexOf(symbol) !== -1
}

export function symbolNeedsConfig(symbol: string): boolean {
  return PatternSymbols.with_config().indexOf(symbol) !== -1
}

export function allSymbols(): string[] {
  return PatternSymbols.all()
}

export function allGlobalSymbols(): string[] {
  return PatternSymbols.global()
}

export function allNames(): string[] {
  return PatternSymbols.all_names()
}