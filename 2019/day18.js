//AOC2019 D18
import data from './day18_input.js';

function ints(s) {
    return s.split(',').map((s) => parseInt(s, 10));
}

function parse(str, modify = false) {
    let arr = str.split('\n').map((l) => l.split(''));
    let map = {};
    let keys = [];
    let doors = [];
    let start = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let v = arr[i][j];
            map[[i, j]] = v;
            let d = v.match(/[A-Z]/);
            d && doors.push({ val: d[0], pos: [i, j] });
            let k = v.match(/[a-z]/);
            k && keys.push({ val: k[0], pos: [i, j] });
            if (v === '@') start.push([i, j]);
        }
    }
    if (modify) {
        let [i, j] = start[0];
        map[[i - 1, j - 1]] = '@';
        map[[i + 1, j - 1]] = '@';
        map[[i - 1, j + 1]] = '@';
        map[[i + 1, j + 1]] = '@';
        map[[i, j]] = '#';
        map[[i - 1, j]] = '#';
        map[[i + 1, j]] = '#';
        map[[i, j - 1]] = '#';
        map[[i, j + 1]] = '#';
        start = [
            [i - 1, j - 1],
            [i + 1, j - 1],
            [i - 1, j + 1],
            [i + 1, j + 1]
        ];
    }
    return { map, doors, keys, start };
}

//console.log(parse(sample1()));

function bfs(start, dest, map) {
    let visited = new Set();
    let queue = [
        { p: start.pos, val: start.val, dist: 0, doors: [], keys: [] }
    ];
    while (queue.length !== 0) {
        if (queue.length % 10000 === 0) {
            console.log(queue.length);
        }
        let pos = queue.shift();
        if (pos.p + '' === dest.pos + '') {
            return { dist: pos.dist, doors: pos.doors, keys: pos.keys };
        }
        let [x, y] = pos.p;
        let points = [
            [x - 1, y],
            [x + 1, y],
            [x, y - 1],
            [x, y + 1]
        ]
            .filter((p) => map[p] !== '#' && !visited.has(p + ''))
            .map((p) => {
                return {
                    p,
                    dist: pos.dist + 1,
                    doors: [
                        ...pos.doors,
                        /[A-Z]/.test(map[p]) ? map[p] : false
                    ].filter(Boolean),
                    keys: [
                        ...pos.keys,
                        /[a-z]/.test(map[p]) && map[p] !== dest.val
                            ? map[p]
                            : false
                    ].filter(Boolean)
                };
            });
        points.forEach((p) => visited.add(p.p + ''));
        queue = [...queue, ...points];
    }
    return -1;
}

function graph(data) {
    let { keys, start, map } = data;
    let pts = [...keys, ...start.map((p, i) => ({ val: `@${i}`, pos: p }))];
    let graph = {};
    pts.forEach((k) => {
        graph[k.val] = Object.fromEntries(
            pts
                .map((p) => {
                    if (k.val === p.val) return false;
                    let path = bfs(k, p, map);
                    if (path == -1) return false; //node unreachable
                    return [p.val, path];
                })
                .filter(Boolean)
            //.filter(p => p[1].keys.length === 0)
        );
    });
    return graph;
}

function key(from, keys) {
    return `${from}-${[...keys].sort()}`;
}

let memo = {};
function dist(G, from = '@0', keys = new Set()) {
    let m = memo[key(from, keys)];
    if (m !== undefined) {
        return m;
    }
    // console.log('dist', from, keys);
    let nodes = Object.entries(G[from]).filter(([n, { doors }]) => {
        return (
            !keys.has(n) &&
            doors.filter((d) => !keys.has(d.toLowerCase())).length === 0
        );
    });
    if (nodes.length === 0) {
        return [0, from, keys];
    }
    let distArr = nodes.map(([n, v]) => {
        let [d, _from, _keys] = dist(
            G,
            n,
            new Set([...keys, ...v.keys, n, from])
        );
        return [v.dist + d, _from, _keys];
    });
    // console.log(`${from} -->`, nodes.map(([n]) => n));
    // console.log(distArr);
    let min = distArr[0][0],
        idx = 0;
    distArr.forEach((d, i) => {
        if (d[0] < min) {
            min = d[0];
            idx = i;
        }
    });
    let r = distArr[idx];
    memo[key(from, keys)] = r;
    return r;
}

// let G = graph(parse(sample1())); //86
// let G = graph(parse(sample2())); //132
// let G = graph(parse(sample3())); //136
// let G = graph(parse(sample4())); //81

function printTimes(times) {
    var deltas = times.reduce((a, t, i) => {
        if (i > 0) {
            a.push(t - times[i - 1]);
        }
        return a;
    }, []);
    return `${deltas.join(' + ')} = ${deltas.reduce((a, c) => a + c, 0)}`;
}

let times = [];
times.push(Date.now());
let G = graph(parse(data()));
times.push(Date.now());
let [ans1] = dist(G);
times.push(Date.now());
console.log(`${ans1} (t: ${printTimes(times)})`);

// let map = parse(sample5());
times = [];
times.push(Date.now());
let map = parse(data(), true);
times.push(Date.now());
G = graph(map);
let keys = new Set();
let ans2 = 0;
// let round = 0;
let starts = map.start.map((p, i) => `@${i}`);
memo = {};
times.push(Date.now());
while (keys.size !== map.keys.length + starts.length) {
    map.start.forEach((p, i) => {
        let [d, from, _keys] = dist(G, starts[i], keys);
        ans2 += d;
        starts[i] = from;
        keys = _keys;
    });
    // round++;
}
times.push(Date.now());
console.log(`${ans2} (t: ${printTimes(times)})`);

function sample1() {
    return `
########################
#f.D.E.e.C.b.A.@.a.B.c.#
######################.#
#d.....................#
########################
    `.trim();
}

function sample2() {
    return `
########################
#...............b.C.D.f#
#.######################
#.....@.a.B.c.d.A.e.F.g#
########################
`.trim();
}

function sample3() {
    return `
#################
#i.G..c...e..H.p#
########.########
#j.A..b...f..D.o#
########@########
#k.E..a...g..B.n#
########.########
#l.F..d...h..C.m#
#################
    `.trim();
}

function sample4() {
    return `
########################
#@..............ac.GI.b#
###d#e#f################
###A#B#C################
###g#h#i################
########################
    `.trim();
}

function sample5() {
    return `
#############
#DcBa.#.GhKl#
#.###@#@#I###
#e#d#####j#k#
###C#@#@###J#
#fEbA.#.FgHi#
#############
    `.trim();
}
