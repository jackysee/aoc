import data from './day4_input.js';
// import data from './day4_sample.js';
const lines = data().split('\n');

const range = (m, n) => Object.keys([...Array(n - m + 1)]).map((_, i) => i + m);

const diagonal = (r, c, dr, dc) => {
    let s = lines[r][c];
    while (true) {
        [r, c] = [r + dr, c + dc];
        const char = lines[r]?.[c];
        if (!char) break;
        s += char;
    }
    return s;
};

const W = lines[0].length;
const H = lines.length;
const list = [
    ...lines,
    ...lines[0].split('').map((_, i) => lines.map((l) => l[i]).join('')),
    ...[
        ...range(0, W - 1).map((c) => [0, c]),
        ...range(1, H - 1).map((r) => [r, W - 1])
    ].map(([r, c]) => diagonal(r, c, 1, -1)),
    ...[
        ...range(0, W - 1).map((c) => [0, c]),
        ...range(1, H - 1).map((r) => [r, 0])
    ].map(([r, c]) => diagonal(r, c, 1, 1))
];

console.log(
    'A',
    list.reduce((a, l) => {
        const c1 = l.match(/XMAS/g)?.length || 0;
        const c2 = l.match(/SAMX/g)?.length || 0;
        return a + c1 + c2;
    }, 0)
);

let x = 0;
range(0, W - 1).forEach((r) => {
    range(0, H - 1).forEach((c) => {
        const center = lines?.[r]?.[c];
        if (center !== 'A') return;
        const side1 =
            (lines[r - 1]?.[c - 1] || '') + (lines[r + 1]?.[c + 1] || '');
        const side2 =
            (lines[r - 1]?.[c + 1] || '') + (lines[r + 1]?.[c - 1] || '');
        if ([side1, side2].every((s) => s.match(/^(MS|SM)$/))) x += 1;
    });
});
console.log('B', x);
