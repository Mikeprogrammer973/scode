import type { DecryptDocContent } from "./generate_word"

export function generateTxtFile(
  content: DecryptDocContent,
  filename = "scode_decrypt_config.txt"
): void {
  const text = `SCode — Decode configuration
================================

Original message:
${content.originalMsg}

Encrypted message:
${content.encryptedMsg}

Decode configuration
--------------------
Pattern:
${content.config.pattern}

Parameters:
${content.config.params}

© ${new Date().getFullYear()} SCode. All rights reserved.
`

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // deixa o browser iniciar o download antes de revogar
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}