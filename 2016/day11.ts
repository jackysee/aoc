import { combinations } from 'https://deno.land/x/combinatorics/mod.ts';
import { BinaryHeap } from 'https://deno.land/x/collections@0.11.2/mod.ts';

const clone = (d: string[][]) => d.map((a) => [...a]);
const combo = (a: string[]) => [...combinations(a, 1), ...combinations(a, 2)];
const getState = (floors: string[][], e: number) =>
    floors
        .map((f, fi) => (fi === e ? 'E::' : '') + f.sort().join(','))
        .join('|');
const isSafe = (floor: string[]) => {
    let noGenerator = floor.filter((m) => m.split('-')[1] === 'G').length === 0;
    let hasPair = floor
        .filter((m) => m.split('-')[1] === 'M')
        .every((m) => floor.includes(m.split('-')[0] + '-G'));
    return noGenerator || hasPair;
};
const isPair = (arr: string[]) => {
    let [a, b] = arr;
    return a && b && a.split('-')[0] === b.split('-')[0];
};

const findStep = (data: string[][]) => {
    let t = Date.now();
    const all = data.flat();
    let initialState = getState(data, 0);
    interface Item {
        floors: string[][];
        step: number;
        e: number;
    }
    let minStep = Infinity;
    let queue: BinaryHeap<Item> = new BinaryHeap<Item>(
        (a: Item, b: Item) => a.step - b.step
    );
    queue.push({ floors: data, step: 0, e: 0 });
    let visited = new Set([initialState]);
    while (queue.length) {
        let p = queue.pop()!;
        if (p.step > minStep) continue;
        if (p.floors[3].length === all.length) {
            if (p.step < minStep) {
                minStep = p.step;
            }
            continue;
        }
        // if (i % 10000 === 0) console.log('------', queue.length);
        [p.e - 1, p.e + 1]
            .filter((f) => f >= 0 && f < 4)
            .forEach((f) => {
                let goingUp = f === p.e + 1;
                let goingDown = f === p.e - 1;

                //optimization 1 : don't move to below if floor is already emptied
                if (goingDown && p.floors[f].length === 0) return;

                let current = p.floors[p.e];
                let target = p.floors[f];
                let moves = combo(current).flatMap((a) => {
                    let newFloor = [...target, ...a];
                    let oldFloor = p.floors[p.e].filter((m) => !a.includes(m));
                    if (isSafe(newFloor) && isSafe(oldFloor)) {
                        let floors = clone(p.floors);
                        floors[f] = newFloor;
                        floors[p.e] = oldFloor;
                        let state = getState(floors, f);
                        return [[floors, a, state]];
                    }
                    return [];
                });

                //optimization: going up with two if you can
                let movesLen = moves.map((m) => m[1].length);
                if (goingUp && Math.max(...movesLen) === 2)
                    moves = moves.filter((m) => m[1].length == 2);

                //optimization: going down with one only if you can
                if (goingDown && Math.min(...movesLen) === 1)
                    moves = moves.filter((m) => m[1].length == 1);

                //optimization: only move one M/G pair if found, they are interechangable
                let pairs = moves.find((m) => isPair(m[1] as string[]));
                if (pairs) {
                    moves = moves.filter((m) => {
                        if (
                            isPair(m[1] as string[]) &&
                            m[1] + '' !== pairs![1] + ''
                        )
                            return false;
                        return true;
                    });
                }

                moves.forEach(([floors, a, state]) => {
                    if (visited.has(state as string)) return;
                    visited.add(state as string);
                    queue.push({
                        floors: floors as string[][],
                        e: f,
                        step: p.step + 1
                    });
                });
            });
    }
    return [minStep, Date.now() - t];
};

// const data = [['H-M', 'L-M'], ['H-G'], ['L-G'], []];

// The first floor contains a thulium generator, a thulium-compatible microchip, a plutonium generator, and a strontium generator.
// The second floor contains a plutonium-compatible microchip and a strontium-compatible microchip.
// The third floor contains a promethium generator, a promethium-compatible microchip, a ruthenium generator, and a ruthenium-compatible microchip.
// The fourth floor contains nothing relevant.

const data = [
    ['TH-G', 'TH-M', 'PL-G', 'ST-G'],
    ['PL-M', 'ST-M'],
    ['PR-M', 'PR-G', 'RU-G', 'RU-M'],
    []
];
console.log('Part 1', findStep(data));

const data2 = [
    ['TH-G', 'TH-M', 'PL-G', 'ST-G', 'EL-G', 'EL-M', 'DI-G', 'DI-M'],
    ['PL-M', 'ST-M'],
    ['PR-M', 'PR-G', 'RU-G', 'RU-M'],
    []
];
console.log('Part 2', findStep(data2));
