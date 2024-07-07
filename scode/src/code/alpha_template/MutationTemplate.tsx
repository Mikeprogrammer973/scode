import Alphabet from "../../util/alphabet_reference"
import { ponctuations } from "../../util/ponctuation_ref"

export default class MutationTemplate
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
            formated_msg += (ponctuations.indexOf(msg[i]) != -1 ? msg[i] : [(26-new Alphabet().normal().get().indexOf(msg[i]))-1])
        }

        return formated_msg
    }

    static voisin(msg: string): string
    {
        let formated_msg: string = ""

        for(let i = 0; i < msg.length; i++)
        {
            formated_msg += (ponctuations.indexOf(msg[i]) != -1 ? msg[i]  : new Alphabet().normal().get()[(new Alphabet().normal().get().indexOf(msg[i]) == 25 ? 0 : (new Alphabet().normal().get().indexOf(msg[i]) + 1) )])
        }

        return formated_msg
    }
}