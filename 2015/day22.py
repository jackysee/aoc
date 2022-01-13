class Character():
    def __init__(self, hp, armor, dmg, mana):
        self.hp = hp
        self.armor = armor
        self.dmg = dmg
        self.mana = mana

class Insta():
    def __init__(self, dmg, heal):
        self.dmg = dmg
        self.heal = heal

    def perform(self, player, boss):
        player.hp += self.heal
        boss.hp -= self.dmg


class Effect():
    def __init__(self, id_, turns, armor_boost, dmg, mana_up):
        self.id_ = id_
        self.turns = turns
        self.armor_boost = armor_boost
        self.dmg = dmg
        self.mana_up = mana_up
        self.total_turns = turns

    def reset(self):
        return Effect(self.id_, self.total_turns, self.armor_boost, self.dmg, self.mana_up)

    def __hash__(self):
        return self.id_

    def __eq__(self, other):
        return self.id_ == other.id_

    def use(self, player, boss):
        if self.turns == self.total_turns:
            player.armor += self.armor_boost
        boss.hp -= self.dmg
        player.mana += self.mana_up
        self.turns -= 1
        if self.turns == 0:
            player.armor -= self.armor_boost

EMPTY_EFFECT = Effect(-1, 0, 0, 0, 0)

class Spell():
    def __init__(self, name, mana, effect, insta):
        self.name = name
        self.mana = mana
        self.effect = effect
        self.insta = insta

    def cast_spell(self, player, boss, effects):
        player.mana -= self.mana
        if player.mana < 0 or self.effect in effects:
            return False
        if self.insta is not None:
            self.insta.perform(player, boss)
        if self.effect != EMPTY_EFFECT:
            effects.add(self.effect)
        return True

def total_mana(spells):
    return sum([sp.mana for sp in spells])

def use_effects(effects, player, boss):
    for effect in effects:
        effect.use(player, boss)
    return set([e for e in effects if e.turns > 0])


def simulate_battle(spell_order):
    spell_order = [Spell(s.name, s.mana, s.effect.reset(), s.insta) for s in spell_order]
    boss = Character(55, 0, 8, 0)
    player = Character(50, 0, 0, 500)
    effects = set()
    sp = 0
    for sp in range(len(spell_order)):
        player.hp -= 1
        if player.hp <= 0:
            return -3
        effects = use_effects(effects, player, boss)
        if boss.hp <= 0:
            return total_mana(spell_order[:sp])
        if not spell_order[sp].cast_spell(player, boss, effects):
            return -2
        effects = use_effects(effects, player, boss)
        if boss.hp <= 0:
            return total_mana(spell_order[:sp+1])
        player.hp -= max(1, boss.dmg - player.armor)
        if player.hp <= 0:
            return -3
    return -1

spells = [
    Spell('Magic Missile', 53, EMPTY_EFFECT, Insta(4, 0)),
    Spell('Drain', 73, EMPTY_EFFECT, Insta(2, 2)),
    Spell('Shield', 113, Effect(1, 6, 7, 0, 0), None),
    Spell('Poison', 173, Effect(2, 6, 0, 3, 0), None),
    Spell('Recharge', 229, Effect(3, 5, 0, 0, 101), None)
]

sp_perm = [[]]
while True:
    n_sp = []
    for comb in sp_perm:
        for s in spells:
            n_sp.append(comb + [s])
    sp_perm = n_sp
    mn = -1
    next_sp_perm = []
    for sp in sp_perm:
        v = simulate_battle(sp)
        if v == -1:
           next_sp_perm.append(sp)
           continue
        if v == -2 or v == -3:
           continue
        if mn == -1 or v < mn:
            mn = v
    if mn != -1:
        break
    sp_perm = next_sp_perm
print(mn)
