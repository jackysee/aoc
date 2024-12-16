import data from './day12_input.js';
// import data from './day12_sample.js';
const M = data()
    .split('\n')
    .map((l) => [...l]);

const findRegion = (pos) => {
    const queue = [pos];
    const area = [pos];
    const perimeter = [];
    const seen = new Set();

    while (queue.length) {
        const [r, c] = queue.shift();
        seen.add([r, c] + '');
        const t = M[r]?.[c];
        [
            [r - 1, c],
            [r, c + 1],
            [r + 1, c],
            [r, c - 1]
        ].forEach(([nr, nc], i) => {
            if (seen.has([nr, nc] + '')) return;
            const nt = M[nr]?.[nc];
            if (!nt || nt !== t) {
                perimeter.push([nr, nc, i]);
                return;
            }
            area.push([nr, nc]);
            queue.push([nr, nc]);
            seen.add([nr, nc] + '');
        });
    }
    return {
        type: M[pos[0]][pos[1]],
        area,
        perimeter
    };
};

const seen = new Set();
const result = [];
M.forEach((row, r) => {
    row.forEach((_, c) => {
        if (seen.has([r, c] + '')) return;
        const region = findRegion([r, c]);
        result.push(region);
        region.area.forEach((p) => seen.add(p + ''));
    });
});

console.log(
    'A',
    result.reduce((a, c) => a + c.area.length * c.perimeter.length, 0)
);

const countEdges = (perimeter, dir) => {
    const pts = perimeter.filter((p) => p[2] === dir);
    const [group, collect] = dir % 2 === 0 ? [0, 1] : [1, 0];
    let count = 0;
    [...new Set(pts.map((p) => p[group]))].forEach((r) => {
        const line = pts
            .filter((p) => p[group] === r)
            .map((p) => p[collect])
            .sort((a, b) => a - b)
            .flatMap((r, i, arr) => (i == 0 ? [] : [r - arr[i - 1]]));
        count += line.filter((d) => d > 1).length + 1;
    });
    return count;
};

const findSides = (region) => {
    return [0, 1, 2, 3].reduce(
        (a, c) => a + countEdges(region.perimeter, c),
        0
    );
};

console.log(
    'B',
    result.reduce((a, c) => a + c.area.length * findSides(c), 0)
);
