import data from './day14_input.js';
// import data from './day14_sample.js';
const robots = data()
    .split('\n')
    .map((l) => {
        const m = l.match(/-?\d+/g).map(Number);
        return { p: { x: m[0], y: m[1] }, v: { x: m[2], y: m[3] } };
    });

const W = 101;
const H = 103;
// const W = 11;
// const H = 7;

const mod = (n, m) => ((n % m) + m) % m;
const move = (r) => {
    r.p.x = mod(r.p.x + r.v.x, W);
    r.p.y = mod(r.p.y + r.v.y, H);
    return r;
};

const countQuadrant = (robots) => {
    const nums = [0, 0, 0, 0];
    const bx = Math.floor(W / 2);
    const by = Math.floor(H / 2);
    robots.forEach((r) => {
        if (r.p.x < bx && r.p.y < by) nums[0]++;
        if (r.p.x > bx && r.p.y < by) nums[1]++;
        if (r.p.x < bx && r.p.y > by) nums[2]++;
        if (r.p.x > bx && r.p.y > by) nums[3]++;
    });
    return nums;
};

const draw = (robots) => {
    const M = Array(H)
        .fill(0)
        .map(() => Array(W).fill('.'));
    robots.forEach((r) => (M[r.p.y][r.p.x] = '#'));
    return M.map((row) => row.join('')).join('\n');
};

const mayBeAPic = (robots) => {
    return draw(robots).match(/#{8}/);
};

let i = 0;
while (true) {
    robots.forEach(move);
    if (i === 99) {
        console.log(
            'A',
            countQuadrant(robots).reduce((a, c) => a * c, 1)
        );
    }
    i++;
    if (mayBeAPic(robots)) {
        console.log('B', i);
        console.log(draw(robots));
        break;
    }
}
