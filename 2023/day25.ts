import data from './day25_input.ts';
// import fs from 'node:fs';
// import data from './day25_sample.ts';
// const M:Record<string, string[]> = {};
const C:Record<string, string[]> = {};
data().split('\n').map(l => {
    const [node, ...rest] = l.match(/\w+/g)!;
    // M[node] = rest;
    C[node] = C[node] || [];
    C[node].push(...rest);
    rest.forEach(c => {
        C[c] = C[c] || [];
        C[c].push(node);
    });
});

const countNode = (node:string, cuts:string[] =[], freq?:Record<string,number>) => {
    const queue = [node];
    const seen = new Set();
    while(queue.length) {
        const q = queue.shift()!;
        const neighbors = C[q].filter((n) => !cuts.some(c=>c === [q,n].toSorted()+''));
        neighbors.forEach((n) => {
            if(seen.has(n)) return;
            seen.add(n);
            if(freq) {
                const key = [q,n].toSorted()+'';
                freq[key] = (freq[key] || 0) + 1;
            }
            queue.push(n);
        });
    }
    return seen.size;
}

console.time('A');
const freq:Record<string,number> = {}
const nodes = Object.keys(C);
nodes.forEach(n => countNode(n, [], freq));
const edges = Object.entries(freq).toSorted((a,b) => b[1]-a[1]).map(c=>c[0]);
//If we are lucky first three is the answer
const reached = countNode(nodes[0], edges.slice(0,3));
console.log('A', reached * (nodes.length - reached)) 
console.timeEnd('A');

// Using graphviz
// const nodes = Object.keys(C);
// const createDotFileStr = () => {
//     let result = 'graph { \n';
//     Object.entries(M).forEach(([k,arr]) => {
//         arr.forEach(n => {
//             result += `${k} -- ${n}\n`
//         });
//     });
//     result += '}'
//     return result;
// }
// // fs.writeFileSync('./day25.dot', createDotFileStr());
// // console.log(createDotFileStr())
// // /opt/homebrew/bin/dot -Tsvg -Kneato day25.dot > day25.svg

// const cuts = [
//     ['xgz', 'klk'],
//     ['cbl', 'vmq'],
//     ['nvf', 'bvz']
// ];
// const reached = countNode(nodes[0], cuts);
// console.log('A', reached * (nodes.length - reached));

