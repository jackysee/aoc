import data from './day11_input.js';
let M = Object.fromEntries(
    data()
        .split(/\s+/)
        .map((n) => [+n, 1])
);

const blink = (M) => {
    const N = {};
    Object.entries(M).forEach(([s, c]) => {
        const arr = [];
        if (+s === 0) arr.push(1);
        else if (s.length % 2 === 0)
            arr.push(+s.slice(0, s.length / 2), +s.slice(s.length / 2));
        else arr.push(+s * 2024);
        arr.forEach((nn) => (N[nn] = (N[nn] ?? 0) + c));
    });
    return N;
};

const count = (M) => Object.values(M).reduce((a, c) => a + c, 0);

for (let i = 0; i < 75; i++) {
    M = blink(M);
    if (i === 24) console.log('A', count(M));
}
console.log('B', count(M));
