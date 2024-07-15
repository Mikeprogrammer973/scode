import valid_char from "./verify_char"

export default function format_str(str: string): string
{
    str = str.toUpperCase().trim()

    let formated_str = ""

    for(let i = 0; i < str.length; i++)
    {
        if(valid_char(str[i])) formated_str += str[i]
    }

    return formated_str
}
