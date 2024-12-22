import data from './day22_input.js';
// import data from './day22_sample.js';
const ns = data().split('\n').map(Number);

const mix = (n, m) => {
    return ((n ^ m) >>> 0) % 16777216;
};

const generate = (n) => {
    n = mix(n * 64, n);
    n = mix(Math.floor(n / 32), n);
    n = mix(n * 2048, n);
    return n;
};

const nthSecret = (num, n) => {
    for (let i = 0; i < n; i++) {
        num = generate(num);
    }
    return num;
};

console.log(
    'A',
    ns.reduce((a, n) => a + nthSecret(n, 2000), 0)
);
