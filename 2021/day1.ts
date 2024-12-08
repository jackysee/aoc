import data from './day1_input.ts';

const arr: Array<number> = data()
    .trim()
    .split('\n')
    .map((s: string) => parseInt(s, 10));

function increased(arr: Array<number>): number {
    let count: number = 0;
    for (let i = 0; i < arr.length; i++) {
        const last = arr[i - 1];
        const curr = arr[i];
        if (last !== undefined && curr > last) {
            count += 1;
        }
    }
    return count;
}

console.log('Part 1', increased(arr));

let three = arr.map((v, i) => {
    return v + (arr[i + 1] || 0) + (arr[i + 2] || 0);
});

console.log('Part 2', increased(three));
