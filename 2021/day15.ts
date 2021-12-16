import data from './day15_input.ts';
// import data from './day15_sample.ts';
import { BinaryHeap } from 'https://deno.land/x/collections@0.11.2/mod.ts';

interface Map {
    [key: string]: number;
}
let map: Map = {};
let mx = 0;
let my = 0;
data()
    .split('\n')
    .forEach((line, y) =>
        line.split('').forEach((n, x) => {
            map[[x, y] + ''] = Number(n);
            if (x > mx) mx = x;
            if (y > my) my = y;
        })
    );

function getNeigbours(pos: string, map: Map, visited: Set<string>) {
    let [x, y] = pos.split(',').map(Number);
    return [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1]
    ]
        .map((a) => a + '')
        .filter((p) => map[p] !== undefined && !visited.has(p));
}

interface Dist {
    pos: string;
    value: number;
}

function dij2(from: string, to: string, map: Map) {
    let visited = new Set<string>();
    let D: Map = {};
    D[from] = 0;
    let PQ: BinaryHeap<Dist> = new BinaryHeap<Dist>(
        (a: Dist, b: Dist) => a.value - b.value
    );
    PQ.push({ pos: from, value: 0 });
    while (!PQ.isEmpty()) {
        let u = PQ.pop()!;
        getNeigbours(u.pos, map, visited).forEach((p) => {
            let d = D[u.pos] + map[p];
            if (d < (D[p] || Infinity)) {
                D[p] = d;
                PQ.push({ pos: p, value: d });
            }
        });
        visited.add(u.pos);
    }
    return D[to];
}

let t = performance.now();
let p1 = dij2('0,0', `${mx},${my}`, map);
console.log('Part 1', p1, `(took ${performance.now() - t}ms)`);

let map2 = Object.fromEntries(
    Object.entries(map)
        .map(([k, v]) => {
            let [x, y] = k.split(',').map(Number);
            let points = [];
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    let _v = v + i + j;
                    if (_v > 9) _v = (_v + 1) % 10;
                    points.push([
                        [x + (mx + 1) * i, y + (my + 1) * j] + '',
                        _v
                    ]);
                }
            }
            return points;
        })
        .flat()
);

t = performance.now();
let p2 = dij2('0,0', `${(mx + 1) * 5 - 1},${(my + 1) * 5 - 1}`, map2);
console.log('Part 2', p2, `(took ${performance.now() - t}ms)`);
