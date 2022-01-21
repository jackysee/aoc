import data from './day21_input.ts';
// import data from './day21_sample.ts';
let arr = data().split('\n');

function process(s: string, reverse: boolean = false) {
    let pwd = s.split('');
    let _arr = [...arr];
    if (reverse) _arr = _arr.reverse();
    _arr.forEach((l) => {
        if (l.startsWith('swap position')) {
            let [x, y] = l.match(/\d+/g)!.map(Number);
            if (reverse) [x, y] = [y, x];
            let [a, b] = [pwd[x], pwd[y]];
            pwd[x] = b;
            pwd[y] = a;
        }
        if (l.startsWith('swap letter')) {
            let [a, b] = l.match(/(?<=letter )\w+/g)!;
            pwd = pwd.map((c) => (c === a ? b : c === b ? a : c));
        }
        if (l.startsWith('reverse positions')) {
            let [x, y] = l.match(/\d+/g)!.map(Number);
            pwd = [
                ...pwd.slice(0, x),
                ...pwd.slice(x, y + 1).reverse(),
                ...pwd.slice(y + 1)
            ];
        }
        const rotateLeft = (x: number) => [...pwd.slice(x), ...pwd.slice(0, x)];
        const rotateRight = (x: number) => [
            ...pwd.slice(-x),
            ...pwd.slice(0, -x)
        ];
        if (l.startsWith('rotate left')) {
            let [x] = l.match(/\d+/g)!.map(Number);
            x = x % pwd.length;
            if (reverse) pwd = rotateRight(x);
            else pwd = rotateLeft(x);
        }
        if (l.startsWith('rotate right')) {
            let [x] = l.match(/\d+/g)!.map(Number);
            x = x % pwd.length;
            if (reverse) pwd = rotateLeft(x);
            else pwd = rotateRight(x);
        }
        if (l.startsWith('move position')) {
            let [x, y] = l.match(/\d+/g)!.map(Number);
            if (reverse) [x, y] = [y, x];
            let [c] = pwd.splice(x, 1);
            pwd.splice(y, 0, c);
        }
        if (l.startsWith('rotate based on')) {
            let [a] = l.match(/(?<=letter )\w+/g)!;
            let idx = pwd.findIndex((c) => c === a);
            let r = (1 + idx + (idx >= 4 ? 1 : 0)) % pwd.length;
            if (reverse) pwd = rotateLeft(r);
            else pwd = rotateRight(r);
        }
    });
    return pwd.join('');
}

console.log('Part 1', process('abcdefgh'));
console.log('Part 2', process('fbgdceah', true));
