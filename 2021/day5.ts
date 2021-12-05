import data from './day5_input.ts';
// import data from './day5_sample.ts';

interface Line {
    dx: number;
    dy: number;
    points: string[];
}

const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));

let arr: Array<Line> = data()
    .trim()
    .split('\n')
    .map((line) => {
        const [[x1, y1], [x2, y2]] = line
            .split(' -> ')
            .map((p) => p.split(',').map(Number));
        const d = gcd(Math.abs(x2 - x1), Math.abs(y2 - y1));
        const dx = (x2 - x1) / d;
        const dy = (y2 - y1) / d;
        const points: string[] = [];
        let x = x1;
        let y = y1;
        while (x !== x2 || y !== y2) {
            points.push([x, y].join(','));
            x += dx;
            y += dy;
        }
        points.push([x, y].join(','));
        return { dx, dy, points };
    });

const getOverlaps = (lines: Line[], diagonal: boolean = false) => {
    const scores: { [key: string]: number } = {};
    lines.forEach((line) => {
        if (!diagonal && line.dx != 0 && line.dy !== 0) return;
        line.points.forEach((p) => {
            if (!scores[p]) scores[p] = 1;
            else scores[p] += 1;
        });
    });
    return Object.values(scores).filter((s) => s >= 2).length;
};

console.log('Part 1:', getOverlaps(arr));
console.log('Part 2:', getOverlaps(arr, true));
