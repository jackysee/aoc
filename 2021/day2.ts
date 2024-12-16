import data from './day2_input.ts';
// import data from './day2_sample.ts';

interface Instruction {
    motion: string;
    n: number;
}

let arr: Array<Instruction> = data()
    .trim()
    .split('\n')
    .map((s) => {
        var [motion, val] = s.split(' ');
        const n = parseInt(val, 10);
        return { motion, n };
    });

let x: number = 0;
let y: number = 0;
let z: number = 0;
arr.forEach(({ motion, n }) => {
    if (motion === 'forward') {
        x += n;
        z += y * n;
    }
    if (motion === 'down') {
        y += n;
    }
    if (motion === 'up') {
        y -= n;
    }
});
console.log('Part 1', x * y);
console.log('Part 2', x * z);
