import data from './day5_input.js';
// import data from './day5_sample.js';

const [s1, s2] = data().split('\n\n');
const ranges = s1.split('\n').map((l) => l.split('-').map((n) => +n));
const ids = s2.split('\n').map((n) => +n);

const isFresh = (n) => ranges.some(([from, to]) => n >= from && n <= to);
console.log(ids.filter(isFresh).length);

const merge = ([x1, x2], [y1, y2]) => {
    if ((x1 < y1 && x2 < y1) || (x1 > y2 && x2 > y2)) {
        return [
            [x1, x2],
            [y1, y2]
        ];
    }
    return [[Math.min(x1, x2, y1, y2), Math.max(x1, x2, y1, y2)]];
};

let result = [ranges[0]];
const queue = ranges.slice(1);

while (queue.length) {
    const r = queue.shift();
    let merged = false;
    result = result.flatMap((i) => {
        const m = merge(i, r);
        if (m.length === 1 && !merged) {
            queue.push(m[0]);
            merged = true;
            return [];
        }
        return [i];
    });
    if (!merged) result.push(r);
}
console.log(result.reduce((a, c) => a + c[1] - c[0] + 1, 0));
