import data from './day13_input.js';
// import data from './day13_sample.js';
const machines = data()
    .split('\n\n')
    .map((d) => {
        const arr = d.split('\n').map((l) => l.match(/\d+/g));
        return {
            a: { x: +arr[0][0], y: +arr[0][1] },
            b: { x: +arr[1][0], y: +arr[1][1] },
            p: { x: +arr[2][0], y: +arr[2][1] }
        };
    });

/*
implementation of formula:
a1 * y = b1 * x + c1
a2 * y = b2 * x + c2
x = (a1 * c2 - a2 * c1) / (a2 * b1 - a1 * b2)
y = (b1 * x + c1) / a1
*/
const intersection = (a1, b1, c1, a2, b2, c2) => {
    const a = (a1 * c2 - a2 * c1) / (a2 * b1 - a1 * b2);
    const b = (b1 * a + c1) / a1;
    if ([a, b].every((d) => d > 0 && Number.isInteger(d))) return [a, b];
};

const calcToken = (d = 0) => {
    return machines.reduce((acc, { a, b, p }) => {
        const r = intersection(b.x, -1 * a.x, p.x + d, b.y, -1 * a.y, p.y + d);
        return r ? r[0] * 3 + r[1] + acc : acc;
    }, 0);
};

console.log('A', calcToken(0));
console.log('B', calcToken(10000000000000));
