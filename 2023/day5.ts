import data from './day5_input.ts';
// import data from './day5_sample.ts';

const input = data().split('\n\n');
const seeds = [...input[0].matchAll(/\d+/g)].map(Number);
type NumFunc = (a: number) => number;
const compose1 = (f: NumFunc, g: NumFunc) => (n: number) => {
    const r = f(n);
    return r === n ? g(n) : r;
};
const compose2 = (f: NumFunc, g: NumFunc) => (n: number) => g(f(n));

const M = input.slice(1).map((s) =>
    s
        .split('\n')
        .slice(1)
        .map((m) => {
            const [dest, src, len] = m.split(' ').map(Number);
            return {
                s1: src,
                s2: src + len - 1,
                d1: dest,
                d2: dest + len - 1,
                len
            };
        })
        .sort((a, b) => a.s1 - b.s1)
);

const findLoc = M.map((ranges) =>
    ranges
        .map((r) => (n: number) => {
            if (n >= r.s1 && n <= r.s2) {
                return r.d1 + (n - r.s1);
            }
            return n;
        })
        .reduce(compose1)
).reduce(compose2);
console.log('A', Math.min(...seeds.map(findLoc)));

const seedRanges = seeds
    .map((n, i) => {
        if (i % 2 == 0) return [];
        return [seeds[i - 1], seeds[i - 1] + n - 1];
    })
    .filter((a) => a.length);

let ranges = [...seedRanges];
for (const ms of M) {
    ranges = ranges
        .map(([from, to]) => {
            const result: number[][] = [];
            let i = from;
            ms.filter((m) => from <= m.s2 && to >= m.s1).forEach((m) => {
                const _to = Math.min(m.s2, to);
                if (m.s1 <= i) {
                    result.push([m.d1 + (i - m.s1), m.d1 + (_to - m.s1)]);
                    i = _to + 1;
                } else {
                    result.push([i, m.s1 - 1]);
                    result.push([m.d1, m.d1 + (_to - m.s1)]);
                    i = _to + 1;
                }
            });
            if (i <= to) {
                result.push([i, to]);
            }
            return result;
        })
        .flat();
}
console.log('B', ranges.flat().sort((a, b) => a - b)[0]);

//Brute force by reverse searching
console.log('Brute force by reverse searching...');
ranges = [];
const findSeed = [...M]
    .reverse()
    .map((ranges) =>
        ranges
            .map((r) => (n: number) => {
                if (n >= r.d1 && n <= r.d2) {
                    return r.s1 + (n - r.d1);
                }
                return n;
            })
            .reduce(compose1)
    )
    .reduce(compose2);

const t = performance.now();
let loc = 0;
while (true) {
    const seed = findSeed(loc);
    if (seedRanges.some(([from, to]) => seed >= from && seed <= to)) {
        console.log('B', loc);
        console.log(`took ${performance.now() - t} ms`);
        break;
    }
    loc++;
}
