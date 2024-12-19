import data from './day19_input.js';
// import data from './day19_sample.js';

const [towels, designs] = data()
    .split('\n\n')
    .map((l, i) => (i === 0 ? l.split(', ') : l.split('\n')));

const sum = (a, b) => a + b;
const memo = new Map();
const possible = (design) => {
    if (design === '') return 1;
    if (memo.has(design)) return memo.get(design);
    const ts = towels.filter((t) => design.startsWith(t));
    if (!ts.length) {
        memo.set(design, 0);
        return 0;
    }
    const result = ts
        .map((t) => possible(design.slice(t.length)))
        .reduce(sum, 0);
    memo.set(design, result);
    return result;
};

const ds = designs.map(possible);
console.log('A', ds.filter((d) => d > 0).length);
console.log('B', ds.reduce(sum, 0));

// const ways = (design) => {
//     if (design === '') return true;
//     const ts = towels.filter((t) => design.startsWith(t));
//     if (!ts.length) return false;
//     return ts.some((t) => possible(design.slice(t.length)));
// };

// console.log('A-test', designs.filter(ways).length);
