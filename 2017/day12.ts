import data from './day12_input.ts';
// import data from './day12_sample.ts';

let M: Record<number, number[]> = {};
data()
    .split('\n')
    .map((l) => {
        let m = l.match(/\d+/g)!.map(Number);
        M[m[0]] = m.slice(1);
    });

function findGroup(n: number) {
    let queue: number[] = [n];
    let visited = new Set([n]);
    while (queue.length) {
        let n = queue.pop()!;
        (M[n] || []).forEach((n: number) => {
            if (!visited.has(n)) {
                visited.add(n);
                queue.push(n);
            }
        });
    }
    return visited;
}
console.log('Part 1', findGroup(0).size);

let arr = Object.entries(M);
let count = 0;
while (arr.length) {
    let group = findGroup(+arr[0][0]);
    arr = arr.filter(([k]) => !group.has(+k));
    count++;
}
console.log('Part 2', count);
