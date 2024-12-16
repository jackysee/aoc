//AOC2018 D8
import data from './day8_input.js';

const sum = (list) => list.reduce((a, b) => a + b, 0);

function solve(s) {
    let list = s.split(' ').map(Number);
    // console.log(list);
    let nodes = [];
    let result = [];
    let treeId = 1;
    let allMetas = [];
    while (list.length > 0) {
        while (nodes.length > 0) {
            let n = nodes[nodes.length - 1];
            if (n.childLen === n.children.length) {
                if (n.metaLen !== n.metas.length) {
                    n.metas = list.slice(0, n.metaLen);
                    list = list.slice(n.metaLen);
                    allMetas.push(...n.metas);
                }
                result.push(n);
                nodes.pop();
                let last = nodes[nodes.length - 1];
                if (last) {
                    last.children.push(n.id);
                }
                continue;
            }
            break;
        }
        let childLen = list.shift();
        let metaLen = list.shift();
        nodes.push({
            id: treeId++,
            childLen,
            metaLen,
            children: [],
            metas: []
        });
    }
    // console.log(result);
    console.log('all metas = ', sum(allMetas));

    function getValue(id) {
        let node = result.find((r) => r.id === id);
        if (!node) return 0;
        if (node.childLen === 0) return sum(node.metas);
        return node.metas.reduce((a, c) => {
            return a + getValue(node.children[c - 1]);
        }, 0);
    }
    console.log('root node value', getValue(1));
}

// solve(sample());
solve(data());

function sample() {
    return `
2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2
    `.trim();
}
