//AOC2020 D22

function parse(str) {
	let arr = str.split('').map(s => parseInt(s, 10));
	let map = {};
	arr.forEach((n, i) => {
	   map[n] =  arr[i+1 === arr.length? 0 : i+1]
	});
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

function game(str) {
    let { map, curr, arr } = parse(str);
    let i = 0;
    console.log(arr);
    while(i++ < 1) {
        let next = getNext(map, curr, 3);
        console.log(next);
        let left = arr.filter(n => n !== curr && !next.includes(n));
        console.log(left);
        let v = curr;
        do {
            v -= 1; 

        } while()

        
    }
}

console.log(game(data()));

function sample() {
	return `32415`;
}

function data() {
	return `643719258`;
}
