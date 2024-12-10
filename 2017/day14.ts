const input = 'hwlqcszp';
// const input = 'flqrgnkx'; //sample
import knotHash from './knotHash.ts';

let M = [...Array(128)].map((_, i) => {
    return knotHash(input + '-' + i)
        .split('')
        .map((c) => parseInt(c, 16).toString(2).padStart(4, '0').split(''))
        .flat();
});
console.log('Part 1', M.flat().filter((n) => n === '1').length);

function walk(x: number, y: number, seen: Set<string>) {
    let queue = [[x, y]];
    while (queue.length) {
        let [x, y] = queue.pop()!;
        [
            [x - 1, y],
            [x + 1, y],
            [x, y - 1],
            [x, y + 1]
        ].forEach(([x, y]) => {
            if (M[y]?.[x] !== '1') return;
            if (seen.has([x, y] + '')) return;
            queue.push([x, y]);
            seen.add([x, y] + '');
        });
    }
}

let region = 0;
let seen = new Set<string>();
for (let y = 0; y < M.length; y++) {
    for (let x = 0; x < M[0].length; x++) {
        if (M[y][x] === '0') continue;
        if (seen.has([x, y] + '')) continue;
        region++;
        walk(x, y, seen);
    }
}

console.log('Part 2', region);
