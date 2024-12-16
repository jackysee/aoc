import data from './day18_input.ts';

let M: Record<string, number> = {};
data()
    .split('\n')
    .forEach((l, y) => {
        l.split('').forEach((c, x) => (M[[x, y] + ''] = c == '#' ? 1 : 0));
    });

const getNeighbor = (x: number, y: number) => [
    [x - 1, y],
    [x + 1, y],
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1]
];

const countOn = (arr: number[][], M: Record<string, number>) =>
    arr.reduce((a, c) => a + (M[c + ''] || 0), 0);

const turnCornerOn = (M: Record<string, number>) =>
    ['0,0', '0,99', '99,0', '99,99'].forEach((k) => (M[k] = 1));

const step = (M: Record<string, number>, cornerOn: boolean = false) => {
    if (cornerOn) turnCornerOn(M);
    let _M: Record<string, number> = {};
    Object.entries(M).forEach(([k, v]) => {
        let [x, y] = k.split(',').map(Number);
        let on = countOn(getNeighbor(x, y), M);
        _M[k] = v;
        if (v === 1 && on !== 2 && on !== 3) _M[k] = 0;
        if (v === 0 && on === 3) _M[k] = 1;
    });
    if (cornerOn) turnCornerOn(_M);
    return _M;
};

let _M = { ...M };
for (let i = 0; i < 100; i++) _M = step(_M);
console.log('Part 1', Object.values(_M).filter((v) => v === 1).length);

let __M = { ...M };
for (let i = 0; i < 100; i++) __M = step(__M, true);
console.log('Part 2', Object.values(__M).filter((v) => v === 1).length);
