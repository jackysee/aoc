import data from './day19_input.js';
// import data from './day19_sample.js';

const [towels, designs] = data()
    .split('\n\n')
    .map((l, i) => (i === 0 ? l.split(', ') : l.split('\n')));
// console.log(designs)

const memo = new Map();
const possible = (design) => {
    if (memo.has(design)) return memo.get(design);
    const ts = towels.filter((t) => design.startsWith(t));
    if (!ts.length) {
        memo.set(design, false);
        return false;
    }
    if (ts.some((t) => t === design)) {
        memo.set(design, true);
        return true;
    }
    const result = ts.some((t) => possible(design.slice(t.length)));
    memo.set(design, result);
    return result;
};

console.log('A', designs.filter((d) => possible(d, towels)).length);
