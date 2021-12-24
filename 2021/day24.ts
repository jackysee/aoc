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

/*
 *
11111111111111

w = int(input())
x = int((z % 26) + b != w)
z //= a
z *= 25*x+1
z += (w+c)*x


when a == 1, z = z * 26 + w + c (push w+c to base 26)
when a == 26, 

1 10 13
1 13 10
1 13 3
26 -11 1
1 11 9
26 -4 3
1 12 5
1 12 1
1 15 0
26 -2 13
26 -5 7
26 -11 15
26 -13 12
26 -10 8
 

*/
