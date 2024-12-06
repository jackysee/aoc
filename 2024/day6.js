import data from './day6_input.js';
// import data from './day6_sample.js';
const M = data()
    .split('\n')
    .map((l) => l.split(''));

const go = (dir, r, c) => {
    return {
        U: [r - 1, c],
        D: [r + 1, c],
        L: [r, c - 1],
        R: [r, c + 1]
    }[dir];
};

const turnRight = (dir) => ({ U: 'R', D: 'L', L: 'U', R: 'D' })[dir];

const step = (M, dir, r, c) => {
    const [dr, dc] = go(dir, r, c);
    const m = M[dr]?.[dc];
    if (m === '#') {
        return [turnRight(dir), r, c];
    } else {
        return [dir, dr, dc];
    }
};

const sr = M.findIndex((l) => l.indexOf('^') !== -1);
const sc = M[sr].indexOf('^');
const dir = 'U';

const patrol = (M, d, r, c) => {
    const path = new Set([[d, r, c] + '']);
    while (true) {
        const [nd, nr, nc] = step(M, d, r, c);
        if (!M[nr]?.[nc]) {
            return { path, out: true };
        }
        //only check for dir change
        if (nd !== d && path.has([nd, nr, nc] + '')) {
            return { path, loop: true };
        }
        [d, r, c] = [nd, nr, nc];
        path.add([d, r, c] + '');
    }
};

const originalPath = new Set(
    [...patrol(M, dir, sr, sc).path].map((s) => s.slice(2))
);
console.log('A', new Set(originalPath).size);

const list = [...originalPath].map((s) => s.split(',').map(Number));

let count = 0;
list.forEach(([r, c]) => {
    const m = M[r]?.[c];
    if (m === '.' || m === '^') {
        M[r].splice(c, 1, '#');
        const path = patrol(M, dir, sr, sc);
        if (path.loop) count++;
        M[r].splice(c, 1, m);
    }
});

console.log('B', count);
