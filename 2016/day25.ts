import data from './day25_input.ts';

function run(pg: string, reg: Record<string, number>) {
    const arr = pg.split('\n');
    const getVal = (v: string) => (isNaN(Number(v)) ? reg[v] : Number(v));
    const out = [];
    let i = 0;
    while (arr[i]) {
        let [op, x, y, z] = arr[i].split(/\s+/);
        if (op === 'cpy' && reg[y] !== undefined) reg[y] = getVal(x);
        if (op === 'inc' && reg[x] !== undefined) reg[x] += 1;
        if (op === 'dec' && reg[x] !== undefined) reg[x] -= 1;
        if (op === 'mul') reg[z] = getVal(x) * getVal(y);
        if (op === 'out') out.push(getVal(x));
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
        if (out.length === 10) break;
    }
    return [reg, out];
}

let a = 0;
while (true) {
    let result = run(data(), { a, b: 0, c: 0, d: 0 });
    if ((result[1] as number[]).join('') === '0101010101') {
        console.log('Part 1', a);
        break;
    }
    a++;
}
