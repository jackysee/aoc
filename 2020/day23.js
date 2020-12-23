//AOC2020 D22

function createMap(arr) {
	let map = {};
	arr.forEach((n, i) => {
	   map[n] =  arr[i+1 === arr.length? 0 : i+1]
	});
	return map;
}
function parse(str) {
	let arr = str.split('').map(s => parseInt(s, 10));
	let map = createMap(arr);
	return { map, curr:arr[0], arr };
}


function getNext(map, n, count = 1) {
    let result = [], idx = n;
    for(let i=0; i<count; i++) {
        result.push(map[idx]);
        idx = map[idx];
    }
    return result;
}

function insert(map, v, next) {
    let end = map[v];
    next.forEach(n => {
        map[v] = n;
        v = n;
    });
    map[v] = end;
    return map;
}

function toArr(map) {
    let start = parseInt(Object.keys(map)[0], 10);
    let curr = map[start];
    let result = [start];
    while(true) {
        if(curr === start) {
            break;
        }
        result.push(curr);
        curr = map[curr];
    }
    return result;
}

function game(str) {
    let { map, curr, arr } = parse(str);
    let i = 0;
    let min = Math.min(...arr);
    let max = Math.max(...arr);
    // console.log('ori', arr.join(', '));
    while(i < 100) {
        i++;
        let next = getNext(map, curr, 3);
        // console.log('while', curr, next);
        map[curr] = map[next.slice(-1)[0]];
        next.forEach(n => delete map[n]);
        // console.log('----', next, map);
        let left = arr.filter(n => n !== curr && !next.includes(n));
        // console.log('left', left);
        let v = curr;
        while(true) {
            v -= 1; 
            if(v < min) v = max;
            // console.log('v = ', v);
            if(left.includes(v)) {
                // console.log('insert after', v);
                curr = getNext(map, curr)[0];
                map = insert(map, v, next);
                break;
            } 
        }
        // console.log({ pick:next, dest:v, arr:toArr(map).join(', ') });
    }
    // console.log('final -===');
    return getNext(map, 1, arr.length - 1).join('');
}

// console.log(game('389125467'));
console.log(game(data()));


function data() {
	return `643719258`;
}
