import data from './day22_input.js';
import heap from './binaryHeap.js';

const [depth, t0, t1] = data().match(/\d+/gm).map(Number);
const target = [t0, t1];
// const depth = 510;
// const target = [10, 10];

const n = 20183;

const memoize = (fn) => {
    const cache = {};
    return (x, y) => {
        if (cache[[x, y]]) return cache[[x, y]];
        return (cache[[x, y]] = fn(x, y));
    };
};

const geo = memoize((x, y) => {
    if (x == 0 && y === 0) return 0;
    if (x == target[0] && y === target[1]) return 0;
    if (x === 0) return y * 48271;
    if (y === 0) return x * 16807;
    return erosion(x - 1, y) * erosion(x, y - 1);
});

const erosion = memoize((x, y) => (geo(x, y) + depth) % n);

const getType = memoize((x, y) => erosion(x, y) % 3);

let risk = 0;
for (let y = 0; y <= target[1]; y++) {
    for (let x = 0; x <= target[0]; x++) {
        risk += getType(x, y);
    }
}
console.log('Part 1', risk);

let queue = heap((a, b) => a.t < b.t);
queue.push({ pos: [0, 0], t: 0, tool: 'torch' });
let tools = ['neither', 'torch', 'gear'];
const T = {};
let t = Date.now();
while (queue.size()) {
    let pt = queue.pop();
    let [x, y] = pt.pos;
    let _t = T[[x, y, pt.tool]];
    if (_t !== undefined && _t <= pt.t) continue;
    T[[x, y, pt.tool]] = pt.t;

    if (pt.pos + '' === target + '' && pt.tool === 'torch') {
        console.log('Part 2', pt.t, `(took ${Date.now() - t}ms)`);
        break;
    }

    tools
        .filter((tool, i) => getType(x, y) !== i && tool !== pt.tool)
        .forEach((tool) => queue.push({ ...pt, t: pt.t + 7, tool }));

    [
        [x, y - 1],
        [x, y + 1],
        [x - 1, y],
        [x + 1, y]
    ].forEach(([x, y]) => {
        if (x < 0 || y < 0) return;
        if (pt.tool === tools[getType(x, y)]) return;
        queue.push({ pos: [x, y], t: pt.t + 1, tool: pt.tool });
    });
}
