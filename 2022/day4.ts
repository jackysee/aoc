import data from './day4_input.ts';
const arr: number[][] = data()
    .split('\n')
    .map((l) => l.split(/[,\-]/).map(Number));

const contains = ([a1, a2, b1, b2]: number[]) =>
    (a1 <= b1 && a2 >= b2) || (b1 <= a1 && b2 >= a2);
const overlap = ([a1, a2, b1, b2]: number[]) => !(a1 > b2 || a2 < b1);

console.log(arr.filter(contains).length);
console.log(arr.filter(overlap).length);
