import data from './day22_input.js';
// import data from './day22_sample.js';
const ns = data().split('\n').map(Number);

const mix = (n, m) => ((n ^ m) >>> 0) % 16777216;

const generate = (n) => {
    n = mix(n * 64, n);
    n = mix(Math.floor(n / 32), n);
    n = mix(n * 2048, n);
    return n;
};

const M = {};
let sum = 0;
ns.forEach((num) => {
    const prices = [];
    const seen = {};
    for (let i = 0; i < 2000; i++) {
        num = generate(num);
        const p = num % 10;
        prices.push(p);
        if (i >= 4) {
            const trend = [
                prices[i - 3] - prices[i - 4],
                prices[i - 2] - prices[i - 3],
                prices[i - 1] - prices[i - 2],
                prices[i] - prices[i - 1]
            ].join(',');
            if (!seen[trend]) {
                M[trend] = (M[trend] ?? 0) + p;
                seen[trend] = true;
            }
        }
    }
    sum += num;
});
console.log('A', sum);
console.log('B', Math.max(...Object.values(M)));
