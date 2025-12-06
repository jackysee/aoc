import data from './day6_input.js';
// import data from './day6_sample.js';
const lines = data().split('\n');
const datas = lines.map((l) => l.trim().split(/\s+/));

const calc = (arr, op) => {
    return arr.reduce(
        (a, c) => (op === '*' ? +c * a : +c + a),
        op === '*' ? 1 : 0
    );
};

const result = datas.at(-1).map((op, i) => {
    return calc(
        datas.slice(0, -1).map((l) => l[i]),
        op
    );
});
console.log(result.reduce((a, c) => a + c, 0));

let idx = lines[0].length - 1;
let arr = [];
let result2 = 0;
while (idx >= 0) {
    const s = lines
        .slice(0, -1)
        .map((l) => l[idx])
        .filter((c) => !!c)
        .join('')
        .trim();
    if (s) {
        const op = lines.at(-1)?.[idx]?.trim();
        if (!op) {
            arr.push(+s);
        } else {
            result2 += calc([...arr, +s], op);
            arr = [];
        }
    }
    idx--;
}
console.log(result2);
