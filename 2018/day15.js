//AOC2018 D15
const data = require('./day15_input');
// const data = () => require('./day15_sample')()[5];
const debug = true;

function parse(s) {
    let arr = s.split('\n').map((l) => l.split(''));
    let map = {},
        units = [];
    for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr[y].length; x++) {
            let sq = arr[y][x];
            map[[x, y] + ''] = sq === '#' ? '#' : '.';
            if (sq === 'G') {
                units.push({ pos: [x, y] + '', hp: 200, elf: false });
            }
            if (sq === 'E') {
                units.push({ pos: [x, y] + '', hp: 200, elf: true });
            }
        }
    }
    return { map, units };
}

function render({ map, units }) {
    if (!debug) return;
    let _map = { ...map };
    units.forEach((u) => (_map[u.pos] = u.elf ? 'E' : 'G'));
    const allPos = Object.keys(_map).map((s) => s.split(',').map(Number));
    const maxX = Math.max(...allPos.map((p) => p[0]));
    const maxY = Math.max(...allPos.map((p) => p[1]));
    let lines = [];
    for (let y = 0; y <= maxY; y++) {
        let line = [];
        for (let x = 0; x <= maxX; x++) {
            line.push(_map[[x, y] + '']);
        }
        lines.push(line.join(''));
    }
    console.log(lines.join('\n'));
    console.log(units.map((u) => (u.elf ? 'E' : 'G') + u.hp));
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

function getPaths(fromPos, toPos, map, units) {
    let visited = new Set();
    let queue = [{ pos: fromPos, dist: 0, trail: [] }];
    while (queue.length !== 0) {
        let pt = queue.shift();
        if (pt.pos === toPos) {
            //paths.push({ dist: pt.dist, trail: pt.trail, dest: toPos });
            return { dist: pt.dist, trail: pt.trail, dest: toPos };
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
                    !units.filter((u) => u.hp > 0).find((u) => u.pos === p) &&
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
    return undefined;
}

function getPaths2(sourceUnit, destUnit, map, units) {
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

function log(...arg) {
    debug && console.log(...arg);
}

function noEnemies(units) {
    let _units = units.filter((u) => u.hp > 0);
    return (
        _units.filter((u) => u.elf).length === 0 ||
        _units.filter((u) => !u.elf).length === 0
    );
}

function getNeigbourCells(unit) {
    let [x, y] = toXY(unit.pos);
    return [[x - 1, y] + '', [x + 1, y] + '', [x, y - 1] + '', [x, y + 1] + ''];
}

function battle(s) {
    let { map, units } = parse(s);
    let i = 0;
    while (true) {
        log('--------- round', i, '--------------');
        units.sort((a, b) => orderPos(a.pos, b.pos));
        render({ map, units });
        //round
        let hasWon = false;
        for (let ui = 0; ui < units.length; ui++) {
            let u = units[ui];
            log('====== turn ' + ui, u);
            if (u.hp <= 0) {
                log('died---', u.pos);
                continue;
            }
            let enemies = units
                .filter((_u) => u.elf !== _u.elf)
                .filter((u) => u.hp > 0);
            let neigbourCells = getNeigbourCells(u);
            let enemyPositions = enemies.map((u) => u.pos);

            let enemyPositionsInRange = neigbourCells.filter((p) =>
                enemyPositions.includes(p)
            );
            if (enemyPositionsInRange.length === 0) {
                let enemyNeighborPositions = enemies.flatMap((e) => {
                    return getNeigbourCells(e).filter((p) => {
                        return (
                            map[p] === '.' &&
                            units.filter((u) => u.hp > 0 && u.pos == p)
                                .length === 0
                        );
                    });
                });
                let paths = enemyNeighborPositions
                    .map((p) => getPaths(u.pos, p, map, units))
                    .filter((p) => !!p);
                let dest = paths.sort((p1, p2) => {
                    let d = p1.dist - p2.dist;
                    if (d !== 0) return d;
                    return orderPos(p1.trail[0], p2.trail[0]);
                })[0];
                if (dest) {
                    //move
                    u.pos = dest.trail[0];
                }
            }

            //check again
            neigbourCells = getNeigbourCells(u);
            enemyPositionsInRange = neigbourCells.filter((p) =>
                enemyPositions.includes(p)
            );
            if (enemyPositionsInRange.length > 0) {
                let target = enemies
                    .filter((e) => enemyPositionsInRange.includes(e.pos))
                    .sort((a, b) => {
                        let d = a.hp - b.hp;
                        if (d != 0) return d;
                        return orderPos(a.pos, b.pos);
                    })[0];
                target.hp -= 3;
                log('attack', target);
            }

            //let enemies = units
            //    .filter((_u) => u.elf !== _u.elf)
            //    .filter((u) => u.hp > 0)
            //    .map((e) => getPaths(u, e, map, units))
            //    .filter((a) => a.length);

            //log('reachable enemies path', enemies);

            //const min = Math.min(
            //    ...enemies.flatMap((e) => e.map((s) => s.dist))
            //);
            //if (min === 1) {
            //    //attack
            //    const target = enemies
            //        .flat()
            //        .filter((p) => p.dist === 1)
            //        .sort((e1, e2) => {
            //            const d = e1.dest.hp - e2.dest.hp;
            //            return d === 0 ? orderPos(e1.dest.pos, e2.dest.pos) : d;
            //        })[0];
            //    target.dest.hp -= 3;
            //    log('attack', target.dest);
            //} else {
            //    //move
            //    if (enemies.length > 0) {
            //        const target = enemies
            //            .flat()
            //            .filter((e) => e.dist === min)
            //            .sort((a, b) => {
            //                let d = orderPos(a.dest.pos, b.dest.pos);
            //                if (d !== 0) return d;
            //                d = orderPos(
            //                    a.trail[a.trail.length - 2],
            //                    b.trail[b.trail.length - 2]
            //                );
            //                if (d !== 0) return d;
            //                return orderPos(a.trail[0], b.trail[0]);
            //            });

            //        log('move', target[0].trail[0]);
            //        u.pos = target[0].trail[0];

            //        if (min === 2) {
            //            //in-range and can attack
            //            target[0].dest.hp -= 3;
            //            log('attack immediate after move', target[0].dest);
            //        }
            //    }
            //}

            if (noEnemies(units)) {
                log('hasWon');
                let round = i;
                if (units.slice(ui + 1).filter((u) => u.hp > 0).length === 0) {
                    //last units
                    round += 1;
                }
                let hp = units
                    .filter((u) => u.hp > 1)
                    .reduce((a, u) => a + u.hp, 0);
                console.log({ round, hp, ans: round * hp });
                console.log(round * hp);
                hasWon = true;
                break;
            }
        }
        units = units.filter((u) => u.hp > 0); //cleanup died enemies
        if (hasWon) {
            log('final map');
            render({ map, units });
            break;
        }

        i++;
    }
}

battle(data());
// render(parse(data()));

//sample : 47 round 590 hp
