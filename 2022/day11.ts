import data from './day11_input.ts';
// import data from './day11_sample.ts';

type monkey = {
    items: number[];
    op: (n: number) => number;
    divisor: number;
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
        const items = nums(arr[1]);
        const op = makeOp(arr[2]);
        const [divisor, yes, no] = nums(arr.slice(3).join('\n'));
        M.push({ items, op, divisor, yes, no });
    });

const calc = (round: number, cb: (n: number, i: number) => number) => {
    const inspected = Array(M.length).fill(0);
    const items = M.map((m) => m.items.map((n) => Array(M.length).fill(n)));
    for (let r = 0; r < round; r++) {
        M.forEach((m, i) => {
            items[i].forEach((ns: number[]) => {
                const _n = ns.map((n, i) => cb(m.op(n), i));
                const to = _n[i] % m.divisor === 0 ? m.yes : m.no;
                items[to].push(_n);
                inspected[i] += 1;
            });
            items[i] = [];
        });
    }
    inspected.sort((a, b) => b - a);
    return inspected[0] * inspected[1];
};

console.log(calc(20, (n) => Math.floor(n / 3)));

//Method 1 : operate on all moduli
console.log(calc(10000, (n, i) => n % M[i].divisor));

//Method 2:  use LCM of all divisors.
//As all divisors are prime, just multiply them all together
//this way you also don't need to keep track of all moduli
//but I just reuse the code here anyway
const base = M.reduce((a, m) => m.divisor * a, 1);
console.log(calc(10000, (n) => n % base));
