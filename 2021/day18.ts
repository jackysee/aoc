import data from './day18_input.ts';

function findLevel4(s: string) {
    let idx = 0;
    while (true) {
        let m = s.slice(idx).match(/\[\d+,\d+\]/);
        if (m) {
            let level = 0;
            let _s = s.slice(0, idx + m.index!);
            for (let i = 0; i < _s.length; i++) {
                if (_s[i] === '[') level += 1;
                if (_s[i] === ']') level -= 1;
            }
            if (level > 3) {
                m.index = idx + m.index!;
                return m;
            }
            idx = idx + m.index! + m[0].length;
            continue;
        }
        break;
    }
}

function explode(s: string, m: RegExpMatchArray | undefined) {
    if (m === undefined) return s;
    let [x, y] = JSON.parse(m[0]);
    let leftStr = s.slice(0, m.index);
    leftStr = leftStr.replace(/\d+(?=[^\d]*$)/, (m) => parseInt(m, 10) + x);
    let rightStr = s
        .slice(m.index! + m[0].length)
        .replace(/\d+/, (m) => parseInt(m, 10) + y);
    s = leftStr + '0' + rightStr;
    return s;
}

function split(s: string, m: RegExpMatchArray | undefined) {
    if (m === undefined) return s;
    let n = parseInt(m[0], 10);
    let x = Math.floor(n / 2);
    let y = Math.ceil(n / 2);
    return (
        s.slice(0, m.index) + `[${x},${y}]` + s.slice(m.index! + m[0].length)
    );
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
        s = s.replace(/\[\d+,\d+\]/, (m) => {
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
