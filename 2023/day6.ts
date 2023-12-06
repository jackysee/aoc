import data from './day6_input.ts';
// import data from './day6_sample.ts';
const input = data().split('\n');
const times = [...input[0].matchAll(/\d+/g)].map(Number);
const dists = [...input[1].matchAll(/\d+/g)].map(Number);

const getWinCount = (dist: number, time: number) => {
    let hold = 1;
    let count = 0;
    while (hold < time) {
        const travel = (time - hold) * hold;
        if (travel > dist) count++;
        hold++;
    }
    return count;
};

console.log(
    'A',
    dists.map((d, i) => getWinCount(d, times[i])).reduce((a, c) => a * c, 1)
);
console.log('B', getWinCount(+dists.join(''), +times.join('')));

const getCountQuadratic = (d: number, t: number) => {
    // d = x*t - x*x
    // -x*x + x*t - d = 0  => a = -1, b = t, c = -d
    const sqrt = Math.sqrt(t * t - 4 * d);
    const d1 = Math.ceil((t + sqrt) / 2);
    const d2 = Math.floor((t - sqrt) / 2);
    return d1 - d2 - 1;
};
console.log('B', getCountQuadratic(+dists.join(''), +times.join('')));
