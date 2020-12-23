//AOC2020 D22

function parse(str) {
	let arr = str.split('').map(s => parseInt(s, 10));
	return arr.map((n, i) => {
	        return {
	            val: n,
	            next: arr[i+1 === arr.length? 0 : i+1]
	        }
	    });
	
}

let curr = 6;

function move() {
    arr
}

console.log(parse(data()));

function sample() {
	return ``;
}

function data() {
	return `643719258`;
}
