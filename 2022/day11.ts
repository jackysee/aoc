import data from './day11_input.ts';
// import data from './day11_sample.ts';

type monkey = {
    items: number[];
    op: (n: number) => number;
    test: number;
    yes: number;
    no: number;
};
const M: monkey[] = [];
const makeOp = (s: string) => {
    const [b, c] = s.split(' ').slice(-2);
    if (b === '+') return (n: number) => n + +c;
    if (c === 'old') return (n: number) => n * n;
    return (n: number) => n * +c;
};
const nums = (s: string) => (s.match(/-?\d+/g) || []).map(Number);
data()
    .split('\n\n')
    .forEach((l) => {
        const arr = l.split('\n');
        M.push({
            items: nums(arr[1]),
            op: makeOp(arr[2]),
            test: nums(arr[3])[0],
            yes: nums(arr[4])[0],
            no: nums(arr[5])[0]
        });
    });

function play(round: number, cb: (n: number, i: number) => number) {
    const inspected = Array(M.length).fill(0);
    const items = M.map((m) => m.items.map((n) => Array(M.length).fill(n)));
    for (let r = 0; r < round; r++) {
        M.forEach((m, i) => {
            items[i].forEach((ns: number[]) => {
                const _n = ns.map((n, i) => cb(m.op(n), i));
                const to = _n[i] % m.test === 0 ? m.yes : m.no;
                items[to].push(_n);
                inspected[i] += 1;
            });
            items[i] = [];
        });
    }
    return inspected
        .sort((a, b) => b - a)
        .slice(0, 2)
        .reduce((a, c) => a * c, 1);
}

console.log(play(20, (n) => Math.floor(n / 3)));
console.log(play(10000, (n, i) => n % M[i].test));
