import Alphabet from "../refs/alphabet_reference";

export default function valid_char(char: string): boolean
{
    if(new Alphabet().normal().get().indexOf(char) != -1) return true
    return false
}