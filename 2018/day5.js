//AOC2018 D5
import data from './day5_input.js';

function isPair(c1, c2) {
    return Math.abs(c1.charCodeAt(0) - c2.charCodeAt(0)) === 32;
}

function react(s) {
    let buf = [];
    for (let i = 0; i < s.length; i++) {
        let last = buf.slice(-1)[0];
        if (last && isPair(last, s[i])) {
            buf.pop();
        } else {
            buf.push(s[i]);
        }
    }
    return buf;
}

function findShortest(s) {
    let letters = new Set(s.toLowerCase().split(''));
    let len = Infinity;
    letters.forEach((c) => {
        let _s = react(s.replace(new RegExp(c, 'gi'), ''));
        if (_s.length < len) {
            len = _s.length;
        }
    });
    return len;
}

// console.log(react('dabAcCaCBAcCcaDA').length);
console.log(react(data()).length);
console.log(findShortest(data()));
