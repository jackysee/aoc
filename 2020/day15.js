//AOC2020 D14
import data from './day15_input.js';

function parse(s) {
    return s.split(',').map((s) => parseInt(s, 10));
}

function game(str, round) {
    let list = parse(str);
    let nums = new Map();
    let current;
    for (let i = 0; i < round; i++) {
        if (i < list.length) {
            current = list[i];
        } else {
            let n = nums.get(current);
            current = n.last2 === undefined ? 0 : n.last - n.last2;
        }
        if (nums.has(current)) {
            let n = nums.get(current);
            n.last2 = n.last;
            n.last = i;
        } else {
            nums.set(current, { last: i });
        }
    }
    return current;
}

// console.log(game('0,3,6', 2020));
console.log(game(data(), 2020));
console.log(game(data(), 30000000));
