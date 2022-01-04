// const data = require('./day23_sample.js');
const data = require('./day23_input.js');

let arr = data()
    .split('\n')
    .map((s) => s.match(/-?\d+/g).map(Number));

let o = [...arr].sort((a, b) => b[3] - a[3])[0];

const dist = (p1, p2) => [0,1,2].map(i => Math.abs(p1[i] - p2[i])).reduce((a,c) => a + c, 0);

// console.log({o});
// console.log(arr.map(n => [dist(o, n), dist(o,n)<=o[3]]))
console.log('Part 1', arr.filter((n) => dist(o, n) <= o[3]).length);

const xs = arr.map(p => p[0]);
const ys = arr.map(p => p[1]);
const zs = arr.map(p => p[2]);
const [x1, x2] = [Math.min(...xs), Math.max(...xs)];
const [y1, y2] = [Math.min(...ys), Math.max(...ys)];
const [z1, z2] = [Math.min(...zs), Math.max(...zs)];

console.log({x1,x2,y1,y2,z1,z2})
console.log((x2-x1) / 10)
console.log((y2-y1) / 10)
console.log((z2-z1) / 10)
