import data from './day19_input.ts';
// import data from './day19_sample.ts';

interface Signal {
    pos: number[];
    fingerPrint: string[];
}
interface Scanner {
    id: number;
    signals: Signal[];
}
let scanners = data()
    .trim()
    .split('\n\n')
    .map((s) => {
        let lines = s.split('\n');
        let id = Number(lines[0].match(/\d+/));
        let signalPos = lines
            .slice(1)
            .map((s: string) => s.split(',').map(Number));
        let signals: Signal[] = [];
        for (let i = 0; i < signalPos.length; i++) {
            const s1 = signalPos[i];
            let fingerPrint = [];
            for (let j = 0; j < signalPos.length; j++) {
                if (i === j) continue;
                const s2 = signalPos[j];
                const dx = Math.abs(s1[0] - s2[0]);
                const dy = Math.abs(s1[1] - s2[1]);
                const dz = Math.abs(s1[2] - s2[2]);
                fingerPrint[j] = [
                    Math.hypot(dx, dy, dz).toFixed(5),
                    Math.min(dx, dy, dz),
                    Math.max(dx, dy, dz)
                ].join(',');
            }
            signals.push({
                pos: s1,
                fingerPrint
            });
        }
        return { id, signals };
    });

function compareSignals(s1: Signal, s2: Signal) {
    const result = [];
    for (let idx1 = 0; idx1 < s1.fingerPrint.length; idx1++) {
        let idx2 = s2.fingerPrint.indexOf(s1.fingerPrint[idx1]);
        if (idx2 !== -1) {
            result.push([s1.fingerPrint[idx1], idx1, idx2]);
        }
    }
    return result;
}

interface ScannerIntersection {
    sig1: Signal;
    sig2: Signal;
    intersections: string[];
}

function compareScanners(s1: Scanner, s2: Scanner) {
    for (let sig1 of s1.signals) {
        for (let sig2 of s2.signals) {
            const intersections = compareSignals(sig1, sig2);
            if (intersections.length >= 11) {
                return { sig1, sig2, intersections };
            }
        }
    }
}

// function alignScanner(s1: Scanner, s2:Scanner, si:ScannerIntersection) {
//     for(let [_, idx1, idx2] of si.intersections) {
//         const sig1 = s1.signals[idx1];
//         const sig2 = s2.signals[idx2];
//         const relativeHere = this.signals[line[2]]
//         const dx0 = data.here.x - relativeHere.x
//         const dy0 = data.here.y - relativeHere.y
//         const dz0 = data.here.z - relativeHere.z
//     }

// }

console.log(compareScanners(scanners[0], scanners[1]));
