// import { BinaryHeap } from 'https://deno.land/x/collections@0.12.1/mod.ts';
import { BinaryHeap } from '../util/binaryHeap.ts';
import data from './day17_input.ts';
// import data from './day17_sample.ts';
const M = data()
    .split('\n')
    .map((l) => [...l].map(Number));

type State = {
    r: number;
    c: number;
    d: string;
    step: number;
    heat: number;
};

const key = (s: State) => [s.r, s.c, s.d, s.step].join(',');

const goStraight = (s: State) => {
    let { r, c, d, step } = s;
    if (d === 'E') c++;
    if (d === 'N') r--;
    if (d === 'S') r++;
    if (d === 'W') c--;
    return { r, c, d, step: step + 1 };
};

const turnLeft = (s: State) => {
    const d = { E: 'N', N: 'W', W: 'S', S: 'E' }[s.d]!;
    return goStraight({ ...s, d, step: 0 });
};

const turnRight = (s: State) => {
    const d = { E: 'S', S: 'W', W: 'N', N: 'E' }[s.d]!;
    return goStraight({ ...s, d, step: 0 });
};

const findHeat = (ultra = false) => {
    const queue = new BinaryHeap<State>((a, b) => a.heat - b.heat);
    queue.push({ r: 0, c: 0, d: 'E', step: 0, heat: 0 });
    queue.push({ r: 0, c: 0, d: 'S', step: 0, heat: 0 });
    const seen = new Set<string>();
    while (queue.length) {
        const pos = queue.pop()!;
        if (pos.r === M.length - 1 && pos.c === M[0].length - 1) {
            if (!ultra) return pos.heat;
            if (ultra && pos.step >= 4) return pos.heat;
        }
        if (seen.has(key(pos))) continue;
        seen.add(key(pos));
        for (const p of [goStraight(pos), turnLeft(pos), turnRight(pos)]) {
            if (M[p.r]?.[p.c] === undefined) continue;
            if (ultra) {
                if (p.step > 10) continue;
                if (pos.d !== p.d && pos.step < 4) continue;
            } else {
                if (p.step > 3) continue;
            }
            queue.push({
                ...p,
                heat: pos.heat + M[p.r][p.c]
            });
        }
    }
};

console.log('A', findHeat());
console.log('B', findHeat(true));
