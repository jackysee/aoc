import data from './day21_input.js';
const lines = data().split('\n');
const ip_pos = Number(lines[0].match(/\d+/)[0]);
const instructions = lines.slice(1).map((l) => {
    let [op, a, b, c] = l.match(/(\w+) (\d+) (\d+) (\d+)/).slice(1);
    return { op, a: Number(a), b: Number(b), c: Number(c) };
});

let ops = {};
const createOp = (name, cb) => {
    let f = (_registers, a, b, c) => {
        let registers = [..._registers];
        cb(registers, a, b, c);
        return registers;
    };
    ops[name] = f;
};
createOp('addr', (r, a, b, c) => (r[c] = r[a] + r[b]));
createOp('addi', (r, a, b, c) => (r[c] = r[a] + b));
createOp('mulr', (r, a, b, c) => (r[c] = r[a] * r[b]));
createOp('muli', (r, a, b, c) => (r[c] = r[a] * b));
createOp('banr', (r, a, b, c) => (r[c] = r[a] & r[b]));
createOp('bani', (r, a, b, c) => (r[c] = r[a] & b));
createOp('borr', (r, a, b, c) => (r[c] = r[a] | r[b]));
createOp('bori', (r, a, b, c) => (r[c] = r[a] | b));
createOp('setr', (r, a, b, c) => (r[c] = r[a]));
createOp('seti', (r, a, b, c) => (r[c] = a));
createOp('gtir', (r, a, b, c) => (r[c] = a > r[b] ? 1 : 0));
createOp('gtri', (r, a, b, c) => (r[c] = r[a] > b ? 1 : 0));
createOp('gtrr', (r, a, b, c) => (r[c] = r[a] > r[b] ? 1 : 0));
createOp('eqir', (r, a, b, c) => (r[c] = a == r[b] ? 1 : 0));
createOp('eqri', (r, a, b, c) => (r[c] = r[a] == b ? 1 : 0));
createOp('eqrr', (r, a, b, c) => (r[c] = r[a] == r[b] ? 1 : 0));

function run(reg) {
    let t = Date.now();
    let ip = reg[ip_pos];
    let seen = new Set();
    let last;
    while (true) {
        let ins = instructions[ip];
        if (!ins) break;
        reg[ip_pos] = ip;
        let { op, a, b, c } = ins;
        if (op === 'eqrr') {
            if (!seen.size) console.log('Part 1', reg[4]);
            if (seen.has(reg[4])) {
                console.log(
                    'Part 2',
                    last,
                    `(took ${Date.now() - t}ms, ${seen.size} loop)`
                );
                break;
            }
            seen.add(reg[4]);
            last = reg[4];
        }
        reg = ops[op](reg, a, b, c);
        ip = reg[ip_pos];
        ip += 1;
    }
    return reg;
}
run([0, 0, 0, 0, 0, 0]);
/*
#ip 5
0  seti 123 0 4           r4 = 123
1  bani 4 456 4           r4 = r4 & 456 = 72
2  eqri 4 72 4            r4 = r4 == 72?
3  addr 4 5 5              // r5 = r4 + r5
4  seti 0 0 5              false => r5 = 0, jump  1
5  seti 0 8 4              true => r4 = 0
6  bori 4 65536 3         r3 = r4 | 65536 
7  seti 707129 0 4        r4 = 707129
8  bani 3 255 2           r2 = r3  & 255
9  addr 4 2 4             r4 = r4 + r2
10 bani 4 16777215 4      r4 = r4 & 16777215
11 muli 4 65899 4         r4 = r4 * 65899
12 bani 4 16777215 4      r4 = r4 & 16777215
13 gtir 256 3 2           r2 = 256 > r3
14 addr 2 5 5               // r5 = r2 + r5
15 addi 5 1 5               false  => r5 = r5 + 1, jump 17
16 seti 27 6 5              true => r5 = 27, jump 28
17 seti 0 7 2             r2 = 0
18 addi 2 1 1             r1 = r2 + 1
19 muli 1 256 1           r1 = r1 * 256
20 gtrr 1 3 1             r1 = r1 > r3
21 addr 1 5 5               // r5 = r1 + r5
22 addi 5 1 5               false => r5 = r5 + 1, jump 24
23 seti 25 2 5              true => r5 = 25, jump 26
24 addi 2 1 2             r2 = r2 + 1
25 seti 17 1 5            r5 = 17, jump 18
26 setr 2 4 3             r3 = r2 + r4
27 seti 7 4 5             r5 = 7, jump 8
28 eqrr 4 0 2             r2 = r4 === r0
29 addr 2 5 5              // r5 = r2 + r5
30 seti 5 2 5              false => r5 = 5, jump 6

*/
