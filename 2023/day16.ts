// deno --allow-read=. --watch day16.ts
// const data = Deno.readTextFileSync('./day16.ex');
const data = Deno.readTextFileSync('./day16.in').trim();
const M = data.split('\n').map((l) => [...l]);

type Light = { r: number; c: number; d: string };

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
    const target = M[r]?.[c];
    const p = target + d;
    if (target === '.' || ['|D', '|U', '-R', '-L'].includes(p))
        return [{ r, c, d }];
    if (['/R', '\\L'].includes(p)) return [{ r, c, d: 'U' }];
    if (['/L', '\\R'].includes(p)) return [{ r, c, d: 'D' }];
    if (['/D', '\\U'].includes(p)) return [{ r, c, d: 'L' }];
    if (['/U', '\\D'].includes(p)) return [{ r, c, d: 'R' }];
    if (['|L', '|R'].includes(p)) return ['U', 'D'].map((d) => ({ r, c, d }));
    if (['-U', '-D'].includes(p)) return ['L', 'R'].map((d) => ({ r, c, d }));
    return [];
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
console.log('B', max);
