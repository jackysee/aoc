import data from './day4_input.ts';
// import data from './day4_sample.ts';

let lines = data().trim().split('\n');
let drawNumbers = lines[0].split(',').map(Number);
let boards = lines
    .slice(2)
    .join('\n')
    .split('\n\n')
    .map((s: string) => {
        return s.split('\n').map((r) => r.trim().split(/ +/).map(Number));
    });

function getColumns(board: number[][]) {
    const columns: number[][] = [];
    for (let i = 0; i < 5; i++) {
        columns.push([]);
        for (let j = 0; j < 5; j++) {
            columns[i].push(board[j][i]);
        }
    }
    return columns;
}

function isWin(board: number[][], markedNumbers: number[]) {
    return [...board, ...getColumns(board)].some((row) =>
        row.every((n) => markedNumbers.includes(n))
    );
}

function getScore(board: number[][], nums: number[]) {
    var unmarked: number[] = board.flat().filter((n) => !nums.includes(n));
    var sum = unmarked.reduce((a, b) => a + b, 0);
    return sum * nums[nums.length - 1];
}

let hasWon: number[] = [];
let scores: number[] = [];
for (let i = 0; i < drawNumbers.length; i++) {
    const nums = drawNumbers.slice(0, i + 1);
    boards.forEach((b, bi) => {
        if (!hasWon.includes(bi) && isWin(b, nums)) {
            scores.push(getScore(b, nums));
            hasWon.push(bi);
        }
    });
}
console.log('Part 1', scores[0]);
console.log('Part 2', scores[scores.length - 1]);
