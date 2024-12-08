import data from './day14_input.ts';
// import data from './day14_sample.ts';
interface Reindeer {
    name: string;
    speed: number;
    run: number;
    rest: number;
}
let arr: Reindeer[] = data()
    .split('\n')
    .map((l) => {
        let name = l.split(' ')[0];
        let [speed, run, rest] = l.match(/\d+/g)!.map(Number);
        return { name, speed, run, rest };
    });

function travelled(d: Reindeer, t: number): number {
    let period = Math.floor(t / (d.run + d.rest));
    let left = t % (d.run + d.rest);
    let dist = period * d.run * d.speed;
    if (left > 0) {
        if (left > d.run) dist += d.speed * d.run;
        else dist += left * d.speed;
    }
    return dist;
}

function findWinner(arr: Reindeer[], t: number): [string, number] {
    return arr
        .map((d) => [d.name, travelled(d, t)] as [string, number])
        .sort((a, b) => b[1] - a[1])[0]!;
}

console.log('Part 1', findWinner(arr, 2503)[1]);

let scores: Record<string, number> = {};
for (let i = 1; i <= 2503; i++) {
    let [winner] = findWinner(arr, i);
    scores[winner] = (scores[winner] || 0) + 1;
}

console.log('Part 2', Object.entries(scores).sort((a, b) => b[1] - a[1])[0][1]);
