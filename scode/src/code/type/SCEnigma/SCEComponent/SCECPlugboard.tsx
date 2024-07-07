
export default class SCECPlugboard
{
    wiring: { [key: string]: string };

    constructor(connections: string[]) {
        this.wiring = {};
        connections.forEach(connection => {
            const [a, b] = connection.split('');
            this.wiring[a] = b;
            this.wiring[b] = a;
        });
    }

    swap(char: string): string {
        return this.wiring[char] || char;
    }
}