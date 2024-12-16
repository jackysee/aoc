//AOC2019 D2
import data from './day2_input.js';

//part 1
var list = data()
    .split(',')
    .map((s) => parseInt(s, 10));
var list1 = [...list];
list1[1] = 12;
list1[2] = 2;

function process(list, pos = 0) {
    let [op, v1, v2, d] = list.slice(pos);
    if (op === 99) return list[0];
    if (op === 1) list[d] = list[v1] + list[v2];
    if (op === 2) list[d] = list[v1] * list[v2];
    return process(list, pos + 4);
}

console.log(process(list1));

//part2
// noprotect
var answer = 19690720;
loop: for (let i = 0; i <= 99; i++) {
    for (let j = 0; j <= 99; j++) {
        let _list = [...list];
        _list[1] = i;
        _list[2] = j;
        if (process(_list) === answer) {
            console.log(i * 100 + j);
            break loop;
        }
    }
}
