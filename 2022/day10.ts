import data from './day10_input.ts';
// import data from './day10_sample.ts';

let sum = 0;
const pixel: string[] = [];
const update = (x: number, cycle: number) => {
    if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
        sum += x * cycle;
    }
    let p = ' ';
    if ([x - 1, x, x + 1].includes((cycle - 1) % 40)) p = '█';
    pixel.push(p);
    if (cycle % 40 === 0) pixel.push('\n');
};

let x = 1;
let cycle = 0;
data()
    .split('\n')
    .forEach((l) => {
        const [cmd, n] = l.split(' ');
        cycle++;
        update(x, cycle);
        if (cmd === 'addx') {
            cycle++;
            update(x, cycle);
            x += +n;
        }
    });

console.log(sum);
console.log(pixel.join(''));
