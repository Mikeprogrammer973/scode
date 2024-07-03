import { alphabet } from "../util/alphabet_reference";
import ICode from "./ICode";
import { JSX } from "react";

export default abstract class Code implements ICode
{

    public alpha_ref: string[] = alphabet
    protected symbols: string[] = []

    private formatInput(input: string): string {
        return input
    }

    private formatOutput(output: string[]): JSX.Element {
        return <div>{output[0]}</div>
    }

    /**
     * codificar
        msg: string : string[]    
    */
    public codificar(msg: string): JSX.Element {
        let input: string = this.formatInput(msg) 
        //Coding
        ///////////////
        let result: JSX.Element = this.formatOutput([input]) 
        console.log(result)
        return result
    }
}