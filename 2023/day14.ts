import data from './day14_input.ts';
// import data from './day14_sample.ts';

const M = data()
    .split('\n')
    .map((l) => l.split(''));
const C = M[0].length;
const R = M.length;

const move = (_r: number, _c: number, dir = 'north') => {
    let [r, c] = [_r, _c];
    while (true) {
        let [nr, nc] = [r, c];
        if (dir === 'north') nr--;
        if (dir === 'south') nr++;
        if (dir === 'west') nc--;
        if (dir === 'east') nc++;
        if (M[nr]?.[nc] !== '.') break;
        [r, c] = [nr, nc];
    }
    M[_r][_c] = '.';
    M[r][c] = 'O';
};

function* range(start: number, end: number) {
    if (start <= end) {
        for (let i = start; i < end; i++) yield i;
    } else {
        for (let i = start - 1; i >= end; i--) yield i;
    }
}

const tilt = (dir: string) => {
    let [a1, a2, b1, b2] = [0, R, 0, C]; //north
    if (dir === 'west') [a1, a2, b1, b2] = [0, C, 0, R];
    if (dir === 'south') [a1, a2, b1, b2] = [R, 0, 0, C];
    if (dir === 'east') [a1, a2, b1, b2] = [C, 0, 0, R];
    for (const i of range(a1, a2)) {
        for (const j of range(b1, b2)) {
            const [r, c] = /west|east/.test(dir) ? [j, i] : [i, j];
            if (M[r][c] === 'O') move(r, c, dir);
        }
    }
};

const count = () => {
    let count = 0;
    M.forEach((row, r) => {
        row.forEach((n) => {
            if (n === 'O') {
                count += M.length - r;
            }
        });
    });
    return count;
};

const t = performance.now();
const hash = () => M.map((r) => r.join('')).join('|');
const patterns = [hash()];
const counts = [count()];
const N = 1000000000;
for (let i = 0; i < N; i++) {
    tilt('north');
    if (i === 0) console.log('A', count());
    tilt('west');
    tilt('south');
    tilt('east');
    const h = hash();
    const idx = patterns.indexOf(h);
    if (idx !== -1) {
        const len = i - idx + 1;
        console.log(
            'B',
            counts.slice(idx)[(N - idx) % len],
            `took ${performance.now() - t}ms`
        );
        break;
    }
    patterns.push(h);
    counts.push(count());
}
