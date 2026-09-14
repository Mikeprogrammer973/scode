import Cipher from "../Cipher";

export default class SCMorse extends Cipher
{
    constructor()
    {
        super()
        this.initSymbols()
    }
    
    private initSymbols() {
        this.symbols = 
        [
            ".-",
            "-...",
            "-.-.",
            "-..",
            ".",
            "..-.",
            "--.",
            "....",
            "..",
            ".---",
            "-.-",
            ".-..",
            "--",
            "-.",
            "---",
            ".--.",
            "--.-",
            ".-.",
            "...",
            "-",
            "..-",
            "...-",
            ".--",
            "-..-",
            "-.--",
            "--.."
        ]
    }
}
