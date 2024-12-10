import data from './day25_input.ts';
// import data from './day25_sample.ts';

const toDec = (s: string) => {
    const a = s.split('').reverse();
    return a.reduce((a, c, i) => {
        let m = Number(c);
        if (c === '-') m = -1;
        if (c === '=') m = -2;
        return a + 5 ** i * m;
    }, 0);
};

const toSnafu = (n: number) => {
    let s = '';
    while (n != 0) {
        const r = n % 5;
        let carry = 0;
        if (r < 3) s = r + s;
        if (r === 3) [s, carry] = ['=' + s, 2];
        if (r === 4) [s, carry] = ['-' + s, 1];
        n = Math.floor((n + carry) / 5);
    }
    return s;
};

// const testData = [
//     ['1', 1],
//     ['2', 2],
//     ['1=', 3],
//     ['1-', 4],
//     ['10', 5],
//     ['11', 6],
//     ['12', 7],
//     ['2=', 8],
//     ['2-', 9],
//     ['20', 10],
//     ['1=0', 15],
//     ['1-0', 20],
//     ['1=11-2', 2022],
//     ['1121-1110-1=0', 314159265],
//     ['1-0---0', 12345]
// ] as [string, number][];
// console.log(
//     testData.every(([a, b]) => b === toDec(a)),
//     testData.every(([a, b]) => a === toSnafu(b))
// );

const ans = data()
    .split('\n')
    .reduce((a, c) => a + toDec(c), 0);

console.log(toSnafu(ans));
