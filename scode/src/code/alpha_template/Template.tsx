import { alphabet } from "../../util/alphabet_reference"

export default class AlphaTemplate
{
    static normal(msg: string): string
    {
        return msg
    }

    static reciproque(msg: string): string
    {
        let formated_msg: string = ""

        for(let i = 0; i < msg.length; i++)
        {
            formated_msg += ( msg[i] == " " ? " " : alphabet[(26-alphabet.indexOf(msg[i]))-1])
        }

        return formated_msg
    }

    static voisin(msg: string): string
    {
        let formated_msg: string = ""

        for(let i = 0; i < msg.length; i++)
        {
            formated_msg += ( msg[i] == " " ? " " : alphabet[(alphabet.indexOf(msg[i]) == 25 ? 0 : (alphabet.indexOf(msg[i]) + 1) )])
        }

        return formated_msg
    }
}