//AOC2019 D10
import data from './day10_input.js';

function parseMap(str) {
    var arr = str.split('\n').map((s) => s.split(''));
    return {
        width: arr[0].length,
        height: arr.length,
        at: (x, y) => arr[y][x]
    };
}

function getAngle(dx, dy) {
    let r = -Math.atan2(dy, dx) + (90 * Math.PI) / 180;
    return r < 0 ? 2 * Math.PI + r : r;
}

function getAsteroids(map) {
    const list = [];
    for (let j = 0; j < map.height; j++) {
        for (let i = 0; i < map.width; i++) {
            if (map.at(i, j) === '#') {
                list.push([i, j]);
            }
        }
    }
    return list;
}

function viewableAsteroids(x, y, asteroids) {
    let s = new Set();
    asteroids.forEach(([i, j]) => {
        if (i !== x || j !== y) {
            s.add(getAngle(i - x, y - j));
        }
    });
    return s.size;
}

function findBest(map) {
    let result;
    const asteroids = getAsteroids(map);
    asteroids.forEach(([i, j]) => {
        let count = viewableAsteroids(i, j, asteroids);
        if (result === undefined || count > result.count) {
            result = { point: [i, j], count };
        }
    });
    return result;
}

const map = parseMap(data());
const best = findBest(map);
console.log(best);

function vaporize(x, y, map, nth) {
    const asteroids = getAsteroids(map);
    let list = asteroids
        .filter(([i, j]) => i !== x || j !== y)
        .map(([i, j]) => {
            return {
                angle: getAngle(i - x, y - j),
                distance: Math.hypot(i - x, j - y),
                point: [i, j]
            };
        });
    list = Object.entries(
        list.reduce((a, c) => {
            a[c.angle] = a[c.angle] || [];
            a[c.angle].push(c);
            a[c.angle] = a[c.angle].sort((a, b) => a.distance - b.distance);
            return a;
        }, {})
    ).sort((a, b) => a[0] - b[0]);
    let i = 0,
        angleIdx = 0,
        point;
    while (i < nth) {
        point = list[angleIdx][1].shift();
        angleIdx = (angleIdx + 1) % list.length;
        i++;
    }
    const [x1, y1] = point.point;
    return x1 * 100 + y1;
}

console.log(vaporize(...best.point, map, 200));

function sample1() {
    return `.#..#
.....
#####
....#
...##`;
}

function sample2() {
    return `......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`;
}

function sample3() {
    return `#.#...#.#.
.###....#.
.#....#...
##.#.#.#.#
....#.#.#.
.##..###.#
..#...##..
..##....##
......#...
.####.###.`;
}

function sample4() {
    return `.#..#..###
####.###.#
....###.#.
..###.##.#
##.##.#.#.
....###..#
..#.#..#.#
#..#.#.###
.##...##.#
.....#.#..`;
}

function sample5() {
    return `.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`;
}
