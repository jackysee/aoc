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

const setOfThree = new Set(
    Object.keys(M).flatMap((a) => {
        return M[a].flatMap((b) => {
            return M[b]
                .filter((c) => M[a].includes(c))
                .filter((c) => [a, b, c].some((n) => n.startsWith('t')))
                .map((c) => [a, b, c].sort() + '');
        });
    })
);
console.log('A', setOfThree.size);

//Bron-Kerbosch algorithm
let maxlen = 0;
const cliques = [];
const findCliques = (P, R = new Set(), X = new Set()) => {
    if (P.size === 0 && X.size === 0) {
        if (R.size > maxlen) maxlen = R.size;
        cliques.push([...R].sort());
    }
    [...P].forEach((n) => {
        const V = new Set([n]);
        const N = new Set(M[n]);
        findCliques(P.intersection(N), R.union(V), X.intersection(N));
        P = P.difference(V);
        X = X.union(V);
    });
};
findCliques(new Set(Object.keys(M)));
console.log('B', cliques.filter((a) => a.length === maxlen)[0].join(','));
