const depth = 4002;
const target = [5, 746];
// const depth = 510;
// const target = [10, 10];
const n = 20183;
const erosion = {};
const geo = {};
const type = {};
geo[[0, 0]] = 0;
geo[target] = 0;

let risk = 0;

for (let y = 1; y <= target[1]; y++) {
    geo[[0, y]] = y * 48271;
}
for (let x = 1; x <= target[0]; x++) {
    geo[[x, 0]] = x * 16807;
}
for (let y = 0; y <= target[1]; y++) {
    for (let x = 0; x <= target[0]; x++) {
        if (geo[[x, y]] === undefined) {
            geo[[x, y]] = erosion[[x - 1, y]] * erosion[[x, y - 1]];
        }
        erosion[[x, y]] = (geo[[x, y]] + depth) % n;
        let e = erosion[[x, y]] % 3;
        type[[x, y]] = e; //['rocky', 'wet', 'narrow'][e];
        risk += e;
    }
}

console.log('Part 1', risk);
