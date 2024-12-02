import data from './day1_input.js';
// import data from './day1_sample.js';
const A = [];
const B = [];
data()
    .trim()
    .split('\n')
    .forEach((l) => {
        const [a, b] = l.split(/\s+/).map(Number);
        A.push(a);
        B.push(b);
    });

A.sort();
B.sort();
let sum = 0;
let score = 0;
A.forEach((a, i) => {
    sum += Math.abs(a - B[i]);
    const times = B.filter((b) => b === a).length;
    score += a * times;
});

console.log('A:' + sum);
console.log('B:' + score);
