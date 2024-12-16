import data from './day11_input.ts';
// const data = () => 'se,sw,se,sw,sw';

let steps: string[] = data().split(',');

function walk([q, r, s]: number[], dir: string) {
    if (dir === 'n') return [q, r - 1, s + 1];
    if (dir === 'ne') return [q + 1, r - 1, s];
    if (dir === 'se') return [q + 1, r, s - 1];
    if (dir === 's') return [q, r + 1, s - 1];
    if (dir === 'sw') return [q - 1, r + 1, s];
    if (dir === 'nw') return [q - 1, r, s + 1];
    return [q, r, s];
}

function dist(a: number[], b: number[]) {
    return (
        [0, 1, 2].map((i) => Math.abs(a[i] - b[i])).reduce((a, c) => a + c, 0) /
        2
    );
}

let p = [0, 0, 0];
let max = -Infinity;
let d = 0;
steps.forEach((dir) => {
    p = walk(p, dir);
    d = dist(p, [0, 0, 0]);
    if (d > max) max = d;
});
console.log('Part 1', d);
console.log('Part 2', max);
