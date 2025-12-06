import data from './day6_input.js';
// import data from './day6_sample.js';
const lines = data().split('\n');
const datas = lines.map((l) => l.trim().split(/\s+/));

const result = datas.at(-1).map((op, i) => {
    return eval(
        datas
            .slice(0, -1)
            .map((l) => l[i])
            .join(op)
    );
});
console.log(eval(result.join('+')));

let idx = lines[0].length - 1;
let arr = [];
const result2 = [];
while (idx >= 0) {
    const s = lines
        .slice(0, -1)
        .map((l) => l[idx])
        .filter((c) => !!c)
        .join('')
        .trim();
    if (s) {
        const op = lines.at(-1)?.[idx]?.trim();
        arr.push(+s);
        if (op) {
            result2.push(eval(arr.join(op)));
            arr = [];
        }
    }
    idx--;
}
console.log(eval(result2.join('+')));
