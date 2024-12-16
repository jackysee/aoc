//AOC2020 D12
import data from './day12_input.js';
function parse(s) {
    return s.split('\n').map((l) => {
        let m = l.match(/(\w)(\d+)/);
        return { action: m[1], val: parseInt(m[2], 10) };
    });
}
function run(str) {
    const list = parse(str);
    let x = 0,
        y = 0,
        angle = 90;
    for (let i = 0; i < list.length; i++) {
        let { action, val } = list[i];
        if (action === 'L') angle = (angle - val) % 360;
        if (action === 'R') angle = (angle + val) % 360;
        if (action === 'F') {
            if (angle === 90 || angle === -270) action = 'E';
            if (angle === 0) action = 'N';
            if (angle === -90 || angle === 270) action = 'W';
            if (angle === 180 || angle === -180) action = 'S';
        }
        if (action === 'N') y -= val;
        if (action === 'S') y += val;
        if (action === 'E') x += val;
        if (action === 'W') x -= val;
    }
    return Math.abs(x) + Math.abs(y);
}

console.log(run(data()));

function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = cos * (x - cx) + sin * (y - cy) + cx,
        ny = cos * (y - cy) - sin * (x - cx) + cy;
    return [nx, ny];
}

function run2(str) {
    const list = parse(str);
    let cx = 0,
        cy = 0,
        wx = 10,
        wy = 1;
    list.forEach(({ action, val }) => {
        if (action === 'N') wy += val;
        if (action === 'S') wy -= val;
        if (action === 'E') wx += val;
        if (action === 'W') wx -= val;
        if (action === 'L') {
            let [nx, ny] = rotate(cx, cy, wx, wy, -val);
            wx = nx;
            wy = ny;
        }
        if (action === 'R') {
            let [nx, ny] = rotate(cx, cy, wx, wy, val);
            wx = nx;
            wy = ny;
        }
        if (action === 'F') {
            let dx = (wx - cx) * val;
            let dy = (wy - cy) * val;
            wx += dx;
            wy += dy;
            cx += dx;
            cy += dy;
        }
    });
    return Math.abs(cx) + Math.abs(cy);
}

console.log(run2(data()));

function sample() {
    return `F10
N3
F7
R90
F11`;
}
