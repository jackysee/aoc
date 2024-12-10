// import { init } from 'npm:z3-solver';
import data from './day24_input.ts';
// import data from './day24_sample.ts';
const H = data()
    .split('\n')
    .map((l) => [...l.match(/-?\d+/g)!].map(Number));

const intersect = (l1: number[], l2: number[], type = 'xy') => {
    let [x1, y1, z1, vx1, vy1, vz1] = l1;
    let [x2, y2, z2, vx2, vy2, vz2] = l2;
    if (type === 'xz') {
        [y1, vy1] = [z1, vz1];
        [y2, vy2] = [z2, vz2];
    }
    const a = (y1 + vy1 - y1) / (x1 + vx1 - x1);
    const c = y1 - a * x1;
    const b = (y2 + vy2 - y2) / (x2 + vx2 - x2);
    const d = y2 - b * x2;

    if (a === b) return undefined;
    const x = (d - c) / (a - b);
    const y = a * ((d - c) / (a - b)) + c;
    return [x, y];
};

//const intersectXY = (l1: number[], l2: number[]) => {
//    const [x1, y1, _z1, vx1, vy1, _vz1] = l1;
//    const [x2, y2, _z2, vx2, vy2, _vz2] = l2;
//    //y = ax + c , y = bx + d
//    const a = (y1 + vy1 - y1) / (x1 + vx1 - x1);
//    const c = y1 - a * x1;
//    const b = (y2 + vy2 - y2) / (x2 + vx2 - x2);
//    const d = y2 - b * x2;

//    if (a === b) return undefined;
//    const x = (d - c) / (a - b);
//    const y = a * ((d - c) / (a - b)) + c;
//    return [x, y];
//};

const inside = ([x, y]: number[], [b1, b2]: number[]) => {
    return x >= b1 && x <= b2 && y >= b1 && y <= b2;
};

let count = 0;
// const B = [7, 27];
const B = [200000000000000, 400000000000000];
H.forEach((a, i) => {
    H.slice(i + 1).forEach((b) => {
        const pt = intersect(a, b);
        if (!pt) return;
        if (!inside(pt!, B)) return;
        const [x, _y] = pt;
        if ((x < a[0] && a[3] > 0) || (x > a[0] && a[3] < 0)) return;
        if ((x < b[0] && b[3] > 0) || (x > b[0] && b[3] < 0)) return;
        count++;
    });
});
console.log('A', count);

const SUB = H.slice(0, 10);
const findCommonIntersection = (v: number[], type = 'xy') => {
    let possible = true;
    let current: number[] | undefined = undefined;
    const lines = SUB.map((line) => {
        const _line = [...line];
        if (type === 'xy') {
            _line[3] += v[0];
            _line[4] += v[1];
        }
        if (type === 'xz') {
            _line[3] += v[0];
            _line[5] += v[1];
        }
        return _line;
    });
    lines.forEach((a, i) => {
        lines.slice(i + 1).forEach((b) => {
            if (!possible) return false;
            const pt = intersect(a, b, type);
            if (pt === undefined) return;
            if (!current) current = pt;
            possible = pt[0] === current[0] && pt[1] === current[1];
        });
    });
    if (!possible) return false;
    return current;
};

outer: for (let a = 0; a <= Infinity; a++) {
    for (let b = 0; b <= a; b++) {
        //prettier-ignore
        for (const [x, y] of [ [a, b], [b, a] ]) {
            //prettier-ignore
            for (const [dx, dy] of [ [1, 1], [1, -1], [-1, 1], [-1, -1] ]) {
                const xy = findCommonIntersection([x * dx, y * dy], 'xy');
                if (!xy) continue;

                for (let z = 0; z <= Infinity; z++) {
                    for (const dz of [1, -1]) {
                        console.log('try z', xy)
                        const xz = findCommonIntersection([x * dx, z * dz], 'xz');
                        if (!xz) continue;
                        console.log(xy[0] + xy[1] + xz[1]);
                        break outer;
                    }
                }
            }
        }
    }
}

//import { init } from 'z3-solver';
//import data from './day24_input.js';
//// import data from './day24_sample.ts';
//const H = data()
//    .split('\n')
//    .map((l) => [...l.match(/-?\d+/g)].map(Number));

//const { Context } = await init();
//const { Solver, Int } = new Context('main');
//const solver = new Solver();
//const x = Int.const('x');
//const y = Int.const('y');
//const z = Int.const('z');
//const dx = Int.const('dx');
//const dy = Int.const('dy');
//const dz = Int.const('dz');
///*
//t >= 0
//x + vx * t == hailstone_x + v_hailstone_x * t
//y + vy * t == hailstone_y + v_hailstone_y * t
//z + vz * t == hailstone_z + v_hailstone_z * t
//*/
//H.slice(0,3).forEach((h, i) => {
//    //t0 * vx + x - [x] - t0 * dx = 0
//    const t = Int.const(`t${i}`);
//    solver.add(t.mul(h[3]).add(h[0]).sub(x).sub(t.mul(dx)).eq(0));
//    solver.add(t.mul(h[4]).add(h[1]).sub(y).sub(t.mul(dy)).eq(0));
//    solver.add(t.mul(h[5]).add(h[2]).sub(z).sub(t.mul(dz)).eq(0));
//});
//console.time('B');
//await solver.check();
//console.log('B', Number(solver.model().eval(x.add(y).add(z)).value()));
//console.timeEnd('B');
