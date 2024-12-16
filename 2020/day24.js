//ACO2020 d24
import data from './day24_input.js';

const dirs = ['e', 'se', 'sw', 'w', 'nw', 'ne'];

function parse(s) {
    return s
        .split('\n')
        .map((l) => l.match(new RegExp(`(${dirs.join('|')})`, 'g')));
}

function ints(s) {
    return s.split(',').map(Number);
}

function move(pt, action) {
    let [x, y, z] = Array.isArray(pt) ? pt : ints(pt);
    if (action === 'e') {
        x += 1;
        y -= 1;
    }
    if (action === 'w') {
        x -= 1;
        y += 1;
    }
    if (action === 'se') {
        x += 1;
        z -= 1;
    }
    if (action === 'nw') {
        x -= 1;
        z += 1;
    }
    if (action === 'sw') {
        z -= 1;
        y += 1;
    }
    if (action === 'ne') {
        z += 1;
        y -= 1;
    }
    return [x, y, z];
}

function flip(str) {
    let black = new Set();
    let ins = parse(str);
    ins.forEach((list) => {
        let dest =
            list.reduce(
                (a, c) => {
                    return move(a, c);
                },
                [0, 0, 0]
            ) + '';
        if (black.has(dest)) {
            black.delete(dest);
        } else {
            black.add(dest);
        }
    });
    return black;
}

function getNeighbors(pt) {
    return dirs.map((d) => move(pt, d));
}

console.log(flip(data()).size);

function flip2(str) {
    let black = flip(str);
    let i = 0;
    while (i < 100) {
        i++;
        let _black = new Set();
        let pts = [...black].flatMap(getNeighbors);
        pts.forEach((pt) => {
            let neighbors = getNeighbors(pt);
            let noOfBlack = neighbors.filter((pt) => black.has(pt + '')).length;
            if (black.has(pt + '')) {
                if (!(noOfBlack == 0 || noOfBlack > 2)) {
                    _black.add(pt + '');
                }
            } else {
                if (noOfBlack === 2) {
                    _black.add(pt + '');
                }
            }
        });
        black = _black;
    }
    return black.size;
}

console.log(flip2(data()));

function sample() {
    return `
sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew
    `.trim();
}
