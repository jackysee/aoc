// import data from './day23_input.ts';
import data from './day23_sample.ts';
const M = data()
    .split('\n')
    .map((l) => [...l]);
// console.log(M);

const queue = [[0, 1, 0]];
const seen = new Set<string>();
const dest = [M.length - 1, M[0].length - 2];
while (queue.length) {
    const [r, c, s] = queue.pop()!;
    if (r === dest[0] && c === dest[1]) {
        console.log(s);
        continue;
    }
    let dir = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ];
    const tile = M[r][c];
    if (tile === '>') dir = [[0, 1]];
    if (tile === '<') dir = [[0, -1]];
    if (tile === '^') dir = [[-1, 0]];
    if (tile === 'v') dir = [[1, 0]];
    for (const [dr, dc] of dir) {
        const [nr, nc] = [r + dr, c + dc];
        if (!M[nr]?.[nc]) continue;
        if (M[nr]?.[nc] === '#') continue;
        if (seen.has([nr, nc, s + 1].join(','))) continue;
        seen.add([nr, nc, s + 1].join(','));
        queue.push([nr, nc, s + 1]);
    }
}
console.log('done');
