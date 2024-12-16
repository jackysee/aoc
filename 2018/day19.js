import data from './day19_input.js';
// const data = require('./day19_sample.js');

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
    let ip = reg[ip_pos];
    while (true) {
        let ins = instructions[ip];
        if (!ins) break;
        reg[ip_pos] = ip;
        let { op, a, b, c } = ins;
        reg = ops[op](reg, a, b, c);
        ip = reg[ip_pos];
        ip += 1;
    }
    return reg;
}

console.log('Part 1', run([0, 0, 0, 0, 0, 0])[0]);

/*
ip = r3
0   addi 3 16 3  r3 = 16, jump 17
--- MAIN
1   seti 1 3 4   r4 = 1
--- LOOP1
2   seti 1 8 5   r5 = 1
--- LOOP2
3   mulr 4 5 1   
4   eqrr 1 2 1   if r4 * r5 === r2 ? r0 += r4
5   addr 1 3 3   
6   addi 3 1 3    
7   addr 4 0 0    
8   addi 5 1 5   r5 = r5 + 1
9   gtrr 5 2 1   r5 <= r2 ? jump 3 (LOOP2)
10  addr 3 1 3  
11  seti 2 6 3   
--- /LOOP2
12  addi 4 1 4   r4 = r4 + 1
13  gtrr 4 2 1   r4 > r2
14  addr 1 3 3     true => HALT
15  seti 1 1 3     false => jump 2
--- /LOOP1
16  mulr 3 3 3    r3 = r3 * r3, HALT
-------- SETUP
17  addi 2 2 2    
18  mulr 2 2 2    
19  mulr 3 2 2    
20  muli 2 11 2   r2 = 2 * 2 * 19 * 11 = 836
21  addi 1 5 1    
22  mulr 1 3 1    
23  addi 1 8 1    r1 = 5 * 22 + 8 = 118
24  addr 2 1 2    r2 = r2 + r1 = 836 + 118 = 954
25  addr 3 0 3    r0 == 0? jump 1 (MAIN)
26  seti 0 5 3    
--------
27  setr 3 9 1    r1 = 27
28  mulr 1 3 1    r1 = r1 * r3 = 27 * 28 = 756
29  addr 3 1 1    r1 = r3 + r1 = 29 + 756 = 785
30  mulr 3 1 1    r1 = r3 * r1 = 30 * 785 = 23350
31  muli 1 14 1   r1 = r1 * 14 = 326900
32  mulr 1 3 1    r1 = r1 * r3 = 326900 * 32 = 10550400
33  addr 2 1 2    r2 = r2 + r1 = 954 + 10550400 = 10551354
34  seti 0 9 0    r0 = 0
35  seti 0 9 3    r3 = 0, jump 1 (MAIN)
*/

//R0 is sum of divisors of number 10551354
let num = 10551354;
let sum = 0;
for (let i = 1; i <= num; i++) if (num % i === 0) sum += i;
console.log('Part 2', sum);
