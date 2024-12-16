import data from './day13_input.ts';
const patterns = data().split('\n\n');

const findMirrorAcross = (lines: string[]) => {
    const result = [];
    for (let i = 1; i < lines.length; i++) {
        const len = Math.min(i, lines.length - i);
        const left = lines.slice(i - len, i);
        const right = lines.slice(i, i + len);
        if (left.toReversed().join('|') === right.join('|')) {
            result.push(i);
        }
    }
    return result;
};

const findMirror = (pattern: string) => {
    const rows = pattern.split('\n');
    const cols = rows[0]
        .split('')
        .map((_, i) => rows.map((p) => p[i]).join(''));
    return [findMirrorAcross(rows), findMirrorAcross(cols)];
};

const replace = (s: string, i: number) => {
    const arr = s.split('');
    const target = arr[i] === '.' ? '#' : '.';
    arr[i] = target;
    return arr.join('');
};

let A = 0;
let B = 0;
patterns.forEach((pattern) => {
    const [rows, cols] = findMirror(pattern);
    A += (rows[0] || 0) * 100 + (cols[0] || 0);
    const arr = pattern.split('');
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '\n') continue;
        let [_rows, _cols] = findMirror(replace(pattern, i));
        _rows = _rows.filter((i) => !rows.includes(i));
        _cols = _cols.filter((i) => !cols.includes(i));
        if (_rows.length || _cols.length) {
            B += (_rows[0] || 0) * 100 + (_cols[0] || 0);
            break;
        }
    }
});

console.log('A', A);
console.log('B', B);
