// import data from './day19_input.ts';
import data from './day19_sample.ts';

const ints = (s: string) => (s.match(/-?\d+/g) || []).map(Number);
const sum = (a: number, c: number) => a + c;
const asc = (a: number, b: number) => a - b;
const desc = (a: number, b: number) => b - a;
// prettier-ignore
const range = (a: number, b: number) => Array.from({length: b - a}, (_, n) => n + a);
// prettier-ignore
const DIRS = [[0,1],[0,-1],[1,0],[-1,0]];

const B: Record<number, Record<string, number[]>> = {};
data()
    .split('\n')
    .forEach((line) => {
        const a = ints(line);
        B[a[0]] = {
            ore: [a[1], 0, 0, 0],
            clay: [a[2], 0, 0, 0],
            obs: [a[3], a[4], 0, 0],
            geo: [a[5], 0, a[6], 0]
        };
    });

console.log(B);

const types = ['ore', 'clay', 'obs', 'geo'];

const cache: Record<string, number> = {};
const getQuality = (
    time: number,
    bid: number,
    res = [0, 0, 0, 0],
    bots = [1, 0, 0, 0]
) => {
    const key = [time, bid, res.join(','), bots.join(',')].join('|');
    if (cache[key]) return cache[key];

    let max = 0;
    while (true) {
        const canBuild: number[] = [];
        types.forEach((t, i) => {
            if (B[bid][t].every((v, i) => res[i] >= v)) canBuild.push(i);
        });
        //collect
        res = res.map((n, i) => (n += bots[i]));
        time -= 1;
        if (time === 0) {
            // max = Math.max(max, res[3]);
            // break;
            return res[3];
        }

        if (canBuild.length) {
            //not build a robot
            max = Math.max(max, getQuality(time, bid, [...res], [...bots]));

            //build robot
            canBuild.forEach((i) => {
                const _bots = [...bots];
                _bots[i] += 1;
                const _res = [...res];
                B[bid][types[i]].forEach((v, i) => (_res[i] -= v));
                max = Math.max(max, getQuality(time, bid, _res, _bots));
            });
            break;
        }
    }
    cache[key] = max;
    return max;
};
console.log(getQuality(24, 1, [0, 0, 0, 0], [1, 0, 0, 0]));
