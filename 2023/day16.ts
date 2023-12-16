// deno --allow-read=. --watch day16.ts
// const data = Deno.readTextFileSync('./day16.ex');
const data = Deno.readTextFileSync('./day16.in');
const M = data.split('\n').map((l) => l.split(''));

type Light = { r: number; c: number; d: string };

const walk = (p: Light) => {
    let { r, c, d } = p;
    if (d === 'R') c++;
    if (d === 'U') r--;
    if (d === 'L') c--;
    if (d === 'D') r++;
    return { r, c, d };
};

const interact = (p: Light) => {
    const { r, c, d } = p;
    const target = M[r]?.[c];
    if (target === '.') return [{ r, c, d }];
    if (target === '/' && d === 'R') return [{ r, c, d: 'U' }];
    if (target === '\\' && d === 'R') return [{ r, c, d: 'D' }];
    if (target === '-' && d === 'R') return [{ r, c, d }];
    if (target === '|' && d === 'R')
        return [
            { r, c, d: 'U' },
            { r, c, d: 'D' }
        ];

    if (target === '/' && d === 'U') return [{ r, c, d: 'R' }];
    if (target === '\\' && d === 'U') return [{ r, c, d: 'L' }];
    if (target === '|' && d === 'U') return [{ r, c, d }];
    if (target === '-' && d === 'U')
        return [
            { r, c, d: 'L' },
            { r, c, d: 'R' }
        ];

    if (target === '/' && d === 'L') return [{ r, c, d: 'D' }];
    if (target === '\\' && d === 'L') return [{ r, c, d: 'U' }];
    if (target === '-' && d === 'L') return [{ r, c, d }];
    if (target === '|' && d === 'L')
        return [
            { r, c, d: 'U' },
            { r, c, d: 'D' }
        ];

    if (target === '/' && d === 'D') return [{ r, c, d: 'L' }];
    if (target === '\\' && d === 'D') return [{ r, c, d: 'R' }];
    if (target === '|' && d === 'D') return [{ r, c, d }];
    if (target === '-' && d === 'D')
        return [
            { r, c, d: 'L' },
            { r, c, d: 'R' }
        ];

    return [];
};

const hash = (l: Light) => `${l.r},${l.c},${l.d}`;
const count = (start: Light) => {
    const seen = new Set();
    const queue: Light[] = [...interact(start)];
    seen.add(hash(start));
    while (queue.length) {
        const pt = queue.pop()!;
        const next = walk(pt);
        if (M[next.r]?.[next.c] && !seen.has(hash(next))) {
            // console.log(pt, next, '=>', M[next.r]?.[next.c], interact(next));
            queue.push(...interact(next));
            seen.add(hash(next));
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
