import { alphabet } from "./alphabet_reference"

export default function format_str(str: string): string
{
    str = str.toUpperCase().trim()

    let formated_str = ""

    for(let i = 0; i < str.length; i++)
    {
        if(alphabet.indexOf(str[i]) != -1) formated_str += str[i]
    }

    return formated_str
}
