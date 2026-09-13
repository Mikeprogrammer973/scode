
export default class PatternSymbols
{
    static all(): string[]
    {
        return [
            "$", // SCSimply TK
            "¢", // SCSimply TM
            "@", // SCSimply Num
            "¬", // SCMorse
            "£", // SCBinary
            "#", // SCPolybe
            "*", // SCNavajo
            "?", // SCEnigma
            "|", // SCVigenere
            "§", // SCFrama
            "₢", // SCBacon
            "&", // Mutation reciproque
            "~", // Mutation decalage
            ":", // Order reverse
            "°", // Order random
        ]
    }

    static all_names()
    {
        return [
            "SCSimply.key", // SCSimply TK
            "SCSimply.key_m", // SCSimply TM
            "SCSimply.a_num", // SCSimply Num
            "SCMorse", // SCMorse
            "SCBinary", // SCBinary
            "SCPolybe", // SCPolybe
            "SCNavajo", // SCNavajo
            "SCEnigma", // SCEnigma
            "SCVigenere", // SCVigenere
            "SCFrama", // SCFrama
            "SCBacon", // SCBacon
            "MutationTemplate.reciprocity", // Mutation reciproque
            "MutationTemplate.decalation", // Mutation decalage
            "OrderTemplate.reverse", // Order reverse
            "OrderTemplate.random", // Order random
        ]
    }

    static global(): string[]
    {
        return [
            "?", // SCEnigma
            "|", // SCVigenere
            "&", // Mutation reciproque
            "~", // Mutation decalage
            ":", // Order reverse
            "°", // Order random
        ]
    }

    static with_config(): string[]
    {
        return [
            "#", // SCPolybe
            "?", // SCEnigma
            "|", // SCVigenere
            "§", // SCFrama
            "~", // Mutation decalage
            "°" // Order random
        ]
    }
}
