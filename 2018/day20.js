import data from './day20_input.js';
// const data = () => '^ENWWW(NEEE|SSE(EE|N))$';
// const data = () => '^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$';
// const data = () =>
//     '^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$';
// const data = () => '^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$';

let current = [0, 0];
let stack = [current];
let map = {};
map[current] = 0;
data()
    .split('')
    .forEach((c) => {
        if (c === '(') {
            stack.push(current);
        } else if (c === ')') {
            current = stack.pop();
        } else if (c === '|') {
            current = stack[stack.length - 1];
        } else if (/[NSEW]/.test(c)) {
            let dist = map[current];
            let [x, y] = current;
            if (c === 'N') y -= 1;
            if (c === 'S') y += 1;
            if (c === 'E') x -= 1;
            if (c === 'W') x += 1;
            map[[x, y]] = Math.min(map[[x, y]] || Infinity, dist + 1);
            current = [x, y];
        }
    });

console.log('Part 1', Math.max(...Object.values(map)));
console.log('Part 2', Object.values(map).filter((d) => d >= 1000).length);
