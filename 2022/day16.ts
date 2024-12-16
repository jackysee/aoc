import data from './day16_input.ts';
// import data from './day16_sample.ts';

const ints = (s: string) => (s.match(/-?\d+/g) || []).map(Number);
type Valve = { rate: number; to: string[] };
const M: Record<string, Valve> = {};
data()
    .split('\n')
    .forEach((line) => {
        const [from, ...to] = line.match(/[A-Z][A-Z]/g)!;
        M[from] = { to, rate: ints(line)[0] };
    });

const D: Record<string, Record<string, number>> = {};
const nonEmpty: string[] = [];
for (const valve in M) {
    D[valve] = { [valve]: 0 };
    if (M[valve].rate > 0) nonEmpty.push(valve);
    const seen = new Set([valve]);
    const queue = [{ dist: 0, valve }];
    while (queue.length) {
        const q = queue.shift()!;
        M[q.valve].to.forEach((v) => {
            if (seen.has(v)) return;
            seen.add(v);
            D[valve][v] = q.dist + 1;
            queue.push({ dist: q.dist + 1, valve: v });
        });
    }
    delete D[valve][valve];
}

const cache: Record<string, number> = {};
const dfs = (time: number, valve: string, opened: number) => {
    const key = [time, valve, opened].join('|');
    if (cache[key]) return cache[key];
    let max = 0;
    for (const v in D[valve]) {
        if (M[v].rate === 0) continue;
        const bit = 1 << nonEmpty.indexOf(v);
        if (opened & bit) continue;
        const t = time - D[valve][v] - 1;
        if (t <= 0) continue;
        max = Math.max(max, dfs(t, v, opened | bit) + M[v].rate * t);
    }
    cache[key] = max;
    return max;
};
console.log(dfs(30, 'AA', 0));

const t = Date.now();
let max = 0;
const b = (1 << nonEmpty.length) - 1;
for (let i = 0; i < b + 1; i++) {
    max = Math.max(max, dfs(26, 'AA', i) + dfs(26, 'AA', b ^ i));
}
console.log('Part 2 took', Date.now() - t, 'ms');
console.log(max);
