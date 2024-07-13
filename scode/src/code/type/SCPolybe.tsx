import Alphabet from "../../util/alphabet_reference"

function generateGrid(gridSeq: string)
{
    let grid: string[][] = []

    let row: string[] = []
    do
    {
        gridSeq.split('').map(l => {
            if(row.length == 5)
            {
                grid.push(row)
                row = []
            }
            if(l != "J") row.push(l)
        })

        if(grid.length > 5) grid = []

    }while(grid.length < 5) 

    return grid
}

export default function polybeEncode(message: string): {msg: string, grid_ref: string} {
    const grid_ref = new Alphabet().shuffle().get().join('')
    const grid = generateGrid(grid_ref) 
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
    return {msg: message.split('').map(c => encodeChar(c)).join(' '), grid_ref: grid_ref}
}

export function polybeDecode(encoded: string, gridSeq: string): string {
    const grid = generateGrid(gridSeq)
    const decodeChar = (pair: string) => {
        const [r, c] = pair.split('').map(n => parseInt(n) - 1);
        return grid[r][c];
    };
    return encoded.split(' ').map(pair => decodeChar(pair)).join('');
}

