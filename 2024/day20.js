import data from './day20_input.js';
// import data from './day20_sample.js';
const M = data()
    .split('\n')
    .map((l) => [...l]);

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
    const result = [start];
    const seen = { [start]: true };
    while (result.at(-1) + '' !== end + '') {
        const [r, c] = result.at(-1);
        const np = [
            [r + 1, c],
            [r - 1, c],
            [r, c + 1],
            [r, c - 1]
        ].find(([nr, nc]) => M[nr]?.[nc] === '.' && !seen[[nr, nc]]);
        result.push(np);
        seen[np] = true;
    }
    return result;
};

const track = findTrack();
const trackIndex = Object.fromEntries(
    Object.entries(track).map(([k, v]) => [v + '', +k])
);

const findCheats = (r, c, d) => {
    const i = trackIndex[[r, c]];
    const points = [];
    for (let nr = r - d; nr <= r + d; nr++) {
        for (let nc = c - d; nc <= c + d; nc++) {
            const dd = Math.abs(nr - r) + Math.abs(nc - c);
            const ni = trackIndex[[nr, nc]];
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
    track.forEach(([r, c], i) => {
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
