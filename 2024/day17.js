import data from './day17_input.js';
// import data from './day17_sample.js';
const [A, B, C, ...program] = data().match(/\d+/gm).map(Number);
// console.log({ A, B, C, program });

const run = (A, B, C, program) => {
    let ptr = 0;
    const out = [];
    while (program[ptr] !== undefined) {
        const code = program[ptr];
        const operand = program[ptr + 1];
        let combo;
        if ([0, 1, 2, 3].includes(operand)) combo = operand;
        if (operand === 4) combo = A;
        if (operand === 5) combo = B;
        if (operand === 6) combo = C;
        if (code === 0) A = Math.floor(A / 2 ** combo);
        if (code === 1) B = (B ^ operand) >>> 0; //js xor unsigned
        if (code === 2) B = combo % 8;
        if (code === 3 && A !== 0) {
            ptr = operand;
            continue;
        }
        if (code === 4) B = (B ^ C) >>> 0;
        if (code === 5) out.push(combo % 8);
        if (code === 6) B = Math.floor(A / 2 ** combo);
        if (code === 7) C = Math.floor(A / 2 ** combo);
        ptr += 2;
    }
    return out.join(',');
};
console.log('A', run(A, B, C, program));

const Q = [];
Q.push({ result: '', len: 0 });
while (Q.length) {
    const q = Q.shift();
    if (q.len === program.length) {
        console.log('B', parseInt(q.result, 2));
        break;
    }
    const from = parseInt(q.result + '000', 2);
    const to = parseInt(q.result + '111', 2);
    const expect = program.slice((q.len + 1) * -1).join(',');
    for (let a = from; a <= to; a++) {
        if (run(a, B, C, program) === expect) {
            Q.push({ result: a.toString(2), len: q.len + 1 });
        }
    }
}
