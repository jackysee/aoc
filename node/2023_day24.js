import { init } from 'z3-solver';
import data from './day24_input.js';
// import data from './day24_sample.ts';
const H = data()
    .split('\n')
    .map((l) => [...l.match(/-?\d+/g)].map(Number));

const { Context } = await init();
const { Solver, Int } = new Context('main');
const solver = new Solver();
const x = Int.const('x');
const y = Int.const('y');
const z = Int.const('z');
const dx = Int.const('dx');
const dy = Int.const('dy');
const dz = Int.const('dz');
/*
t >= 0
x + vx * t == hailstone_x + v_hailstone_x * t
y + vy * t == hailstone_y + v_hailstone_y * t
z + vz * t == hailstone_z + v_hailstone_z * t
*/
H.slice(0,3).forEach((h, i) => {
    //t0 * vx + x - [x] - t0 * dx = 0
    const t = Int.const(`t${i}`);
    solver.add(t.mul(h[3]).add(h[0]).sub(x).sub(t.mul(dx)).eq(0));
    solver.add(t.mul(h[4]).add(h[1]).sub(y).sub(t.mul(dy)).eq(0));
    solver.add(t.mul(h[5]).add(h[2]).sub(z).sub(t.mul(dz)).eq(0));
});
console.time('B');
await solver.check();
console.log('B', Number(solver.model().eval(x.add(y).add(z)).value()));
console.timeEnd('B');
