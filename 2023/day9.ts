import data from './day9_input.ts';
// import data from './day9_sample.ts';

const input = data()
    .split('\n')
    .map((l) => l.split(' ').map(Number));

const getPrevNext = (ns: number[]) => {
    const lefts = [];
    const rights = [];
    while (!ns.every((n) => n === 0)) {
        lefts.push(ns[0]);
        rights.push(ns[ns.length - 1]);
        ns = ns.reduce((a, c, i) => {
            if (i === 0) return a;
            a.push(c - ns[i - 1]);
            return a;
        }, [] as number[]);
    }
    return [
        lefts.reduceRight((a, c) => c - a, 0),
        rights.reduce((a, c) => a + c, 0)
    ];
};
const result = input
    .map(getPrevNext)
    .reduce((a, c) => [a[0] + c[1], a[1] + c[0]], [0, 0]);
console.log('A', result[0]);
console.log('B', result[1]);
