import Alphabet from "../../util/refs/alphabet_reference"

export default class OrderTemplate
{
    static reverse(msg: string): string
    {
        let formated_msg = ""

        for(let i = msg.length-1; i > -1; i--)
        {
            formated_msg += msg[i]
        }

        return formated_msg
    }

    static random(msg: string, ref?: string[], revert?: boolean): {alpha_ref: string[], msg: string}
    {
        let formated_msg = ""
        const alpha_s = (revert ? ref : new Alphabet().shuffle().get())
        const alpha_n = new Alphabet().normal().get()

        for(let i = 0; i < msg.length; i++)
        {
            formated_msg += (revert ? alpha_n[(alpha_s || []).indexOf(msg[i])] : (alpha_s || [])[alpha_n.indexOf(msg[i])])
        }
        
        return {alpha_ref: (alpha_s || []), msg: formated_msg}
    }
}