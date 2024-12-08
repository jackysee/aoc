import data from './day25_input.ts';
// import data from './day25_sample.ts';

let M: { [key: string]: string } = {};
let lines = data().split('\n');
lines.forEach((l, y) => l.split('').forEach((v, x) => (M[[x, y] + ''] = v)));
let [my, mx] = [lines.length, lines[0].length];

let step = 0;
while (true) {
    let moved = false;
    let _M: { [key: string]: string } = {};
    for (let k in M) {
        let [x, y] = k.split(',').map(Number);
        if (M[k] === '>' && M[[(x + 1) % mx, y] + ''] === '.') {
            _M[[(x + 1) % mx, y] + ''] = '>';
            _M[[x, y] + ''] = '.';
            moved = true;
        }
    }
    for (let k in _M) M[k] = _M[k];
    _M = {};
    for (let k in M) {
        let [x, y] = k.split(',').map(Number);
        if (M[k] === 'v' && M[[x, (y + 1) % my] + ''] === '.') {
            _M[[x, (y + 1) % my] + ''] = 'v';
            _M[[x, y] + ''] = '.';
            moved = true;
        }
    }
    for (let k in _M) M[k] = _M[k];
    step++;
    if (!moved) break;
}
console.log(step);
