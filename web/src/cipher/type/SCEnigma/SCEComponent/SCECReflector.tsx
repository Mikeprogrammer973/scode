
export default class SCECReflector
{
    wiring: string;

    constructor(wiring: string) {
        this.wiring = wiring;
    }

    reflect(input: number): number {
        return this.wiring.charCodeAt(input) - 65;
    }
}