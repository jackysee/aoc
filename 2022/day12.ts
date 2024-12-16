import data from './day12_input.ts';
// import data from './day12_sample.ts';

const map: Record<string, number> = {};
let start: string | undefined;
let end: string | undefined;
const as: string[] = [];
data()
    .split('\n')
    .forEach((l, r) => {
        l.split('').forEach((n, c) => {
            const key = [r, c].join(',');
            if (n === 'S') {
                map[key] = 'a'.charCodeAt(0);
                start = key;
                as.push(start);
            } else if (n === 'E') {
                map[key] = 'z'.charCodeAt(0);
                end = key;
            } else {
                if (n === 'a') as.push(key);
                map[key] = n.charCodeAt(0);
            }
        });
    });

const bfs = (starts: string[], dest: string, map: Record<string, number>) => {
    const visited = new Set(starts);
    const queue = starts.map((pt) => ({ pt, steps: 0 }));
    while (queue.length) {
        const p = queue.shift()!;
        if (p.pt === dest) return p.steps;
        const [r, c] = p.pt.split(',').map(Number);
        [[r - 1, c] + '', [r + 1, c] + '', [r, c - 1] + '', [r, c + 1] + '']
            .filter((pt) => {
                const h = map[pt];
                if (!h) return false;
                if (visited.has(pt)) return false;
                if (h - map[p.pt] > 1) return false;
                return true;
            })
            .forEach((pt) => {
                visited.add(pt);
                queue.push({ pt, steps: p.steps + 1 });
            });
    }
    return Infinity;
};

console.log(bfs([start!], end!, map));
console.log(bfs(as, end!, map));
