import data from './day21_input.ts';
// import data from './day21_sample.ts';

let S = [-1, -1];
const M = data()
    .split('\n')
    .map((l, r) => {
        if (l.includes('S')) S = [r, l.indexOf('S')];
        return [...l];
    });
const W = M[0].length;

const wrap = (r: number, c: number) => {
    r = r % W;
    c = c % W;
    return [r >= 0 ? r : W + r, c >= 0 ? c : W + c];
};

const getNeighbor = (r: number, c: number) => {
    // prettier-ignore
    const dir = [ [1, 0], [-1, 0], [0, -1], [0, 1] ];
    const result = [];
    for (const [dr, dc] of dir) {
        const [wr, wc] = wrap(r + dr, c + dc);
        const tile = M[wr]?.[wc];
        if (!tile || tile === '#') continue;
        result.push([r + dr, c + dc]);
    }
    return result;
};

const countPlot = (step: number) => {
    const result = new Set();
    const seen = new Set();
    const queue: number[][] = [];
    queue.push([...S, step]);
    while (queue.length) {
        const [r, c, s] = queue.shift()!;
        if (s % 2 == 0) result.add(`${r},${c}`);
        if (s === 0) continue;
        for (const [nr, nc] of getNeighbor(r, c)) {
            if (seen.has(`${nr},${nc}`)) continue;
            seen.add(`${nr},${nc}`);
            queue.push([nr, nc, s - 1]);
        }
    }
    return result.size;
};
console.log('A', countPlot(64));

/*
 * https://www.reddit.com/r/adventofcode/comments/18nevo3/comment/keb6a53/?context=3
 * Lagrange's Interpolation formula for ax^2 + bx + c with x=[0,1,2] and y=[y0,y1,y2] we have
 *   f(x) = (x^2-3x+2) * y0/2 - (x^2-2x)*y1 + (x^2-x) * y2/2
 * so the coefficients are:
 * a = y0/2 - y1 + y2/2
 * b = -3*y0/2 + 2*y1 - y2/2
 * c = y0
 */
const STEPS = 26501365; // = 65 + 131 * i
const remain = STEPS % W;
const [y0, y1, y2] = [
    countPlot(remain),
    countPlot(remain + W),
    countPlot(remain + W * 2)
];
const a = y0 / 2 - y1 + y2 / 2;
const b = -3 * (y0 / 2) + 2 * y1 - y2 / 2;
const c = y0;
const x = Math.floor(STEPS / W);
console.log('B', a * x * x + b * x + c);
