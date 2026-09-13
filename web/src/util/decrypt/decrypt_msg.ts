import MutationTemplate from "../../cipher/alpha_template/MutationTemplate"
import OrderTemplate from "../../cipher/alpha_template/OrderTemplate"
import SCBacon from "../../cipher/type/SCBacon"
import SCBinary from "../../cipher/type/SCBinary"
import SCECReflector from "../../cipher/type/SCEnigma/SCEComponent/SCECReflector"
import SCECRotor from "../../cipher/type/SCEnigma/SCEComponent/SCECRotor"
import { decodificar } from "../../cipher/type/SCEnigma/SCEnigma"
import SCFrama from "../../cipher/type/SCFrama"
import SCMorse from "../../cipher/type/SCMorse"
import SCNavajo from "../../cipher/type/SCNavajo"
import { polybeDecode } from "../../cipher/type/SCPolybe"
import SCSimply, { SCSCodeLevel } from "../../cipher/type/SCSimply"
import SCVigenere from "../../cipher/type/SCVigenere"
import valid_decrypt_config from "./verify_decrypt_config"

export type DecryptResult =
  | { status: "success"; message: string }
  | { status: "empty" }
  | { status: "invalid-config" }
  | { status: "error"; message: string }

export default function decrypt_msg(
  pattern: string,
  config: string | null,
  msg: string
): DecryptResult {
  if (msg.length === 0) {
    return { status: "empty" }
  }

  if (!valid_decrypt_config(pattern, config)) {
    return { status: "invalid-config" }
  }

  let decrypted_msg: string = msg
  const config_ = config?.split(" ").reverse()
  const pattern_ = pattern.split("").reverse()

  try {
    pattern_.forEach((symbol) => {
      switch (symbol) {
        case "$":
          decrypted_msg = new SCSimply(SCSCodeLevel.tecla).decodificar(decrypted_msg)
          break
        case "¢":
          decrypted_msg = new SCSimply(SCSCodeLevel.tecla_m).decodificar(decrypted_msg)
          break
        case "@":
          decrypted_msg = new SCSimply(SCSCodeLevel.a_num).decodificar(decrypted_msg)
          break
        case "¬":
          decrypted_msg = new SCMorse().decodificar(decrypted_msg)
          break
        case "£":
          decrypted_msg = new SCBinary().decodificar(decrypted_msg)
          break
        case "#":
          decrypted_msg = polybeDecode(decrypted_msg, config_?.shift() || "")
          break
        case "*":
          decrypted_msg = new SCNavajo().decodificar(decrypted_msg)
          break
        case "?": {
          const rotors: SCECRotor[] = []
          const reflector = new SCECReflector(config_?.shift() || "")
          let l = 0
          while (l < 10) {
            rotors.push(new SCECRotor(config_?.shift() || "", 7))
            l++
          }
          decrypted_msg = decodificar({
            rotors: rotors.reverse(),
            reflector,
            encryptMsg: decrypted_msg,
          })
          break
        }
        case "|":
          decrypted_msg = new SCVigenere(config_?.shift() || "", decrypted_msg).decodificar()
          break
        case "§":
          decrypted_msg = new SCFrama(config_?.shift() || "").decodificar(decrypted_msg)
          break
        case "₢":
          decrypted_msg = new SCBacon().decodificar(decrypted_msg)
          break
        case "&":
          decrypted_msg = MutationTemplate.reciproque(decrypted_msg)
          break
        case "~":
          decrypted_msg = MutationTemplate.decalage(
            decrypted_msg,
            true,
            Number(config_?.shift())
          ).msg
          break
        case ":":
          decrypted_msg = OrderTemplate.reverse(decrypted_msg)
          break
        case "°": {
          let ref = ""
          config_?.forEach((c, i) => {
            if (i === 0) ref = c
          })
          config_?.shift()
          decrypted_msg = OrderTemplate.random(decrypted_msg, ref.split(""), true).msg
          break
        }
      }
    })

    return { status: "success", message: decrypted_msg }
  } catch (e) {
    return {
      status: "error",
      message: e instanceof Error ? e.message : "Unexpected error during decryption.",
    }
  }
}