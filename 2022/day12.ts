import data from './day12_input.ts';
// import data from './day12_sample.ts';

type point = [number, number];
const map: Record<string, number> = {};
let start: point | undefined = undefined;
let end: point | undefined = undefined;
const as: point[] = [];
data()
    .split('\n')
    .forEach((l, r) => {
        l.split('').forEach((n, c) => {
            if (n === 'S') {
                map[[r, c] + ''] = 'a'.charCodeAt(0);
                start = [r, c];
                as.push(start);
            } else if (n === 'E') {
                map[[r, c] + ''] = 'z'.charCodeAt(0);
                end = [r, c];
            } else {
                if (n === 'a') as.push([r, c]);
                map[[r, c] + ''] = n.charCodeAt(0);
            }
        });
    });

const bfs = (starts: point[], dest: point, map: Record<string, number>) => {
    const visited = new Set(starts.map((pt) => '' + pt));
    const queue = starts.map((pt) => ({ pt, steps: 0 }));
    while (queue.length) {
        const p = queue.shift()!;
        if ('' + p.pt === '' + dest) {
            return p.steps;
        }
        const [r, c] = p.pt as number[];
        [
            [r - 1, c],
            [r + 1, c],
            [r, c - 1],
            [r, c + 1]
        ]
            .filter((pt) => {
                const h = map['' + pt];
                if (h === undefined) return false;
                if (visited.has('' + pt)) return false;
                if (h - map[p.pt + ''] > 1) return false;
                return true;
            })
            .forEach((pt) => {
                const q = { pt: pt as point, steps: p.steps + 1 };
                visited.add('' + pt);
                queue.push(q);
            });
    }
    return Infinity;
};

console.log(bfs([start!], end!, map));
console.log(bfs(as, end!, map));
