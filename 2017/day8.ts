import data from './day8_input.ts';
const R: Record<string, number> = {};
const OP: Record<string, Function> = {
    '>': (x: string, z: string) => (R[x] || 0) > +z,
    '<': (x: string, z: string) => (R[x] || 0) < +z,
    '>=': (x: string, z: string) => (R[x] || 0) >= +z,
    '==': (x: string, z: string) => (R[x] || 0) == +z,
    '<=': (x: string, z: string) => (R[x] || 0) <= +z,
    '!=': (x: string, z: string) => (R[x] || 0) != +z
};

let max = -Infinity;
data()
    .split('\n')
    .forEach((line, i, arr) => {
        let [a, b] = line.split(/\s*if\s*/);
        let [j, k, l] = a.split(/\s+/);
        let [x, y, z] = b.split(/\s+/);
        if (OP[y](x, z)) {
            if (k == 'inc') R[j] = (R[j] || 0) + +l;
            if (k == 'dec') R[j] = (R[j] || 0) - +l;
        }
        let m = Math.max(...Object.values(R));
        if (m > max) max = m;
        if (!arr[i + 1]) {
            console.log('Part 1', m);
            console.log('Part 2', max);
        }
    });
