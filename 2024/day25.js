import data from './day25_input.js';
// import data from './day25_sample.js';
const keys = [];
const locks = [];
data()
    .split('\n\n')
    .forEach((d) => {
        const m = d.split('\n');
        const cols = [0, 1, 2, 3, 4].map(
            (c) =>
                m
                    .map((r) => r[c])
                    .join('')
                    .match(/#+/)[0].length - 1
        );
        if (m[0] === '#####') locks.push(cols);
        if (m.at(-1) === '#####') keys.push(cols);
    });

let fit = 0;
keys.forEach((ks) => {
    locks.forEach((ls) => {
        if (ls.every((l, i) => l + ks[i] <= 5)) fit += 1;
    });
});
console.log(fit);
