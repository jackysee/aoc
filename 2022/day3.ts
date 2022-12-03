import data from './day3_input.ts';
// import data from './day3_sample.ts';

let arr: string[] = data().split('\n');

const val = (c: string | undefined) => {
    if (c === undefined) return 0;
    return c.charCodeAt(0) - (c === c.toUpperCase() ? 38 : 96);
};
const contains = (str: string, c: string) => str.indexOf(c) !== -1;
const partA = arr
    .map((l) => {
        const left = l.slice(0, l.length / 2);
        const right = l.slice(l.length / 2);
        const v = left.split('').find((c) => contains(right, c));
        return val(v);
    })
    .reduce((a, c) => a + c, 0);

console.log(partA);

let letters = 'abcdefghijklmnopqrstuvwxyz';
letters += letters.toUpperCase();
const CHARS = letters.split('');

const find = (arr: string[]) => {
    return CHARS.find((c) => arr.every((l) => contains(l, c)));
};

const calc = ([x, y, z, ...rest]: string[]): number => {
    const v = val(find([x, y, z]));
    if (!rest.length) return v;
    return v + calc(rest);
};
console.log(calc(arr));
