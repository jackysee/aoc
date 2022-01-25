import data from './day24_input.ts';
// import data from './day24_sample.ts';
import { BinaryHeap } from 'https://deno.land/x/collections@0.11.2/mod.ts';
import { permutations } from 'https://deno.land/x/combinatorics/mod.ts';

let M: Record<string, string> = {};
let all: Record<string, string> = {};
data()
    .split('\n')
    .forEach((l, y) => {
        l.split('').forEach((n, x) => {
            if (n !== '#') M[[x, y] + ''] = n;
            if (/\d+/.test(n)) all[n] = [x, y] + '';
        });
    });

function getNeighbor(pos: string) {
    let [x, y] = pos.split(',').map(Number);
    return [[x, y - 1] + '', [x, y + 1] + '', [x - 1, y] + '', [x + 1, y] + ''];
}

interface Item {
    pos: string;
    dist: number;
}

let DP: Record<string, number> = {};
function findDist(p1: string, p2: string) {
    if (DP[[p1, p2].join(',')]) {
        return DP[[p1, p2].join(',')];
    }
    let visited = new Set([p1]);
    let PQ = new BinaryHeap<Item>((a: Item, b: Item) => a.dist - b.dist);
    PQ.push({ pos: p1, dist: 0 });
    while (PQ.length) {
        let p = PQ.pop()!;
        if (p.pos === p2) {
            DP[[p1, p2].join(',')] = p.dist;
            return p.dist;
        }
        getNeighbor(p.pos).forEach((pos) => {
            if (M[pos] === undefined) return;
            if (visited.has(pos)) return;
            visited.add(pos);
            PQ.push({ pos, dist: p.dist + 1 });
        });
    }
    return Infinity;
}

function findMinDist(arr: string[][]) {
    let dists = arr.map((a) => {
        return a.reduce((d, p, pi, arr) => {
            if (pi === 0) return d;
            return d + findDist(all[arr[pi - 1]], all[p]);
        }, 0);
    });
    return Math.min(...dists);
}

let targets = Object.keys(all).filter((i) => i !== '0');
let combo1 = [...permutations(targets, targets.length)].map((a) => ['0', ...a]);
console.log('Part 1', findMinDist(combo1));

let combo2 = combo1.map((a) => [...a, '0']);
console.log('Part 2', findMinDist(combo2));
