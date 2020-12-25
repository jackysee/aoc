//ACO2020 D25
let door = 7573546;
let card = 17786549;

function loopSize(target) {
    let val = 1;
    let i = 0;
    while(true) {
        i++;
        val = val * 7 % 20201227;
        if(val === target) {
            break;
        }
    }
    return i;
}

function transform(key, loopSize) {
    let val = 1;
    let i = 0;
    while(i < loopSize) {
        i++;
        let _val = val * key;
        val = val * key % 20201227;
    }
    return val;
}

// console.log(transform(17807724, findLoopSize(5764801))); //14897079

console.log(transform(door, loopSize(card)));
// console.log(transform(card, doorLoopSize));


