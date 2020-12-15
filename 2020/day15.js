//AOC2020 D14

function parse(s) { 
    return s.split(',').map(s => parseInt(s, 10)); 
}

function game(str, round) {
    let list = parse(str);
    let nums = new Map();
    let current;
    for(let i=0; i<round; i++) {
        if(i < list.length) {
            current = list[i];
        } else {
            let n = nums.get(current);
            current = n.length < 2? 0 : n[1] - n[0];
        }
        nums.set(
            current, 
            nums.has(current) 
                ?  [...nums.get(current).slice(-1), i]
                : [i]
        );
    }
    return current;
}

// console.log(game('0,3,6', 2020));
console.log(game(data(), 2020));
console.log(game(data(), 30000000));

function data() {
    return `1,0,15,2,10,13`;
}
