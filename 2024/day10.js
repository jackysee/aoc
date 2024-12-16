import data from './day10_input.js';
// import data from './day10_sample.js';
const M = {};
const heads = [];
data()
    .split('\n')
    .forEach((line, r) => {
        M[r] = [];
        line.split('').forEach((m, c) => {
            M[r][c] = +m;
            if (m === '0') heads.push([+m, r, c]);
        });
    });

const getTrails = (head) => {
    const queue = [[head]];
    const trails = [];
    while (queue.length) {
        const path = queue.shift();
        // const path = queue.pop();
        const [m, r, c] = path.at(-1);
        if (m === 9) {
            trails.push([m, r, c] + '');
            continue;
        }
        [
            [r - 1, c],
            [r + 1, c],
            [r, c - 1],
            [r, c + 1]
        ].forEach(([nr, nc]) => {
            if (path.some(([_, r, c]) => nr === r && nc == c)) return;
            if (M[nr]?.[nc] === m + 1) {
                queue.push([...path, [m + 1, nr, nc]]);
            }
        });
    }
    return trails;
};

const trails = heads.map(getTrails);
console.log(
    'A',
    trails.reduce((a, t) => a + new Set(t).size, 0)
);
console.log('B', trails.flat().length);
