import data from './day18_input.ts';
// import data from './day18_sample.ts';
const P = data()
    .split('\n')
    .map((l) => {
        const [d1, n1, color] = l.split(' ');
        const c = color.replace(/[\(\)#]/g, '');
        return {
            ins1: { d: d1, n: +n1 },
            ins2: {
                d: 'RDLU'[+c.at(-1)!],
                n: parseInt(c.slice(0, -1), 16)
            }
        };
    });

const area = (ins: { d: string; n: number }[]) => {
    const pts: number[][] = [];
    let [r, c] = [0, 0];
    let border = 0;
    ins.forEach((p) => {
        const { d, n } = p;
        if (d === 'U') r -= n;
        if (d === 'D') r += n;
        if (d === 'L') c -= n;
        if (d === 'R') c += n;
        pts.push([r, c]);
        border += n;
    });
    let area = 0;
    pts.forEach((p1, i) => {
        const [[x1, y1], [x2, y2]] = [p1, pts[(i + 1) % pts.length]];
        area += (x1 * y2 - x2 * y1) * 0.5; //shoelace method
    });
    return Math.abs(area) + border / 2 + 1; //pick's theorem
};
console.log('A', area(P.map((p) => p.ins1)));
console.log('B', area(P.map((p) => p.ins2)));
