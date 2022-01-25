function makeIter() {
    return function* getXY() {
        let x = 0;
        let y = 0;
        let i = 1;
        let len = 1;
        let dx = 1;
        let dy = 0;
        let passed = 0;
        yield [i, x, y];
        while (true) {
            x += dx;
            y += dy;
            passed++;
            if (passed === len) {
                passed = 0;
                [dx, dy] = [-dy, dx];
                if (dy === 0) len += 1;
            }
            i++;
            yield [i, x, y];
        }
    };
}

const n = 347991;
let gen1 = makeIter();
for (let [i, x, y] of gen1()) {
    if (i === n) {
        console.log('Part 1', Math.abs(x) + Math.abs(y));
        break;
    }
}

let M: Record<string, number> = {};
function getVal(x: number, y: number) {
    if (x === 0 && y === 0) return 1;
    return [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
        [x - 1, y - 1],
        [x - 1, y + 1],
        [x + 1, y - 1],
        [x + 1, y + 1]
    ].reduce((a, c) => {
        return a + (M[c + ''] || 0);
    }, 0);
}

let gen2 = makeIter();
for (let [i, x, y] of gen2()) {
    let val = getVal(x, y);
    if (val > n) {
        console.log('Part 2', val);
        break;
    }
    M[[x, y] + ''] = val;
}
