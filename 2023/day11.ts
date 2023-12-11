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
    for (let i = 0; i < _stars.length; i++) {
        for (let j = i + 1; j < _stars.length; j++) {
            d +=
                Math.abs(_stars[i][0] - _stars[j][0]) +
                Math.abs(_stars[i][1] - _stars[j][1]);
        }
    }
    return d;
};

console.log('A', ans(2));
console.log('B', ans(1000000));
