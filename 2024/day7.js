import data from './day7_input.js';
// import data from './day7_sample.js';
const list = data()
    .split('\n')
    .map((l) => {
        const arr = l.split(':').map((s) => s.trim());
        return {
            value: Number(arr[0]),
            nums: arr[1].split(' ').map(Number)
        };
    });

const CACHE = {};
function combos(arr, n) {
    const key = arr + '' + n;
    if (CACHE[key]) return CACHE[key];
    if (n === 1) return arr;
    const result = [];
    arr.forEach((a) => {
        result.push(...combos(arr, n - 1).map((arr) => [a, ...arr]));
    });
    CACHE[key] = result;
    return result;
}

const isValid = (ops) => (entry) => {
    const operators = combos(ops, entry.nums.length - 1);
    return operators.some((op) => {
        const value = entry.nums.reduce((a, c, i) => {
            if (i === 0) return a + c;
            if (op[i - 1] === '|') return Number([a, c].join(''));
            if (op[i - 1] === '+') return a + c;
            if (op[i - 1] === '*') return a * c;
        }, 0);
        return value === entry.value;
    });
};

console.time('A');
console.log(
    'A',
    list.filter(isValid(['+', '*'])).reduce((a, c) => a + c.value, 0)
);
console.timeEnd('A');

console.time('B');
console.log(
    'B',
    list.filter(isValid(['+', '*', '|'])).reduce((a, c) => a + c.value, 0)
);
console.timeEnd('B');
