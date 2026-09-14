import Alphabet from "../refs/alphabet_reference";
import type ICipher from "./ICipher";

export default abstract class Cipher implements ICipher
{
    protected symbols: string[] = []

    /**
     * encode
        msg: string : string    
    */
    encode(msg: string): string {
        let coded_msg = ""

        for(let i = 0; i < msg.length; i++)
        {
            if(i > 0) coded_msg += " "
            coded_msg +=  this.symbols[new Alphabet().normal().get().indexOf(msg[i]!)]
        }

        return coded_msg
    }

    /**
     * decode
        msg: string : string    
    */
    decode(msg: string): string {
        return msg.split(" ").map(symbol => new Alphabet().normal().get()[this.symbols.indexOf(symbol)]).join("")
    }
}