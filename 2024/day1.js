import data from './day1_input.js';
// import data from './day1_sample.js';
const A = [];
const B = [];
data().trim().split('\n')
    .forEach(l => {
        const [a,b] = l.split(/\s+/).map(Number);
        A.push(a);
        B.push(b);
    });
A.sort();
B.sort();
let sum = 0;
for(let i=0; i<=A.length-1; i++) {
    console.log(A[i], B[i])
    sum += Math.abs(A[i] - B[i]);
}
console.log('A:'  + sum)


