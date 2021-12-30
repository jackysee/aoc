// const data = require('./day18_sample.js');
const data = require('./day18_input.js');
let M = {};
let mx = -Infinity;
let my = -Infinity;
data()
    .split('\n')
    .forEach((l, y) =>
        l.split('').forEach((v, x) => {
            if (x > mx) mx = x;
            if (y > my) my = y;
            M[[x, y]] = v;
        })
    );

function getSurround(M, x, y) {
    let s = {};
    [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1]
    ].forEach(([_x, _y]) => {
        let v = M[[_x, _y]];
        if (v !== undefined) s[v] = (s[v] || 0) + 1;
    });
    return s;
}

function change(_M) {
    let M = {};
    Object.entries(_M).forEach(([k, v]) => {
        let [x, y] = k.split(',').map(Number);
        let s = getSurround(_M, x, y);
        M[[x, y]] = v;
        if (v === '.' && s['|'] >= 3) {
            M[[x, y]] = '|';
        }
        if (v === '|' && s['#'] >= 3) {
            M[[x, y]] = '#';
        }
        if (v === '#' && !(s['#'] >= 1 && s['|'] >= 1)) {
            M[[x, y]] = '.';
        }
    });
    return M;
}

function getCount(M) {
    let count = {};
    Object.values(M).forEach((v) => {
        count[v] = (count[v] || 0) + 1;
    });
    return count;
}

function changeBy(M, min) {
    let _M = { ...M };
    for (let i = 0; i < min; i++) {
        _M = change(_M);
    }
    let count = getCount(_M);
    return [count['|'] * count['#'], _M];
}
console.log('Part 1', changeBy(M, 10)[0]);

function toStr(M) {
    let str = '';
    for (let y = 0; y <= my; y++) {
        for (let x = 0; x <= mx; x++) {
            str += M[[x, y]];
        }
    }
    return str;
}

function findRepeat(_M) {
    let M = { ..._M };
    let seen = new Set([toStr(M)]);
    let i = 1;
    while (true) {
        M = change(M);
        let state = toStr(M);
        if (seen.has(state)) break;
        seen.add(state);
        i++;
    }
    return i;
}

let r = findRepeat(M);
let remain = 1000000000 % r;

// console.log('-----');
// console.log(toStr(changeBy(M, 1)[1]), '\n------\n', toStr(changeBy(M, 16)[1]));
console.log({ r, remain });
console.log(changeBy(M, remain)[0]);

// console.log('Part 2', changeBy(M, 0)[0], changeBy(M, 16)[0]);
