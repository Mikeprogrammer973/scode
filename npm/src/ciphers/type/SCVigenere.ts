import Alphabet from "../../refs/alphabet_reference";
import Cipher from "../Cipher";

export default class SCVigenere extends Cipher
{
    private key: string
    private msg: string

    constructor(key: string, msg: string) {
        super()
        this.key = key
        this.msg = msg
        this.format_key(msg)
    }
    
    private format_key(msg: string)
    {
        if(this.key.length < msg.length)
        {
            do
            {
                this.key += this.key
            }while(this.key.length < msg.length)
        }
    }

    override encode(): string {
        return this.msg.split('').map((letter, i) => {
            const alpha_ref = new Alphabet().normal().get()
            let pos = alpha_ref.indexOf(letter) + alpha_ref.indexOf(this.key[i]!)
            if(pos > 25) pos %= 26
            return alpha_ref[pos]
        }).join('')
    }

    override decode(): string {
        return this.msg.split('').map((letter, i) => {
            const alpha_ref = new Alphabet().normal().get()
            let pos = alpha_ref.indexOf(letter) - alpha_ref.indexOf(this.key[i]!)
            if(pos < 0) pos = (26 + alpha_ref.indexOf(letter)) - alpha_ref.indexOf(this.key[i]!)
            return alpha_ref[pos]
        }).join('')
    }
}