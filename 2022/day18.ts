import data from './day18_input.ts';
// import data from './day18_sample.ts';

const ints = (s: string) => (s.match(/-?\d+/g) || []).map(Number);
const cubes: number[][] = data().split('\n').map(ints);

const sidesCovered = ([x, y, z]: number[]) =>
    cubes.filter(([_x, _y, _z]) => {
        return (
            (x === _x && y === _y && Math.abs(z - _z) === 1) ||
            (z === _z && y === _y && Math.abs(x - _x) === 1) ||
            (x === _x && z === _z && Math.abs(y - _y) === 1)
        );
    }).length;

console.log(cubes.reduce((a, c) => a + (6 - sidesCovered(c)), 0));

const cubeSet = new Set(cubes.map((c) => '' + c));
const min = [Infinity, Infinity, Infinity];
const max = [-Infinity, -Infinity, -Infinity];
cubes.forEach((c) =>
    c.forEach((n, i) => {
        min[i] = Math.min(n, min[i]);
        max[i] = Math.max(n, max[i]);
    })
);

const queue = [max.map((n) => n + 1)];
const seen: Set<string> = new Set();
seen.add(queue[0] + '');
while (queue.length) {
    const [x, y, z] = queue.pop()!;
    [
        [x, y, z + 1],
        [x, y, z - 1],
        [x, y + 1, z],
        [x, y - 1, z],
        [x + 1, y, z],
        [x - 1, y, z]
    ].forEach((c) => {
        if (!c.every((n, i) => n >= min[i] - 1 && n <= max[i] + 1)) return;
        if (cubeSet.has(c + '')) return;
        if (seen.has(c + '')) return;
        seen.add('' + c);
        queue.push(c);
    });
}
console.log([...seen].reduce((a: number, p) => a + sidesCovered(ints(p)), 0));
