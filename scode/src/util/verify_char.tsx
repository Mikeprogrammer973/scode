import Alphabet from "./alphabet_reference";

export default function verify_char(char: string): boolean
{
    if(new Alphabet().normal().get().indexOf(char) != -1) return true
    return false
}