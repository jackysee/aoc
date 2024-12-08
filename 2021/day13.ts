import data from './day13_input.ts';
// import data from './day13_sample.ts';

let [_points, _ins] = data().split('\n\n');
let points = new Set(_points.split('\n'));

type Instruction = { along: string; value: number };
let instructions: Instruction[] = _ins.split('\n').map((s: string) => {
    let m = s.match(/fold along ([xy])=(\d+)/)!;
    return { along: m[1], value: Number(m[2]) };
});

function fold(points: Set<string>, ins: Instruction) {
    points.forEach((p) => {
        let [x, y] = p.split(',').map(Number);
        if (ins.along === 'y' && y >= ins.value) {
            points.delete(p);
            if (y > ins.value) {
                let _y = 2 * ins.value - y;
                points.add([x, _y] + '');
            }
        }
        if (ins.along === 'x' && x >= ins.value) {
            points.delete(p);
            if (x > ins.value) {
                let _x = 2 * ins.value - x;
                points.add([_x, y] + '');
            }
        }
    });
    return points;
}

instructions.forEach((ins, i) => {
    points = fold(points, ins);
    if (i === 0) console.log('Part 1', points.size);
});

let my = 0;
let mx = 0;
points.forEach((s) => {
    let [x, y] = s.split(',').map(Number);
    if (x > mx) mx = x;
    if (y > my) my = y;
});

let s = '';
for (let y = 0; y <= my; y++) {
    for (let x = 0; x <= mx; x++) {
        s += points.has([x, y] + '') ? '█' : ' ';
    }
    s += '\n';
}
console.log('Part 2');
console.log(s);
