import data from './day14_input.ts';
// import data from './day14_sample.ts';

const ints = (s: string) => (s.match(/-?\d+/g) || []).map(Number);
const asc = (a: number, b: number) => a - b;
const M: Record<string, string> = {};
let maxY = 0;
data()
    .split('\n')
    .map((line) => {
        const pts: number[][] = line.split(' -> ').map(ints);
        for (let i = 1; i < pts.length; i++) {
            let [x1, y1] = pts[i - 1];
            let [x2, y2] = pts[i];
            [x1, x2] = [x1, x2].sort(asc);
            [y1, y2] = [y1, y2].sort(asc);
            for (let x = x1; x <= x2; x++) {
                for (let y = y1; y <= y2; y++) {
                    M[`${x},${y}`] = '#';
                }
            }
            maxY = Math.max(maxY, pts[i - 1][1], pts[i][1]);
        }
    });

const floor = maxY + 2;
const source = '500,0';
let count = 0;
const sands = [source];
let p1 = false;
while (true) {
    const sand = sands.at(-1)!;
    const [x, y] = ints(sand);
    if (y > maxY && !p1) {
        p1 = true;
        console.log(count);
    }
    const _sand = [
        `${x},${y + 1}`,
        `${x - 1},${y + 1}`,
        `${x + 1},${y + 1}`
    ].find((p) => M[p] !== '#' && M[p] !== 'o' && y + 1 !== floor);
    if (!_sand) {
        M[sand] = 'o';
        count++;
        if (sand === source) break;
        sands.pop();
    } else {
        sands.push(_sand);
    }
}
console.log(count);
