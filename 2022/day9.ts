import data from './day9_input.ts';
// import data from './day9_sample1.ts';
// import data from './day9_sample2.ts';

const arr: string[] = data().split('\n');

const DIRS: Record<string, number[]> = {
    U: [0, -1],
    D: [0, 1],
    L: [-1, 0],
    R: [1, 0]
};

const getVisited = (ropes: number[][]) => {
    const visited = [[0, 0]];
    arr.forEach((s) => {
        const [d, n] = s.split(' ');
        for (let i = 0; i < +n; i++) {
            ropes[0] = [ropes[0][0] + DIRS[d][0], ropes[0][1] + DIRS[d][1]];
            for (let j = 1; j < ropes.length; j++) {
                let [head, tail] = [ropes[j - 1], ropes[j]];
                if (
                    Math.abs(head[0] - tail[0]) > 1 ||
                    Math.abs(head[1] - tail[1]) > 1
                ) {
                    tail = [
                        tail[0] + Math.sign(head[0] - tail[0]),
                        tail[1] + Math.sign(head[1] - tail[1])
                    ];
                    if (j === ropes.length - 1) visited.push(tail);
                    ropes[j] = tail;
                }
            }
        }
    });
    return new Set(visited.map((s) => s + '')).size;
};

console.log(getVisited([...Array(2).fill([0, 0])]));
console.log(getVisited([...Array(10).fill([0, 0])]));
