import data from './day15_input.ts';
// import data from './day15_sample.ts';

const ints = (s: string) => (s.match(/-?\d+/g) || []).map(Number);
const manh = ([x1, y1]: number[], [x2, y2]: number[]) =>
    Math.abs(x1 - x2) + Math.abs(y1 - y2);

const B: Record<string, boolean> = {};
const arr = data()
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
    const xs = arr
        .filter((e) => {
            const [x1] = getReachX(y, e);
            return manh(e.sensor, [x1, y]) <= e.dist;
        })
        .flatMap((e) => getReachX(y, e));
    return [Math.min(...xs), Math.max(...xs)];
};

const detect = ([x, y]: number[]) => {
    const sensors = arr
        .map((e) => ({ ...e, _dist: manh(e.sensor, [x, y]) }))
        .filter((e) => e._dist <= e.dist);
    const inRange = sensors.length > 0;
    let skipToX = x;
    if (inRange) skipToX = Math.max(...sensors.flatMap((e) => getReachX(y, e)));
    return { inRange, skipToX };
};

const countNoBeacon = (y: number, x1 = -Infinity, x2 = Infinity) => {
    const notInRange = [];
    let count = 0;
    let [left, right] = getBoundX(y);
    left = Math.max(left, x1);
    right = Math.min(right, x2);
    let x = left;
    while (x < right) {
        const result = detect([x, y]);
        if (result.inRange) {
            const _right = Math.min(result.skipToX, right);
            count += _right - x;
            x = _right;
        } else {
            x++;
            notInRange.push([x, y]);
        }
    }
    const beacons = new Set(
        arr
            .map((e) => e.beacon)
            .filter((b) => b[1] === y && b[0] >= left && b[1] <= right)
            .map((b) => '' + b)
    );
    return { diff: count - beacons.size, count, notInRange };
};
console.log(countNoBeacon(2000000).diff);
// console.log(countNoBeacon(2000000, 0, 4000000));

const search = (space: number) => {
    const t = Date.now();
    for (let y = 0; y <= space; y++) {
        const result = countNoBeacon(y, 0, space);
        if (result.notInRange.length) {
            const [rx, ry] = result.notInRange[0];
            console.log('Found', [rx, ry], 'Took ' + (Date.now() - t));
            console.log(rx * 4000000 + ry);
            break;
        }
    }
};
search(4_000_000);
