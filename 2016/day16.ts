const dragon = (s: string, len: number) => {
    while (s.length < len) {
        let b = s
            .split('')
            .reverse()
            .map((c) => (c === '0' ? '1' : '0'))
            .join('');
        s = s + '0' + b;
    }
    return s;
};

const checkSum = (s: string, len: number) => {
    const t = Date.now();
    s = dragon(s, len).slice(0, len);
    while (true) {
        let cs = s
            .split('')
            .flatMap((c, ci, a) =>
                ci % 2 === 0 ? [c === a[ci + 1] ? '1' : '0'] : []
            )
            .join('');
        if (cs.length % 2 === 1) return [cs, Date.now() - t];
        s = cs;
    }
};

// const initial = '10000';
// const len = 20;
const initial = '11110010111001001';
console.log('Part 1', checkSum(initial, 272));
console.log('Part 2', checkSum(initial, 35651584));
