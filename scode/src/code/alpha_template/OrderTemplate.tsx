import Alphabet from "../../util/alphabet_reference"

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

    static random(msg: string): string
    {
        let formated_msg = ""
        const alpha_s = new Alphabet().shuffle().get()
        const alpha_n = new Alphabet().normal().get()

        for(let i = 0; i < msg.length; i++)
        {
            formated_msg += alpha_s[alpha_n.indexOf(msg[i])]
        }
        
        return formated_msg
    }
}