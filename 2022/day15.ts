import data from './day15_input.ts';
// import data from './day15_sample.ts';

type Pt = [number, number];
type Entry = { sensor: Pt; beacon: Pt; dist: number };
const ints = (s: string) => (s.match(/-?\d+/g) || []).map(Number);
const manh = ([x1, y1]: Pt, [x2, y2]: Pt) =>
    Math.abs(x1 - x2) + Math.abs(y1 - y2);

const entries: Entry[] = data()
    .split('\n')
    .map((l) => {
        const [sx, sy, bx, by] = ints(l);
        const sensor = [sx, sy] as Pt;
        const beacon = [bx, by] as Pt;
        const dist = manh(sensor, beacon);
        return { sensor, beacon, dist };
    });

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
        .flatMap((e) => getReachX(y, e))
        .sort((a, b) => a - b);
    return [xs[0], xs.at(-1)!];
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
        const _x = Math.min(result.skipToX, right);
        if (result.inRange) count += _x - x + 1;
        x = _x;
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

const isCovered = ([x, y]: Pt) => {
    return entries.some((e) => manh(e.sensor, [x, y]) <= e.dist);
};

const searchByEdge = (space: number) => {
    const t = Date.now();
    for (let i = 0; i < entries.length; i++) {
        const [sx, sy] = entries[i].sensor;
        let dx = 0;
        for (let y = sy - entries[i].dist - 1; y <= sy; y++) {
            const x = sx + dx;
            if (y < 0 || y > space) continue;
            if (x < 0 || x > space) continue;
            if (!isCovered([x, y])) {
                console.log('search by edge took', Date.now() - t + 'ms');
                return x * 4000000 + y;
            }
            dx++;
        }
    }
};

console.log(countNoBeaconAtY(2000000).diff);
console.log(searchByEdge(4_000_000));

// console.log(countNoBeaconAtY(10).diff);
// console.log(searchByEdge(20));
