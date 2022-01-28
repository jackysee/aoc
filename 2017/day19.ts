import data from './day19_input.ts';
let current = '1,0';
// import data from './day19_sample.ts';
// let current = '8,0';

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
let count = 1;
while (true) {
    let next = undefined;
    if (/[\|\-A-Z]/.test(M[current])) {
        next = walk(dir, current);
    }
    if (M[current] === '+') {
        let p = walk(turnLeft(dir)!, current);
        if (/[\|\-A-Z]/.test(M[p])) {
            dir = turnLeft(dir)!;
            next = p;
        } else {
            let p = walk(turnRight(dir)!, current);
            if (/[\|\-A-Z]/.test(M[p])) {
                dir = turnRight(dir)!;
                next = p;
            }
        }
    }
    if (!next || M[next] === undefined) break;
    if (current === next) break;
    current = next;
    if (/[A-Z]/.test(M[current])) result.push(M[current]);
    count++;
}

console.log('Part 1', result.join(''));
console.log('Part 2', count);
