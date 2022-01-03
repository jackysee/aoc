// const depth = 4002;
// const target = [5,746];
const depth = 510;
const target = [10, 10];
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
        // (a + b ) mod n = [(a mod n) + (b mod n)] mod n
        // ab mod n = [(a mod n)(b mod n)] mod n;
        if (geo[[x, y]] === undefined) {
            // console.log('define', [x, y], geo[[x - 1, y]], geo[[x, y - 1]]);
            // geo[[x, y]] = geo[[x - 1, y]] * geo[[x, y - 1]];
            let g = (((geo[[x - 1, y]] % n) * geo[[x, y - 1]]) % n) % n;
            erosion[[x, y]] = (g + (depth % n)) % n;
        } else {
            erosion[[x, y]] = (geo[[x, y]] + depth) % 20183;
        }
        let e = erosion[[x, y]] % 3;
        type[[x, y]] = ['rocky', 'wet', 'narrow'][e];
        risk += e;
    }
}

console.log(risk);
