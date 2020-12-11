//AOC2019 D10

function parseMap(str) {
    var arr = str.split('\n').map(s => s.split(''));
    return {
        width: arr[0].length,
        height: arr.length,
        at: (x, y) => arr[y][x]
    }
}

function gcd(n1, n2) {
    if(n1 === 0 || n2 === 0) {
        return 0;
    }
    while(n1 != n2){
        if(n1 > n2) {
            n1 -= n2;
        } else {
            n2 -= n1;
        }
    }
    return n1;
}

function getPointsBetween([x1,y1],[x2,y2]){
    let dx = x2 - x1;
    let dy = y2 - y1;
    let f = gcd(Math.abs(dx), Math.abs(dy));
    if(f !== 0) {
        dx = dx / f;
        dy = dy / f;
    }
    if(dx === 0) {
        dy = dy < 0? -1 : 1;
    }
    if(dy === 0) {
        dx = dx < 0? -1 : 1;
    }
    let points = [], x = x1, y = y1;
    while(!(x === x2 && y === y2)) {
        points.push([x, y]);
        x += dx;
        y += dy;
    }
    return points;
}

function countAsteroids2(x,y,map) {
    let num = 0;
    for(let j=0; j<map.height; j++) {
        for(let i=0; i<map.width; i++) {
            if(map.at(i,j) === '#') {
                if(getPointsBetween([i,j], [x,y]).filter(p => map.at(...p) === '#').length === 1) {
                    num++;
                }
            }
        }
    }
    return num;
}


function getAngle(dx,dy) {
   let r = - Math.atan2(dy,dx) + 90 * Math.PI  / 180;
   return r < 0 ? 2 * Math.PI + r : r;
}

function getAsteroids(map) {
    const list = [];
    for(let j=0; j<map.height; j++) {
        for(let i=0; i<map.width; i++) {
            if(map.at(i,j) === '#') {
                list.push([i, j]);
            }
        }
    }
    return list;
}

function viewableAsteroids(x, y, asteroids) {
    let s = new Set();
    asteroids.forEach(([i,j]) => {
        if(i!==x || j!==y) {
            s.add(getAngle(i-x, y-j));
        }
    });
    return s.size;
}

function findBest(map) {
    let result;
    const asteroids = getAsteroids(map);
    asteroids.forEach(([i,j]) => {
        let count = viewableAsteroids(i,j,asteroids);
        if(result === undefined || count > result.count) {
            result = { point:[i,j], count };
        } 
    });
    return result;
}

// console.log(getPointsBetween([9,8],[5,8]));
// console.log(getTargetPoints(2,2,{ width:6, height:3}));
const map = parseMap(data());
const best = findBest(map);
console.log(best);

function vaporize(x, y, map, nth) {
    const asteroids = getAsteroids(map);
    let list = asteroids
        .filter(([i,j]) => i !== x || j !== y)
        .map(([i,j]) => {
            return {
                angle: getAngle(i-x, y-j),
                distance: Math.hypot(i-x, j-y),
                point: [i, j]
            }
        });
    list = Object.entries(
            list.reduce((a, c) => {
                a[c.angle] = a[c.angle] || [];
                a[c.angle].push(c);
                a[c.angle] = a[c.angle].sort((a, b) => a.distance - b.distance);
                return a
            }, {})
        )
        .sort((a, b) => a[0] - b[0]);
    let i = 0, angleIdx = 0, point;
    while(i < nth) {
        point = list[angleIdx][1].shift()
        angleIdx = (angleIdx + 1) % list.length;
        i++;
    }
    const [x1,y1] = point.point;
    return x1*100 + y1;
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


function data() {
    return `##.##..#.####...#.#.####
##.###..##.#######..##..
..######.###.#.##.######
.#######.####.##.#.###.#
..#...##.#.....#####..##
#..###.#...#..###.#..#..
###..#.##.####.#..##..##
.##.##....###.#..#....#.
########..#####..#######
##..#..##.#..##.#.#.#..#
##.#.##.######.#####....
###.##...#.##...#.######
###...##.####..##..#####
##.#...#.#.....######.##
.#...####..####.##...##.
#.#########..###..#.####
#.##..###.#.######.#####
##..##.##...####.#...##.
###...###.##.####.#.##..
####.#.....###..#.####.#
##.####..##.#.##..##.#.#
#####..#...####..##..#.#
.##.##.##...###.##...###
..###.########.#.###..#.`;
}
