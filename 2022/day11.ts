import data from './day11_input.ts';
// import data from './day11_sample.ts';

type monkey = {
    items: number[][];
    op: (n: number) => number;
    test: number;
    yes: number;
    no: number;
};

const M: monkey[] = [];
const makeOp = (s: string) => {
    const [b, c] = s.split(' ').slice(-2);
    if (b === '+') {
        return (n: number) => n + Number(c);
    }
    if (b === '*') {
        if (c === 'old') return (n: number) => n * n;
        return (n: number) => n * Number(c);
    }
    return (n: number) => n;
};

data()
    .split('\n\n')
    .forEach((l) => {
        const arr = l.split('\n');
        const op = makeOp(arr[2]);
        M.push({
            items: arr[1].match(/\d+/g)!.map((n) => [Number(n)]),
            op,
            test: arr[3].match(/\d+/g)!.map(Number)[0],
            yes: arr[4].match(/\d+/g)!.map(Number)[0],
            no: arr[5].match(/\d+/g)!.map(Number)[0]
        });
    });

//remainder
M.forEach((m) => {
    m.items = m.items.map(([i]: number[]) => {
        return M.map((_m) => i % _m.test);
    });
});

let p1Inspected = [...Array(M.length).fill(0)];
let p2Inspected = [...Array(M.length).fill(0)];

// console.log(M);
// const ROUND = 20;
const ROUND = 10000;
for (let r = 0; r < ROUND; r++) {
    M.forEach((m, i) => {
        m.items.forEach((ns: number[]) => {
            const _n = ns.map((n, i) => m.op(n) % M[i].test);
            if (_n[i] === 0) {
                M[m.yes].items.push(_n);
            } else {
                M[m.no].items.push(_n);
            }
            p2Inspected[i] += 1;
        });
        m.items = [];
    });
}
//sample ans 2713310158
console.log(
    p2Inspected
        .sort((a, b) => b - a)
        .slice(0, 2)
        .reduce((a, c) => a * c, 1)
);
