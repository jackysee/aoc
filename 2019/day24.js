//AOC2019 D24

function parse(str) {
    let map = str.split('\n').map(l => l.split(''));
    return map;
}

function rating(map) {
    let k = 0, sum = 0;
    for(let i=0; i<5; i++) {
        for(let j=0; j<5; j++) {
            if(map[i][j] === '#') {
                sum += Math.pow(2, k)
            }
            k++;
        }
    }
    return sum;
}

function part1(str) {
    let map = parse(str);
    let ratings = new Set();
    while(true) {
        let _map = [];
        for(let i=0; i<5; i++) {
            _map.push([]);
            for(let j=0; j<5; j++) {
                let k = map[i][j];
                let bugs = [[1,0],[0,1],[-1,0],[0,-1]]
                    .map(([x,y]) => (map[i+x] || {})[j+y])
                    .filter(n => n === '#')
                    .length;
                if(k === '#' && bugs !== 1) {
                    k = '.';
                } else if(k === '.' && (bugs === 1 || bugs === 2)) {
                    k = '#';
                }
                _map[i][j] = k;
            }
        }
        let r = rating(_map);
        if(ratings.has(r)) {
            return r;
        }
        ratings.add(r);
        map = _map;
    }
}

// console.log(rating(parse(sample())));
console.log(part1(data()));

function sample() {
    return `
....#
#..#.
#..##
..#..
#....
`.trim();
}

function data() {
    return `
.#..#
#..##
##..#
##.##
#..##
    `.trim();
}
