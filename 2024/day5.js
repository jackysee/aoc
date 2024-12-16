import data from './day5_input.js';
// import data from './day5_sample.js';

const arr = data().split('\n\n');
const rules = {};
arr[0].split('\n').map((l) => {
    const [m, n] = l.split('|').map(Number);
    rules[m] = rules[m] ?? [];
    rules[m].push(n);
});
const updates = arr[1].split('\n').map((l) => l.split(',').map(Number));

const isValid = (list) => {
    return list.every((n, i) => {
        return (
            !rules[n] ||
            rules[n].every((m) => {
                const idx = list.indexOf(m);
                return idx === -1 || idx > i;
            })
        );
    });
};

const getResult = (list) =>
    list
        .map((list) => list[Math.floor(list.length / 2)])
        .reduce((a, c) => a + c, 0);

console.log('A', getResult(updates.filter(isValid)));

const fix = (list) =>
    list.toSorted((a, b) => ((rules[a] || []).includes(b) ? -1 : 1));

console.log('B', getResult(updates.filter((a) => !isValid(a)).map(fix)));
