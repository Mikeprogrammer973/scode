
const grid = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I', 'K'],
    ['L', 'M', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U'],
    ['V', 'W', 'X', 'Y', 'Z']
];

export default function polybeEncode(message: string): string {
    const encodeChar = (char: string) => {
        for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < grid[r].length; c++) {
                if (grid[r][c] === char) {
                    return `${r + 1}${c + 1}`;
                }
            }
        }
        return char;
    };
    return message.split('').map(c => encodeChar(c)).join(' ');
}

export function polybeDecode(encoded: string): string {
    const decodeChar = (pair: string) => {
        const [r, c] = pair.split('').map(n => parseInt(n) - 1);
        return grid[r][c];
    };
    return encoded.split(' ').map(pair => decodeChar(pair)).join('');
}

