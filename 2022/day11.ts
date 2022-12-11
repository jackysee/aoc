// import data from './day11_input.ts';
import data from './day11_sample.ts';

const M: Record<number, any> = {};

const makeOp = (s) => {
    let [b, c] = s.split(' ').slice(-2);
    if (b === '+') {
        return (n) => n + Number(c);
    }
    if (b === '*') {
        if (c === 'old') return (n) => n * n;
        return (n) => n * Number(c);
    }
    return (n) => n;
};

data()
    .split('\n\n')
    .forEach((l, i) => {
        const arr = l.split('\n');
        const op = makeOp(arr[2]);
        M[i] = {
            items: arr[1].match(/\d+/g)!.map(Number),
            op,
            test: arr[3].match(/\d+/g)!.map(Number)[0],
            yes: arr[4].match(/\d+/g)!.map(Number)[0],
            no: arr[5].match(/\d+/g)!.map(Number)[0],
            inspected: 0
        };
    });

// console.log(M);

// const ROUND = 20;
const ROUND = 10000;
for (let r = 0; r < ROUND; r++) {
    for (let i = 0; i < Object.values(M).length; i++) {
        let m = M[i];
        m.items.forEach((n) => {
            let _n = m.op(n);
            // _n = Math.floor(_n / 3);
            // if (r % 1000 == 0)
            //     console.log({ n, _n, i, div: m.test, inspected: m.inspected });
            // console.log('throw to ', _n % m.test === 0 ? m.yes : m.no);
            if (_n % m.test === 0) {
                M[m.yes].items.push(m.test);
            } else {
                M[m.no].items.push(_n % m.test);
            }
            m.inspected++;
        });
        m.items = [];
    }
}

console.log(
    Object.values(M)
        .map((m) => m.inspected)
        .sort((a, b) => b - a),
    Object.values(M)
        .map((m) => m.inspected)
        .sort((a, b) => b - a)
        .slice(0, 2)
        .reduce((a, c) => a * c, 1)
);
