import data from './day1_input.ts';
const arr: string[] = data().split(',');
const TURN_LEFT: Record<string, string> = { N: 'W', E: 'N', S: 'E', W: 'S' };
const TURN_RIGHT: Record<string, string> = { N: 'E', E: 'S', S: 'W', W: 'N' };
const range = (n: number, delta: number) => {
    let i = n;
    let r = [n];
    while (i != n + delta) {
        i += delta < 0 ? -1 : 1;
        r.push(i);
    }
    return r;
};

const walk = (x: number, y: number, face: string, n: number): number[][] => {
    if (face == 'N') return range(y, -n).map((y) => [x, y]);
    if (face == 'S') return range(y, n).map((y) => [x, y]);
    if (face == 'E') return range(x, n).map((x) => [x, y]);
    if (face == 'W') return range(x, -n).map((x) => [x, y]);
    return [];
};
let [x, y, face] = [0, 0, 'N'];
let visited = new Set();
let hq = -1;
arr.forEach((s) => {
    let m = s.match(/(L|R)(\d+)/)!;
    if (m[1] === 'L') face = TURN_LEFT[face];
    if (m[1] === 'R') face = TURN_RIGHT[face];
    let trail = walk(x, y, face, Number(m[2]))!;
    trail.slice(1).forEach((p) => {
        if (visited.has(p + '') && hq === -1)
            hq = Math.abs(p[0]) + Math.abs(p[1]);
        visited.add(p + '');
    });
    [x, y] = trail.at(-1)!;
});

console.log('Part 1', Math.abs(x) + Math.abs(y));
console.log('Part 2', hq);
