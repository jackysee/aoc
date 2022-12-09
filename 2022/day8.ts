import data from './day8_input.ts';
// import data from './day8_sample.ts';

const arr: number[][] = data()
  .split('\n')
  .map((l) => l.split('').map(Number));
const W = arr[0].length;
const H = arr.length;

const getViews = (x: number, y: number) => {
  const result: number[][] = [[], [], [], []];
  for (let i = x - 1; i >= 0; i--) result[0].push(arr[y][i]);
  for (let i = x + 1; i <= W - 1; i++) result[1].push(arr[y][i]);
  for (let j = y - 1; j >= 0; j--) result[2].push(arr[j][x]);
  for (let j = y + 1; j <= H - 1; j++) result[3].push(arr[j][x]);
  return result;
};

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
