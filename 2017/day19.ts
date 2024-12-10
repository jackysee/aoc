import data from './day19_input.ts';
let pos = '1,0';
// import data from './day19_sample.ts';
// let pos = '8,0';

let M: Record<string, string> = {};
data()
    .split('\n')
    .forEach((l, y) => {
        l.split('').forEach((c, x) => {
            if (c !== ' ') M[[x, y] + ''] = c;
        });
    });

const walk = (dir: string, pos: string) => {
    let [x, y] = pos.split(',').map(Number);
    if (dir === 'S') return [x, y + 1] + '';
    if (dir === 'W') return [x - 1, y] + '';
    if (dir === 'N') return [x, y - 1] + '';
    if (dir === 'E') return [x + 1, y] + '';
    return [x, y] + '';
};
const turnLeft = (dir: string) => ({ N: 'W', E: 'N', S: 'E', W: 'S' }[dir]);
const turnRight = (dir: string) => ({ N: 'E', E: 'S', S: 'W', W: 'N' }[dir]);

let dir = 'S';
let result: string[] = [];
while (true) {
    result.push(M[pos]);
    let next = undefined;
    if (/[\|\-A-Z]/.test(M[pos])) {
        next = walk(dir, pos);
    }
    if (M[pos] === '+') {
        let [d, p] = [turnLeft(dir)!, turnRight(dir)!]
            .map((d) => [d, walk(d, pos)])
            .find(([d, p]) => /[\|\-A-Z]/.test(M[p]))!;
        dir = d;
        next = p;
    }
    if (!next || !M[next]) break;
    pos = next;
}

console.log('Part 1', result.filter((c) => /[A-Z]/.test(c)).join(''));
console.log('Part 2', result.length);
