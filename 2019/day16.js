//AOC2019 D16
import data from './day16_input.js';

//base 0,1,0,-1
function getPatternValue(repeatIdx, posIdx, len) {
    let base = [0, 1, 0, -1];
    let repeat = repeatIdx + 1;
    let remain = (posIdx + 1) % (repeat * 4);
    let idx = Math.floor((remain / repeat) % 4);
    return base[idx];
}

function fft(str) {
    var result = '';
    for (let i = 0; i <= str.length; i++) {
        //element
        let total = 0;
        for (let j = i; j < str.length; j++) {
            //digit
            total += parseInt(str[j], 10) * getPatternValue(i, j);
        }
        result += Math.abs(total % 10) + '';
    }
    return result;
}

function part1(str) {
    for (let i = 0; i < 100; i++) {
        str = fft(str);
    }
    return str.slice(0, 8);
}

// console.log(part1('80871224585914546619083218645595')); //24176176.
// console.log(part1('19617804207202209144916044189917')); //73745418.
// console.log(part1('69317163492948606335995924319873')); //52432133.
console.log(part1(data(), 100).slice(0, 8));

//take advantage of the fact that offset > data length / 2, so it's just 0000000 111111
function fft2(str) {
    let result = '';
    let sum = 0;
    for (let i = str.length - 1; i >= 0; i--) {
        let n = parseInt(str[i], 10);
        sum += n;
        result = Math.abs(sum % 10) + '' + result;
    }
    return result;
}

function part2(_str) {
    let from = parseInt(_str.substring(0, 7), 10);
    let to = from + 8;
    let str = Array(10000).fill(_str).flat().join('').slice(from);
    for (let i = 0; i < 100; i++) {
        str = fft2(str, from, to);
    }
    return str.slice(0, 8);
    // return result.slice(from, to);
}

// console.log(part2('03036732577212944063491565474664')); //becomes 84462026.
// console.log(part2('02935109699940807407585447034323')); //becomes 78725270.
// console.log(part2('03081770884921959731165446850517')); //becomes 53553731.
console.log(part2(data()));
