import SCECRotor from "./SCEComponent/SCECRotor";
import SCECReflector from "./SCEComponent/SCECReflector";
import SCECPlugboard from "./SCEComponent/SCECPlugboard";
import Alphabet from "../../../util/refs/alphabet_reference";

class SCEnigma
{
    rotors: SCECRotor[]
    reflector: SCECReflector
    plugboard: SCECPlugboard

    constructor(rotors: SCECRotor[], reflector: SCECReflector, plugboard: SCECPlugboard) {
        this.rotors = rotors
        this.reflector = reflector
        this.plugboard = plugboard
    }

    encrypt(char: string): string {
        // Plugboard swap before going through the rotors
        char = this.plugboard.swap(char);

        let input = char.charCodeAt(0) - 65

        // Forward pass through the rotors
        for (let rotor of this.rotors) {
            input = rotor.forward(input)
        }

        // Reflector
        input = this.reflector.reflect(input)

        // Backward pass through the rotors (reverse order)
        for (let i = this.rotors.length - 1; i >= 0; i--) {
            input = this.rotors[i].backward(input)
        }

        // Convert back to character
        char = String.fromCharCode(input + 65)

        // Plugboard swap after going through the rotors
        char = this.plugboard.swap(char);

        // Step the first rotor (and subsequent rotors if needed)
        this.rotors[0].step();
        for (let i = 1; i < this.rotors.length; i++) {
            if (this.rotors[i - 1].position === this.rotors[i - 1].notch) {
                this.rotors[i].step()
            } else {
                break
            }
        }

        return char
    }

    encryptMessage(message: string): string {
        return message.split('').map(char => this.encrypt(char)).join('')
    }
}

export default function codificar(msg: string): SCEKey {
    const rotors: SCECRotor[] = []
    for(let i = 0; i < 10; i++) rotors.push(new SCECRotor(new Alphabet().shuffle().get().join(''), 7))
    const reflector = new SCECReflector("YRUHQSLDPXNGOKMIEBFZCWVJAT")
    
    const plugboard = new SCECPlugboard([])

    const encryptMessage = new SCEnigma(rotors, reflector, plugboard).encryptMessage(msg)

    return {
        rotors: rotors,
        reflector: reflector,
        encryptMsg: encryptMessage
    }
}

export type SCEKey = {
    rotors: SCECRotor[],
    reflector: SCECReflector,
    encryptMsg: string
}

export function decodificar(key: SCEKey): string {
    key.rotors.forEach(rotor => rotor.position = 0)
    return new SCEnigma(key.rotors, key.reflector, new SCECPlugboard([])).encryptMessage(key.encryptMsg)
}