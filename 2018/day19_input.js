module.exports = () =>
    `
#ip 3
addi 3 16 3
seti 1 3 4
seti 1 8 5
mulr 4 5 1
eqrr 1 2 1
addr 1 3 3
addi 3 1 3
addr 4 0 0
addi 5 1 5
gtrr 5 2 1
addr 3 1 3
seti 2 6 3
addi 4 1 4
gtrr 4 2 1
addr 1 3 3
seti 1 1 3
mulr 3 3 3
addi 2 2 2
mulr 2 2 2
mulr 3 2 2
muli 2 11 2
addi 1 5 1
mulr 1 3 1
addi 1 8 1
addr 2 1 2
addr 3 0 3
seti 0 5 3
setr 3 9 1
mulr 1 3 1
addr 3 1 1
mulr 3 1 1
muli 1 14 1
mulr 1 3 1
addr 2 1 2
seti 0 9 0
seti 0 9 3

`.trim();
