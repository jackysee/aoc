//AOC2020 D20
import data from './day20_input.js';

function parse(str) {
    return str.split('\n\n').map((t) => {
        const arr = t.split('\n');
        const id = parseInt(arr[0].match(/\d+/)[0], 10);
        const tile = arr.slice(1).map((l) => l.split(''));
        return { id, tile };
    });
}

function getEdges(tile) {
    const top = tile[0].join('');
    const bottom = tile[9].join('');
    const left = tile.map((l) => l[0]).join('');
    const right = tile.map((l) => l[9]).join('');
    return { top, bottom, left, right };
}

function orient(tile, ori = 1) {
    let len = tile[0].length;
    let _tile = [];
    for (let i = 0; i < len; i++) {
        _tile.push([]);
        for (let j = 0; j < len; j++) {
            let p = tile[i][j];
            if (ori === 2) {
                p = tile[len - 1 - j][i];
            }
            if (ori === 3) {
                p = tile[len - 1 - i][len - 1 - j];
            }
            if (ori === 4) {
                p = tile[j][len - 1 - i];
            }
            if (ori === 5) {
                p = tile[i][len - 1 - j];
            }
            if (ori === 6) {
                p = tile[len - 1 - j][len - 1 - i];
            }
            if (ori === 7) {
                p = tile[len - 1 - i][j];
            }
            if (ori === 8) {
                p = tile[j][i];
            }
            _tile[i].push(p);
        }
    }
    // console.log(_tile);
    return _tile;
}

function render(_tile) {
    return _tile.map((l) => l.join('')).join('\n');
}

function getEdgePairs(tile) {
    let result = [];
    for (let i = 1; i <= 8; i++) {
        let _tile = orient(tile, i);
        let { top, bottom, left, right } = getEdges(_tile);
        result.push({
            ori: i,
            edges: [
                [left, top],
                [top, right],
                [right, bottom],
                [bottom, left]
            ]
        });
    }
    return result;
}

// console.log(getEdgePairs(parse(sample())[0].tile)[0]);

function getAllEdges(tile) {
    let result = [];
    for (let i = 1; i <= 8; i++) {
        let _tile = orient(tile, i);
        let edges = getEdges(_tile);
        result = [...result, ...Object.values(edges)];
    }
    return result;
}

function findCorners(tiles) {
    let corners = [];
    for (let i = 0; i < tiles.length; i++) {
        let edgePairs = getEdgePairs(tiles[i].tile);
        let info;
        let isCorner = edgePairs.some((p) => {
            let allEdges = tiles
                .filter((t) => t.id !== tiles[i].id)
                .flatMap((t) => getAllEdges(t.tile));
            let index = p.edges.findIndex(
                ([e1, e2]) => !allEdges.includes(e1) && !allEdges.includes(e2)
            );
            return index !== -1;
        });
        if (isCorner) {
            corners.push(tiles[i]);
        }
    }
    return corners;
}

function part1(str) {
    let tiles = parse(str);
    let corners = findCorners(tiles);
    console.log(corners.map((t) => t.id).reduce((a, c) => a * c, 1));
    return { tiles, corners };
}

function findTile(data, tile, side, excludes) {
    // console.log(`findTile for ${id}, ${side}`);
    let _tile = orient(tile.tile.tile, tile.ori);
    let edge = getEdges(_tile)[side];
    let _side = {
        right: 'left',
        bottom: 'top',
        left: 'right',
        top: 'bottom'
    }[side];
    let result = [];
    data.tiles
        .filter((t) => !excludes.has(t.id))
        .forEach((t) => {
            for (let i = 1; i <= 8; i++) {
                let _tile = orient(t.tile, i);
                let _edge = getEdges(_tile)[_side];
                if (_edge === edge) {
                    // console.log('push ', { id:t.id, side, _side });
                    result.push({ tile: t, ori: i });
                }
            }
        });
    return result;
}

function part2(_data) {
    //use orientation 1 top-left corner to finish the puzzle
    const corner = _data.corners.find((c) => {
        return ['right', 'bottom'].every((side) => {
            return (
                findTile(_data, { tile: c, ori: 1 }, side, new Set([c.id]))
                    .length === 1
            );
        });
    });
    // console.log(corner.id);
    const width = Math.sqrt(_data.tiles.length);
    const puzzleResult = [];
    const used = new Set();
    for (let i = 0; i < width; i++) {
        puzzleResult.push([]);
        for (let j = 0; j < width; j++) {
            if (i == 0 && j === 0) {
                puzzleResult[i].push({ tile: corner, ori: 1 });
                used.add(corner.id);
                continue;
            }
            let t;
            if (j === 0) {
                // console.log('1');
                t = findTile(_data, puzzleResult[i - 1][0], 'bottom', used);
            } else {
                // console.log('2', [i,j], puzzleResult[i][j-1]);
                t = findTile(_data, puzzleResult[i][j - 1], 'right', used);
            }
            puzzleResult[i].push(t[0]);
            used.add(t[0].tile.id);
        }
    }

    //concat the puzzle...
    let puzzle = [];
    let j = 0;
    for (let i = 0; i < puzzleResult.length; i++) {
        for (let k = 1; k <= 8; k++) {
            puzzle[j++] = puzzleResult[i].flatMap((p) => {
                let _tile = orient(p.tile.tile, p.ori);
                return _tile[k].slice(1, -1);
            });
        }
    }

    //define the dragon into set of [y,x]
    const dragonStr = `                  # 
#    ##    ##    ###
 #  #  #  #  #  #   `;
    const dragonMap = dragonStr.split('\n').map((l) => l.split(''));
    const dragon = [];
    for (let i = 0; i < dragonMap.length; i++) {
        for (let j = 0; j < dragonMap[i].length; j++) {
            if (dragonMap[i][j] === '#') {
                dragon.push([i, j]);
            }
        }
    }

    //find the dragon!
    for (let k = 1; k <= 8; k++) {
        let _puzzle = orient(puzzle, k);
        for (let i = 0; i < _puzzle.length - 1; i++) {
            for (let j = 0; j < _puzzle[i].length - 20; j++) {
                let _dragon = dragon.map(([_i, _j]) => [i + _i, j + _j]);
                if (_dragon.every(([_i, _j]) => _puzzle[_i][_j] === '#')) {
                    _dragon.forEach(([_i, _j]) => (_puzzle[_i][_j] = 'O'));
                }
            }
        }
        if (_puzzle.flat().includes('O')) {
            console.log(_puzzle.flat().filter((x) => x === '#').length);
            break;
        }
    }
}

// part2(part1(sample()));
part2(part1(data()));

function sample() {
    return `Tile 2311:
..##.#..#.
##..#.....
#...##..#.
####.#...#
##.##.###.
##...#.###
.#.#.#..##
..#....#..
###...#.#.
..###..###

Tile 1951:
#.##...##.
#.####...#
.....#..##
#...######
.##.#....#
.###.#####
###.##.##.
.###....#.
..#.#..#.#
#...##.#..

Tile 1171:
####...##.
#..##.#..#
##.#..#.#.
.###.####.
..###.####
.##....##.
.#...####.
#.##.####.
####..#...
.....##...

Tile 1427:
###.##.#..
.#..#.##..
.#.##.#..#
#.#.#.##.#
....#...##
...##..##.
...#.#####
.#.####.#.
..#..###.#
..##.#..#.

Tile 1489:
##.#.#....
..##...#..
.##..##...
..#...#...
#####...#.
#..#.#.#.#
...#.#.#..
##.#...##.
..##.##.##
###.##.#..

Tile 2473:
#....####.
#..#.##...
#.##..#...
######.#.#
.#...#.#.#
.#########
.###.#..#.
########.#
##...##.#.
..###.#.#.

Tile 2971:
..#.#....#
#...###...
#.#.###...
##.##..#..
.#####..##
.#..####.#
#..#.#..#.
..####.###
..#.#.###.
...#.#.#.#

Tile 2729:
...#.#.#.#
####.#....
..#.#.....
....#..#.#
.##..##.#.
.#.####...
####.#.#..
##.####...
##..#.##..
#.##...##.

Tile 3079:
#.#.#####.
.#..######
..#.......
######....
####.#..#.
.#...#.##.
#.#####.##
..#.###...
..#.......
..#.###...`;
}
