import data from './day12_input.ts';
// import data from './day12_sample.ts';
const arr = data().split('\n');

function run(reg: Record<string, number>) {
    const getVal = (v: string) => (isNaN(Number(v)) ? reg[v] : Number(v));
    let i = 0;
    while (arr[i]) {
        let [op, x, y] = arr[i].split(/\s+/);
        if (op === 'cpy') reg[y] = getVal(x);
        if (op === 'inc') reg[x] += 1;
        if (op === 'dec') reg[x] -= 1;
        if (op === 'jnz' && getVal(x) !== 0) i += Number(y);
        else i++;
    }
    return reg;
}

console.log('Part 1', run({ a: 0, b: 0, c: 0, d: 0 }).a);
console.log('Part 2', run({ a: 0, b: 0, c: 1, d: 0 }).a);
