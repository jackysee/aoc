import data from './day24_input.ts';
// import data from './day24_sample.ts';

type Storm = { pos: pt; face: string };
type pt = [number, number];
const B: Storm[] = [];
const Walls = new Set();
let [x1, x2, y1, y2] = [Infinity, -Infinity, Infinity, -Infinity];
data()
    .split('\n')
    .forEach((l, y) =>
        l.split('').forEach((c, x) => {
            if (c === '#') Walls.add(`${x},${y}`);
            if (['^', '<', '>', 'v'].includes(c))
                B.push({ pos: [x, y], face: c });
            [x1, x2] = [Math.min(x1, x), Math.max(x2, x)];
            [y1, y2] = [Math.min(y1, y), Math.max(y2, y)];
        })
    );

const move = (b: Storm) => {
    let [x, y] = b.pos;
    if (b.face === '>') x = x + 1 >= x2 ? 1 : x + 1;
    if (b.face === '<') x = x - 1 <= x1 ? x2 - 1 : x - 1;
    if (b.face === '^') y = y - 1 <= y1 ? y2 - 1 : y - 1;
    if (b.face === 'v') y = y + 1 >= y2 ? 1 : y + 1;
    return { ...b, pos: [x, y] as pt };
};

const eq = ([x1, y1]: pt, [x2, y2]: pt) => x1 === x2 && y1 === y2;

const getTime = (dests: pt[], B: Storm[]) => {
    let t = Date.now();
    const start = dests.shift()!;
    let dest = dests.shift()!;
    let queue: pt[] = [[...start] as pt];
    let _B = [...B];
    let time = 0;
    const result = [];
    while (queue.length) {
        const q = queue.find((pos) => eq(pos, dest));
        if (q) {
            const _t = Date.now();
            console.log('dest reached:', q, time, `(took ${_t - t}ms)`);
            t = _t;
            result.push(time);
            if (!dests.length) return result;
            queue = [q];
            dest = dests.shift()!;
            continue;
        }
        time += 1;
        _B = _B.map(move);
        const seen = new Set();
        queue = queue.flatMap(([x, y]) => {
            return [
                [x + 1, y],
                [x, y + 1],
                [x, y],
                [x - 1, y],
                [x, y - 1]
            ].filter(([nx, ny]) => {
                if (ny < 0 || ny > y2) return false;
                if (Walls.has(`${nx},${ny}`)) return false;
                if (_B.some((b) => eq(b.pos, [nx, ny]))) return false;
                if (seen.has([nx, ny] + '')) return false;
                seen.add([nx, ny] + '');
                return true;
            }) as pt[];
        });
    }
    return undefined;
};

const start: pt = [1, 0];
const goal: pt = [x2 - 1, y2];
const result = getTime([start, goal, start, goal], B)!;
console.log(result[0]);
console.log(result[2]);
