import data from './day21_input.ts';
// import data from './day21_sample.ts';

let [start1, start2]: number[] = data()
    .split('\n')
    .map((s) => parseInt(s.match(/(?<=: )\d+/)![0], 10));

interface Player {
    pos: number;
    score: number;
    id: number;
}

let p1 = { pos: start1, score: 0, id: 1 };
let p2 = { pos: start2, score: 0, id: 2 };

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
        let step = roll();
        moves(p1, step);
        if (p1.score >= 1000) break;

        step = roll();
        moves(p2, step);
        if (p2.score >= 1000) break;
    }
    return { p1, p2, dice };
};

let result = playDeterministic(p1, p2);
console.log(
    'Part 1',
    (result.p1.score >= 1000 ? result.p2.score : result.p1.score) * result.dice
);

let won: { [key: number]: number } = { 1: 0, 2: 0 };
const playQuantum = (p1: Player, p2: Player) => {
    let states: { [key: string]: number } = {};
    states[`${p1.pos},0,${p2.pos},0,1`] = 1;
    while (Object.keys(states).length) {
        Object.entries(states).forEach(([e, c]) => {
            [1, 2, 3].forEach((d1) => {
                [1, 2, 3].forEach((d2) => {
                    [1, 2, 3].forEach((d3) => {
                        delete states[e];
                        let s = e.split(',').map(Number);
                        let [posIdx, scoreIdx] = s[4] === 1 ? [0, 1] : [2, 3];
                        s[posIdx] = ((s[posIdx] - 1 + (d1 + d2 + d3)) % 10) + 1;
                        s[scoreIdx] += s[posIdx];
                        if (s[scoreIdx] >= 21) {
                            won[s[4]] += c;
                            return;
                        }
                        s[4] = s[4] === 1 ? 2 : 1;
                        let _e = s.join(',');
                        if (states[_e] === undefined) states[_e] = 0;
                        states[_e] += c;
                    });
                });
            });
        });
    }
    return Math.max(...Object.values(won));
};
console.log('Part 2', playQuantum(p1, p2));
