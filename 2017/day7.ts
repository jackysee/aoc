import data from './day7_input.ts';
let M: Record<string, string[]> = {};
let W: Record<string, number> = {};
data()
    .split('\n')
    .forEach((l) => {
        let m = l.match(/[a-z]+/g)!;
        M[m[0]] = m.slice(1);
        W[m[0]] = Number(l.match(/\d+/)![0]);
    });

let keys = Object.keys(M);
let leafs = new Set(Object.values(M).flat());
let root = keys.find((k) => !leafs.has(k))!;
console.log('Part 1', root);

function findWeight(node: string): number {
    return W[node] + M[node].reduce((a, c) => a + findWeight(c), 0);
}

function findUnbalance(node: string, total: number = 0): number | undefined {
    let leafs = M[node];
    if (!leafs.length) return W[node];
    let weights = leafs.map((l) => findWeight(l));
    let s = new Set(weights);
    if (s.size > 1) {
        let w = [...s].sort(
            (a, b) =>
                weights.filter((w) => w === a).length -
                weights.filter((w) => w === b).length
        );
        let unbalanced = leafs[weights.findIndex((_w) => _w === w[0])];
        return findUnbalance(unbalanced, w[1]);
    } else {
        let diff = total - W[node] - weights.reduce((a, c) => a + c, 0);
        if (diff !== 0) return Math.abs(diff + W[node]);
    }
    return undefined;
}

console.log('Part 2', findUnbalance(root, findWeight(root)));
