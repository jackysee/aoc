import data from './day1_input.ts';
// import data from './day1_sample.ts';

const sum = (a = 0, c: number) => a + c;
const arr: number[] = data()
    .split('\n\n')
    .map((s) => s.split('\n').map(Number).reduce(sum))
    .sort((a, b) => b - a);

console.log('A', arr[0]);
console.log('B', arr.slice(0, 3).reduce(sum));
