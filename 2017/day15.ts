const createGen =
    (factor: number) =>
    (n: number, divider: number = 1) => {
        n = (n * factor) % 2147483647;
        while (n % divider !== 0) n = (n * factor) % 2147483647;
        return n;
    };
const genA = createGen(16807);
const genB = createGen(48271);

function countMatch([a, b]: number[], times: number, [da, db]: number[]) {
    let [i, total] = [0, 0];
    let mask = (1 << 16) - 1;
    while (i < times) {
        [a, b] = [genA(a, da), genB(b, db)];
        if ((a & mask) == (b & mask)) total++;
        i++;
    }
    return total;
}
let input = [883, 879];
console.log('Part 1', countMatch(input, 40_000_000, [1, 1]));
console.log('Part 2', countMatch(input, 5_000_000, [4, 8]));
