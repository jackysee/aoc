// const data = require('./day17_sample.js');
import data from './day17_input.js';

let M = {};
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

const toXY = (p) => p.split(',').map(Number);

const getRange = (M) => {
    let points = Object.keys(M).map(toXY);
    let xs = points.map((p) => p[0]);
    let ys = points.map((p) => p[1]);
    let minX = Math.min(...xs);
    let maxX = Math.max(...xs);
    let minY = Math.min(...ys);
    let maxY = Math.max(...ys);
    return { minX, maxX, minY, maxY };
};

let R = getRange(M);

const printMap = (M) => {
    let r = getRange(M);
    let str = '';
    for (let y = r.minY; y <= r.maxY; y++) {
        for (let x = r.minX; x <= r.maxX; x++) {
            str += M[[x, y]] || ' ';
        }
        str += '\n';
    }
    return str;
};

M['500,0'] = '+';
let queue = ['500,0']; //source

const fillRow = (x, y) => {
    let row = [];
    let [_x, _y] = [x, y];
    while (true) {
        if (_x > R.maxX) break;
        if (M[[_x, _y] + ''] === '#') break;
        row.push([_x, _y]);
        _x++;
    }
    [_x, _y] = [x, y];
    while (true) {
        if (_x < R.minX) break;
        if (M[[_x, _y] + ''] === '#') break;
        row.push([_x, _y]);
        _x--;
    }
    let sources = [];
    if (row.every((p) => M[p] === '|')) {
        row.forEach(([x, y]) => {
            M[[x, y] + ''] = '~';
            if (M[[x, y - 1] + ''] === '|') {
                sources.push([x, y - 1] + '');
            }
        });
    }
    return sources;
};

while (queue.length) {
    let pt = queue.shift();
    let [x, y] = toXY(pt);
    let down = [x, y + 1] + '';
    let left = [x - 1, y] + '';
    let right = [x + 1, y] + '';
    if (M[pt] === '+' || M[pt] === '|') {
        if (M[down] === undefined && y < R.maxY) {
            M[down] = '|';
            queue.push(down);
        }
        if (M[down] === '#' || M[down] === '~') {
            if (M[left] === undefined) {
                M[left] = '|';
                queue.push(left);
            }
            if (M[right] === undefined) {
                M[right] = '|';
                queue.push(right);
            }
            if ([M[left], M[right]].some((v) => ['#', '|'].includes(v))) {
                let sources = fillRow(x, y);
                if (sources) queue.push(...sources);
            }
        }
    }
}

const count = (M, pattern) => {
    return Object.entries(M).filter(([k, v]) => {
        let y = toXY(k)[1];
        return y >= R.minY && y <= R.maxY && pattern.test(v);
    }).length;
};

console.log('Part 1', count(M, /\||~/));
console.log('Part 2', count(M, /~/));
