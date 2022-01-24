import data from './day23_input.ts';
// import data from './day23_sample.ts';

function run(reg: Record<string, number>) {
    const arr = data().split('\n');
    const getVal = (v: string) => (isNaN(Number(v)) ? reg[v] : Number(v));
    let i = 0;
    while (arr[i]) {
        let [op, x, y] = arr[i].split(/\s+/);
        if (op === 'cpy' && reg[y] !== undefined) reg[y] = getVal(x);
        if (op === 'inc' && reg[x] !== undefined) reg[x] += 1;
        if (op === 'dec' && reg[x] !== undefined) reg[x] -= 1;
        if (op === 'tgl') {
            let target = arr[i + getVal(x)];
            if (target) {
                let isOne = target.split(/\s+/g).length === 2;
                if (isOne) {
                    target = target.replace(
                        /^.../,
                        /^inc/.test(target) ? 'dec' : 'inc'
                    );
                } else {
                    target = target.replace(
                        /^.../,
                        /^jnz/.test(target) ? 'cpy' : 'jnz'
                    );
                }
                arr[i + getVal(x)] = target;
            }
        }
        if (op === 'jnz' && getVal(x) !== 0) i += getVal(y);
        else i++;
        console.log(reg);
    }
    return reg;
}

console.log('Part 1', run({ a: 7, b: 0, c: 0, d: 0 }).a);
console.log('Part 2', run({ a: 12, b: 0, c: 0, d: 0 }).a);
