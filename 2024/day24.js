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

const result = run();
console.log('A', result);

const list = [];
for (let i = 0; i < zs.length; i++) {
    const id = ('' + i).padStart(2, '0');
    const isXYIn = (c) =>
        (c.w1 === `x${id}` && c.w2 === `y${id}`) ||
        (c.w1 === `y${id}` && c.w2 === `x${id}`);
    const xor1 = conns.find((c) => isXYIn(c) && c.op === 'XOR');
    const and1 = conns.find((c) => isXYIn(c) && c.op === 'AND');
    const z = conns.find((c) => c.out === `z${id}`);

    if (xor1 === undefined || and1 === undefined || z === undefined) continue;

    if (z.op !== 'XOR') list.push(z.out);

    const or = conns.find((c) => c.w1 === and1.out || c.w2 === and1.out);
    if (or && or.op !== 'OR' && i > 0) list.push(and1.out);

    const after = conns.find((c) => c.w1 === xor1.out || c.w2 === xor1.out);
    if (after?.op === 'OR') list.push(xor1.out);
}
list.push(
    ...conns
        .filter(
            (c) =>
                !/^[xy]/.test(c.w1) &&
                !/^[xy]/.test(c.w2) &&
                !/^z/.test(c.out) &&
                c.op === 'XOR'
        )
        .map((c) => c.out)
);
console.log('B', list.sort().join(','));
