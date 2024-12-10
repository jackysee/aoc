import data from './day5_input.ts';
// import data from './day5_sample.ts';
let arr: number[] = data().split('\n').map(Number);

function pg(part2 = false) {
    let _arr = [...arr];
    let i = 0;
    let jump = 0;
    while (_arr[i] !== undefined) {
        let current = i;
        i += _arr[current];
        if(part2) {
            _arr[current] += _arr[current] >= 3? -1 : 1;
        } else {
            _arr[current] += 1;
        }
        jump++;
    }
    return jump;
}
console.log('Part 1', pg());
console.log('Part 2', pg(true));
