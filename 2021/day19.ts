// import data from './day19_input.ts';
import data from './day19_sample.ts';

interface Signal {
    pos: number[];
    fingerPrint: string[];
}
interface Scanner {
    id: number;
    signals: Signal[];
}

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
                const dx = Math.abs(pos[i][0] - pos[j][0]);
                const dy = Math.abs(pos[i][1] - pos[j][1]);
                const dz = Math.abs(pos[i][2] - pos[j][2]);
                fingerPrint[j] = [
                    Math.hypot(dx, dy, dz).toFixed(5),
                    Math.min(dx, dy, dz),
                    Math.max(dx, dy, dz)
                ].join(',');
            }
            signals.push({ pos: pos[i], fingerPrint });
        }
        return { id: si, signals };
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

interface CompareSignalResult {
    sig1: Signal;
    sig2: Signal;
    intersections: [string, number, number][];
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

function alignScanner(
    scanner1: Scanner,
    scanner2: Scanner,
    compareResult: any
) {
    let { sig1, sig2, intersections } = compareResult;
    for (let [_, idx1, idx2] of intersections) {
        let sig1To = scanner1.signals[idx1];
        const dx0 = sig1.pos[0] - sig1To.pos[0];
        const dy0 = sig1.pos[1] - sig1To.pos[1];
        const dz0 = sig1.pos[2] - sig1To.pos[2];
        console.log({ dx0, dy0, dz0 });

        let sig2To = scanner2.signals[idx2];
        const dx1 = sig2.pos[0] - sig2To.pos[0];
        const dy1 = sig2.pos[1] - sig2To.pos[1];
        const dz1 = sig2.pos[2] - sig2To.pos[2];
        console.log({ dx1, dy1, dz1 });
    }
}

let r = compareScanner(scanners[0], scanners[1]);
if (r) {
    console.log(alignScanner(scanners[0], scanners[1], r));
}
