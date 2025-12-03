import data from './day1_input.js';
// import data from './day1_sample.js';
const lines = data().split('\n');

let num = 50;
let count = 0;
let count2 = 0;
lines.forEach((d) => {
    let delta = +d.substring(1);
    let newNum = num;
    count2 += Math.floor(Math.abs(delta) / 100);
    delta = delta % 100;
    newNum = num + (d.startsWith('L') ? -1 : 1) * delta;
    if (num > 0 && (newNum < 0 || newNum > 100)) count2++;
    newNum = newNum % 100;
    if (newNum < 0) newNum += 100;
    if (newNum === 0) count++;
    num = newNum;
});

console.log(count);
console.log(count + count2);
