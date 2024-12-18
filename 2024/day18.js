import data from './day18_input.js';
let idx = 1023;
const W = 70;
const H = 70;

// import data from './day18_sample.js';
// let idx = 11;
// const W = 6;
// const H = 6;

const B = data()
    .split('\n')
    .map((l) => l.split(',').map(Number));

const run = (idx) => {
    const BS = B.slice(0, idx + 1);
    const corrupted = (r, c) => BS.some(([bc, br]) => br === r && c === bc);
    const Q = [[0, 0, []]];
    const seen = { [[0, 0]]: true };
    while (Q.length) {
        const [r, c, path] = Q.shift();
        if (r === H && c === W) return path;
        [
            [r - 1, c],
            [r + 1, c],
            [r, c + 1],
            [r, c - 1]
        ].forEach(([nr, nc]) => {
            if (seen[[nr, nc]]) return;
            if (nr < 0 || nr > H || nc < 0 || nc > W) return;
            if (corrupted(nr, nc)) return;
            Q.push([nr, nc, [...path, [nr, nc]]]);
            seen[[nr, nc]] = true;
        });
    }
};

let path = run(idx);
console.log('A', path.length);

console.time('B');
while (true) {
    const di = B.slice(idx).findIndex(([c, r]) =>
        path.some((p) => r === p[0] && c === p[1])
    );
    if (di === -1) {
        console.log('no answer');
        break;
    }
    idx += di;
    path = run(idx);
    if (!path) {
        console.log('B', B[idx] + '');
        console.timeEnd('B');
        break;
    }
}
