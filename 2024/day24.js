import data from './day24_input.js';
// import data from './day24_sample.js';

const list = data().split('\n\n');
const values = list[0]
    .split('\n')
    .map((l) => l.split(': ').map((l, i) => (i === 1 ? +l : l)));
const conns = list[1].split('\n').map((l) => l.split(/ -> | /));

// console.log(conns);
// console.log(values);

const zs = conns
    .filter((a) => a[3].startsWith('z'))
    .map((a) => a[3])
    .sort()
    .reverse();
console.log(zs);
let currValues = values.map((l) => [...l]);
const findValue = (w) => currValues.find((v) => v[0] === w)?.[1];
const getValue = (v1, v2, op) => {
    if (v1 === undefined || v2 === undefined) return undefined;
    if (op === 'AND') return v1 && v2;
    if (op === 'OR') return v1 || v2;
    if (op === 'XOR') return v1 !== v2 ? 1 : 0;
};

// let i = 0;
// let changed = false;
while (true) {
    // const newValues = [];
    conns.forEach(([w1, op, w2, output]) => {
        const v1 = findValue(w1);
        const v2 = findValue(w2);
        if (v1 !== undefined && v2 !== undefined) {
            currValues.push([output, getValue(v1, v2, op)]);
        }
    });
    // currValues = newValues;
    if (zs.every((z) => findValue(z) !== undefined)) {
        console.log('--->', zs.map((z) => findValue(z)).join(''));
        break;
        // i++;
        // if (i > 100) break;
    }
}
// console.log(currValues, zs.map((z) => findValue(z)).join(''));
console.log(parseInt(zs.map((z) => findValue(z)).join(''), 2));
