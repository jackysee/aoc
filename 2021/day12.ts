import data from './day12_input.ts';
// import data from './day12_sample.ts';

let G: { [key: string]: string[] } = {};
data()
    .split('\n')
    .forEach((s) => {
        let [n1, n2] = s.split('-');
        G[n1] = G[n1] || [];
        G[n2] = G[n2] || [];
        G[n1].push(n2);
        G[n2].push(n1);
    });

const findPaths = (from: string, to: string, allowTwice = false) => {
    const queue = [{ node: from, nodes: new Set(), canVisit: true }];
    let allPaths = 0;
    while (queue.length) {
        let q = queue.pop()!;
        if (q.node === to) {
            allPaths++;
            continue;
        }
        G[q.node].forEach((node) => {
            if (node === from) return;
            let canVisit = q.canVisit;
            if (node.toLowerCase() === node) {
                let hasNode = q.nodes.has(node);
                if (hasNode && allowTwice && canVisit) {
                    canVisit = false;
                } else if (hasNode) {
                    return;
                }
            }
            let nodes = new Set([...q.nodes, node]);
            queue.push({ node, nodes, canVisit });
        });
    }
    return allPaths;
};

console.log('Part 1', findPaths('start', 'end', false));
console.log('Part 2', findPaths('start', 'end', true));
