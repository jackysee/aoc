import data from './day8_input.ts';
// import data from './day8_sample.ts';

interface Instruction {
    op: string;
    a: number;
    b: number;
}
let arr: Instruction[] = data()
    .split('\n')
    .map((l) => {
        let [a, b] = l.match(/\d+/g)!.map(Number);
        let op = '';
        if (l.startsWith('rect')) op = 'rect';
        if (l.startsWith('rotate column')) op = 'col';
        if (l.startsWith('rotate row')) op = 'row';
        return { op, a, b };
    });

const M = Array.from({ length: 6 }, () => Array.from({ length: 50 }, () => 0));

const rotate = (arr: number[], by: number) => {
    const r = Array.from({ length: arr.length }, () => 0);
    arr.forEach((a, i) => (r[(i + by) % arr.length] = a));
    return r;
};

arr.forEach((i) => {
    if (i.op === 'rect') {
        for (let y = 0; y < i.b; y++) for (let x = 0; x < i.a; x++) M[y][x] = 1;
    }
    if (i.op === 'col') {
        let col = M.reduce((a, c) => [...a, c[i.a]], []);
        col = rotate(col, i.b);
        M.forEach((r, ri) => (r[i.a] = col[ri]));
    }
    if (i.op === 'row') {
        M[i.a] = rotate(M[i.a], i.b);
    }
});

console.log(
    'Part 1',
    M.flat().reduce((a, c) => a + c, 0)
);
console.log('Part 2');
for (let y = 0; y < M.length; y++) {
    let l = '';
    for (let x = 0; x < M[0].length; x++) {
        l += M[y][x] === 1 ? '█' : ' ';
    }
    console.log(l);
}
