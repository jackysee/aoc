import data from './day23_input.ts';

const arr = data()
    .split('\n')
    .map((l) => l.split(' '));

function run(M: Record<string, number> = {}) {
    const getVal = (n: string | number) =>
        /[a-z]/.test(n + '') ? M[n] || 0 : +n;
    let i = 0;
    let mulCount = 0;
    while (arr[i]) {
        let [op, x, y] = arr[i];
        if (op === 'set') M[x] = getVal(y);
        if (op === 'sub') M[x] = (M[x] || 0) - getVal(y);
        if (op === 'mul') {
            M[x] = (M[x] || 0) * getVal(y);
            mulCount++;
        }
        if (op === 'jnz' && getVal(x) !== 0) i += getVal(y);
        else i++;
    }
    return mulCount;
}

console.log('Part 1', run());

/*
 *
 *

b = 67
c = b = 67
b = b * 100 = 6700
b = b - 100000







*/
