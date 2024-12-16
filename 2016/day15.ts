import data from './day15_input.ts';
// import data from './day15_sample.ts';
const arr: number[][] = data()
    .split('\n')
    .map((l) => {
        let m = l.match(/\d+/g)!;
        return [+m[1], +m[3]];
    });

const tick = (arr: number[][], t: number) =>
    arr.map((a) => [a[0], (a[1] + t) % a[0]]);

const play = (arr: number[][], t: number) => {
    let discs = arr.map((a) => [...a]);
    discs = tick(discs, t);
    for (let x = 0; x < discs.length; x++) {
        discs = tick(discs, 1);
        if (discs[x][1] !== 0) return false;
    }
    return true;
};

const findTime = (discs: number[][]) => {
    let t = 0;
    while (!play(discs, t)) t++;
    return t;
};

console.log('Part 1', findTime(arr));
console.log('Part 2', findTime([...arr, [11, 0]]));
