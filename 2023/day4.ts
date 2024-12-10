import data from './day4_input.ts';
// import data from './day4_sample.ts';

let A = 0;
let B = 0;
const won: Record<number, number> = {};
data()
    .split('\n')
    .forEach((l, i) => {
        const [winning, card] = l
            .substring(l.indexOf(':'))
            .split(' | ')
            .map((s) => [...s.matchAll(/\d+/g)].map(Number));
        const matches = card.filter((n) => winning.includes(n)).length;
        if (matches > 0) A += Math.pow(2, matches - 1);
        for (let j = 1; j <= matches; j++) {
            won[i + j] = (won[i + j] || 0) + (won[i] || 0) + 1;
        }
        B += (won[i] || 0) + 1;
    });
console.log('A', A);
console.log('B', B);
