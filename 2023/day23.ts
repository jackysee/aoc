import data from './day23_input.ts';
// import data from './day23_sample.ts';
const M = data()
    .split('\n')
    .map((l) => [...l]);

const neighbors = (r: number, c: number, climb = false) => {
    const result = [];
    let dir = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ];
    const tile = M[r][c];
    if (!climb) {
        if (tile === '<') dir = [[0, -1]];
        if (tile === '>') dir = [[0, 1]];
        if (tile === '^') dir = [[-1, 0]];
        if (tile === 'v') dir = [[1, 0]];
    }
    for (const [dr, dc] of dir) {
        const [nr, nc] = [r + dr, c + dc];
        const tile = M[nr]?.[nc];
        if ('.<>^v'.includes(tile)) result.push([nr, nc]);
    }
    return result;
};

const dest = [M.length - 1, M[0].length - 2];
const toKey = (r: number, c: number) => [r, c].join(',');
const dfs = (
    current: number[],
    seen: Set<string>,
    dist: number,
    adjs: (r: number, c: number) => number[][]
) => {
    if (current[0] === dest[0] && current[1] === dest[1]) {
        max = Math.max(max, dist);
    }
    const [r, c] = current;
    for (const [nr, nc, d = 1] of adjs(r, c)) {
        const key = toKey(r, c);
        if (!seen.has(key)) {
            seen.add(key);
            dfs([nr, nc], seen, dist + d, adjs);
            seen.delete(key);
        }
    }
};

let max = 0;
dfs([0, 1], new Set(), 0, neighbors);
console.log('A', max);

const V = new Set<string>();
M.forEach((l, r) => {
    l.forEach((t, c) => {
        if (t !== '#' && neighbors(r, c, true).length > 2) {
            V.add(`${r},${c}`);
        }
    });
});
V.add('0,1');
V.add(dest.join(','));

const P: Record<string, number[][]> = {};
for (const s of V) {
    const [r, c] = s.split(',').map(Number);
    let queue = [[r, c]];
    const seen = new Set();
    seen.add([r, c] + '');
    let dist = 0;
    const key = toKey(r, c);
    while (queue.length) {
        const _q: number[][] = [];
        dist += 1;
        for (const v of queue) {
            for (const a of neighbors(v[0], v[1], true)) {
                const ak = a + '';
                if (!seen.has(ak)) {
                    seen.add(ak);
                    if (V.has(ak)) {
                        P[key] = P[key] || [];
                        P[key].push([...a, dist]);
                    } else {
                        _q.push(a);
                    }
                }
            }
        }
        queue = _q;
    }
}

max = 0;
const adj2 = (r: number, c: number) => P[toKey(r, c)] || [];
console.time('B');
dfs([0, 1], new Set(), 0, adj2);
console.log('B', max);
console.timeEnd('B');
