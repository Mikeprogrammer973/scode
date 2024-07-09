import Alphabet from "../../util/alphabet_reference";
import Code from "../Code";

export default class SCFrama extends Code
{
    constructor(key: string)
    {
        super()
        this.initSymbols(key)
    }
    
    private initSymbols(key: string) {
        const symbols_ref = 
        [
            "⁂",
            "⁋",
            "⁛",
            "⁜",
            "⁙",
            "⁖",
            "№",
            "⁁",
            "⌁",
            "⏕",
            "⏖",
            "⏔",
            "₩",
            "₲",
            "₹",
            "₪",
            "૱",
            "௹",
            "﷼₿",
            "₳",
            "₷",
            "৻",
            "₠",
            "₰",
            "₻",
            "¤"
        ]

        key.split('').forEach(letter => {
            let symbol = symbols_ref[new Alphabet().normal().get().indexOf(letter)]
            if(this.symbols.indexOf(symbol) == -1) this.symbols.push(symbol)
        })
        symbols_ref.forEach(symbol => {
            if(this.symbols.indexOf(symbol) == -1) this.symbols.push(symbol)
        })
    }
}