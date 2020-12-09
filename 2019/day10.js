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

function getPointsAlong(x1,y1,x2,y2){
    let dx = x2 - x1;
    let dy = y2 - y1;
    let f = gcd(Math.abs(dx), Math.abs(dy));
    console.log('getPointsAlong' , {dx,dy,f});
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

function range(from, to) {
    return Array(to - from + 1).fill(from).map((n,i) => n + i)
}

function getEdges(x,y,map) {
   return  [
        ...range(0, map.width - 1).map(x => [x, 0]), //top
        ...range(1, map.height - 1).map(y => [map.width - 1, y]), //right
        ...range(0, map.width - 1).map(x => [x, map.height - 1]), //bottom
        ...range(1, map.height - 2).map(y => [0, y]) //left
    ]
}

function countAsteroids(x,y,map) {
    console.log('countAsteroids', x, y);
    let num = 0;
    getEdges(x,y,map).forEach(([x1,y1]) => {
        let points = getPointsAlong(x1, y1, x, y)
        if(points.some(p => map.at(...p) === '#')) {
            num++;
        }
    });
    return num;
}

function findBest(map) {
    let result;
    for(let j=0; j<map.height; j++) {
        for(let i=0; i<map.width; i++) {
            if(map.at(i,j) === '#') {
                let count = countAsteroids(i,j,map);
                console.log(count);
                if(result === undefined || count > result.count) {
                    result = { point:[i,j], count };
                } 
            }
        }
    }
    return result;
}

// console.log(getPointsAlong(5,0,0,0));
//console.log(getEdges({ width:6, height:3}));
console.log(findBest(parseMap(sample())));





function sample() {
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
