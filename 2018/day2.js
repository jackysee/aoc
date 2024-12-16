//AOC2018 D2
import data from './day2_input.js';
function parse(s) {
    return s.split('\n');
}

function part1(s) {
    let list = parse(s);
    let two = 0;
    let three = 0;
    list.forEach((l) => {
        let s = new Set(l.split(''));
        let twoCounted = false;
        let threeCounted = false;
        [...s].forEach((i) => {
            if (twoCounted && threeCounted) {
                return;
            }
            let c = l.match(new RegExp(i, 'g')).length;
            if (!twoCounted && c === 2) {
                two++;
                twoCounted = true;
            }
            if (!threeCounted && c === 3) {
                three++;
                threeCounted = true;
            }
        });
    });
    return two * three;
}

function part2(s) {
    let list = parse(s);
    let result;
    list.forEach((l1) => {
        if (result) return;
        list.forEach((l2) => {
            if (result) return;
            if (l1 === l2) return;
            let diff = [];
            l1.split('').forEach((l, i) => {
                if (l !== l2[i]) diff.push(i);
            });
            if (diff.length === 1) {
                result = l1.slice(0, diff[0]) + l1.slice(diff[0] + 1);
            }
        });
    });
    return result;
}

console.log(part1(data()));
console.log(part2(data()));
