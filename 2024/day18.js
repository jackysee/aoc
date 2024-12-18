import data from './day18_input.js';
const [bidx, W, H] = [1023, 70, 70];

// import data from './day18_sample.js';
// const [bidx, W, H ]= [11, 6, 6];

const B = data()
    .split('\n')
    .map((l) => l.split(',').map(Number));

const run = (idx) => {
    const BS = B.slice(0, idx + 1);
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
            if (BS.some(([bc, br]) => br === r && c === bc)) return;
            Q.push([nr, nc, [...path, [nr, nc]]]);
            seen[[nr, nc]] = true;
        });
    }
};

let idx = bidx;
let path = run(idx);
console.log('A', path.length);

console.time('Linear');
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
        console.log('B(linear)', B[idx] + '');
        console.timeEnd('Linear');
        break;
    }
}

console.time('BinarySearch');
let left = bidx;
let right = B.length - 1;
while (left != right) {
    const idx = Math.floor((left + right) / 2);
    const path = run(idx);
    if (path) left = idx + 1;
    else right = idx - 1;
}
console.log('B(binary search)', B[idx] + '');
console.timeEnd('BinarySearch');
