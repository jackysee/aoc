import data from './day15_input.ts';
// import data from './day15_sample.ts';

const ints = (s: string) => (s.match(/-?\d+/g) || []).map(Number);
const sum = (a: number, c: number) => a + c;
const asc = (a: number, b: number) => a - b;
const desc = (a: number, b: number) => b - a;
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

// console.log(arr);

const getReachX = (y: number, entry) => {
    // console.log('getreachx', entry);
    const dx = entry.dist - Math.abs(entry.sensor[1] - y);
    // console.log(entry, y, dx, [entry.sensor[0] - dx, entry.sensor[0] + dx]);
    return [entry.sensor[0] - dx, entry.sensor[0] + dx];
};

const getBoundX = (y: number) => {
    let xs = arr
        .filter((e) => {
            let [x1, x2] = getReachX(y, e);
            return manh(e.sensor, [x1, y]) <= e.dist;
        })
        .flatMap((e) => getReachX(y, e));
    return [Math.min(...xs), Math.max(...xs)];
};

const detect = ([x, y]: number[]) => {
    const sensors = arr
        .map((e) => ({ ...e, _dist: manh(e.sensor, [x, y]) }))
        .filter((e) => e._dist <= e.dist);
    const noBeacon = sensors.length > 0 && !B['' + [x, y]];
    let skipToX = Math.max(...sensors.flatMap((e) => getReachX(y, e)));
    return { noBeacon, skipToX };
};

// const y = 10;

const countNoBeacon = (y: number, x1 = -Infinity, x2 = Infinity) => {
    let count = 0;
    // console.log(getBoundX(y));
    let [left, right] = getBoundX(y);
    console.log(left, right, x1, x2);
    left = Math.max(left, x1);
    right = Math.min(right, x2);
    console.log({ left, right });
    for (let x = left; x <= right; x++) {
        let result = detect([x, y]);
        if (result.noBeacon) {
            // console.log([x, y], 'skipx', result, result.skipToX - x + 1);
            count += Math.min(result.skipToX, right) - x + 1;
            x = result.skipToX;
        }
    }
    let beacons = new Set(
        arr
            .map((e) => e.beacon)
            .filter((b) => b[1] === y && b[0] >= left && b[1] <= right)
            .map((b) => '' + b)
    );
    console.log('resuult', { count, beacons });
    // console.log(count - beacons.size);
    return count - beacons.size;
};
console.log(countNoBeacon(2000000));
console.log(countNoBeacon(2000000, 0, 4000000));
// console.log(countNoBeacon(2000000, -5000000, 5000000));

// let SPACE = 4_000_000;
// for (let y = 0; y <= SPACE; y++) {
//     let noBeaconCounts = countNoBeacon(y, 0, SPACE);
//     if (y % 10_000 === 0) console.log(y);
//     if (noBeaconCounts < SPACE) {
//         console.log(y, noBeaconCounts, noBeaconCounts - SPACE);
//     }
// }
console.log('done');

// let SPACE = 20;
// // let SPACE = 4000000;
// outer: for (let y = 0; y <= SPACE; y++) {
//     //     if (y % 1000) console.log('row ', y);
//     for (let x = 0; x <= SPACE; x++) {
//         //         if (
//         //             !B['' + [x, y]] &&
//         //             arr.every((a) => manh(a.s, [x, y]) > a.dist)
//         //         ) {
//         //             console.log([x, y]);
//         //             break outer;
//     }
// }
