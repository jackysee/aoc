import data from './day19_input.ts';
// import data from './day19_sample.ts';

interface Signal {
    pos: number[];
    fingerPrint: string[];
}
interface Scanner {
    id: number;
    signals: Signal[];
    pos: number[];
}

const manhanttanDist = (pos1: number[], pos2: number[]) =>
    Math.abs(pos1[0] - pos2[0]) +
    Math.abs(pos1[1] - pos2[1]) +
    Math.abs(pos1[2] - pos2[2]);

let scanners = data()
    .split('\n\n')
    .map((s, si) => {
        let lines = s.split('\n');
        let pos = lines.slice(1).map((s) => s.split(',').map(Number));
        let signals = [];
        for (let i = 0; i < pos.length; i++) {
            let fingerPrint = [];
            for (let j = 0; j < pos.length; j++) {
                if (i === j) continue;
                fingerPrint[j] = manhanttanDist(pos[i], pos[j]) + '';
            }
            signals.push({ pos: pos[i], fingerPrint });
        }
        return { id: si, signals, pos: [0, 0, 0] };
    });

function compareSignal(s1: Signal, s2: Signal) {
    let intersections = [];
    for (let idx1 = 0; idx1 < s1.fingerPrint.length; idx1++) {
        let idx2 = s2.fingerPrint.indexOf(s1.fingerPrint[idx1]);
        if (idx2 !== -1) {
            intersections.push([s1.fingerPrint[idx1], idx1, idx2]);
        }
    }
    return intersections;
}

function compareScanner(scanner1: Scanner, scanner2: Scanner) {
    for (let i = 0; i < scanner1.signals.length; i++) {
        const sig1 = scanner1.signals[i];
        for (let j = 0; j < scanner2.signals.length; j++) {
            const sig2 = scanner2.signals[j];
            const intersections = compareSignal(sig1, sig2);
            if (intersections.length >= 11) {
                return { sig1, sig2, intersections };
            }
        }
    }
}

const posDiff = (pos1: number[], pos2: number[]) => [
    pos1[0] - pos2[0],
    pos1[1] - pos2[1],
    pos1[2] - pos2[2]
];

//figure out the rotation matrix
// newx = map[0] * oldx + map[3] * oldy + map[6] * oldz
// newy = map[1] * oldx + map[4] * oldy + map[7] * oldz
// newz = map[2] * oldx + map[5] * oldy + map[8] * oldz
const getRotationMatrix = (
    [dx0, dy0, dz0]: number[],
    [dx1, dy1, dz1]: number[]
) => {
    const r = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (dx0 === dx1) r[0] = 1;
    if (dx0 === -dx1) r[0] = -1;
    if (dx0 === dy1) r[3] = 1;
    if (dx0 === -dy1) r[3] = -1;
    if (dx0 === dz1) r[6] = 1;
    if (dx0 === -dz1) r[6] = -1;
    if (dy0 === dx1) r[1] = 1;
    if (dy0 === -dx1) r[1] = -1;
    if (dy0 === dy1) r[4] = 1;
    if (dy0 === -dy1) r[4] = -1;
    if (dy0 === dz1) r[7] = 1;
    if (dy0 === -dz1) r[7] = -1;
    if (dz0 === dx1) r[2] = 1;
    if (dz0 === -dx1) r[2] = -1;
    if (dz0 === dy1) r[5] = 1;
    if (dz0 === -dy1) r[5] = -1;
    if (dz0 === dz1) r[8] = 1;
    if (dz0 === -dz1) r[8] = -1;
    return r;
};

function alignScanner(scanner1: Scanner, scanner2: Scanner) {
    let compareResult = compareScanner(scanner1, scanner2);
    if (!compareResult) return false;
    let { sig1, sig2, intersections } = compareResult;
    for (let [_, idx1, idx2] of intersections) {
        let sig1To = scanner1.signals[idx1 as number];
        const d1 = posDiff(sig1.pos, sig1To.pos);

        //skip same dx/y/z pair as we cannot deduce the rotation by that
        if (
            Math.abs(d1[0]) === Math.abs(d1[1]) ||
            Math.abs(d1[1]) === Math.abs(d1[2]) ||
            Math.abs(d1[2]) === Math.abs(d1[3])
        )
            continue;

        let sig2To = scanner2.signals[idx2 as number];
        const d2 = posDiff(sig2.pos, sig2To.pos);
        let r = getRotationMatrix(d1, d2);

        for (let s of scanner2.signals) {
            let [x, y, z] = s.pos;
            s.pos[0] = r[0] * x + r[3] * y + r[6] * z;
            s.pos[1] = r[1] * x + r[4] * y + r[7] * z;
            s.pos[2] = r[2] * x + r[5] * y + r[8] * z;
        }
        scanner2.pos = [
            sig1.pos[0] - sig2.pos[0],
            sig1.pos[1] - sig2.pos[1],
            sig1.pos[2] - sig2.pos[2]
        ];
        for (let s of scanner2.signals) {
            s.pos[0] += scanner2.pos[0];
            s.pos[1] += scanner2.pos[1];
            s.pos[2] += scanner2.pos[2];
        }
        break;
    }
    return true;
}

function alignAll(scanners: Scanner[]) {
    const fixed = new Set([0]); //scanner 0  as based
    while (fixed.size < scanners.length) {
        for (let i = 0; i < scanners.length; i++) {
            const scanner1 = scanners[i];
            if (!fixed.has(i)) continue;
            for (let j = 0; j < scanners.length; j++) {
                if (i === j || fixed.has(j)) continue;
                const scanner2 = scanners[j];
                if (alignScanner(scanner1, scanner2)) fixed.add(j);
            }
        }
    }
}

alignAll(scanners);
console.log(
    'Part 1',
    new Set(scanners.flatMap((s) => s.signals.map((sig) => sig.pos + ''))).size
);

let max = -Infinity;
for (let i = 0; i < scanners.length; i++) {
    const scanner1 = scanners[i];
    for (let j = 0; j < scanners.length; j++) {
        if (i === j) continue;
        const scanner2 = scanners[j];
        const d = manhanttanDist(scanner1.pos, scanner2.pos);
        if (d > max) max = d;
    }
}
console.log('Part 2', max);
