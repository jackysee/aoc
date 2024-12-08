import data from './day2_input.ts';
// import data from './day2_sample.ts';
let A = 0;
let B = 0;
const cubes = [12, 13, 14];
data()
    .split('\n')
    .forEach((l) => {
        const [idStr, setsStr] = l.split(':');
        const id = Number(idStr.match(/\d+/)![0]);
        const sets = setsStr.split(';').map((s) => {
            const set = [0, 0, 0];
            s.split(',').forEach((cubes) => {
                const [_, n, c] = cubes.match(/(\d+) (\w+)/)!;
                if (c === 'red') set[0] = +n;
                if (c === 'green') set[1] = +n;
                if (c === 'blue') set[2] = +n;
            });
            return set;
        });
        if (sets.every((s) => s.every((n, i) => n <= cubes[i]))) {
            A += id;
        }
        B += [0, 1, 2].reduce(
            (a, c) => a * Math.max(...sets.map((s) => s[c])),
            1
        );
    });
console.log('A', A);
console.log('B', B);
