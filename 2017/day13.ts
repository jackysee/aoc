import data from './day13_input.ts';
// import data from './day13_sample.ts';

const M: Record<number, number> = Object.fromEntries(
    data()
        .split('\n')
        .map((l) => l.split(/:\s+/).map(Number))
);
let len = Math.max(...Object.keys(M).map((n) => +n));

const scannerPos = (t: number, len: number) => {
    len = len - 1;
    let even = Math.floor(t / len) % 2 === 0;
    let n = t % len;
    return even ? n : len - n;
};

function pass(delay: number = 0) {
    let hits = [];
    for (let i = 0; i <= len; i++) {
        if (M[i] === undefined) continue;
        let p = scannerPos(delay + i, M[i]);
        if (p === 0) hits.push(i * M[i]);
    }
    return hits;
}

console.log(
    'Part 1',
    pass().reduce((a, c) => a + c, 0)
);

let i = -1;
while (pass(++i).length);
console.log('Part 2', i);
