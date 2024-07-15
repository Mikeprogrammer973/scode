import Alphabet from "../util/refs/alphabet_reference";
import ICode from "./ICode";

export default abstract class Code implements ICode
{
    protected symbols: string[] = []

    /**
     * codificar
        msg: string : string    
    */
    codificar(msg: string): string {
        let coded_msg = ""

        for(let i = 0; i < msg.length; i++)
        {
            if(i > 0) coded_msg += " "
            coded_msg +=  this.symbols[new Alphabet().normal().get().indexOf(msg[i])]
        }

        return coded_msg
    }

    /**
     * decodificar
        msg: string : string    
    */
    decodificar(msg: string): string {
        return msg.split(" ").map(symbol => new Alphabet().normal().get()[this.symbols.indexOf(symbol)]).join("")
    }
}