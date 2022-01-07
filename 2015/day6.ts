import data from './day6_input.ts';
// import data from './day6_sample.ts';

type Instruction = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    s: string;
};
let arr: Instruction[] = data()
    .trim()
    .split('\n')
    .map((l) => {
        let [x1, y1, x2, y2] = l.match(/\d+/g)!.map(Number);
        let s = l.match(/^[^\d]+/)![0].trim();
        return { x1, y1, x2, y2, s };
    });

function run(actions: { [key: string]: Function }) {
    let M: { [key: string]: number } = {};
    arr.forEach((i) => {
        for (let y = i.y1; y <= i.y2; y++) {
            for (let x = i.x1; x <= i.x2; x++) {
                let pos = [x, y] + '';
                M[pos] = actions[i.s](M[pos] || 0);
            }
        }
    });
    return M;
}

const actions1 = {
    'turn on': () => 1,
    'turn off': () => 0,
    toggle: (val: number) => (val == 0 ? 1 : 0)
};
console.log(
    'Part 1',
    Object.values(run(actions1)).reduce((a, c) => a + c, 0)
);

const actions2 = {
    'turn on': (val: number) => val + 1,
    'turn off': (val: number) => Math.max(0, val - 1),
    toggle: (val: number) => val + 2
};
console.log(
    'Part 2',
    Object.values(run(actions2)).reduce((a, c) => a + c, 0)
);
