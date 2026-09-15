import Alphabet from "../../refs/alphabet_reference";


/**
 * Checks if a character is valid
 * @param char 
 * @returns boolean
 */
export function valid_char(char: string): boolean
{
    if(new Alphabet().normal().get().indexOf(char) !== -1) return true
    return false
}