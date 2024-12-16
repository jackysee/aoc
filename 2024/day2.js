import data from './day2_input.js';
// import data from './day2_sample.js';
const lines = data()
    .split('\n')
    .map((l) => l.split(' ').map(Number));

const isSafe = (l) => {
    const asc = l[1] > l[0];
    for (let i = 0; i < l.length - 1; i++) {
        const delta = l[i + 1] - l[i];
        if (
            (asc && delta <= 0) ||
            (!asc && delta >= 0) ||
            Math.abs(delta) > 3 ||
            Math.abs(delta) < 1
        ) {
            return false;
        }
    }
    return true;
};

const isSafe2 = (l) => {
    if (isSafe(l)) return true;
    for (let i = 0; i < l.length; i++) {
        if (isSafe(l.toSpliced(i, 1))) {
            return true;
        }
    }
    return false;
};

console.log('A', lines.filter(isSafe).length);
console.log('B', lines.filter(isSafe2).length);
