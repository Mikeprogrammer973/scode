import PatternSymbols from "../refs/pattern_symbols_refs"

export default function valid_decrypt_config(pattern: string, config: string | null): boolean
{
    let valid = true
    
    if(config == null){
        valid = false
    } else{
        const w_config_symbols: string[] = pattern.split('').filter(symbol =>{
            if(PatternSymbols.with_config().indexOf(symbol)) return symbol
        })
        
        const config_: string[] = config.split(' ')

        w_config_symbols.forEach(symbol =>{
            switch(symbol)
            {
                case "#": // SCPolybe
                    const config_polybe: string | undefined = config_.shift()
                    if(config_polybe == "undefined" || config_polybe?.length != 26){
                        valid = false
                        return
                    }
                    break
                case "?": // SCEnigma
                    if(config.length < 11)
                    {
                        valid = false
                        return
                    } else{
                        let l = 0
                        while(l < 11)
                        {
                            if(config_.shift()?.length != 26)
                            {
                                valid = false
                                return
                            }
                            l++
                        }
                    }
                    break
                case "|": // SCVigenere
                    const cfg_vg = config_.shift()
                    if(cfg_vg == "undefined" || cfg_vg?.length != 10)
                    {
                        valid = false
                        return
                    }
                    break
                case "§": // SCFrama
                    const cfg_fm = config_.shift()
                    if(cfg_fm == "undefined" || cfg_fm?.length != 10)
                    {
                        valid = false
                        return
                    }
                    break
                case "~": // Mutation decalage
                    const cfg_dec = config_.shift()
                    if(cfg_dec == "undefined" || typeof(Number(cfg_dec)) != "number" )
                    {
                        valid = false
                        return
                    }
                    break
                case "°": // Order random
                    const cfg_rand = config_.shift()
                    if(cfg_rand == "undefined" || cfg_rand?.length != 26){
                        valid = false
                        return
                    }
            }

        })

        if(config_.length > 0)
        {
            valid = false
        }
    }
    
    return valid
}