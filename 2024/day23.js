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

console.log(M);

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

console.log(setOfThree);
console.log([...setOfThree].filter((s) => /t[^,]/.test(s)).length);
