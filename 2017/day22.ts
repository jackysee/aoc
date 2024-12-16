import data from './day22_input.ts';
// import data from './day22_sample.ts';

const M: Record<string, string> = {};
let mx = -Infinity;
let my = -Infinity;
data()
    .split('\n')
    .map((l, y) =>
        l.split('').forEach((c, x) => {
            if (c === '#') M[[x, y] + ''] = '#';
            if (x > mx) mx = x;
            if (y > my) my = y;
        })
    );

const turnLeft = (d: string) => ({ U: 'L', L: 'D', D: 'R', R: 'U' }[d] ?? d);
const turnRight = (d: string) => ({ U: 'R', L: 'U', D: 'L', R: 'D' }[d] ?? d);
const move = (pos: string, d: string) => {
    let [x, y] = pos.split(',').map(Number);
    if (d === 'U') y -= 1;
    if (d === 'D') y += 1;
    if (d === 'L') x -= 1;
    if (d === 'R') x += 1;
    return [x, y] + '';
};

const burst = (
    pos: string,
    face: string,
    M: Record<string, string>
): [string, string, boolean] => {
    let [x, y] = pos.split(',').map(Number);
    face = M[pos] === '#' ? turnRight(face) : turnLeft(face);
    if (M[pos] === '#') delete M[pos];
    else {
        M[pos] = '#';
    }
    return [face, move(pos, face), M[pos] === '#'];
};

let p = [mx / 2, my / 2] + '';
let face = 'U';
let count = 0;
let infect = false;
let _M = { ...M };
for (let i = 0; i < 10000; i++) {
    [face, p, infect] = burst(p, face, _M);
    if (infect) count++;
}
console.log('Part 1', count);

const burst2 = (
    pos: string,
    face: string,
    M: Record<string, string>
): [string, string, boolean] => {
    let [x, y] = pos.split(',').map(Number);
    if (!M[pos]) face = turnLeft(face);
    if (M[pos] === '#') face = turnRight(face);
    if (M[pos] === 'F') face = turnRight(turnRight(face));

    if (!M[pos]) M[pos] = 'W';
    else if (M[pos] === 'W') M[pos] = '#';
    else if (M[pos] === '#') M[pos] = 'F';
    else if (M[pos] === 'F') delete M[pos];
    return [face, move(pos, face), M[pos] === '#'];
};

p = [mx / 2, my / 2] + '';
face = 'U';
count = 0;
infect = false;
_M = { ...M };
let t = Date.now();
for (let i = 0; i < 10000000; i++) {
    [face, p, infect] = burst2(p, face, _M);
    if (infect) count++;
}
console.log('Part 2', count, Date.now() - t);
