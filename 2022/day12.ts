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

const bfs = (
    start: point,
    dest: point,
    map: Record<string, number>,
    min = Infinity
) => {
    const visited = new Set();
    let queue = [{ pt: start, steps: 0, height: map['' + start] }];
    while (queue.length) {
        const p = queue.shift()!;
        if (p.steps > min) continue;
        if ('' + p.pt === '' + dest) {
            min = Math.min(p.steps, min);
            continue;
        }
        const [r, c] = p.pt as number[];
        const _queue = [
            [r - 1, c],
            [r + 1, c],
            [r, c - 1],
            [r, c + 1]
        ]
            .filter((pt) => {
                const h = map['' + pt];
                if (h === undefined) return false;
                if (visited.has('' + pt)) return false;
                if (h - p.height > 1) return false;
                return true;
            })
            .map((pt) => ({
                pt: pt as point,
                steps: p.steps + 1,
                height: map[pt + '']
            }));
        _queue.forEach((p) => visited.add(p.pt + ''));
        queue = [...queue, ..._queue];
    }
    return min;
};

console.log(bfs(start!, end!, map));

let min = Infinity;
as.forEach((a) => {
    min = Math.min(bfs(a, end!, map, min), min);
});
console.log(min);
