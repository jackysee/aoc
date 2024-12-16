import data from './day3_input.ts';

let dirs: string[] = data().split('');

const visit = (M: { [key: string]: number }, santa: number[], d: string) => {
    let [x, y] = santa;
    if (d === '>') x += 1;
    if (d === '<') x -= 1;
    if (d === '^') y -= 1;
    if (d === 'v') y += 1;
    M[[x, y] + ''] = (M[[x, y] + ''] || 0) + 1;
    return [x, y];
};

let M: { [key: string]: number } = {};
M['0,0'] = 1;
let santa = [0, 0];
dirs.forEach((d) => (santa = visit(M, santa, d)));
console.log('Part 1', Object.keys(M).length);

M = {};
M['0,0'] = 2;
let santas = [
    [0, 0],
    [0, 0]
];
dirs.forEach((d, i) => (santas[i % 2] = visit(M, santas[i % 2], d)));
console.log('Part 2', Object.keys(M).length);
