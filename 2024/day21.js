import data from './day21_input.js';
// import data from './day21_sample.js';
const codes = data().split('\n');

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
                    if (m === n) [nr, nc] = [r, c];
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
    return ['A', ...code]
        .map((c, i, arr) => {
            if (i === 0) return '';
            const p = paths[arr[i - 1]][c];
            return p;
        })
        .join('');
};

const chunks = (code) => {
    const M = {};
    code.split('A')
        .slice(0, -1)
        .forEach((c) => {
            M[c + 'A'] = (M[c + 'A'] ?? 0) + 1;
        });
    return M;
};

const findSeqLen = (code, robots = 2) => {
    let m = chunks(findSeq(code, NUMSPATH));
    for (let i = 0; i < robots; i++) {
        const nm = {};
        Object.entries(m).forEach(([code, t]) => {
            const s = findSeq(code, DIRSPATH);
            Object.entries(chunks(s)).forEach(([c, ct]) => {
                nm[c] ??= 0;
                nm[c] += t * ct;
            });
            m = nm;
        });
    }
    return Object.entries(m).reduce((a, [k, v]) => a + k.length * v, 0);
};

const complexity = (robots) => {
    return codes.reduce(
        (a, c) => a + findSeqLen(c, robots) * Number(c.substring(0, 3)),
        0
    );
};

console.log('A', complexity(2));
console.log('B', complexity(25));
