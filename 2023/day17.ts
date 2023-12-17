import { BinaryHeap } from 'https://deno.land/x/collections@0.12.1/mod.ts';
// import data from './day17_input.ts';
import data from './day17_sample.ts';
const M = data()
    .split('\n')
    .map((l) => [...l].map(Number));

type State = {
    r: number;
    c: number;
    d: string;
    st: number;
    heat: number;
};

const key = (s: State) => [s.r, s.c, s.d, s.st].join(',');

const goStraight = (s: State) => {
    let { r, c, d, st } = s;
    if (d === 'E') c++;
    if (d === 'N') r--;
    if (d === 'S') r++;
    if (d === 'W') c--;
    return { r, c, d, st: st + 1 };
};

const turnLeft = (s: State) => {
    let { r, c, d } = s;
    if (d === 'E') {
        r--;
        d = 'N';
    } else if (d === 'N') {
        c--;
        d = 'W';
    } else if (d === 'W') {
        r++;
        d = 'S';
    } else if (d === 'S') {
        c++;
        d = 'E';
    }
    return { r, c, d, st: 1 };
};

const turnRight = (s: State) => {
    let { r, c, d } = s;
    if (d === 'E') {
        r++;
        d = 'S';
    } else if (d === 'S') {
        c--;
        d = 'W';
    } else if (d === 'W') {
        r--;
        d = 'N';
    } else if (d === 'N') {
        c++;
        d = 'E';
    }
    return { r, c, d, st: 1 };
};

const findHeat = (ultra = false) => {
    const queue: BinaryHeap<State> = new BinaryHeap<State>(
        (a, b) => a.heat - b.heat
    );
    queue.push({ r: 0, c: 0, d: 'E', st: 0, heat: 0 });
    queue.push({ r: 0, c: 0, d: 'S', st: 0, heat: 0 });
    const seen = new Set<string>();
    // const seen:Record<string,number>  = {}
    while (queue.length) {
        const pos = queue.pop()!;
        if (pos.r === M.length - 1 && pos.c === M[0].length - 1) {
            if (!ultra) return pos.heat;
            if (ultra && pos.st >= 4) return pos.heat;
        }
        if (seen.has(key(pos))) continue;
        seen.add(key(pos));
        for (const p of [goStraight(pos), turnLeft(pos), turnRight(pos)]) {
            if (M[p.r]?.[p.c] === undefined) continue;
            if (ultra) {
                if (p.st > 10) continue;
                if (pos.d !== p.d && p.st < 4 && pos.r !== 0 && pos.c !== 0)
                    continue;
            } else {
                if (p.st > 3) continue;
            }
            queue.push({
                ...p,
                heat: pos.heat + M[p.r][p.c]
            });
        }
    }
};
// console.log('A', findHeat());
console.log('B', findHeat(true));
