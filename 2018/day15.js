//AOC2018 D15
import data from './day15_input.js';
// const data = () => require('./day15_sample')()[5];
const debug = false;

function parse(s) {
    let arr = s.split('\n').map((l) => l.split(''));
    let map = {},
        units = [];
    for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr[y].length; x++) {
            let sq = arr[y][x];
            map[[x, y] + ''] = sq === '#' ? '#' : '.';
            if (sq === 'G') {
                units.push({
                    pos: [x, y] + '',
                    hp: 200,
                    elf: false,
                    attackPower: 3
                });
            }
            if (sq === 'E') {
                units.push({
                    pos: [x, y] + '',
                    hp: 200,
                    elf: true,
                    attackPower: 3
                });
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

function log(...arg) {
    debug && console.log(...arg);
}

const isAlive = (u) => u.hp > 0;

function findClosest(from, targets, map, excludes) {
    let visited = new Set();
    let queue = [{ pos: from, dist: 0, trail: [] }];
    let foundDist = undefined;
    let closest = [];
    while (queue.length) {
        let pt = queue.shift();
        if (foundDist !== undefined && pt.dist > foundDist) {
            return { closest, dist: foundDist };
        }
        if (visited.has(pt.pos) || excludes.includes(pt.pos)) {
            continue;
        }
        visited.add(pt.pos);
        if (targets.includes(pt.pos)) {
            foundDist = pt.dist;
            closest.push(pt);
        }
        getNeigbourCells(pt, map, excludes).forEach((p) => {
            if (visited.has(p)) return;
            queue.push({ pos: p, dist: pt.dist + 1, trail: [...pt.trail, p] });
        });
    }
    return { closest, dist: foundDist };
}

function getNeigbourCells(unit, map, excludes) {
    let [x, y] = toXY(unit.pos);
    return [
        [x - 1, y] + '',
        [x + 1, y] + '',
        [x, y - 1] + '',
        [x, y + 1] + ''
    ].filter((p) => {
        return map[p] === '.' && !excludes.includes(p);
    });
}

function noEnemies(units) {
    let _units = units.filter(isAlive);
    return (
        _units.filter((u) => u.elf).length === 0 ||
        _units.filter((u) => !u.elf).length === 0
    );
}

function battle(s, elfAttackPower = 3, noElvesDies = false) {
    let { map, units } = parse(s);
    units = units.map((u) => {
        if (u.elf) u.attackPower = elfAttackPower;
        return u;
    });
    let i = 0;
    while (true) {
        log(
            'round',
            i,
            'Elfs',
            units
                .filter((u) => u.elf && isAlive(u))
                .reduce((a, c) => a + c.hp, 0),
            'Globins',
            units
                .filter((u) => !u.elf && isAlive(u))
                .reduce((a, c) => a + c.hp, 0)
        );

        units.sort((a, b) => orderPos(a.pos, b.pos));
        log(
            'unitPos',
            units.filter(isAlive).map((u) => u.pos)
        );
        for (let ui = 0; ui < units.length; ui++) {
            const u = units[ui];
            if (u.hp <= 0) {
                continue;
            }
            let enemies = units.filter((e) => isAlive(e) && e.elf != u.elf);
            let enemyPositions = enemies.map((e) => e.pos);
            let nearByCells = getNeigbourCells(u, map, []);
            let inRange = nearByCells.filter((c) => enemyPositions.includes(c));

            if (!inRange.length) {
                let surroundings = enemies.flatMap((e) =>
                    getNeigbourCells(e, map, units)
                );
                let excludes = units
                    .filter((_u) => isAlive(_u) && _u.pos !== u.pos)
                    .map((u) => u.pos);
                let { closest, dist } = findClosest(
                    u.pos,
                    surroundings,
                    map,
                    excludes
                );
                if (closest.length) {
                    let target = closest.sort((a, b) =>
                        orderPos(a.pos, b.pos)
                    )[0].pos;
                    nearByCells.sort(orderPos);
                    for (let i = 0; i < nearByCells.length; i++) {
                        const s = nearByCells[i];
                        let { dist: d } = findClosest(
                            s,
                            [target],
                            map,
                            excludes
                        );
                        if (d === dist - 1) {
                            log('move', u.pos, s);
                            u.pos = s;
                            break;
                        }
                    }
                }
                inRange = getNeigbourCells(u, map, []).filter((c) =>
                    enemyPositions.includes(c)
                );
            }

            if (inRange.length) {
                let target = enemies
                    .filter((e) => inRange.includes(e.pos))
                    .sort((a, b) => {
                        let d = a.hp - b.hp;
                        return d === 0 ? orderPos(a.pos, b.pos) : d;
                    })[0];
                target.hp -= u.attackPower;
                log('attack', u.pos, target);

                if (noElvesDies && target.elf && target.hp <= 0) {
                    return [false, 0];
                }

                if (noEnemies(units)) {
                    log({ ui, len: units.length });
                    if (ui === units.length - 1) {
                        log('last');
                        i += 1;
                    }
                    let totalHp = units
                        .filter(isAlive)
                        .reduce((a, c) => a + c.hp, 0);
                    log(i, totalHp, i * totalHp);
                    return [true, i * totalHp];
                }
            }
        }
        i += 1;
    }
}

console.log('Part 1', battle(data())[1]);

let attackPower = 3;
while (true) {
    let [won, val] = battle(data(), attackPower, true);
    if (won) {
        // console.log({ attackPower });
        console.log('Part 2', val);
        break;
    }
    attackPower++;
}
