import { describe, it, expect } from "vitest"
import {
  allSymbols,
  allGlobalSymbols,
  isSymbolValid,
  isSymbolGlobal,
  symbolNeedsConfig,
} from "../pattern/symbols"

describe("symbols", () => {
  it("allSymbols includes every known cipher symbol", () => {
    const symbols = allSymbols()
    expect(symbols).toContain("¬") // Morse
    expect(symbols).toContain("?") // Enigma
    expect(symbols).toContain("|") // Vigenère
    expect(symbols).toContain("&") // Mutation
  })

  it("isSymbolValid checks against the registry", () => {
    expect(isSymbolValid("¬")).toBe(true)
    expect(isSymbolValid("X")).toBe(false)
  })

  it("isSymbolGlobal distinguishes composable symbols", () => {
    expect(isSymbolGlobal(":")).toBe(true)
    expect(isSymbolGlobal("₢")).toBe(false)
  })

  it("symbolNeedsConfig identifies ciphers that consume config", () => {
    expect(symbolNeedsConfig("¬")).toBe(false)
    expect(symbolNeedsConfig("?")).toBe(true)
    expect(symbolNeedsConfig("|")).toBe(true)
    expect(symbolNeedsConfig("#")).toBe(true)
  })
})