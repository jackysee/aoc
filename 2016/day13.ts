const input = 1364;
const dx = 31;
const dy = 39;

const space = (x: number, y: number) => {
    let s = (x * x + 3 * x + 2 * x * y + y + y * y + input).toString(2);
    return s.split('').filter((c) => c === '1').length % 2 === 0;
};

interface Item {
    x: number;
    y: number;
    dist: number;
}

function getAdj(p: Item, visited: Set<string>) {
    return [
        [p.x, p.y - 1],
        [p.x - 1, p.y],
        [p.x + 1, p.y],
        [p.x, p.y + 1]
    ].filter(
        ([x, y]) =>
            !(x < 0 || y < 0 || visited.has([x, y] + '') || !space(x, y))
    );
}

function findMinDist() {
    let queue = [{ x: 1, y: 1, dist: 0 }];
    let minDist = Infinity;
    let visited = new Set(['1,1']);
    while (queue.length) {
        let p = queue.shift()!;
        if (p.x === dx && p.y === dy) {
            if (p.dist < minDist) minDist = p.dist;
            continue;
        }
        getAdj(p, visited).forEach(([x, y]) => {
            queue.push({ x, y, dist: p.dist + 1 });
            visited.add([x, y] + '');
        });
    }
    return minDist;
}
console.log('Part 1', findMinDist());

function findReaches() {
    let queue = [{ x: 1, y: 1, dist: 0 }];
    let visited = new Set(['1,1']);
    while (queue.length) {
        let p = queue.shift()!;
        if (p.dist === 50) continue;
        getAdj(p, visited).forEach(([x, y]) => {
            queue.push({ x, y, dist: p.dist + 1 });
            visited.add([x, y] + '');
        });
    }
    return visited.size;
}
console.log('Part 2', findReaches());
