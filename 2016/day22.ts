import { combinations } from 'https://deno.land/x/combinatorics/mod.ts';
import { BinaryHeap } from 'https://deno.land/x/collections@0.11.2/mod.ts';
import data from './day22_input.ts';
// import data from './day22_sample.ts';
interface Node {
    pos: string;
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
        return { pos: [x, y] + '', size, used, avail };
    });

console.log(
    'Part 1',
    [...combinations(arr, 2)].filter(([a, b]) => {
        return (
            (a.used > 0 && b.avail > a.used) || (b.used > 0 && a.avail > b.used)
        );
    }).length
);

let M: Record<string, Node> = Object.fromEntries(arr.map((a) => [a.pos, a]));

interface Item {
    pos: string;
    value: number;
    map: Record<string, Node>;
}

let mx = Math.max(...arr.map((a) => +a.pos.split(',')[0]));
let minSize = M[`${mx},0`].used;

function getNeigbours({ pos, map }: Item, visited: Set<string>) {
    let [x, y] = pos.split(',').map(Number);
    let currentNode = map[pos];
    return [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1]
    ]
        .map((a) => a + '')
        .filter((p) => {
            if (map[p] === undefined) return false;
            if (visited.has(p)) return false;
            let target = map[p];
            if (target.size < minSize) return false;
            if (currentNode.avail < target.used) return false;
            return true;
        });
}

const cloneMap = (M: Record<string, Node>) =>
    Object.fromEntries(Object.entries(M).map(([k, v]) => [k, { ...v }]));

const move = (from: Node, to: Node) => {
    to.used += from.used;
    to.avail -= from.used;
    from.used = 0;
    from.avail = from.size;
};

function dij(
    from: string,
    to: string,
    map: Record<string, Node>,
    avoid: string
) {
    let visited = new Set<string>([avoid]);
    let D: Record<string, [number, Record<string, Node>]> = {};
    D[from] = [0, cloneMap(map)];
    let PQ: BinaryHeap<Item> = new BinaryHeap<Item>(
        (a: Item, b: Item) => a.value - b.value
    );
    PQ.push({ pos: from, value: 0, map: cloneMap(map) });
    while (!PQ.isEmpty()) {
        let u = PQ.pop()!;
        getNeigbours(u, visited).forEach((p) => {
            let d = (D[u.pos][0] as number) + 1;
            if (d < (D[p]?.[0] || Infinity)) {
                let M = cloneMap(u.map);
                move(M[p], M[u.pos]);
                D[p] = [d, M];
                PQ.push({ pos: p, value: d, map: M });
            }
        });
        visited.add(u.pos);
    }
    return D[to];
}

let current = arr.find((a) => a.used === 0)!.pos;
let dist = 0;
let G = mx;
while (true) {
    //move in front of G
    let result = dij(current, `${G - 1},0`, M, `${G},0`);
    M = result[1];
    dist += result[0];

    //move data from G to current
    move(M[`${G},0`], M[`${G - 1},0`]);
    dist += 1;
    current = `${G},0`;
    G -= 1;

    if (G === 0) break;
}
console.log('Part 2', dist);
