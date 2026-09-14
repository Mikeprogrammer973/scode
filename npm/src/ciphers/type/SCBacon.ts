import Cipher from "../Cipher";

export default class SCBacon extends Cipher
{
    constructor()
    {
        super()
        this.initSymbols()
    }

    private initSymbols()
    {
        this.symbols = 
        [
            'AABAA',
            'AABAB',
            'AABBA',
            'AABBB',
            'ABAAA',
            'ABAAB',
            'ABABA',
            'ABABB',
            'ABBAA',
            'ABBAB',
            'ABBBA',
            'ABBBB',
            'BAAAA',
            'BAAAB',
            'BAABA',
            'BAABB',
            'BABAA',
            'BABAB',
            'BABBA',
            'BABBB',
            'BBAAA',
            'BBAAB',
            'BBABA',
            'BBABB',
            'BBBAA',
            'BBBAB'
        ]
    }
}