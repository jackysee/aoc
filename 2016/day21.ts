import data from './day21_input.ts';
// import data from './day21_sample.ts';
let arr = data().split('\n');

function process(s: string, reverse: boolean = false) {
    let pwd = s.split('');
    let _arr = [...arr];
    if (reverse) _arr = _arr.reverse();
    _arr.forEach((l) => {
        let [x, y] = (l.match(/\d+/g) || []).map(Number);
        let [a, b] = l.match(/(?<=letter )\w+/g) || [];
        if (l.startsWith('swap position')) {
            if (reverse) [x, y] = [y, x];
            [pwd[y], pwd[x]] = [pwd[x], pwd[y]];
        }
        if (l.startsWith('swap letter')) {
            pwd = pwd.map((c) => (c === a ? b : c === b ? a : c));
        }
        if (l.startsWith('reverse positions')) {
            pwd = [
                ...pwd.slice(0, x),
                ...pwd.slice(x, y + 1).reverse(),
                ...pwd.slice(y + 1)
            ];
        }
        const rotateLeft = (x: number, pwd: string[]) => [
            ...pwd.slice(x),
            ...pwd.slice(0, x)
        ];
        const rotateRight = (x: number, pwd: string[]) => [
            ...pwd.slice(-x),
            ...pwd.slice(0, -x)
        ];
        if (l.startsWith('rotate left')) {
            x = x % pwd.length;
            pwd = reverse ? rotateRight(x, pwd) : rotateLeft(x, pwd);
        }
        if (l.startsWith('rotate right')) {
            x = x % pwd.length;
            pwd = reverse ? rotateLeft(x, pwd) : rotateRight(x, pwd);
        }
        if (l.startsWith('move position')) {
            if (reverse) [x, y] = [y, x];
            let [c] = pwd.splice(x, 1);
            pwd.splice(y, 0, c);
        }
        const rotateBased = (a: string, pwd: string[]) => {
            let idx = pwd.findIndex((c) => c === a);
            let r = (1 + idx + (idx >= 4 ? 1 : 0)) % pwd.length;
            return rotateRight(r, pwd);
        };
        if (l.startsWith('rotate based on')) {
            let [a] = l.match(/(?<=letter )\w+/g)!;
            if (reverse) {
                let old = [...pwd];
                while (true) {
                    pwd = rotateLeft(1, pwd);
                    if (rotateBased(a, pwd).join('') === old.join('')) break;
                }
            } else {
                pwd = rotateBased(a, pwd);
            }
        }
    });
    return pwd.join('');
}

console.log('Part 1', process('abcdefgh'));
console.log('Part 2', process('fbgdceah', true));
