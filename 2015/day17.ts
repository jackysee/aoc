import data from './day17_input.ts';

const boxes = data().split('\n').map(Number);
const powerset = (arr: number[]): number[][] => {
    if (!arr.length) return [arr];
    let [first, ...rest] = arr;
    let p_rest = powerset(rest);
    return p_rest.map((_a) => [first, ..._a]).concat(p_rest);
};

const all = powerset(boxes);
const fit = all.filter((b) => b.reduce((a, c) => a + c, 0) === 150);
console.log('Part 1', fit.length);

let minSize = Math.min(...fit.map((a) => a.length));
console.log('Part 2', fit.filter((b) => b.length === minSize).length);
