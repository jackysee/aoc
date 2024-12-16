// const data = require('./day23_sample.js');
import data from './day23_input.js';
import heap from './binaryHeap.js';

let bots = data()
    .split('\n')
    .map((s) => s.match(/-?\d+/g).map(Number));

let o = [...bots].sort((a, b) => b[3] - a[3])[0];

const dist = (p1, p2) =>
    [0, 1, 2].map((i) => Math.abs(p1[i] - p2[i])).reduce((a, c) => a + c, 0);

function contains(b1, b2) {
    return dist(b1, b2) <= b1[3];
}

console.log('Part 1', bots.filter((n) => contains(o, n)).length);

//Part 2 is re-implementation of
// https://www.reddit.com/r/adventofcode/comments/a8s17l/comment/ecfmpy0/
let max = Math.max(
    ...[0, 1, 2].map((i) => Math.max(...bots.map((b) => b[3] + Math.abs(b[i]))))
);
let size = 1;
while (size <= max) size *= 2;
let initialBox = [
    [-size, -size, -size],
    [size, size, size]
];

function intersect([box0, box1], bot) {
    let d = 0;
    [0, 1, 2].forEach((i) => {
        let low = box0[i];
        let high = box1[i] - 1;
        d += Math.abs(bot[i] - low) + Math.abs(bot[i] - high);
        d -= high - low;
    });
    d = Math.floor(d / 2);
    return d <= bot[3];
}

let PQ = heap((a, b) =>
    b.inRange === a.inRange
        ? b.boxSize === a.boxSize
            ? b.dist > a.dist
            : a.boxSize > b.boxSize
        : a.inRange > b.inRange
);

PQ.push({
    inRange: bots.length,
    boxSize: 2 * size,
    dist: 3 * size,
    box: initialBox
});

while (PQ.size()) {
    let p = PQ.pop();
    if (p.boxSize === 1) {
        console.log('Part 2', p.dist);
        break;
    }
    let boxSize = Math.floor(p.boxSize / 2);
    [
        [0, 0, 0],
        [0, 0, 1],
        [0, 1, 0],
        [0, 1, 1],
        [1, 0, 0],
        [1, 0, 1],
        [1, 1, 0],
        [1, 1, 1]
    ].forEach((b) => {
        let box0 = [
            p.box[0][0] + boxSize * b[0],
            p.box[0][1] + boxSize * b[1],
            p.box[0][2] + boxSize * b[2]
        ];
        let box1 = [box0[0] + boxSize, box0[1] + boxSize, box0[2] + boxSize];
        let box = [box0, box1];
        let inRange = bots.filter((b) => intersect(box, b)).length;
        let d = dist(box0, [0, 0, 0]);
        PQ.push({ inRange, boxSize, dist: d, box });
    });
}
