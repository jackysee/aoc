// import { init } from 'npm:z3-solver';
import data from './day24_input.ts';
// import data from './day24_sample.ts';
const H = data()
    .split('\n')
    .map((l) => [...l.match(/-?\d+/g)!].map(Number));

const intersectXY = (l1: number[], l2: number[]) => {
    const [x1, y1, _z1, vx1, vy1, _vz1] = l1;
    const [x2, y2, _z2, vx2, vy2, _vz2] = l2;
    //y = ax + c , y = bx + d
    const a = (y1 + vy1 - y1) / (x1 + vx1 - x1);
    const c = y1 - a * x1;
    const b = (y2 + vy2 - y2) / (x2 + vx2 - x2);
    const d = y2 - b * x2;

    if (a === b) return undefined;
    const x = (d - c) / (a - b);
    const y = a * ((d - c) / (a - b)) + c;
    if (vx1 > 0 && x < x1) return undefined;
    if (vx1 < 0 && x > x1) return undefined;
    if (vy1 > 0 && y < y1) return undefined;
    if (vy1 < 0 && y > y1) return undefined;
    if (vx2 > 0 && x < x2) return undefined;
    if (vx2 < 0 && x > x2) return undefined;
    if (vy2 > 0 && y < y2) return undefined;
    if (vy2 < 0 && y > y2) return undefined;
    return [x, y];
};

const inside = ([x, y]: number[], [b1, b2]: number[]) => {
    return x >= b1 && x <= b2 && y >= b1 && y <= b2;
};

let count = 0;
// const B = [7, 27];
const B = [200000000000000, 400000000000000];
H.forEach((a, i) => {
    H.slice(i + 1).forEach((b) => {
        const pt = intersectXY(a, b);
        if (pt && inside(pt, B)) count++;
    });
});
console.log('A', count);
console.log('B', "deno has error with npm:z3-solver, use python instead :(")
