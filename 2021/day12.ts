// import data from './day12_input.ts';
import data from './day12_sample.ts';

let G = data()
    .split('\n')
    .reduce((a: { [key: string]: string[] }, s) => {
        let [n1, n2] = s.split('-');
        a[n1] = a[n1] || [];
        a[n2] = a[n2] || [];
        a[n1].push(n2);
        a[n2].push(n1);
        return a;
    }, {});

const isSmall = (s: string) => s.toLowerCase() === s;

const findPaths = (from: string, to: string) => {
    const queue = [{ node: from, paths: [from] }];
    const paths = [];
    let twiceNode: string;
    while (queue.length) {
        let q = queue.shift();
        if (q?.node === to) {
            paths.push(q.paths);
            continue;
        }
        let nodes = G[q?.node || ''].filter((n) => {
            if (isSmall(n)) {
                if (n === from) return false;
                let len = (q?.paths || []).filter((_n) => _n === n).length;
                // if (twiceNode && n === twiceNode && len === 1) return true;
                // if (twiceNode === undefined) twiceNode = n;
                return len === 0;
            }
            return true;
        });
        queue.push(
            ...nodes.map((n) => ({
                node: n,
                paths: [...(q?.paths || []), n]
            }))
        );
    }
    return paths;
};

let paths = findPaths('start', 'end');
console.log(paths.map((p) => p.join(',')));
console.log('Part 1', paths.length);
