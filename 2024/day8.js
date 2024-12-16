import data from './day8_input.js';
// import { d2 as data } from './day8_sample.js';
const M = data().split('\n');

const freq = {};
M.forEach((l, r) => {
    [...l].forEach((d, c) => {
        if (/\d|[A-Za-z]/.test(d)) {
            freq[d] = freq[d] || [];
            freq[d].push([r, c]);
        }
    });
});

const getAntinodes = ([r1, c1], [r2, c2], all = false) => {
    const [dr, dc] = [[r2 - r1], [c2 - c1]];
    const result = [];
    [
        [r1, c1, -1],
        [r2, c2, 1]
    ].forEach(([r, c, d]) => {
        let i = 1;
        while (true) {
            const [nr, nc] = [r + i * d * dr, c + i * d * dc];
            if (M[nr]?.[nc] === undefined) break;
            result.push([nr, nc]);
            if (!all) break;
            i++;
        }
    });
    if (all) result.push([r1, c1], [r2, c2]);
    return result;
};

const A1 = new Set();
const A2 = new Set();
Object.values(freq).forEach((pos) => {
    pos.forEach((p1, i) => {
        pos.slice(i + 1).forEach((p2) => {
            getAntinodes(p1, p2).forEach((p) => A1.add(p + ''));
            getAntinodes(p1, p2, true).forEach((p) => A2.add(p + ''));
        });
    });
});

console.log('A', A1.size);
console.log('B', A2.size);
