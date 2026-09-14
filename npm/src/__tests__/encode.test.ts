import { describe, it, expect } from "vitest"
import { encrypt as encode } from "../encrypt"

describe("encode — input validation", () => {
  it("throws on empty message", () => {
    expect(() => encode({ message: "", pattern: "¬" })).toThrow(/empty/i)
  })

  it("throws on invalid pattern", () => {
    expect(() => encode({ message: "hi", pattern: "X" })).toThrow(/pattern/i)
    expect(() => encode({ message: "hi", pattern: "" })).toThrow(/pattern/i)
  })

  it("throws on restricted symbol in the middle", () => {
    expect(() => encode({ message: "hi", pattern: "&#?" })).toThrow(/pattern/i)
  })
})