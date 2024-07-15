
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
