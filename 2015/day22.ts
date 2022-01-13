interface Player {
    hp: number;
    damage: number;
    armor: number;
    mana: number;
    manaUsed: number;
    activeSpells: Record<string, number>;
    history: string[];
}
interface Boss {
    hp: number;
    damage: number;
}
const spells = [
    {
        id: 'missles',
        cost: 53,
        cast: (player: Player, boss: Boss) => {
            player.mana -= 53;
            player.manaUsed += 53;
            boss.hp -= 4;
        }
    },
    {
        id: 'drain',
        cost: 73,
        cast: (player: Player, boss: Boss) => {
            player.mana -= 73;
            player.manaUsed += 73;
            player.hp += 2;
            boss.hp -= 2;
        }
    },
    {
        id: 'shield',
        cost: 113,
        cast: (player: Player, boss?: Boss) => {
            if (!player.activeSpells.shield) {
                player.mana -= 113;
                player.manaUsed += 113;
                player.armor += 7;
                player.activeSpells.shield = 6;
                return;
            }
            player.activeSpells.shield -= 1;
            if (player.activeSpells.shield === 0) {
                player.armor -= 7;
                delete player.activeSpells.shield;
            }
        }
    },
    {
        id: 'poison',
        cost: 173,
        cast: (player: Player, boss: Boss) => {
            if (!player.activeSpells.poison) {
                player.mana -= 173;
                player.manaUsed += 173;
                player.activeSpells.poison = 6;
                return;
            }
            boss.hp -= 3;
            player.activeSpells.poison -= 1;
            if (player.activeSpells.poison === 0) {
                delete player.activeSpells.poison;
            }
        }
    },
    {
        id: 'recharge',
        cost: 229,
        cast: (player: Player, boss?: Boss) => {
            if (!player.activeSpells.recharge) {
                player.mana -= 229;
                player.manaUsed += 229;
                player.activeSpells.recharge = 5;
                return;
            }
            player.mana += 101;
            player.activeSpells.recharge -= 1;
            if (player.activeSpells.recharge === 0) {
                delete player.activeSpells.recharge;
            }
        }
    }
];

const boss = { hp: 55, damage: 8, armor: 0 };
const player = {
    hp: 50,
    damage: 0,
    armor: 0,
    mana: 500,
    manaUsed: 0,
    activeSpells: {},
    history: [] as string[]
};

function play(_player: Player, _boss: Boss, spellId: string): [Player, Boss] {
    let player = {
        ..._player,
        activeSpells: { ..._player.activeSpells },
        history: [..._player.history, spellId]
    };
    let boss = { ..._boss };
    let spell = spells.find((s) => s.id === spellId)!;

    //player turn
    Object.keys(player.activeSpells).forEach((id) => {
        spells.find((_s) => _s.id == id)!.cast(player, boss);
    });
    spell.cast(player, boss);

    //boss turn
    Object.keys(player.activeSpells).forEach((id) => {
        spells.find((_s) => _s.id == id)!.cast(player, boss);
    });
    player.hp -= Math.max(1, boss.damage - player.armor);
    return [player, boss];
}

function findLowestMana(player: Player, boss: Boss) {
    let minManaUsed = Infinity;
    let queue = [{ boss, player }];
    while (queue.length) {
        let p = queue.pop()!;
        if (p.boss.hp <= 0) {
            if (p.player.manaUsed < minManaUsed) {
                minManaUsed = p.player.manaUsed;
            }
            continue;
        }
        if (p.player.hp <= 0 || p.player.manaUsed >= minManaUsed) continue;
        spells
            .filter(
                (s) =>
                    ((p.player as Player).activeSpells[s.id] || 0) === 0 &&
                    p.player.mana >= s.cost
            )
            .forEach((s) => {
                let [player, boss] = play(p.player, p.boss, s.id);
                queue.push({ player, boss });
            });
        // queue.sort((a, b) => b.player.manaUsed - a.player.manaUsed);
    }
    return minManaUsed;
}

console.log('Part 1', findLowestMana(player, boss));

// let bb: Boss = { hp: 14, damage: 8 };
// let pp: Player = {
//     hp: 10,
//     damage: 0,
//     armor: 0,
//     mana: 250,
//     manaUsed: 0,
//     activeSpells: {},
//     history: [] as string[]
// };

// [pp, bb] = play(pp, bb, 'recharge');
// console.log(pp, bb);

// [pp, bb] = play(pp, bb, 'shield');
// console.log(pp, bb);

// [pp, bb] = play(pp, bb, 'drain');
// console.log(pp, bb);

// [pp, bb] = play(pp, bb, 'poison');
// console.log(pp, bb);

// [pp, bb] = play(pp, bb, 'missles');
// console.log(pp, bb);
