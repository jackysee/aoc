import data from './day3_input.ts';

const arr: number[][] = data()
    .split('\n')
    .map((l) => l.trim().split(/\s+/).map(Number));

const isTrangle = ([a, b, c]: number[]) => {
    return a + b > c && a + c > b && b + c > a;
};
console.log('Part 1', arr.filter(isTrangle).length);

const arr2 = arr.flatMap((a, ai, arr) => {
    if (ai % 3 !== 0) return [];
    return [
        [a[0], arr[ai + 1][0], arr[ai + 2][0]],
        [a[1], arr[ai + 1][1], arr[ai + 2][1]],
        [a[2], arr[ai + 1][2], arr[ai + 2][2]]
    ];
});
console.log('Part 2', arr2.filter(isTrangle).length);
