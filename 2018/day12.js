//AOC2018 D12
import data from './day12_input.js';

function parse(s) {
    let [state, rules] = s.split('\n\n');
    state = state
        .replace('initial state: ', '')
        .split('')
        .map((c, i) => [i, c]);
    rules = Object.fromEntries(
        rules.split('\n').map((l) => {
            let [pattern, result] = l.split(' => ');
            return [pattern, result];
        })
    );
    return { state, rules };
}

function generate(state, rules) {
    let i1 = state[0][0];
    let i2 = state[state.length - 1][0];
    let list = [
        ...Array(4)
            .fill('.')
            .map((c, i) => [i1 - 4 + i, '.']),
        ...state,
        ...Array(4)
            .fill('.')
            .map((c, i) => [i2 + i + 1, '.'])
    ];
    let idx = 0;
    let result = [];
    while (idx < list.length - 4) {
        let _list = list.slice(idx, idx + 5);
        let pattern = _list.map((a) => a[1]).join('');
        let r = rules[pattern];
        result.push([_list[2][0], r || '.']);
        idx++;
    }
    while (true) {
        if (result[0][1] === '#') break;
        result.shift();
    }
    while (true) {
        if (result[result.length - 1][1] === '#') break;
        result.pop();
    }
    return result;
}

function getSum(state) {
    return state.filter(([n, v]) => v === '#').reduce((a, [n]) => a + n, 0);
}

function grow(s, generation = 20) {
    let { state, rules } = parse(s);
    let sum, diff, gen;
    for (let i = 0; i < generation; i++) {
        state = generate(state, rules);
        let _sum = getSum(state);
        if (i > 0) {
            let _diff = _sum - sum;
            if (diff === _diff) {
                gen = i;
                break;
            }
            diff = _diff;
            sum = _sum;
        }
    }
    if (gen) {
        sum += diff * (generation - gen);
    }
    return sum;
}

// grow(sample());
console.log(grow(data(), 20));
console.log(grow(data(), 50000000000));

function sample() {
    return `
initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #
    `.trim();
}
