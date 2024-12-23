import data from './day23_input.js';
// import data from './day23_sample.js';
const M = {};
data()
    .split('\n')
    .map((l) => {
        const [c1, c2] = l.split('-');
        M[c1] = M[c1] ?? [];
        M[c1].push(c2);
        M[c2] = M[c2] ?? [];
        M[c2].push(c1);
    });

// console.log(Math.max(...Object.values(M).map((l) => l.length)));

const setOfThree = new Set(
    Object.keys(M).flatMap((a) => {
        const as = M[a];
        return as.flatMap((b) => {
            const cs = M[b].filter((c) => as.includes(c));
            if (!cs.length) return [];
            return cs.map((c) => [a, b, c].sort() + '');
        });
    })
);

console.log('A', [...setOfThree].filter((s) => /t[^,]/.test(s)).length);

const cliques = [];
const findCliques = (P, R = new Set(), X = new Set()) => {
    if (P.size === 0 && X.size === 0) {
        cliques.push([...R].sort());
        return 1;
    }
    let c = 0;
    [...P].forEach((n) => {
        const V = new Set([n]);
        const N = new Set(M[n]);
        c += findCliques(P.intersection(N), R.union(V), X.intersection(N));
        P = P.difference(V);
        X = X.union(V);
    });
    return c;
};

findCliques(new Set(Object.keys(M)));

const maxLen = Math.max(...cliques.map((a) => a.length));
const cs = cliques.filter((a) => a.length === maxLen);
console.log('B', cs[0].join(','));
