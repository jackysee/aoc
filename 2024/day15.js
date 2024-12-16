import data from './day15_input.js';
// import data from './day15_sample.js';
// import { s2 as data } from './day15_sample.js';
// import { s3 as data } from './day15_sample.js';

const parse = (s) => {
    const arr = s.split('\n\n');
    const M = arr[0].split('\n').map((l) => [...l]);
    const moves = arr[1].split('');
    return { M, moves };
};

const { M: OM, moves } = parse(data());

const findRobot = (M) => {
    const r = M.findIndex((row) => row.includes('@'));
    const c = M[r].indexOf('@');
    return [r, c];
};

const dir = (m) => {
    let dr, dc;
    if (m === '^') [dr, dc] = [-1, 0];
    if (m === '>') [dr, dc] = [0, 1];
    if (m === 'v') [dr, dc] = [1, 0];
    if (m === '<') [dr, dc] = [0, -1];
    return [dr, dc];
};

// const printMap = (M) => console.log(M.map((r) => r.join('')).join('\n'));

const move = (M, m) => {
    const [r, c] = findRobot(M);
    const [dr, dc] = dir(m);
    let canMove = false;
    const toMove = [[r, c, '@']];
    let [nr, nc] = [r, c];
    while (true) {
        [nr, nc] = [nr + dr, nc + dc];
        const tile = M[nr]?.[nc];
        if (!tile || tile === '#') break;
        if (tile === 'O') toMove.push([nr, nc, tile]);
        if (tile === '[' || tile === ']') {
            canMove = moveBox(M, m, [nr, nc], toMove);
            break;
        }
        if (tile === '.') {
            canMove = true;
            break;
        }
    }
    if (canMove) {
        toMove.forEach(([r, c]) => (M[r][c] = '.'));
        toMove.forEach(([r, c, tile]) => (M[r + dr][c + dc] = tile));
    }
};

const moveBox = (M, m, [r, c], toMove) => {
    const [dr, dc] = dir(m);
    const tile = M[r]?.[c];
    let box;
    if (tile === '[') {
        box = [
            [r, c, '['],
            [r, c + 1, ']']
        ];
    }
    if (tile === ']') {
        box = [
            [r, c - 1, '['],
            [r, c, ']']
        ];
    }
    const next = box.map(([r, c]) => [M[r + dr]?.[c + dc], r + dr, c + dc]);
    if (next.some(([t]) => t === '#')) return false;
    if ('^v'.includes(m) && next.every(([t]) => t === '.')) {
        toMove.push(...box);
        return true;
    }
    if ('<'.includes(m) && next[0][0] === '.') {
        toMove.push(...box);
        return true;
    }
    if ('>'.includes(m) && next[1][0] === '.') {
        toMove.push(...box);
        return true;
    }
    let ns;
    if (m === '<' && next[0][0] === ']') ns = [next[0]];
    else if (m === '>' && next[1][0] === '[') ns = [next[1]];
    else if ('^v'.includes(m)) ns = next.filter(([t]) => '[]'.includes(t));
    if (ns?.length) {
        const result = ns.map((n) => moveBox(M, m, n.slice(1), toMove));
        if (result.every((r) => r)) {
            toMove.push(...box);
            return true;
        }
    }
    return false;
};

const M = OM.map((row) => [...row]);
moves.forEach((m) => move(M, m));

const countGps = (M) => {
    let sum = 0;
    M.forEach((row, r) => {
        row.forEach((t, c) => {
            if (t === 'O' || t === '[') sum += 100 * r + c;
        });
    });
    return sum;
};
console.log('A', countGps(M));

const NM = OM.map((row) =>
    row.flatMap(
        (t) =>
            ({
                '.': ['.', '.'],
                '@': ['@', '.'],
                O: ['[', ']'],
                '#': ['#', '#']
            })[t]
    )
);

moves.forEach((m) => move(NM, m));
console.log('B', countGps(NM));

// const MM = `
// ##########################
// #........................#
// #........................#
// #........................#
// #........................#
// #........................#
// #................[]@.....#
// #.................[].....#
// #................[][][]..#
// #............[]...[][]...#
// #....[][]....[]....[]#...#
// #........................#
// #........................#
// ##########################

// v
// `.trim();

// const o = parse(MM);
// o.moves.forEach((m) => move(o.M, m));
// printMap(o.M);
