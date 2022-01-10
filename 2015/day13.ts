import data from './day13_input.ts';
// import data from './day13_sample.ts';

type HappinessMap = { [key: string]: { [key: string]: number } };
let M: HappinessMap = {};
data()
    .split('\n')
    .forEach((l) => {
        let words = l.replace(/\.$/, '').split(' ');
        let from = words[0];
        let to = words[words.length - 1];
        let happiness = Number(l.match(/\d+/)![0]) * (/lose/.test(l) ? -1 : 1);
        M[from] = M[from] || {};
        M[from][to] = happiness;
    });

type Seating = { happiness: number; seats: string[] };

function findSeating(M: HappinessMap) {
    let len = Object.keys(M).length;
    let queue = Object.keys(M).map((s) => ({ happiness: 0, seats: [s] }));
    let result: Seating[] = [];
    while (queue.length) {
        let s = queue.pop()!;
        let last = s.seats.at(-1)!;
        if (s.seats.length === len) {
            s.happiness += M[last][s.seats[0]] + M[s.seats[0]][last];
            result.push(s);
        }
        Object.entries(M[last]).forEach(([k, v]) => {
            if (s.seats.includes(k)) return;
            let happiness = s.happiness + v + M[k][last];
            let seats = [...s.seats, k];
            if (s.seats.length === len) {
                happiness += M[last][s.seats[0]] + M[s.seats[0]][last];
                result.push({ seats, happiness });
            } else {
                queue.push({ seats, happiness });
            }
        });
    }
    // console.log(result);
    let max = -Infinity;
    result.forEach((r) => {
        if (r.happiness > max) max = r.happiness;
    });
    return max;
}

console.log('Part 1', findSeating(M));

M['me'] = {};
Object.keys(M).forEach((k) => {
    M['me'][k] = 0;
    M[k]['me'] = 0;
});
console.log('Part 2', findSeating(M));
