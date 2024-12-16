import data from './day10_input.ts';
// import { sample1 as data } from './day10_sample.ts'; //B:10
// import { sample2 as data } from './day10_sample.ts'; //B:8
const M: Record<string, string> = {};
let S: number[] = [0, 0];
data()
    .split('\n')
    .forEach((l, y) => {
        l.split('').forEach((c, x) => {
            M[[x, y] + ''] = c;
            if (c === 'S') S = [x, y];
        });
    });
/*
.....
.F-7.
.|.|.
.L-J.
.....
*/

type Dir = 'up' | 'down' | 'left' | 'right';
const DIR: Record<Dir, number[]> = {
    up: [0, -1],
    down: [0, 1],
    left: [-1, 0],
    right: [1, 0]
};
const walkable: Record<Dir, string> = {
    up: 'F|7',
    down: 'L|J',
    left: 'F-L',
    right: 'J-7'
};
const getPipe = ([x, y]: number[]) => {
    const [up, down, left, right] = Object.keys(DIR).map((dir) => {
        const [dx, dy] = DIR[dir as Dir];
        const n = M[[x + dx, y + dy] + ''];
        return walkable[dir as Dir].includes(n);
    });
    if (up && down) return '|';
    if (left && right) return '-';
    if (left && down) return '7';
    if (right && down) return 'F';
    if (up && right) return 'L';
    if (up && left) return 'J';
};
const S_pipe = getPipe(S)!;

const getPaths = ([x, y]: number[]) => {
    let c = M[[x, y] + ''];
    if (c === 'S') c = S_pipe;
    const [up, down, left, right] = Object.values(DIR).map(([dx, dy]) => [
        x + dx,
        y + dy
    ]);
    if (c === '-') return [left, right];
    if (c === '|') return [up, down];
    if (c === 'F') return [right, down];
    if (c === 'J') return [up, left];
    if (c === '7') return [left, down];
    if (c === 'L') return [up, right];
    return [];
};

const eq = (a: number[], b: number[]) => a.every((n, i) => b[i] === n);

let last = S;
let c = getPaths(S)![0]!;
let count = 1;
const P: number[][] = [S];
while (!eq(c, S)) {
    P.push(c);
    const paths = getPaths(c)!.filter((p) => !eq(p, last));
    last = [...c];
    c = [...paths[0]];
    count++;
}
console.log('A', count / 2);

const getNeighbor = (pos: number[]) => {
    const [x, y] = pos;
    const result: number[][] = [];
    [-1, 0, 1].forEach((dx) => {
        [-1, 0, 1].forEach((dy) => {
            if (dx === 0 && dy === 0) return;
            if (M[[x + dx, y + dy] + ''] !== undefined)
                result.push([x + dx, y + dy]);
        });
    });
    return result;
};

const bounds = new Set(P.map((p) => p + ''));
/*
.┌----┐┌┐┌┐┌┐┌-┐....
.|┌--┐||||||||┌┘....
.||.┌┘||||||||└┐....
┌┘└┐└┐└┘└┘||└┘.└-┐..
└--┘.└┐...└┘S┐┌-┐└┐.
....┌-┘..┌┐┌┘|└┐└┐└┐
....└┐.┌┐||└┐|.└┐└┐|
.....|┌┘└┘|┌┘|┌┐|.└┘
....┌┘└-┐.||.||||...
....└---┘.└┘.└┘└┘...
 */
const isWithinBound = (p: number[]) => {
    const [x, y] = p;
    if (bounds.has(p + '')) return true;
    let crossing = '';
    let line = 0;
    for (let i = 0; i <= x; i++) {
        if (bounds.has([i, y] + '')) {
            const c = M[[i, y] + ''];
            if (c === '|') {
                line += 1;
                continue;
            }
            if (!crossing) {
                if ('FL'.includes(c)) {
                    crossing = c;
                    line += 1;
                    continue;
                }
            }
            if (crossing) {
                if (/FJ|L7/.test(crossing + c)) {
                    crossing = '';
                }
                if (/F7|LJ/.test(crossing + c)) {
                    crossing = '';
                    line += 1;
                }
            }
        }
    }
    return line % 2 === 1;
};

const visited = new Set();
visited.add(S + '');
const queue = [S];
let area = 1;
while (queue.length) {
    const pos = queue.shift()!;
    const points = getNeighbor(pos);
    points.forEach((p) => {
        if (visited.has(p + '')) return;
        if (bounds.has(p + '') || isWithinBound(p)) {
            queue.push(p);
            area++;
        }
        visited.add(p + '');
    });
}
console.log('B', area - bounds.size);
