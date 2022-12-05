import data from './day3_input.ts';
// import data from './day3_sample.ts';

const arr: string[] = data().split('\n');
const L = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const val = (c: string | undefined) => (c === undefined ? 0 : L.indexOf(c) + 1);
const contains = (str: string, c: string) => str.indexOf(c) !== -1;
const find = ([head, ...rest]: string[]) => {
    return head.split('').find((c) => rest.every((l) => contains(l, c)));
};
const partA = arr
    .map((l) => {
        const left = l.slice(0, l.length / 2);
        const right = l.slice(l.length / 2);
        return val(find([left, right]));
    })
    .reduce((a, c) => a + c, 0);
console.log(partA);

const calc = ([x, y, z, ...rest]: string[]): number => {
    const v = val(find([x, y, z]));
    if (!rest.length) return v;
    return v + calc(rest);
};
console.log(calc(arr));
