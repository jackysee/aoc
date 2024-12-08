import data from './day11_input.ts';
// import data from './day11_sample.ts';
const emptyRow: number[] = [];
const emptyCol: number[] = [];
const stars: number[][] = [];
const lines = data().split('\n');
lines.forEach((l, r) => {
    if (/^\.+$/.test(l)) emptyRow.push(r);
    l.split('').forEach((_n, c) => {
        if (r === 0 && /^\.+$/.test(lines.map((l) => l[c]).join('')))
            emptyCol.push(c);
        if (_n === '#') stars.push([r, c]);
    });
});

const getPos = ([r, c]: number[], factor: number) => [
    r + emptyRow.filter((i) => i < r).length * (factor - 1),
    c + emptyCol.filter((i) => i < c).length * (factor - 1)
];

const ans = (factor: number) => {
    let d = 0;
    const _stars = stars.map((s) => getPos(s, factor));
    _stars.forEach(([r1, c1], i) => {
        _stars.slice(i).forEach(([r2, c2]) => {
            d += Math.abs(r1 - r2) + Math.abs(c1 - c2);
        });
    });
    return d;
};

console.log('A', ans(2));
console.log('B', ans(1000000));
