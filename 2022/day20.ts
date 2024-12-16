import data from './day20_input.ts';
// import data from './day20_sample.ts';

const arr: number[] = data().split('\n').map(Number);

const mixing = (_arr: number[], times = 1) => {
    const arr = _arr.map((n, i) => [n, i]);
    for (let t = 0; t < times; t++) {
        for (let x = 0; x < arr.length; x++) {
            const i = arr.findIndex((n) => n[1] === x);
            const n = arr[i][0];
            arr.splice(i, 1);
            arr.splice((i + n) % arr.length, 0, [n, x]);
        }
    }
    return arr.map((a) => a[0]);
};

const ans = (arr: number[], time: number) => {
    const a = mixing(arr, time);
    const idx = a.findIndex((n) => n === 0);
    return (
        a[(idx + 1000) % a.length] +
        a[(idx + 2000) % a.length] +
        a[(idx + 3000) % a.length]
    );
};

console.log(ans(arr, 1));
console.log(
    ans(
        arr.map((n) => n * 811589153),
        10
    )
);
