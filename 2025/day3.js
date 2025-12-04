import data from './day3_input.js';
// import data from './day3_sample.js';
const lines = data()
    .split('\n')
    .map((l) => l.split('').map((n) => +n));
function findLargest(nums, len) {
    if (len === 0) return '';
    const end = nums.length - (len - 1);
    const n1 = Math.max(...nums.slice(0, end));
    const idx = nums.indexOf(n1);
    return +[n1, findLargest(nums.slice(idx + 1), len - 1)].join('');
}

console.log(lines.reduce((a, c) => a + findLargest(c, 2), 0));
console.log(lines.reduce((a, c) => a + findLargest(c, 12), 0));
