// const data = require('./day17_sample.js');
const data = require('./day17_input.js');

let M = { '500,0': '+' };
data()
    .split('\n')
    .forEach((s) => {
        let r = {};
        s.split(', ').forEach((p) => {
            let [axis, v] = p.split('=');
            let values = v.split('..').map(Number);
            r[axis] = values.length === 1 ? [values[0], values[0]] : values;
        });
        for (let x = r.x[0]; x <= r.x[1]; x++) {
            for (let y = r.y[0]; y <= r.y[1]; y++) {
                M[`${x},${y}`] = '#';
            }
        }
    });

const printMap = (M) => {
    let points = Object.keys(M).map((s) => s.split(',').map(Number));
    let minX = Math.min(...points.map((p) => p[0]));
    let maxX = Math.max(...points.map((p) => p[0]));
    let minY = Math.min(...points.map((p) => p[1]));
    let maxY = Math.max(...points.map((p) => p[1]));
    let str = '';
    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            str += M[[x, y]] || '.';
        }
        str += '\n';
    }
    console.log(str);
};
printMap(M);
