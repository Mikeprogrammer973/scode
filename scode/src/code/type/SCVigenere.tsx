import Alphabet from "../../util/alphabet_reference";
import Code from "../Code";

export default class SCVigenere extends Code
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

    codificar(): string {
        return this.msg.split('').map((letter, i) => {
            const alpha_ref = new Alphabet().normal().get()
            let pos = alpha_ref.indexOf(letter) + alpha_ref.indexOf(this.key[i])
            if(pos > 25) pos %= 26
            return alpha_ref[pos]
        }).join('')
    }

    decodificar(): string {
        return this.msg.split('').map((letter, i) => {
            const alpha_ref = new Alphabet().normal().get()
            let pos = alpha_ref.indexOf(letter) - alpha_ref.indexOf(this.key[i])
            if(pos < 0) pos = (26 + alpha_ref.indexOf(letter)) - alpha_ref.indexOf(this.key[i])
            return alpha_ref[pos]
        }).join('')
    }
}