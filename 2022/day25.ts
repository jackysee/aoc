import data from './day25_input.ts';
// import data from './day25_sample.ts';

const toDec = (s: string) => {
    const a = s.split('').reverse();
    return a.reduce((a, c, i) => {
        let m = Number(c);
        if (c === '-') m = -1;
        if (c === '=') m = -2;
        return a + Math.pow(5, i) * m;
    }, 0);
};

const toSnafu = (n: number) => {
    let current = n;
    let s = '';
    while (current != 0) {
        const r = current % 5;
        let add = 0;
        if (r === 0) s = '0' + s;
        if (r === 1) s = '1' + s;
        if (r === 2) s = '2' + s;
        if (r === 3) [s, add] = ['=' + s, 2];
        if (r === 4) [s, add] = ['-' + s, 1];
        current = Math.floor((current + add) / 5);
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
// ];
// console.log(
//     testData.every(([a, b]) => b === toDec(a)),
//     testData.every(([a, b]) => a === toSnafu(b))
// );

const ans = data()
    .split('\n')
    .reduce((a, c) => a + toDec(c), 0);

console.log(toSnafu(ans));
