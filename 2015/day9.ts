import data from './day9_input.ts';

let arr: string[] = data().split('\n');
let M: { [key: string]: { [key: string]: number } } = {};
let places: Set<string> = new Set();
arr.forEach((l) => {
    let [p, dist] = l.split(' = ');
    let [from, to] = p.split(' to ');
    M[from] = M[from] || {};
    M[to] = M[to] || {};
    M[from][to] = Number(dist);
    M[to][from] = Number(dist);
    places.add(from);
    places.add(to);
});

interface Item {
    place: string;
    dist: number;
    visited: string[];
}

const allVisited = (visited: string[]) =>
    [...places].every((p) => visited.includes(p));

function run() {
    let queue: Item[] = Object.keys(M).map((s) => ({
        place: s,
        dist: 0,
        visited: [s]
    }));
    const dists = [];
    while (queue.length) {
        let p = queue.pop()!;
        if (allVisited(p.visited)) {
            dists.push(p.dist);
        }
        if (!M[p.place]) continue;
        Object.entries(M[p.place]).forEach(([k, v]) => {
            if (p.visited.includes(k)) return;
            queue.push({
                place: k,
                dist: p.dist + v,
                visited: [...p.visited, k]
            });
        });
    }
    return dists;
}

const dists = run();
console.log('Part 1', Math.min(...dists));
console.log('Part 2', Math.max(...dists));
