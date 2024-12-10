import { md5 } from 'https://esm.run/hash-wasm@4';
// const data = 'hijkl'; //no result
// const data = 'ihgpwlah'; //DDRRRD 6
// const data = 'kglvqrro'; //DDUDRLRRUDRD 12
// const data = 'ulqzkmiv'; //DRURDRUDDLLDLUURRDULRLDUUDDDRR 30
const data = 'qzthpkfp';

const go = (x: number, y: number, dir: string) => {
    if (dir === 'U') return [x, y - 1];
    if (dir === 'D') return [x, y + 1];
    if (dir === 'L') return [x - 1, y];
    if (dir === 'R') return [x + 1, y];
    return [x, y];
};

let result = [];
let queue = [];
queue.push({ x: 0, y: 0, path: [] });
while (queue.length) {
    let p = queue.shift()!;
    if (p.x === 3 && p.y === 3) {
        result.push([p.path.join(''), p.path.length]);
        continue;
    }
    let hash = await md5(data + p.path.join(''));
    let opened = hash
        .slice(0, 4)
        .split('')
        .map((c: string) => /[bcdef]/.test(c));
    ['U', 'D', 'L', 'R'].forEach((dir, i) => {
        let [x, y] = go(p.x, p.y, dir);
        if (x < 0 || y < 0 || x > 3 || y > 3) return;
        if (!opened[i]) return;
        queue.push({ x, y, path: [...p.path, dir] });
    });
}
result.sort((a, b) => (a[1] as number) - (b[1] as number));
console.log('Part 1', result[0][0]);
console.log('Part 2', result.at(-1)![1]);
