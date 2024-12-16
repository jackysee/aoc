//AOC2018 D1
import data from './day1_input.js';

function parse(s) {
    return s.split('\n').map(Number);
}

console.log(parse(data()).reduce((a, c) => a + c, 0));

function part2(str) {
    let nums = parse(str);
    let s = new Set();
    let freq = 0;
    let i = 0;
    while (true) {
        let n = nums[i % nums.length];
        freq += n;
        if (s.has(freq)) {
            return freq;
        }
        s.add(freq);
        i++;
    }
}

console.log(part2(data()));
