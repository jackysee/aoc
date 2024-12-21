// import data from './day21_input.js';
import data from './day21_sample.js';
const codes = data().split('\n');
// const M = data().split('\n').map(l => [...l]);
console.log(codes);

/*
789
456
123
 0A

 ^A
<V>
*/

const NUMPAD = ['789', '456', '123', ' 0A'];
const DIRPAD = [' ^A', '<v>'];
const NUMS = '0A123456789'.split('');
const DIRS = '^<v>A'.split('');

const findPosMap = (NS, PAD) => {
    return Object.fromEntries(
        NS.map((n) => {
            let nr, nc;
            PAD.forEach((row, r) => {
                row.split('').forEach((m, c) => {
                    if (m === n) {
                        nr = r;
                        nc = c;
                    }
                });
            });
            return [n, [nr, nc]];
        })
    );
};

const findPadPath = (s, e, NS, PAD) => {
    const posMap = findPosMap(NS, PAD);
    const [sr, sc] = posMap[s];
    const [er, ec] = posMap[e];
    const result = [];
    const Q = [[sr, sc, []]];
    const seen = {};
    while (Q.length) {
        const [r, c, path] = Q.shift();
        if (r === er && c === ec) {
            result.push(path);
        }
        [
            [r - 1, c, '^'],
            [r + 1, c, 'v'],
            [r, c - 1, '<'],
            [r, c + 1, '>']
        ].forEach(([nr, nc, dir]) => {
            const n = PAD[nr]?.[nc];
            if (!n || n === ' ') return;
            if (seen[[nr, nc]]) return;
            Q.push([nr, nc, [...path, dir]]);
            seen[[nr, nc]] = true;
        });
    }
    return result;
};

const NUMSPATH = {};
NUMS.forEach((s) => {
    NUMSPATH[s] = {};
    NUMS.forEach((e) => {
        if (s == e) return;
        NUMSPATH[s][e] = findPadPath(s, e, NUMS, NUMPAD);
    });
});

const DIRSPATH = {};
DIRS.forEach((s) => {
    DIRSPATH[s] = {};
    DIRS.forEach((e) => {
        if (s == e) return;
        DIRSPATH[s][e] = findPadPath(s, e, DIRS, DIRPAD);
    });
});

console.log(DIRSPATH);

const findSeq = (code, paths) => {
    let last = 'A';
    return code
        .split('')
        .flatMap((c) => {
            if (last === c) return ['A'];
            const p = paths[last][c][0];
            last = c;
            return [...p, 'A'];
        })
        .join('');
};
// console.log(findSeq('029A', NUMSPATH));
// console.log(findSeq(findSeq(findSeq('029A', NUMSPATH), DIRSPATH), DIRSPATH));
//

const finalSeq = (code) => {
    let s = findSeq(code, NUMSPATH);
    console.log('1', s);
    s = findSeq(s, DIRSPATH);
    console.log('2', s, s.length, 'v<<A>>^A<A>AvA<^AA>A<vAAA>^A'.length);
    s = findSeq(s, DIRSPATH);
    console.log(
        '3',
        s.length,
        '<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A'
            .length
    );
    console.log('g', s);
    console.log(
        's',
        '<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A'
    );
    return s;
};

console.log(
    finalSeq('029A').length,
    '<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A'
        .length
);

/*

 ^A
<V>

v<<A>^>A<A>A<AAv>A^Av<AAA^>A

v: v<A
<: <A
<: A
A: >^>A
>: vA
^: ^<A
>: v>A


*/

console.log('d', findSeq('v<<A>^>A^', DIRSPATH));
