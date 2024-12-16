// const data = require('./day24_sample.js');
import data from './day24_input.js';

function parseGroup(army) {
    return function (s) {
        let [units, hp, attack, initiative] = s.match(/\d+/g).map(Number);
        let immuneTo = ((s.match(/immune to ([^\);]+)/) || [])[1] || '')
            .split(/\s*\,\s*/)
            .filter((s) => !!s.trim());
        let weakTo = ((s.match(/weak to ([^\);]+)/) || [])[1] || '')
            .split(/\s*\,\s*/)
            .filter((s) => !!s.trim());
        let attackType = s.match(/does (\d+) (\w+) damage/)[2];
        return {
            units,
            hp,
            immuneTo,
            weakTo,
            attack,
            attackType,
            initiative,
            army
        };
    };
}

const armies = data().split('\n\n');
const immune = armies[0].split('\n').slice(1).map(parseGroup('immune'));
const infection = armies[1].split('\n').slice(1).map(parseGroup('infection'));
const groups = [...immune, ...infection].map((g, i) => {
    g.id = i + 1;
    return g;
});

function getUnits(groups) {
    let immune = 0;
    let infection = 0;
    groups.forEach((g) => {
        if (g.army === 'immune') immune += g.units;
        if (g.army === 'infection') infection += g.units;
    });
    return [immune, infection];
}

function getDamage(g1, g2) {
    return g1.attack * g1.units * (g2.weakTo.includes(g1.attackType) ? 2 : 1);
}

function sortGroupOrder(a, b) {
    let d = b.units * b.attack - a.units * a.attack;
    if (d !== 0) return d;
    return b.initiative - a.initiative;
}

function battle(_groups, boost = 0) {
    let groups = _groups.map((g) => ({
        ...g,
        attack: g.attack + (g.army === 'immune' ? boost : 0)
    }));
    let units = getUnits(groups);
    while (true) {
        //target selection
        groups.sort(sortGroupOrder);
        let attackTarget = {};
        groups.forEach((g) => {
            if (g.units <= 0) return;
            let target = [...groups]
                .filter(
                    (_g) =>
                        g.army !== _g.army &&
                        _g.units > 0 &&
                        !_g.immuneTo.includes(g.attackType) &&
                        !Object.values(attackTarget).includes(_g.id)
                )
                .sort((a, b) => {
                    let d = getDamage(g, b) - getDamage(g, a);
                    if (d !== 0) return d;
                    return sortGroupOrder(a, b);
                })[0];
            if (target) {
                attackTarget[g.id] = target.id;
            }
        });

        //attack
        [...groups]
            .filter((g) => !!attackTarget[g.id])
            .sort((a, b) => b.initiative - a.initiative)
            .forEach((g) => {
                let target = groups.find((_g) => _g.id == attackTarget[g.id]);
                if (target.units <= 0) return;
                if (g.units <= 0) return;
                let damage = getDamage(g, target);
                target.units = Math.max(
                    target.units - Math.floor(damage / target.hp),
                    0
                );
            });

        let _units = getUnits(groups);
        if (_units[0] === 0) {
            return ['infection', _units[1]];
        }
        if (_units[1] === 0) {
            return ['immune', _units[0]];
        }
        if (_units[0] === units[0] && _units[1] === units[1]) {
            return ['draw'];
        }
        units = _units;
    }
}

console.log('Part 1', battle(groups)[1]);

let boost = 1;
while (true) {
    let [army, units] = battle(groups, boost);
    if (army === 'immune') {
        console.log('Part 2', units);
        break;
    }
    boost++;
}
