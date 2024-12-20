import data from './day20_input.js';
// import data from './day20_sample.js';
let start;
let end;
const M = data()
    .split('\n')
    .map((l, r) => {
        return [...l].map((m, c) => {
            if (m === 'S') {
                start = [r, c];
                return '.';
            }
            if (m === 'E') {
                end = [r, c];
                return '.';
            }
            return m;
        });
    });

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

const countCheatsByPos = (r, c, d, minSaved) => {
    const i = trackIndex[[r, c]];
    let result = 0;
    for (let nr = r - d; nr <= r + d; nr++) {
        for (let nc = c - d; nc <= c + d; nc++) {
            const dd = Math.abs(nr - r) + Math.abs(nc - c);
            const ni = trackIndex[[nr, nc]];
            const saved = ni - i - dd;
            if (dd <= d && M[nr]?.[nc] === '.' && saved >= minSaved) {
                result++;
            }
        }
    }
    return result;
};

const countCheats = (t) => {
    return track.reduce((a, c) => a + countCheatsByPos(...c, t, 100), 0);
};

console.log('A', countCheats(2));
console.time('B');
console.log('B', countCheats(20));
console.timeEnd('B');
