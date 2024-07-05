import { alphabet } from "../../util/alphabet_reference"
import Code from "../Code"

export enum SCSCodeLevel {
    "tecla", 
    "tecla_m",
    "a_num",
}

export default class SCSimply extends Code
{
    constructor(level: SCSCodeLevel)
    {
        super()
        this.initSymbols(level)
    }
    
    private initSymbols(level: SCSCodeLevel) {
        switch(level)
        {
            case SCSCodeLevel.tecla:
                for(let i = 65; i <= 90; i++) this.symbols.push(`${i}`)
                break
            case SCSCodeLevel.tecla_m:
                let pattern_1: string[] = []
                let pattern_2: string[] = []
                for(let i = 65; i <= 90; i++) pattern_1.push(`${i}`)
                for(let i = 90; i >= 65; i--) pattern_2.push(`${i}`)
                pattern_1.forEach((symbol, i)=>{
                    this.symbols.push(`${symbol[0]}${pattern_2[i][0]}${symbol[1]}${pattern_2[i][1]}`)
                })
                break
            case SCSCodeLevel.a_num:
                alphabet.forEach((letter, i)=>{
                    this.symbols.push(`${i + 1}`)
                })
        }
    console.log(this.symbols)
    }
}