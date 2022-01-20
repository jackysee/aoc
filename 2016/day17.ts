import { md5 } from 'https://esm.run/hash-wasm@4';
// const data = 'qzthpkfp';
const data = 'ihgpwlah'; //DDRRRD

const go = (x: number, y: number, dir: string) => {
    if (dir === 'U') return [x, y - 1];
    if (dir === 'D') return [x, y + 1];
    if (dir === 'L') return [x - 1, y];
    if (dir === 'R') return [x + 1, y];
    return [x, y];
};
let queue = [];
queue.push({ x: 0, y: 0, path: [] });
while (queue.length) {
    let p = queue.shift()!;
    if (p.x === 3 && p.y === 3) {
        console.log(p);
        break;
    }
    ['U', 'D', 'L', 'R'].forEach((dir) => {
        let [x, y] = go(p.x, p.y, dir);
        if (x < 0 || y < 0 || x > 3 || x > 3) return;
    });
}

console.log(data);
