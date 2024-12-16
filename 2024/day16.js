import { BinaryHeap } from '../util/binaryHeap.ts';
import data from './day16_input.js';
// import { s1 as data } from './day16_sample.js';
// import { s2 as data } from './day16_sample.js';
const M = data().split('\n');

const start = { pos: [M.length - 2, 1, 'E'], score: 0 };
const walk = { E: [0, 1], S: [1, 0], W: [0, -1], N: [-1, 0] };
const turn = { E: ['S', 'N'], S: ['W', 'E'], W: ['N', 'S'], N: ['E', 'W'] };

const queue = new BinaryHeap((a, b) => a.score - b.score);
queue.push({ ...start });
let bestScore = Infinity;
const scores = { [start.pos]: 0 };
const from = { [start.pos]: [] };
const ends = [];
while (queue.length) {
    const {
        pos: [r, c, dir],
        score
    } = queue.pop();
    if (M[r]?.[c] === 'E') {
        if (score > bestScore) break;
        ends.push([r, c, dir] + '');
        bestScore = score;
    }
    [
        [...walk[dir], dir, 1],
        ...turn[dir].map((d) => [...walk[d], d, 1001])
    ].forEach(([dr, dc, ndir, ds]) => {
        const [nr, nc] = [r + dr, c + dc];
        if (M[nr]?.[nc] === '#') return;
        const q = { pos: [nr, nc, ndir], score: score + ds };
        const lastScore = scores[[nr, nc, ndir]] ?? Infinity;
        if (q.score > lastScore) return;
        if (q.score < lastScore) {
            queue.push(q);
            scores[q.pos] = q.score;
            from[q.pos] = [];
        }
        from[q.pos].push([r, c, dir] + '');
    });
}
console.log('A', bestScore);

let best = new Set(ends);
while (!best.has(start.pos + '')) {
    best = best.union(new Set([...best].flatMap((n) => from[n])));
}
console.log('B', new Set([...best].map((s) => s.slice(0, -2))).size);
