import data from './day4_input.js';
// import data from './day4_sample.js';
const rolls = new Set();
data()
    .split('\n')
    .forEach((l, r) =>
        l.split('').forEach((p, c) => {
            if (p === '@') rolls.add([r, c] + '');
        })
    );

function removeRolls() {
    const arr = [];
    rolls.forEach((p) => {
        const [r, c] = p.split(',').map((n) => +n);
        const adjRolls = [
            [r - 1, c - 1],
            [r - 1, c],
            [r - 1, c + 1],
            [r, c - 1],
            [r, c + 1],
            [r + 1, c - 1],
            [r + 1, c],
            [r + 1, c + 1]
        ].filter(([r, c]) => rolls.has([r, c] + ''));
        if (adjRolls.length < 4) {
            arr.push([r, c] + '');
        }
    });
    arr.forEach((a) => rolls.delete(a));
    return arr.length;
}

let removed = removeRolls();
console.log(removed);
let totalRemoved = removed;
while (removed > 0) {
    removed = removeRolls();
    totalRemoved += removed;
}
console.log(totalRemoved);
