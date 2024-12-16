import data from './day16_input.js';

let [sampleStr, program] = data().split('\n\n\n');
let samples = sampleStr.split('\n\n').map((s) => {
    let lines = s.split('\n');
    let before = JSON.parse(lines[0].replace(/Before: /, ''));
    let after = JSON.parse(lines[2].replace(/After: /, ''));
    let [op, a, b, c] = lines[1].split(' ').map(Number);
    return { before, after, op, a, b, c };
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

let likeThreeOrMore = 0;
let M = {};
samples.forEach((s) => {
    let possibleOps = [];
    Object.entries(ops).forEach(([name, f]) => {
        if (s.after.join(',') === f(s.before, s.a, s.b, s.c).join(',')) {
            possibleOps.push(name);
        }
    });
    if (possibleOps.length >= 3) likeThreeOrMore++;
    M[s.op] = M[s.op] || new Set();
    possibleOps.forEach((op) => M[s.op].add(op));
});
console.log('Part 1', likeThreeOrMore);

let opCode = {};
while (Object.keys(opCode).length <= 15) {
    let opStrArr = Object.values(opCode);
    Object.entries(M).forEach(([op, set]) => {
        if (opCode[op] !== undefined) return;
        if (set.size === 1) {
            opCode[op] = [...set][0];
        } else {
            opStrArr.forEach((s) => set.delete(s));
        }
    });
}

let r = [0, 0, 0, 0];
program.split('\n').map((s) => {
    let [op, a, b, c] = s.split(' ').map(Number);
    r = ops[opCode[op]](r, a, b, c);
});

console.log('Part 2', r[0]);
