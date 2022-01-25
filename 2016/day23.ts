import data from './day23_input.ts';
// import data from './day23_sample.ts';

function run(pg: string, reg: Record<string, number>) {
    const arr = pg.split('\n');
    const getVal = (v: string) => (isNaN(Number(v)) ? reg[v] : Number(v));
    let i = 0;
    while (arr[i]) {
        let [op, x, y, z] = arr[i].split(/\s+/);
        if (op === 'cpy' && reg[y] !== undefined) reg[y] = getVal(x);
        if (op === 'inc' && reg[x] !== undefined) reg[x] += 1;
        if (op === 'dec' && reg[x] !== undefined) reg[x] -= 1;
        if (op === 'mul') reg[z] = getVal(x) * getVal(y);
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
        // console.log(reg);
    }
    return reg;
}

console.log('Part 1', run(data(), { a: 7, b: 0, c: 0, d: 0 }).a);

let pg2 = `
cpy a b
dec b
cpy a d
cpy 0 a
mul b d a
cpy 0 c
cpy 0 c
cpy 0 c
cpy 0 c
cpy 0 d
dec b
cpy b c
cpy c d
dec d
inc c
jnz d -2
tgl c
cpy -16 c
jnz 1 c
cpy 94 c
jnz 82 d
inc a
inc d
jnz d -2
inc c
jnz c -5
`.trim();
console.log('Part 2', run(pg2, { a: 12, b: 0, c: 0, d: 0 }).a);
