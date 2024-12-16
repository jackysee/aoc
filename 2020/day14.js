//ACO2020 D14
import data from './day14_input.js';

function parse(str) {
    return str.split('\n').map((l) => {
        let [action, val] = l.split(' = ');
        let m = action.match(/mem\[(\d+)\]/);
        let addr;
        if (m) {
            action = 'mem';
            addr = parseInt(m[1], 10);
            val = parseInt(val, 10);
        }
        return { action, val, addr };
    });
}

function applyMask(v, mask) {
    var s = v.toString(2).split('').reverse();
    var result = [];
    mask.split('')
        .reverse()
        .forEach((m, i) => {
            if (m === 'X') result.push(s[i] || '0');
            if (m === '1') result.push('1');
            if (m === '0') result.push('0');
        });
    return parseInt(result.reverse().join(''), 2);
}

function part1(str) {
    var list = parse(str);
    var mem = {},
        mask;
    for (var i = 0, len = list.length; i < len; i++) {
        let { action, val, addr } = list[i];
        if (action === 'mask') mask = val;
        if (action === 'mem') mem[addr] = applyMask(val, mask);
    }
    return Object.values(mem).reduce((a, c) => a + c, 0);
}

console.log(part1(data()));

function walk(s, pre = '', acc = []) {
    if (!s.length) {
        return [pre];
    }
    let [head, ...rest] = s;
    if (head !== 'X') {
        return walk(rest, pre + head);
    } else {
        return [walk(rest, pre + '1'), walk(rest, pre + '0')];
    }
}

function applyMask2(addr, mask) {
    var s = addr.toString(2).split('').reverse();
    var result = [];
    mask.split('')
        .reverse()
        .forEach((m, i) => {
            if (m === 'X') result.push('X');
            if (m === '1') result.push('1');
            if (m === '0') result.push(s[i] || '0');
        });
    return walk(result.reverse()).flat(Infinity);
}

function part2(str) {
    let mem = {};
    let mask;
    var list = parse(str);
    for (let i = 0; i < list.length; i++) {
        let { action, val, addr } = list[i];
        if (action === 'mask') mask = val;
        if (action === 'mem') {
            let addrs = applyMask2(addr, mask);
            addrs.forEach((a) => {
                mem[a] = val;
            });
        }
    }
    return Object.values(mem).reduce((a, c) => a + c, 0);
}

console.log(part2(data()));

function sample2() {
    return `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`;
}

function sample1() {
    return `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;
}
