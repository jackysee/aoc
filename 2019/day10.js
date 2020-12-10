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

function getAngles(dx,dy) {
   let r = - Math.atan2(dy,dx) + 90 * Math.PI  / 180;
   return r < 0 ? 2 * Math.PI + r : r;
}

function countAsteroids(x, y, map) {
    let s = new Set();
    for(let j=0; j<map.height; j++) {
        for(let i=0; i<map.width; i++) {
            if(!(i == x && j == y) && map.at(i,j) === '#') {
                s.add(getAngles(i-x, y-j));
            }
        }
    }
    return s.size;
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

function findBest(map) {
    let result;
    for(let j=0; j<map.height; j++) {
        for(let i=0; i<map.width; i++) {
            if(map.at(i,j) === '#') {
                let count = countAsteroids(i,j,map);
                if(result === undefined || count > result.count) {
                    result = { point:[i,j], count };
                } 
            }
        }
    }
    return result;
}

// console.log(
//     countAsteroids(
//         0, 2,
// parseMap(
// `###
// .#.
// #..`)
//     )
// )
// console.log(getPointsBetween([9,8],[5,8]));
// console.log(getTargetPoints(2,2,{ width:6, height:3}));
const best = findBest(parseMap(data()));
console.log(best);


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
