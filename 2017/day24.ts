import data from './day24_input.ts';

let arr: number[][] = data()
    .split('\n')
    .map((l) => l.split('/').map(Number));

let queue = arr
    .filter((c) => c.includes(0))
    .map((a) => ({
        seen: new Set([a + '']),
        end: Math.max(...a),
        strength: a[0] + a[1],
        len: 1
    }));

let max = -Infinity;
let d = Date.now();
let longest: [number, number] = [-Infinity, -Infinity];
while (queue.length) {
    let p = queue.pop()!;
    let comps = arr.filter((a) => !p.seen.has(a + '') && a.includes(p.end));
    if (comps.length === 0) {
        if (p.strength > max) max = p.strength;
        if (
            p.len > longest[0] ||
            (p.len === longest[0] && p.strength > longest[1])
        )
            longest = [p.len, p.strength];
    }
    comps.forEach((a) => {
        queue.push({
            seen: new Set([...p.seen, a + '']),
            end: a[0] === p.end ? a[1] : a[0],
            strength: p.strength + a[0] + a[1],
            len: p.len + 1
        });
    });
}

console.log('Time taken', Date.now() - d);
console.log('Part 1', max);
console.log('Part 2', longest[1]);
