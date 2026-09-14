import { describe, it, expect } from "vitest"
import { validateConfig } from "../pattern/validate"

describe("validateConfig", () => {
  it("accepts empty config for ciphers that don't need it", () => {
    expect(validateConfig("¬", null)).toBe(true)
    expect(validateConfig("¬", "")).toBe(true)
    expect(validateConfig("?", null)).toBe(false) // Enigma needs config
  })

  it("rejects missing config when the pattern requires it", () => {
    expect(validateConfig("|", null)).toBe(false)
    expect(validateConfig("|", "")).toBe(false)
    expect(validateConfig("#", null)).toBe(false)
    expect(validateConfig("§", null)).toBe(false)
    expect(validateConfig("°", null)).toBe(false)
  })

  describe("Vigenère (|)", () => {
    it("accepts a 10-char token", () => {
      expect(validateConfig("|", "abcdefghij")).toBe(true)
    })

    it("rejects a token of the wrong length", () => {
      expect(validateConfig("|", "abc")).toBe(false)
      expect(validateConfig("|", "abcdefghijk")).toBe(false)
    })
  })

  describe("Polybius (#)", () => {
    it("accepts a 26-char token", () => {
      const grid = "abcdefghijklmnopqrstuvwxyz"
      expect(validateConfig("#", grid)).toBe(true)
    })

    it("rejects a token of the wrong length", () => {
      expect(validateConfig("#", "abc")).toBe(false)
    })
  })

  describe("Frama (§)", () => {
    it("accepts a 10-char token", () => {
      expect(validateConfig("§", "abcdefghij")).toBe(true)
    })

    it("rejects a token of the wrong length", () => {
      expect(validateConfig("§", "abc")).toBe(false)
    })
  })

  describe("Order random (°)", () => {
    it("accepts a 26-char token", () => {
      const ref = "abcdefghijklmnopqrstuvwxyz"
      expect(validateConfig("°", ref)).toBe(true)
    })

    it("rejects a token of the wrong length", () => {
      expect(validateConfig("°", "abc")).toBe(false)
    })
  })

  describe("Mutation decalation (~)", () => {
    it("accepts a numeric token", () => {
      expect(validateConfig("~", "5")).toBe(true)
      expect(validateConfig("~", "24")).toBe(true)
    })

    it("rejects a non-numeric token", () => {
      expect(validateConfig("~", "abc")).toBe(false)
    })
  })

  describe("Enigma (?)", () => {
    it("accepts 11 tokens of 26 chars each", () => {
      const alphabet = "abcdefghijklmnopqrstuvwxyz"
      const config = Array(11).fill(alphabet).join(" ")
      expect(validateConfig("?", config)).toBe(true)
    })

    it("rejects fewer than 11 tokens", () => {
      const alphabet = "abcdefghijklmnopqrstuvwxyz"
      const config = Array(10).fill(alphabet).join(" ")
      expect(validateConfig("?", config)).toBe(false)
    })

    it("rejects tokens with wrong length", () => {
      const alphabet = "abcdefghijklmnopqrstuvwxyz"
      const config = Array(10).fill(alphabet).join(" ") + " short"
      expect(validateConfig("?", config)).toBe(false)
    })
  })

  describe("chained config", () => {
    it("accepts matching tokens in order", () => {
      const vigenere = "abcdefghij"
      const frama = "abcdefghij"
      expect(validateConfig("|§", `${vigenere} ${frama}`)).toBe(true)
    })

    it("rejects when a token is missing", () => {
      const vigenere = "abcdefghij"
      expect(validateConfig("|§", vigenere)).toBe(false)
    })

    it("rejects when extra tokens remain", () => {
      const vigenere = "abcdefghij"
      const frama = "abcdefghij"
      expect(validateConfig("|§", `${vigenere} ${frama} extra`)).toBe(false)
    })
  })
})