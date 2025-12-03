import data from './day2_input.js';
// import data from './day2_sample.js';
const isInvalid = (i) => {
    const s = i + '';
    const len = s.length;
    if (len % 2 === 1) return false;
    return s.substring(0, len / 2) === s.substring(len / 2);
};
const isInvalid2 = (i) => {
    const s = i + '';
    let j = 1;
    while (true) {
        if (j === Math.floor(s.length / 2) + 1) break;
        if (new RegExp(`^(${s.substring(0, j)})+$`).test(s)) {
            return true;
        }
        j++;
    }
    return false;
};
const arr = [];
const arr2 = [];
data()
    .split(',')
    .map((s) => s.split('-').map((s) => +s))
    .forEach(([from, to]) => {
        for (let i = from; i <= to; i++) {
            if (isInvalid(i)) arr.push(i);
            if (isInvalid2(i)) arr2.push(i);
        }
    });
// console.log(arr);
// const M = data().split('\n').map(l => [...l]);
console.log(arr.reduce((a, c) => a + c, 0));
console.log(arr2.reduce((a, c) => a + c, 0));
