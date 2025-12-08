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
    const newBeams = {};
    Object.entries(beams).forEach(([idx, world]) => {
        idx = +idx;
        if (row[idx] === '.') newBeams[idx] = (newBeams[idx] ?? 0) + world;
        if (row[idx] === '^') {
            split++;
            newBeams[idx - 1] = (newBeams[idx - 1] ?? 0) + world;
            newBeams[idx + 1] = (newBeams[idx + 1] ?? 0) + world;
        }
    });
    beams = newBeams;
});

console.log(split);
console.log(Object.values(beams).reduce((a, c) => a + c, 0));
