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

const M: Record<string, string[]> = {};
const R: Record<string, number> = {};
data()
    .split('\n')
    .forEach((line) => {
        const [from, ...to] = line.match(/[A-Z][A-Z]/g)!;
        M[from] = to;
        R[from] = ints(line)[0];
    });

console.log(M, R);
console.log('--------------------');

const open = (state) => {
    if (R[state.v] > 0 && !state.opened.has(state.v)) {
        state.took += 1;
        state.released = (30 - state.took) * R[state.v];
        state.opened.add(state.v);
    }
};
const move = (state, v) => {
    return {
        ...state,
        v,
        took: state.took + 1,
        trail: [...state.trail, v]
    };
};

const dfs = (state) => {
    const seen = new Set();
    const S = [];
    S.push(state);
    while (S.length) {
        console.log(S);
        const s = S.pop();
        if (s.took >= 30) {
            console.log(s);
            continue;
        }
        open(s);
        if (!seen.has(s.v)) {
            seen.add(s.v);
            M[s.v].forEach((v) => {
                S.push(move(state, v));
            });
        }
    }
};

console.log(
    dfs({
        v: 'AA',
        released: 0,
        took: 0,
        trail: ['AA'],
        opened: new Set()
    })
);
