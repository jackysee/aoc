interface Player {
    hp: number;
    damage: number;
    armor: number;
    mana: number;
    manaUsed: number;
    activeSpells: Record<string, number>;
}
const spells = [
    {
        id: 'missles',
        cast: (player: Player, boss: Player) => {
            player.mana -= 53;
            player.manaUsed += 53;
            boss.hp -= 4;
        }
    },
    {
        id: 'drain',
        cast: (player: Player, boss: Player) => {
            player.mana -= 73;
            player.manaUsed += 73;
            player.hp += 2;
            boss.hp -= 2;
        }
    },
    {
        id: 'shield',
        cast: (player: Player, boss?: Player) => {
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
        cast: (player: Player, boss: Player) => {
            if (!player.activeSpells.poison) {
                player.mana -= 173;
                player.manaUsed += 173;
                player.activeSpells.poison = 6;
                return;
            }
            boss.hp -= 3;
            player.activeSpells.shield -= 1;
            if (player.activeSpells.poison === 0) {
                delete player.activeSpells.poison;
            }
        }
    },
    {
        id: 'recharge',
        cast: (player: Player, boss?: Player) => {
            if (!player.activeSpells.recharge) {
                player.mana -= 299;
                player.manaUsed += 299;
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
