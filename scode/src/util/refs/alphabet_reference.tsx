
const alphabet: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

export default class Alphabet
{
    private letters: string[] = []

    get()
    {
        return this.letters
    }

    normal(): this
    {
        this.letters = alphabet
        return this
    }

    shuffle(): this
    {
        this.letters = []
        do
        {
            let letter = alphabet[Math.round(Math.random() * 25)]
            if(this.letters.indexOf(letter) == -1) this.letters.push(letter)
        }while(this.letters.length < 26);
        return this
    }
}