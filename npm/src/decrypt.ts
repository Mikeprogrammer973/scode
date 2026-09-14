
import MutationTemplate from "./ciphers/alpha_template/MutationTemplate";
import OrderTemplate from "./ciphers/alpha_template/OrderTemplate";
import SCBacon from "./ciphers/type/SCBacon";
import SCBinary from "./ciphers/type/SCBinary";
import SCECReflector from "./ciphers/type/SCEnigma/SCEComponent/SCECReflector";
import SCECRotor from "./ciphers/type/SCEnigma/SCEComponent/SCECRotor";
import { decode as SCEnigmaDecode } from "./ciphers/type/SCEnigma/SCEnigma";
import SCFrama from "./ciphers/type/SCFrama";
import SCMorse from "./ciphers/type/SCMorse";
import SCNavajo from "./ciphers/type/SCNavajo";
import { polybeDecode } from "./ciphers/type/SCPolybe";
import SCSimply, { SCSCodeLevel } from "./ciphers/type/SCSimply";
import SCVigenere from "./ciphers/type/SCVigenere";
import { validateConfig, validatePattern } from "./pattern/validate";
import type { DecodeOptions, DecodeResult } from "./types";

export function decrypt(
  { encrypted, pattern, config } : DecodeOptions
): DecodeResult {
  if (encrypted.length === 0) {
    throw new Error("Message is empty")
  }

  if (!validatePattern(pattern)) {
    throw new Error("Invalid pattern")
  }

  if (!validateConfig(pattern, config!)) {
    throw new Error("Invalid config")
  }

  let decrypted: string = encrypted
  const config_ = config?.split(" ").reverse()
  const pattern_ = pattern.split("").reverse()

  try {
    pattern_.forEach((symbol) => {
      switch (symbol) {
        case "$":
          decrypted = new SCSimply(SCSCodeLevel.tecla).decode(decrypted)
          break
        case "¢":
          decrypted = new SCSimply(SCSCodeLevel.tecla_m).decode(decrypted)
          break
        case "@":
          decrypted = new SCSimply(SCSCodeLevel.a_num).decode(decrypted)
          break
        case "¬":
          decrypted = new SCMorse().decode(decrypted)
          break
        case "£":
          decrypted = new SCBinary().decode(decrypted)
          break
        case "#":
          decrypted = polybeDecode(decrypted, config_?.shift() || "")
          break
        case "*":
          decrypted = new SCNavajo().decode(decrypted)
          break
        case "?": {
          const rotors: SCECRotor[] = []
          const reflector = new SCECReflector(config_?.shift() || "")
          let l = 0
          while (l < 10) {
            rotors.push(new SCECRotor(config_?.shift() || "", 7))
            l++
          }
          decrypted = SCEnigmaDecode({
            rotors: rotors.reverse(),
            reflector,
            encryptMsg: decrypted,
          })
          break
        }
        case "|":
          decrypted = new SCVigenere(config_?.shift() || "", decrypted).decode()
          break
        case "§":
          decrypted = new SCFrama(config_?.shift() || "").decode(decrypted)
          break
        case "₢":
          decrypted = new SCBacon().decode(decrypted)
          break
        case "&":
          decrypted = MutationTemplate.reciproque(decrypted)
          break
        case "~":
          decrypted = MutationTemplate.decalage(
            decrypted,
            true,
            Number(config_?.shift())
          ).msg
          break
        case ":":
          decrypted = OrderTemplate.reverse(decrypted)
          break
        case "°": {
          let ref = ""
          config_?.forEach((c, i) => {
            if (i === 0) ref = c
          })
          config_?.shift()
          decrypted = OrderTemplate.random(decrypted, ref.split(""), true).msg
          break
        }
      }
    })

    return { status: "success", message: decrypted }
  } catch (e) {
    return {
      status: "error",
      message: e instanceof Error ? e.message : "Unexpected error during decryption.",
    }
  }
}