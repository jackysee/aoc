import data from './day6_input.ts';
// import data from './day6_sample.ts';

let arr: Array<number> = data().trim().split(',').map(Number);
let fishes = [...Array(9)].fill(0);
arr.forEach((n) => (fishes[n] += 1));

const spawn = (fishes: number[]) => {
    return fishes.reduce((_fishes, count, i) => {
        if (i === 0) {
            _fishes[8] += count;
            _fishes[6] += count;
        } else {
            _fishes[i - 1] += count;
        }
        return _fishes;
    }, [...Array(9)].fill(0));
};

const sum = (arr: number[]): number => arr.reduce((a, b) => a + b, 0);

for (let i = 0; i < 256; i++) {
    fishes = spawn(fishes);
    if (i === 79) console.log('Part 1:', sum(fishes));
}
console.log('Part 2:', sum(fishes));
