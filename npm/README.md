# @zyther/scode-core

Hand-coding tools for classic ciphers — Enigma, Morse, Polybius, Vigenère, Bacon, and more.


## Install

```bash
npm install @zyther/scode-core
```

## Usage

```ts
import { encode, decode } from "@zyther/scode-core"

// Encode
const result = encode({
  message: "hello world",
  pattern: "¬",             // Morse code
})

console.log(result.encrypted) // "-.-. .... . .-.. .-.. ---"
console.log(result.config)    // "" (no config needed for Morse)

// Decode
const decoded = decode({
  encrypted: result.encrypted,
  pattern: "¬",
  config: result.config,
})

console.log(decoded.message)  // "hello world"
```

## API

### `encode(options)`

Encodes a plain message using the given cipher pattern.

| Option    | Type     | Description                          |
| --------- | -------- | ------------------------------------ |
| `message` | `string` | The plain text to encode.            |
| `pattern` | `string` | The cipher pattern (e.g. `¬`, `?`).  |

**Returns:** `{ encrypted: string, config: string, pattern: string }`

Throws if `message` is empty or `pattern` is invalid.

### `decode(options)`

Decodes an encrypted message back to plain text.

| Option      | Type     | Description                                      |
| ----------- | -------- | ------------------------------------------------ |
| `encrypted` | `string` | The encoded message.                             |
| `pattern`   | `string` | The pattern used during encoding.                |
| `config`    | `string` | Configuration string emitted by `encode` (optional). |

**Returns:** `{ message: string }`

Throws if `encrypted` is empty, `pattern` is invalid, or `config` doesn't match what the pattern requires.

### `listCiphers()`

Returns metadata for every cipher available in the package.

```ts
import { listCiphers } from "@zyther/scode-core"

listCiphers()
// → [
//     { name: "Morse",  symbol: "¬", description: "Morse code." },
//     { name: "Enigma", symbol: "?", description: "WWII Enigma machine." },
//     ...
//   ]
```

### `validatePattern(pattern)`

Returns `true` if the pattern is syntactically valid.

```ts
validatePattern("¬")   // true
validatePattern("&§")  // true
validatePattern("X")   // false
validatePattern("")    // false
```

### `validateConfig(pattern, config)`

Returns `true` if the configuration string satisfies what the pattern requires.

```ts
validateConfig("|", "abcdefghij")    // true  (Vigenère needs a 10-char key)
validateConfig("|", null)            // false
validateConfig("¬", null)            // true  (Morse needs no config)
```

## Cipher patterns

A **pattern** is a string of cipher symbols applied in sequence. Patterns are applied **right-to-left** during encoding (the last symbol is the innermost encoding), so decoding reverses the order.

| Symbol | Cipher                        | Needs config |
| ------ | ----------------------------- | :----------: |
| `$`    | SCSimply — `key` level        |      no      |
| `¢`    | SCSimply — `key_m` level      |      no      |
| `@`    | SCSimply — `a_num` level      |      no      |
| `¬`    | Morse                         |      no      |
| `£`    | Binary                        |      no      |
| `#`    | Polybius square               |     yes      |
| `*`    | Navajo                        |      no      |
| `?`    | Enigma machine                |     yes      |
| `\|`    | Vigenère                      |     yes      |
| `§`    | Frama                         |     yes      |
| `₢`    | Bacon                         |      no      |
| `&`    | Mutation — reciprocity        |      no      |
| `~`    | Mutation — decalation         |     yes      |
| `:`    | Order — reverse               |      no      |
| `°`    | Order — random                |     yes      |

**Composition examples:**

```
¬       Morse only
?       Enigma only
&§      Mutation.reciprocity, then Frama
°|#     Order.random, then Vigenère, then Polybius
```

Symbols marked as **restricted** (`&`, `~`, `:`) can only appear at the end of a pattern — they transform the whole message and would break composition.

## Example: chained encoding

```ts
import { encode, decode } from "@zyther/scode-core"

const { encrypted, config, pattern } = encode({
  message: "meet me at dawn",
  pattern: "?|",            // Enigma, then Vigenère
})

console.log(encrypted)
console.log(config)         // space-separated tokens needed for decode

const { message } = decode({ encrypted, pattern, config })
console.log(message)        // "meet me at dawn"
```

## Exports

```ts
// Functions
encode, decode, listCiphers, validatePattern, validateConfig

// Constants
CIPHERS

// Types
EncodeOptions, EncodeResult,
DecodeOptions, DecodeResult,
CipherInfo
```

## Related

- **Web app** — [scode.zyther.dev](https://scode.zyther.dev)
- **Source** — [github.com/zytherdev/scode](https://github.com/zytherdev/scode)

## License

MIT © [Zyther Dev](https://zyther.dev)