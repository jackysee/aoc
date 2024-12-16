import data from './day17_input.ts';
// import data from './day17_sample.ts';

type Rows = string[][];
const jets = data().split('');

//prettier-ignore
const createBlock = (M:Rows, type:number) => {
    const H = M.length;
    if (type === 0) {     //horizontal line
        return [ [2, H + 3], [3, H + 3], [4, H + 3], [5, H + 3] ];
    }
    if(type === 1) { //the cross
        return [ [2, H+4], [3, H+3], [3, H+4], [3, H+5], [4, H+4] ];
    }
    if(type === 2) { //inverted L
        return [ [2, H + 3], [3, H + 3], [4, H + 3], [4, H + 4], [4, H + 5] ];
    }
    if(type === 3) { //vertical line
        return [ [2, H+3], [2, H+4], [2, H+5], [2, H+6] ];
    }
    if(type === 4) {
        return [ [2, H+3], [3, H+3], [2, H+4], [3, H+4] ]
    }
};

const moveLeft = (M: Rows, block: number[][]) => {
    const _block = block.map(([x, y]) => [x - 1, y]);
    if (_block.some(([x, y]) => x < 0 || M[y]?.[x] === '#')) return block;
    return _block;
};

const moveRight = (M: Rows, block: number[][]) => {
    const _block = block.map(([x, y]) => [x + 1, y]);
    if (_block.some(([x, y]) => x > 6 || M[y]?.[x] === '#')) return block;
    return _block;
};

const moveDown = (M: Rows, block: number[][]) => {
    const _block = block.map(([x, y]) => [x, y - 1]);
    if (_block.some(([x, y]) => M[y]?.[x] === '#' || y < 0)) {
        return { ok: false, block };
    }
    return { ok: true, block: _block };
};

const rest = (M: Rows = [], block: number[][]) => {
    block.forEach(([x, y]) => {
        if (!M[y]) M[y] = [...Array(7)].fill('.');
        M[y][x] = '#';
    });
    return M;
};

const getColumnHeights = (M: Rows) => {
    const heights = [...Array(7)].fill(0);
    const done = [...Array(7)].fill(false);
    for (let y = M.length - 1; y >= 0; y--) {
        M[y].forEach((x, i) => {
            if (x === '.' && !done[i]) heights[i]++;
            if (x === '#') done[i] = true;
        });
        if (done.every((d) => d)) return heights;
    }
    return heights;
};

const cacheKey = (r: number, j: number, M: Rows) => {
    return [r, j, getColumnHeights(M).join(',')].join(',');
};

// const render = (M: Rows) => {
//     return M.map((l) => l.join(''))
//         .reverse()
//         .join('\n');
// };

const dropRocks = (ROCKS: number) => {
    let j = 0;
    const M: Rows = [];
    const H: Record<number, number> = {};
    const memo: Record<string, number> = {};
    for (let r = 0; r < ROCKS; r++) {
        let block = createBlock(M, r % 5)!;
        while (true) {
            const dir = jets[j % jets.length];
            if (dir === '<') block = moveLeft(M, block);
            if (dir === '>') block = moveRight(M, block);
            j++;
            const result = moveDown(M, block);
            if (result.ok) {
                block = result.block;
            } else {
                rest(M, block);
                break;
            }
        }
        H[r] = M.length;
        const key = cacheKey(r % 5, j % jets.length, M);
        if (memo[key] !== undefined) {
            const oldr = memo[key];
            const oldHeight = H[oldr];
            const cycles = Math.floor((ROCKS - oldr) / (r - oldr));
            const left = (ROCKS - oldr) % (r - oldr);
            const repeatedHeight = cycles * (M.length - oldHeight);
            const leftHeight = H[oldr + left] - oldHeight;
            return oldHeight + repeatedHeight + leftHeight - 1;
        } else {
            memo[key] = r;
        }
    }
    return M.length;
};

console.log(dropRocks(2022));
console.log(dropRocks(1_000_000_000_000));
