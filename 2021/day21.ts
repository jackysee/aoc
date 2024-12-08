import data from './day21_input.ts';
// import data from './day21_sample.ts';

let [start1, start2]: number[] = data()
    .split('\n')
    .map((s) => parseInt(s.match(/(?<=: )\d+/)![0], 10));

interface Player {
    pos: number;
    score: number;
}

let p1 = { pos: start1, score: 0 };
let p2 = { pos: start2, score: 0 };

const moves = (p: Player, step: number) => {
    p.pos = ((p.pos - 1 + step) % 10) + 1;
    p.score += p.pos;
};

const playDeterministic = (_p1: Player, _p2: Player) => {
    let p1 = { ..._p1 };
    let p2 = { ..._p2 };
    let dice = 0;
    const roll = () => {
        let r = dice + 1 + dice + 2 + dice + 3;
        dice += 3;
        return r;
    };
    while (true) {
        moves(p1, roll());
        if (p1.score >= 1000) break;
        moves(p2, roll());
        if (p2.score >= 1000) break;
    }
    return { p1, p2, dice };
};

let result = playDeterministic(p1, p2);
console.log(
    'Part 1',
    (result.p1.score >= 1000 ? result.p2.score : result.p1.score) * result.dice
);

let rolls = [
    [3, 1],
    [4, 3],
    [5, 6],
    [6, 7],
    [7, 6],
    [8, 3],
    [9, 1]
];
let won = [0, 0];
const playQuantum = ({ pos: p1 }: Player, { pos: p2 }: Player) => {
    let states: { [key: string]: number } = {};
    states[[p1, 0, p2, 0].join(',')] = 1;
    let turn = 0;
    while (Object.keys(states).length) {
        let newStates: { [key: string]: number } = {};
        Object.entries(states).forEach(([k, c]) => {
            rolls.forEach(([n, f]) => {
                let [p1, s1, p2, s2] = k.split(',').map(Number);
                p1 = ((p1 - 1 + n) % 10) + 1;
                s1 += p1;
                if (s1 >= 21) {
                    won[turn] += c * f;
                    return;
                }
                let _k = [p2, s2, p1, s1].join(',');
                newStates[_k] = (newStates[_k] || 0) + c * f;
            });
        });
        turn = turn === 0 ? 1 : 0;
        states = newStates;
    }
    return Math.max(...Object.values(won));
};
console.log('Part 2', playQuantum(p1, p2));
