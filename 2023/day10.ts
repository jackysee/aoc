import data from './day10_input.ts';
// import data from './day10_sample.ts';
const M: Record<string, string> = {};
let S: number[] = [0, 0];
data()
    .split('\n')
    .forEach((l, y) => {
        l.split('').forEach((c, x) => {
            M[[x, y] + ''] = c;
            if (c === 'S') S = [x, y];
        });
    });

console.log(M, S);

/*
.....
.F-7.
.|.|.
.L-J.
.....
    */
const getPipe = ([x, y]: number[]) => {
    let up: string | undefined = M[[x, y - 1] + ''];
    let down: string | undefined = M[[x, y + 1] + ''];
    let left: string | undefined = M[[x - 1, y] + ''];
    let right: string | undefined = M[[x + 1, y] + ''];
    if (up && 'L-J'.includes(up)) up = undefined;
    if (down && 'F-7'.includes(down)) down = undefined;
    if (left && '7|J'.includes(left)) left = undefined;
    if (right && 'F|L'.includes(right)) right = undefined;
    if (up && down) return '|';
    if (left && right) return '-';
    if (left && down) return '7';
    if (right && down) return 'F';
    if (up && right) return 'L';
    if (up && left) return 'J';
};
const S_pipe = getPipe(S)!;

const getPaths = ([x, y]: number[]) => {
    let c = M[[x, y] + ''];
    if (c === 'S') c = S_pipe;
    if (c === '-')
        return [
            [x - 1, y],
            [x + 1, y]
        ];
    if (c === '|')
        return [
            [x, y - 1],
            [x, y + 1]
        ];
    if (c === 'F')
        return [
            [x + 1, y],
            [x, y + 1]
        ];
    if (c === 'J')
        return [
            [x, y - 1],
            [x - 1, y]
        ];
    if (c === '7')
        return [
            [x - 1, y],
            [x, y + 1]
        ];
    if (c === 'L')
        return [
            [x + 1, y],
            [x, y - 1]
        ];
};

const eq = (a: number[], b: number[]) => a.every((n, i) => b[i] === n);

// console.log(M[S + '']);
console.log(getPaths(S));

let last = S;
let c = getPaths(S)![0]!;
let count = 1;
const P: number[][] = [S];
while (!eq(c, S)) {
    P.push(c);
    const paths = getPaths(c)!.filter((p) => !eq(p, last));
    last = [...c];
    c = [...paths[0]];
    count++;
}
console.log('A', count / 2);
// console.log(P);

// const getNeighbor = (pos: number[]) => {
//     const [x, y] = pos;
//     const result: number[][] = [];
//     [-1, 0, 1].forEach((dx) => {
//         [-1, 0, 1].forEach((dy) => {
//             if (dx !== 0 && dy !== 0) result.push([x + dx, y + dy]);
//         });
//     });
// };

// const bounds = new Set(P.map((p) => p + ''));
// const visited = new Set();
// visited.add(S + '');
// const queue = [S];
// while (queue.length) {
//     let pos = queue.shift()!;
//     let points = getNeighbor(pos);
//     points.forEach(p => {
//         // if(bounds.has(p+''))

//     });
// }
