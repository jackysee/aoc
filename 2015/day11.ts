const data = 'hepxcrrq';

function inc(s: string) {
    let r: string[] = [];
    let incNext = true;
    s.split('')
        .reverse()
        .forEach((c) => {
            if (!incNext) r.push(c);
            else {
                if (c === 'z') {
                    r.push('a');
                    incNext = true;
                } else {
                    r.push(String.fromCharCode(c.charCodeAt(0) + 1));
                    incNext = false;
                }
            }
        });
    return r.reverse().join('');
}

const THREES = 'abcdefghijklmnopqrstuvwxyz'
    .split('')
    .map((c, i, s) => c + s[i + 1] + s[i + 2])
    .slice(0, -2);

const containThrees = (s: string) => THREES.some((t) => s.indexOf(t) !== -1);
const disallowed = (s: string) =>
    ['i', 'o', 'l'].some((c) => s.indexOf(c) !== -1);
const hasPairs = (s: string) => new Set(s.matchAll(/(.)\1/g)).size >= 2;

let pwd = data;
let part1 = false;
while (true) {
    pwd = inc(pwd);
    if (containThrees(pwd) && !disallowed(pwd) && hasPairs(pwd)) {
        if (!part1) {
            console.log('Part 1', pwd);
            part1 = true;
        } else {
            console.log('Part 2', pwd);
            break;
        }
    }
}
