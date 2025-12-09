import data from './day9_input.js';
// import data from './day9_sample.js';
const pts = data()
    .split('\n')
    .map((n) => n.split(',').map((n) => +n));

const area = (a, b) =>
    (Math.abs(a[0] - b[0]) + 1) * (Math.abs(a[1] - b[1]) + 1);

const pairs = pts
    .flatMap((a, i) => pts.slice(i + 1).map((b) => [area(a, b), a, b]))
    .toSorted((a, b) => b[0] - a[0]);

console.log(pairs[0][0]);

const sides = pts.map((p, i) => [p, pts[i + 1 === pts.length ? 0 : i + 1]]);

const inRange = (a1, a2, b1, b2) =>
    !(a1 <= b1 && a1 <= b2 && a2 <= b1 && a2 <= b2) &&
    !(a1 >= b1 && a1 >= b2 && a2 >= b1 && a2 >= b2);

const intersectSides = ([[x1, y1], [x2, y2]]) =>
    sides.some(
        ([[sx1, sy1], [sx2, sy2]]) =>
            inRange(sy1, sy2, y1, y2) && inRange(sx1, sx2, x1, x2)
    );

console.log(pairs.find((p) => !intersectSides(p.slice(1)))[0]);
