import data from './day20_input.ts';

let arr: number[][] = data()
    .split('\n')
    .map((l) => l.split('-').map(Number));

let first = -1;
let n = 0;
let c = 0;
while (n <= 4294967295) {
    let ri = arr.findIndex(([from, to]) => n >= from && n <= to);
    if (ri !== -1) {
        n = arr[ri][1] + 1;
        continue;
    }
    if (first === -1) first = n;
    n++;
    c++;
}

console.log('Part 1', first);
console.log('Part 2', c);
