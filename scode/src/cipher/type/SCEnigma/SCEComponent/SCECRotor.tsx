
export default class SCECRotor
{
    wiring: string;
    position: number;
    notch: number;

    constructor(wiring: string, notch: number) {
        this.wiring = wiring;
        this.position = 0;
        this.notch = notch;
    }

    step() {
        this.position = (this.position + 1) % 26;
    }

    forward(input: number): number {
        let index = (input + this.position) % 26;
        return (this.wiring.charCodeAt(index) - 65 - this.position + 26) % 26;
    }

    backward(input: number): number {
        let index = (this.wiring.indexOf(String.fromCharCode((input + this.position) % 26 + 65)) - this.position + 26) % 26;
        return index;
    }
}