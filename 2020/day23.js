//AOC2020 D22
import data from './day23_input.js';

function getInfo(str, end) {
    let arr = str.split('').map((s) => parseInt(s, 10));
    let min = Math.min(...arr);
    let max = Math.max(...arr);
    let _map = [];
    arr.forEach((n, i) => {
        let val = i + 1 === arr.length ? (end ? max + 1 : arr[0]) : arr[i + 1];
        _map[n] = val;
    });
    if (end) {
        max = end;
        _map[end] = arr[0];
    }
    let map = {
        get(i) {
            return _map[i] || i + 1;
        },
        set(i, val) {
            _map[i] = val;
        },
        get size() {
            return _map.length;
        }
    };
    return { map, min, max, curr: arr[0], len: end || arr.length };
}

function getNext(map, n, count = 1) {
    let result = [],
        idx = n;
    for (let i = 0; i < count; i++) {
        result.push(map.get(idx));
        idx = map.get(idx);
    }
    return result;
}

function insert(map, v, next) {
    let end = map.get(v);
    next.forEach((n) => {
        map.set(v, n);
        v = n;
    });
    map.set(v, end);
    return map;
}

function game(str, moves = 100, end) {
    let { min, max, map, curr, len } = getInfo(str, end);
    let i = 0;
    let t = Date.now();
    while (i < moves) {
        i++;
        let next = getNext(map, curr, 3);
        map.set(curr, map.get(next[2]));

        let v = curr;
        while (true) {
            v -= 1;
            if (v < min) v = max;
            if (v === curr || next.includes(v)) {
                continue;
            }
            curr = map.get(curr);
            insert(map, v, next);
            break;
        }
    }
    console.log(`time: ${Date.now() - t}ms, map:${map.size}`);
    return {
        getArr: (_len) => getNext(map, 1, _len || len - 1)
    };
}

// console.log(game('389125467').getArr().join(''));
console.log(game(data()).getArr().join(''));

// console.log(game('389125467', 10000000, 1000000).getArr(2).reduce((a,c) => a * c, 1)); //934001 * 159792 = 149245887792
console.log(
    game(data(), 10000000, 1000000)
        .getArr(2)
        .reduce((a, c) => a * c, 1)
);
