// let data = require('./day16_sample.js');
let data = require('./day16_input.js');

let [sampleStr, program] = data().split('\n\n\n')
let samples = sampleStr.split('\n\n').map(s => {
    let lines = s.split('\n');
    let before = JSON.parse(lines[0].replace(/Before: /, ''));
    let after = JSON.parse(lines[2].replace(/After: /, ''));
    let [op, a, b, c] = lines[1].split(' ').map(Number);
    return { before, after, op, a, b, c }
});
console.log(samples, program);

function addr(_registers, a, b, c) {
    let registers = [..._registers];
    registers[c] = registers[a] + registers[b];
    return registers;
}

function addi(_registers, a, b, c) {
    let registers = [..._registers];
    registers[c] = registers[a] + b;
    return registers;
}

function mulr(_registers, a, b, c) {
    let registers = [..._registers];
    registers[c] = registers[a] * registers[b];
    return registers;
}

function muli(_registers, a, b, c) {
    let registers = [..._registers];
    registers[c] = registers[a] * b;
    return registers;
}

function banr(_registers, a, b, c) {
    let registers = [..._registers];
    registers[c] = registers[a] & registers[b];
    return registers;
}

function bani(_registers, a, b, c) {
    let registers = [..._registers];
    registers[c] = registers[a] & b;
    return registers;
}

function borr(_registers, a, b, c) {
    let registers = [..._registers];
    registers[c] = registers[a] | registers[b];
    return registers;
}

function bori(_registers, a, b, c) {
    let registers = [..._registers];
    registers[c] = registers[a] | b;
    return registers;
}

function setr(_registers, a, b, c) {
    let registers = [..._registers];
    registers[c] = registers[a];
    return registers;
}

function seti(_registers, a, b, c) {
    let registers = [..._registers];
    registers[c] = a;
    return registers;
}

function gtir(_registers, a, b, c) {
    let registers = [..._registers];
    registers[c] = a > registers[b]? 1 : 0;
    return registers;
}

function gtri(_registers, a, b, c) {
    let registers = [..._registers];
    registers[c] = registers[a] > b? 1 : 0;
    return registers;
}

function gtrr(_registers, a, b, c) {
    let registers = [..._registers];
    registers[c] = registers[a] > registers[b]? 1 : 0;
    return registers;
}

function eqir(_registers, a, b, c) {
    let registers = [..._registers];
    registers[c] = a == registers[b]? 1 : 0;
    return registers;
}

function eqri(_registers, a, b, c) {
    let registers = [..._registers];
    registers[c] = registers[a] == b? 1 : 0;
    return registers;
}

function eqrr(_registers, a, b, c) {
    let registers = [..._registers];
    registers[c] = registers[a] == registers[b]? 1 : 0;
    return registers;
}
let ops = { addr, addi, mulr, muli, banr, bani, borr, bori, setr, seti, gtir, gtri, gtrr, eqir, eqri, eqrr };

let likeThreeOrMore = 0;
samples.forEach(s => {
    let possibleOps = [];
    Object.entries(ops).forEach(([name, f]) => {
        if(s.after.join(',') === f(s.before, s.a, s.b, s.c).join(',')) {
            possibleOps.push(name);
        }
    });
    if(possibleOps.length >= 3) likeThreeOrMore++;
});
console.log(likeThreeOrMore);
