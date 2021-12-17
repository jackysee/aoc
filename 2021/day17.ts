import data from './day17_input.ts';
// import data from './day17_sample.ts';

let [x1, x2, y1, y2] = data()
    .match(/(-?\d+)/g)!
    .map(Number);

const inTarget = (x: number, y: number) =>
    x >= x1 && x <= x2 && y >= y1 && y <= y2;

const probe = (vx: number, vy: number): [boolean, number] => {
    let [x, y] = [0, 0];
    let maxY = -Infinity;
    while (true) {
        if (inTarget(x, y)) return [true, maxY];
        if (x > x2 || y < y1) return [false, maxY];
        x += vx;
        y += vy;
        vx = vx + (vx === 0 ? 0 : vx > 0 ? -1 : 1);
        vy = vy - 1;
        if (y > maxY) maxY = y;
    }
};

let heights = [];
for (let vx = 0; vx <= x2; vx++) {
    for (let vy = y1; vy < -1 * y1; vy++) {
        let [success, h] = probe(vx, vy);
        if (success) heights.push(h);
    }
}

console.log('Part 1', Math.max(...heights));
console.log('Part 2', heights.length);
