/**
 * @author Zyther Dev <zyther.dev@outlook.com>
 * @alias zytherdev <https://github.com/zytherdev>
 */

import Alphabet from "./refs/alphabet_reference";

export { decrypt as decode } from "./decrypt";
export { encrypt as encode } from "./encrypt";
export { listCiphers, CIPHERS } from "./ciphers"
export * from "./pattern/validate"
export * from "./pattern/symbols"
export { format_str } from "./utils/in/format_str"
export { valid_char } from "./utils/in/verify_char"

export { Alphabet }

export type {
  EncodeOptions,
  EncodeResult,
  DecodeOptions,
  DecodeResult,
  CipherInfo,
} from "./types"