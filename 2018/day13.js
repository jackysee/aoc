//AOC2018 D13
import data from './day13_input.js';
// import { sample as data } from './day13_sample.js';
// import { sample2 as data } from './day13_sample.js';

function parse(s) {
    const arr = s.split('\n').map((l) => l.split(''));
    const carts = [];
    const map = {};
    const w = arr[0].length;
    const h = arr.length;
    let cartId = 1;
    for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < w; x++) {
            const c = arr[y][x];
            if (c !== ' ') {
                map[[x, y]] = c;
            }
            if (c === '<') {
                carts.push({ pos: [x, y], face: '<', action: 0, id: cartId++ });
                map[[x, y]] = '-';
            }
            if (c === '>') {
                carts.push({ pos: [x, y], face: '>', action: 0, id: cartId++ });
                map[[x, y]] = '-';
            }
            if (c === '^') {
                carts.push({ pos: [x, y], face: '^', action: 0, id: cartId++ });
                map[[x, y]] = '|';
            }
            if (c === 'v') {
                carts.push({ pos: [x, y], face: 'v', action: 0, id: cartId++ });
                map[[x, y]] = '|';
            }
        }
    }
    return { carts, map, w, h };
}

const TURN_LEFT = { '<': 'v', '>': '^', '^': '<', v: '>' };
const TURN_RIGHT = { '<': '^', '>': 'v', '^': '>', v: '<' };
const TURN_CORNER = {
    '/<': 'v',
    '/^': '>',
    '\\>': 'v',
    '\\^': '<',
    '/v': '<',
    '/>': '^',
    '\\<': '^',
    '\\v': '>'
};

function move(cart, map) {
    let [x, y] = cart.pos;
    let action = cart.action;
    let face = cart.face;
    const tile = map[[x, y]];
    //turn : left, straight, right
    if (tile === '+') {
        if (action === 0) face = TURN_LEFT[cart.face];
        if (action === 2) face = TURN_RIGHT[cart.face];
        action = (action + 1) % 3;
    }
    if (tile === '/' || tile === '\\') {
        face = TURN_CORNER[tile + cart.face] || cart.face;
    }
    if (face === '<') x -= 1;
    if (face === '>') x += 1;
    if (face === '^') y -= 1;
    if (face === 'v') y += 1;
    return { pos: [x, y], face, action, id: cart.id };
}

function tick(carts, map, logFirst) {
    // const ys = [...new Set(carts.map((c) => c.pos[1]))].sort((a, b) => a - b);
    // const moved = new Set();
    carts = carts.sort((a, b) => {
        const [x1, y1] = a.pos;
        const [x2, y2] = b.pos;
        return y1 === y2 ? x1 - x2 : y1 - y2;
    });
    for (let i = 0, len = carts.length; i < len; i++) {
        if (carts[i].removed) {
            continue;
        }
        const _c = move(carts[i], map);
        const idx = carts.findIndex(
            (c) => c.pos + '' === _c.pos + '' && !c.removed
        );
        if (idx !== -1) {
            carts[i].removed = true;
            carts[idx].removed = true;
            if (logFirst) {
                console.log(_c.pos);
                logFirst = false;
            }
            continue;
        }
        carts[i] = _c;
    }
    return carts;
}

function printMap(carts, map, w, h) {
    for (let y = 0; y < h; y++) {
        let str = '';
        for (let x = 0; x < w; x++) {
            let c = carts.find((c) => c.pos[0] === x && c.pos[1] === y)?.face;
            str += c || map[[x, y]] || ' ';
        }
        console.log(str);
    }
}

function run(str) {
    let { carts, map /*, w, h*/ } = parse(str);
    let logFirst = true;
    while (true) {
        // printMap(carts, map, w, h);
        const _carts = tick(carts, map, logFirst);
        carts = _carts.filter((c) => !c.removed);
        if (carts.length !== _carts.length) {
            logFirst = false;
        }
        if (_carts.length === 1) {
            console.log(carts[0].pos);
            break;
        }
    }
}

// run(sample2());
run(data()); //8,3  72,121
