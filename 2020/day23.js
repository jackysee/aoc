//AOC2020 D22

function createMap(arr) {
	let map = new Map();
	arr.forEach((n, i) => {
	    map.set(n, arr[i+1 === arr.length? 0 : i+1]);
    });
	return map;
}

function parse(str) {
	return str.split('').map(s => parseInt(s, 10));
}


function getNext(map, n, count = 1) {
    let result = [], idx = n;
    for(let i=0; i<count; i++) {
        result.push(map.get(idx));
        idx = map.get(idx);
    }
    return result;
}

function insert(map, v, next) {
    let end = map.get(v);
    next.forEach(n => {
        map.set(v, n);
        v = n;
    });
    map.set(v, end);
    return map;
}

function toArr(map) {
    let start = 1;
    let curr = map.get(start);
    let result = [start];
    while(true) {
        if(curr === start) {
            break;
        }
        result.push(curr);
        curr = map.get(curr);
    }
    return result;
}

function game(arr, moves = 100, min, max, resultNext) {
    let map = createMap(arr);
    curr = arr[0];
    let i = 0;
    min = min === undefined? Math.min(...arr) : min;
    max = max === undefined? Math.max(...arr) : max;
    // console.log('ori', arr.join(', '));
    let t = Date.now();
    let memo = new Map();
    while(i < moves) {
        if(i % 1000000 === 0) {
            let _t = Date.now();
            console.log(`progress ${i}, t:${(_t - t)}`);
            t = _t;
        }
        i++;
        let next = getNext(map, curr, 3);
        // console.log('while', curr, next);
        map.set(curr, map.get(next.slice(-1)[0]));
        next.forEach(n => map.delete(n));

        let mem = memo.get([curr, ...next].join(','));
        if(mem) {
            curr = map.get(curr);
            insert(map, mem, next);
            continue;
        }

        // console.log('----', next, map);
        // let left = arr.filter(n => n !== curr && !next.includes(n));
        // console.log('left', left);
        let v = curr;
        while(true) {
            v -= 1; 
            if(v < min){
                // console.log('v move to max', { v, max});
                v = max;
            }
            // console.log('v = ', v);
            if(v === curr || next.includes(v)) {
                continue;
            }
            memo.set([curr, ...next].join(','), v)
            curr = map.get(curr);
            insert(map, v, next);
            break;
        }
        // console.log({ pick:next, dest:v, arr:toArr(map).join(', ') });
    }
    // console.log('final -===');
    resultNext = resultNext || arr.length - 1;
    return getNext(map, 1, resultNext);
}

console.log(game(parse('389125467')).join(''));
console.log(game(parse(data())).join(''));


let arr = parse('389125467'); //934001 * 159792 = 149245887792
// let arr = parse(data());
let min = Math.min(...arr);
let max = Math.max(...arr);
for(let i=1; i<=1000000; i++) {
    arr.push(max + i);
}
console.log(game(arr, 10000000, min, max+1000000, 10));






function data() {
	return `643719258`;
}
