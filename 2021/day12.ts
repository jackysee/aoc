import data from './day12_input.ts';
// import data from './day12_sample.ts';

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

const hasTwiceVisitedNode = (paths: string[]) => {
    let count: { [key: string]: number } = {};
    paths
        .slice(1)
        .filter(isSmall)
        .forEach((n) => {
            count[n] = count[n] || 0;
            count[n] += 1;
        });
    return Object.values(count).some((n) => n > 1);
};

const findPaths = (
    from: string,
    to: string,
    allowTwiceVisitSingleNode = false
) => {
    const queue = [{ node: from, paths: [from] }];
    const paths = [];
    while (queue.length) {
        let q = queue.shift();
        if (q?.node === to) {
            paths.push(q.paths);
            continue;
        }
        let _paths = q?.paths || [];
        let nodes = G[q?.node || ''].filter((n) => {
            if (isSmall(n)) {
                if (n === from) return false;
                let len = _paths.filter((_n) => _n === n).length;
                if (
                    allowTwiceVisitSingleNode &&
                    !hasTwiceVisitedNode(_paths) &&
                    len === 1
                )
                    return true;
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

console.log('Part 1', findPaths('start', 'end', false).length);
console.log('Part 2', findPaths('start', 'end', true).length);
