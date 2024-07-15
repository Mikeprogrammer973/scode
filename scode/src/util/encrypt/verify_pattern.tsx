import PatternSymbols from "../refs/pattern_symbols_refs"

export default function valid_pattern(pattern: string): boolean
{
    let valid: boolean = true
    
    if(pattern.length == 0)
    {
        valid = false
    } else{
        let end: boolean = false
        pattern.split('').forEach(symbol =>{
            if(PatternSymbols.all().indexOf(symbol) == -1 || end){
                valid = false
                return
            }
            if(PatternSymbols.global().indexOf(symbol) == -1) end = true
        })
    }

    return valid
}