import data from './day7_input.ts';
//import data from './day7_sample.ts';
const arr: Array<number> = data().split(',').map(Number);
const min = arr.reduce((a, n) => (n < a ? n : a), Infinity);
const max = arr.reduce((a, n) => (n > a ? n : a), -Infinity);

const findFuel = (cost: (a: number) => number = (a) => a) => {
    let fuel = Infinity;
    for (let x = min; x <= max; x++) {
        const f = arr.reduce((a, _x) => a + cost(Math.abs(x - _x)), 0);
        if (f < fuel) fuel = f;
    }
    return fuel;
};
console.log('Part 1:', findFuel());

const stepSum = (s: number) => ((1 + s) * s) / 2;
console.log('Part 2:', findFuel(stepSum));
