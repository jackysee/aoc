import data from './day3_input.ts';
// import data from './day3_sample.ts';
// prettier-ignore
const range = (a: number, b: number) => Array.from({ length: b - a }, (_, n) => n + a);
const toXY = (pos: string) => pos.split(',').map(Number);
const sum = (a: number, b: number) => a + b;
const S: Record<string, string> = {};
const N: Record<string, number> = {};
const NS: Record<string, string> = {};

const getNumPos = (pos: string, n: number) => {
    const [x, y] = toXY(pos);
    return range(0, (n + '').length).map((dx) => [x + dx, y] + '');
};

data()
    .split('\n')
    .forEach((l, y) => {
        [...l.matchAll(/[^\d\.]/g)].forEach((m) => {
            S[`${m.index},${y}`] = m + '';
        });
        [...l.matchAll(/\d+/g)].forEach((m) => {
            const n = Number(m);
            const pos = getNumPos(`${m.index},${y}`, n);
            N[pos.join('|')] = n;
            pos.forEach((p) => (NS[p] = pos.join('|')));
        });
    });

const findNeighbor = (pos: string) => {
    const [x, y] = toXY(pos);
    //prettier-ignore
    return [ 
        [-1, -1], [0, -1], [1, -1], [-1, 0],
        [1, 0], [-1, 1], [0, 1], [1, 1]
    ].map(([dx, dy]) => [x + dx, y + dy]+'');
};

const hasSymbolNear = (pos: string) => findNeighbor(pos).some((p) => !!S[p]);
console.log(
    'A',
    Object.entries(N)
        .filter(([pos]) => pos.split('|').some(hasSymbolNear))
        .map((n) => n[1])
        .reduce(sum, 0)
);
console.log(
    'B',
    Object.entries(S)
        .map(([pos, s]) => {
            if (s !== '*') return 0;
            const G: Record<string, number> = {};
            findNeighbor(pos).forEach((p) => {
                const ns = NS[p];
                if (ns) G[ns] = N[ns];
            });
            const values = Object.values(G);
            if (values.length > 1) {
                return values.reduce((a, c) => a * c, 1);
            }
            return 0;
        })
        .reduce(sum, 0)
);
