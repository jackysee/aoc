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

function orderPos(a, b) {
    let [x1, y1] = toXY(a);
    let [x2, y2] = toXY(b);
    if (y1 === y2) return x1 - x2;
    return y1 - y2;
}

function getPaths(sourceUnit, destUnit, map, units) {
    let visited = new Set();
    let queue = [{ pos: sourceUnit.pos, dist: 0, trail: [] }];
    let paths = [];
    while (queue.length !== 0) {
        let pt = queue.shift();
        if (pt.pos === destUnit.pos) {
            paths.push({ dist: pt.dist, trail: pt.trail, dest: destUnit });
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
                    !units
                        .filter((u) => u.hp > 0)
                        .find((u) => u.pos === p && u.pos !== destUnit.pos) &&
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
    return paths;
}

function battle(s) {
    let { map, units } = parse(s);
    let i = 0;
    while (true) {
        console.log('round', i);
        if (
            units.filter((u) => u.elf).length === 0 ||
            units.filter((u) => !u.elf) === 0
        ) {
            console.log('hasWon');
            console.log({ round: i, hp: units.reduce((a, u) => a + u.hp, 0) });
            break;
        }
        //round
        units.sort((a, b) => orderPos(a.pos, b.pos));
        for (let ui = 0; ui < units.length; ui++) {
            let u = units[ui];
            console.log('====== turn ' + ui, u);
            let enemies = units
                .filter((_u) => u.elf !== _u.elf)
                .filter((u) => u.hp > 0)
                .map((e) => getPaths(u, e, map, units))
                .filter((a) => a.length);

            console.log('reachable enemies', enemies);

            const min = Math.min(
                ...enemies.flatMap((e) => e.map((s) => s.dist))
            );
            if (min === 1) {
                //attack
                const target = enemies
                    .flat()
                    .filter((p) => p.dist === 1)
                    .sort((e1, e2) => {
                        const d = e1.dest.hp - e2.dest.hp;
                        return d === 0 ? orderPos(e1.dest.pos, e2.dest.pos) : d;
                    })[0];
                target.dest.hp -= 3;
                console.log('attack', target.dest);
            } else {
                //move
                if (enemies.length > 0) {
                    const target = enemies
                        .flat()
                        .filter((e) => e.dist === min)
                        .map((p) => p.trail[0])
                        .sort(orderPos)[0];

                    console.log('move', target);
                    u.pos = target;
                }
            }
        }
        units = units.filter((u) => u.hp > 0); //cleanup died enemies
        i++;
    }
}

battle(data());

//sample : 47 round 590 hp
