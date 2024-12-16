import data from './day5_input.ts';
// import data from './day5_sample.ts';

const [stackStr, insStr] = data().split('\n\n');
const stacks1: Record<string, string[]> = {};
const stacks2: Record<string, string[]> = {};
stackStr
    .split('\n')
    .slice(0, -1)
    .forEach((l) => {
        let s = 1;
        for (let i = 0; i <= l.length; i += 4) {
            const m = l.slice(i, i + 4).match(/\[(\w)\]/);
            if (m) {
                stacks1[s] = [m[1], ...(stacks1[s] || [])];
                stacks2[s] = [m[1], ...(stacks2[s] || [])];
            }
            s++;
        }
    });

const move = (stacks: Record<string, string[]>, [n, from, to]: number[]) => {
    stacks[to] = [...stacks[to], ...stacks[from].slice(-n)];
    stacks[from] = stacks[from].slice(0, -n);
};

insStr
    .split('\n')
    .map((l) => l.match(/\d+/g)!.map(Number))
    .forEach(([n, from, to]) => {
        for (let i = 0; i < n; i++) move(stacks1, [1, from, to]);
        move(stacks2, [n, from, to]);
    });

const top = (stacks: Record<string, string[]>) =>
    Object.values(stacks)
        .map((v) => v.at(-1))
        .join('');

console.log(top(stacks1));
console.log(top(stacks2));
