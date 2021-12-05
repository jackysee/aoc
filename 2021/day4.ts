import data from './day4_input.ts';
// import data from './day4_sample.ts';

let lines = data().trim().split('\n');
let numbers = lines[0].split(',').map(Number);
let boards = lines
    .slice(2)
    .join('\n')
    .split('\n\n')
    .map((s) => {
        return s.split('\n').map((r) => r.trim().split(/ +/).map(Number));
    });

const getRows = (board: number[][]) => [
    ...board,
    ...[...Array(5)].map((_, i) => [...Array(5)].map((_, j) => board[j][i]))
];

const mark = (board: number[][], n: number) =>
    board.map((row) => row.map((_n) => (_n === n ? 0 : _n)));

const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

let hasWon: number[] = [];
let scores: number[] = [];
numbers.forEach((n) => {
    boards.forEach((board, bi) => {
        if (hasWon.includes(bi)) return;
        board = boards[bi] = mark(board, n);
        if (getRows(board).some((row) => sum(row) === 0)) {
            scores.push(n * sum(board.flat()));
            hasWon.push(bi);
        }
    });
});
console.log('Part 1', scores[0]);
console.log('Part 2', scores[scores.length - 1]);
