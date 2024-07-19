import Alphabet from "../../util/refs/alphabet_reference"
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
        const helper = (it: {init: number, end: number, dir: boolean})=>{
            let sbls: string[] = []
            if(it.dir)
            {
                for(let i = it.init; i <= it.end; i++) sbls.push(`${i}`)
            }else
            {
                for(let i = it.init; i >= it.end; i--) sbls.push(`${i}`)
            }
            return sbls
        }
        switch(level)
        {
            case SCSCodeLevel.tecla:
                this.symbols = helper({init: 65, end: 90, dir: true})
                break
            case SCSCodeLevel.tecla_m:
                let pattern_1: string[] = helper({init: 65, end: 90, dir: true})
                let pattern_2: string[] = helper({init: 90, end: 65, dir: false})
                pattern_1.forEach((symbol, i)=>{
                    this.symbols.push(`${symbol[0]}${pattern_2[i][0]}${symbol[1]}${pattern_2[i][1]}`)
                })
                break
            case SCSCodeLevel.a_num:
                new Alphabet().normal().get().forEach((letter, i)=>{
                    this.symbols.push(`${i + 1}`)
                })
        }
    }
}