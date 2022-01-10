import data from './day16_input.ts';

interface Sue {
    id: number;
    attrs: Record<string, number>;
}

let arr: Sue[] = data()
    .split('\n')
    .map((l) => {
        let m = l.match(/^Sue (\d+):\s*(.*)$/)!;
        let id = Number(m[1]);
        let attrs = Object.fromEntries(
            m[2].split(',').map((l) => {
                let [k, v] = l.split(':').map((s) => s.trim());
                return [k, Number(v)];
            })
        );
        return { id, attrs };
    });

const clues = Object.entries({
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
});

const matchClues = (s: Sue) =>
    clues.filter(([k, v]) => s.attrs[k] === v).length;

arr.sort((a, b) => matchClues(b) - matchClues(a));
console.log('Part 1', arr[0].id);

const matchClues2 = (s: Sue) =>
    clues.filter(([k, v]) => {
        if (/cats|trees/.test(k)) return s.attrs[k] > v;
        if (/pomeranians|goldfish/.test(k)) return s.attrs[k] < v;
        return s.attrs[k] === v;
    }).length;

arr.sort((a, b) => matchClues2(b) - matchClues2(a));
console.log('Part 2', arr[0].id);
