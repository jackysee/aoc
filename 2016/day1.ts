import data from './day1_input.ts';
const arr: string[] = data().split(',');
const TURN_LEFT: Record<string, string> = { N: 'W', E: 'N', S: 'E', W: 'S' };
const TURN_RIGHT: Record<string, string> = { N: 'E', E: 'S', S: 'W', W: 'N' };

const walk = (_x: number, _y: number, face: string, n: number) => {
    let [x, y] = [_x, _y];
    if (face == 'N') y -= n;
    if (face == 'S') y += n;
    if (face == 'E') x += n;
    if (face == 'W') x -= n;
    return [x, y];
};
let [x, y, face] = [0, 0, 'N'];
arr.forEach((s) => {
    let m = s.match(/(L|R)(\d+)/)!;
    if (m[1] === 'L') face = TURN_LEFT[face];
    if (m[1] === 'R') face = TURN_RIGHT[face];
    [x, y] = walk(x, y, face, Number(m[2]));
});

console.log('Part 1', Math.abs(x) + Math.abs(y));
