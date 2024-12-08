import data from './day6_input.ts';
// const data = () => '0 2 7 0';
let arr: number[] = data().split(/\s+/).map(Number);

let cycles = 0;
let repeated = 0;
let result: Set<string> = new Set();
while (true) {
    let m = Math.max(...arr);
    let i = arr.findIndex((n) => n === m);
    let c = arr[i];
    arr[i] = 0;
    let d = 1;
    while (c !== 0) {
        let _i = (i + d) % arr.length;
        arr[_i] += 1;
        d++;
        c--;
    }
    cycles++;
    let s = arr.join(',');
    if (result.has(s)) {
        if (repeated === 0) {
            console.log('Part 1', cycles);
            repeated = 1;
            cycles = 0;
            result = new Set([s]);
            continue;
        }
        console.log('Part 2', cycles);
        break;
    }
    result.add(s);
}
