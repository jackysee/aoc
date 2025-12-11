import data from './day11_input.js';
// import { data } from './day11_sample.js';
// import { data2 as data } from './day11_sample.js';

const M = {};
for (const line of data().split('\n')) {
    const [key, value] = line.split(': ');
    M[key] = value.split(' ');
}

const dfs = (from, to, memo = {}) => {
    if (from === to) return 1;
    if (memo[from] !== undefined) return memo[from];
    memo[from] = (M[from] || []).reduce((a, c) => a + dfs(c, to, memo), 0);
    return memo[from];
};

console.log(dfs('you', 'out'));

const countPaths = (paths) =>
    paths.slice(0, -1).reduce((a, c, i) => a * dfs(c, paths[i + 1]), 1);

console.log(
    countPaths(['svr', 'fft', 'dac', 'out']) +
        countPaths(['svr', 'dac', 'fft', 'out'])
);
