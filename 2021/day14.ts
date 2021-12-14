import data from './day14_input.ts';
// import data from './day14_sample.ts';

interface Stats {
    [key: string]: number;
}
let [tmpl, _ins] = data().split('\n\n');
let instructions: string[][] = _ins.split('\n').map((s) => s.split(' -> '));
let D: Stats = {};
tmpl.split('').forEach((c, i) => {
    if (i !== tmpl.length - 1) {
        D[c + tmpl[i + 1]] = (D[c + tmpl[i + 1]] || 0) + 1;
    }
});

function insert(_D: Stats, instructions: string[][]) {
    let D = { ..._D };
    instructions.forEach(([s, c]) => {
        let [a, b] = s.split('');
        if (_D[a + b]) {
            let n = _D[a + b];
            D[a + b] -= n;
            D[a + c] = (D[a + c] || 0) + n;
            D[c + b] = (D[c + b] || 0) + n;
        }
    });
    return D;
}

function count(D: Stats, tmpl: string) {
    let stats: Stats = {};
    stats[tmpl[0]] = 1;
    stats[tmpl.at(-1)!] = 1;
    for (const key in D) {
        key.split('').forEach((c) => (stats[c] = (stats[c] || 0) + D[key]));
    }
    let r = Object.entries(stats).sort((a, b) => a[1] - b[1]);
    return (r.at(-1)![1] - r[0][1]) / 2;
}

for (let i = 0; i < 10; i++) {
    D = insert(D, instructions);
}
console.log('Part 1', count(D, tmpl));

for (let i = 0; i < 30; i++) {
    D = insert(D, instructions);
}
console.log('Part 2', count(D, tmpl));
