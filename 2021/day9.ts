import data from './day9_input.ts';
// import data from './day9_sample.ts';

let arr: number[][] = data()
    .split('\n')
    .map((line) => line.split('').map(Number));

const getAdjs = (x: number, y: number) =>
    [
        [x, y + 1],
        [x, y - 1],
        [x - 1, y],
        [x + 1, y]
    ].filter(([x, y]) => (arr[x] && arr[x][y]) !== undefined);

let lowPoints: number[][] = [];
let risk = 0;
arr.forEach((line, x) => {
    line.forEach((h, y) => {
        let isLow = getAdjs(x, y).every(([x, y]) => arr[x][y] > h);
        if (isLow) {
            lowPoints.push([x, y]);
            risk += h + 1;
        }
    });
});
console.log('Part 1', risk);

function basin(pt: number[]) {
    let visited = new Set();
    let queue = [pt];
    while (queue.length !== 0) {
        let [x, y] = queue.shift() || [];
        let points = getAdjs(x, y).filter(([_x, _y]) => {
            return (
                !visited.has([_x, _y] + '') &&
                arr[_x][_y] >= arr[x][y] &&
                arr[_x][_y] < 9
            );
        });
        points.forEach((p) => visited.add(p + ''));
        queue = [...queue, ...points];
    }
    return visited.size + 1; //self
}

console.log(
    'Part 2',
    lowPoints
        .map(basin)
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((a, c) => a * c, 1)
);
