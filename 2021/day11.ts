import data from './day11_input.ts';
// import data from './day11_sample.ts';

interface Grid {
    [key: string]: number;
}
let map: Grid = {};
data()
    .split('\n')
    .forEach((l, y) => {
        l.split('').forEach((n, x) => {
            map[`${x},${y}`] = parseInt(n, 10);
        });
    });

const neighbours = (pos: string) => {
    const [x, y] = pos.split(',').map(Number);
    return [x - 1, x, x + 1]
        .flatMap((a) => [y - 1, y, y + 1].map((b) => [a, b]))
        .map((a) => a + '')
        .filter((p) => p != `${x},${y}`);
};

const inc = (pos: string, map: Grid) => {
    map[pos] += 1;
    if (map[pos] === 10) {
        neighbours(pos)
            .filter((p) => map[p] !== undefined && map[p] < 10)
            .forEach((p) => inc(p, map));
    }
};

const resetFlashes = (map: Grid) => {
    let i = 0;
    for (const pos in map) {
        if (map[pos] >= 10) {
            map[pos] = 0;
            i++;
        }
    }
    return i;
};

let STEP = 100;
let flashes = 0;
for (let s = 0; s < STEP; s++) {
    for (const pos in map) {
        inc(pos, map);
    }
    flashes += resetFlashes(map);
}
console.log('Part 1', flashes);

let step = 1;
while (true) {
    for (const pos in map) {
        inc(pos, map);
    }
    let flashes = resetFlashes(map);
    if (flashes == 100) {
        break;
    }
    step++;
}

console.log('Part 2', STEP + step);
