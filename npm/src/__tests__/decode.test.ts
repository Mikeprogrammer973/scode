import { describe, it, expect } from "vitest"
import { decrypt as decode } from "../decrypt"

describe("decode — input validation", () => {
  it("throws on empty encrypted input", () => {
    expect(() => decode({ encrypted: "", pattern: "¬" })).toThrow(/empty/i)
  })

  it("throws on invalid pattern", () => {
    expect(() => decode({ encrypted: "abc", pattern: "X" })).toThrow(/pattern/i)
  })

  it("throws when config is missing for a cipher that needs it", () => {
    expect(() =>
      decode({ encrypted: "abc", pattern: "|" })
    ).toThrow(/config/i)
  })

  it("throws when config doesn't match the pattern", () => {
    expect(() =>
      decode({ encrypted: "abc", pattern: "|", config: "short" })
    ).toThrow(/config/i)
  })
})