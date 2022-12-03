import data from './day3_input.ts';
// import data from './day3_sample.ts';

let arr: string[] = data().split('\n');

const val = (c: string | undefined) => {
    if (c === undefined) return 0;
    return c.charCodeAt(0) - (c === c.toUpperCase() ? 38 : 96);
};
const find = (arr: string[]) => {
    return arr[0]
        .split('')
        .find((c) => arr.slice(1).every((l) => contains(l, c)));
};
const contains = (str: string, c: string) => str.indexOf(c) !== -1;
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
