//AOC2018 D15
// const data = require('./day15_input');
const data = require('./day15_sample');

function parse(s) {
    let arr = s.split('\n').map((l) => l.split(''));
    let map = {},
        units = [];
    for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr[y].length; x++) {
            let sq = arr[y][x];
            if (sq !== '#') {
                map[[x, y]] = '.';
            }
            if (sq === 'G') {
                units.push({ pos: [x, y] + '', hp: 300, elf: false });
            }
            if (sq === 'E') {
                units.push({ pos: [x, y] + '', hp: 300, elf: true });
            }
        }
    }
    return { map, units };
}

function toXY(pos) {
    return pos.split(',').map(Number);
}

function order(units) {
    units.sort((a, b) => {
        let [x1, y1] = toXY(a.pos);
        let [x2, y2] = toXY(b.pos);
        if (y1 === y2) return x1 - x2;
        return y1 - y2;
    });
}

function shortestPath(sourceUnit, destUnit, map, units) {
    let visited = new Set();
    let queue = [{ pos: sourceUnit.pos, dist: 0, trail: [] }];
    while (queue.length !== 0) {
        let pt = queue.shift();
        if (pt.pos === destUnit.pos) {
            return { dist: pt.dist, trail: pt.trail, dest: destUnit };
        }
        let [x, y] = toXY(pt.pos);
        let points = [
            [x - 1, y] + '',
            [x + 1, y] + '',
            [x, y - 1] + '',
            [x, y + 1] + ''
        ]
            .filter((p) => {
                return (
                    map[p] === '.' &&
                    !units.find((u) => u.pos === p && u.pos !== destUnit.pos) &&
                    !visited.has(p)
                );
            })
            .map((p) => ({
                pos: p,
                dist: pt.dist + 1,
                trail: [...pt.trail, p]
            }));
        points.forEach((p) => visited.add(p.pos));
        queue = [...queue, ...points];
    }
    return { dist: -1, trail: [], dest: destUnit };
}

function battle(s) {
    let { map, units } = parse(s);
    let i = 0;
    while (true) {
        if (i === 1) {
            break;
        }
        //round
        order(units);
        units.forEach((u, ui) => {
            console.log('turn ' + ui, u);
            let enemies = units
                .filter((_u) => u.elf !== _u.elf)
                .map((e) => shortestPath(u, e, map, units));
            const reachable = enemies.filter((e) => e.dist > 0);
            console.log('reachable', enemies);
            const min = Math.min(...reachable.map((e) => e.dist));
            const targets = reachable.filter((e) => e.dist === min);
            console.log(min, targets);
        });
        i++;
    }
}

battle(data());
