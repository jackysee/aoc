import data from './day6_input.ts';
// import data from './day6_sample.ts';

let fishes: number[] = new Array(9).fill(0);
data().split(',').forEach((n) => (fishes[Number(n)] += 1));

const spawn = (fishes: number[]) => {
    fishes[8] = fishes.shift() || 0;
    fishes[6] += fishes[8];
};

const sum = (a:number,b:number) => a + b;

for (let i = 0; i < 256; i++) {
    spawn(fishes);
    if (i === 79) console.log('Part 1:', fishes.reduce(sum));
}
console.log('Part 2:', fishes.reduce(sum));
