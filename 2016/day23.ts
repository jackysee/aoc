import data from './day23_input.ts';
// import data from './day23_sample.ts';

data()
    .split('\n')
    .forEach((l, i) => {
        console.log(i, l);
    });

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
        // console.log(reg);
    }
    return reg;
}

console.log('Part 1', run({ a: 7, b: 0, c: 0, d: 0 }).a);

/*
 *

 0 cpy a b      b = a               b = 12
 1 dec b        b -= 1              b = 11
 2 cpy a d      d = a               d = 12
 3 cpy 0 a      a = 0               a = 0
 4 cpy b c      c = b               c = 11
 5 inc a        a += 1              a = 1,  2, 3, 4, 5, 6, 7, 8, 9, 10
 6 dec c        c -= 1              c = 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
 7 jnz c -2     c !== 0 , j 5
 8 dec d        d -= 1              d = 12
 9 jnz d -5     d !== 0, j  4
 10 dec b
 11 cpy b c
 12 cpy c d
 13 dec d
 14 inc c
 15 jnz d -2
 16 tgl c
 17 cpy -16 c
 18 jnz 1 c
 19 cpy 94 c
 20 jnz 82 d
 21 inc a
 22 inc d
 23 jnz d -2
 24 inc c
 25 jnz c -5

 */

// console.log('Part 2', run({ a: 12, b: 0, c: 0, d: 0 }).a);
