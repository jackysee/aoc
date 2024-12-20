import data from './day20_input.js';
// import data from './day20_sample.js';
const M = data()
    .split('\n')
    .map((l) => [...l]);

const H = M.length;
const W = M[0].length;
const getAdj = (r, c) => [
    [r + 1, c],
    [r - 1, c],
    [r, c + 1],
    [r, c - 1]
];

let start;
let end;
let cheats = [];
M.forEach((l, r) =>
    l.forEach((t, c) => {
        if (t === 'S') {
            start = [r, c];
            M[r][c] = '.';
        }
        if (t === 'E') {
            end = [r, c];
            M[r][c] = '.';
        }
    })
);

const findTrack = () => {
    const Q = [];
    Q.push([...start, 0, [start]]);
    const seen = { start: true };
    while (Q.length) {
        const [r, c, len, path] = Q.pop();
        if (r === end[0] && c === end[1]) {
            return path;
        }
        getAdj(r, c).forEach(([nr, nc]) => {
            const t = M[nr]?.[nc];
            if (seen[[nr, nc]]) return;
            if (t !== '.') return;
            Q.push([nr, nc, len + 1, [...path, [nr, nc]]]);
            seen[[nr, nc]] = true;
        });
    }
};

const path = findTrack();
const pathIndex = Object.fromEntries(
    Object.entries(path).map(([k, v]) => [v + '', +k])
);

const findCheats = (r, c, d) => {
    const i = pathIndex[[r, c]];
    const points = [];
    for (let nr = r - d; nr <= r + d; nr++) {
        for (let nc = c - d; nc <= c + d; nc++) {
            const dd = Math.abs(nr - r) + Math.abs(nc - c);
            const ni = pathIndex[[nr, nc]];
            const saved = ni - i - dd;
            if (dd <= d && M[nr]?.[nc] === '.' && saved > 0) {
                points.push([nr, nc, saved]);
            }
        }
    }
    return points;
};

const countCheats = (t) => {
    const saved = {};
    path.forEach(([r, c], i) => {
        const cheats = findCheats(r, c, t);
        cheats.forEach(([er, ec, ds]) => {
            saved[ds] = saved[ds] ?? 0;
            saved[ds]++;
        });
    });
    let sum = 0;
    Object.entries(saved).map(([saved, count]) => {
        if (+saved >= 100) sum += count;
    });

    return sum;
};

console.log('A', countCheats(2));
console.log('B', countCheats(20));
