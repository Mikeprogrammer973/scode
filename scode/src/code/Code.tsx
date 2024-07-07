import { alphabet } from "../util/alphabet_reference";
import { ponctuations } from "../util/ponctuation_ref";
import ICode from "./ICode";

export default abstract class Code implements ICode
{
    protected symbols: string[] = []

    /**
     * codificar
        msg: string : string[]    
    */
    public codificar(msg: string): string {
        let coded_msg = ""

        for(let i = 0; i < msg.length; i++)
        {
            if(i > 0) coded_msg += " "
            coded_msg += ( ponctuations.indexOf(msg[i]) != -1 ? msg[i] : this.symbols[alphabet.indexOf(msg[i])])
        }

        return coded_msg
    }
}