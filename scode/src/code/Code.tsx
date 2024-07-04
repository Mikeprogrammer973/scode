import { alphabet } from "../util/alphabet_reference";
import ICode from "./ICode";
import { JSX } from "react";

export default abstract class Code implements ICode
{
    protected symbols: string[] = []

    private formatOutput(output: string): JSX.Element {
        return <div>{output}</div>
    }

    /**
     * codificar
        msg: string : string[]    
    */
    public codificar(msg: string): JSX.Element {
        let coded_msg = ""

        for(let i = 0; i < msg.length; i++)
        {
            coded_msg += ( msg[i] == " " ? "***" : this.symbols[alphabet.indexOf(msg[i])])
            if(i < (msg.length - 1)) coded_msg += " / "
        }

        let result: JSX.Element = this.formatOutput(coded_msg) 
        console.log(this.symbols)
        return result
    }
}