// import data from './day16_input.ts';
import data from './day16_sample.ts';

const ints = (s: string) => (s.match(/-?\d+/g) || []).map(Number);
const sum = (a: number, c: number) => a + c;
const asc = (a: number, b: number) => a - b;
const desc = (a: number, b: number) => b - a;
// prettier-ignore
const range = (a: number, b: number) => [...Array(b - a - 1)].map((_, i) => a + i);
// prettier-ignore
const DIRS = [[0,1],[0,-1],[1,0],[-1,0]];

type Valve = { rate: number; to: string[] };
const M: Record<string, Valve> = {};
data()
    .split('\n')
    .forEach((line) => {
        const [from, ...to] = line.match(/[A-Z][A-Z]/g)!;
        M[from] = { to, rate: ints(line)[0] };
    });

console.log(M);
console.log('--------------------');

type ValveState = { opened: boolean; openedAt: number };
const nearestValves = (
    M: Record<string, Valve>,
    opened: Record<string, ValveState>,
    start: string
) => {
    const queue = [{ valve: start, time: 0, path: [start] }];
    const seen = new Set();
    const result = [];
    while (queue.length) {
        const q = queue.shift()!;
        if (!opened[q.valve] && M[q.valve].rate > 0) {
            result.push(q);
            continue;
        }
        M[q.valve].to.forEach((valve) => {
            if (seen.has(valve)) return;
            queue.push({
                valve,
                time: q.time + 1,
                path: [...q.path, valve]
            });
            seen.add(valve);
        });
    }
    return result;
};
console.log(nearestValves(M, new Set(), 'AA'));
// console.log(nearestValves(M, new Set(['BB', 'CC', 'DD', 'EE']), 'AA'));
