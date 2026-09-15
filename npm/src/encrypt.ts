
import MutationTemplate from "./ciphers/alpha_template/MutationTemplate";
import OrderTemplate from "./ciphers/alpha_template/OrderTemplate";
import SCBacon from "./ciphers/type/SCBacon";
import SCBinary from "./ciphers/type/SCBinary";
import { encode as EnigmaEncode} from "./ciphers/type/SCEnigma/SCEnigma";
import SCFrama from "./ciphers/type/SCFrama";
import SCMorse from "./ciphers/type/SCMorse";
import SCNavajo from "./ciphers/type/SCNavajo";
import polybeEncode from "./ciphers/type/SCPolybe";
import SCSimply, { SCSCodeLevel } from "./ciphers/type/SCSimply";
import SCVigenere from "./ciphers/type/SCVigenere";
import { validatePattern } from "./pattern/validate";
import Alphabet from "./refs/alphabet_reference";
import type { EncodeOptions, EncodeResult } from "./types";
import { format_str } from "./utils/in/format_str";

/**
 * Encrypts a message using a given pattern
 * @param EncodeOptions options
 * @param {string} options.message The message to encode
 * @param {string} options.pattern The pattern to use for encoding the message
 * @returns EncodeResult
 * @throws Error 
 * - if the message is empty or the pattern is invalid
 */
export function encrypt({ message, pattern }: EncodeOptions): EncodeResult
{
    if(message.length === 0)
    {
        throw new Error("Message is empty")
    }

    if(!validatePattern(pattern)) {
        throw new Error("Invalid pattern")
    }

    let decrypt_config: string  = ""
    let crypted: string = format_str(message)
    let key: string = ""

    function generateKey(): string
    {
        // eslint-disable-next-line array-callback-return
        return new Alphabet().shuffle().get().map((l, i)=>{
            if(i < 10) return l
        }).join('')
    }

    pattern.split('').forEach(symbol =>{
        switch(symbol)
        {
            case "$": // SCSimply TK
                crypted = new SCSimply(SCSCodeLevel.tecla).encode(crypted)
                break
            case "¢": // SCSimply TM
                crypted = new SCSimply(SCSCodeLevel.tecla_m).encode(crypted)
                break
            case "@": // SCSimply Num
                crypted =  new SCSimply(SCSCodeLevel.a_num).encode(crypted)
                break
            case "¬": // SCMorse
                crypted = new SCMorse().encode(crypted)
                break
            case "£": // SCBinary
                crypted = new SCBinary().encode(crypted)
                break
            case "#": // SCPolybe
                const polybe = polybeEncode(crypted)
                decrypt_config += ` ${polybe.grid_ref}`
                crypted = polybe.msg
                break
            case "*": // SCNavajo
                crypted = new SCNavajo().encode(crypted)
                break
            case "?": // SCEnigma
                const enigmaKey = EnigmaEncode(crypted)
                enigmaKey.rotors.forEach(rotor =>{
                    decrypt_config += ` ${rotor.wiring}`
                })
                decrypt_config += ` ${enigmaKey.reflector.wiring}`
                crypted = enigmaKey.encryptMsg
                break
            case "|": // SCVigenere
                key = generateKey()
                crypted = new SCVigenere(key, crypted).encode()
                decrypt_config += ` ${key}`
                break
            case "§": // SCFrama
                key = generateKey()
                crypted = new SCFrama(key).encode(crypted)
                decrypt_config += ` ${key}`
                break
            case "₢": // SCBacon
                crypted = new SCBacon().encode(crypted)
                break
            case "&": // Mutation reciproque
                crypted = MutationTemplate.reciproque(crypted)
                break
            case "~": // Mutation decalage
                const gap = MutationTemplate.decalage(crypted)
                crypted = gap.msg
                decrypt_config += ` ${gap.decalage}`
                break
            case ":": // Order reverse
                crypted = OrderTemplate.reverse(crypted)
                break
            case "°": // Order random
                const rand = OrderTemplate.random(crypted)
                crypted = rand.msg
                decrypt_config += ` ${rand.alpha_ref.join('')}`

        }

    })

    return {
        encrypted: crypted,
        config: decrypt_config.trim(),
        pattern,
        message
    }
}