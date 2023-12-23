import data from './day23_input.ts';
// import data from './day23_sample.ts';
// import { BinaryHeap } from '../util/binaryHeap.ts';
const M = data()
    .split('\n')
    .map((l) => [...l]);

const adjs = (r, c) => {
    const result = [];
    let dir = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ];
    const tile = M[r][c];
    if (tile === '<') dir = [[0, -1]];
    if (tile === '>') dir = [[0, 1]];
    if (tile === '^') dir = [[-1, 0]];
    if (tile === 'v') dir = [[1, 0]];
    for (const [dr, dc] of dir) {
        const [nr, nc] = [r + dr, c + dc];
        const tile = M[nr]?.[nc];
        if ('.<>^v'.includes(tile)) result.push([nr, nc]);
    }
    return result;
};

const dest = [M.length - 1, M[0].length - 2];
let result = 0;
const dfs = (current: number[], path: number[][], seen: Set<string>) => {
    if (current[0] === dest[0] && current[1] === dest[1]) {
        result = Math.max(result, path.length);
    }
    const [r, c] = current;
    for (const n of adjs(r, c)) {
        const key = `${r},${c}`;
        if (!seen.has(key)) {
            path.push(n);
            seen.add(key);
            dfs(n, path, seen);
            seen.delete(key);
            path.pop();
        }
    }
};

dfs([0, 1], [], new Set());
console.log('done', result);
