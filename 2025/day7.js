import data from './day7_input.js';
// import data from './day7_sample.js';
const M = data().split('\n');
let split = 0;
let beams = {};
M.forEach((row, r) => {
    if (r === 0) {
        beams = { [row.indexOf('S')]: 1 };
        return;
    }
    const entries = Object.entries(beams);
    beams = {};
    entries.forEach(([idx, world]) => {
        idx = +idx;
        if (row[idx] === '.') beams[idx] = (beams[idx] ?? 0) + world;
        if (row[idx] === '^') {
            split++;
            beams[idx - 1] = (beams[idx - 1] ?? 0) + world;
            beams[idx + 1] = (beams[idx + 1] ?? 0) + world;
        }
    });
});

console.log(split);
console.log(Object.values(beams).reduce((a, c) => a + c, 0));
