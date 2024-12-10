import data from './day23_input.ts';

let arr: string[][] = data()
    .split('\n')
    .map((l) => l.match(/[^, ]+/g)!);

function run(r: Record<string, number>) {
    let idx = 0;
    while (arr[idx]) {
        let [op, a, b] = arr[idx];
        if (op === 'hlf') r[a] /= 2;
        if (op === 'tpl') r[a] *= 3;
        if (op === 'inc') r[a] += 1;
        if (!/^j/.test(op)) idx += 1;
        if (op === 'jmp') idx += +a;
        if (op === 'jie') idx += r[a] % 2 === 0 ? +b : 1;
        if (op === 'jio') idx += r[a] === 1 ? +b : 1;
    }
    return r;
}

console.log('Part 1', run({ a: 0, b: 0 }).b);
console.log('Part 2', run({ a: 1, b: 0 }).b);
