//ACO2020 D25
import data from './day25_input.js';
const [door, card] = data().split('\n').map(Number);

function loopSize(target) {
    let val = 1,
        i = 0;
    while (val !== target) {
        i++;
        val = (val * 7) % 20201227;
    }
    return i;
}

function transform(key, loopSize) {
    let val = 1,
        i = 0;
    while (i < loopSize) {
        i++;
        val = (val * key) % 20201227;
    }
    return val;
}

// console.log(transform(17807724, loopSize(5764801))); //14897079
console.log(transform(door, loopSize(card)));
