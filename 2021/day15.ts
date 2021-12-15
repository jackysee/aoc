import data from './day15_input.ts';
// import data from './day15_sample.ts';

interface ValueMap {
    [key: string]: number;
}
let map: ValueMap = {};
let mx = 0;
let my = 0;
data()
    .trim()
    .split('\n')
    .forEach((line, y) =>
        line.split('').forEach((n, x) => {
            map[[x, y] + ''] = Number(n);
            if (x > mx) mx = x;
            if (y > my) my = y;
        })
    );

function getNeigbours(pos: string, map: ValueMap, visited: Set<string>) {
    let [x, y] = pos.split(',').map(Number);
    return [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1]
    ]
        .map((a) => a + '')
        .filter((p) => map[p] !== undefined && !visited.has(p));
}

function dij(from: string, to: string, map: ValueMap) {
    let mapLen = Object.keys(map).length;
    console.log('map length = ',  mapLen);
    let visited = new Set<string>();
    let D: ValueMap = {};
    D[from] = 0;
    let current = from;
    while (current !== to) {
        if(visited.size % Math.floor(mapLen / 10) === 0) {
            console.log('visited', visited.size);
        }
        getNeigbours(current, map, visited).forEach((p) => {
            let d = D[current] + map[p];
            if (D[p] === undefined || d < D[p]) {
                D[p] = d;
            }
        });
        visited.add(current);
        delete D[current];
        current = Object.entries(D)
            .filter(([a]) => !visited.has(a))
            .sort((a, b) => a[1] - b[1])[0][0];
    }
    return D[to];
}

let t = performance.now();
console.log(dij('0,0', `${mx},${my}`, map));
console.log(performance.now() - t + 'ms');

let _map2 = Object.entries(map)
    .map(([k, v]) => {
        let [x, y] = k.split(',').map(Number);
        let points = [];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                let _v = v + i + j;
                if (_v > 9) _v = (_v + 1) % 10;
                // if (y === 9) {
                //     console.log(
                //         { x, y, i, j, mx, my },
                //         x + (mx + 1) * i,
                //         y + (my + 1) * j,
                //         _v
                //     );
                // }
                points.push([[x + (mx + 1) * i, y + (my + 1) * j] + '', _v]);
            }
        }
        return points;
    })
    .flat();

let map2 = Object.fromEntries(_map2);
t = performance.now();
console.log(dij('0,0', `${(mx + 1) * 5 - 1},${(my + 1) * 5 - 1}`, map2));
console.log(performance.now() - t + 'ms');
