const boss = { hp: 103, damage: 9, armor: 2 };
const shop = `
Weapons:    Cost  Damage  Armor
Dagger        8     4       0
Shortsword   10     5       0
Warhammer    25     6       0
Longsword    40     7       0
Greataxe     74     8       0

Armor:      Cost  Damage  Armor
Leather      13     0       1
Chainmail    31     0       2
Splintmail   53     0       3
Bandedmail   75     0       4
Platemail   102     0       5

Rings:      Cost  Damage  Armor
Damage +1    25     1       0
Damage +2    50     2       0
Damage +3   100     3       0
Defense +1   20     0       1
Defense +2   40     0       2
Defense +3   80     0       3
`.trim();

interface Equip {
    id: string;
    cost: number;
    damage: number;
    armor: number;
}
interface Player {
    hp: number;
    damage: number;
    armor: number;
}
const parseTable = (s: string) =>
    s
        .split('\n')
        .slice(1)
        .map((l) => {
            let id = l.match(/^\w+(\s+\+\d)?/)![0];
            let [cost, damage, armor] = l.match(/(?<!\+)\d+/g)!.map(Number);
            return { id, cost, damage, armor };
        });

let [weapons, armors, rings] = shop.split('\n\n').map(parseTable);

function _combos(arr: any[]): any[][] {
    if (arr[0] === undefined) return [arr];
    return _combos(arr.slice(1)).flatMap((el: any) => [el.concat(arr[0]), el]);
}

function combos(arr: any[], len: (l: number) => boolean): any[][] {
    return _combos(arr).filter((a) => len(a.length));
}

function getAllEquip() {
    return combos(weapons, (l) => l == 1).flatMap((w) => [
        ...combos(armors, (l) => l <= 1).flatMap((a) => [
            ...combos(rings, (l) => l <= 2).map((r) => [...w, ...a, ...r])
        ])
    ]);
}

const allEquip = (getAllEquip() as Equip[][])
    .map((e) => [e.reduce((a, c) => a + c.cost, 0), e])
    .sort((a, b) => (a[0] as number) - (b[0] as number));

const play = (player: Player, boss: Player) => {
    while (true) {
        boss.hp -= Math.max(1, player.damage - boss.armor);
        player.hp -= Math.max(1, boss.damage - player.armor);
        if (boss.hp <= 0) return true;
        if (player.hp <= 0) return false;
    }
};

const createPlayer = (list: Equip[]) => ({
    hp: 100,
    damage: list.reduce((a, c) => a + c.damage, 0),
    armor: list.reduce((a, c) => a + c.armor, 0)
});

const ans1 = allEquip.find((i) =>
    play(createPlayer(i[1] as Equip[]), { ...boss })
);
console.log('Part 1', ans1![0]);

const ans2 = allEquip
    .reverse()
    .find((i) => !play(createPlayer(i[1] as Equip[]), { ...boss }));
console.log('Part 2', ans2![0]);
