//AOC2018 D10
import data from './day10_input.js';

function parse(s) {
    return s.split('\n').map((l) => {
        let [x, y, dx, dy] = l.match(/-?\d+/g).map(Number);
        return { x, y, dx, dy };
    });
}

function getBounds(pts) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    pts.forEach(({ x, y }) => {
        if (x > maxX) maxX = x;
        if (x < minX) minX = x;
        if (y > maxY) maxY = y;
        if (y < minY) minY = y;
    });
    return { minX, maxX, minY, maxY };
}

function isLarger(b1, b2) {
    let b1y = b1.maxY - b1.minY;
    let b2y = b2.maxY - b2.minY;
    return b2y > b1y;
}

let pts = parse(data());
let bounds = getBounds(pts);
let t = 0;
while (true) {
    let _pts = pts.map((p) => ({ ...p, x: p.x + p.dx, y: p.y + p.dy }));
    let _bounds = getBounds(pts);
    if (isLarger(bounds, _bounds)) {
        break;
    }
    pts = _pts;
    bounds = _bounds;
    t++;
}

//go back one frame
console.log('t =', t - 1);
pts = pts.map((p) => ({ ...p, x: p.x - p.dx, y: p.y - p.dy }));

let map = Object.fromEntries(pts.map((p) => [[p.x, p.y], true]));
for (let y = bounds.minY; y <= bounds.maxY; y++) {
    let str = '';
    for (let x = bounds.minX; x <= bounds.maxX; x++) {
        str += map[[x, y]] ? '#' : ' ';
    }
    console.log(str);
}
