import data from './day4_input.ts';
// import data from './day4_sample.ts';

interface Item {
    letters: string;
    id: number;
    checksum: string;
}
let arr: Item[] = data()
    .split('\n')
    .map((l) => {
        let [_, letters, id, checksum] = l.split(/([a-z\-]+)(\d+)\[([a-z]+)\]/);
        return { letters, id: Number(id), checksum };
    });

const countFrequencies = (s: string) => {
    s = s.replace(/-/g, '');
    let M = s.split('').reduce((a, c) => {
        a[c] = (a[c] || 0) + 1;
        return a;
    }, {} as Record<string, number>);
    return Object.entries(M).sort((a, b) => {
        if (b[1] === a[1]) return a[0].charCodeAt(0) - b[0].charCodeAt(0);
        return b[1] - a[1];
    });
};

const realRooms = arr.filter(
    (c: Item) =>
        countFrequencies(c.letters)
            .slice(0, 5)
            .map((a) => a[0])
            .join('') == c.checksum
);
console.log(
    'Part 1',
    realRooms.reduce((a, c: Item) => a + c.id, 0)
);

const shift = (c: string, t: number) => {
    if (c === '-') return '-';
    return String.fromCharCode(((c.charCodeAt(0) - 97 + t) % 26) + 97);
};

const room = realRooms.find(
    (i) =>
        i.letters
            .split('')
            .map((c) => shift(c, i.id))
            .join('')
            .indexOf('northpole-object') === 0
)!;
console.log('Part 2', room.id);
