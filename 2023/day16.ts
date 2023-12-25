// deno --allow-read --watch day16.ts
// const data = Deno.readTextFileSync('./day16.ex');
import fs from "node:fs";
const data = fs.readFileSync('./day16_input.txt', 'utf-8');
const M = data.split('\n').map((l) => [...l]);

type Dir = 'U' | 'D' | 'L' | 'R';
type Light = { r: number; c: number; d: Dir };

const walk = (p: Light) => {
    let { r, c, d } = p;
    if (d === 'R') c++;
    if (d === 'U') r--;
    if (d === 'L') c--;
    if (d === 'D') r++;
    return { r, c, d };
};
const interact = (l: Light) => {
    const { r, c, d } = l;
    const tile = M[r]?.[c];
    const p = tile + d;
    let dirs: Dir[] = [];
    if (tile === '.' || ['|D', '|U', '-R', '-L'].includes(p)) dirs = [d];
    if (['/R', '\\L'].includes(p)) dirs = ['U'];
    if (['/L', '\\R'].includes(p)) dirs = ['D'];
    if (['/D', '\\U'].includes(p)) dirs = ['L'];
    if (['/U', '\\D'].includes(p)) dirs = ['R'];
    if (['|L', '|R'].includes(p)) dirs = ['U', 'D'];
    if (['-U', '-D'].includes(p)) dirs = ['L', 'R'];
    return dirs.map((d) => ({ r, c, d }));
};

const key = (l: Light) => `${l.r},${l.c},${l.d}`;
const count = (start: Light) => {
    const seen = new Set();
    const queue: Light[] = [...interact(start)];
    seen.add(key(start));
    while (queue.length) {
        const pt = queue.pop()!;
        const next = walk(pt);
        if (M[next.r]?.[next.c] && !seen.has(key(next))) {
            queue.push(...interact(next));
            seen.add(key(next));
        }
    }
    return new Set(
        [...seen].map((n) => (n as string).split(',').slice(0, 2).join(','))
    ).size;
};

console.log('A', count({ r: 0, c: 0, d: 'R' }));

const t = performance.now();
let max = -Infinity;
for (let r = 0; r < M.length; r++) {
    max = Math.max(
        count({ r, c: 0, d: 'R' }),
        count({ r, c: M[0].length - 1, d: 'L' }),
        max
    );
}
for (let c = 0; c < M[0].length; c++) {
    max = Math.max(
        count({ r: 0, c, d: 'D' }),
        count({ r: M.length - 1, c, d: 'U' }),
        max
    );
}
console.log('B', max, `took ${performance.now() - t}ms`);
