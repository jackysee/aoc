import data from './day13_input.ts';
// import data from './day13_sample.ts';

type NestedArray<T> = Array<T | NestedArray<T>>;
type signal = NestedArray<number>;
const arr: signal[][] = data()
    .split('\n\n')
    .map((l) => l.split('\n').map((s) => JSON.parse(s)));

const compare = (a: number | signal, b: number | signal): number => {
    if (Number.isInteger(a) && Number.isInteger(b)) {
        return Math.sign(+a - +b);
    }
    if (Number.isInteger(a)) a = [a];
    if (Number.isInteger(b)) b = [b];
    if (Array.isArray(a) && Array.isArray(b)) {
        for (let i = 0; i < Math.max(a.length, b.length); i++) {
            if (!a[i] && !!b[i]) return -1; //left running out
            if (!!a[i] && !b[i]) return 1; //right running out
            const result = compare(a[i], b[i]);
            if (result === 0) continue;
            return result;
        }
    }
    return 0;
};

console.log(
    arr.reduce((a, c, i) => a + (compare(c[0], c[1]) === -1 ? i + 1 : 0), 0)
);

const decoders: Array<signal> = [[[2]], [[6]]];
console.log(
    arr
        .flat()
        .concat(decoders)
        .sort(compare)
        .reduce((a, c, i) => a * (decoders.includes(c) ? i + 1 : 1), 1)
);
