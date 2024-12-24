import data from './day24_input.js';
// import data from './day24_sample.js';

const ds = data().split('\n\n');
const values = Object.fromEntries(
    ds[0]
        .split('\n')
        .map((l) => l.split(': ').map((l, i) => (i === 1 ? +l : l)))
);
const conns = ds[1].split('\n').map((l) => {
    const [w1, op, w2, out] = l.split(/ -> | /);
    return { w1, op, w2, out };
});

const zs = conns
    .filter((a) => a.out.startsWith('z'))
    .map((a) => a.out)
    .sort()
    .reverse();

const getValue = (v1, v2, op) => {
    if (op === 'AND') return v1 && v2;
    if (op === 'OR') return v1 || v2;
    if (op === 'XOR') return v1 !== v2 ? 1 : 0;
};

const run = () => {
    const W = { ...values };
    while (true) {
        conns.forEach(({ w1, op, w2, out }) => {
            const v1 = W[w1];
            const v2 = W[w2];
            if (v1 !== undefined && v2 !== undefined) {
                W[out] = getValue(v1, v2, op);
            }
        });
        if (zs.every((z) => W[z] !== undefined)) {
            break;
        }
    }
    return parseInt(zs.map((z) => W[z]).join(''), 2);
};

console.log('A', run());

/*
adopt from: https://github.com/CodingAP/advent-of-code/tree/main/puzzles/2024/day24
works for input with no carry flag swapped
- z connected to XOR
- (x,y)AND --> OR (except i = 0)
- (x,y)XOR --> XOR or AND
- XOR connected to x, y or z
*/
const list = [];
for (let i = 0; i < zs.length; i++) {
    const id = ('' + i).padStart(2, '0');
    const isXYIn = (c) => [c.w1, c.w2].sort() + '' === `x${id},y${id}`;
    const xor = conns.find((c) => isXYIn(c) && c.op === 'XOR');
    const and = conns.find((c) => isXYIn(c) && c.op === 'AND');
    const z = conns.find((c) => c.out === `z${id}`);
    if (!xor || !and || !z) continue;

    if (z.op !== 'XOR') list.push(z.out);

    const afterAnd = conns.find((c) => [c.w1, c.w2].includes(and.out));
    if (afterAnd && afterAnd.op !== 'OR' && i > 0) list.push(and.out);

    const afterXor = conns.find((c) => [c.w1, c.w2].includes(xor.out));
    if (afterXor?.op === 'OR') list.push(xor.out);
}
list.push(
    ...conns
        .filter(
            (c) =>
                [c.w1, c.w2, c.out].every((s) => !/^[xyz]/.test(s)) &&
                c.op === 'XOR'
        )
        .map((c) => c.out)
);
console.log('B', list.sort().join(','));
