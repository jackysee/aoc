import data from './day23_input.ts';
// import data from './day23_sample.ts';
// import data from './day23_sample2.ts';

const ints = (l: string) => l.split(',').map(Number);
const M: Set<string> = new Set();
data()
    .split('\n')
    .forEach((l, y) => {
        l.split('').forEach((c, x) => {
            if (c === '#') M.add(`${x},${y}`);
        });
    });

const getAdjs = (key: string, M: Set<string>) => {
    const [x, y] = ints(key);
    return {
        NE: M.has(`${x + 1},${y - 1}`),
        N: M.has(`${x},${y - 1}`),
        NW: M.has(`${x - 1},${y - 1}`),
        E: M.has(`${x + 1},${y}`),
        W: M.has(`${x - 1},${y}`),
        SE: M.has(`${x + 1},${y + 1}`),
        S: M.has(`${x},${y + 1}`),
        SW: M.has(`${x - 1},${y + 1}`)
    } as Record<string, boolean>;
};

const getBound = (M: Set<string>) => {
    const arr = [...M].map(ints);
    let x1 = Infinity;
    let x2 = -Infinity;
    let y1 = Infinity;
    let y2 = -Infinity;
    arr.forEach(([x, y]) => {
        x1 = Math.min(x1, x);
        x2 = Math.max(x2, x);
        y1 = Math.min(y1, y);
        y2 = Math.max(y2, y);
    });
    return [x2, x1, y2, y1];
};

// const render = (M: Set<string>) => {
//     const [x2, x1, y2, y1] = getBound(M);
//     const arr = [];
//     for (let y = y1 - 1; y <= y2 + 1; y++) {
//         let line = '';

//         for (let x = x1 - 1; x <= x2 + 1; x++) {
//             line += M.has( '' + [x, y] )? '#' : '.';
//         }
//         arr.push(line);
//     }
//     return arr.join('\n');
// };

const MOVES = ['N', 'S', 'W', 'E'];
const move = (r: number, M: Set<string>) => {
    const mi = r % 4;
    const moves = [MOVES.slice(mi), MOVES.slice(0, mi)].flat();
    const P: Record<string, string[]> = {};
    const propose = ([x, y]: number[], p: string) => {
        const key = [x, y] + '';
        P[key] = P[key] || [];
        P[key].push(p);
    };

    [...M].forEach((p) => {
        const adjs = getAdjs(p, M);
        const [x, y] = ints(p);
        if (Object.values(adjs).every((v) => !v)) {
            propose([x, y], p);
            return;
        }

        for (let i = 0; i < moves.length; i++) {
            const move = moves[i];
            if (move === 'N' && ['N', 'NW', 'NE'].every((d) => !adjs[d])) {
                propose([x, y - 1], p);
                return;
            }
            if (move === 'S' && ['S', 'SW', 'SE'].every((d) => !adjs[d])) {
                propose([x, y + 1], p);
                return;
            }
            if (move === 'W' && ['W', 'NW', 'SW'].every((d) => !adjs[d])) {
                propose([x - 1, y], p);
                return;
            }
            if (move === 'E' && ['E', 'NE', 'SE'].every((d) => !adjs[d])) {
                propose([x + 1, y], p);
                return;
            }
        }
        propose([x, y], p);
    });
    let moved = false;
    const _M: Set<string> = new Set();
    Object.entries(P).forEach(([k, v]) => {
        if (v.length === 1) {
            _M.add(k);
            if (v[0] !== k) moved = true;
        }
        if (v.length > 1) {
            v.forEach((p) => _M.add(p));
        }
    });
    return [_M, moved] as [Set<string>, boolean];
};

const area = (M: Set<string>) => {
    const [x2, x1, y2, y1] = getBound(M);
    return (x2 - x1 + 1) * (y2 - y1 + 1) - M.size;
};

let A = new Set([...M]);
for (let r = 0; r < 10; r++) [A] = move(r, A);
console.log(area(A));

let B = new Set([...M]);
let r = 0;
while (true) {
    const result = move(r, B);
    if (!result[1]) {
        console.log(r + 1);
        break;
    }
    B = result[0];
    r++;
}
