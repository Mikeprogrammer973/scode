import MutationTemplate from "../../cipher/alpha_template/MutationTemplate"
import OrderTemplate from "../../cipher/alpha_template/OrderTemplate"
import SCBacon from "../../cipher/type/SCBacon"
import SCBinary from "../../cipher/type/SCBinary"
import codificar from "../../cipher/type/SCEnigma/SCEnigma"
import SCFrama from "../../cipher/type/SCFrama"
import SCMorse from "../../cipher/type/SCMorse"
import SCNavajo from "../../cipher/type/SCNavajo"
import polybeEncode from "../../cipher/type/SCPolybe"
import SCSimply, { SCSCodeLevel } from "../../cipher/type/SCSimply"
import SCVigenere from "../../cipher/type/SCVigenere"
import Alphabet from "../refs/alphabet_reference"

export default function encrypt_msg(pattern: string, msg: string): {crypted_msg: string, decrypt_config: string | null, msg: string}
{
    if(msg.length == 0)
    {
        return {
            crypted_msg: "error",
            decrypt_config: null,
            msg: ""
        }
    }

    let decrypt_config: string  = ""
    let crypted_msg: string = msg
    let key: string = ""

    function generateKey(): string
    {
        return new Alphabet().shuffle().get().map((l, i)=>{
            if(i < 10) return l
        }).join('')
    }

    pattern.split('').forEach(symbol =>{
        switch(symbol)
        {
            case "$": // SCSimply TK
                crypted_msg = new SCSimply(SCSCodeLevel.tecla).codificar(crypted_msg)
                break
            case "¢": // SCSimply TM
                crypted_msg = new SCSimply(SCSCodeLevel.tecla_m).codificar(crypted_msg)
                break
            case "@": // SCSimply Num
                crypted_msg =  new SCSimply(SCSCodeLevel.a_num).codificar(crypted_msg)
                break
            case "¬": // SCMorse
                crypted_msg = new SCMorse().codificar(crypted_msg)
                break
            case "£": // SCBinary
                crypted_msg = new SCBinary().codificar(crypted_msg)
                break
            case "#": // SCPolybe
                const polybe = polybeEncode(crypted_msg)
                decrypt_config += ` ${polybe.grid_ref}`
                crypted_msg = polybe.msg
                break
            case "*": // SCNavajo
                crypted_msg = new SCNavajo().codificar(crypted_msg)
                break
            case "?": // SCEnigma
                const enigmaKey = codificar(crypted_msg)
                enigmaKey.rotors.forEach(rotor =>{
                    decrypt_config += ` ${rotor.wiring}`
                })
                decrypt_config += ` ${enigmaKey.reflector.wiring}`
                crypted_msg = enigmaKey.encryptMsg
                break
            case "|": // SCVigenere
                key = generateKey()
                crypted_msg = new SCVigenere(key, crypted_msg).codificar()
                decrypt_config += ` ${key}`
                break
            case "§": // SCFrama
                key = generateKey()
                crypted_msg = new SCFrama(key).codificar(crypted_msg)
                decrypt_config += ` ${key}`
                break
            case "₢": // SCBacon
                crypted_msg = new SCBacon().codificar(crypted_msg)
                break
            case "&": // Mutation reciproque
                crypted_msg = MutationTemplate.reciproque(crypted_msg)
                break
            case "~": // Mutation decalage
                const gap = MutationTemplate.decalage(crypted_msg)
                crypted_msg = gap.msg
                decrypt_config += ` ${gap.decalage}`
                break
            case ":": // Order reverse
                crypted_msg = OrderTemplate.reverse(crypted_msg)
                break
            case "°": // Order random
                const rand = OrderTemplate.random(crypted_msg)
                crypted_msg = rand.msg
                decrypt_config += ` ${rand.alpha_ref.join('')}`

        }

    })

    return {
        crypted_msg: crypted_msg,
        decrypt_config: (decrypt_config.length > 0 ? decrypt_config.trim() : null),
        msg: msg
    }
}