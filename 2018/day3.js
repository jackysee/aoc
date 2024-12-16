//AOC2018 D3
import data from './day3_input.js';

function parse(s) {
    return s.split('\n').map((l) => {
        let m = l.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
        return {
            id: m[1],
            left: parseInt(m[2], 10),
            top: parseInt(m[3], 10),
            width: parseInt(m[4], 10),
            height: parseInt(m[5], 10)
        };
    });
}

function getTiles(claims) {
    let tiles = {};
    claims.forEach((c) => {
        for (let y = c.top; y < c.top + c.height; y++) {
            for (let x = c.left; x < c.left + c.width; x++) {
                tiles[[x, y]] = tiles[[x, y]] ?? 0;
                tiles[[x, y]] += 1;
            }
        }
    });
    return tiles;
}

function solve(s) {
    let claims = parse(s);
    let tiles = getTiles(claims);
    console.log('part1', Object.values(tiles).filter((n) => n > 1).length);

    for (let i = 0; i < claims.length; i++) {
        let c = claims[i];
        let overlap = false;
        loop: for (let y = c.top; y < c.top + c.height; y++) {
            for (let x = c.left; x < c.left + c.width; x++) {
                if (tiles[[x, y]] > 1) {
                    overlap = true;
                    break loop;
                }
            }
        }
        if (!overlap) {
            console.log('part2', c.id);
            break;
        }
    }
}

console.log(solve(data()));
