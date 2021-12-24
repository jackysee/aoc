import data from './day24_input.ts';
// import data from './day24_sample.ts';

interface Instruction {
    op: string;
    a: string;
    b: string | number | undefined;
}

let ins: Instruction[] = data()
    .split('\n')
    .map((s) => {
        let [op, a, b] = s.split(' ');
        return {
            op,
            a,
            b: /\d+/.test(b) ? Number(b) : b
        };
    });

let n = 11111111111111;
let max = n;
while (n <= 99999999999999) {
    const val = { w: 0, x: 0, y: 0, z: 0 };
    type k = keyof typeof val;
    let ns = (n + '').split('').map(Number);
    if (ns.some((n) => n === 0)) {
        n++;
        continue;
    }
    ins.forEach((i) => {
        let op = i.op;
        let a = i.a as k;
        let b = (typeof i.b === 'string' ? (val[i.b as k] as number) : i.b)!;
        if (op === 'inp') {
            val[a] = ns.shift()!;
        }
        if (op === 'add') {
            val[a] = val[a] + b;
        }
        if (op === 'mul') {
            val[a] = val[a] * b;
        }
        if (op === 'div') {
            val[a] = Math.floor(val[a] / b);
        }
        if (op === 'mod') {
            val[a] = val[a] % b;
        }
        if (op === 'eq') {
            val[a] = val[a] === b ? 1 : 0;
        }
    });
    if (val.z === 0) {
        max = Math.max(n, max);
        console.log('update max', max);
    }
    console.log(n);
    n++;
}

console.log('Part 1', max);
