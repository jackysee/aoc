import data from './day22_input.ts';
// import data from './day22_sample.ts';

type pt = [number, number];
type turn = 'L' | 'R';
type step = number | turn;
type face = 'U' | 'D' | 'L' | 'R';
type state = { pos: pt; facing: face };

const [s1, s2] = data().split('\n\n');
const M: Record<string, string> = {};
let start: pt;
s1.split('\n').forEach((l, y) =>
    l.split('').forEach((c, x) => {
        if (c !== ' ') {
            M[`${x},${y}`] = c;
            if (!start) start = [x, y];
        }
    })
);
const steps: step[] = s2
    .match(/(\d+|[LR])/g)!
    .map((s) => (/[LR]/.test(s) ? (s as turn) : +s));

const DIRS: Record<face, pt> = {
    U: [0, -1],
    D: [0, 1],
    L: [-1, 0],
    R: [1, 0]
};
const TURNS: Record<face, Record<turn, face>> = {
    U: { L: 'L', R: 'R' },
    R: { L: 'U', R: 'D' },
    D: { L: 'R', R: 'L' },
    L: { L: 'D', R: 'U' }
};

const walkToTheEnd = (pos: pt, facing: face) => {
    const dir = DIRS[facing];
    while (true) {
        const next = pos.map((n, i) => n + dir[i]);
        if (M[next + ''] === undefined) return pos as pt;
        pos = next as pt;
    }
};

const walk = (nextPos: (s: state) => state) => {
    let facing: face = 'R';
    let pos: pt = [...start!];
    steps.forEach((s) => {
        if (Number.isInteger(s)) {
            for (let i = 0; i < s; i++) {
                const { pos: next, facing: _facing } = nextPos({ pos, facing });
                facing = _facing;
                if (M[next + ''] === '#') break;
                pos = next;
            }
        } else {
            facing = TURNS[facing][s as turn];
        }
    });
    return { pos, facing };
};

const facingValues: Record<string, number> = { U: 3, R: 0, L: 2, D: 1 };
const getValue = ({ pos: [x, y], facing }: state) => {
    return 1000 * (y + 1) + 4 * (x + 1) + facingValues[facing];
};

const nextPos = ({ pos, facing }: state) => {
    const next = pos.map((n, i) => n + DIRS[facing][i]) as pt;
    if (M[next + ''] !== undefined) return { pos: next, facing };
    if (facing === 'R') return { pos: walkToTheEnd(pos, 'L'), facing };
    if (facing === 'L') return { pos: walkToTheEnd(pos, 'R'), facing };
    if (facing === 'U') return { pos: walkToTheEnd(pos, 'D'), facing };
    if (facing === 'D') return { pos: walkToTheEnd(pos, 'U'), facing };
    throw new Error('invalid state');
};

console.log(getValue(walk(nextPos)));

const getRegion = ([x, y]: pt) => {
    if (x >= 50 && x <= 99 && y >= 0 && y <= 49) return 1;
    if (x >= 100 && x <= 149 && y >= 0 && y <= 49) return 2;
    if (x >= 50 && x <= 99 && y >= 50 && y <= 99) return 3;
    if (x >= 50 && x <= 99 && y >= 100 && y <= 149) return 5;
    if (x >= 0 && x <= 49 && y >= 100 && y <= 149) return 4;
    if (x >= 0 && x <= 49 && y >= 150 && y <= 199) return 6;
    return undefined;
};

const nextPos2 = ({ pos, facing }: state) => {
    const next = pos.map((n, i) => n + DIRS[facing][i]) as pt;
    if (M[next + ''] !== undefined) return { pos: next, facing };
    const code = getRegion(pos)! + facing;
    const [x, y] = pos;
    let result;
    if (code === '1U') result = [[0, x + 100], 'R'];
    if (code === '1L') result = [[0, 149 - y], 'R'];
    if (code === '2U') result = [[x - 100, 199], 'U'];
    if (code === '2R') result = [[99, 149 - y], 'L'];
    if (code === '2D') result = [[99, x - 50], 'L'];
    if (code === '3L') result = [[y - 50, 100], 'D'];
    if (code === '3R') result = [[y + 50, 49], 'U'];
    if (code === '5R') result = [[149, 149 - y], 'L'];
    if (code === '5D') result = [[49, x + 100], 'L'];
    if (code === '4U') result = [[50, x + 50], 'R'];
    if (code === '4L') result = [[50, 149 - y], 'R'];
    if (code === '6L') result = [[y - 100, 0], 'D'];
    if (code === '6D') result = [[x + 100, 0], 'D'];
    if (code === '6R') result = [[y - 100, 149], 'U'];
    if (!result) throw new Error('invalid state');
    return { pos: result[0], facing: result[1] } as state;
};

console.log(getValue(walk(nextPos2)));
