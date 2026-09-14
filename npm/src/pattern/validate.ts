import PatternSymbols from "../refs/pattern_symbols_refs"

export function validatePattern(pattern: string): boolean {
  if (!pattern || pattern.length === 0) return false

  let end = false
  for (const symbol of pattern) {
    if (PatternSymbols.all().indexOf(symbol) === -1) return false
    if (end) return false
    if (PatternSymbols.global().indexOf(symbol) === -1) end = true
  }

  return true
}

export function validateConfig(pattern: string, config: string | null): boolean {
  const wConfig = pattern
    .split("")
    .filter((s) => PatternSymbols.with_config().indexOf(s) !== -1)

  if ((config === null || config === "") && wConfig.length > 0) {
    return false
  }

  const tokens = config?.split(" ") ?? []

  for (const symbol of wConfig) {
    switch (symbol) {
      case "#": {
        // Polybius
        const v = tokens.shift()
        if (v === undefined || v.length !== 26) return false
        break
      }
      case "?": {
        // Enigma
        if (tokens.length < 11) return false
        for (let i = 0; i < 11; i++) {
          const t = tokens.shift()
          if (t === undefined || t.length !== 26) return false
        }
        break
      }
      case "|": {
        // Vigenère
        const v = tokens.shift()
        if (v === undefined || v.length !== 10) return false
        break
      }
      case "§": {
        // Frama
        const v = tokens.shift()
        if (v === undefined || v.length !== 10) return false
        break
      }
      case "~": {
        // Mutation decalation
        const v = tokens.shift()
        if (v === undefined || Number.isNaN(Number(v))) return false
        break
      }
      case "°": {
        // Order random
        const v = tokens.shift()
        if (v === undefined || v.length !== 26) return false
        break
      }
    }
  }

  if (tokens.length > 0 && config !== "") return false

  return true
}