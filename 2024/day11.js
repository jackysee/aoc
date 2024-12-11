import data from './day11_input.js';
const M = Object.fromEntries(
    data()
        .split(/\s+/)
        .map((n) => [+n, 1])
);

const blink = (s) => {
    if (+s === 0) return [1];
    if (s.length % 2 === 0) {
        const len = s.length;
        return [+s.slice(0, len / 2), +s.slice(len / 2)];
    }
    return [+s * 2024];
};

const count = (M) => Object.values(M).reduce((a, c) => a + c, 0);

for (let i = 0; i < 75; i++) {
    Object.entries(M)
        .filter(([_, c]) => c > 0)
        .forEach(([n, c]) => {
            M[n] = M[n] - c;
            blink(n).forEach((nn) => (M[nn] = (M[nn] ?? 0) + c));
        });
    if (i === 24) console.log('A', count(M));
}
console.log('B', count(M));
