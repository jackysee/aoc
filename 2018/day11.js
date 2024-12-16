//AOC2018 D11
import data from './day11_input.js';

const serial = 1718;

let memo = {};
function getCellPower(x, y, serial) {
    if (memo[[x, y, serial]]) {
        return memo[[x, y, serial]];
    }
    let rackId = x + 10;
    let n = (rackId * y + serial) * rackId;
    let d = +(String(n).split('').reverse()[2] || 0);
    let result = d - 5;
    memo[[x, y, serial]] = result;
    return result;
}

function getSquarePower(x, y, size, serial) {
    let pts = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            pts.push([x + i, y + j]);
        }
    }
    return pts.reduce((a, c) => a + getCellPower(...c, serial), 0);
}

// https://en.wikipedia.org/wiki/Summed-area_table
let memo2 = {};
function getSummedAreaValue(x, y, serial) {
    if (x <= 0 || y <= 0) {
        //out of bound
        return 0;
    }
    if (memo2[[x, y, serial]]) return memo2[[x, y, serial]];
    let result =
        getCellPower(x, y, serial) +
        getSummedAreaValue(x, y - 1, serial) +
        getSummedAreaValue(x - 1, y, serial) -
        getSummedAreaValue(x - 1, y - 1, serial);
    memo2[[x, y, serial]] = result;
    return result;
}

function getSquarePower2(x, y, size, serial) {
    let A = getSummedAreaValue(x - 1, y - 1, serial);
    let B = getSummedAreaValue(x + size - 1, y - 1, serial);
    let C = getSummedAreaValue(x - 1, y + size - 1, serial);
    let D = getSummedAreaValue(x + size - 1, y + size - 1, serial);
    return D + A - B - C;
}

function findLargestPowerSquare(serial) {
    let power = -Infinity;
    let pt;
    let len = 300 - 3 + 1;
    for (let y = 1; y <= len; y++) {
        for (let x = 1; x <= len; x++) {
            let p = getSquarePower2(x, y, 3, serial);
            if (p > power) {
                power = p;
                pt = [x, y];
            }
        }
    }
    return [power, pt];
    // return pt;
}

function findLargestPowerVariableSquare(serial) {
    let power = -Infinity;
    let pt;
    let size;
    for (let s = 1; s <= 300; s++) {
        if (s % 10 === 0) {
            console.log('size', s);
        }
        let len = 300 - s + 1;
        for (let y = 1; y <= len; y++) {
            for (let x = 1; x <= len; x++) {
                let p = getSquarePower2(x, y, s, serial);
                if (p > power) {
                    power = p;
                    pt = [x, y];
                    size = s;
                }
            }
        }
    }
    // return [power, pt];
    return [pt, size, power];
}

// console.log(getCellPower(3, 5, 8));
// console.log(getSquarePower(33, 45, 3,18));
// console.log(findLargestPowerSquare(18));
// console.log(findLargestPowerSquare(42));

console.log(findLargestPowerSquare(1718));
console.log(findLargestPowerVariableSquare(1718));
