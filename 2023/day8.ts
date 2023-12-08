import data from './day8_input.ts';
// import data from './day8_sample.ts';
const lines = data().split('\n');
const steps = lines[0].split('');

const M: Record<string, Record<string, string>> = {};
lines.slice(2).forEach((l) => {
    const [node, L, R] = l.match(/\w+/g)!;
    M[node] = { L, R };
});

const findStep = (node: string, isDest: (a: string) => boolean) => {
    let count = 0;
    let i = 0;
    while (true) {
        node = M[node][steps[i]];
        count++;
        if (isDest(node)) break;
        i++;
        if (i === steps.length) i = 0;
    }
    return count;
};

console.log(
    'A',
    findStep('AAA', (n) => n === 'ZZZ')
);

const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
const lcm = (x: number, y: number) => (x * y) / gcd(x, y);
const nodeSteps = Object.keys(M)
    .filter((n) => /A$/.test(n))
    .map((n) => findStep(n, (n) => /Z$/.test(n)));

console.log('B', nodeSteps.reduce(lcm));
