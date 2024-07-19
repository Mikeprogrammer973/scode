import Code from "../Code";

export default class SCMorse extends Code
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
