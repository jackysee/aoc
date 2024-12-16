import data from './day25_input.js';

const points = data()
    .split('\n')
    .map((l) => l.split(',').map(Number));

const dist = (a, b) =>
    [0, 1, 2, 3].map((i) => Math.abs(a[i] - b[i])).reduce((a, c) => a + c, 0);

const findConstellation = (points) => {
    if (!points.length) return 0;
    let queue = [0];
    let visited = new Set();
    while (queue.length) {
        let idx = queue.pop();
        points.forEach((p, pi) => {
            if (idx === pi) return;
            if (visited.has(pi)) return;
            if (dist(points[idx], p) <= 3) queue.push(pi);
        });
        visited.add(idx);
    }
    return 1 + findConstellation(points.filter((_, i) => !visited.has(i)));
};

console.log('Part 1', findConstellation(points));
