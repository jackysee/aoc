import data from './day15_input.ts';
// import data from './day15_sample.ts';

let ingredients = data()
    .split('\n')
    .map((l: string) => {
        let name = l.match(/^\w+/)![0];
        let [a, b, c, d, calories] = l.match(/-?\d+/g)!.map(Number);
        return { name, attrs: [a, b, c, d], calories };
    });

let result = [];
for (let i = 0; i <= 100; i++) {
    for (let j = 0; j <= 100 - i; j++) {
        for (let k = 0; k <= 100 - i - j; k++) {
            for (let l = 0; l <= 100 - i - j - k; l++) {
                if (i + j + k + l !== 100) continue;
                const score = [0, 1, 2, 3].reduce((a, c) => {
                    return (
                        a *
                        Math.max(
                            [i, j, k, l].reduce(
                                (_a, _c, _ci) =>
                                    _a + ingredients[_ci].attrs[c] * _c,
                                0
                            ),
                            0
                        )
                    );
                }, 1);
                const calories = [i, j, k, l].reduce(
                    (a, c, ci) => a + ingredients[ci].calories * c,
                    0
                );
                if (score > 0) result.push([score, calories, i, j, k, l]);
            }
        }
    }
}

let max = 0;
result.forEach((r) => (max = r[0] > max ? r[0] : max));
console.log('Part 1', max);

max = 0;
result
    .filter((r) => r[1] === 500)
    .forEach((r) => (max = r[0] > max ? r[0] : max));
console.log('Part 2', max);

// console.log(result.filter((r) => r[1] === 500).sort((a, b) => b[0] - a[0]));
