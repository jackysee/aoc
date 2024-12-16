import data from './day7_input.ts';
// import data from './day7_sample.ts';

type hand = { cards: string; bid: number };
const hands: hand[] = data()
    .split('\n')
    .map((l) => {
        const s = l.split(' ');
        return { cards: s[0], bid: Number(s[1]) };
    });

const cardRank = Object.fromEntries(
    '23456789TJQKA'.split('').map((c, i) => [c, i + 1])
);
const typeRank = Object.fromEntries(
    '11111,2111,221,311,32,41,5'.split(',').map((c, i) => [c, i + 1])
);

const getTypeRank = (cards: string) => {
    const freq = {} as Record<string, number>;
    cards.split('').forEach((c) => (freq[c] = (freq[c] ?? 0) + 1));
    return typeRank[
        Object.values(freq)
            .sort((a, b) => b - a)
            .join('')
    ];
};

const sortLabel = (a: string, b: string) => {
    for (let i = 0; i < a.length; i++) {
        const d = Math.sign(cardRank[a[i]] - cardRank[b[i]]);
        if (d === 0) continue;
        return d;
    }
    return 0;
};

const sortType = (a: string, b: string) =>
    Math.sign(getTypeRank(a) - getTypeRank(b));

const sortStrength = (a: string, b: string) =>
    sortType(a, b) || sortLabel(a, b);

const getWinning = (sortFunc: (a: hand, b: hand) => number) =>
    hands.sort(sortFunc).reduce((a, c, i) => a + c.bid * (i + 1), 0);

console.log(
    'A',
    getWinning((a, b) => sortStrength(a.cards, b.cards))
);

const fillJoker = (s: string) =>
    s
        .split('')
        .map((c) => s.replaceAll('J', c))
        .sort((a, b) => sortStrength(b, a))[0];

cardRank.J = 0;
console.log(
    'B',
    getWinning(
        (a, b) =>
            sortType(fillJoker(a.cards), fillJoker(b.cards)) ||
            sortLabel(a.cards, b.cards)
    )
);
