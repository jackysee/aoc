import data from './day11_input.ts';
// import data from './day11_sample.ts';
const emptyRow: number[] = [];
const emptyCol: number[] = [];
const stars: number[][] = [];
const lines = data().split('\n');
lines.forEach((l, r) => {
    if (/^\.+$/.test(l)) emptyRow.push(r);
    l.split('').forEach((_n, c) => {
        if (r === 0)
            if (/^\.+$/.test(lines.map((l) => l[c]).join(''))) emptyCol.push(c);
        if (_n === '#') stars.push([r, c]);
    });
});

const getPos = ([r, c]: number[], factor: number) => {
    return [
        r + emptyRow.filter((i) => i < r).length * (factor - 1),
        c + emptyCol.filter((i) => i < c).length * (factor - 1)
    ];
};

const ans = (factor: number) => {
    let d = 0;
    for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            const [r1, c1] = getPos(stars[i], factor);
            const [r2, c2] = getPos(stars[j], factor);
            d += Math.abs(r2 - r1) + Math.abs(c2 - c1);
        }
    }
    return d;
};

console.log('A', ans(2));
console.log('B', ans(1000000));
