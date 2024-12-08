// import fs from 'node:fs';
// const data = fs.readFileSync('./2024/day3_input.txt', 'UTF-8');
const data = Deno.readTextFileSync('./2024/day3_input.txt', 'UTF-8');

const getResult = (s, cond = false) => {
    const matches = s.matchAll(/do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g);
    let enable = true;
    let sum = 0;
    for (const m of matches) {
        if (m[0] === "don't()") {
            enable = false;
            continue;
        }
        if (m[0] === 'do()') {
            enable = true;
            continue;
        }
        if (!cond || enable) sum += +m[1] * +m[2];
    }
    return sum;
};
console.log('A', getResult(data, false));
console.log('B', getResult(data, true));
