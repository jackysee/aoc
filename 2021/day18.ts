import data from './day18_input.ts';

function findLevel4(s: string) {
    let matches = s.matchAll(/\[\d+,\d+\]/g);
    for (const m of matches) {
        let _s = s.slice(0, m.index);
        let level =
            (_s.match(/\[/g) || []).length - (_s.match(/\]/g) || []).length;
        if (level > 3) {
            return m;
        }
    }
}

const splitStr = (s: string, m: RegExpMatchArray) => [
    s.slice(0, m.index),
    m[0],
    s.slice(m.index! + m[0].length)
];

function explode(s: string, m: RegExpMatchArray) {
    let [left, middle, right] = splitStr(s, m);
    let [x, y] = JSON.parse(middle);
    return (
        left.replace(/\d+(?=[^\d]*$)/, (m) => parseInt(m, 10) + x) +
        '0' +
        right.replace(/\d+/, (m) => parseInt(m, 10) + y)
    );
}

function split(s: string, m: RegExpMatchArray) {
    let [left, middle, right] = splitStr(s, m);
    let n = parseInt(middle, 10);
    return left + `[${Math.floor(n / 2)},${Math.ceil(n / 2)}]` + right;
}

function reduce(s: string) {
    while (true) {
        let m1 = findLevel4(s);
        if (m1) {
            s = explode(s, m1);
            continue;
        }
        let m2 = s.match(/\d\d+/);
        if (m2) {
            s = split(s, m2);
            continue;
        }
        break;
    }
    return s;
}

const add = (a: string, b: string) => reduce(`[${a},${b}]`);

function getMagnitude(s: string) {
    while (true) {
        let replaced = false;
        s = s.replace(/\[\d+,\d+\]/g, (m) => {
            replaced = true;
            let [x, y] = JSON.parse(m);
            return 3 * parseInt(x, 10) + 2 * parseInt(y, 10) + '';
        });
        if (replaced) continue;
        break;
    }
    return parseInt(s, 10);
}

let lines = data().split('\n');
let r = lines.reduce((a, c, i) => (i === 0 ? c : add(a, c)), '');
console.log('Part 1', getMagnitude(r));

let max = -Infinity;
for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines.length; j++) {
        if (i === j) continue;
        max = Math.max(
            getMagnitude(add(lines[i], lines[j])),
            getMagnitude(add(lines[j], lines[i])),
            max
        );
    }
}
console.log('Part 2', max);
