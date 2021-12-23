import data from './day22_input.ts';
// import data from './day22_sample.ts';

interface Cube {
    edges: number[];
    negatives: Cube[];
}
interface Step {
    cube: Cube;
    on: boolean;
}

const cubeFromArr = (m: (Number | String)[]) => ({
    edges: m!.map(Number),
    negatives: []
});

let steps: Step[] = data()
    .split('\n')
    .map((s) => {
        return {
            on: /^on/.test(s),
            cube: cubeFromArr([...s.match(/-?\d+/g)!])
        };
    });

const M: { [key: string]: boolean } = {};
steps.forEach(({ on, cube: { edges } }: Step) => {
    let [minx, maxx] = [Math.max(-50, edges[0]), Math.min(50, edges[1])];
    let [miny, maxy] = [Math.max(-50, edges[2]), Math.min(50, edges[3])];
    let [minz, maxz] = [Math.max(-50, edges[4]), Math.min(50, edges[5])];
    for (let x = minx; x <= maxx; x++)
        for (let y = miny; y <= maxy; y++)
            for (let z = minz; z <= maxz; z++) {
                if (on) M[[x, y, z] + ''] = true;
                else delete M[[x, y, z] + ''];
            }
});
console.log('Part 1', Object.keys(M).length);

const intersectLine = (a1: number, a2: number, b1: number, b2: number) => {
    if (b1 > a2 || a1 > b2) return [];
    const r = [a1, a2, b1, b2].sort((a, b) => a - b);
    return [r[1], r[2]];
};

const intersectCube = ({ edges: a }: Cube, { edges: b }: Cube) => {
    let xs = intersectLine(a[0], a[1], b[0], b[1]);
    let ys = intersectLine(a[2], a[3], b[2], b[3]);
    let zs = intersectLine(a[4], a[5], b[4], b[5]);
    if ([xs, ys, zs].some((a) => a.length === 0)) {
        return undefined;
    }
    return cubeFromArr([...xs, ...ys, ...zs]);
};

const removeCube = (a: Cube, b: Cube) => {
    let intersect = intersectCube(a, b);
    if (intersect === undefined) return;
    a.negatives = a.negatives || [];
    a.negatives.forEach((c) => removeCube(c, intersect!));
    a.negatives.push(intersect);
};

const cubes: Cube[] = [];
steps.forEach((s: Step) => {
    cubes.forEach((c) => removeCube(c, s.cube));
    if (s.on) cubes.push(s.cube);
});

const volume = (c: Cube): number =>
    (c.edges[1] - c.edges[0] + 1) *
        (c.edges[3] - c.edges[2] + 1) *
        (c.edges[5] - c.edges[4] + 1) -
    c.negatives.reduce((a, c) => a + volume(c), 0);

console.log(
    'Part 2',
    cubes.reduce((a, c) => a + volume(c), 0)
);
