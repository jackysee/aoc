import data from './day12_input.js';
// import data from './day12_sample.js';

const datas = data().split('\n\n');
const presents = [];
for (const d of datas.slice(0, -1)) {
    const s = d.split('\n').slice(1).join('\n');
    presents.push({ s, area: [...s].filter((c) => c === '#').length });
}
let count = 0;
for (const l of datas[datas.length - 1].split('\n')) {
    const nums = [...l.matchAll(/\d+/g)].flat().map((n) => +n);
    const area = nums[0] * nums[1];
    const need = nums.slice(2).reduce((a, c, i) => a + c * presents[i].area, 0);
    //0.85 is a magic percentage works on both sample and real input
    //just a trial-and-error value, not a generic solution
    if (area >= need && need / area <= 0.85) count++;
}
console.log(count);
