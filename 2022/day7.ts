import data from './day7_input.ts';
// import data from './day7_sample.ts';

const path: string[] = [];
const S: Record<string, number> = {};
data()
    .split('\n')
    .forEach((l) => {
        const cmd = l.split(' ');
        if (cmd[1] === 'cd') {
            if (cmd[2] === '..') {
                path.pop();
            } else {
                path.push(cmd[2]);
            }
        }
        if (/^\d+$/.test(cmd[0])) {
            for (let i = 0; i < path.length; i++) {
                const p = path.slice(0, i + 1).join('/');
                S[p] = (S[p] || 0) + Number(cmd[0]);
            }
        }
    });

console.log(
    Object.values(S)
        .filter((v) => v <= 100000)
        .reduce((a, c) => a + c, 0)
);

const required = 30000000 - (70000000 - S['/']);
console.log(
    Object.values(S)
        .sort((a, b) => a - b)
        .find((v) => v >= required)
);
