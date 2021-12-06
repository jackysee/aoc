import data from './day5_input.ts';
// import data from './day5_sample.ts';

const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));

interface Line {
    dx: number;
    dy: number;
    points: string[];
}
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
        while (true) {
            points.push([x, y].join(','));
            if (x === x2 && y === y2) break;
            x += dx;
            y += dy;
        }
        return { dx, dy, points };
    });

const countOverlaps = (lines: Line[], diagonal: boolean = false) => {
    const scores = lines
        .filter((l) => diagonal || l.dx === 0 || l.dy === 0)
        .flatMap((l) => l.points)
        .reduce((scores: { [key: string]: number }, p) => {
            scores[p] = scores[p] || 0;
            scores[p] += 1;
            return scores;
        }, {});
    return Object.values(scores).filter((s) => s >= 2).length;
};

console.log('Part 1:', countOverlaps(arr));
console.log('Part 2:', countOverlaps(arr, true));
