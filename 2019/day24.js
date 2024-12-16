//AOC2019 D24

function parse(str) {
    let bugs = new Set();
    str.split('\n').forEach((l, i) => {
        l.split('').forEach((v, j) => {
            if(v === '#') bugs.add([0, i, j].join(','));
        });
    });
    return bugs;
}

function rating(bugs) {
    return [...bugs].reduce((a, b) => {
        let [_, i, j] = b.split(',').map(Number);
        return a + Math.pow(2, i*5 + j);
    }, 0);
}

function part1(str) {
    let bugs = parse(str);
    let ratings = new Set();
    while(true) {
        let _bugs = new Set();
        for(let i=0; i<5; i++) {
            for(let j=0; j<5; j++) {
                let count = [[1,0],[0,1],[-1,0],[0,-1]]
                    .filter(([di,dj]) => bugs.has([0,i+di,j+dj].join(',')))
                    .length;
                let isBug = bugs.has([0,i,j].join(','));
                if(isBug && count !== 1) {
                    isBug = false;
                } else if(!isBug && (count === 1 || count === 2)) {
                    isBug = true;
                }
                if(isBug) _bugs.add([0,i,j].join(','));
            }
        }
        let r = rating(_bugs);
        if(ratings.has(r)) {
            return r;
        }
        ratings.add(r);
        bugs = _bugs;
    }
}

function getNeighbors(l, i, j) {
    return [[1,0],[0,1],[-1,0],[0,-1]]
        .map(([di, dj]) => {
            let _i = i + di;
            let _j = j + dj;
            if(_i < 0) return [[l+1, 1, 2]];
            if(_j < 0) return [[l+1, 2, 1]];
            if(_i === 5) return [[l+1, 3, 2]];
            if(_j === 5) return [[l+1, 2, 3]];
            if(_i === 2 && _j === 2) {
                if(di === 1) return [...Array(5)].map((_, k) => [l-1, 0, k]);
                if(di === -1) return [...Array(5)].map((_, k) => [l-1, 4, k]);
                if(dj === 1) return [...Array(5)].map((_, k) => [l-1, k, 0]);
                if(dj === -1) return [...Array(5)].map((_, k) => [l-1, k, 4]);
            }
            return [[l, _i, _j]];
        }).flat();
}

function part2(str, times) {
    let bugs = new Set();
    str.split('\n').forEach((l, i) => {
        l.split('').forEach((v, j) => {
            if(v === '#') bugs.add([0, i, j].join(','));
        });
    });
    let k = 0;
    while(k < times) {
        let _bugs = new Set();
        [...bugs].forEach(c => {
            let [l, i, j] = c.split(',').map(Number);
            getNeighbors(l,i,j).forEach(n => {
                let isBug = bugs.has(n.join(','));
                let count = getNeighbors(...n).filter(_n => bugs.has(_n.join(','))).length;
                if(isBug && count !== 1) {
                    isBug = false;
                } else if(!isBug && (count === 1 || count === 2)) {
                    isBug = true;
                }
                if(isBug) _bugs.add(n.join(','));
            });
        });
        bugs = _bugs;
        k++;
    }
    return bugs.size;
}

console.log(part1(data()));
console.log(part2(data(), 200));

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
