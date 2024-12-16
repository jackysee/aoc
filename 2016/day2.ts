import data from './day2_input.ts';
const arr: string[] = data().split('\n');

const parseMap = (s: string) => {
    let M: Record<string, string> = {};
    s.split('|').forEach((l, y) =>
        l.split('').forEach((n, x) => (M[[x, y] + ''] = n.trim()))
    );
    return M;
};

const walk = (
    _x: number,
    _y: number,
    dir: string,
    M: Record<string, string>
) => {
    let [x, y] = [_x, _y];
    if (dir === 'U') y -= 1;
    if (dir === 'D') y += 1;
    if (dir === 'L') x -= 1;
    if (dir === 'R') x += 1;
    if (!M[[x, y] + '']) return [_x, _y];
    return [x, y];
};

const getCode = (x: number, y: number, s: string) => {
    let M = parseMap(s);
    return arr
        .map((l) => {
            l.split('').forEach((dir) => ([x, y] = walk(x, y, dir, M)));
            return M[[x, y] + ''];
        })
        .join('');
};

console.log('Part 1', getCode(1, 1, '123|456|789'));
console.log('Part 2', getCode(0, 2, '  1  | 234 |56789| ABC |  D  '));
