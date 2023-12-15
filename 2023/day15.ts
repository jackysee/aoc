import data from './day15_input.ts';
// import data from './day15_sample.ts';

const steps = data().split(',');
const hash = (s: string) =>
    [...s].reduce((val, c) => ((val + c.charCodeAt(0)) * 17) % 256, 0);

console.log(
    'A',
    steps.reduce((a, c) => a + hash(c), 0)
);

const box: string[][] = [...Array(256)].map(() => []);
const F: Record<string, number> = {};
steps.forEach((s) => {
    const [label, focalLen] = s.split(/=|-/);
    const n = hash(label);
    const arr = box[n];
    if (s.includes('=')) {
        F[label] = +focalLen;
        if (!arr.includes(label)) arr.push(label);
    } else {
        box[n] = arr.filter((l) => l !== label);
    }
});

let B = 0;
box.forEach((b, bi) => {
    b.forEach((l, li) => {
        B += (bi + 1) * (li + 1) * F[l];
    });
});
console.log('B', B);
