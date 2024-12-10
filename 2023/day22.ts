import data from './day22_input.ts';
// import data from './day22_sample.ts';

type Cube = {
    x1: number;
    y1: number;
    z1: number;
    x2: number;
    y2: number;
    z2: number;
};
const C = data()
    .split('\n')
    .map((l) => {
        const ns = [...l.match(/\d+/g)!].map(Number);
        const keys = 'x1,y1,z1,x2,y2,z2'.split(',');
        return Object.fromEntries(ns.map((n, i) => [keys[i], n])) as Cube;
    });

const overlapXY = (a: Cube, b: Cube) => {
    const [ax1, ax2] = [a.x1, a.x2].toSorted();
    const [ay1, ay2] = [a.y1, a.y2].toSorted();
    const [bx1, bx2] = [b.x1, b.x2].toSorted();
    const [by1, by2] = [b.y1, b.y2].toSorted();
    return ax1 <= bx2 && bx1 <= ax2 && ay1 <= by2 && by1 <= ay2;
};

const sortByZ = (cubes: Cube[]) => cubes.sort((a, b) => a.z1 - b.z1);

const fall = (C: Cube[]) => {
    for (let i = 0; i < C.length; i++) {
        const z = Math.max(
            1,
            ...C.slice(0, i)
                .filter((c) => overlapXY(c, C[i]))
                .map((c) => c.z2 + 1)
        );
        C[i].z2 -= C[i].z1 - z;
        C[i].z1 = z;
    }
};

sortByZ(C);
fall(C);
sortByZ(C);

const UP: number[][] = [...new Array(C.length)].map(() => []);
const DOWN: number[][] = [...new Array(C.length)].map(() => []);
C.forEach((c, i) => {
    C.slice(i + 1).forEach((a, j) => {
        if (c.z2 === a.z1 - 1 && overlapXY(c, a)) {
            if (!UP[i].includes(i + j + 1)) UP[i].push(i + j + 1);
            if (!DOWN[i + j + 1].includes(i)) DOWN[i + j + 1].push(i);
        }
    });
});

console.log(
    'A',
    C.filter((_c, i) => UP[i].every((s) => DOWN[s].length >= 2)).length
);

const countFall = (i: number) => {
    const queue = UP[i].filter((j) => DOWN[j].length === 1);
    const fall = new Set(queue);
    while (queue.length) {
        const c = queue.shift()!;
        const ups = UP[c].filter((j) => !fall.has(j));
        ups.forEach((a) => {
            if (DOWN[a].every((j) => fall.has(j))) {
                queue.push(a);
                fall.add(a);
            }
        });
    }
    return fall.size;
};

console.log(
    'B',
    C.reduce((a, _c, i) => a + countFall(i), 0)
);
