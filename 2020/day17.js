//AOC2020 D17
import data from './day17_input.js';

function parse(str, d = 3) {
    let map = new Set();
    str.split('\n').forEach((l, i) => {
        l.split('').forEach((v, j) => {
            if (v === '#') {
                map.add([i, j, ...Array(d - 2).fill(0)] + '');
            }
        });
    });
    return map;
}

function toIntList(s) {
    return s.split(',').map((s) => parseInt(s, 10));
}

function range(f, t) {
    return [...Array(t - f + 1)].map((_, i) => i + f);
}

function getKeys(ranges, arr = []) {
    if (!ranges.length) {
        return arr;
    }
    let [head, ...rest] = ranges;
    let [min, max] = head;
    if (!arr.length) {
        return getKeys(
            rest,
            range(min, max).map((i) => i + '')
        );
    }
    return getKeys(
        rest,
        arr.map((a) => range(min, max).map((i) => [a, i].join(','))).flat()
    );
}

function getNeighbors(s) {
    return getKeys(toIntList(s).map((i) => [i - 1, i + 1])).filter(
        (a) => a !== s
    );
}

function cycle(map) {
    let _map = new Set();
    let keys = new Set([...map].map((s) => getNeighbors(s)).flat());
    keys.forEach((k) => {
        let neighbors = getNeighbors(k);
        let actives = neighbors.filter((n) => map.has(n)).length;
        let _v;
        if (map.has(k)) {
            if (actives === 2 || actives === 3) {
                _map.add(k);
            }
        } else {
            if (actives === 3) {
                _map.add(k);
            }
        }
    });
    return _map;
}

function simulate(str, d = 3) {
    let t0 = Date.now();
    let map = parse(str, d);
    let i = 0;
    while (i < 6) {
        map = cycle(map);
        i++;
    }
    return `${map.size} (${(Date.now() - t0) / 1000}s)`;
}

console.log(simulate(data()));
console.log(simulate(data(), 4));

function sample() {
    return `.#.
..#
###`;
}
