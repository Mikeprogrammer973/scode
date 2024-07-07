import { JSX } from "react";
import SCECRotor from "./SCEComponent/SCECRotor";
import SCECReflector from "./SCEComponent/SCECReflector";
import SCECPlugboard from "./SCEComponent/SCECPlugboard";

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

        return String.fromCharCode(input + 65)
    }

    encryptMessage(message: string): string {
        return message.split('').map(char => this.encrypt(char)).join('')
    }
}

export default function codificar(msg: string): string {
    /// PARA A PRODÇÃO: GERAR DE FORMA ALEATÓRIA (7 ROTORES)
    const rotor1 = new SCECRotor("EKMFLGDQVZNTOWYHXUSPAIBRCJ", 16)
    const rotor2 = new SCECRotor("AJDKSIRUXBLHWTMCQGZNPYFVOE", 4)
    const rotor3 = new SCECRotor("BDFHJLCPRTXVZNYEIWGAKMUSQO", 21)
    const reflectorB = new SCECReflector("YRUHQSLDPXNGOKMIEBFZCWVJAT")
    ////
    const plugboard = new SCECPlugboard([])

    return new SCEnigma([rotor1, rotor2, rotor3], reflectorB, plugboard).encryptMessage(msg)
}

export type SCEKey = {
    rotors: SCECRotor[],
    reflector: SCECReflector,
    plugboard: SCECPlugboard,
    encryptMsg: string
}

export function decodificar(key: SCEKey): string {
    return new SCEnigma(key.rotors, key.reflector, key.plugboard).encryptMessage(key.encryptMsg)
}