// import data from './day3_sample.ts';
import data from './day3_input.ts';

let arr: number[][] = data()
    .trim()
    .split('\n')
    .map((s: string) => s.split('').map(Number));

interface BitStat {
    ones: number;
    zeros: number;
}

function countBits(arr: number[][]): BitStat[] {
    var results = [];
    for (let i = 0; i < arr[0].length; i++) {
        results.push({ ones: 0, zeros: 0 });
        for (let j = 0; j < arr.length; j++) {
            const n = arr[j][i];
            if (n === 0) {
                results[i].zeros += 1;
            }
            if (n === 1) {
                results[i].ones += 1;
            }
        }
    }
    return results;
}

var gamma = countBits(arr).map((r) => (r.ones > r.zeros ? 1 : 0));
var epsilons = gamma.map((s) => (s === 0 ? 1 : 0));

console.log(
    'Part1',
    parseInt(gamma.join(''), 2) * parseInt(epsilons.join(''), 2)
);

function filterNumber(
    arr: number[][],
    pos: number = 0,
    mostCommon: Boolean
): number {
    var s = countBits(arr)[pos];
    var bit = s.ones >= s.zeros ? (mostCommon ? 1 : 0) : mostCommon ? 0 : 1;
    var newArr = arr.filter((row) => {
        return row[pos] === bit;
    });
    if (newArr.length === 1) {
        return parseInt(newArr[0].join(''), 2);
    }
    return filterNumber(newArr, pos + 1, mostCommon);
}

var oxygen = filterNumber(arr, 0, true);
var co2 = filterNumber(arr, 0, false);
console.log('Part2', oxygen * co2);
