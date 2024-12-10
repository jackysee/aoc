import data from './day1_input.ts';
const arr = data().split('').map(Number);

let ans1 = arr
    .map((c, i, arr) => [c, arr[i + 1 === arr.length ? 0 : i + 1]])
    .filter(([a, b]) => a === b)
    .reduce((a, c) => a + c[0], 0);

console.log('Part 1', ans1);

let ans2 = arr.reduce((a, n, i, arr) => {
    let len = arr.length / 2;
    if (i >= len || n !== arr[i + len]) return a;
    return a + n + arr[i + len];
}, 0);
console.log('Part 2', ans2);
