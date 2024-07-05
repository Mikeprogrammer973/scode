import { alphabet } from "./alphabet_reference";
import { ponctuations } from "./ponctuation_ref";

export default function verify_char(char: string): boolean
{
    if(alphabet.indexOf(char) != -1 || ponctuations.indexOf(char) != -1) return true
    return false
}