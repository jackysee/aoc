import data from './day2_input.ts';

let arr: number[][] = data()
    .split('\n')
    .map((l) =>
        l
            .split(/\s+/)
            .map(Number)
            .sort((a, b) => b - a)
    );
console.log(
    'Part 1',
    arr.reduce((a, c) => a + c.at(0)! - c.at(-1)!, 0)
);

console.log(
    'Part 2',
    arr
        .map((row) =>
            row.flatMap((n1, ni) => {
                let n2 = row.slice(ni + 1).find((n2) => n1 % n2 === 0);
                if (n2) return [n1 / n2];
                return [];
            })
        )
        .flat()
        .reduce((a, c) => a + c, 0)
);
