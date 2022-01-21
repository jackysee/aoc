import data from './day22_input.ts';
import { combinations } from 'https://deno.land/x/combinatorics/mod.ts';
// import data from './day22_sample.ts';
interface Node {
    x: number;
    y: number;
    size: number;
    used: number;
    avail: number;
}

let arr: Node[] = data()
    .split('\n')
    .slice(2)
    .map((l) => {
        let [x, y] = l.match(/(?<=[xy])\d+/g)!.map(Number);
        let [size, used, avail] = l.match(/\d+(?=T)/g)!.map(Number);
        return { x, y, size, used, avail };
    });

console.log(
    'Part 1',
    [...combinations(arr, 2)].filter(([a, b]) => {
        return (
            (a.used > 0 && b.avail > a.used) || (b.used > 0 && a.avail > b.used)
        );
    }).length
);
