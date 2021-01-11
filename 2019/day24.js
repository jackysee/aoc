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
}

console.log(rating(parse(sample())));

function sample() {
    return `
.....
.....
.....
#....
.#...
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
