import data from './day9_input.js';
// import data from './day9_sample.js';

let id = 0;
const S = data()
    .split('')
    .map((s, i) => {
        let result;
        if (i % 2 == 0) {
            (result = { id, size: +s }), id++;
        } else {
            result = { space: true, size: +s };
        }
        return result;
    });

const expand = (S) => {
    return S.flatMap((s) => {
        return Array(s.size).fill(s.space ? '.' : s.id);
    });
};

const move1 = (blocks) => {
    let i = blocks.length - 1;
    let j = blocks.indexOf('.');
    while (i >= 0) {
        const b = blocks[i];
        if (b !== '.') {
            blocks[j] = b;
            blocks.splice(i);
            j = blocks.indexOf('.', j);
            if (j === -1) break;
        }
        i--;
    }
    return blocks;
};

const part1 = (S) => {
    const blocks = expand(S);
    move1(blocks);
    return blocks.reduce((a, c, i) => a + c * i, 0);
};

console.time('A');
console.log('A', part1(S));
console.timeEnd('A');

const part2 = (_S) => {
    const S = [..._S];
    let i = S.length - 1;
    let j = -1;
    while (i >= 0) {
        const b = S[i];
        if (!b.space && !b.moved) {
            j = S.findIndex((s) => s.space && s.size >= b.size);
            if (j !== -1 && j < i) {
                const s = S[j];
                S.splice(i, 1, { space: true, size: b.size });
                if (s.size === b.size) {
                    S.splice(j, 1, b);
                } else {
                    S.splice(j, 1, b, { space: true, size: s.size - b.size });
                }
                b.moved = true;
            }
        }
        i--;
    }
    return expand(S).reduce((a, c, i) => a + (c === '.' ? 0 : c * i), 0);
};

console.time('B');
console.log('B', part2(S));
console.timeEnd('B');
