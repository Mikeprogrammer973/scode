export interface EncodeOptions {
  message: string
  pattern: string
}

export interface EncodeResult {
  encrypted: string
  config?: string
  pattern: string
  message: string
}

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


export interface CipherInfo {
  name: string
  symbol: string
  description: string
}