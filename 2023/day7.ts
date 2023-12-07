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

const typeRank: Record<string, number> = {
    '5': 7,
    '41': 6,
    '32': 5,
    '311': 4,
    '221': 3,
    '2111': 2,
    '11111': 1
};

const getLetterFreq = (s: string) => {
    const freq: Record<string, number> = {};
    s.split('').forEach((c) => (freq[c] = (freq[c] ?? 0) + 1));
    return freq;
};

const getType = (cards: string) => {
    return Object.values(getLetterFreq(cards))
        .sort((a, b) => b - a)
        .join('');
};

const sortLabel = (a: string, b: string) => {
    for (let i = 0; i < a.length; i++) {
        const d = cardRank[a[i]] - cardRank[b[i]];
        if (d === 0) continue;
        return d < 0 ? -1 : 1;
    }
    return 0;
};

const sortType = (a: string, b: string) => {
    const aRank = typeRank[getType(a)];
    const bRank = typeRank[getType(b)];
    if (aRank === bRank) return 0;
    return aRank < bRank ? -1 : 1;
};

const sortStrength = (a: string, b: string) => {
    const r = sortType(a, b);
    return r === 0 ? sortLabel(a, b) : r;
};

const getWinning = (sortFunc: (a: hand, b: hand) => number) =>
    hands.sort(sortFunc).reduce((a, c, i) => a + c.bid * (i + 1), 0);

console.log(
    'A',
    getWinning((a: hand, b: hand) => sortStrength(a.cards, b.cards))
);

const fillJoker = (s: string) => {
    return s
        .split('')
        .map((c) => s.replaceAll('J', c))
        .sort((a, b) => sortStrength(b, a))[0];
};

cardRank.J = 0;
console.log(
    'B',
    getWinning((a: hand, b: hand) => {
        const r = sortType(fillJoker(a.cards), fillJoker(b.cards));
        return r === 0 ? sortLabel(a.cards, b.cards) : r;
    })
);
