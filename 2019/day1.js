//aoc2019 d1
import data from './day1_input.js';

// part 1
var list = data().split('\n');
console.log(
    list
        .map((s) => Math.floor(parseInt(s, 10) / 3) - 2)
        .reduce((a, i) => a + i, 0)
);

//part 2
var getFuel = (num) => {
    let fuel = Math.floor(num / 3) - 2;
    if (fuel <= 0) return 0;
    return fuel + getFuel(fuel);
};

console.log(
    list.map((s) => getFuel(parseInt(s, 10))).reduce((a, i) => a + i, 0)
);
