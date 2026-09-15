/**
 * @field message
 * @field pattern
 */
export interface EncodeOptions {
  message: string
  pattern: string
}

/**
 * @field encrypted
 * @field config?
 * @field pattern
 * @field message
 */
export interface EncodeResult {
  encrypted: string
  config?: string
  pattern: string
  message: string
}

/**
 * @field encrypted
 * @field pattern
 * @field config?
 */
export interface DecodeOptions {
  encrypted: string
  pattern: string
  config?: string
}

export type DecodeResult =
  | { status: "success"; message: string }
  | { status: "empty" }
  | { status: "invalid-config" }
  | { status: "error"; message: string }


/**
 * @field name
 * @field symbol
 * @field description
 */
export interface CipherInfo {
  name: string
  symbol: string
  description: string
}