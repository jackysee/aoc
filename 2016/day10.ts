import data from './day10_input.ts';
const [val1, val2] = [17, 61];
// import data from './day10_sample.ts';
// const [val1, val2] = [2, 5];

interface Bot {
    id: number;
    input: number[];
    hiTarget: [string, number];
    lowTarget: [string, number];
}

let bots: Bot[] = [];
let initValues: number[][] = [];
let output: number[][] = [];

data()
    .split('\n')
    .forEach((l) => {
        let [a, b, c] = l.match(/\d+/g)!.map(Number);
        if (l.startsWith('value')) {
            initValues.push([a, b]);
        }
        if (l.startsWith('bot')) {
            bots[a] = {
                id: a,
                input: [],
                lowTarget: [l.match(/(?<=low to )\w+/)![0], b],
                hiTarget: [l.match(/(?<=high to )\w+/)![0], c]
            };
        }
    });

initValues.forEach(([val, bot]) => bots[bot].input.push(val));
const send = ([target, i]: [string, number], val: number) => {
    if (target === 'bot') bots[i].input.push(val);
    if (target === 'output') output[i] = [...(output[i] || []), val];
};

let part1 = false;
while (true) {
    let canSend = bots.filter((b) => b.input.length === 2);
    if (!canSend.length) break;
    for (let i = 0; i < canSend.length; i++) {
        const b = canSend[i];
        let [low, hi] = b.input.sort((a, b) => a - b);
        if (low === val1 && hi === val2) {
            !part1 && console.log('Part 1', b.id);
            part1 = true;
        }
        send(b.lowTarget, low);
        send(b.hiTarget, hi);
        b.input = [];
    }
}

console.log(
    'Part 2',
    output
        .slice(0, 3)
        .flat()
        .reduce((a, c) => a * c, 1)
);
