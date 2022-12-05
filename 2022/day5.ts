import data from './day5_input.ts';
// import data from './day5_sample.ts';

const [stackStr, insStr] = data().split('\n\n');
const stacks: Record<string, string[]> = {};
stackStr
    .split('\n')
    .slice(0, -1)
    .forEach((l) => {
        let s = 1;
        for (let i = 0; i <= l.length; i += 4) {
            const m = l.slice(i, i + 4).match(/\[(\w)\]/);
            if (m) {
                stacks[s] = stacks[s] || [];
                stacks[s] = [m[1], ...stacks[s]];
            }
            s++;
        }
    });

const ins = insStr.split('\n').map((l) => l.match(/\d+/g)!.map(Number));

const copy = (stacks: Record<string, string[]>) =>
    Object.fromEntries(Object.entries(stacks).map(([k, v]) => [k, [...v]]));

const mover1 = (_stacks: Record<string, string[]>) => {
    const stacks = copy(_stacks);
    ins.forEach(([n, from, to]) => {
        for (let i = 0; i < n; i++) {
            stacks[to].push(stacks[from].pop()!);
        }
    });
    return stacks;
};

const topCrates = (stacks: Record<string, string[]>) => {
    return Object.values(stacks)
        .map((v) => v.at(-1))
        .join('');
};

console.log(topCrates(mover1(stacks)));

const mover2 = (_stacks: Record<string, string[]>) => {
    const stacks = copy(_stacks);
    ins.forEach(([n, from, to]) => {
        const arr = stacks[from].slice(-n);
        stacks[from] = stacks[from].slice(0, -n);
        stacks[to] = [...stacks[to], ...arr];
    });
    return stacks;
};

console.log(topCrates(mover2(stacks)));
