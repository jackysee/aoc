import data from './day9_input.ts';
// import data from './day9_sample.ts';

const input = data()
    .split('\n')
    .map((l) => l.split(' ').map(Number));

const getNext = (ns: number[]) => {
    let sum = 0;
    while (!ns.every((n) => n === 0)) {
        sum += ns.at(-1)!;
        ns = ns.reduce((a, c, i) => {
            if (i === 0) return a;
            a.push(c - ns[i - 1]);
            return a;
        }, [] as number[]);
    }
    return sum;
};
console.log(
    'A',
    input.map(getNext).reduce((a, c) => a + c)
);
console.log(
    'B',
    input.map((ns) => getNext(ns.toReversed())).reduce((a, c) => a + c)
);
