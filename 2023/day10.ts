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
const getPipe = ([x, y]: number[]) => {
    let up: string | undefined = M[[x, y - 1] + ''];
    let down: string | undefined = M[[x, y + 1] + ''];
    let left: string | undefined = M[[x - 1, y] + ''];
    let right: string | undefined = M[[x + 1, y] + ''];
    if (up && 'L-J'.includes(up)) up = undefined;
    if (down && 'F-7'.includes(down)) down = undefined;
    if (left && '7|J'.includes(left)) left = undefined;
    if (right && 'F|L'.includes(right)) right = undefined;
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
    if (c === '-')
        return [
            [x - 1, y],
            [x + 1, y]
        ];
    if (c === '|')
        return [
            [x, y - 1],
            [x, y + 1]
        ];
    if (c === 'F')
        return [
            [x + 1, y],
            [x, y + 1]
        ];
    if (c === 'J')
        return [
            [x, y - 1],
            [x - 1, y]
        ];
    if (c === '7')
        return [
            [x - 1, y],
            [x, y + 1]
        ];
    if (c === 'L')
        return [
            [x + 1, y],
            [x, y - 1]
        ];
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
