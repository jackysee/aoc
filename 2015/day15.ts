import data from './day15_input.ts';

const ingredients = data()
    .split('\n')
    .map((l: string) => l.match(/-?\d+/g)!.map(Number));

const result = [];
for (let i = 0; i <= 100; i++) {
    for (let j = 0; j <= 100 - i; j++) {
        for (let k = 0; k <= 100 - i - j; k++) {
            let l = 100 - i - j - k;
            let totals = [0, 1, 2, 3, 4].map((c) => {
                return Math.max(
                    [i, j, k, l].reduce(
                        (a, p, pi) => a + ingredients[pi][c] * p,
                        0
                    ),
                    0
                );
            });
            let score = totals.slice(0, -1).reduce((a, c) => a * c, 1);
            let calories = totals.at(-1);
            if (score > 0) result.push([score, calories]);
        }
    }
}

let max = 0;
result.forEach((r) => (max = r[0]! > max ? r[0]! : max));
console.log('Part 1', max);

max = 0;
result
    .filter((r) => r[1] === 500)
    .forEach((r) => (max = r[0]! > max ? r[0]! : max));
console.log('Part 2', max);

// console.log(result.filter((r) => r[1] === 500).sort((a, b) => b[0] - a[0]));
