import data from './day21_input.js';
// import data from './day21_sample.js';
const codes = data().split('\n');
// const M = data().split('\n').map(l => [...l]);
// console.log(codes);

/*
789
456
123
 0A

 ^A
<V>

<^A vs ^<A

it is either "move vertically then horizontally", or 
"move horizontally then vertically". 
If one of the options is blocked by an empty space, the choice is obvious; 
otherwise turns out, 
we should always prefer going left, then down, then up, then right
*/

const NUMPAD = ['789', '456', '123', '#0A'];
const DIRPAD = ['#^A', '<v>'];
const NUMS = '0A123456789'.split('');
const DIRS = '^<v>A'.split('');

const findPosMap = (NS, PAD) => {
    return Object.fromEntries(
        [...NS, '#'].map((n) => {
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
    const [wr, wc] = posMap['#'];
    const [sr, sc] = posMap[s];
    const [er, ec] = posMap[e];
    const [dr, dc] = [er - sr, ec - sc];
    const row = Array(Math.abs(dc))
        .fill(ec < sc ? '<' : '>')
        .join('');
    const col = Array(Math.abs(dr))
        .fill(er < sr ? '^' : 'v')
        .join('');
    //when go left , prefer left -> up/down
    //when go right , prefer down/up -> right
    const result = dc < 0 ? [row, col] : [col, row];
    if ((sr === wr && ec === wc) || (sc === wc && er === wr)) {
        //if it will hit a wall, flip the move
        result.reverse();
    }
    return result.join('') + 'A';
};

const NUMSPATH = {};
NUMS.forEach((s) => {
    NUMSPATH[s] = {};
    NUMS.forEach((e) => {
        NUMSPATH[s][e] = findPadPath(s, e, NUMS, NUMPAD);
    });
});

const DIRSPATH = {};
DIRS.forEach((s) => {
    DIRSPATH[s] = {};
    DIRS.forEach((e) => {
        DIRSPATH[s][e] = findPadPath(s, e, DIRS, DIRPAD);
    });
});

const findSeq = (code, paths) => {
    let last = 'A';
    return code
        .split('')
        .flatMap((c) => {
            const p = paths[last][c];
            last = c;
            return [...p];
        })
        .join('');
};

const finalSeq = (code, robots = 2) => {
    let s = findSeq(code, NUMSPATH);
    for (let i = 0; i < robots; i++) {
        s = findSeq(s, DIRSPATH);
    }
    return s;
};
// console.log(finalSeq('029A'));

const complexity = (robots) => {
    let sum = 0;
    for (const c of codes) {
        // console.log(c, '-', finalSeq(c).length, +c.substring(0, 3));
        // console.log(c, finalSeq(c).length, Number(c.substring(0, 3)));
        sum += finalSeq(c, robots).length * Number(c.substring(0, 3));
    }
    return sum;
};
console.log('A', complexity(2));
// console.log('B', complexity(25));
