import type { CipherInfo } from "../types";

export const CIPHERS: CipherInfo[] = [
  { name: "Simply",   symbol: "$", description: "SCSimply (tecla level)." },
  { name: "Simply",   symbol: "¢", description: "SCSimply (tecla_m level)." },
  { name: "Simply",   symbol: "@", description: "SCSimply (a_num level)." },
  { name: "Morse",    symbol: "¬", description: "Morse code." },
  { name: "Binary",   symbol: "£", description: "Binary encoding." },
  { name: "Polybe",   symbol: "#", description: "Polybius square." },
  { name: "Navajo",   symbol: "*", description: "Navajo code talkers." },
  { name: "Enigma",   symbol: "?", description: "WWII Enigma machine." },
  { name: "Vigenere", symbol: "|", description: "Vigenère cipher." },
  { name: "Frama",    symbol: "§", description: "Frama symbol substitution." },
  { name: "Bacon",    symbol: "₢", description: "Bacon's cipher." },
  { name: "Mutation", symbol: "&", description: "Mutation — reciprocity." },
  { name: "Mutation", symbol: "~", description: "Mutation — decalation." },
  { name: "Order",    symbol: ":", description: "Order — reverse." },
  { name: "Order",    symbol: "°", description: "Order — random." },
]

export function listCiphers(): CipherInfo[] {
  return CIPHERS
}