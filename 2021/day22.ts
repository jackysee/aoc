import data from './day22_input.ts';
// import data from './day22_sample.ts';

interface Cube {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    z1: number;
    z2: number;
}
interface Step {
    cube: Cube;
    on: boolean;
}

const cubeFromArr = (m: (Number | String)[]) => ({
    x1: Number(m![0]),
    x2: Number(m![1]),
    y1: Number(m![2]),
    y2: Number(m![3]),
    z1: Number(m![4]),
    z2: Number(m![5])
});

let arr: Step[] = data()
    .split('\n')
    .map((s) => {
        let m = s.match(/-?\d+/g);
        return {
            on: /^on/.test(s),
            cube: cubeFromArr([...m!])
        };
    });

const M: { [key: string]: boolean } = {};

arr.forEach(({ on, cube }: Step) => {
    for (let x = Math.max(-50, cube.x1); x <= Math.min(50, cube.x2); x++)
        for (let y = Math.max(-50, cube.y1); y <= Math.min(50, cube.y2); y++)
            for (
                let z = Math.max(-50, cube.z1);
                z <= Math.min(50, cube.z2);
                z++
            ) {
                if (on) M[[x, y, z] + ''] = true;
                else delete M[[x, y, z] + ''];
            }
});
console.log('Part 1', Object.keys(M).length);

const getVertices = (c: Cube) => [
    [c.x1, c.y1, c.z1],
    [c.x1, c.y1, c.z2],
    [c.x1, c.y2, c.z1],
    [c.x1, c.y2, c.z2],
    [c.x2, c.y1, c.z1],
    [c.x2, c.y1, c.z2],
    [c.x2, c.y2, c.z1],
    [c.x2, c.y2, c.z2]
];

const between = (n: number, n1: number, n2: number) => n >= n1 && n <= n2;

const inside = (c: Cube, [x, y, z]: number[]) =>
    between(x, c.x1, c.x2) && between(y, c.y1, c.y2) && between(z, c.z1, c.z2);

const slicex = (c: Cube, x: number) => [
    { ...c, x2: x },
    { ...c, x1: x + 1 }
];
const slicey = (c: Cube, y: number) => [
    { ...c, y2: y },
    { ...c, y1: y + 1 }
];
const slicez = (c: Cube, z: number) => [
    { ...c, z2: z },
    { ...c, z1: z + 1 }
];

const union = (a: Cube, b: Cube) => {
    if (
        a.x1 > b.x2 ||
        a.x2 < b.x1 ||
        a.y1 > b.y2 ||
        a.y2 < b.y1 ||
        a.z1 > b.z2 ||
        a.z2 < b.z1
    )
        return [a, b]; //no intersection
};

console.log(
    union(
        cubeFromArr([0, 10, 0, 10, 0, 10]),
        cubeFromArr([11, 21, 0, 10, 0, 10])
    )
);

// const ON = [];

// arr.forEach((s: Step) => {
//     if (s.on) {
//         ON.push(s.cube);
//     } else {
//     }

// });
