interface Player {
    hp: number;
    damage: number;
    armor: number;
    mana: number;
    manaUsed: number;
    activeSpells: Record<string, number>;
}
interface Boss {
    hp: number;
    damage: number;
}
const spells = [
    {
        id: 'missile',
        cost: 53,
        cast: (player: Player, boss: Boss) => {
            player.mana -= 53;
            player.manaUsed += 53;
            boss.hp -= 4;
        },
        effect: () => {}
    },
    {
        id: 'drain',
        cost: 73,
        cast: (player: Player, boss: Boss) => {
            player.mana -= 73;
            player.manaUsed += 73;
            player.hp += 2;
            boss.hp -= 2;
        },
        effect: () => {}
    },
    {
        id: 'shield',
        cost: 113,
        cast: (player: Player) => {
            if (player.activeSpells.shield === undefined) {
                player.mana -= 113;
                player.manaUsed += 113;
                player.armor += 7;
                player.activeSpells.shield = 6;
                return;
            }
        },
        effect: (player: Player) => {
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
        cast: (player: Player) => {
            if (player.activeSpells.poison === undefined) {
                player.mana -= 173;
                player.manaUsed += 173;
                player.activeSpells.poison = 6;
                return;
            }
        },
        effect: (player: Player, boss: Boss) => {
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
        cast: (player: Player) => {
            if (player.activeSpells.recharge === undefined) {
                player.mana -= 229;
                player.manaUsed += 229;
                player.activeSpells.recharge = 5;
                return;
            }
        },
        effect: (player: Player) => {
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
    activeSpells: {}
};

function applyActiveSpells(player: Player, boss: Boss) {
    let keys = Object.keys(player.activeSpells);
    for (let i = 0; i < keys.length; i++) {
        spells.find((_s) => _s.id == keys[i])!.effect(player, boss);
        if (player.hp <= 0 || boss.hp <= 0) return;
    }
}

function play(
    _player: Player,
    _boss: Boss,
    spellId: string,
    hard: boolean
): [Player, Boss] {
    let player = {
        ..._player,
        activeSpells: { ..._player.activeSpells }
    };
    let boss = { ..._boss };
    let spell = spells.find((s) => s.id === spellId)!;

    //player turn
    if (hard) player.hp -= 1;
    if (player.hp <= 0) return [player, boss];
    applyActiveSpells(player, boss);
    spell.cast(player, boss);
    if (boss.hp <= 0) return [player, boss];

    //boss turn
    applyActiveSpells(player, boss);
    if (boss.hp <= 0) return [player, boss];
    player.hp -= Math.max(1, boss.damage - player.armor);
    return [player, boss];
}

function findLowestMana(player: Player, boss: Boss, hard: boolean = false) {
    let minManaUsed = Infinity;
    let queue = [{ boss, player }];
    while (queue.length) {
        let p = queue.pop()!;
        if (p.player.hp <= 0) continue;
        if (p.boss.hp <= 0) {
            if (p.player.manaUsed < minManaUsed) {
                minManaUsed = p.player.manaUsed;
            }
            continue;
        }
        if (p.player.manaUsed >= minManaUsed) continue;
        spells.forEach((s) => {
            if ((p.player.activeSpells[s.id] || 0) > 1) return;
            if (p.player.mana < s.cost) return;
            let [player, boss] = play(p.player, p.boss, s.id, hard);
            if (player.hp <= 0) return;
            queue.push({ player, boss });
        });
    }
    return minManaUsed;
}

console.log('Part 1', findLowestMana(player, boss));
console.log('Part 2', findLowestMana(player, boss, true));
