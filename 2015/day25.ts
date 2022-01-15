const row = 2981;
const col = 3075;
let [r, c, val] = [1, 1, 20151125];
while (true) {
    if (r === row && c === col) {
        console.log('Part 1', val);
        break;
    }
    val = (val * 252533) % 33554393;
    if (r === 1) {
        r += c;
        c = 1;
    } else {
        r -= 1;
        c += 1;
    }
}
