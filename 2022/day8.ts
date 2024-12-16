import data from './day8_input.ts';
// import data from './day8_sample.ts';

const arr: number[][] = data()
    .split('\n')
    .map((l) => l.split('').map(Number));
const W = arr[0].length;
const H = arr.length;

const DIR = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
];
const getViews = (x: number, y: number) =>
    DIR.map(([dx, dy]) => {
        const a = [];
        let [_x, _y] = [x, y];
        while (true) {
            [_x, _y] = [_x + dx, _y + dy];
            if (_x < 0 || _x >= W || _y < 0 || _y >= H) break;
            a.push(arr[_y][_x]);
        }
        return a;
    });

const isVisible = (x: number, y: number) =>
    getViews(x, y).some((s) => s.every((n) => n < arr[y][x]) || s.length === 0);

const dist = (v: number, arr: number[]) => {
    const i = arr.findIndex((n) => n >= v);
    return i === -1 ? arr.length : i + 1;
};

const getScore = (x: number, y: number) =>
    getViews(x, y)
        .map((a) => dist(arr[y][x], a))
        .reduce((a, c) => a * c, 1);

let count = 0;
let score = 0;
for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
        if (isVisible(i, j)) count++;
        score = Math.max(getScore(i, j), score);
    }
}
console.log(count);
console.log(score);
