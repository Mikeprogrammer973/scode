import MutationTemplate from "../../code/alpha_template/MutationTemplate";
import OrderTemplate from "../../code/alpha_template/OrderTemplate";
import SCBacon from "../../code/type/SCBacon";
import SCBinary from "../../code/type/SCBinary";
import SCECReflector from "../../code/type/SCEnigma/SCEComponent/SCECReflector";
import SCECRotor from "../../code/type/SCEnigma/SCEComponent/SCECRotor";
import { decodificar } from "../../code/type/SCEnigma/SCEnigma";
import SCFrama from "../../code/type/SCFrama";
import SCMorse from "../../code/type/SCMorse";
import SCNavajo from "../../code/type/SCNavajo";
import { polybeDecode } from "../../code/type/SCPolybe";
import SCSimply, { SCSCodeLevel } from "../../code/type/SCSimply";
import SCVigenere from "../../code/type/SCVigenere";
import valid_decrypt_config from "./verify_decrypt_config";

export default function decrypt_msg(pattern: string, config: string | null, msg: string): string
{
    let decrypted_msg: string = msg

    if(!valid_decrypt_config(pattern, config))
    {
        return "Invalid decrypt configuration!"
    } else{
        // Decrypt message
        const config_ = config?.split(' ').reverse()
        const pattern_ = pattern.split('').reverse()
        
        pattern_.forEach(symbol =>{
            switch(symbol)
            {
                case "$": // SCSimply TK
                    decrypted_msg = new SCSimply(SCSCodeLevel.tecla).decodificar(decrypted_msg)
                    break
                case "¢": // SCSimply TM
                    decrypted_msg = new SCSimply(SCSCodeLevel.tecla_m).decodificar(decrypted_msg)
                    break
                case "@": // SCSimply Num
                    decrypted_msg = new SCSimply(SCSCodeLevel.a_num).decodificar(decrypted_msg)
                    break
                case "¬": // SCMorse
                    decrypted_msg = new SCMorse().decodificar(decrypted_msg)
                    break
                case "£": // SCBinary
                    decrypted_msg = new SCBinary().decodificar(decrypted_msg)
                    break
                case "#": // SCPolybe
                    decrypted_msg = polybeDecode(decrypted_msg, config_?.shift() || "")
                    break
                case "*": // SCNavajo
                    decrypted_msg = new SCNavajo().decodificar(decrypted_msg)
                    break
                case "?": // SCEnigma
                    const rotors: SCECRotor[] = []
                    const reflector: SCECReflector = new SCECReflector(config_?.shift() || "")
                    let l = 0
                    while(l < 10)
                    {
                        rotors.push(new SCECRotor(config_?.shift() || "", 7))
                        l++
                    }
                    decrypted_msg = decodificar({rotors: rotors.reverse(), reflector: reflector, encryptMsg: decrypted_msg})
                    break
                case "|": // SCVigenere
                    decrypted_msg = new SCVigenere(config_?.shift() || "", decrypted_msg).decodificar()
                    break
                case "§": // SCFrama
                    decrypted_msg = new SCFrama(config_?.shift() || "").decodificar(decrypted_msg)
                    break
                case "₢": // SCBacon
                    decrypted_msg = new SCBacon().decodificar(decrypted_msg)
                    break
                case "&": // Mutation reciproque
                    decrypted_msg = MutationTemplate.reciproque(decrypted_msg)
                    break
                case "~": // Mutation decalage
                    decrypted_msg = MutationTemplate.decalage(decrypted_msg, true, Number(config_?.shift())).msg
                    break
                case ":": // Order reverse
                    decrypted_msg = OrderTemplate.reverse(decrypted_msg)
                    break
                case "°": // Order random
                    let ref: string = ""
                    config_?.forEach((c, i) =>{
                        if(i == 0) ref = c
                    })
                    config_?.shift()
                    decrypted_msg = OrderTemplate.random(decrypted_msg, ref.split(''), true).msg
    
            }
    
        })
    }

   return decrypted_msg
}