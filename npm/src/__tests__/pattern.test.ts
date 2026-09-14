import { describe, it, expect } from "vitest"
import { validatePattern } from "../pattern/validate"

describe("validatePattern", () => {
  it("rejects empty patterns", () => {
    expect(validatePattern("")).toBe(false)
  })

  it("rejects unknown symbols", () => {
    expect(validatePattern("X")).toBe(false)
    expect(validatePattern("?X")).toBe(false)
    expect(validatePattern("abc")).toBe(false)
  })

  it("accepts every known symbol in isolation", () => {
    const symbols = ["$", "¢", "@", "¬", "£", "#", "*", "?", "|", "§", "₢", "&", "~", ":", "°"]
    for (const s of symbols) {
      expect(validatePattern(s)).toBe(true)
    }
  })

  it("accepts compositions of global symbols", () => {
    expect(validatePattern("?&")).toBe(true)
    expect(validatePattern("?~°")).toBe(true)
    expect(validatePattern("?:&~")).toBe(true)
  })

  it("rejects restricted symbols in the middle", () => {
    expect(validatePattern("&#?")).toBe(false)
    expect(validatePattern("~*?")).toBe(false)
    expect(validatePattern(":§?")).toBe(false)
  })

  it("accepts restricted symbols only at the end", () => {
    expect(validatePattern("?&£")).toBe(true)
    expect(validatePattern("?~#")).toBe(true)
    expect(validatePattern("?:¬")).toBe(true)
  })
})