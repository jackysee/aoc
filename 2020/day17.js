//AOC2020 D17

function parse(str, d = 3) {
    let map = new Map();
    str.split('\n').forEach((l, i) => {
        l.split('').forEach(
            (v,j) => map.set([i,j,...Array(d-2).fill(0)]+'', v)
        );
    });
    return map;
}

function toIntList(s) { 
    return s.split(',').map(s => parseInt(s, 10)); 
}

function range(f, t) {
    return [...Array(t - f + 1)].map((_, i) => i + f);
}

function getKeys(ranges, arr = []) {
    if(!ranges.length) {
        return arr;
    }
    let [head, ...rest] = ranges;
    let [min,max] = head;
    if(!arr.length) {
        return getKeys(rest, range(min,max).map(i => i+''));
    }
    return getKeys(rest, arr.map(a => range(min, max).map(i => [a, i].join(','))).flat());
}

function getNeighbors(s) {
    return getKeys(toIntList(s).map(i => [i-1, i+1])).filter(a => a !== s);
}


function cycle(map) {
    let _map = new Map();
    let s = [];
    map.forEach((_, k) => {
        toIntList(k).forEach((n, i) => {
            s[i] = s[i] ?? [];
            s[i].push(n);
        });
    });
    let ranges = s.map((a, i) => [ Math.min(...a) - 1, Math.max(...a) +1 ] );
    let keys = getKeys(ranges);
    keys.forEach(k => {
        let v = map.get(k);
        let neighbors = getNeighbors(k);
        let actives = neighbors.filter(n => map.get(n) === '#').length;
        let _v;
        if(v === '#') {
            _v = (actives === 2 || actives === 3) ? '#' : '.';
        }
        if(v !== '#') {
            _v = (actives === 3) ? '#' : '.';
        } 
        _map.set(k, _v);
    });
    return _map;
}


function simulate(str, d = 3) {
    let map = parse(str, d);
    let i = 0;
    while(i < 6) {
        map = cycle(map);
        i++;
    }
    return [...map.values()].filter(v => v === '#').length;
}

console.log(simulate(data()));
console.log(simulate(data(), 4));




function sample() {
    return `.#.
..#
###`;
}

function data() {
    return `.##.##..
..###.##
.##....#
###..##.
#.###.##
.#.#..#.
.......#
.#..#..#`;
}

