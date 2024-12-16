import { combinations } from 'https://deno.land/x/combinatorics/mod.ts';
import data from './day24_input.ts';

const arr: number[] = data().trim().split('\n').map(Number);
const getSize = (arr: number[]) => arr.reduce((a, c) => a + c);
const qe = (arr: number[]) => arr.reduce((a, c) => a * c, 1);

function getFirstGroupQE(size: number) {
    const SIZE = arr.reduce((a, c) => a + c) / size;
    let match: number[][] = [];
    for (let i = 1; i <= arr.length; i++) {
        match = [...combinations(arr, i)].filter((a) => getSize(a) === SIZE);
        if (match.length) break;
    }
    match.sort((a, b) => {
        if (a.length === b.length) return qe(a) - qe(b);
        return a.length - b.length;
    });
    return qe(match[0]);
}
console.log('Part 1', getFirstGroupQE(3));
console.log('Part 2', getFirstGroupQE(4));
