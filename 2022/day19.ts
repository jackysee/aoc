import data from './day19_input.ts';
// import data from './day19_sample.ts';

//impl ref https://nickymeuleman.netlify.app/garden/aoc2022-day19
//https://nbviewer.org/github/mjpieters/adventofcode/blob/master/2022/Day%2019.ipynb
const ints = (s: string) => (s.match(/-?\d+/g) || []).map(Number);
const B: number[][][] = []; //Blueprint
const M: number[][] = []; //Max conumption of material
data()
    .split('\n')
    .forEach((line) => {
        const a = ints(line);
        B[a[0]] = [
            [a[1], 0, 0, 0], //ore
            [a[2], 0, 0, 0], //clay
            [a[3], a[4], 0, 0], //obs
            [a[5], 0, a[6], 0] //geo
        ];
        M[a[0]] = M[a[0]] || [0, 0, 0, Infinity];
        M[a[0]][0] = Math.max(M[a[0]][0], a[1], a[2], a[3], a[5]);
        M[a[0]][1] = Math.max(M[a[0]][1], a[4]);
        M[a[0]][2] = Math.max(M[a[0]][2], a[6]);
    });

const GEO = 3;

const getGeode = (time: number, id: number) => {
    let max = 0;
    const res = [0, 0, 0, 0];
    const bots = [1, 0, 0, 0];
    const queue = [{ res, bots, time }];
    while (queue.length) {
        const q = queue.pop()!;
        if (q.time < 1) continue;
        //triangle number of T-1 is max GEO can produce
        if (
            (q.time * (q.time - 1)) / 2 + q.res[GEO] + q.time * q.bots[GEO] <
            max
        )
            continue;

        max = Math.max(max, q.res[GEO] + q.time * q.bots[GEO]);

        B[id].forEach((costs, type) => {
            if (!costs.every((v, i) => (v > 0 ? q.bots[i] > 0 : true))) return;
            if (q.bots[type] >= M[id][type]) return;

            const wait =
                Math.max(
                    ...costs.map((v, i) => {
                        if (q.res[i] >= v) return 0;
                        return Math.floor(
                            (v - q.res[i] + q.bots[i] - 1) / q.bots[i]
                        );
                    })
                ) + 1;

            if (q.time - wait < 0) return;
            queue.push({
                res: q.res.map((n, i) => (n += wait * q.bots[i] - costs[i])),
                bots: q.bots.map((n, i) => n + (i === type ? 1 : 0)),
                time: q.time - wait
            });
        });
    }
    return max;
};

console.log(Object.keys(B).reduce((a, c) => a + +c * getGeode(24, +c), 0));
console.log([1, 2, 3].reduce((a, c) => a * getGeode(32, c), 1));
