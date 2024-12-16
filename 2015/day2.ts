import data from './day2_input.ts';
// import data from './day2_sample.ts';

let arr: number[][] = data()
    .split('\n')
    .map((l) => l.split('x').map(Number));

const shortestTwo = (l: number, w: number, h: number) =>
    [l, w, h].sort((a, b) => a - b).slice(0, 2);

console.log(
    'Part 1',
    arr.reduce(
        (a, [l, w, h]) =>
            a +
            2 * (l * w + w * h + h * l) +
            shortestTwo(l, w, h).reduce((a, c) => a * c, 1),
        0
    )
);

console.log(
    'Part 2',
    arr.reduce(
        (a, [l, w, h]) =>
            a + shortestTwo(l, w, h).reduce((a, c) => a + 2 * c, 0) + l * w * h,
        0
    )
);
