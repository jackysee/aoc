import data from './day20_input.ts';
// import data from './day20_sample.ts';

interface Particle {
    p: number[];
    v: number[];
    a: number[];
}

let list: Particle[] = data()
    .split('\n')
    .map((l) => {
        let m = l.match(/-?\d+/g)!.map(Number);
        return { p: m.slice(0, 3), v: m.slice(3, 6), a: m.slice(6) };
    });

const clone = (p: Particle) => ({ p: [...p.p], v: [...p.v], a: [...p.a] });

const tick = (_p: Particle) => {
    let p = clone(_p);
    p.v[0] += p.a[0];
    p.v[1] += p.a[1];
    p.v[2] += p.a[2];
    p.p[0] += p.v[0];
    p.p[1] += p.v[1];
    p.p[2] += p.v[2];
    return p;
};

const dist = (p: Particle) => p.p.map(Math.abs).reduce((a, c) => a + c, 0);

const D: Record<number, number> = {};
let list1 = list.map((p) => clone(p));
for (let i = 0; i < 1000; i++) {
    list1 = list1.map((p) => tick(p));
    list1.forEach((p, pi) => (D[pi] = (D[pi] || 0) + dist(p)));
}
console.log('Part 1', Object.entries(D).sort((a, b) => a[1] - b[1])[0][0]);

let list2 = list.map((p) => clone(p));
let lengths = [];
let c = 0;
while (true) {
    let seen: Record<string, number[]> = {};
    list2 = list2.map((p) => tick(p));
    list2.forEach((p, pi) => {
        seen[p.p + ''] = seen[p.p + ''] || [];
        seen[p.p + ''].push(pi);
    });
    list2 = list2.filter((p) => seen[p.p + ''].length === 1);
    lengths.push(list2.length);
    if (c++ === 1000) break;
}
console.log('Part 2', list2.length);
