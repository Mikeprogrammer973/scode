import Alphabet from "../../util/alphabet_reference"
import { ponctuations } from "../../util/ponctuation_ref"

export default class MutationTemplate
{
    static reciproque(msg: string): string
    {
        let formated_msg: string = ""

        for(let i = 0; i < msg.length; i++)
        {
            formated_msg += (new Alphabet().normal().get()[(26-new Alphabet().normal().get().indexOf(msg[i]))-1])
        }

        return formated_msg
    }

    static decalage(msg: string, revert?: boolean, dec?: number): {msg: string, decalage: number}
    {
        const decalage = Math.round(Math.random() * 23) + 1
        let formated_msg: string = ""

        for(let i = 0; i < msg.length; i++)
        {
            let pos = new Alphabet().normal().get().indexOf(msg[i])

            if(revert)
            {
                pos -= dec || decalage
                if(pos < 0) pos += 25
            }else{
                pos += decalage
                if(pos > 25) pos -= 25
            }

            formated_msg += (new Alphabet().normal().get()[pos])
        }

        return {msg: formated_msg, decalage: decalage}
    }
}