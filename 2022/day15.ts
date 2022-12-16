import data from './day15_input.ts';
// import data from './day15_sample.ts';

const ints = (s: string) => (s.match(/-?\d+/g) || []).map(Number);
const manh = ([x1, y1]: number[], [x2, y2]: number[]) =>
    Math.abs(x1 - x2) + Math.abs(y1 - y2);

const B: Record<string, boolean> = {};
const entries = data()
    .split('\n')
    .map((l) => {
        const [sx, sy, bx, by] = ints(l);
        const sensor = [sx, sy];
        const beacon = [bx, by];
        B[beacon + ''] = true;
        const dist = manh(sensor, beacon);
        return { sensor, beacon, dist };
    });

type Entry = {
    sensor: number[];
    beacon: number[];
    dist: number;
};

const getReachX = (y: number, entry: Entry) => {
    const dx = entry.dist - Math.abs(entry.sensor[1] - y);
    return [entry.sensor[0] - dx, entry.sensor[0] + dx];
};

const getBoundX = (y: number) => {
    const xs = entries
        .filter((e) => {
            const [x1] = getReachX(y, e);
            return manh(e.sensor, [x1, y]) <= e.dist;
        })
        .flatMap((e) => getReachX(y, e));
    return [Math.min(...xs), Math.max(...xs)];
};

const detect = ([x, y]: number[]) => {
    const sensors = entries.filter((e) => manh(e.sensor, [x, y]) <= e.dist);
    const inRange = sensors.length > 0;
    let skipToX = x;
    if (inRange) skipToX = Math.max(...sensors.flatMap((e) => getReachX(y, e)));
    return { inRange, skipToX };
};

const countNoBeaconAtY = (y: number, x1 = -Infinity, x2 = Infinity) => {
    let count = 0;
    let [left, right] = getBoundX(y);
    left = Math.max(left, x1);
    right = Math.min(right, x2);
    for (let x = left; x <= right; x++) {
        const result = detect([x, y]);
        if (result.inRange) {
            const _right = Math.min(result.skipToX, right);
            count += _right - x + 1;
            x = _right;
        }
    }
    const beacons = new Set(
        entries
            .map((e) => e.beacon)
            .filter((b) => b[1] === y && b[0] >= left && b[1] <= right)
            .map((b) => '' + b)
    );
    return { diff: count - beacons.size, count };
};

// const search = (space: number) => {
//     const t = Date.now();
//     for (let y = 0; y <= space; y++) {
//         const result = countNoBeaconAtY(y, 0, space);
//         if (result.notInRange.length) {
//             const [rx, ry] = result.notInRange[0];
//             console.log('Found', [rx, ry], 'Took ' + (Date.now() - t));
//             return rx * 4000000 + ry;
//         }
//     }
// };
// console.log(search(4_000_000));

const isCovered = ([x, y]: number[]) => {
    return entries.some((e) => manh(e.sensor, [x, y]) <= e.dist);
};

const searchByEdge = (space: number) => {
    for (let i = 0; i < entries.length; i++) {
        const {
            sensor: [sx, sy],
            dist
        } = entries[i];
        let dx = 0;
        for (
            let y = Math.max(0, sy - dist + 1);
            y <= Math.min(space, sy + dist + 1);
            y++
        ) {
            let targets;
            if (dx === 0) targets = [[sx, y]];
            else
                targets = [
                    [sx + dx, y],
                    [sx - dx, y]
                ];
            const found = targets
                .filter(([x]) => x >= 0 && x <= space)
                .find((t) => !isCovered(t));
            if (found) {
                return found[0] * 4000000 + found[1];
            }
            if (y <= sy) dx++;
            if (y > sy) dx--;
        }
    }
};

console.log(countNoBeaconAtY(2000000).diff);
console.log(searchByEdge(4_000_000));

// console.log(countNoBeaconAtY(10).diff);
// console.log(searchByEdge(20));
